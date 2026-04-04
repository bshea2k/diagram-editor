const canvas = document.querySelector("#workspace");
const ctx = canvas.getContext("2d");

let shapes = [];

const rect = document.querySelector("#create__rect");
rect.addEventListener("click", () => {
    // to be in center, canvas.width / 2 - (shape.width / 2)
    const rect = new Rect(canvas.width / 2 - 60, canvas.height / 2 - 40);
    shapes.push(rect);
    render();
});

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const shape of shapes) {
        shape.render();
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