import { Shape, SELECTED_POINT_OFFSET } from "./shape.js";

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 80;

export class Rectangle extends Shape {
    _text: string;

    constructor(x: number, y: number) {
        super(x, y, DEFAULT_WIDTH, DEFAULT_HEIGHT);
        this._text = "Text";
    }

    get text() { return this._text; }

    set text(text) { this._text = text; }

    render(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();

        ctx.font = "16px Helvetica";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#0D0D0D"
        ctx.fillText(this.text, this.x + (this.width / 2), this.y + (this.height / 2));
    }

    renderHovered(ctx: CanvasRenderingContext2D): void {

    }

    renderSelected(ctx: CanvasRenderingContext2D): void {
        for (const connectionPoint of this._connectionPoints) {
            connectionPoint.render(ctx);
        }
    }

    detect(x: number, y: number): boolean {
        if (x > this._x && x < this._x + this._width 
            && y > this._y && y < this._y + this._height) {
                return true;
        }
        
        return false;
    }
}