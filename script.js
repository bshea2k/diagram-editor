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

    for (const shape of shapes) {
        if (shape.detect(mousePos.x, mousePos.y)) {
            selectedShapeID = shape.id;
            foundShape = true;
            // break because earliest found is at front of array, highest layer
            break;
        }
    }

    if (!foundShape) {
        selectedShapeID = -1;
    }

    render();
});

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let selectedShapeIndex;

    for (let i = shapes.length - 1; i >= 0; i--) {
        shapes[i].render(ctx);

        if (shapes[i].id === selectedShapeID) {
            selectedShapeIndex = i;
        }
    }

    shapes[selectedShapeIndex].renderSelected(ctx);
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