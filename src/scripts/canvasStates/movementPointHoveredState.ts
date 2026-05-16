import { CanvasState } from "./canvasState";
import type { CanvasController } from "../canvasController";
import type { Input } from "../utils";
import type { UtilityPoint } from "../utilityPoints/utilityPoint";
import type { MovementPoint } from "../utilityPoints/movementPoint";
import { ConnectionHoveredState } from "./connectionHoveredState";
import { MovingConnectionState } from "./movingConnectionState";
import { ConnectionSelectedState } from "./connectionSelectedState";

export class movementPointHoveredState extends CanvasState {
    private movementPoint: MovementPoint;

    constructor(canvasController: CanvasController, movementPoint: UtilityPoint) {
        super(canvasController);
        this.movementPoint = movementPoint as MovementPoint;
    }

    enter(input?: Input): void {
        this.canvasController.activeUP = this.movementPoint;
        this.canvasController.render();

        document.body.style.cursor = "move";

        console.log("Entering MovementPointHovered"); // temp | debug
    }

    handleInput(input: Input): void {
        if (input.mouseMove && input.mousePos) {
            let hoveredUtilityPoint = null;
            for (const up of this.movementPoint.connection.utilityPoints) {
                if (up.detect(input.mousePos)) {
                    hoveredUtilityPoint = up;
                    break;
                }
            }

            if (!hoveredUtilityPoint) {
                // hover off movement point & connection already selected -> ConnectionSelected state
                if (this.canvasController.selectedConnection) this.canvasController.setState(new ConnectionSelectedState(this.canvasController, this.canvasController.selectedConnection));
                // hover off movement point & connection not selected -> ConnectionHovered state
                else this.canvasController.setState(new ConnectionHoveredState(this.canvasController, this.movementPoint.connection));
            }
        }
        else if (input.mouseDown) {
            // click -> MovingConnection state
            this.canvasController.setState(new MovingConnectionState(this.canvasController, this.movementPoint));
        }
    }

    exit(input?: Input): void {
        this.canvasController.activeUP = null;
    }
}