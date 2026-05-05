import { CanvasState } from "./canvasState";
import { ResizingShapeState } from "./resizingShapeState";
import { ShapeSelectedState } from "./shapeSelectedState";
import { ResizePointHoveredState } from "./resizePointHoveredState";
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
        if (input.mouseMove && input.mousePos) {
            let hoveredUtilityPoint = null;
            // could be its own function in shape.ts or canvasController.ts?
            for (const up of this.resizeEdge.shape.utilityPoints) {
                if (up.detect(input.mousePos)) {
                    hoveredUtilityPoint = up;
                    break;
                }
            }

            // hover over a resize point -> ResizePointHovered state
            if (hoveredUtilityPoint && hoveredUtilityPoint.type === "ResizePoint") {
                this.canvasController.setState(new ResizePointHoveredState(this.canvasController, hoveredUtilityPoint));
            }
            // hover off of resize edge -> ShapeSelected state
            else if (hoveredUtilityPoint !== this.resizeEdge) {
                document.body.style.cursor = "default";
                this.canvasController.activeUP = null;
                this.canvasController.setState(new ShapeSelectedState(this.canvasController, this.resizeEdge.shape));
            }
        }
        else if (input.mouseDown) {
            // click resize edge -> ResizingShape state
            this.canvasController.setState(new ResizingShapeState(this.canvasController, this.resizeEdge), input);
        }
    }
}