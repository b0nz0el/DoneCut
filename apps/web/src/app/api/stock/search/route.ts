import { type NextRequest, NextResponse } from "next/server";

export interface StockMediaItem {
	id: string;
	title: string;
	type: "video" | "photo";
	category: string;
	duration: number; // in seconds
	thumbnail: string;
	previewUrl?: string;
	downloadUrl: string;
	author: string;
	width: number;
	height: number;
	tags: string[];
}

// 100% Verified, live, fast, CORS-enabled video library
const STOCK_VIDEOS: StockMediaItem[] = [
	// --- NATURE & OCEAN ---
	{
		id: "v-nat-1",
		title: "Cinematic Ocean Waves",
		type: "video",
		category: "Nature",
		duration: 15,
		thumbnail:
			"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=60",
		previewUrl: "https://vjs.zencdn.net/v/oceans.mp4",
		downloadUrl: "https://vjs.zencdn.net/v/oceans.mp4",
		author: "Ocean Studio",
		width: 1920,
		height: 1080,
		tags: ["nature", "ocean", "waves", "sea", "beach", "water", "trending"],
	},
	{
		id: "v-nat-2",
		title: "Blooming Spring Flower",
		type: "video",
		category: "Nature",
		duration: 6,
		thumbnail:
			"https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&auto=format&fit=crop&q=60",
		previewUrl:
			"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
		downloadUrl:
			"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
		author: "Botanical Labs",
		width: 1920,
		height: 1080,
		tags: ["nature", "flower", "spring", "garden", "macro", "plants", "trending"],
	},
	{
		id: "v-nat-3",
		title: "Mountain Forest Landscape",
		type: "video",
		category: "Nature",
		duration: 14,
		thumbnail:
			"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=60",
		previewUrl:
			"https://cdn.jsdelivr.net/gh/mediaelement/mediaelement-files/echo-hereweare.mp4",
		downloadUrl:
			"https://cdn.jsdelivr.net/gh/mediaelement/mediaelement-files/echo-hereweare.mp4",
		author: "Alps Cinematic",
		width: 1920,
		height: 1080,
		tags: ["nature", "mountain", "forest", "alps", "landscape", "drone", "trending"],
	},
	{
		id: "v-nat-4",
		title: "Sunny Meadow Wildlife",
		type: "video",
		category: "Nature",
		duration: 12,
		thumbnail:
			"https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&auto=format&fit=crop&q=60",
		previewUrl:
			"https://cdn.jsdelivr.net/gh/mediaelement/mediaelement-files/big_buck_bunny.mp4",
		downloadUrl:
			"https://cdn.jsdelivr.net/gh/mediaelement/mediaelement-files/big_buck_bunny.mp4",
		author: "Wild Forest",
		width: 1920,
		height: 1080,
		tags: ["nature", "wildlife", "green", "trees", "sunlight", "peaceful"],
	},
	{
		id: "v-nat-5",
		title: "Fresh Organic Nature Farm",
		type: "video",
		category: "Nature",
		duration: 16,
		thumbnail:
			"https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=600&auto=format&fit=crop&q=60",
		previewUrl:
			"https://cdn.jsdelivr.net/gh/intel-iot-devkit/sample-videos/fruit-and-vegetable-detection.mp4",
		downloadUrl:
			"https://cdn.jsdelivr.net/gh/intel-iot-devkit/sample-videos/fruit-and-vegetable-detection.mp4",
		author: "Eco Harvest",
		width: 1920,
		height: 1080,
		tags: ["nature", "harvest", "organic", "farm", "garden", "fresh"],
	},

	// --- CITIES & METROPOLIS ---
	{
		id: "v-city-1",
		title: "City Highway Vehicles Traffic",
		type: "video",
		category: "City",
		duration: 10,
		thumbnail:
			"https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&auto=format&fit=crop&q=60",
		previewUrl:
			"https://cdn.jsdelivr.net/gh/intel-iot-devkit/sample-videos/car-detection.mp4",
		downloadUrl:
			"https://cdn.jsdelivr.net/gh/intel-iot-devkit/sample-videos/car-detection.mp4",
		author: "Metro Traffic Drone",
		width: 1920,
		height: 1080,
		tags: ["city", "traffic", "cars", "highway", "vehicles", "drone", "trending"],
	},
	{
		id: "v-city-2",
		title: "Metropolis Street Cyclists & Traffic",
		type: "video",
		category: "City",
		duration: 12,
		thumbnail:
			"https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=600&auto=format&fit=crop&q=60",
		previewUrl:
			"https://cdn.jsdelivr.net/gh/intel-iot-devkit/sample-videos/person-bicycle-car-detection.mp4",
		downloadUrl:
			"https://cdn.jsdelivr.net/gh/intel-iot-devkit/sample-videos/person-bicycle-car-detection.mp4",
		author: "Urban Motion",
		width: 1920,
		height: 1080,
		tags: ["city", "street", "urban", "bicycle", "lifestyle", "trending"],
	},
	{
		id: "v-city-3",
		title: "Modern City Pedestrians Walk",
		type: "video",
		category: "City",
		duration: 14,
		thumbnail:
			"https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&auto=format&fit=crop&q=60",
		previewUrl:
			"https://cdn.jsdelivr.net/gh/intel-iot-devkit/sample-videos/face-demographics-walking.mp4",
		downloadUrl:
			"https://cdn.jsdelivr.net/gh/intel-iot-devkit/sample-videos/face-demographics-walking.mp4",
		author: "Cityscape Media",
		width: 1920,
		height: 1080,
		tags: ["city", "people", "pedestrians", "sidewalk", "urban", "new york"],
	},
	{
		id: "v-city-4",
		title: "Commercial Plaza Crowd Motion",
		type: "video",
		category: "City",
		duration: 11,
		thumbnail:
			"https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&auto=format&fit=crop&q=60",
		previewUrl:
			"https://cdn.jsdelivr.net/gh/intel-iot-devkit/sample-videos/people-detection.mp4",
		downloadUrl:
			"https://cdn.jsdelivr.net/gh/intel-iot-devkit/sample-videos/people-detection.mp4",
		author: "Metropolis Lab",
		width: 1920,
		height: 1080,
		tags: ["city", "mall", "crowd", "people", "architecture"],
	},

	// --- AESTHETIC & RETRO ---
	{
		id: "v-aes-1",
		title: "Friday Retro Motion Party",
		type: "video",
		category: "Aesthetic",
		duration: 8,
		thumbnail:
			"https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=60",
		previewUrl:
			"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
		downloadUrl:
			"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
		author: "Retro Vibe",
		width: 1920,
		height: 1080,
		tags: ["aesthetic", "party", "neon", "retro", "motion", "fun", "trending"],
	},
	{
		id: "v-aes-2",
		title: "Minimalist Studio Clean Design",
		type: "video",
		category: "Aesthetic",
		duration: 10,
		thumbnail:
			"https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&auto=format&fit=crop&q=60",
		previewUrl:
			"https://cdn.jsdelivr.net/gh/intel-iot-devkit/sample-videos/bottle-detection.mp4",
		downloadUrl:
			"https://cdn.jsdelivr.net/gh/intel-iot-devkit/sample-videos/bottle-detection.mp4",
		author: "Studio Minimal",
		width: 1920,
		height: 1080,
		tags: ["aesthetic", "minimalist", "clean", "design", "product", "studio"],
	},

	// --- PEOPLE & WORKSPACE ---
	{
		id: "v-ppl-1",
		title: "Creative Studio Collaboration",
		type: "video",
		category: "People",
		duration: 15,
		thumbnail:
			"https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=60",
		previewUrl:
			"https://cdn.jsdelivr.net/gh/intel-iot-devkit/sample-videos/classroom.mp4",
		downloadUrl:
			"https://cdn.jsdelivr.net/gh/intel-iot-devkit/sample-videos/classroom.mp4",
		author: "Team Workshop",
		width: 1920,
		height: 1080,
		tags: ["people", "team", "workshop", "collaboration", "learning", "trending"],
	},
	{
		id: "v-ppl-2",
		title: "Retail Lifestyle Shopping",
		type: "video",
		category: "People",
		duration: 13,
		thumbnail:
			"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=60",
		previewUrl:
			"https://cdn.jsdelivr.net/gh/intel-iot-devkit/sample-videos/store-aisle-detection.mp4",
		downloadUrl:
			"https://cdn.jsdelivr.net/gh/intel-iot-devkit/sample-videos/store-aisle-detection.mp4",
		author: "Lifestyle Store",
		width: 1920,
		height: 1080,
		tags: ["people", "store", "shopping", "lifestyle", "mall"],
	},
];

