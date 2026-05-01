import { CanvasState } from "./canvasState";
import { NothingSelectedState } from "./nothingSelectedState";
import type { CanvasController } from "../canvasController";
import type { Input } from "../utils";
import type { Shape } from "../shape";

export class ShapeSelectedState extends CanvasState {
    private selectedShape: Shape;

    constructor(canvasController: CanvasController, selectedShape: Shape) {
        super(canvasController);
        this.selectedShape = selectedShape;
    }

    enter(input?: Input): void {
        this.canvasController.selectShape(this.selectedShape);
        this.canvasController.render();
    }

    handleInput(input: Input): void {
        if (input.mouseDown && input.mousePos) {
            let clickedShape = this.canvasController.detectShape(input.mousePos);

            // click blankspace -> NothingSelected state
            if (!clickedShape) this.canvasController.setState(new NothingSelectedState(this.canvasController));
        }
    }
}