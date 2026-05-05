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
            else this.canvasController.setState(new ResizeEdgeHoveredState(this.canvasController, this.resizeUtilityPoint));
        }
    }

    handleResizePointResizing(mousePos: Coord): void {
        let xOffset = mousePos.x - this.initialMousePos.x;
        let yOffset = mousePos.y - this.initialMousePos.y;

        switch(this.resizeUtilityPoint.side) {
            case "topleft":
                this.resizeUtilityPoint.shape.x = this.initialShapePos.x + xOffset;
                this.resizeUtilityPoint.shape.width = this.initialShapeWidth - xOffset;
                this.resizeUtilityPoint.shape.y = this.initialShapePos.y + yOffset;
                this.resizeUtilityPoint.shape.height = this.initialShapeHeight - yOffset;
                break;
            case "topright":
                this.resizeUtilityPoint.shape.width = this.initialShapeWidth + xOffset;
                this.resizeUtilityPoint.shape.y = this.initialShapePos.y + yOffset;
                this.resizeUtilityPoint.shape.height = this.initialShapeHeight - yOffset;
                break;
            case "bottomright":
                this.resizeUtilityPoint.shape.width = this.initialShapeWidth + xOffset;
                this.resizeUtilityPoint.shape.height = this.initialShapeHeight + yOffset;
                break;
            case "bottomleft":
                this.resizeUtilityPoint.shape.x = this.initialShapePos.x + xOffset;
                this.resizeUtilityPoint.shape.width = this.initialShapeWidth - xOffset;
                this.resizeUtilityPoint.shape.height = this.initialShapeHeight + yOffset;
                break;
        }

        this.preventInverting();

        this.canvasController.render();
    }

    preventInverting(): void {
        // formalize/conventionalize these values
        // prevent width/height from inverting
        if (this.resizeUtilityPoint.shape.width < 5) this.resizeUtilityPoint.shape.width = 5;
        if (this.resizeUtilityPoint.shape.height < 5) this.resizeUtilityPoint.shape.height = 5;

        // prevent shape from moving outside of normal bounds when resizing
        if (this.resizeUtilityPoint.shape.x >= this.initialShapePos.x + this.initialShapeWidth - 5) this.resizeUtilityPoint.shape.x = this.initialShapePos.x + this.initialShapeWidth - 5;
        if (this.resizeUtilityPoint.shape.y >= this.initialShapePos.y + this.initialShapeHeight - 5) this.resizeUtilityPoint.shape.y = this.initialShapePos.y + this.initialShapeHeight - 5;
    }
}