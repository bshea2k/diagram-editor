import { Shape } from "./shape";
import type { Coord } from "../utils";

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
        ctx.strokeStyle = "#0D0D0D";
        ctx.fillStyle = "#F8F8F8";
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        ctx.fill();

        ctx.font = "16px Helvetica";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#0D0D0D"
        ctx.fillText(this.text, this.x + (this.width / 2), this.y + (this.height / 2));
    }

    detect(x: number, y: number): boolean {
        if (x > this._x && x < this._x + this._width 
            && y > this._y && y < this._y + this._height) {
                return true;
        }
        
        return false;
    }

    getNearestEdgePoint(x: number, y: number): Coord {
        return {x: 0, y: 0};
    }
}