import { UtilityPoint } from "./utilityPoint";
import type { Shape } from "../shape"
import type { Coord } from "../utils";

const DISTANCE_FROM_SHAPE = 20;
const RADIUS = 5;
type Side = "top" | "right" | "bottom" | "left";

export class ConnectionPoint extends UtilityPoint {
    public shape: Shape;
    public side: Side;
    private x: number;
    private y: number;

    constructor(shape: Shape, side: Side) {
        super("ConnectionPoint");
        this.shape = shape;
        this.side = side;
        this.x = 0;
        this.y = 0;
        this.updatePosition();
    }

    detect(pos: Coord): boolean {
        //pythagorean theorem
        let a = this.x - pos.x;
        let b = this.y - pos.y;
        let distance = Math.sqrt((a ** 2) + (b ** 2));
        
        return distance <= RADIUS * 1.75; // multiply to increase leniency
    }

    render(ctx: CanvasRenderingContext2D): void {
        this.updatePosition();
        
        ctx.fillStyle = "#C9B4F1";
        ctx.strokeStyle = "#0D0D0D";
        ctx.beginPath();
        ctx.arc(this.x, this.y, RADIUS, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
    }

    renderActive(ctx: CanvasRenderingContext2D): void {
        this.updatePosition();

        ctx.fillStyle = "#855CC0";
        ctx.strokeStyle = "#0D0D0D";
        ctx.beginPath();
        ctx.arc(this.x, this.y, RADIUS, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
    }

    updatePosition() {
        switch(this.side) {
            case "top":
                this.x = this.shape.x + this.shape.width / 2;
                this.y = this.shape.y - DISTANCE_FROM_SHAPE;
                break;
            case "right":
                this.x = this.shape.x + this.shape.width + DISTANCE_FROM_SHAPE;
                this.y = this.shape.y + this.shape.height / 2;
                break;
            case "bottom":
                this.x = this.shape.x + this.shape.width / 2;
                this.y = this.shape.y + this.shape.height + DISTANCE_FROM_SHAPE;
                break;
            case "left":
                this.x = this.shape.x - DISTANCE_FROM_SHAPE;
                this.y = this.shape.y + this.shape.height / 2;
                break;
        }
    }
}