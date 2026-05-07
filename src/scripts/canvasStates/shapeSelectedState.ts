import { CanvasState } from "./canvasState";
import { DraggingShapeState } from "./draggingShapeState";
import { NothingSelectedState } from "./nothingSelectedState";
import { ResizePointHoveredState } from "./resizePointHoveredState";
import { ResizeEdgeHoveredState } from "./resizeEdgeHoveredState";
import type { CanvasController } from "../canvasController";
import type { Input } from "../utils";
import type { Shape } from "../shape";

export class ShapeSelectedState extends CanvasState {
    private selectedShape: Shape;

    constructor(canvasController: CanvasController, selectedShape: Shape) {
        super(canvasController);
        this.selectedShape = selectedShape;
    }

    enter(input?: Input): void {
        this.canvasController.selectedShape = this.selectedShape;
        this.canvasController.render();
        console.log("Entering ShapeSelected"); // temp | debug
    }

    handleInput(input: Input): void {
        if (input.mouseMove && input.mousePos) {
            let hoveredUtilityPoint = null;

            // could be its own function in shape.ts or canvasController.ts?
            for (const up of this.selectedShape.utilityPoints) {
                if (up.detect(input.mousePos)) {
                    hoveredUtilityPoint = up;
                    break;
                }
            }

            if (hoveredUtilityPoint) {
                switch(hoveredUtilityPoint.type) {
                    case "ResizePoint":
                        this.canvasController.setState(new ResizePointHoveredState(this.canvasController, hoveredUtilityPoint));
                        break;
                    case "ResizeEdge":
                        this.canvasController.setState(new ResizeEdgeHoveredState(this.canvasController, hoveredUtilityPoint));
                        break;
                }
            }
        }
        else if (input.mouseDown && input.mousePos) {
            let clickedShape = this.canvasController.detectShape(input.mousePos);

            // mousedown on this shape -> DraggingShape state
            if (clickedShape === this.selectedShape) this.canvasController.setState(new DraggingShapeState(this.canvasController, this.selectedShape, input.mousePos));
            // click blankspace -> NothingSelected state
            else if (!clickedShape) this.canvasController.setState(new NothingSelectedState(this.canvasController));
            // click another shape -> new ShapeSelected state for that shape
            else if (clickedShape !== this.selectedShape) {
                this.canvasController.selectedShape = null;
                this.canvasController.setState(new DraggingShapeState(this.canvasController, clickedShape, input.mousePos));
            }
        }
        else if (input.key) {
            // press backspace to delete shape -> NothingSelected state
            if (input.key === "Backspace" || input.key === "Delete") {
                this.canvasController._diagram.removeShape(this.selectedShape);
                this.canvasController.setState(new NothingSelectedState(this.canvasController));
            }
        }
    }
}