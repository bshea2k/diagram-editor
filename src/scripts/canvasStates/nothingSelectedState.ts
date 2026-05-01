import { CanvasState } from "./canvasState";
import { shapeHoveredState } from "./shapeHoveredState";
import type { CanvasController } from "../canvasController";
import type { Input } from "../utils";

export class NothingSelectedState extends CanvasState {
    constructor(canvasController: CanvasController) {
        super(canvasController);
    }

    enter(input?: Input): void {
        this.canvasController.selectShape(null);
        this.canvasController.render();
    }

    handleInput(input: Input): void {
        if (input.mouseMove && input.mousePos) {
            let hoveredShape = this.canvasController.detectShape(input.mousePos);

            // hover a shape -> ShapeHovered state
            if (hoveredShape) this.canvasController.setState(new shapeHoveredState(this.canvasController, hoveredShape));
        }
    }
}