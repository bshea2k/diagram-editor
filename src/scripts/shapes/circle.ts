import { Shape } from "./shape";
import type { Coord } from "../utils";
import { drawText } from "canvas-txt";

const DEFAULT_RADIUS = 40;

export class Circle extends Shape {
    constructor(x: number, y: number) {
        super(x, y, DEFAULT_RADIUS * 2, DEFAULT_RADIUS * 2, "Text");
    }

    render(ctx: CanvasRenderingContext2D, xOffset: number, yOffset: number): void {
        this.x += xOffset;
        this.y += yOffset;

        ctx.strokeStyle = "#0D0D0D";
        ctx.lineWidth = 1;
        ctx.fillStyle = "#F8F8F8";
        ctx.beginPath();
        ctx.lineTo(this.x + this.width / 2, this.y);
        ctx.quadraticCurveTo(this.x + this.width, this.y, this.x + this.width, this.y + this.height / 2);
        ctx.quadraticCurveTo(this.x + this.width, this.y + this.height, this.x + this.width / 2, this.y + this.height);
        ctx.quadraticCurveTo(this.x, this.y + this.height, this.x, this.y + this.height / 2);
        ctx.quadraticCurveTo(this.x, this.y, this.x + this.width / 2, this.y);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        ctx.fillStyle = "#0D0D0D"
        drawText(ctx, this.text, {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            font: "Helvetica",
            fontSize: 16,
            align: "center",
            vAlign: "middle"
        });

        this.x -= xOffset;
        this.y -= yOffset;
    }

    detect(x: number, y: number): boolean {
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;
        const radiusX = this.width / 2;
        const radiusY = this.height / 2;

        // equation of a standard ellipse
        return ((x - centerX) ** 2) / (radiusX ** 2) + ((y - centerY) ** 2) / (radiusY ** 2) <= 1;
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