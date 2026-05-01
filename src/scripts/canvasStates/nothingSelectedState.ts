import { CanvasState } from "./canvasState";
import type { CanvasController } from "../canvasController";
import type { Input } from "../utils";

export class NothingSelectedState extends CanvasState {
    constructor(canvasController: CanvasController) {
        super(canvasController);

        this.enter();
    }

    enter(input?: Input): void {
        this.canvasController.selectShape(null);
        this.canvasController.render();
    }

    handleInput(input: Input): CanvasState {
        return this;
    }
}