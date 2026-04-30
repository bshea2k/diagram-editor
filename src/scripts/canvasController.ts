import type { Renderer } from "./renderer";
import type { Shape } from "./shape";
import type { Diagram } from "./diagram";
import type { ConnectionPoint } from "./ConnectionPoint";
import type { Coord, Input } from "./utils";
import { Connection } from "./connection";
import { getElementPosition, getMousePosition } from "./utils";

type CanvasState = "nothingSelected" | "shapeHovered" | "draggingShape" | "shapeSelected" | "connectionPointHovered" | "movingLine" | "lineSelected" | "lineHovered" | "lineMovePointHovered" | "resizeEdgeHovered" | "resizedPointHovered" | "resizingShape" | "rotatePointHovered" | "rotatingShape";

export class CanvasController {
    _state: CanvasState;
    _canvas: HTMLCanvasElement;
    _canvasPos: Coord;
    _ctx: CanvasRenderingContext2D;
    _diagram: Diagram;
    _renderer: Renderer;
    _selectedShape: Shape | null = null;
    _selectedCP: ConnectionPoint | null = null;
    _selectedConnection: Connection | null = null;
    _selectedShapeInitialX: number = 0;
    _selectedShapeInitialY: number = 0;
    _clientMouseInitialX: number = 0;
    _clientMouseInitialY: number = 0;
    _draggingMouse: boolean = false;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, diagram: Diagram, renderer: Renderer) {
        this._state = "nothingSelected";
        this._canvas = canvas;
        this._ctx = ctx;
        this._diagram = diagram;
        this._renderer = renderer;
        this._canvasPos = getElementPosition(this._canvas);

        this._canvas.addEventListener("mousedown", this.handleMouseDown);
        this._canvas.addEventListener("mousemove", this.handleMouseMove);
        this._canvas.addEventListener("mouseup", this.handleMouseUp);
    }

    handleMouseDown = (e: MouseEvent): void => {
        switch(this._state) {

        }
    }

    handleMouseMove = (e: MouseEvent): void => {
        switch(this._state) {

        }
    }

    handleMouseUp = (e: MouseEvent): void => {
        switch(this._state) {

        }
    }

    handleNothingSelected = (e: MouseEvent): void => {

    }

    render(): void {
        this._renderer.render(this._diagram, this._selectedShape, this._draggingMouse, this._selectedCP, this._selectedConnection);
    }

    selectShape(shape: Shape): void {
        this._selectedShape = shape;
    }

    setState(state: CanvasState): void {
        this._state = state;
    }
}