import { CanvasState } from "./canvasState";
import type { CanvasController } from "../canvasController";
import type { Input } from "../utils";
import type { UtilityPoint } from "../utilityPoints/utilityPoint";
import type { ConnectionPoint } from "../utilityPoints/ConnectionPoint";

export class ConnectionPointHoveredState extends CanvasState {
    private connectionPoint: ConnectionPoint;

    constructor(canvasController: CanvasController, connectionPoint: UtilityPoint) {
        super(canvasController);
        this.connectionPoint = connectionPoint as ConnectionPoint;
    }

    enter(input?: Input): void {
        this.canvasController.activeUP = this.connectionPoint;
        this.canvasController.render();

        document.body.style.cursor = "crosshair";

        console.log("Entering ConnectionPointHovered"); // temp | debug
    }

    handleInput(input: Input): void {

    }
}