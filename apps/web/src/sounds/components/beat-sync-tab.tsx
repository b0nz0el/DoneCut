"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useEditor } from "@/editor/use-editor";
import { detectAudioBeats } from "@/audio/beat-detector";
import { extractTimelineAudio } from "@/media/mediabunny";
import { decodeAudioToFloat32 } from "@/media/audio";
import { mediaTimeFromSeconds, roundFrameTime } from "@/wasm";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { MusicNote03Icon, Delete02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/utils/ui";

export function BeatSyncTab() {
	const editor = useEditor();
	const [sensitivity, setSensitivity] = useState<number>(1.3);
	const [isDetecting, setIsDetecting] = useState<boolean>(false);

	const handleDetectBeats = async () => {
		setIsDetecting(true);
		const toastId = toast.loading("Menganalisis irama & ketukan musik...");

		try {
			const activeScene = editor.scenes.getActiveScene();
			const totalDuration = editor.timeline.getTotalDuration();

			// Extract audio from timeline
			const audioBlob = await extractTimelineAudio({
				tracks: activeScene.tracks,
				mediaAssets: editor.media.getAssets(),
				totalDuration,
			});

			const arrayBuffer = await audioBlob.arrayBuffer();
			const audioContext = new (window.AudioContext ||
				(window as any).webkitAudioContext)();
			const buffer = await audioContext.decodeAudioData(arrayBuffer);

			// Detect beats
			const beatTimestamps = detectAudioBeats({
				buffer,
				sensitivity,
				minDistanceSec: 0.28,
			});

			if (beatTimestamps.length === 0) {
				toast.info(
					"Tidak ada ketukan signifikan yang terdeteksi. Coba kurangi sensitivitas.",
					{ id: toastId },
				);
				return;
			}

			const fps = editor.project.getActive().settings.fps;

			// Add bookmarks for each beat
			for (const sec of beatTimestamps) {
				const frameTime = roundFrameTime({
					time: mediaTimeFromSeconds({ seconds: sec }),
					rate: fps,
				});

				// Only add if not already bookmarked
				if (!editor.scenes.isBookmarked({ time: frameTime })) {
					await editor.scenes.toggleBookmark({ time: frameTime });
				}
			}

			toast.success(
				`Berhasil menandai ${beatTimestamps.length} titik ketukan (beats) di timeline!`,
				{ id: toastId },
			);
		} catch (error) {
			console.error("Beat detection error:", error);
			toast.error(
				error instanceof Error
					? error.message
					: "Gagal mendeteksi ketukan audio",
				{ id: toastId },
			);
		} finally {
			setIsDetecting(false);
		}
	};

	const handleClearBookmarks = async () => {
		const activeScene = editor.scenes.getActiveScene();
		if (activeScene.bookmarks.length === 0) {
			toast.info("Tidak ada penanda beat di timeline.");
			return;
		}

		for (const bm of [...activeScene.bookmarks]) {
			await editor.scenes.removeBookmark({ time: bm.time });
		}

		toast.success("Semua penanda beat telah dibersihkan.");
	};

	return (
		<div className="flex flex-col gap-4 p-1">
			<div className="flex flex-col gap-1.5 p-3 rounded-lg border bg-card/60">
				<div className="flex items-center gap-2">
					<div className="flex items-center justify-center size-7 rounded bg-primary/20 text-primary">
						<HugeiconsIcon icon={MusicNote03Icon} className="size-4" />
					</div>
					<div>
						<h4 className="text-xs font-semibold">Auto-Beat Sync (AI)</h4>
						<p className="text-[10px] text-muted-foreground">
							Otomatis menandai titik ketukan lagu (bass & drum) di timeline
						</p>
					</div>
				</div>

				<div className="mt-3 flex flex-col gap-2 text-xs">
					<div className="flex items-center justify-between">
						<span className="text-muted-foreground">Sensitivitas:</span>
						<div className="flex gap-1">
							{[1.1, 1.3, 1.5].map((val) => (
								<button
									key={val}
									type="button"
									onClick={() => setSensitivity(val)}
									className={cn(
										"px-2 py-0.5 rounded text-[11px] font-medium transition-colors",
										sensitivity === val
											? "bg-secondary text-secondary-foreground font-semibold shadow-xs"
											: "text-muted-foreground hover:text-foreground",
									)}
								>
									{val === 1.1 ? "Tinggi" : val === 1.3 ? "Sedang" : "Rendah"}
								</button>
							))}
						</div>
					</div>

					<Button
						className="mt-2 w-full h-8 text-xs gap-1.5 font-medium"
						onClick={handleDetectBeats}
						disabled={isDetecting}
					>
						{isDetecting ? (
							<Spinner className="size-3.5" />
						) : (
							<HugeiconsIcon icon={MusicNote03Icon} className="size-3.5" />
						)}
						<span>Deteksi Ketukan Musik (Beats)</span>
					</Button>

					<Button
						variant="outline"
						className="w-full h-7 text-[11px] gap-1 text-muted-foreground hover:text-destructive"
						onClick={handleClearBookmarks}
					>
						<HugeiconsIcon icon={Delete02Icon} className="size-3" />
						<span>Bersihkan Penanda Timeline</span>
					</Button>
				</div>
			</div>

			<div className="p-3 rounded-lg border bg-muted/20 text-[11px] text-muted-foreground leading-relaxed">
				<p className="font-semibold text-foreground mb-1">💡 Tips Sinkronisasi:</p>
				<p>
					Setelah titik ketukan terdeteksi, potongan klip video Anda akan otomatis
					menempel (*snap*) pas di atas titik beat lagu. Video Anda akan terlihat
					estetik selaras dengan irama musik!
				</p>
			</div>
		</div>
	);
}
