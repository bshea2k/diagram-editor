import { CanvasState } from "./canvasState";
import { ResizePointHoveredState } from "./resizePointHoveredState";
import { ResizeEdgeHoveredState } from "./resizeEdgeHoveredState";
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
        if (input.mouseUp) {
            this.canvasController.draggingMouse = false;

            // mouse up -> Resize(Point/Edge)Hovered state
            if (this.resizeUtilityPoint.type === "ResizePoint") this.canvasController.setState(new ResizePointHoveredState(this.canvasController, this.resizeUtilityPoint));
            else this.canvasController.setState(new ResizeEdgeHoveredState(this.canvasController));
        }
    }
}