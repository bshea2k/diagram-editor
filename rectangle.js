import { Shape } from "./shape.js";

export class Rectangle extends Shape {
    constructor(x, y) {
        super(x, y);
        this._width = 120;
        this._height = 80;
        this._text = "Text";
    }

    get height() { return this._height; }
    get width() { return this._width; }
    get text() { return this._text; }

    set height(height) { this._height = height; }
    set width(width) { this._width = width; }
    set text(text) { this._text = text; }

    render(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();

        ctx.font = "16px Helvetica";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#0D0D0D"
        ctx.fillText(this.text, this.x + (this.width / 2), this.y + (this.height / 2));
    }

    renderSelected(ctx) {
        ctx.fillStyle = "#C9B4F1";
        ctx.strokeStyle = "#0D0D0D";

        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y - 20, 5, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.x + this.width + 20, this.y + this.height / 2, 5, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y + this.height + 20, 5, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.x - 20, this.y + this.height / 2, 5, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
    }

    detect(x, y) {
        if (x > this._x && x < this._x + this._width 
            && y > this._y && y < this._y + this._height) {
                return true;
        }
        
        return false;
    }
}