import { Rectangle } from "./rectangle.js";

const canvas = document.querySelector("#workspace");
const ctx = canvas.getContext("2d");

let shapes = [];
let selectedShapeID;
let canvasPos = getElementPosition(canvas);

// create rectangle when clicked on in creation menu
const rect = document.querySelector("#create__rect");
rect.addEventListener("click", () => {
    // to be in center, canvas.width / 2 - (shape.width / 2)
    const rect = new Rectangle(canvas.width / 2 - 60, canvas.height / 2 - 40);
    shapes.unshift(rect);
    render();
});

// if a shape is found, store its id in global variable
// if shape not found, make sure global variable is set to no shape
canvas.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;

    let mousePos = getMousePosition(e);
    let foundShape = false;
    selectedShapeID = -1;

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

function moveShape(e) {
    let xOffset = e.clientX - e.currentTarget.initialClientX;
    let yOffset = e.clientY - e.currentTarget.initialClientY;

    e.currentTarget.selectedShape.x = e.currentTarget.selectedShapeInitialX + xOffset;
    e.currentTarget.selectedShape.y = e.currentTarget.selectedShapeInitialY + yOffset;

    render();
}

function selectShape(e) {
    canvas.removeEventListener("mousemove", moveShape);
    selectedShapeID = e.currentTarget.selectedShape.id;

    render();

    canvas.removeEventListener("mouseup", selectShape);
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let selectedShapeIndex = -1;

    // iterate in reverse due to top layer shapes being at index 0, so render last
    for (let i = shapes.length - 1; i >= 0; i--) {
        shapes[i].render(ctx);

        if (shapes[i].id === selectedShapeID) {
            selectedShapeIndex = i;
        }
    }

    if (selectedShapeIndex !== -1) {
        shapes[selectedShapeIndex].renderSelected(ctx);
    }
}

function getElementPosition(element) {
    let elementX = 0;
    let elementY = 0;

    while (element) {
        elementX += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        elementY += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    return {
        x: elementX,
        y: elementY
    };
}

function getMousePosition(e) {
    let mouseX = e.clientX - canvasPos.x;
    let mouseY = e.clientY - canvasPos.y;

    return {
        x: mouseX,
        y: mouseY
    }
}