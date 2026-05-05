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
    private initialShapePos: Coord;
    private initialShapeWidth: number;
    private initialShapeHeight: number;

    constructor(canvasController: CanvasController, resizeUtilityPoint: UtilityPoint) {
        super(canvasController);

        if (resizeUtilityPoint.type === "ResizePoint") this.resizeUtilityPoint = resizeUtilityPoint as ResizePoint;
        else this.resizeUtilityPoint = resizeUtilityPoint as ResizeEdge;

        this.initialShapePos = {x: this.resizeUtilityPoint.shape.x, y: this.resizeUtilityPoint.shape.y};
        this.initialShapeWidth = this.resizeUtilityPoint.shape.width;
        this.initialShapeHeight = this.resizeUtilityPoint.shape.height;
    }

    enter(input?: Input): void {
        if (input && input.mousePos) {
            this.initialMousePos.x = input.mousePos.x;
            this.initialMousePos.y = input.mousePos.y;
        }

        this.canvasController.draggingMouse = true;
        this.canvasController.render();

        console.log("Entering ResizingShape"); // temp | debug
    }

    handleInput(input: Input): void {
        if (input.mouseMove && input.mousePos) {
            if (this.resizeUtilityPoint.type === "ResizePoint") this.handleResizePointResizing(input.mousePos);
        }
        else if (input.mouseUp) {
            this.canvasController.draggingMouse = false;

            // mouse up -> Resize(Point/Edge)Hovered state
            if (this.resizeUtilityPoint.type === "ResizePoint") this.canvasController.setState(new ResizePointHoveredState(this.canvasController, this.resizeUtilityPoint));
            else this.canvasController.setState(new ResizeEdgeHoveredState(this.canvasController));
        }
    }

    handleResizePointResizing(mousePos: Coord): void {
        let xOffset = mousePos.x - this.initialMousePos.x;
        let yOffset = mousePos.y - this.initialMousePos.y;

        switch(this.resizeUtilityPoint.side) {
            case "topleft":
                break;
            case "topright":
                break;
            case "bottomright":
                this.resizeUtilityPoint.shape.width = this.initialShapeWidth + xOffset;
                this.resizeUtilityPoint.shape.height = this.initialShapeHeight + yOffset;
                break;
            case "bottomleft":
                break;
        }

        this.canvasController.render();
    }
}