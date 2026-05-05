import { CanvasState } from "./canvasState";
import type { CanvasController } from "../canvasController";
import type { Input } from "../utils";
import type { UtilityPoint } from "../utilityPoints/utilityPoint";
import type { ResizeEdge } from "../utilityPoints/resizeEdge";

export class ResizeEdgeHoveredState extends CanvasState {
    private resizeEdge: ResizeEdge;

    constructor(canvasController: CanvasController, resizeEdge: UtilityPoint) {
        super(canvasController);
        this.resizeEdge = resizeEdge as ResizeEdge;
    }

    enter(input?: Input): void {
        this.canvasController.render();

        console.log("Entering ResizeEdgeHovered"); // temp | debug
    }

    handleInput(input: Input): void {

    }
}