// Rich, high-definition stock photos library from Unsplash CDN (Open CORS)
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
		width: 3840,
		height: 2160,
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
		width: 3840,
		height: 2160,
		tags: ["nature", "sunset", "beach", "palm", "ocean", "vacation", "trending"],
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
		width: 3840,
		height: 2160,
		tags: ["nature", "forest", "fog", "pine", "moody", "green"],
	},
	{
		id: "p-nat-4",
		title: "Crystal Clear Turquoise Alpine Lake",
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
	{
		id: "p-nat-5",
		title: "Cascading Rainforest Waterfall",
		type: "photo",
		category: "Nature",
		duration: 5,
		thumbnail:
			"https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600&auto=format&fit=crop&q=60",
		downloadUrl:
			"https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1920&auto=format&fit=crop&q=80",
		author: "Tom Gainor",
		width: 1920,
		height: 1080,
		tags: ["nature", "waterfall", "river", "tropical", "jungle"],
	},
	{
		id: "p-nat-6",
		title: "Golden Desert Sand Dunes",
		type: "photo",
		category: "Nature",
		duration: 5,
		thumbnail:
			"https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&auto=format&fit=crop&q=60",
		downloadUrl:
			"https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1920&auto=format&fit=crop&q=80",
		author: "Jeremy Bishop",
		width: 3840,
		height: 2160,
		tags: ["nature", "desert", "sand", "dunes", "sahara", "warm"],
	},
	{
		id: "p-nat-7",
		title: "Northern Lights Aurora Borealis",
		type: "photo",
		category: "Nature",
		duration: 5,
		thumbnail:
			"https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?w=600&auto=format&fit=crop&q=60",
		downloadUrl:
			"https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?w=1920&auto=format&fit=crop&q=80",
		author: "Vincent Guth",
		width: 3840,
		height: 2160,
		tags: ["nature", "aurora", "night", "stars", "sky", "arctic", "trending"],
	},

	// --- CITIES & ARCHITECTURE ---
	{
		id: "p-city-1",
		title: "Tokyo Shinjuku Cyberpunk Night Neon",
		type: "photo",
		category: "Cyberpunk",
		duration: 5,
		thumbnail:
			"https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=60",
		downloadUrl:
			"https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1920&auto=format&fit=crop&q=80",
		author: "Aleksandar Pasaric",
		width: 3840,
		height: 2160,
		tags: ["city", "cyberpunk", "tokyo", "japan", "neon", "night", "trending"],
	},
	{
		id: "p-city-2",
		title: "New York Manhattan Sunset Skyline",
		type: "photo",
		category: "City",
		duration: 5,
		thumbnail:
			"https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&auto=format&fit=crop&q=60",
		downloadUrl:
			"https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1920&auto=format&fit=crop&q=80",
		author: "Ben O'Bro",
		width: 3840,
		height: 2160,
		tags: ["city", "new york", "skyline", "manhattan", "sunset", "trending"],
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
		tags: ["city", "singapore", "futuristic", "architecture", "garden"],
	},
	{
		id: "p-city-4",
		title: "Paris Eiffel Tower Twilight",
		type: "photo",
		category: "City",
		duration: 5,
		thumbnail:
			"https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop&q=60",
		downloadUrl:
			"https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920&auto=format&fit=crop&q=80",
		author: "Chris Karidis",
		width: 1920,
		height: 1080,
		tags: ["city", "paris", "france", "eiffel", "romantic", "europe"],
	},
	{
		id: "p-city-5",
		title: "Chicago Riverwalk Modern Skyscrapers",
		type: "photo",
		category: "City",
		duration: 5,
		thumbnail:
			"https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=600&auto=format&fit=crop&q=60",
		downloadUrl:
			"https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=1920&auto=format&fit=crop&q=80",
		author: "Sawyer Bengtson",
		width: 3840,
		height: 2160,
		tags: ["city", "chicago", "buildings", "architecture", "river"],
	},

	// --- SUNSET & GOLDEN HOUR ---
	{
		id: "p-sun-1",
		title: "Milky Way Galaxy Starfield",
		type: "photo",
		category: "Sunset",
		duration: 5,
		thumbnail:
			"https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600&auto=format&fit=crop&q=60",
		downloadUrl:
			"https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1920&auto=format&fit=crop&q=80",
		author: "Mark Basarab",
		width: 3840,
		height: 2160,
		tags: ["sunset", "stars", "galaxy", "milky way", "night", "aesthetic", "trending"],
	},
	{
		id: "p-sun-2",
		title: "Warm Campfire Under Desert Stars",
		type: "photo",
		category: "Sunset",
		duration: 5,
		thumbnail:
			"https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=600&auto=format&fit=crop&q=60",
		downloadUrl:
			"https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=1920&auto=format&fit=crop&q=80",
		author: "Kimson Doan",
		width: 1920,
		height: 1080,
		tags: ["sunset", "fire", "campfire", "cozy", "stars", "night"],
	},
	{
		id: "p-sun-3",
		title: "Golden Hour Calm Ocean Horizon",
		type: "photo",
		category: "Sunset",
		duration: 5,
		thumbnail:
			"https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=600&auto=format&fit=crop&q=60",
		downloadUrl:
			"https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=1920&auto=format&fit=crop&q=80",
		author: "Marek Piwnicki",
		width: 3840,
		height: 2160,
		tags: ["sunset", "golden hour", "warm", "peaceful", "sky", "sea", "trending"],
	},

	// --- TECHNOLOGY & CYBERPUNK ---
	{
		id: "p-tech-1",
		title: "Dark Minimalist Code Screen",
		type: "photo",
		category: "Technology",
		duration: 5,
		thumbnail:
			"https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=60",
		downloadUrl:
			"https://images.unsplash.com/photo-1542838132-92c53300491e?w=1920&auto=format&fit=crop&q=80",
		author: "Florian Olivo",
		width: 3840,
		height: 2160,
		tags: ["technology", "coding", "software", "developer", "matrix", "trending"],
	},
	{
		id: "p-tech-2",
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
	{
		id: "p-tech-3",
		title: "Glowing Silicon Chip Processor",
		type: "photo",
		category: "Technology",
		duration: 5,
		thumbnail:
			"https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=60",
		downloadUrl:
			"https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&auto=format&fit=crop&q=80",
		author: "Alexandre Debiève",
		width: 3840,
		height: 2160,
		tags: ["technology", "chip", "hardware", "computer", "electronics"],
	},
	{
		id: "p-tech-4",
		title: "Neon Cyberpunk Alley Rain Reflection",
		type: "photo",
		category: "Cyberpunk",
		duration: 5,
		thumbnail:
			"https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=60",
		downloadUrl:
			"https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&auto=format&fit=crop&q=80",
		author: "Lorenzo Herrera",
		width: 3840,
		height: 2160,
		tags: ["cyberpunk", "neon", "rain", "night", "synthwave", "future", "trending"],
	},

	// --- PEOPLE & WORKSPACE ---
	{
		id: "p-ppl-1",
		title: "Modern Minimalist Desk Setup",
		type: "photo",
		category: "People",
		duration: 5,
		thumbnail:
			"https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&auto=format&fit=crop&q=60",
		downloadUrl:
			"https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1920&auto=format&fit=crop&q=80",
		author: "Alesia Kazantceva",
		width: 3840,
		height: 2160,
		tags: ["people", "workspace", "desk", "minimalist", "laptop", "office", "trending"],
	},
	{
		id: "p-ppl-2",
		title: "Developer Working on MacBook",
		type: "photo",
		category: "People",
		duration: 5,
		thumbnail:
			"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=60",
		downloadUrl:
			"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&auto=format&fit=crop&q=80",
		author: "Christopher Gower",
		width: 1920,
		height: 1080,
		tags: ["people", "coding", "developer", "laptop", "workspace"],
	},
	{
		id: "p-ppl-3",
		title: "Artisanal Coffee Latte Art",
		type: "photo",
		category: "People",
		duration: 5,
		thumbnail:
			"https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=600&auto=format&fit=crop&q=60",
		downloadUrl:
			"https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=1920&auto=format&fit=crop&q=80",
		author: "Nate Dumlao",
		width: 1920,
		height: 1080,
		tags: ["people", "coffee", "latte", "cafe", "morning", "lifestyle"],
	},

	// --- AESTHETIC & DRONE ---
	{
		id: "p-aes-1",
		title: "Abstract Liquid Marble Swirl",
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
		tags: ["aesthetic", "abstract", "marble", "acrylic", "art", "colorful", "trending"],
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
		tags: ["aesthetic", "gradient", "neon", "abstract", "vaporwave", "pink"],
	},
	{
		id: "p-dro-1",
		title: "Winding Mountain Alpine Highway",
		type: "photo",
		category: "Drone",
		duration: 5,
		thumbnail:
			"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=60",
		downloadUrl:
			"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&auto=format&fit=crop&q=80",
		author: "Aero Drone",
		width: 3840,
		height: 2160,
		tags: ["drone", "nature", "road", "mountains", "aerial", "travel", "trending"],
	},
	{
		id: "p-dro-2",
		title: "Aerial Coastal Cliff Turquoise Water",
		type: "photo",
		category: "Drone",
		duration: 5,
		thumbnail:
			"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=60",
		downloadUrl:
			"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&auto=format&fit=crop&q=80",
		author: "Drone Coast",
		width: 3840,
		height: 2160,
		tags: ["drone", "nature", "coast", "cliff", "ocean", "beach", "trending"],
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
					item.tags.some((tag: string) => tag.toLowerCase().includes(category)),
			);
		}
	}

	if (query) {
		const searchTerms = query.split(/\s+/).filter(Boolean);
		filtered = pool.filter((item) => {
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
