"use client";

import { useEffect, useState, useRef } from "react";
import { PanelView } from "@/components/editor/panels/assets/views/base-panel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEditor } from "@/editor/use-editor";
import { processMediaAssets } from "@/media/processing";
import { buildElementFromMedia } from "@/timeline/element-utils";
import type { StockMediaItem } from "@/app/api/stock/search/route";
import { cn } from "@/utils/ui";
import {
	PlusSignIcon,
	PlayIcon,
	Video01Icon,
	Image02Icon,
	Search01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Spinner } from "@/components/ui/spinner";

const CATEGORIES = [
	"Trending",
	"Nature",
	"City",
	"Sunset",
	"Cyberpunk",
	"People",
] as const;

export function StockView() {
	const editor = useEditor();
	const [mediaType, setMediaType] = useState<"video" | "photo">("video");
	const [searchQuery, setSearchQuery] = useState("");
	const [activeCategory, setActiveCategory] = useState<string>("Trending");
	const [items, setItems] = useState<StockMediaItem[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [addingId, setAddingId] = useState<string | null>(null);
	const [hoveredId, setHoveredId] = useState<string | null>(null);

	const fetchStock = async (query: string, type: "video" | "photo") => {
		setIsLoading(true);
		try {
			const res = await fetch(
				`/api/stock/search?q=${encodeURIComponent(query)}&type=${type}`,
			);
			if (res.ok) {
				const data = await res.json();
				setItems(data.results || []);
			} else {
				toast.error("Gagal memuat media stok");
			}
		} catch (error) {
			console.error("Failed to fetch stock:", error);
			toast.error("Terjadi kesalahan jaringan");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const q = activeCategory === "Trending" ? "" : activeCategory.toLowerCase();
		fetchStock(searchQuery || q, mediaType);
	}, [mediaType, activeCategory]);

	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		fetchStock(searchQuery, mediaType);
	};

	const handleAddToTimeline = async (item: StockMediaItem) => {
		setAddingId(item.id);
		const toastId = toast.loading(`Mengunduh ${item.title}...`);

		try {
			const response = await fetch(item.downloadUrl);
			if (!response.ok) throw new Error("Gagal mengunduh file media");

			const blob = await response.blob();
			const ext = item.type === "video" ? "mp4" : "jpg";
			const mimeType = item.type === "video" ? "video/mp4" : "image/jpeg";
			const fileName = `${item.title.replace(/[^a-zA-Z0-9]/g, "_")}.${ext}`;

			const file = new File([blob], fileName, { type: mimeType });

			// Process file into DoneCut asset store
			const processedAssets = await processMediaAssets({ files: [file] });
			if (processedAssets.length === 0) {
				throw new Error("Gagal memproses aset media");
			}

			const asset = processedAssets[0];
			editor.media.addAsset(asset);

			// Add directly to timeline
			const currentTime = editor.playback.getCurrentTime();
			const element = buildElementFromMedia({
				mediaId: asset.id,
				mediaType: asset.type,
				name: asset.name,
				duration: asset.duration,
				startTime: currentTime,
			});

			editor.timeline.insertElement({
				placement: { mode: "auto", trackType: asset.type },
				element,
			});

			toast.success(`${item.title} berhasil ditambahkan ke timeline!`, {
				id: toastId,
			});
		} catch (error) {
			console.error("Failed to add stock asset:", error);
			toast.error(
				error instanceof Error ? error.message : "Gagal menambahkan ke timeline",
				{ id: toastId },
			);
		} finally {
			setAddingId(null);
		}
	};

	return (
		<PanelView title="Stock Media">
			<div className="flex flex-col gap-3.5 p-1 h-full overflow-y-auto">
				{/* Type Switcher */}
				<div className="flex rounded-md border p-0.5 bg-muted/40">
					<button
						type="button"
						onClick={() => setMediaType("video")}
						className={cn(
							"flex-1 flex items-center justify-center gap-1.5 py-1 text-xs font-medium rounded transition-colors",
							mediaType === "video"
								? "bg-background text-foreground shadow-xs font-semibold"
								: "text-muted-foreground hover:text-foreground",
						)}
					>
						<HugeiconsIcon icon={Video01Icon} className="size-3.5" />
						Stok Video
					</button>
					<button
						type="button"
						onClick={() => setMediaType("photo")}
						className={cn(
							"flex-1 flex items-center justify-center gap-1.5 py-1 text-xs font-medium rounded transition-colors",
							mediaType === "photo"
								? "bg-background text-foreground shadow-xs font-semibold"
								: "text-muted-foreground hover:text-foreground",
						)}
					>
						<HugeiconsIcon icon={Image02Icon} className="size-3.5" />
						Stok Foto
					</button>
				</div>

				{/* Search Bar */}
				<form onSubmit={handleSearchSubmit} className="flex gap-1.5">
					<Input
						placeholder={`Cari ${mediaType === "video" ? "video" : "foto"} bebas royalti...`}
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="h-8 text-xs flex-1"
					/>
					<Button type="submit" size="sm" variant="secondary" className="h-8 px-2.5">
						<HugeiconsIcon icon={Search01Icon} className="size-3.5" />
					</Button>
				</form>

				{/* Category Pills */}
				<div className="flex flex-wrap gap-1">
					{CATEGORIES.map((cat) => (
						<button
							key={cat}
							type="button"
							onClick={() => {
								setActiveCategory(cat);
								setSearchQuery("");
							}}
							className={cn(
								"px-2.5 py-0.5 text-[11px] rounded-full font-medium transition-colors",
								activeCategory === cat && !searchQuery
									? "bg-primary text-primary-foreground"
									: "bg-muted text-muted-foreground hover:bg-muted/80",
							)}
						>
							{cat}
						</button>
					))}
				</div>

				{/* Loading State */}
				{isLoading ? (
					<div className="flex flex-col items-center justify-center py-12 gap-2 text-muted-foreground">
						<Spinner className="size-5" />
						<span className="text-xs">Memuat koleksi stok...</span>
					</div>
				) : items.length === 0 ? (
					<div className="text-center py-12 text-xs text-muted-foreground">
						Tidak ada media ditemukan untuk kata kunci ini.
					</div>
				) : (
					/* Items Grid */
					<div
						className="grid gap-2.5 pb-6"
						style={{
							gridTemplateColumns: "repeat(auto-fill, minmax(115px, 1fr))",
						}}
					>
						{items.map((item) => (
							<div
								key={item.id}
								className="group relative flex flex-col rounded-lg border bg-card overflow-hidden hover:border-primary/50 transition-all shadow-xs"
								onMouseEnter={() => setHoveredId(item.id)}
								onMouseLeave={() => setHoveredId(null)}
							>
								{/* Thumbnail & Video Preview */}
								<div className="relative aspect-video w-full bg-muted overflow-hidden">
									<img
										src={item.thumbnail}
										alt={item.title}
										className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
										loading="lazy"
									/>

									{/* Video hover preview */}
									{item.type === "video" &&
										hoveredId === item.id &&
										item.previewUrl && (
											<video
												src={item.previewUrl}
												autoPlay
												muted
												loop
												playsInline
												className="absolute inset-0 size-full object-cover z-10"
											/>
										)}

									{/* Duration Badge */}
									{item.type === "video" && (
										<span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/75 text-[9px] text-white font-mono font-medium z-20">
											{Math.round(item.duration)}s
										</span>
									)}

									{/* Overlay Add Button */}
									<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
										<Button
											size="sm"
											className="h-7 px-2 text-xs gap-1 shadow-md"
											disabled={addingId === item.id}
											onClick={() => handleAddToTimeline(item)}
										>
											{addingId === item.id ? (
												<Spinner className="size-3.5" />
											) : (
												<>
													<HugeiconsIcon
														icon={PlusSignIcon}
														className="size-3.5"
													/>
													<span>Tambah</span>
												</>
											)}
										</Button>
									</div>
								</div>

								{/* Info */}
								<div className="p-1.5 flex flex-col">
									<span className="text-[11px] font-semibold truncate">
										{item.title}
									</span>
									<span className="text-[9px] text-muted-foreground truncate">
										{item.author}
									</span>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</PanelView>
	);
}
