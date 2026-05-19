import { CanvasState } from "./canvasState";
import { TextTypingState } from "./textTypingState";
import type { CanvasController } from "../canvasController";
import type { Input } from "../utils";

export class TextIdleState extends CanvasState {
    constructor(canvasController: CanvasController) {
        super(canvasController);
    }

    enter(input?: Input): void {
        this.canvasController.render();

        console.log("TEXT STATE: Entering TextIdle"); // temp | debug
    }

    handleInput(input: Input): void {
        if (input.keydown && input.key) {
            if (input.key === "Backspace") return;
            
            if (this.canvasController.selectedShape) {
                // type when a shape is selected -> TextTyping state
                this.canvasController.setTextState(new TextTypingState(this.canvasController), input);
            }
        }
    }

    exit(input?: Input): void {
        
    }
}