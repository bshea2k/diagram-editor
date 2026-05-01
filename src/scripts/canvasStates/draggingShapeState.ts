import { CanvasState } from "./canvasState";
import type { CanvasController } from "../canvasController";
import type { Coord, Input } from "../utils";
import type { Shape } from "../shape";

export class DraggingShapeState extends CanvasState {
    private selectedShape: Shape;
    private clientMouseInitialPos: Coord;
    private selectedShapeInitialPos: Coord;

    constructor(canvasController: CanvasController, selectedShape: Shape, clientMouseInitialPos: Coord) {
        super(canvasController);
        this.selectedShape = selectedShape;
        this.clientMouseInitialPos = clientMouseInitialPos;
        this.selectedShapeInitialPos = {x: selectedShape.x, y: selectedShape.y};
    }

    enter(input?: Input): void {
        this.canvasController.draggingMouse = true;
        this.canvasController.render();

        console.log("Entering DraggingShape"); // temp | debug
    }

    handleInput(input: Input): void {
        if (input.mouseMove && input.mousePos) {
            let xOffset = input.mousePos.x - this.clientMouseInitialPos.x;
            let yOffset = input.mousePos.y - this.clientMouseInitialPos.y;

            this.selectedShape.x = this.selectedShapeInitialPos.x + xOffset;
            this.selectedShape.y = this.selectedShapeInitialPos.y + yOffset;

            this.canvasController.render();
        }
    }
}