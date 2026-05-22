import { CanvasState } from "./canvasState";
import type { CanvasController } from "../canvasController";
import type { Input } from "../utils";

export class MovingCanvasState extends CanvasState {
    constructor(canvasController: CanvasController) {
        super(canvasController);
    }

    enter(input?: Input): void {
        this.canvasController.render();

        console.log("Entering MovingCanvas"); // temp | debug
    }

    handleInput(input: Input): void {

    }

    exit(input?: Input): void {
        
    }
}