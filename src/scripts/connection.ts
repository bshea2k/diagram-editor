import { ConnectionMovementPoint } from "./connectionMovementPoint";
import type { Shape } from "./shape";

export class Connection {
    // figure out relation to shapes and positions when moving shapes
    _startShape: Shape | null = null;
    _endShape: Shape | null = null;
    _startPos: {x: number, y: number};
    _endPos: {x: number, y: number};
    _movementPoints: ConnectionMovementPoint[];

    constructor(startPos: {x: number, y: number}, endPos: {x: number, y: number}) {
        this._startPos = startPos;
        this._endPos = endPos;
        this._movementPoints = [
            new ConnectionMovementPoint(this, "start"),
            new ConnectionMovementPoint(this, "end"),
        ];
    }

    get startShape() { return this._startShape; }
    get endShape() { return this._endShape; }
    get startPos() { return this._startPos; }
    get endPos() { return this._endPos; }
    get movementPoints() { return this._movementPoints; }

    set startShape(startShape) { this._startShape = startShape; }
    set endShape(endShape) { this._endShape = endShape; }
    set startPos(startPos) { this._startPos = startPos; }
    set endPos(endPos) { this._endPos = endPos; }

    render(ctx: CanvasRenderingContext2D): void {
        // make this its own updatePosition() function later maybe, or clean up/refactor
        let actualStartPos: {x: number, y: number} = this.startPos;
        let actualEndPos: {x: number, y: number} = this.endPos;

        if (this.startShape) actualStartPos = {x: this.startShape.x + this.startPos.x, y: this.startShape.y + this.startPos.y};
        if (this.endShape) actualEndPos = {x: this.endShape.x + this.endPos.x, y: this.endShape.y + this.endPos.y};

        ctx.lineWidth = 1; // should be customizable later
        ctx.strokeStyle = "#0D0D0D" // should be customizable later(?)

        ctx.beginPath();
        ctx.moveTo(actualStartPos.x, actualStartPos.y);
        ctx.lineTo(actualEndPos.x, actualEndPos.y);
        ctx.closePath();
        ctx.stroke();
    }

    detect(x: number, y: number): boolean {
        return false;
    }
}