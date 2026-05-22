import { CanvasState } from "./canvasState";
import { ShapeHoveredState } from "./shapeHoveredState";
import { ConnectionHoveredState } from "./connectionHoveredState";
import { DraggingShapeState } from "./draggingShapeState";
import type { CanvasController } from "../canvasController";
import type { Input } from "../utils";
import { MovingCanvasState } from "./movingCanvasState";

export class NothingSelectedState extends CanvasState {
    constructor(canvasController: CanvasController) {
        super(canvasController);
    }

    enter(input?: Input): void {
        this.canvasController.selectedShape = null;
        this.canvasController.notify();
        this.canvasController.render();
        
        console.log("Entering NothingSelected"); // temp | debug
    }

    handleInput(input: Input): void {
        if (input.mouseMove && input.mousePos) {
            let hoveredShape = this.canvasController.detectShape(input.mousePos);

            // hover a shape -> ShapeHovered state
            if (hoveredShape) this.canvasController.setState(new ShapeHoveredState(this.canvasController, hoveredShape));

            let hoveredConnection = this.canvasController.detectConnection(input.mousePos);

            // hover a connection -> ConnectionHovered state
            if (hoveredConnection) this.canvasController.setState(new ConnectionHoveredState(this.canvasController, hoveredConnection));
        }
        else if (input.mouseDown && input.mousePos) {
            if (input.button && input.button === 2) {
                // right click canvas -> MovingCanvas state
                this.canvasController.setState(new MovingCanvasState(this.canvasController, input.mousePos));
            }
            else if (input.button && input.button === 0) {
                let clickedShape = this.canvasController.detectShape(input.mousePos);

                // click a shape -> ShapeSelected state
                if (clickedShape) this.canvasController.setState(new DraggingShapeState(this.canvasController, clickedShape, input.mousePos));
            }
        }
    }

    exit(input?: Input): void {
        
    }
}