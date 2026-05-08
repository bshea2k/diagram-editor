import { MovementPoint } from "./utilityPoints/movementPoint";
import type { UtilityPoint } from "./utilityPoints/utilityPoint";
import type { Shape } from "./shape";
import type { Coord } from "./utils";

type Side = "top" | "right" | "bottom" | "left";

export class Connection {
    public startShape: Shape | null = null;
    public endShape: Shape | null = null;
    public startPos: Coord;
    public endPos: Coord;
    public utilityPoints: UtilityPoint[];

    constructor(startPos: Coord, endPos: Coord, startShape?: Shape) {
        this.startPos = startPos;
        this.endPos = endPos;
        if (startShape) this.startShape = startShape;
        this.utilityPoints = [
            new MovementPoint(this, "start"),
            new MovementPoint(this, "end"),
        ];
    }

    render(ctx: CanvasRenderingContext2D): void {
        ctx.lineWidth = 1; // should be customizable later
        ctx.strokeStyle = "#0D0D0D" // should be customizable later(?)

        ctx.beginPath();
        ctx.moveTo(this.getActualStartPos().x, this.getActualStartPos().y);
        ctx.lineTo(this.getActualEndPos().x, this.getActualEndPos().y);
        ctx.closePath();
        ctx.stroke();
    }

    detect(x: number, y: number): boolean {
        return false;
    }

    connectStartShape(shape: Shape): void {
        this.startShape = shape;
    }

    connectEndShape(shape: Shape): void {
        this.endShape = shape;
    }

    getActualStartPos(): Coord {
        if (this.startPos) return this.startPos;
        else return {x: 0, y: 0};
    }

    getActualEndPos(): Coord {
        if (this.endPos) return this.endPos;
        else return {x: 0, y: 0};
    }
}