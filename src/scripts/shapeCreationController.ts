import type { CanvasController } from "./canvasController";
import type { Diagram } from "./diagram";
import { Rectangle } from "./rectangle";
import { Circle } from "./circle";

export class ShapeCreationController {
    _canvas: HTMLCanvasElement;
    _canvasController: CanvasController;
    _diagram: Diagram;

    constructor(canvas: HTMLCanvasElement, canvasController: CanvasController, diagram: Diagram) {
        this._canvas = canvas;
        this._canvasController = canvasController;
        this._diagram = diagram;

        document.querySelector("#create__rect")?.addEventListener("click", () => {
            // to be in center, canvas.width / 2 - (shape.width / 2)
            const rect = new Rectangle(this._canvas.width / 2, this._canvas.height / 2);
            rect.x -= rect.width / 2;
            rect.y -= rect.height / 2;
    
            this._diagram.addShape(rect);
            
            this._canvasController.selectShape(rect);
            this._canvasController.setState("shapeSelected");
            this._canvasController.render();
        })

        document.querySelector("#create__circ")?.addEventListener("click", () => {
            const circ = new Circle(canvas.width / 2, canvas.height /2);
            circ.x -= circ.width / 2;
            circ.y -= circ.height / 2;
    
            diagram.addShape(circ);

            this._canvasController.selectShape(circ);
            this._canvasController.setState("shapeSelected");
            this._canvasController.render();
        })
    }
}