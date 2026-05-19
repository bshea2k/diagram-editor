import { CanvasState } from "./canvasState";
import { ShapeHoveredState } from "./shapeHoveredState";
import { ConnectionHoveredState } from "./connectionHoveredState";
import { DraggingShapeState } from "./draggingShapeState";
import type { CanvasController } from "../canvasController";
import type { Input } from "../utils";

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
        // usually impossible transition, happens only in rare cases like deleting a shape on top another shape
        else if (input.mouseDown && input.mousePos) {
            let clickedShape = this.canvasController.detectShape(input.mousePos);

            // click a shape -> ShapeSelected state
            if (clickedShape) this.canvasController.setState(new DraggingShapeState(this.canvasController, clickedShape, input.mousePos));
        }
    }

    exit(input?: Input): void {
        
    }
}