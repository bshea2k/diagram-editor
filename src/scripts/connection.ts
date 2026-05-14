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
        if (startShape) this.connectStartShape(startShape, startPos);
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
        let LENIENCY_WIDTH = 5;
        let start = this.getActualStartPos();
        let end = this.getActualEndPos();
        let opposite = end.y - start.y;
        let adjacent = end.x - start.x;
        let theta = Math.atan(opposite / adjacent);
        let rotation = 0;

        if (opposite > 0) {
            if (adjacent >= 0) rotation = -theta;
            else rotation = theta - Math.PI;
        }
        else if (opposite < 0) {
            if (adjacent >= 0) rotation =  theta;
            else rotation = Math.PI - theta;
        }
        else {
            if (start.x > end.x) {
                start = end;
                end = this.getActualStartPos();
            }
        }

        let rotatedEnd = {x: end.x * Math.cos(rotation) - end.y * Math.sin(rotation), y: end.x * Math.sin(rotation) + end.y * Math.cos(theta)};
        let rotatedCursor = {x: x * Math.cos(rotation) - y * Math.sin(rotation), y: x * Math.sin(rotation) + y * Math.cos(theta)}

        if (rotatedCursor.x > start.x && rotatedCursor.x < start.x + rotatedEnd.x - start.x && rotatedCursor.y > LENIENCY_WIDTH && rotatedCursor.y < (start.y - LENIENCY_WIDTH / 2) + LENIENCY_WIDTH) {
            return true;
        }
        else return false;
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