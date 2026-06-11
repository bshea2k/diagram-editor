import type { CanvasController } from "./canvasController";
import type { Connection } from "./connection";
import type { Shape } from "./shapes/shape";

const boldIcon: Element = document.querySelector("#toolbar__button--bold")!;

export class ToolbarController {
    private canvasController: CanvasController;
    private selectedShape: Shape | null = null;
    private selectedConnection: Connection | null = null;

    constructor(canvasController: CanvasController) {
        this.canvasController = canvasController;

        boldIcon.addEventListener("click", this.handleBold);
    }

    handleBold = (): void => {
        const shape = this.canvasController.selectedShape;
        
        if (shape) {
            shape.bolded = !shape.bolded;
            this.canvasController.render();
        }
    }
}