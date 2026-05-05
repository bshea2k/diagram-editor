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
        this.canvasController.activeUP = this.resizeEdge;
        this.canvasController.render();

        // update cursor style based on resize edge position
        switch(this.resizeEdge.side) {
            case "top":
            case "bottom":
                document.body.style.cursor = "ns-resize";
                break;
            default:
                document.body.style.cursor = "ew-resize";
        }

        console.log("Entering ResizeEdgeHovered"); // temp | debug
    }

    handleInput(input: Input): void {

    }
}