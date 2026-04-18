import type { Shape } from "./shape"

const DISTANCE_FROM_SHAPE = 20;
const RADIUS = 5;

export class ConnectionPoint {
    _shape: Shape;
    _side: "top" | "bottom" | "right" | "left";
    _x: number;
    _y: number;

    constructor(shape: Shape, side: "top" | "bottom" | "right" | "left") {
        this._shape = shape;
        this._side = side;
        this._x = 0;
        this._y = 0;
        this.updatePosition();
    }

    render(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "#C9B4F1";
        ctx.strokeStyle = "#0D0D0D";
        ctx.beginPath();
        ctx.arc(this._x, this._y, RADIUS, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
    }

    updatePosition() {
        switch(this._side) {
            case "top":
                this._x = this._shape.x + this._shape.width / 2;
                this._y = this._shape.y - DISTANCE_FROM_SHAPE;
                break;
            case "right":
                this._x = this._shape.x + this._shape.width + DISTANCE_FROM_SHAPE;
                this._y = this._shape.y + this._shape.height / 2;
                break;
            case "bottom":
                this._x = this._shape.x + this._shape.width / 2;
                this._y = this._shape.y + this._shape.height + DISTANCE_FROM_SHAPE;
                break;
            case "left":
                this._x = this._shape.x - DISTANCE_FROM_SHAPE;
                this._y = this._shape.y + this._shape.height / 2;
                break;
        }
    }
}