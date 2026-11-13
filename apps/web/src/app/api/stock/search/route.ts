import { type NextRequest, NextResponse } from "next/server";

export interface StockMediaItem {
	id: string;
	title: string;
	type: "video" | "photo";
	duration: number; // in seconds (0 for photos)
	thumbnail: string;
	previewUrl?: string;
	downloadUrl: string;
	author: string;
	width: number;
	height: number;
}

// Curated royalty-free stock media fallback (high quality, reliable CDNs)
const CURATED_STOCK_VIDEOS: StockMediaItem[] = [
	{
		id: "v-1",
		title: "Cinematic Ocean Waves",
		type: "video",
		duration: 12,
		thumbnail:
			"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=60",
		previewUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
		downloadUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
		author: "Nature Studio",
		width: 1920,
		height: 1080,
	},
	{
		id: "v-2",
		title: "Urban City Skyline",
		type: "video",
		duration: 15,
		thumbnail:
			"https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=500&auto=format&fit=crop&q=60",
		previewUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
		downloadUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
		author: "Skyline Media",
		width: 1920,
		height: 1080,
	},
	{
		id: "v-3",
		title: "Aesthetic Sunset Glow",
		type: "video",
		duration: 10,
		thumbnail:
			"https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=500&auto=format&fit=crop&q=60",
		previewUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
		downloadUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
		author: "Golden Hours",
		width: 1920,
		height: 1080,
	},
	{
		id: "v-4",
		title: "Neon Cyberpunk Lights",
		type: "video",
		duration: 14,
		thumbnail:
			"https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=60",
		previewUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
		downloadUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
		author: "Tokyo Night",
		width: 1920,
		height: 1080,
	},
	{
		id: "v-5",
		title: "Mountain Cloud Timelapse",
		type: "video",
		duration: 11,
		thumbnail:
			"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&auto=format&fit=crop&q=60",
		previewUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
		downloadUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
		author: "Alps Drone",
		width: 1920,
		height: 1080,
	},
];

const CURATED_STOCK_PHOTOS: StockMediaItem[] = [
	{
		id: "p-1",
		title: "Dramatic Mountain Peak",
		type: "photo",
		duration: 5,
		thumbnail:
			"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&auto=format&fit=crop&q=60",
		downloadUrl:
			"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&auto=format&fit=crop&q=80",
		author: "Kalen Emsley",
		width: 1920,
		height: 1080,
	},
	{
		id: "p-2",
		title: "Tokyo Cyberpunk Street",
		type: "photo",
		duration: 5,
		thumbnail:
			"https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=60",
		downloadUrl:
			"https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1920&auto=format&fit=crop&q=80",
		author: "Aleksandar Pasaric",
		width: 1920,
		height: 1080,
	},
	{
		id: "p-3",
		title: "Tropical Beach Sunset",
		type: "photo",
		duration: 5,
		thumbnail:
			"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=60",
		downloadUrl:
			"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&auto=format&fit=crop&q=80",
		author: "Sean Oulashin",
		width: 1920,
		height: 1080,
	},
	{
		id: "p-4",
		title: "Modern Minimalist Workspace",
		type: "photo",
		duration: 5,
		thumbnail:
			"https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=500&auto=format&fit=crop&q=60",
		downloadUrl:
			"https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1920&auto=format&fit=crop&q=80",
		author: "Alesia Kazantceva",
		width: 1920,
		height: 1080,
	},
];

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const query = (searchParams.get("q") ?? "").trim().toLowerCase();
	const type = (searchParams.get("type") ?? "video") as "video" | "photo";
	const page = Number(searchParams.get("page") ?? 1);

	const pexelsKey = process.env.PEXELS_API_KEY;

	// If Pexels API key is present, proxy live to Pexels
	if (pexelsKey) {
		try {
			if (type === "video") {
				const url = `https://api.pexels.com/videos/search?query=${encodeURIComponent(query || "popular")}&per_page=20&page=${page}`;
				const res = await fetch(url, {
					headers: { Authorization: pexelsKey },
				});
				if (res.ok) {
					const data = await res.json();
					const results: StockMediaItem[] = (data.videos || []).map(
						(v: any) => {
							const bestFile =
								v.video_files.find((f: any) => f.quality === "hd") ||
								v.video_files[0];
							return {
								id: `pexels-${v.id}`,
								title: `Video by ${v.user?.name ?? "Creator"}`,
								type: "video",
								duration: v.duration,
								thumbnail: v.image,
								previewUrl: bestFile?.link,
								downloadUrl: bestFile?.link,
								author: v.user?.name ?? "Pexels Creator",
								width: v.width,
								height: v.height,
							};
						},
					);
					return NextResponse.json({
						results,
						total: data.total_results,
						page: data.page,
					});
				}
			} else {
				const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query || "aesthetic")}&per_page=20&page=${page}`;
				const res = await fetch(url, {
					headers: { Authorization: pexelsKey },
				});
				if (res.ok) {
					const data = await res.json();
					const results: StockMediaItem[] = (data.photos || []).map(
						(p: any) => ({
							id: `pexels-${p.id}`,
							title: p.alt || `Photo by ${p.photographer}`,
							type: "photo",
							duration: 5,
							thumbnail: p.src.medium,
							downloadUrl: p.src.large2x || p.src.large,
							author: p.photographer,
							width: p.width,
							height: p.height,
						}),
					);
					return NextResponse.json({
						results,
						total: data.total_results,
						page: data.page,
					});
				}
			}
		} catch (error) {
			console.warn("Pexels fetch failed, falling back to curated stock", error);
		}
	}

	// Curated stock fallback
	const pool = type === "video" ? CURATED_STOCK_VIDEOS : CURATED_STOCK_PHOTOS;
	const filtered = query
		? pool.filter((item) =>
				(item.title + " " + item.author).toLowerCase().includes(query),
			)
		: pool;

	return NextResponse.json({
		results: filtered.length > 0 ? filtered : pool,
		total: filtered.length,
		page: 1,
	});
}
