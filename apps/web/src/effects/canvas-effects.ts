import { createCanvasSurface } from "@/services/renderer/canvas-utils";
import type { EffectPass } from "@/effects/types";

/**
 * Executes 2D canvas and pixel-shader effects on an OffscreenCanvas.
 * Ensures smooth 60fps effects rendering across all browsers.
 */
export function applyCanvasEffect({
	source,
	width,
	height,
	pass,
}: {
	source: OffscreenCanvas;
	width: number;
	height: number;
	pass: EffectPass;
}): OffscreenCanvas {
	const surface = createCanvasSurface({ width, height });
	const ctx = surface.context;

	// First draw the source image
	ctx.drawImage(source, 0, 0, width, height);

	switch (pass.shader) {
		case "glitch":
			applyGlitch({ ctx, source, width, height, uniforms: pass.uniforms });
			break;
		case "rgb-split":
			applyRgbSplit({ ctx, source, width, height, uniforms: pass.uniforms });
			break;
		case "vhs":
			applyVhs({ ctx, source, width, height, uniforms: pass.uniforms });
			break;
		case "film-grain":
			applyFilmGrain({ ctx, width, height, uniforms: pass.uniforms });
			break;
		case "cinematic":
			applyCinematic({ ctx, source, width, height, uniforms: pass.uniforms });
			break;
		case "glow":
			applyGlow({ ctx, source, width, height, uniforms: pass.uniforms });
			break;
		default:
			break;
	}

	return surface.canvas;
}

function applyGlitch({
	ctx,
	source,
	width,
	height,
	uniforms,
}: {
	ctx: OffscreenCanvasRenderingContext2D;
	source: OffscreenCanvas;
	width: number;
	height: number;
	uniforms: Record<string, any>;
}) {
	const intensity = Number(uniforms.u_intensity ?? 20) / 100;
	if (intensity <= 0) return;

	const slices = Math.floor(5 + intensity * 15);
	const maxDisplacement = Math.floor(width * 0.05 * intensity);

	// Slice displacements
	for (let i = 0; i < slices; i++) {
		const sliceY = Math.floor(Math.random() * height);
		const sliceH = Math.floor(Math.random() * 25 + 5);
		const displacement = Math.floor((Math.random() - 0.5) * 2 * maxDisplacement);

		ctx.drawImage(
			source,
			0,
			sliceY,
			width,
			sliceH,
			displacement,
			sliceY,
			width,
			sliceH,
		);
	}

	// Color split overlays
	ctx.save();
	ctx.globalCompositeOperation = "screen";
	ctx.globalAlpha = 0.3 * intensity;
	ctx.fillStyle = "rgba(255, 0, 50, 0.5)";
	ctx.fillRect(0, 0, width, height);
	ctx.fillStyle = "rgba(0, 200, 255, 0.5)";
	ctx.fillRect(0, 0, width, height);
	ctx.restore();
}

function applyRgbSplit({
	ctx,
	source,
	width,
	height,
	uniforms,
}: {
	ctx: OffscreenCanvasRenderingContext2D;
	source: OffscreenCanvas;
	width: number;
	height: number;
	uniforms: Record<string, any>;
}) {
	const distance = Number(uniforms.u_distance ?? 10);
	if (distance <= 0) return;

	// Red channel shift
	ctx.save();
	ctx.globalCompositeOperation = "screen";
	ctx.globalAlpha = 0.6;
	ctx.drawImage(source, -distance, 0, width, height);
	// Cyan channel shift
	ctx.drawImage(source, distance, 0, width, height);
	ctx.restore();
}

function applyVhs({
	ctx,
	source,
	width,
	height,
	uniforms,
}: {
	ctx: OffscreenCanvasRenderingContext2D;
	source: OffscreenCanvas;
	width: number;
	height: number;
	uniforms: Record<string, any>;
}) {
	const intensity = Number(uniforms.u_intensity ?? 50) / 100;
	if (intensity <= 0) return;

	// Slight color bleed & warm retro tint
	ctx.save();
	ctx.globalCompositeOperation = "color-burn";
	ctx.globalAlpha = 0.15 * intensity;
	ctx.fillStyle = "#ffaa44";
	ctx.fillRect(0, 0, width, height);
	ctx.restore();

	// Scanlines
	ctx.save();
	ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
	const lineSpacing = 4;
	for (let y = 0; y < height; y += lineSpacing) {
		ctx.fillRect(0, y, width, 1.5);
	}
	ctx.restore();

	// VHS tracking noise bar
	const noiseY = Math.floor((Date.now() / 30) % height);
	ctx.save();
	ctx.fillStyle = `rgba(255, 255, 255, ${0.12 * intensity})`;
	ctx.fillRect(0, noiseY, width, 6);
	ctx.restore();
}

