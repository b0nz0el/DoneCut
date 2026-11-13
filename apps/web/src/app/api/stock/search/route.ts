import { type NextRequest, NextResponse } from "next/server";

export interface StockMediaItem {
	id: string;
	title: string;
	type: "video" | "photo";
	category: string;
	duration: number; // in seconds (0 or 5 for photos)
	thumbnail: string;
	previewUrl?: string;
	downloadUrl: string;
	author: string;
	width: number;
	height: number;
	tags: string[];
}

// Giant curated royalty-free stock media library with reliable CDN sources
const STOCK_VIDEOS: StockMediaItem[] = [
	// --- NATURE & LANDSCAPES ---
	{
		id: "v-nat-1",
		title: "Cinematic Ocean Waves",
		type: "video",
		category: "Nature",
		duration: 12,
		thumbnail:
			"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=60",
		previewUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
		downloadUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
		author: "Ocean Studio",
		width: 1920,
		height: 1080,
		tags: ["nature", "ocean", "waves", "sea", "beach", "water", "trending"],
	},
	{
		id: "v-nat-2",
		title: "Mountain Cloud Timelapse",
		type: "video",
		category: "Nature",
		duration: 15,
		thumbnail:
			"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&auto=format&fit=crop&q=60",
		previewUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
		downloadUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
		author: "Alps Drone",
		width: 3840,
		height: 2160,
		tags: ["nature", "mountain", "clouds", "sky", "timelapse", "landscape", "trending"],
	},
	{
		id: "v-nat-3",
		title: "Tropical Forest Waterfall",
		type: "video",
		category: "Nature",
		duration: 10,
		thumbnail:
			"https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=500&auto=format&fit=crop&q=60",
		previewUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
		downloadUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
		author: "Rainforest Media",
		width: 1920,
		height: 1080,
		tags: ["nature", "waterfall", "river", "forest", "jungle", "green"],
	},
	{
		id: "v-nat-4",
		title: "Sunlight Through Pine Trees",
		type: "video",
		category: "Nature",
		duration: 14,
		thumbnail:
			"https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&auto=format&fit=crop&q=60",
		previewUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
		downloadUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
		author: "Nordic Woods",
		width: 1920,
		height: 1080,
		tags: ["nature", "forest", "sunlight", "trees", "morning", "peaceful"],
	},
	{
		id: "v-nat-5",
		title: "Island Coast Drone Flyover",
		type: "video",
		category: "Drone",
		duration: 16,
		thumbnail:
			"https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=60",
		previewUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4",
		downloadUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4",
		author: "Aero View",
		width: 3840,
		height: 2160,
		tags: ["drone", "nature", "island", "coast", "aerial", "travel", "trending"],
	},

	// --- CITIES & METROPOLIS ---
	{
		id: "v-city-1",
		title: "Modern Skyline Drone View",
		type: "video",
		category: "City",
		duration: 15,
		thumbnail:
			"https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=500&auto=format&fit=crop&q=60",
		previewUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
		downloadUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
		author: "Skyline Media",
		width: 3840,
		height: 2160,
		tags: ["city", "drone", "skyline", "buildings", "architecture", "trending"],
	},
	{
		id: "v-city-2",
		title: "Tokyo Cyberpunk Night Lights",
		type: "video",
		category: "Cyberpunk",
		duration: 14,
		thumbnail:
			"https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=60",
		previewUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
		downloadUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
		author: "Tokyo Nightfall",
		width: 1920,
		height: 1080,
		tags: ["city", "cyberpunk", "tokyo", "japan", "neon", "night", "trending"],
	},
	{
		id: "v-city-3",
		title: "Highway Traffic Light Streaks",
		type: "video",
		category: "City",
		duration: 12,
		thumbnail:
			"https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=500&auto=format&fit=crop&q=60",
		previewUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
		downloadUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
		author: "Hyperlapse Studio",
		width: 1920,
		height: 1080,
		tags: ["city", "traffic", "highway", "hyperlapse", "lights", "speed"],
	},
	{
		id: "v-city-4",
		title: "Pedestrian Street Crosswalk",
		type: "video",
		category: "City",
		duration: 11,
		thumbnail:
			"https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&auto=format&fit=crop&q=60",
		previewUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
		downloadUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
		author: "Manhattan Urban",
		width: 1920,
		height: 1080,
		tags: ["city", "people", "street", "crosswalk", "urban", "new york"],
	},

	// --- SUNSET & GOLDEN HOUR ---
	{
		id: "v-sunset-1",
		title: "Golden Hour Ocean Sunset",
		type: "video",
		category: "Sunset",
		duration: 10,
		thumbnail:
			"https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=500&auto=format&fit=crop&q=60",
		previewUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
		downloadUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
		author: "Golden Hours",
		width: 3840,
		height: 2160,
		tags: ["sunset", "golden hour", "aesthetic", "ocean", "sky", "warm", "trending"],
	},
	{
		id: "v-sunset-2",
		title: "Campfire Glowing Under Stars",
		type: "video",
		category: "Sunset",
		duration: 13,
		thumbnail:
			"https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=500&auto=format&fit=crop&q=60",
		previewUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
		downloadUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
		author: "Camp Nature",
		width: 1920,
		height: 1080,
		tags: ["sunset", "fire", "campfire", "stars", "night", "aesthetic"],
	},
	{
		id: "v-sunset-3",
		title: "Sunset Over City Skyline",
		type: "video",
		category: "Sunset",
		duration: 14,
		thumbnail:
			"https://images.unsplash.com/photo-1508873696983-2df5293cb325?w=500&auto=format&fit=crop&q=60",
		previewUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
		downloadUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
		author: "Twilight Films",
		width: 1920,
		height: 1080,
		tags: ["sunset", "city", "twilight", "dusk", "sky", "clouds"],
	},

	// --- TECHNOLOGY & CYBERPUNK ---
	{
		id: "v-tech-1",
		title: "Futuristic Code Matrix",
		type: "video",
		category: "Technology",
		duration: 14,
		thumbnail:
			"https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60",
		previewUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4",
		downloadUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4",
		author: "Cyber Matrix",
		width: 1920,
		height: 1080,
		tags: ["technology", "coding", "matrix", "hacker", "cyber", "ai", "trending"],
	},
	{
		id: "v-tech-2",
		title: "Neon Cyber Tunnel Motion",
		type: "video",
		category: "Cyberpunk",
		duration: 12,
		thumbnail:
			"https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=60",
		previewUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
		downloadUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
		author: "Synthwave Vibe",
		width: 1920,
		height: 1080,
		tags: ["cyberpunk", "technology", "tunnel", "neon", "motion", "synthwave"],
	},
	{
		id: "v-tech-3",
		title: "Circuit Board Microscopic Scan",
		type: "video",
		category: "Technology",
		duration: 11,
		thumbnail:
			"https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60",
		previewUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
		downloadUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
		author: "Silicon Labs",
		width: 3840,
		height: 2160,
		tags: ["technology", "chip", "hardware", "computer", "electronics", "future"],
	},

	// --- PEOPLE & WORKSPACE ---
	{
		id: "v-ppl-1",
		title: "Modern Developer Workstation",
		type: "video",
		category: "People",
		duration: 12,
		thumbnail:
			"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=60",
		previewUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
		downloadUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
		author: "Dev Life",
		width: 1920,
		height: 1080,
		tags: ["people", "technology", "laptop", "coding", "desk", "workspace", "trending"],
	},
	{
		id: "v-ppl-2",
		title: "Barista Pouring Specialty Coffee",
		type: "video",
		category: "People",
		duration: 9,
		thumbnail:
			"https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=500&auto=format&fit=crop&q=60",
		previewUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
		downloadUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
		author: "Coffee Culture",
		width: 1920,
		height: 1080,
		tags: ["people", "coffee", "lifestyle", "morning", "aesthetic", "cafe"],
	},
	{
		id: "v-ppl-3",
		title: "Artist Painting in Studio",
		type: "video",
		category: "Aesthetic",
		duration: 13,
		thumbnail:
			"https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=500&auto=format&fit=crop&q=60",
		previewUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
		downloadUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
		author: "Creative Atelier",
		width: 1920,
		height: 1080,
		tags: ["aesthetic", "people", "art", "paint", "creative", "studio"],
	},

	// --- AESTHETIC & DRONE ---
	{
		id: "v-aes-1",
		title: "Liquid Marble Motion Swirl",
		type: "video",
		category: "Aesthetic",
		duration: 10,
		thumbnail:
			"https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&auto=format&fit=crop&q=60",
		previewUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
		downloadUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
		author: "Color Flow",
		width: 3840,
		height: 2160,
		tags: ["aesthetic", "abstract", "marble", "liquid", "art", "colorful", "trending"],
	},
	{
		id: "v-aes-2",
		title: "Vintage Film Grain Tape Overlay",
		type: "video",
		category: "Aesthetic",
		duration: 12,
		thumbnail:
			"https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=60",
		previewUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
		downloadUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
		author: "Retro Cine",
		width: 1920,
		height: 1080,
		tags: ["aesthetic", "vintage", "film", "retro", "grain", "nostalgia"],
	},
	{
		id: "v-dro-1",
		title: "Mountain Highway Winding Road",
		type: "video",
		category: "Drone",
		duration: 15,
		thumbnail:
			"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&auto=format&fit=crop&q=60",
		previewUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
		downloadUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
		author: "Aero Highway",
		width: 3840,
		height: 2160,
		tags: ["drone", "nature", "road", "travel", "aerial", "mountains", "trending"],
	},
];

