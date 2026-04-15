import type { Shape } from "./shape"
import { Rectangle } from "./rectangle.js";

const canvas: HTMLCanvasElement = document.querySelector("#workspace")!; // IMPROVE NONNULL ASSERTION
const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

let shapes: Shape[] = [];
let selectedShapeID: string;
let canvasPos = getElementPosition(canvas);

// create rectangle when clicked on in creation menu
const rect = document.querySelector("#create__rect");
if (rect) {
    rect.addEventListener("click", () => {
        // to be in center, canvas.width / 2 - (shape.width / 2)
        const rect = new Rectangle(canvas.width / 2 - 60, canvas.height / 2 - 40);
        shapes.unshift(rect);
        render();
    });
}

// if a shape is found, store its id in global variable
// if shape not found, make sure global variable is set to no shape
canvas.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;

    let mousePos = getMousePosition(e);
    let foundShape = false;
    selectedShapeID = "0";

    for (const shape of shapes) {
        if (shape.detect(mousePos.x, mousePos.y)) {
            foundShape = true;
            canvas.selectedShape = shape;
            canvas.selectedShapeInitialX = shape.x;
            canvas.selectedShapeInitialY = shape.y;
            // break because earliest found is at front of array, highest layer
            break;
        }
    }

    render();

    if (foundShape) {
        canvas.initialClientX = e.clientX;
        canvas.initialClientY = e.clientY;
        canvas.addEventListener("mousemove", moveShape);
        canvas.addEventListener("mouseup", selectShape);
    }
});

function moveShape(e: MouseEvent) {
    let xOffset = e.clientX - e.currentTarget.initialClientX;
    let yOffset = e.clientY - e.currentTarget.initialClientY;

    e.currentTarget.selectedShape.x = e.currentTarget.selectedShapeInitialX + xOffset;
    e.currentTarget.selectedShape.y = e.currentTarget.selectedShapeInitialY + yOffset;

    render();
}

function selectShape(e: MouseEvent) {
    canvas.removeEventListener("mousemove", moveShape);
    selectedShapeID = e.currentTarget.selectedShape.id;

    render();

    canvas.removeEventListener("mouseup", selectShape);
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let selectedShapeIndex = -1;

    // iterate in reverse due to top layer shapes being at index 0, so render them last
    for (let i = shapes.length - 1; i >= 0; i--) {
        const shape = shapes[i];
        if (!shape) continue;

        shape.render(ctx);

        if (shape.id === selectedShapeID) {
            selectedShapeIndex = i;
        }
    }

    if (selectedShapeIndex !== -1) {
        shapes[selectedShapeIndex]!.renderSelected(ctx); // CHECK NONNULL ASSERTION
    }
}

function getElementPosition(element: HTMLElement) {
    let elementX = 0;
    let elementY = 0;
    let current: HTMLElement | null = element;

    while (current) {
        elementX += (current.offsetLeft - current.scrollLeft + current.clientLeft);
        elementY += (current.offsetTop - current.scrollTop + current.clientTop);
        current = current.offsetParent as HTMLElement | null;
    }

    return {
        x: elementX,
        y: elementY
    };
}

function getMousePosition(e: MouseEvent) {
    let mouseX = e.clientX - canvasPos.x;
    let mouseY = e.clientY - canvasPos.y;

    return {
        x: mouseX,
        y: mouseY
    }
}