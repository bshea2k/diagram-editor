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

    connectStartShape(shape: Shape, posOnShape: Coord): void {
        this.startShape = shape;
        this.startPos.x = (posOnShape.x - shape.x) / shape.width;
        this.startPos.y = (posOnShape.y - shape.y) / shape.height;
    }

    connectEndShape(shape: Shape, posOnShape: Coord): void {
        this.endShape = shape;
        this.endPos.x = (posOnShape.x - shape.x) / shape.width;
        this.endPos.y = (posOnShape.y - shape.y) / shape.height;
    }

    getActualStartPos(): Coord {
        if (this.startShape) return {x: this.startShape.x + this.startShape.width * this.startPos.x, y: this.startShape.y + this.startShape.height * this.startPos.y};
        else return this.startPos;
    }

    getActualEndPos(): Coord {
        if (this.endShape) return {x: this.endShape.x + this.endShape.width * this.endPos.x, y: this.endShape.y + this.endShape.height * this.endPos.y};
        else return this.endPos;
    }
}