import { ConnectionMovementPoint } from "./utilityPoints/connectionMovementPoint";
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
        ctx.lineWidth = 1; // should be customizable later
        ctx.strokeStyle = "#0D0D0D" // should be customizable later(?)

        ctx.beginPath();
        ctx.moveTo(this.actualStartPos().x, this.actualStartPos().y);
        ctx.lineTo(this.actualStartPos().x, this.actualStartPos().y);
        ctx.closePath();
        ctx.stroke();
    }

    detect(x: number, y: number): boolean {
        return false;
    }

    removeStartShape(): void {
        if (!this.startShape) return;

        this.startPos = {x: this.startShape.x + this.startPos.x, y: this.startShape.y + this.startPos.y};
        this.startShape = null;
    }

    removeEndShape(): void {
        if (!this.endShape) return;

        this.endPos = {x: this.endShape.x + this.endPos.x, y: this.endShape.y + this.endPos.y};
        this.endShape = null;
    }

    actualStartPos(): {x: number, y: number} {
        if (this.startShape) return {x: this.startShape.x + this.startPos.x, y: this.startShape.y + this.startPos.y};
        else return this.startPos;
    }

    actualEndPos(): {x: number, y: number} {
        if (this.endShape) return {x: this.endShape.x + this.endPos.x, y: this.endShape.y + this.endPos.y};
        else return this.endPos;
    }
}