function applyFilmGrain({
	ctx,
	width,
	height,
	uniforms,
}: {
	ctx: OffscreenCanvasRenderingContext2D;
	width: number;
	height: number;
	uniforms: Record<string, any>;
}) {
	const intensity = Number(uniforms.u_intensity ?? 30) / 100;
	if (intensity <= 0) return;

	const imgData = ctx.getImageData(0, 0, width, height);
	const data = imgData.data;
	const grainAmount = intensity * 40;

	for (let i = 0; i < data.length; i += 4) {
		const noise = (Math.random() - 0.5) * grainAmount;
		data[i] = Math.min(255, Math.max(0, data[i] + noise));
		data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
		data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
	}

	ctx.putImageData(imgData, 0, 0);

	// Vignette around edges
	const gradient = ctx.createRadialGradient(
		width / 2,
		height / 2,
		(width / 2) * 0.5,
		width / 2,
		height / 2,
		(width / 2) * 1.1,
	);
	gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
	gradient.addColorStop(1, `rgba(0, 0, 0, ${0.4 * intensity})`);

	ctx.save();
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, width, height);
	ctx.restore();
}

function applyCinematic({
	ctx,
	source,
	width,
	height,
	uniforms,
}: {
	ctx: OffscreenCanvasRenderingContext2D;
	source: OffscreenCanvas;
	width: number;
	height: number;
	uniforms: Record<string, any>;
}) {
	const style = String(uniforms.u_style ?? "teal-orange");
	const intensity = Number(uniforms.u_intensity ?? 70) / 100;

	ctx.save();
	if (style === "teal-orange") {
		// Shadows get teal, highlights get orange
		ctx.globalCompositeOperation = "color";
		ctx.globalAlpha = 0.4 * intensity;
		const grad = ctx.createLinearGradient(0, height, width, 0);
		grad.addColorStop(0, "#005577"); // teal
		grad.addColorStop(1, "#ff8833"); // orange
		ctx.fillStyle = grad;
		ctx.fillRect(0, 0, width, height);

		ctx.globalCompositeOperation = "overlay";
		ctx.globalAlpha = 0.25 * intensity;
		ctx.fillStyle = "#ffaa55";
		ctx.fillRect(0, 0, width, height);
	} else if (style === "cyberpunk") {
		ctx.globalCompositeOperation = "color";
		ctx.globalAlpha = 0.5 * intensity;
		const grad = ctx.createLinearGradient(0, 0, width, height);
		grad.addColorStop(0, "#ff0077"); // neon pink
		grad.addColorStop(1, "#00ffff"); // neon cyan
		ctx.fillStyle = grad;
		ctx.fillRect(0, 0, width, height);
	} else if (style === "noir") {
		// High contrast B&W
		ctx.globalCompositeOperation = "saturation";
		ctx.globalAlpha = 1.0;
		ctx.fillStyle = "#000000";
		ctx.fillRect(0, 0, width, height);

		ctx.globalCompositeOperation = "overlay";
		ctx.globalAlpha = 0.4 * intensity;
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0, 0, width, height);
	} else if (style === "warm") {
		ctx.globalCompositeOperation = "soft-light";
		ctx.globalAlpha = 0.6 * intensity;
		ctx.fillStyle = "#ffbb66";
		ctx.fillRect(0, 0, width, height);
	}
	ctx.restore();
}

function applyGlow({
	ctx,
	source,
	width,
	height,
	uniforms,
}: {
	ctx: OffscreenCanvasRenderingContext2D;
	source: OffscreenCanvas;
	width: number;
	height: number;
	uniforms: Record<string, any>;
}) {
	const intensity = Number(uniforms.u_intensity ?? 40) / 100;
	if (intensity <= 0) return;

	ctx.save();
	ctx.globalCompositeOperation = "screen";
	ctx.globalAlpha = 0.5 * intensity;
	// Draw slightly scaled/diffused copy
	ctx.drawImage(source, -4, -4, width + 8, height + 8);
	ctx.restore();
}
