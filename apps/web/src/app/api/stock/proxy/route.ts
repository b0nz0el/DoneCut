import { type NextRequest, NextResponse } from "next/server";

export async function OPTIONS() {
	return new NextResponse(null, {
		status: 204,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, OPTIONS",
			"Access-Control-Allow-Headers": "*",
		},
	});
}

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const url = searchParams.get("url");

	if (!url) {
		return NextResponse.json(
			{ error: "URL parameter required" },
			{ status: 400 },
		);
	}

	try {
		const targetUrl = new URL(url);
		// Security: Only allow http and https protocols
		if (targetUrl.protocol !== "http:" && targetUrl.protocol !== "https:") {
			return NextResponse.json({ error: "Invalid protocol" }, { status: 400 });
		}

		const response = await fetch(url, {
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
				Accept: "*/*",
			},
		});

		if (!response.ok) {
			return NextResponse.json(
				{ error: `Upstream fetch failed: ${response.statusText}` },
				{ status: response.status },
			);
		}

		let contentType =
			response.headers.get("content-type") || "application/octet-stream";

		const pathname = targetUrl.pathname.toLowerCase();
		if (pathname.endsWith(".mp4")) {
			contentType = "video/mp4";
		} else if (pathname.endsWith(".webm")) {
			contentType = "video/webm";
		} else if (pathname.endsWith(".jpg") || pathname.endsWith(".jpeg")) {
			contentType = "image/jpeg";
		} else if (pathname.endsWith(".png")) {
			contentType = "image/png";
		}

		const blob = await response.arrayBuffer();

		return new NextResponse(blob, {
			status: 200,
			headers: {
				"Content-Type": contentType,
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET, OPTIONS",
				"Cache-Control": "public, max-age=86400",
			},
		});
	} catch (error) {
		console.error("Stock proxy error:", error);
		return NextResponse.json(
			{ error: "Failed to proxy media file" },
			{ status: 500 },
		);
	}
}
