"use client";

import { useState } from "react";
import { PanelView } from "@/components/editor/panels/assets/views/base-panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEditor } from "@/editor/use-editor";
import { toast } from "sonner";
import { TRANSITION_PRESETS } from "../presets";
import type { TransitionMode, TransitionPreset } from "../types";
import { mediaTimeToSeconds, mediaTimeFromSeconds } from "@/wasm";
import { setChannel } from "@/animation";
import type { ElementAnimations, ScalarAnimationChannel } from "@/animation/types";
import { generateUUID } from "@/utils/id";
import { cn } from "@/utils/ui";
import {
	ArrowRightDoubleIcon,
	MagicWand05Icon,
	FlashIcon,
	ViewIcon,
	Rotate01Icon,
	Search01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const DURATIONS = [0.2, 0.3, 0.5, 0.8, 1.0, 1.5];
const CATEGORIES = [
	"All",
	"Dissolve",
	"Fade",
	"Motion",
	"Zoom",
	"Spin",
	"Shake",
	"Glitch",
] as const;

export function TransitionsView() {
	const editor = useEditor();
	const [activeCategory, setActiveCategory] = useState<string>("All");
	const [selectedDuration, setSelectedDuration] = useState<number>(0.5);
	const [transitionMode, setTransitionMode] = useState<TransitionMode>("in");
	const [searchQuery, setSearchQuery] = useState<string>("");

	const filteredPresets = TRANSITION_PRESETS.filter((p) => {
		const matchCategory =
			activeCategory === "All" || p.category === activeCategory;
		const matchSearch =
			!searchQuery ||
			p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			p.description.toLowerCase().includes(searchQuery.toLowerCase());
		return matchCategory && matchSearch;
	});

	const handleApplyTransition = (preset: TransitionPreset) => {
		const selected = editor.selection.getSelectedElements();
		if (selected.length === 0) {
			toast.error("Pilih klip video/gambar di timeline terlebih dahulu");
			return;
		}

		const elementsWithTracks = editor.timeline.getElementsWithTracks({
			elements: [...selected],
		});
		if (elementsWithTracks.length === 0) {
			toast.error("Klip yang dipilih tidak ditemukan");
			return;
		}

		let appliedCount = 0;

		for (const { element, track } of elementsWithTracks) {
			const durationSec = mediaTimeToSeconds({ time: element.duration });
			if (durationSec <= 0.1) continue;

			const keyframeChannels = preset.apply({
				elementDuration: durationSec,
				transitionDuration: selectedDuration,
				mode: transitionMode,
			});

			let nextAnimations: ElementAnimations | undefined = element.animations
				? { ...element.animations }
				: undefined;

			for (const [propPath, keys] of Object.entries(keyframeChannels)) {
				const channel: ScalarAnimationChannel = {
					keys: keys.map((k) => ({
						id: generateUUID(),
						time: mediaTimeFromSeconds({ seconds: k.time }),
						value: k.value,
						segmentToNext: "linear",
						tangentMode: "auto",
					})),
					extrapolation: {
						before: "hold",
						after: "hold",
					},
				};
				nextAnimations = setChannel({
					animations: nextAnimations,
					propertyPath: propPath,
					channel,
				});
			}

			editor.timeline.updateElements({
				updates: [
					{
						trackId: track.id,
						elementId: element.id,
						patch: { animations: nextAnimations },
					},
				],
			});
			appliedCount++;
		}

		if (appliedCount > 0) {
			toast.success(
				`Transisi "${preset.name}" (${selectedDuration}s) berhasil diterapkan!`,
			);
		}
	};

	return (
		<PanelView title="Transitions">
			<div className="flex flex-col gap-3 p-1 h-full overflow-y-auto">
				{/* Search Bar */}
				<div className="relative">
					<Input
						placeholder="Cari transisi (Zoom, Shake, Fade, Spin)..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="h-8 text-xs pl-8 pr-2"
					/>
					<HugeiconsIcon
						icon={Search01Icon}
						className="size-3.5 absolute left-2.5 top-2.5 text-muted-foreground pointer-events-none"
					/>
				</div>

				{/* Category Pills */}
				<div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto">
					{CATEGORIES.map((cat) => (
						<button
							key={cat}
							type="button"
							onClick={() => setActiveCategory(cat)}
							className={cn(
								"px-2.5 py-0.5 text-[11px] rounded-full font-medium transition-colors cursor-pointer",
								activeCategory === cat
									? "bg-primary text-primary-foreground font-semibold"
									: "bg-muted text-muted-foreground hover:bg-muted/80",
							)}
						>
							{cat}
						</button>
					))}
				</div>

				{/* Controls: Mode & Duration */}
				<div className="flex flex-col gap-2 p-2 rounded-lg border bg-card/60 text-xs shadow-xs">
					<div className="flex items-center justify-between">
						<span className="text-muted-foreground font-medium text-[11px]">Posisi:</span>
						<div className="flex gap-1">
							{(["in", "out", "both"] as TransitionMode[]).map((mode) => (
								<button
									key={mode}
									type="button"
									onClick={() => setTransitionMode(mode)}
									className={cn(
										"px-2 py-0.5 rounded text-[11px] transition-colors font-medium cursor-pointer",
										transitionMode === mode
											? "bg-secondary text-secondary-foreground shadow-xs font-semibold"
											: "text-muted-foreground hover:text-foreground",
									)}
								>
									{mode === "in"
										? "Masuk (In)"
										: mode === "out"
											? "Keluar (Out)"
											: "Kedua Sisi"}
								</button>
							))}
						</div>
					</div>

					<div className="flex items-center justify-between">
						<span className="text-muted-foreground font-medium text-[11px]">Durasi:</span>
						<div className="flex gap-1">
							{DURATIONS.map((dur) => (
								<button
									key={dur}
									type="button"
									onClick={() => setSelectedDuration(dur)}
									className={cn(
										"px-1.5 py-0.5 rounded text-[11px] transition-colors cursor-pointer",
										selectedDuration === dur
											? "bg-secondary text-secondary-foreground shadow-xs font-semibold"
											: "text-muted-foreground hover:text-foreground",
									)}
								>
									{dur}s
								</button>
							))}
						</div>
					</div>
				</div>

				{/* Presets Grid - Compact 3 Columns */}
				{filteredPresets.length === 0 ? (
					<div className="text-center py-8 text-xs text-muted-foreground">
						Tidak ada transisi yang cocok.
					</div>
				) : (
					<div
						className="grid gap-2 pb-6"
						style={{
							gridTemplateColumns: "repeat(auto-fill, minmax(85px, 1fr))",
						}}
					>
						{filteredPresets.map((preset) => (
							<div
								key={preset.id}
								className="group relative flex flex-col items-center justify-between p-2 rounded-lg border bg-card hover:border-primary/50 transition-all text-center cursor-pointer overflow-hidden shadow-xs"
								onClick={() => handleApplyTransition(preset)}
							>
								{/* Visual icon box */}
								<div className="relative flex size-11 items-center justify-center rounded-md bg-muted/60 mb-1.5 overflow-hidden border">
									<div className="flex items-center justify-center size-7 rounded bg-primary/20 text-primary group-hover:scale-110 transition-transform">
										{preset.category === "Motion" ? (
											<HugeiconsIcon
												icon={ArrowRightDoubleIcon}
												className="size-4"
											/>
										) : preset.category === "Fade" || preset.category === "Dissolve" ? (
											<HugeiconsIcon icon={FlashIcon} className="size-4" />
										) : preset.category === "Zoom" ? (
											<HugeiconsIcon icon={ViewIcon} className="size-4" />
										) : preset.category === "Spin" ? (
											<HugeiconsIcon icon={Rotate01Icon} className="size-4" />
										) : (
											<HugeiconsIcon
												icon={MagicWand05Icon}
												className="size-4"
											/>
										)}
									</div>
								</div>

								<span
									className="text-[11px] font-semibold truncate w-full text-foreground leading-tight"
									title={preset.name}
								>
									{preset.name}
								</span>
								<span
									className="text-[9px] text-muted-foreground line-clamp-1 mt-0.5 w-full leading-snug"
									title={preset.description}
								>
									{preset.description}
								</span>

								{/* Quick Apply Button on Hover / Click */}
								<div className="mt-1.5 w-full">
									<Button
										size="sm"
										variant="secondary"
										className="w-full h-5 text-[9px] px-1 font-medium cursor-pointer"
										onClick={(e) => {
											e.stopPropagation();
											handleApplyTransition(preset);
										}}
									>
										Terapkan
									</Button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</PanelView>
	);
}
