import { CanvasState } from "./canvasState";
import { NothingSelectedState } from "./nothingSelectedState";
import type { CanvasController } from "../canvasController";
import type { Input, Coord } from "../utils";

export class MovingCanvasState extends CanvasState {
    private clientMouseInitialPos: Coord;

    constructor(canvasController: CanvasController, clientMouseInitialPos: Coord) {
        super(canvasController);
        this.clientMouseInitialPos = clientMouseInitialPos;
    }

    enter(input?: Input): void {
        this.canvasController.draggingMouse = true;
        this.canvasController.render();

        document.body.style.cursor = "grabbing";

        console.log("Entering MovingCanvas"); // temp | debug
    }

    handleInput(input: Input): void {
        if (input.mouseMove && input.mousePos) {
            let xOffset = input.mousePos.x - this.clientMouseInitialPos.x;
            let yOffset = input.mousePos.y - this.clientMouseInitialPos.y;

            this.canvasController.canvasXOffset += xOffset;
            this.canvasController.canvasYOffset += yOffset;

            this.canvasController.render();
        }
        else if (input.mouseUp) {
            // stop dragging -> NothingSelected state
            this.canvasController.setState(new NothingSelectedState(this.canvasController));
        }
    }

    exit(input?: Input): void {
        this.canvasController.draggingMouse = false;
        document.body.style.cursor = "default";
    }
}