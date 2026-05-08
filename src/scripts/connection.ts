import { ConnectionMovementPoint } from "./utilityPoints/connectionMovementPoint";
import type { Shape } from "./shape";
import type { Coord } from "./utils";

type Side = "top" | "right" | "bottom" | "left";

export class Connection {
    public startShape: Shape | null = null;
    public startShapeSide: Side | null = null;
    public startShapePos: number | null = null;
    public endShape: Shape | null = null;
    public endShapeSide: Side | null = null;
    public endShapePos: number | null = null;
    public startPos: Coord | null = null;
    public endPos: Coord | null = null;
    public movementPoints: ConnectionMovementPoint[];

    constructor(startPos: Coord, endPos: Coord) {
        this.startPos = startPos;
        this.endPos = endPos;
        this.movementPoints = [
            new ConnectionMovementPoint(this, "start"),
            new ConnectionMovementPoint(this, "end"),
        ];
    }

    render(ctx: CanvasRenderingContext2D): void {
        ctx.lineWidth = 1; // should be customizable later
        ctx.strokeStyle = "#0D0D0D" // should be customizable later(?)

        if (this.startPos && this.endPos) {
            ctx.beginPath();
            ctx.moveTo(this.startPos.x, this.startPos.y);
            ctx.lineTo(this.endPos.x, this.endPos.y);
            ctx.closePath();
            ctx.stroke();
        }
    }

    detect(x: number, y: number): boolean {
        return false;
    }
}