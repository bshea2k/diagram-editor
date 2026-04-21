import type { Shape } from "./shape";

export class Connection {
    // figure out relation to shapes and positions when moving shapes
    _startShape: Shape | null = null;
    _endShape: Shape | null = null;
    _startPos: {x: number, y: number};
    _endPos: {x: number, y: number};

    constructor(startPos: {x: number, y: number}, endPos: {x: number, y: number}) {
        this._startPos = startPos;
        this._endPos = endPos;
    }

    get startShape() { return this._startShape; }
    get endShape() { return this._endShape; }
    get startPos() { return this._startPos; }
    get endPos() { return this._endPos; }

    set startShape(startShape) { this._startShape = startShape; }
    set endShape(endShape) { this._endShape = endShape; }
    set startPos(startPos) { this._startPos = startPos; }
    set endPos(endPos) { this._endPos = endPos; }

    render(ctx: CanvasRenderingContext2D): void {
        ctx.lineWidth = 1; // should be customizable later
        ctx.strokeStyle = "#0D0D0D" // should be customizable later(?)

        ctx.beginPath();
        ctx.moveTo(this.startPos.x, this.startPos.y);
        ctx.lineTo(this.endPos.x, this.endPos.y);
        ctx.closePath();
        ctx.stroke();
    }

    renderHovered(ctx: CanvasRenderingContext2D): void { }

    renderSelected(ctx: CanvasRenderingContext2D): void { }

    detect(x: number, y: number): boolean {
        return false;
    }
}