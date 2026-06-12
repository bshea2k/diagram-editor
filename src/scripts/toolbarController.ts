import type { CanvasController } from "./canvasController";
import type { Connection } from "./connection";
import type { Shape } from "./shapes/shape";

const boldIcon: Element = document.querySelector("#toolbar__button--bold")!;
const textAlignTopIcon: Element = document.querySelector("#toolbar__button--align-top")!;
const textAlignCenterIcon: Element = document.querySelector("#toolbar__button--align-center")!;
const textAlignBottomIcon: Element = document.querySelector("#toolbar__button--align-bottom")!;

export class ToolbarController {
    private canvasController: CanvasController;
    private selectedShape: Shape | null = null;
    private selectedConnection: Connection | null = null;

    constructor(canvasController: CanvasController) {
        this.canvasController = canvasController;

        boldIcon.addEventListener("click", this.handleBold);
        textAlignTopIcon.addEventListener("click", this.handleTextAlignTop);
        textAlignCenterIcon.addEventListener("click", this.handleTextAlignCenter);
        textAlignBottomIcon.addEventListener("click", this.handleTextAlignBottom);
    }

    handleBold = (): void => {
        const shape = this.canvasController.selectedShape;
        if (shape) {
            shape.bolded = !shape.bolded;
            this.canvasController.render();
        }
    }

    handleTextAlignTop = (): void => {
        const shape = this.canvasController.selectedShape;
        if (shape) {
            shape.textVAlign = "top";
            this.canvasController.render();
        }
    }

    handleTextAlignCenter = (): void => {
        const shape = this.canvasController.selectedShape;
        if (shape) {
            shape.textVAlign = "middle";
            this.canvasController.render();
        }
    }

    handleTextAlignBottom = (): void => {
        const shape = this.canvasController.selectedShape;
        if (shape) {
            shape.textVAlign = "bottom";
            this.canvasController.render();
        }
    }
}