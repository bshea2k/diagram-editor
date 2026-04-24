import type { Renderer } from "./renderer";
import type { Shape } from "./shape";
import type { Diagram } from "./diagram";
import type { ConnectionPoint } from "./ConnectionPoint";
import { Connection } from "./connection";
import { getElementPosition, getMousePosition } from "./utils";

export class CanvasController {
    _canvas: HTMLCanvasElement;
    _canvasPos: {x: number, y: number};
    _ctx: CanvasRenderingContext2D;
    _diagram: Diagram;
    _renderer: Renderer;
    _selectedShape: Shape | null = null;
    _selectedShapeInitialX: number = 0;
    _selectedShapeInitialY: number = 0;
    _clientMouseInitialX: number = 0;
    _clientMouseInitialY: number = 0;
    _draggingShape: boolean = false;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, diagram: Diagram, renderer: Renderer) {
        this._canvas = canvas;
        this._ctx = ctx;
        this._diagram = diagram;
        this._renderer = renderer;
        this._canvasPos = getElementPosition(this._canvas);

        this._canvas.addEventListener("mousedown", this.detectShape);
    }

    /**
     * Selects a shape at the mouse position, if any, and
     * allows for movement of the shape via mouse movement
     */
    detectShape = (e: MouseEvent): void => {
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
            this._clientMouseInitialX = e.clientX;
            this._clientMouseInitialY = e.clientY;
            this._canvas.addEventListener("mousemove", this.moveShape);
            this._canvas.addEventListener("mouseup", this.endMovingShape);
            this.render();
        }
    }

    /**
     * Moves the selected shape's position via mouse movement
     */
    moveShape = (e: MouseEvent): void => {
        let xOffset = e.clientX - this._clientMouseInitialX;
        let yOffset = e.clientY - this._clientMouseInitialY;

        this._selectedShape!.x = this._selectedShapeInitialX + xOffset; // CHECK NONNULL ASSERTION
        this._selectedShape!.y = this._selectedShapeInitialY + yOffset; // CHECK NONNULL ASSERTION

        this.render();
    }

    /**
     * Performs neccesary functions to stop movement of the selected shape
     */
    endMovingShape = (e: MouseEvent): void => {
        this._canvas.removeEventListener("mousemove", this.moveShape);

        this._draggingShape = false;

        this.render();

        this._canvas.removeEventListener("mouseup", this.endMovingShape);
    }

    render(): void {
        this._renderer.render(this._diagram, this._selectedShape, this._draggingShape);
    }

    selectShape(shape: Shape): void {
        this._selectedShape = shape;
    }

    unselectSelectedShape(): void {
        this._selectedShape = null;
    }
}