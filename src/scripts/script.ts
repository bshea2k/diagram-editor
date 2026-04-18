import { getElementPosition, getMousePosition } from "./utils"
import type { Shape } from "./shape"
import { Rectangle } from "./rectangle.js";
import { Circle } from "./circle"

const canvas: HTMLCanvasElement = document.querySelector("#workspace")!; // IMPROVE NONNULL ASSERTION
const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

let shapes: Shape[] = [];
let selectedShape: Shape | null = null;
let selectedShapeInitialX: number = 0;
let selectedShapeInitialY: number = 0;
let initialClientX: number = 0;
let initialClientY: number = 0;
let canvasPos = getElementPosition(canvas);
let draggingShape: boolean = false;

// create rectangle when clicked on in creation menu
const rect = document.querySelector("#create__rect");
if (rect) {
    rect.addEventListener("click", () => {
        // to be in center, canvas.width / 2 - (shape.width / 2)
        const rect = new Rectangle(canvas.width / 2, canvas.height / 2);
        rect.x -= rect.width / 2;
        rect.y -= rect.height / 2;

        shapes.unshift(rect);
        selectedShape = rect;
        
        render();
    });
}

const circ = document.querySelector("#create__circ");
if (circ) {
    circ.addEventListener("click", () => {
        const circ = new Circle(canvas.width / 2, canvas.height /2);
        circ.x -= circ.width / 2;
        circ.y -= circ.height / 2;

        shapes.unshift(circ);
        selectedShape = circ;
        
        render();
    })
}

// if a shape is found, store its id in global variable
// if shape not found, make sure global variable is set to no shape
canvas.addEventListener("mousedown", selectShape);

function selectShape(e: MouseEvent) {
    if (e.button !== 0) return;

    let mousePos = getMousePosition(e, canvasPos);
    selectedShape = null;

    for (const shape of shapes) {
        if (shape.detect(mousePos.x, mousePos.y)) {
            selectedShape = shape;
            selectedShapeInitialX = shape.x;
            selectedShapeInitialY = shape.y;
            // break because earliest found is at front of array, highest layer
            break;
        }
    }

    render();

    if (selectedShape) {
        draggingShape = true;
        initialClientX = e.clientX;
        initialClientY = e.clientY;
        canvas.addEventListener("mousemove", moveShape);
        canvas.addEventListener("mouseup", endMovingShape);
        render();
    }
}

function moveShape(e: MouseEvent) {
    let xOffset = e.clientX - initialClientX;
    let yOffset = e.clientY - initialClientY;

    selectedShape!.x = selectedShapeInitialX + xOffset; // CHECK NONNULL ASSERTION
    selectedShape!.y = selectedShapeInitialY + yOffset; // CHECK NONNULL ASSERTION

    render();
}

function endMovingShape(e: MouseEvent) {
    canvas.removeEventListener("mousemove", moveShape);

    draggingShape = false;

    render();

    canvas.removeEventListener("mouseup", endMovingShape);
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // iterate in reverse due to top layer shapes being at index 0, so render them last
    for (let i = shapes.length - 1; i >= 0; i--) {
        shapes[i]!.render(ctx); // CHECK NONNULL ASSERTION
    }

    if (selectedShape && !draggingShape) {
        selectedShape.renderSelected(ctx);
    }
}