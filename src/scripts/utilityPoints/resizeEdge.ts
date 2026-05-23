import { UtilityPoint } from "./utilityPoint";
import type { Shape } from "../shapes/shape";
import type { Coord } from "../utils";

const LENIENCY_WIDTH = 10;
type Side = "top" | "right" | "bottom" | "left";

export class ResizeEdge extends UtilityPoint {
    public shape: Shape;
    public side: Side;
    private startPos: Coord = {x: 0, y: 0};
    private endPos: Coord = {x: 0, y: 0};

    constructor(shape: Shape, side: Side) {
        super("ResizeEdge");
        this.shape = shape;
        this.side = side;
        this.updatePosition();
    }

    detect(pos: Coord, xOffset: number, yOffset: number): boolean {
        this.updatePosition();

        if (this.side === "top" || this.side === "bottom") {
            if (pos.x > this.startPos.x + xOffset && pos.x < this.startPos.x + + this.endPos.x - this.startPos.x + xOffset && pos.y > this.startPos.y + yOffset - LENIENCY_WIDTH / 2 && pos.y < this.startPos.y + yOffset - LENIENCY_WIDTH / 2 + LENIENCY_WIDTH) return true;
        }
        else if (this.side === "left" || this.side === "right") {
            if (pos.x > this.startPos.x + xOffset - LENIENCY_WIDTH / 2 && pos.x < this.startPos.x + xOffset - LENIENCY_WIDTH / 2 + LENIENCY_WIDTH && pos.y > this.startPos.y + yOffset && pos.y < this.startPos.y + this.endPos.y - this.startPos.y + yOffset) return true;
        }

        return false;
    }

    render(ctx: CanvasRenderingContext2D, xOffset: number, yOffset: number): void {
        this.updatePosition();

        ctx.strokeStyle = "#855CC0";
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(this.startPos.x + xOffset, this.startPos.y + yOffset);
        ctx.lineTo(this.endPos.x + xOffset, this.endPos.y + yOffset);
        ctx.stroke();
    }

    renderActive(ctx: CanvasRenderingContext2D, xOffset: number, yOffset: number): void {
        this.render(ctx, xOffset, yOffset);
    }

    // could use subscriber pattern, so function is only called when parent shape moves & thus notifies
    updatePosition(): void {
        switch(this.side) {
            case "top":
                this.startPos.x = this.shape.x;
                this.startPos.y = this.shape.y;
                this.endPos.x = this.shape.x + this.shape.width;
                this.endPos.y = this.shape.y;
                break;
            case "right":
                this.startPos.x = this.shape.x + this.shape.width;
                this.startPos.y = this.shape.y;
                this.endPos.x = this.shape.x + this.shape.width;
                this.endPos.y = this.shape.y + this.shape.height;
                break;
            case "bottom":
                this.startPos.x = this.shape.x;
                this.startPos.y = this.shape.y + this.shape.height;
                this.endPos.x = this.shape.x + this.shape.width;
                this.endPos.y = this.shape.y + this.shape.height;
                break;
            case "left":
                this.startPos.x = this.shape.x;
                this.startPos.y = this.shape.y;
                this.endPos.x = this.shape.x;
                this.endPos.y = this.shape.y + this.shape.height;
                break;
        }
    }
}