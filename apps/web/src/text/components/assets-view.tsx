import { DraggableItem } from "@/components/editor/panels/assets/draggable-item";
import { PanelView } from "@/components/editor/panels/assets/views/base-panel";
import { useEditor } from "@/editor/use-editor";
import { DEFAULTS } from "@/timeline/defaults";
import { buildTextElement } from "@/timeline/element-utils";
import type { MediaTime } from "@/wasm";
import { TTSPanel } from "@/tts/components/tts-panel";
import { Separator } from "@/components/ui/separator";

export function TextView() {
	const editor = useEditor();

	const handleAddToTimeline = ({ currentTime }: { currentTime: MediaTime }) => {
		const activeScene = editor.scenes.getActiveScene();
		if (!activeScene) return;

		const element = buildTextElement({
			raw: DEFAULTS.text.element,
			startTime: currentTime,
		});

		editor.timeline.insertElement({
			element,
			placement: { mode: "auto" },
		});
	};

	return (
		<PanelView title="Text & Voice">
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-1.5">
					<span className="text-xs font-medium text-muted-foreground">Teks Standar</span>
					<DraggableItem
						name="Default text"
						preview={
							<div className="bg-accent flex size-full items-center justify-center rounded">
								<span className="text-xs select-none">Default text</span>
							</div>
						}
						dragData={{
							id: "temp-text-id",
							type: DEFAULTS.text.element.type,
							name: DEFAULTS.text.element.name,
							content: "Default text",
						}}
						aspectRatio={1}
						onAddToTimeline={handleAddToTimeline}
						shouldShowLabel={false}
					/>
				</div>

				<Separator />

				<TTSPanel />
			</div>
		</PanelView>
	);
}

