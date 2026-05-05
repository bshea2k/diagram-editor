import { CanvasState } from "./canvasState";
import type { CanvasController } from "../canvasController";
import type { Input } from "../utils";
import type { UtilityPoint } from "../utilityPoints/utilityPoint";
import type { ResizePoint } from "../utilityPoints/resizePoint";
import type { ResizeEdge } from "../utilityPoints/resizeEdge";

export class ResizingShapeState extends CanvasState {
    private resizeUtilityPoint: ResizePoint | ResizeEdge;

    constructor(canvasController: CanvasController, resizeUtilityPoint: UtilityPoint) {
        super(canvasController);

        if (resizeUtilityPoint.type === "ResizePoint") this.resizeUtilityPoint = resizeUtilityPoint as ResizePoint;
        else this.resizeUtilityPoint = resizeUtilityPoint as ResizeEdge;
    }

    enter(input?: Input): void {
        this.canvasController.draggingMouse = true;
        this.canvasController.render();

        console.log("Entering ResizingShape"); // temp | debug
    }

    handleInput(input: Input): void {

    }
}