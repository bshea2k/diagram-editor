const canvas = document.querySelector("#workspace");
const ctx = canvas.getContext("2d");

let shapes = [];
let selectedShapeID;
let canvasPos = getElementPosition(canvas);

// create rectangle when clicked on in creation menu
const rect = document.querySelector("#create__rect");
rect.addEventListener("click", () => {
    // to be in center, canvas.width / 2 - (shape.width / 2)
    const rect = new Rect(canvas.width / 2 - 60, canvas.height / 2 - 40);
    shapes.push(rect);
    render();
});

// if a shape is found, store its id in global variable
// if shape not found, make sure global variable is set to no shape
canvas.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;

    let mousePos = getMousePosition(e);
    let foundShape = false;

    for (const shape of shapes) {
        if (mousePos.x > shape.x 
            && mousePos.x < shape.x + shape.width 
            && mousePos.y > shape.y 
            && mousePos.y < shape.y + shape.height) {
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

    for (const shape of shapes) {
        shape.render();

        if (shape.id === selectedShapeID) {
            shape.renderSelected();
        }
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
    this.id = self.crypto.randomUUID();
    this.x = x;
    this.y = y;
    this.width = 120;
    this.height = 80;
    this.text = "Text";

    this.render = function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();

        ctx.font = "16px Helvetica";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#0D0D0D"
        ctx.fillText(this.text, this.x + (this.width / 2), this.y + (this.height / 2));
    };

    this.renderSelected = function() {
        ctx.fillStyle = "#C9B4F1";
        ctx.strokeStyle = "#0D0D0D";

        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y, 5, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.x + this.width, this.y + this.height / 2, 5, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y + this.height, 5, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.x, this.y + this.height / 2, 5, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
    };
}

class Shape {
    constructor(x, y) {
        this._id = self.crypto.randomUUID();
        this._x = x;
        this._y = y;
    }

    get id() { return this._id; }
    get x() { return this._x; }
    get y() { return this._y; }

    set x(x) { this._x = x; }
    set y(y) { this._y = y; }

    render() { }
    renderHovered() { }
    renderSelected() { }
}

class Rectangle extends Shape {
    constructor(x, y) {
        super(x, y);
        this._height = 120;
        this._width = 80;
        this._text = "Text";
    }

    get height() { return this._height; }
    get width() { return this._width; }
    get text() { return this._text; }

    set height(height) { this._height = height; }
    set width(width) { this._width = width; }
    set text(text) { this._text = text; }
}