import { CanvasState } from "./canvasState";
import { ConnectionHoveredState } from "./connectionHoveredState";
import { MovingConnectionState } from "./movingConnectionState";
import { ConnectionSelectedState } from "./connectionSelectedState";
import type { CanvasController } from "../canvasController";
import type { Input } from "../utils";
import type { UtilityPoint } from "../utilityPoints/utilityPoint";
import type { MovementPoint } from "../utilityPoints/movementPoint";
import type { Connection } from "../connection";

export class movementPointHoveredState extends CanvasState {
    private movementPoint: MovementPoint;
    private selectedConnection: Connection | null = null;

    constructor(canvasController: CanvasController, movementPoint: UtilityPoint, selectedConnection?: Connection) {
        super(canvasController);
        this.movementPoint = movementPoint as MovementPoint;
        this.selectedConnection = selectedConnection ?? null;
    }

    enter(input?: Input): void {
        this.canvasController.activeUP = this.movementPoint;
        if (this.selectedConnection) this.canvasController.selectedConnection = this.selectedConnection;
        this.canvasController.render();

        document.body.style.cursor = "move";

        console.log("Entering MovementPointHovered"); // temp | debug
    }

    handleInput(input: Input): void {
        if (input.mouseMove && input.mousePos) {
            let hoveredUtilityPoint = null;
            for (const up of this.movementPoint.connection.utilityPoints) {
                if (up.detect(input.mousePos, this.canvasController.canvasXOffset, this.canvasController.canvasYOffset)) {
                    hoveredUtilityPoint = up;
                    break;
                }
            }

            if (!hoveredUtilityPoint) {
                // hover off movement point & connection already selected -> ConnectionSelected state
                if (this.selectedConnection) this.canvasController.setState(new ConnectionSelectedState(this.canvasController, this.selectedConnection));
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