import { CanvasState } from "./canvasState";
import type { CanvasController } from "../canvasController";
import type { Input } from "../utils";
import type { Connection } from "../connection";

export class ConnectionHoveredState extends CanvasState {
    private hoveredConnection: Connection;

    constructor(canvasController: CanvasController, hoveredConnection: Connection) {
        super(canvasController);
        this.hoveredConnection = hoveredConnection;
    }

    enter(input?: Input): void {
        this.canvasController.render();

        console.log("Entering ConnectionHovered"); // temp | debug
    }

    handleInput(input: Input): void {

    }

    exit(input?: Input): void {
        
    }
}