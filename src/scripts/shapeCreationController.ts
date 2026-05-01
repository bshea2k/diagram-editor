import type { CanvasController } from "./canvasController";
import type { Diagram } from "./diagram";
import { Rectangle } from "./rectangle";
import { Circle } from "./circle";
import { ShapeSelectedState } from "./canvasStates/shapeSelectedState";

export class ShapeCreationController {
    private canvas: HTMLCanvasElement;
    private canvasController: CanvasController;
    private diagram: Diagram;

    constructor(canvas: HTMLCanvasElement, canvasController: CanvasController, diagram: Diagram) {
        this.canvas = canvas;
        this.canvasController = canvasController;
        this.diagram = diagram;

        document.querySelector("#create__rect")?.addEventListener("click", () => {
            // to be in center, canvas.width / 2 - (shape.width / 2)
            const rect = new Rectangle(this.canvas.width / 2, this.canvas.height / 2);
            rect.x -= rect.width / 2;
            rect.y -= rect.height / 2;
    
            this.diagram.addShape(rect);
            
            this.canvasController.setState(new ShapeSelectedState(this.canvasController, rect));
        })

        document.querySelector("#create__circ")?.addEventListener("click", () => {
            const circ = new Circle(canvas.width / 2, canvas.height /2);
            circ.x -= circ.width / 2;
            circ.y -= circ.height / 2;
    
            diagram.addShape(circ);

            this.canvasController.setState(new ShapeSelectedState(this.canvasController, circ));
        })
    }
}