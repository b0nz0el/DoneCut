"use client";

import { useEffect, useState } from "react";
import { PanelView } from "@/components/editor/panels/assets/views/base-panel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEditor } from "@/editor/use-editor";
import { processMediaAssets } from "@/media/processing";
import { buildElementFromMedia } from "@/timeline/element-utils";
import { mediaTimeFromSeconds } from "@/wasm";
import { DEFAULT_NEW_ELEMENT_DURATION } from "@/timeline/creation";
import type { StockMediaItem } from "@/app/api/stock/search/route";
import { cn } from "@/utils/ui";
import {
	PlusSignIcon,
	Video01Icon,
	Image02Icon,
	Search01Icon,
	SparklesIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Spinner } from "@/components/ui/spinner";

const CATEGORIES = [
	{ id: "all", label: "Semua" },
	{ id: "trending", label: "Tren" },
	{ id: "nature", label: "Alam" },
	{ id: "city", label: "Kota" },
	{ id: "sunset", label: "Senja" },
	{ id: "cyberpunk", label: "Cyberpunk" },
	{ id: "technology", label: "Teknologi" },
	{ id: "people", label: "Manusia" },
	{ id: "aesthetic", label: "Estetik" },
	{ id: "drone", label: "Drone" },
] as const;

export function StockView() {
	const editor = useEditor();
	const [mediaType, setMediaType] = useState<"video" | "photo">("video");
	const [searchQuery, setSearchQuery] = useState("");
	const [activeCategory, setActiveCategory] = useState<string>("all");
	const [items, setItems] = useState<StockMediaItem[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [addingId, setAddingId] = useState<string | null>(null);
	const [hoveredId, setHoveredId] = useState<string | null>(null);

	const fetchStock = async (query: string, category: string, type: "video" | "photo") => {
		setIsLoading(true);
		try {
			const catParam = category && category !== "all" ? `&category=${encodeURIComponent(category)}` : "";
			const qParam = query ? `&q=${encodeURIComponent(query)}` : "";
			const res = await fetch(
				`/api/stock/search?type=${type}${catParam}${qParam}`,
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
		fetchStock(searchQuery, activeCategory, mediaType);
	}, [mediaType, activeCategory]);

	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		fetchStock(searchQuery, activeCategory, mediaType);
	};

	const handleAddToTimeline = async (item: StockMediaItem) => {
		setAddingId(item.id);
		const toastId = toast.loading(`Mengunduh ${item.title}...`);

		try {
			// Download via proxy endpoint to completely bypass browser CORS restrictions
			const proxyUrl = `/api/stock/proxy?url=${encodeURIComponent(item.downloadUrl)}`;
			let response: Response;
			try {
				response = await fetch(proxyUrl);
				if (!response.ok) throw new Error("Proxy error");
			} catch {
				// Fallback direct fetch if proxy fails
				response = await fetch(item.downloadUrl);
			}

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

			// Save asset into active project media store
			const activeProject = editor.project.getActive();
			if (!activeProject) {
				throw new Error("Tidak ada proyek yang aktif");
			}

			const savedAsset = await editor.media.addMediaAsset({
				projectId: activeProject.metadata.id,
				asset,
			});

			if (!savedAsset) {
				throw new Error("Gagal menyimpan aset media ke proyek");
			}

			// Add directly to timeline at current playhead
			const currentTime = editor.playback.getCurrentTime();
			const duration =
				savedAsset.duration != null
					? mediaTimeFromSeconds({ seconds: savedAsset.duration })
					: DEFAULT_NEW_ELEMENT_DURATION;

			const element = buildElementFromMedia({
				mediaId: savedAsset.id,
				mediaType: savedAsset.type,
				name: savedAsset.name,
				duration,
				startTime: currentTime,
			});

			editor.timeline.insertElement({
				placement: { mode: "auto" },
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
				<div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto pr-0.5">
					{CATEGORIES.map((cat) => (
						<button
							key={cat.id}
							type="button"
							onClick={() => {
								setActiveCategory(cat.id);
								setSearchQuery("");
							}}
							className={cn(
								"px-2.5 py-0.5 text-[11px] rounded-full font-medium transition-colors",
								activeCategory === cat.id && !searchQuery
									? "bg-primary text-primary-foreground font-semibold"
									: "bg-muted text-muted-foreground hover:bg-muted/80",
							)}
						>
							{cat.label}
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
						Tidak ada media ditemukan untuk filter ini.
					</div>
				) : (
					/* Items Grid */
					<div
						className="grid gap-2 pb-6"
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

									{/* Quality & Duration Badges */}
									<div className="absolute top-1 left-1 flex items-center gap-1 z-20">
										<span className="px-1 py-0.2 rounded bg-black/70 text-[8px] text-white/90 font-semibold tracking-wider uppercase">
											{item.width >= 3840 ? "4K" : "HD"}
										</span>
									</div>

									{item.type === "video" && (
										<span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/75 text-[9px] text-white font-mono font-medium z-20">
											{Math.round(item.duration)}s
										</span>
									)}

									{/* Overlay Add Button */}
									<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
										<Button
											size="sm"
											className="h-7 px-2 text-xs gap-1 shadow-md cursor-pointer"
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
									<span className="text-[11px] font-semibold truncate" title={item.title}>
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
