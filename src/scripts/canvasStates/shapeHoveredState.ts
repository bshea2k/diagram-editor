import { CanvasState } from "./canvasState";
import { NothingSelectedState } from "./nothingSelectedState";
import type { CanvasController } from "../canvasController";
import type { Input } from "../utils";
import type { Shape } from "../shape";

export class shapeHoveredState extends CanvasState {
    private hoveredShape: Shape;

    constructor(canvasController: CanvasController, hoveredShape: Shape) {
        super(canvasController);
        this.hoveredShape = hoveredShape;
    }

    enter(input?: Input): void {
        this.canvasController.render();
        console.log("Entering ShapeHovered"); // temp | debug
    }

    handleInput(input: Input): void {
        if (input.mouseMove && input.mousePos) {
            let hoveredShape = this.canvasController.detectShape(input.mousePos);

            // hover a DIFFERENT shape -> ShapeHovered state
            if (hoveredShape && hoveredShape !== this.hoveredShape) this.canvasController.setState(new shapeHoveredState(this.canvasController, hoveredShape));
            // hover blankspace -> NothingSelected state
            else if (!hoveredShape) this.canvasController.setState(new NothingSelectedState(this.canvasController));
        }
    }
}