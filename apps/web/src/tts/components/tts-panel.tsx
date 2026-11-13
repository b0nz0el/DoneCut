"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useEditor } from "@/editor/use-editor";
import { buildLibraryAudioElement } from "@/timeline/element-utils";
import { mediaTimeFromSeconds } from "@/wasm";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import {
	PlayIcon,
	PauseIcon,
	PlusSignIcon,
	Mic01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/utils/ui";

export function TTSPanel() {
	const editor = useEditor();
	const [text, setText] = useState("");
	const [language, setLanguage] = useState<"id" | "en">("id");
	const [isLoading, setIsLoading] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	const handlePreview = async () => {
		if (!text.trim()) {
			toast.error("Ketik teks narasi terlebih dahulu");
			return;
		}

		if (isPlaying && audioRef.current) {
			audioRef.current.pause();
			setIsPlaying(false);
			return;
		}

		setIsLoading(true);
		try {
			const url = `/api/tts?text=${encodeURIComponent(text.trim())}&lang=${language}`;
			const audio = new Audio(url);
			audioRef.current = audio;

			audio.onended = () => setIsPlaying(false);
			audio.onerror = () => {
				setIsPlaying(false);
				toast.error("Gagal memutar pratinjau suara");
			};

			await audio.play();
			setIsPlaying(true);
		} catch (error) {
			console.error("Preview failed:", error);
			toast.error("Gagal memutar suara");
		} finally {
			setIsLoading(false);
		}
	};

	const handleAddToTimeline = async () => {
		if (!text.trim()) {
			toast.error("Ketik teks narasi terlebih dahulu");
			return;
		}

		setIsLoading(true);
		const toastId = toast.loading("Menghasilkan suara narator AI...");

		try {
			const ttsUrl = `/api/tts?text=${encodeURIComponent(text.trim())}&lang=${language}`;
			const response = await fetch(ttsUrl);
			if (!response.ok) throw new Error("Gagal mengunduh audio suara");

			const arrayBuffer = await response.arrayBuffer();
			const audioContext = new (window.AudioContext ||
				(window as any).webkitAudioContext)();
			const buffer = await audioContext.decodeAudioData(arrayBuffer);

			const currentTime = editor.playback.getCurrentTime();
			const element = buildLibraryAudioElement({
				sourceUrl: ttsUrl,
				name: `Voiceover: "${text.slice(0, 20)}..."`,
				duration: mediaTimeFromSeconds({ seconds: buffer.duration }),
				startTime: currentTime,
				buffer,
			});

			editor.timeline.insertElement({
				placement: { mode: "auto", trackType: "audio" },
				element,
			});

			toast.success("Suara narator berhasil ditambahkan ke timeline!", {
				id: toastId,
			});
		} catch (error) {
			console.error("Failed to add voiceover:", error);
			toast.error(
				error instanceof Error
					? error.message
					: "Gagal membuat suara narator",
				{ id: toastId },
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex flex-col gap-3 p-3 rounded-lg border bg-card/60 shadow-xs">
			<div className="flex items-center gap-2">
				<div className="flex items-center justify-center size-6 rounded bg-primary/20 text-primary">
					<HugeiconsIcon icon={Mic01Icon} className="size-3.5" />
				</div>
				<span className="text-xs font-semibold">AI Voiceover (Text to Speech)</span>
			</div>

			{/* Language Switch */}
			<div className="flex gap-1 p-0.5 rounded border bg-muted/40">
				<button
					type="button"
					onClick={() => setLanguage("id")}
					className={cn(
						"flex-1 py-1 text-[11px] font-medium rounded transition-colors",
						language === "id"
							? "bg-background text-foreground shadow-xs font-semibold"
							: "text-muted-foreground hover:text-foreground",
					)}
				>
					🇮🇩 Bahasa Indonesia
				</button>
				<button
					type="button"
					onClick={() => setLanguage("en")}
					className={cn(
						"flex-1 py-1 text-[11px] font-medium rounded transition-colors",
						language === "en"
							? "bg-background text-foreground shadow-xs font-semibold"
							: "text-muted-foreground hover:text-foreground",
					)}
				>
					🇬🇧 English
				</button>
			</div>

			{/* Script Textarea */}
			<textarea
				rows={3}
				placeholder="Tulis narasi di sini (contoh: Halo semuanya, selamat datang di video saya hari ini!)..."
				value={text}
				onChange={(e) => setText(e.target.value)}
				className="w-full text-xs rounded-md border p-2 bg-background focus:outline-hidden focus:border-primary resize-none placeholder:text-muted-foreground/60"
			/>

			{/* Actions */}
			<div className="flex gap-2">
				<Button
					size="sm"
					variant="secondary"
					className="flex-1 h-8 text-xs gap-1.5"
					onClick={handlePreview}
					disabled={isLoading || !text.trim()}
				>
					{isLoading ? (
						<Spinner className="size-3.5" />
					) : isPlaying ? (
						<HugeiconsIcon icon={PauseIcon} className="size-3.5" />
					) : (
						<HugeiconsIcon icon={PlayIcon} className="size-3.5" />
					)}
					<span>{isPlaying ? "Jeda" : "Dengarkan"}</span>
				</Button>

				<Button
					size="sm"
					className="flex-1 h-8 text-xs gap-1.5 font-medium"
					onClick={handleAddToTimeline}
					disabled={isLoading || !text.trim()}
				>
					{isLoading ? (
						<Spinner className="size-3.5" />
					) : (
						<HugeiconsIcon icon={PlusSignIcon} className="size-3.5" />
					)}
					<span>Tambah Suara</span>
				</Button>
			</div>
		</div>
	);
}
