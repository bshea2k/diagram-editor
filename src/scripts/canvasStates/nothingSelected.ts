import { CanvasState } from "./canvasState";
import type { CanvasController } from "../canvasController";
import type { Input } from "../utils";

export class NothingSelected extends CanvasState {
    private x: number = 0;

    constructor(canvasController: CanvasController) {
        super(canvasController);
    }

    enter(input: Input): void {
        this.canvasController.selectShape(null);
        this.canvasController.render();
    }

    handleInput(input: Input): void {
        
    }
}