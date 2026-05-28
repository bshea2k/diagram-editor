import type { CanvasController } from "./canvasController";
import type { Connection } from "./connection";
import type { Shape } from "./shapes/shape";

export class ToolbarController {
    private canvasController: CanvasController;
    private selectedShape: Shape | null = null;
    private selectedConnection: Connection | null = null;

    constructor(canvasController: CanvasController) {
        this.canvasController = canvasController;
    }
}