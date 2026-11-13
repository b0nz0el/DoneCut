import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const text = searchParams.get("text")?.trim();
	const lang = searchParams.get("lang") || "id";

	if (!text) {
		return NextResponse.json(
			{ error: "Parameter 'text' diperlukan" },
			{ status: 400 },
		);
	}

	try {
		// Fetch natural TTS voice audio from reliable Google TTS service
		const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${encodeURIComponent(lang)}&client=tw-ob&q=${encodeURIComponent(text.slice(0, 500))}`;

		const response = await fetch(url, {
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
			},
		});

		if (!response.ok) {
			return NextResponse.json(
				{ error: "Gagal menghasilkan suara narasi" },
				{ status: response.status },
			);
		}

		const audioData = await response.arrayBuffer();

		return new NextResponse(audioData, {
			headers: {
				"Content-Type": "audio/mpeg",
				"Cache-Control": "public, max-age=86400",
			},
		});
	} catch (error) {
		console.error("TTS generation error:", error);
		return NextResponse.json(
			{ error: "Gagal menghubungi layanan Text-to-Speech" },
			{ status: 500 },
		);
	}
}
