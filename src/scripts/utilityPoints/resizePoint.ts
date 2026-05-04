import { UtilityPoint } from "./utilityPoint";
import type { Shape } from "../shape"
import type { Coord } from "../utils";

const WIDTH = 10;
type Side = "topleft" | "topright" | "bottomright" | "bottomleft";

export class ResizePoint extends UtilityPoint {
    public shape: Shape;
    public side: Side;
    private x!: number;
    private y!: number;

    constructor(shape: Shape, side: Side) {
        super("ResizePoint");
        this.shape = shape;
        this.side = side;
        this.updatePosition();
    }

    detect(pos: Coord): boolean {
        this.updatePosition();

        if (pos.x > this.x && pos.x < this.x + WIDTH && pos.y > this.y && pos.y < this.y + WIDTH) {
            return true;
        }
        else return false;
    }

    render(ctx: CanvasRenderingContext2D): void {
        this.updatePosition();

        ctx.strokeStyle = "#855CC0";
        ctx.fillStyle = "#F8F8F8";

        ctx.beginPath();
        ctx.rect(this.x, this.y, WIDTH, WIDTH);
        ctx.stroke();
        ctx.fill();
    }

    renderActive(ctx: CanvasRenderingContext2D): void {
        this.updatePosition();

        ctx.strokeStyle = "#855CC0";
        ctx.fillStyle = "#855CC0";

        ctx.beginPath();
        ctx.rect(this.x, this.y, WIDTH, WIDTH);
        ctx.stroke();
        ctx.fill();
    }

    // could use subscriber pattern, so function is only called when parent shape moves & thus notifies
    updatePosition(): void {
        switch(this.side) {
            case "topleft":
                this.x = this.shape.x - WIDTH / 2;
                this.y = this.shape.y - WIDTH / 2;
                break;
            case "topright":
                this.x = this.shape.x + this.shape.width - WIDTH / 2;
                this.y = this.shape.y - WIDTH / 2;
                break;
            case "bottomright":
                this.x = this.shape.x + this.shape.width - WIDTH / 2;
                this.y = this.shape.y + this.shape.height - WIDTH / 2;
                break;
            case "bottomleft":
                this.x = this.shape.x - WIDTH / 2;
                this.y = this.shape.y + this.shape.height - WIDTH / 2;
                break;
        }
    }
}