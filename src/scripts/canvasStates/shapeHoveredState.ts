import { CanvasState } from "./canvasState";
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
        
    }
}