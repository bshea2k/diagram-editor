import { Shape } from "./shape";
import type { Coord } from "../utils";
import { drawText } from "canvas-txt";

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 80;

export class Rectangle extends Shape {

    constructor(x: number, y: number) {
        super(x, y, DEFAULT_WIDTH, DEFAULT_HEIGHT, "Text");
    }

    render(ctx: CanvasRenderingContext2D, xOffset: number, yOffset: number): void {
        this.x += xOffset;
        this.y += yOffset;

        ctx.strokeStyle = "#0D0D0D";
        ctx.lineWidth = 1;
        ctx.fillStyle = "#F8F8F8";
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
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
        if (x > this.x && x < this.x + this.width 
            && y > this.y && y < this.y + this.height) {
                return true;
        }
        
        return false;
    }

    getNearestEdgePoint(x: number, y: number): Coord {
        // clamp(MIN, VAL, MAX) = max(MIN, min(VAL, MAX))
        let clampX = Math.max(this.x, Math.min(x, this.x + this.width));
        let clampY = Math.max(this.y, Math.min(y, this.y + this.height));

        let distFromTop = Math.abs(clampY - this.y);
        let distFromRight = Math.abs(clampX - (this.x + this.width));
        let distFromBottom = Math.abs(clampY - (this.y + this.height));
        let distFromLeft = Math.abs(clampX - this.x);
        let minDist = Math.min(distFromTop, distFromRight, distFromBottom, distFromLeft);

        if (minDist === distFromTop) return {x: clampX, y: this.y};
        else if (minDist === distFromRight) return {x: this.x + this.width, y: clampY};
        else if (minDist === distFromBottom) return {x: clampX, y: this.y + this.height};
        else return {x: this.x, y: clampY};
    }
}