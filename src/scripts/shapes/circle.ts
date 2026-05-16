import { Shape } from "./shape";
import type { Coord } from "../utils";

const DEFAULT_RADIUS = 40;

// WILL NEED TO BE DRAWN USING CURVES IN FUTURE, TO MAKE OVALS
export class Circle extends Shape {
    _text: string;

    constructor(x: number, y: number) {
        super(x, y, DEFAULT_RADIUS * 2, DEFAULT_RADIUS * 2);
        this._text = "Text";
    }

    get text() { return this._text; }

    set text(text) { this._text = text; }

    render(ctx: CanvasRenderingContext2D): void {
        ctx.strokeStyle = "#0D0D0D";
        ctx.fillStyle = "#F8F8F8";
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y + this.width / 2, this.width / 2, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.fill();

        ctx.font = "16px Helvetica";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#0D0D0D"
        ctx.fillText(this.text, this.x + (this.width / 2), this.y + (this.height / 2));
    }

    // UPDATE TO REFLECT OVALS
    detect(x: number, y: number): boolean {
        //pythagorean theorem
        let a = this.x + this.width / 2 - x;
        let b = this.y + this.width / 2 - y;
        let distance = Math.sqrt((a ** 2) + (b ** 2));
        
        return distance <= this.width / 2;
    }

    getNearestEdgePoint(x: number, y: number): Coord {
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;
        const radiusX = this.width / 2;
        const radiusY = this.height / 2;

        const distX = x - centerX;
        const distY = y - centerY;

        const theta = Math.atan2(distY / radiusY, distX / radiusX);

        return {x: centerX + radiusX * Math.cos(theta), y: centerY + radiusY * Math.sin(theta)};
    }
}