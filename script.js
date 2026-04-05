const canvas = document.querySelector("#workspace");
const ctx = canvas.getContext("2d");

let shapes = [];
let selectedShape;
let canvasPos = getElementPosition(canvas);

// create rectangle when clicked on in creation menu
const rect = document.querySelector("#create__rect");
rect.addEventListener("click", () => {
    // to be in center, canvas.width / 2 - (shape.width / 2)
    const rect = new Rect(canvas.width / 2 - 60, canvas.height / 2 - 40);
    shapes.push(rect);
    render();
});

canvas.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;

    let selectedShape;
    let mousePos = getMousePosition(e);

    for (const shape of shapes) {
        if (mousePos.x > shape.x 
            && mousePos.x < shape.x + shape.width 
            && mousePos.y > shape.y 
            && mousePos.y < shape.y + shape.height) {
                selectedShape = shape;
        }
    }
});

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const shape of shapes) {
        shape.render();
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

// rect object
function Rect(x, y) {
    this.x = x;
    this.y = y;
    this.width = 120;
    this.height = 80;
    this.text = "Text";

    this.render = function() {
        ctx.beginPath()
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();

        ctx.font = "16px Helvetica";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.text, this.x + (this.width / 2), this.y + (this.height / 2));
    }
}