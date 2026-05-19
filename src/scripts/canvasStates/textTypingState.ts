import { CanvasState } from "./canvasState";
import { TextIdleState } from "./textIdleState";
import type { CanvasController } from "../canvasController";
import type { Input } from "../utils";
import type { Shape } from "../shapes/shape";

export class TextTypingState extends CanvasState {
    private shape: Shape;
    private prevKey: string | null = null;

    constructor(canvasController: CanvasController) {
        super(canvasController);
        this.shape = this.canvasController.selectedShape!;
        this.canvasController.subscribe(this);
    }

    enter(input?: Input): void {
        this.shape.text = "";
        this.canvasController.render();

        if (input) this.handleInput(input);

        console.log("TEXT STATE: Entering TextTyping"); // temp | debug
    }

    handleInput(input: Input): void {
        if (input.keydown && input.key) {
            if (this.validateKey(input.key)) {
                this.shape.text += input.key;
            }
            else if ((input.key === "Backspace" || input.key === "Delete") && this.shape.text.length > 0) {
                this.shape.text = this.shape.text.slice(0, - 1);
                input.keydown = false;
            }
            else if (input.key === "Enter" && this.prevKey === "Shift") {
                this.shape.text += "\n";
            }

            // prevent backspace from deleting shape, even if no text present
            if (input.key === "Backspace" || input.key === "Delete") input.keydown = false;

            this.prevKey = input.key;
            this.canvasController.render();
        }
        else if (input.notify) {
            if (!this.canvasController.selectedShape) this.canvasController.setState(new TextIdleState(this.canvasController));
        }
    }

    exit(input?: Input): void {
        this.canvasController.unsubscribe(this);
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