import { CanvasState } from "./canvasState";
import type { CanvasController } from "../canvasController";
import type { Input } from "../utils";
import type { Connection } from "../connection";

export class ConnectionSelectedState extends CanvasState {
    private selectedConnection: Connection;

    constructor(canvasController: CanvasController, connection: Connection) {
        super(canvasController);
        this.selectedConnection = connection;
    }

    enter(input?: Input): void {
        this.canvasController.render();

        console.log("Entering ConnectionSelected"); // temp | debug
    }

    handleInput(input: Input): void {

    }
}