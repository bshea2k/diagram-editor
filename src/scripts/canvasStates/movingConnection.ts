import { CanvasState } from "./canvasState";
import { ConnectionSelectedState } from "./connectionSelectedState";
import type { CanvasController } from "../canvasController";
import type { Input } from "../utils";
import type { MovementPoint } from "../utilityPoints/movementPoint";
import type { UtilityPoint } from "../utilityPoints/utilityPoint";

export class MovingConnectionState extends CanvasState {
    private movementPoint;

    constructor(canvasController: CanvasController, movementPoint: UtilityPoint) {
        super(canvasController);
        this.movementPoint = movementPoint as MovementPoint;
    }

    enter(input?: Input): void {
        this.canvasController.draggingMouse = true;
        this.canvasController.render();

        console.log("Entering MovingConnection"); // temp | debug
    }

    handleInput(input: Input): void {
        if (input.mouseMove && input.mousePos) {
            let snapped = false;

            for (const shape of this.canvasController._diagram.getShapes()) {
                let edgePoint = shape.getNearestEdgePoint(input.mousePos.x, input.mousePos.y);
                let xDist = edgePoint.x - input.mousePos.x;
                let yDist = edgePoint.y - input.mousePos.y;
                let dist = Math.sqrt(xDist ** 2 + yDist ** 2);

                // snap leniency = 20
                if (dist <= 20) {
                    if (this.movementPoint.side === "start") this.movementPoint.connection.connectStartShape(shape, edgePoint);
                    else this.movementPoint.connection.connectEndShape(shape, edgePoint);
                    snapped = true;
                    break;
                }
            }

            if (!snapped) {
                if (this.movementPoint.side === "start") {
                    this.movementPoint.connection.startShape = null;
                    this.movementPoint.connection.startPos = input.mousePos;
                }
                else {
                    this.movementPoint.connection.endShape = null;
                    this.movementPoint.connection.endPos = input.mousePos;
                }
            }

            this.canvasController.render();
        }
        else if (input.mouseUp) {
            // release mouse -> ConnectionSelected state
            this.canvasController.setState(new ConnectionSelectedState(this.canvasController, this.movementPoint.connection));
        }
    }

    exit(input?: Input): void {
        this.canvasController.draggingMouse = false;
    }
}