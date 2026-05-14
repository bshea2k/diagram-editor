import { CanvasState } from "./canvasState";
import { ShapeSelectedState } from "./shapeSelectedState";
import { ResizingShapeState } from "./resizingShapeState";
import { ResizeEdgeHoveredState } from "./resizeEdgeHoveredState";
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
        if (input.mouseMove && input.mousePos) {
            let hoveredUtilityPoint = null;
            // could be its own function in shape.ts or canvasController.ts?
            for (const up of this.resizePoint.shape.utilityPoints) {
                if (up.detect(input.mousePos)) {
                    hoveredUtilityPoint = up;
                    break;
                }
            }

            // hover over a resize edge -> ResizeEdgeHovered state
            if (hoveredUtilityPoint && hoveredUtilityPoint.type === "ResizeEdge") {
                this.canvasController.setState(new ResizeEdgeHoveredState(this.canvasController, hoveredUtilityPoint));
            }
            // hover off of resize point -> ShapeSelected state
            else if (hoveredUtilityPoint !== this.resizePoint) {
                document.body.style.cursor = "default";
                this.canvasController.activeUP = null;
                this.canvasController.setState(new ShapeSelectedState(this.canvasController, this.resizePoint.shape));
            }
        }
        else if (input.mouseDown) {
            // click resize point -> ResizingShape state
            this.canvasController.setState(new ResizingShapeState(this.canvasController, this.resizePoint), input);
        }
    }

    exit(input?: Input): void {
        
    }
}