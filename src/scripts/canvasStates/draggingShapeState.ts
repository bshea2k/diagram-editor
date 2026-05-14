import { CanvasState } from "./canvasState";
import { ShapeSelectedState } from "./shapeSelectedState";
import type { CanvasController } from "../canvasController";
import type { Coord, Input } from "../utils";
import type { Shape } from "../shape";

export class DraggingShapeState extends CanvasState {
    private draggedShape: Shape;
    private clientMouseInitialPos: Coord;
    private draggedShapeInitialPos: Coord;

    constructor(canvasController: CanvasController, draggedShape: Shape, clientMouseInitialPos: Coord) {
        super(canvasController);
        this.draggedShape = draggedShape;
        this.clientMouseInitialPos = clientMouseInitialPos;
        this.draggedShapeInitialPos = {x: draggedShape.x, y: draggedShape.y};
    }

    enter(input?: Input): void {
        this.canvasController.selectedShape = this.draggedShape;
        this.canvasController.draggingMouse = true;
        this.canvasController.render();

        console.log("Entering DraggingShape"); // temp | debug
    }

    handleInput(input: Input): void {
        if (input.mouseMove && input.mousePos) {
            let xOffset = input.mousePos.x - this.clientMouseInitialPos.x;
            let yOffset = input.mousePos.y - this.clientMouseInitialPos.y;

            this.draggedShape.x = this.draggedShapeInitialPos.x + xOffset;
            this.draggedShape.y = this.draggedShapeInitialPos.y + yOffset;

            this.canvasController.render();
        } else if (input.mouseUp) {
            // mouse up -> ShapeSelected
            this.canvasController.setState(new ShapeSelectedState(this.canvasController, this.draggedShape));
        }
    }

    exit(input?: Input): void {
        this.canvasController.draggingMouse = false;
    }
}