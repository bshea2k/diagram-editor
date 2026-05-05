import { CanvasState } from "./canvasState";
import { ResizePointHoveredState } from "./resizePointHoveredState";
import { ResizeEdgeHoveredState } from "./resizeEdgeHoveredState";
import type { CanvasController } from "../canvasController";
import type { Coord, Input } from "../utils";
import type { UtilityPoint } from "../utilityPoints/utilityPoint";
import type { ResizePoint } from "../utilityPoints/resizePoint";
import type { ResizeEdge } from "../utilityPoints/resizeEdge";

export class ResizingShapeState extends CanvasState {
    private resizeUtilityPoint: ResizePoint | ResizeEdge;
    private initialMousePos: Coord = {x: 0, y: 0};

    constructor(canvasController: CanvasController, resizeUtilityPoint: UtilityPoint) {
        super(canvasController);

        if (resizeUtilityPoint.type === "ResizePoint") this.resizeUtilityPoint = resizeUtilityPoint as ResizePoint;
        else this.resizeUtilityPoint = resizeUtilityPoint as ResizeEdge;
    }

    enter(input?: Input): void {
        if (input && input.mousePos) {
            this.initialMousePos.x = input.mousePos.x;
            this.initialMousePos.y = input.mousePos.x;
        }

        this.canvasController.draggingMouse = true;
        this.canvasController.render();

        console.log("Entering ResizingShape"); // temp | debug
    }

    handleInput(input: Input): void {
        if (input.mouseMove && input.mousePos) {

        }
        else if (input.mouseUp) {
            this.canvasController.draggingMouse = false;

            // mouse up -> Resize(Point/Edge)Hovered state
            if (this.resizeUtilityPoint.type === "ResizePoint") this.canvasController.setState(new ResizePointHoveredState(this.canvasController, this.resizeUtilityPoint));
            else this.canvasController.setState(new ResizeEdgeHoveredState(this.canvasController));
        }
    }
}