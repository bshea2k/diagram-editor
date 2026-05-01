import type { CanvasController } from "../canvasController";
import type { Input } from "../utils";

export abstract class CanvasState {
    constructor(public canvasController: CanvasController) {}

    abstract enter(input?: Input): void;

    abstract handleInput(input: Input): CanvasState;
}