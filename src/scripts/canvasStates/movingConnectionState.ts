import { CanvasState } from "./canvasState";
import { ConnectionSelectedState } from "./connectionSelectedState";
import type { CanvasController } from "../canvasController";
import type { Input } from "../utils";
import type { MovementPoint } from "../utilityPoints/movementPoint";
import type { UtilityPoint } from "../utilityPoints/utilityPoint";

const SNAP_LENIENCY = 20;

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
            const xOffset = this.canvasController.canvasXOffset;
            const yOffset = this.canvasController.canvasYOffset;

            for (const shape of this.canvasController._diagram.getShapes()) {
                let edgePoint = shape.getNearestEdgePoint(input.mousePos.x - xOffset, input.mousePos.y - yOffset);
                let xDist = edgePoint.x - input.mousePos.x + xOffset;
                let yDist = edgePoint.y - input.mousePos.y + yOffset;
                let dist = Math.sqrt(xDist ** 2 + yDist ** 2);

                if (dist <= SNAP_LENIENCY) {
                    if (this.movementPoint.side === "start") this.movementPoint.connection.connectStartShape(shape, edgePoint);
                    else this.movementPoint.connection.connectEndShape(shape, edgePoint);
                    snapped = true;
                    // break because earliest found is at front of array, highest layer
                    break;
                }
            }

            if (!snapped) {
                const translationAdjustedPos = {x: input.mousePos.x - this.canvasController.canvasXOffset, y: input.mousePos.y - this.canvasController.canvasYOffset};

                if (this.movementPoint.side === "start") {
                    this.movementPoint.connection.startShape = null;
                    this.movementPoint.connection.startPos = translationAdjustedPos;
                }
                else {
                    this.movementPoint.connection.endShape = null;
                    this.movementPoint.connection.endPos = translationAdjustedPos;
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