const STOCK_PHOTOS: StockMediaItem[] = [
	// --- NATURE & LANDSCAPES ---
	{
		id: "p-nat-1",
		title: "Dramatic Snow Mountain Peak",
		type: "photo",
		category: "Nature",
		duration: 5,
		thumbnail:
			"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=60",
		downloadUrl:
			"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&auto=format&fit=crop&q=80",
		author: "Kalen Emsley",
		width: 1920,
		height: 1080,
		tags: ["nature", "mountain", "snow", "adventure", "landscape", "trending"],
	},
	{
		id: "p-nat-2",
		title: "Tropical Beach Palm Tree Sunset",
		type: "photo",
		category: "Nature",
		duration: 5,
		thumbnail:
			"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=60",
		downloadUrl:
			"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&auto=format&fit=crop&q=80",
		author: "Sean Oulashin",
		width: 1920,
		height: 1080,
		tags: ["nature", "sunset", "beach", "palm", "ocean", "vacation"],
	},
	{
		id: "p-nat-3",
		title: "Misty Deep Pine Forest",
		type: "photo",
		category: "Nature",
		duration: 5,
		thumbnail:
			"https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&auto=format&fit=crop&q=60",
		downloadUrl:
			"https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&auto=format&fit=crop&q=80",
		author: "Sebastian Unrau",
		width: 1920,
		height: 1080,
		tags: ["nature", "forest", "fog", "pine", "moody", "green"],
	},
	{
		id: "p-nat-4",
		title: "Crystal Clear Turquoise Lake",
		type: "photo",
		category: "Nature",
		duration: 5,
		thumbnail:
			"https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=60",
		downloadUrl:
			"https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&auto=format&fit=crop&q=80",
		author: "Bailey Zindel",
		width: 3840,
		height: 2160,
		tags: ["nature", "lake", "water", "mountains", "clean", "trending"],
	},

	// --- CITIES & ARCHITECTURE ---
	{
		id: "p-city-1",
		title: "Tokyo Cyberpunk Shinjuku Neon",
		type: "photo",
		category: "Cyberpunk",
		duration: 5,
		thumbnail:
			"https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=60",
		downloadUrl:
			"https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1920&auto=format&fit=crop&q=80",
		author: "Aleksandar Pasaric",
		width: 1920,
		height: 1080,
		tags: ["city", "cyberpunk", "tokyo", "japan", "neon", "night", "trending"],
	},
	{
		id: "p-city-2",
		title: "New York Manhattan Sunset Panorama",
		type: "photo",
		category: "City",
		duration: 5,
		thumbnail:
			"https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&auto=format&fit=crop&q=60",
		downloadUrl:
			"https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1920&auto=format&fit=crop&q=80",
		author: "Ben O'Bro",
		width: 1920,
		height: 1080,
		tags: ["city", "new york", "skyline", "manhattan", "sunset"],
	},
	{
		id: "p-city-3",
		title: "Singapore Marina Futuristic Gardens",
		type: "photo",
		category: "City",
		duration: 5,
		thumbnail:
			"https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&auto=format&fit=crop&q=60",
		downloadUrl:
			"https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1920&auto=format&fit=crop&q=80",
		author: "Hu Chen",
		width: 3840,
		height: 2160,
		tags: ["city", "singapore", "futuristic", "architecture", "garden", "trending"],
	},

	// --- TECHNOLOGY & WORKSPACE ---
	{
		id: "p-tech-1",
		title: "Modern Minimalist Desk Setup",
		type: "photo",
		category: "People",
		duration: 5,
		thumbnail:
			"https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&auto=format&fit=crop&q=60",
		downloadUrl:
			"https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1920&auto=format&fit=crop&q=80",
		author: "Alesia Kazantceva",
		width: 1920,
		height: 1080,
		tags: ["people", "workspace", "desk", "minimalist", "laptop", "office", "trending"],
	},
	{
		id: "p-tech-2",
		title: "Dark Aesthetic Code Screen",
		type: "photo",
		category: "Technology",
		duration: 5,
		thumbnail:
			"https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=60",
		downloadUrl:
			"https://images.unsplash.com/photo-1542838132-92c53300491e?w=1920&auto=format&fit=crop&q=80",
		author: "Florian Olivo",
		width: 1920,
		height: 1080,
		tags: ["technology", "coding", "programming", "software", "developer"],
	},
	{
		id: "p-tech-3",
		title: "AI Artificial Neural Network Art",
		type: "photo",
		category: "Technology",
		duration: 5,
		thumbnail:
			"https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=60",
		downloadUrl:
			"https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1920&auto=format&fit=crop&q=80",
		author: "Steve Johnson",
		width: 3840,
		height: 2160,
		tags: ["technology", "ai", "artificial intelligence", "future", "network", "trending"],
	},

	// --- AESTHETIC & SUNSET ---
	{
		id: "p-aes-1",
		title: "Milky Way Galaxy Starfield",
		type: "photo",
		category: "Sunset",
		duration: 5,
		thumbnail:
			"https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600&auto=format&fit=crop&q=60",
		downloadUrl:
			"https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1920&auto=format&fit=crop&q=80",
		author: "Mark Basarab",
		width: 1920,
		height: 1080,
		tags: ["sunset", "stars", "galaxy", "milky way", "night", "aesthetic", "trending"],
	},
	{
		id: "p-aes-2",
		title: "Neon Vaporwave Gradient Glow",
		type: "photo",
		category: "Aesthetic",
		duration: 5,
		thumbnail:
			"https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&auto=format&fit=crop&q=60",
		downloadUrl:
			"https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1920&auto=format&fit=crop&q=80",
		author: "David Clode",
		width: 1920,
		height: 1080,
		tags: ["aesthetic", "gradient", "neon", "abstract", "vaporwave", "pink", "purple"],
	},
	{
		id: "p-aes-3",
		title: "Abstract Fluid Paint Acrylic Swirl",
		type: "photo",
		category: "Aesthetic",
		duration: 5,
		thumbnail:
			"https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&auto=format&fit=crop&q=60",
		downloadUrl:
			"https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1920&auto=format&fit=crop&q=80",
		author: "Paweł Czerwiński",
		width: 3840,
		height: 2160,
		tags: ["aesthetic", "abstract", "paint", "art", "acrylic", "creative", "trending"],
	},
	{
		id: "p-dro-1",
		title: "Aerial Coastal Cliff Blue Lagoon",
		type: "photo",
		category: "Drone",
		duration: 5,
		thumbnail:
			"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=60",
		downloadUrl:
			"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&auto=format&fit=crop&q=80",
		author: "Drone Horizons",
		width: 3840,
		height: 2160,
		tags: ["drone", "nature", "coast", "cliff", "aerial", "ocean", "trending"],
	},
];

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const type = searchParams.get("type") === "photo" ? "photo" : "video";
	const category = (searchParams.get("category") || "").toLowerCase().trim();
	const query = (searchParams.get("q") || "").toLowerCase().trim();
	const page = Number(searchParams.get("page") ?? 1);

	const pexelsKey = process.env.PEXELS_API_KEY;

	// Live Pexels API proxy if API key is provided
	if (pexelsKey) {
		try {
			if (type === "video") {
				const searchTerm = query || (category && category !== "all" ? category : "popular");
				const url = `https://api.pexels.com/videos/search?query=${encodeURIComponent(searchTerm)}&per_page=30&page=${page}`;
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
								category: category || "Trending",
								duration: v.duration,
								thumbnail: v.image,
								previewUrl: bestFile?.link,
								downloadUrl: bestFile?.link,
								author: v.user?.name ?? "Pexels Creator",
								width: v.width,
								height: v.height,
								tags: [category, "video", "pexels"],
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
				const searchTerm = query || (category && category !== "all" ? category : "aesthetic");
				const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchTerm)}&per_page=30&page=${page}`;
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
							category: category || "Trending",
							duration: 5,
							thumbnail: p.src.medium,
							downloadUrl: p.src.large2x || p.src.large,
							author: p.photographer,
							width: p.width,
							height: p.height,
							tags: [category, "photo", "pexels"],
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

	// Curated stock fallback with smart keyword & category filtering
	const pool = type === "video" ? STOCK_VIDEOS : STOCK_PHOTOS;

	let filtered = pool;

	if (category && category !== "all") {
		if (category === "trending") {
			filtered = pool.filter((item) => item.tags.includes("trending"));
		} else {
			filtered = pool.filter(
				(item) =>
					item.category.toLowerCase() === category ||
					item.tags.some((tag) => tag.toLowerCase().includes(category)),
			);
		}
	}

	if (query) {
		const searchTerms = query.split(/\s+/).filter(Boolean);
		filtered = filtered.filter((item) => {
			const haystack = `${item.title} ${item.author} ${item.category} ${item.tags.join(" ")}`.toLowerCase();
			return searchTerms.some((term: string) => haystack.includes(term));
		});
	}

	return NextResponse.json({
		results: filtered.length > 0 ? filtered : pool,
		total: filtered.length,
		page: 1,
	});
}
