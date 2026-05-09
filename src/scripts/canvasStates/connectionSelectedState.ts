import { CanvasState } from "./canvasState";
import { NothingSelectedState } from "./nothingSelectedState";
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
        document.body.style.cursor = "default";

        console.log("Entering ConnectionSelected"); // temp | debug
    }

    handleInput(input: Input): void {
        if (input.mouseDown && input.mousePos) {
            let clickedShape = this.canvasController.detectShape(input.mousePos);
            
            // click blankspace -> NothingSelected state
            if (!clickedShape) this.canvasController.setState(new NothingSelectedState(this.canvasController));
        }
    }
}