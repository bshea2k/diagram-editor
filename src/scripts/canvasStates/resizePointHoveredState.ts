import { CanvasState } from "./canvasState";
import type { CanvasController } from "../canvasController";
import type { Input } from "../utils";
import type { UtilityPoint } from "../utilityPoints/utilityPoint";
import type { ResizePoint } from "../utilityPoints/resizePoint";

export class ResizePointHoveredState extends CanvasState {
    private resizePoint;

    constructor(canvasController: CanvasController, resizePoint: UtilityPoint) {
        super(canvasController);
        this.resizePoint = resizePoint as ResizePoint;
    }

    enter(input?: Input): void {
        this.canvasController.activeUP = this.resizePoint;
        this.canvasController.render();

        // update cursor style based on resize point position
        switch(this.resizePoint.side) {
            case "topleft":
            case "bottomright":
                document.body.style.cursor = "nwse-resize";
                break;
            default:
                document.body.style.cursor = "nesw-resize";
        }

        console.log("Entering ResizePointHovered"); // temp | debug
    }

    handleInput(input: Input): void {

    }
}