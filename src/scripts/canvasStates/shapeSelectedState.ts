import { CanvasState } from "./canvasState";
import type { CanvasController } from "../canvasController";
import type { Input } from "../utils";
import type { Shape } from "../shape";

export class ShapeSelectedState extends CanvasState {
    private selectedShape: Shape;

    constructor(canvasController: CanvasController, selectedShape: Shape) {
        super(canvasController);
        this.selectedShape = selectedShape;

        this.enter();
    }

    enter(input?: Input): void {
        this.canvasController.selectShape(this.selectedShape);
        this.canvasController.render();
    }

    handleInput(input: Input): CanvasState {
        return this;
    }
}