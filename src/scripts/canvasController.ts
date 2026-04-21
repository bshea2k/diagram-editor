import type { Renderer } from "./renderer";
import type { Shape } from "./shape";
import type { Diagram } from "./diagram";
import type { ConnectionPoint } from "./ConnectionPoint";
import { getElementPosition, getMousePosition } from "./utils";

export class CanvasController {
    _canvas: HTMLCanvasElement;
    _ctx: CanvasRenderingContext2D;
    _diagram: Diagram;
    _renderer: Renderer;
    _selectedShape: Shape | null = null;
    _hoveredShape: Shape | null = null;
    _selectedConnectionPoint: ConnectionPoint | null = null;
    _hoveredConnectionPoint: ConnectionPoint | null = null;
    _selectedShapeInitialX: number = 0;
    _selectedShapeInitialY: number = 0;
    _initialClientX: number = 0;
    _initialClientY: number = 0;
    _canvasPos: {x: number, y: number};
    _draggingShape: boolean = false;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, diagram: Diagram, renderer: Renderer) {
        this._canvas = canvas;
        this._ctx = ctx;
        this._diagram = diagram;
        this._renderer = renderer;
        this._canvasPos = getElementPosition(this._canvas);

        this._canvas.addEventListener("mousedown", this.detectShape);
    }

    detectShape = (e: MouseEvent) => {
        if (e.button !== 0) return;

        let mousePos = getMousePosition(e, this._canvasPos);
        this.unselectSelectedShape();

        for (const shape of this._diagram.getShapes()) {
            if (shape.detect(mousePos.x, mousePos.y)) {
                this.selectShape(shape);
                this._selectedShapeInitialX = shape.x;
                this._selectedShapeInitialY = shape.y;
                // break because earliest found is at front of array, highest layer
                break;
            }
        }

        this.render();

        if (this._selectedShape) {
            this._draggingShape = true;
            this._initialClientX = e.clientX;
            this._initialClientY = e.clientY;
            this._canvas.addEventListener("mousemove", this.moveShape);
            this._canvas.addEventListener("mouseup", this.endMovingShape);
            this.render();
        }
    }

    moveShape = (e: MouseEvent) => {
        let xOffset = e.clientX - this._initialClientX;
        let yOffset = e.clientY - this._initialClientY;

        this._selectedShape!.x = this._selectedShapeInitialX + xOffset; // CHECK NONNULL ASSERTION
        this._selectedShape!.y = this._selectedShapeInitialY + yOffset; // CHECK NONNULL ASSERTION

        this.render();
    }

    endMovingShape = (e: MouseEvent) => {
        this._canvas.removeEventListener("mousemove", this.moveShape);

        this._draggingShape = false;

        this.render();

        this._canvas.removeEventListener("mouseup", this.endMovingShape);
    }

    render(): void {
        this._renderer.render(this._diagram, this._selectedShape, this._draggingShape, this._hoveredConnectionPoint);
    }

    selectShape(shape: Shape): void {
        this._selectedShape = shape;

        shape.connectionPoints.forEach((cp) => {
            this._canvas.addEventListener("mousemove", (e) => {
                console.log("h");
                let mousePos = getMousePosition(e, this._canvasPos);

                if (cp.detect(mousePos.x, mousePos.y)) {
                    this._hoveredConnectionPoint = cp;
                }
                else if (this._hoveredConnectionPoint === cp) {
                    this._hoveredConnectionPoint = null;
                }

                this.render();
            })
        });
    }

    unselectSelectedShape(): void {
        // remove event listeners for connection points
        this._selectedShape = null;
    }
}