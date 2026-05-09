import { CanvasState } from "./canvasState";
import { ConnectionSelectedState } from "./connectionSelectedState";
import type { CanvasController } from "../canvasController";
import type { Input } from "../utils";
import type { MovementPoint } from "../utilityPoints/movementPoint";

export class MovingConnectionState extends CanvasState {
    private movementPoint;

    constructor(canvasController: CanvasController, movementPoint: MovementPoint) {
        super(canvasController);
        this.movementPoint = movementPoint;
    }

    enter(input?: Input): void {
        this.canvasController.draggingMouse = true;
        this.canvasController.render();

        console.log("Entering MovingConnection"); // temp | debug
    }

    handleInput(input: Input): void {
        if (input.mouseMove && input.mousePos) {
            if (this.movementPoint.side === "start") {
                this.movementPoint.connection.startPos = input.mousePos;
            }
            else {
                this.movementPoint.connection.endPos = input.mousePos;
            }
        }
        else if (input.mouseUp) {
            this.canvasController.draggingMouse = false;
            // release mouse -> ConnectionSelected state
            this.canvasController.setState(new ConnectionSelectedState(this.canvasController, this.movementPoint.connection));
        }
    }
}