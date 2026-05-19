import { CanvasState } from "./canvasState";
import type { CanvasController } from "../canvasController";
import type { Input } from "../utils";
import type { Shape } from "../shapes/shape";

export class TextTypingState extends CanvasState {
    private shape: Shape;
    private prevKey: string | null = null;

    constructor(canvasController: CanvasController) {
        super(canvasController);
        this.shape = this.canvasController.selectedShape!;
    }

    enter(input?: Input): void {
        this.shape.text = "";
        this.canvasController.render();

        if (input) this.handleInput(input);

        console.log("TEXT STATE: Entering TextTyping"); // temp | debug
    }

    handleInput(input: Input): void {
        if (input.keydown && input.key) {
            if (this.validateKey(input.key)) this.shape.text += input.key;
            else if (input.key === "Backspace" && this.shape.text.length > 0) {
                this.shape.text = this.shape.text.slice(0, - 1);
                input.keydown = false;
            }
        }

        this.canvasController.render();
    }

    exit(input?: Input): void {
        
    }

    validateKey(key: string): boolean {
        if (key === "Shift") return false;
        if (key === "CapsLock") return false;
        if (key === "Tab") return false;
        if (key === "Alt") return false;
        if (key === "Escape") return false;
        if (key === "Enter") return false;
        if (key === "Backspace") return false;
        return true;
    }
}