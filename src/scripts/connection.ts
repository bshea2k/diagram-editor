import { MovementPoint } from "./utilityPoints/movementPoint";
import type { UtilityPoint } from "./utilityPoints/utilityPoint";
import type { Shape } from "./shapes/shape";
import type { Coord } from "./utils";

type Side = "top" | "right" | "bottom" | "left";

const ARROW_SIZE = 15;

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
        ctx.lineWidth = 2; // should be customizable later
        ctx.strokeStyle = "#0D0D0D" // should be customizable later(?)
        ctx.fillStyle = "#0D0D0D"; // should be customizable later(?)
        const start = this.getActualStartPos();
        const end = this.getActualEndPos();

        // draw connection ine
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.closePath();
        ctx.stroke();
 
        const theta = Math.atan2(end.y - start.y, end.x - start.x);
        const left  = theta + Math.PI + Math.PI / 6;
        const right = theta + Math.PI - Math.PI / 6;

        // draw arrow at end of connection line
        ctx.beginPath();
        ctx.moveTo(end.x, end.y);
        ctx.lineTo(end.x + ARROW_SIZE * Math.cos(left),  end.y + ARROW_SIZE * Math.sin(left));
        ctx.lineTo(end.x + ARROW_SIZE * Math.cos(right), end.y + ARROW_SIZE * Math.sin(right));
        ctx.closePath();
        ctx.fill();
    }

    detect(x: number, y: number): boolean {
        const LENIENCY_WIDTH = 5;
        const start = this.getActualStartPos();
        const end = this.getActualEndPos();

        const dx = end.x - start.x;
        const dy = end.y - start.y;

        const rotation = -Math.atan2(dy, dx);

        // rotation matrix
        const relCursorX = (x - start.x) * Math.cos(rotation) - (y - start.y) * Math.sin(rotation);
        const relCursorY = (x - start.x) * Math.sin(rotation) + (y - start.y) * Math.cos(rotation);

        const lineLength = Math.sqrt(dx * dx + dy * dy);

        return (
            relCursorX >= 0 &&
            relCursorX <= lineLength &&
            Math.abs(relCursorY) <= LENIENCY_WIDTH
        );
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