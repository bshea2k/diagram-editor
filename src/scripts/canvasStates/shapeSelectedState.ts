import { CanvasState } from "./canvasState";
import { DraggingShapeState } from "./draggingShapeState";
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
        this.canvasController.selectedShape = this.selectedShape;
        this.canvasController.render();
        console.log("Entering ShapeSelected"); // temp | debug
    }

    handleInput(input: Input): void {
        if (input.mouseDown && input.mousePos) {
            let clickedShape = this.canvasController.detectShape(input.mousePos);

            // mousedown on this shape -> DraggingShape state
            if (clickedShape === this.selectedShape) this.canvasController.setState(new DraggingShapeState(this.canvasController, this.selectedShape, input.mousePos));
            // click blankspace -> NothingSelected state
            else if (!clickedShape) this.canvasController.setState(new NothingSelectedState(this.canvasController));
        }
    }
}