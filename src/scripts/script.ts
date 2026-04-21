import { getElementPosition, getMousePosition } from "./utils";
import type { Shape } from "./shape";
import { Rectangle } from "./rectangle.js";
import { Circle } from "./circle";
import { Diagram } from "./diagram";
import { Renderer } from "./renderer";
import { CanvasController } from "./canvasController";

const canvas: HTMLCanvasElement = document.querySelector("#workspace")!; // IMPROVE NONNULL ASSERTION
const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

const diagram = new Diagram();
const renderer = new Renderer(ctx);
const canvasController = new CanvasController(canvas, diagram, renderer);
let selectedShape: Shape | null = null;
let draggingShape: boolean = false;

// create rectangle when clicked on in creation menu
const rect = document.querySelector("#create__rect");
if (rect) {
    rect.addEventListener("click", () => {
        // to be in center, canvas.width / 2 - (shape.width / 2)
        const rect = new Rectangle(canvas.width / 2, canvas.height / 2);
        rect.x -= rect.width / 2;
        rect.y -= rect.height / 2;

        diagram.addShape(rect);
        selectedShape = rect;
        
        renderer.render(diagram, selectedShape, draggingShape);
    });
}

const circ = document.querySelector("#create__circ");
if (circ) {
    circ.addEventListener("click", () => {
        const circ = new Circle(canvas.width / 2, canvas.height /2);
        circ.x -= circ.width / 2;
        circ.y -= circ.height / 2;

        diagram.addShape(circ);
        selectedShape = circ;
        
        renderer.render(diagram, selectedShape, draggingShape);
    })
}