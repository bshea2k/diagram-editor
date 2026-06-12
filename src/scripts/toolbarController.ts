import type { CanvasController } from "./canvasController";
import type { Connection } from "./connection";
import type { Shape } from "./shapes/shape";

const boldIcon: Element = document.querySelector("#toolbar__button--bold")!;
const italicsIcon: Element = document.querySelector("#toolbar__button--italics")!;
const textAlignTopIcon: Element = document.querySelector("#toolbar__button--align-top")!;
const textAlignCenterIcon: Element = document.querySelector("#toolbar__button--align-center")!;
const textAlignBottomIcon: Element = document.querySelector("#toolbar__button--align-bottom")!;

const shapeFillColorWhiteIcon: Element = document.querySelector("#toolbar__button--shape-color-white")!;
const shapeFillColorBlueIcon: Element = document.querySelector("#toolbar__button--shape-color-blue")!;
const shapeFillColorGreenIcon: Element = document.querySelector("#toolbar__button--shape-color-green")!;
const shapeFillColorYellowIcon: Element = document.querySelector("#toolbar__button--shape-color-yellow")!;
const shapeFillColorRedIcon: Element = document.querySelector("#toolbar__button--shape-color-red")!;

export class ToolbarController {
    private canvasController: CanvasController;
    private selectedShape: Shape | null = null;
    private selectedConnection: Connection | null = null;

    constructor(canvasController: CanvasController) {
        this.canvasController = canvasController;

        italicsIcon.addEventListener("click", this.handleItalics);
        boldIcon.addEventListener("click", this.handleBold);
        textAlignTopIcon.addEventListener("click", this.handleTextAlignTop);
        textAlignCenterIcon.addEventListener("click", this.handleTextAlignCenter);
        textAlignBottomIcon.addEventListener("click", this.handleTextAlignBottom);

        shapeFillColorWhiteIcon.addEventListener("click", this.handleFillColorWhite);
        shapeFillColorBlueIcon.addEventListener("click", this.handleFillColorBlue);
        shapeFillColorGreenIcon.addEventListener("click", this.handleFillColorGreen);
        shapeFillColorYellowIcon.addEventListener("click", this.handleFillColorYellow);
        shapeFillColorRedIcon.addEventListener("click", this.handleFillColorRed);
    }

    handleItalics = (): void => {
        const shape = this.canvasController.selectedShape;
        if (shape) {
            shape.italics = !shape.italics;
            this.canvasController.render();
        }
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

    handleFillColorWhite = (): void => {
        const shape = this.canvasController.selectedShape;
        if (shape) {
            shape.fillColor = "#F8F8F8";
            this.canvasController.render();
        }
    }

    handleFillColorBlue = (): void => {
        const shape = this.canvasController.selectedShape;
        if (shape) {
            shape.fillColor = "#4D96FF";
            this.canvasController.render();
        }
    }

    handleFillColorGreen = (): void => {
        const shape = this.canvasController.selectedShape;
        if (shape) {
            shape.fillColor = "#6BCB77";
            this.canvasController.render();
        }
    }

    handleFillColorYellow = (): void => {
        const shape = this.canvasController.selectedShape;
        if (shape) {
            shape.fillColor = "#FFD93D";
            this.canvasController.render();
        }
    }

    handleFillColorRed = (): void => {
        const shape = this.canvasController.selectedShape;
        if (shape) {
            shape.fillColor = "#FF6B6B";
            this.canvasController.render();
        }
    }
}