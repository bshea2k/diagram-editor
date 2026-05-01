import type { Renderer } from "./renderer";
import type { Shape } from "./shape";
import type { Diagram } from "./diagram";
import type { ConnectionPoint } from "./ConnectionPoint";
import type { Coord, Input } from "./utils";
import { Connection } from "./connection";
import { getElementPosition, getMousePosition } from "./utils";

type CanvasState = "nothingSelected" | "shapeHovered" | "draggingShape" | "shapeSelected" | "connectionPointHovered" | "movingLine" | "lineSelected" | "lineHovered" | "lineMovePointHovered" | "resizeEdgeHovered" | "resizedPointHovered" | "resizingShape" | "rotatePointHovered" | "rotatingShape";

export class CanvasController {
    _state: CanvasState = "nothingSelected";

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
        const input = {mousePos: getMousePosition(e, this._canvasPos), mouseDown: true};
    }

    handleMouseMove = (e: MouseEvent): void => {
        const input = {mousePos: getMousePosition(e, this._canvasPos), mouseMove: true};
    }

    handleMouseUp = (e: MouseEvent): void => {
        const input = {mousePos: getMousePosition(e, this._canvasPos), mouseUp: true};
    }

    /*
    handleDraggingShape(input: Input) {
        if (this._enteringState && input.mousePos) {
            this._draggingMouse = true;
            this._clientMouseInitialX = input.mousePos.x;
            this._clientMouseInitialY = input.mousePos.y;
            this._selectedShapeInitialX = this._selectedShape!.x;
            this._selectedShapeInitialY = this._selectedShape!.y;

            this._enteringState = false;
            this.render();
            return;
        }

        if (input.mouseMove && input.mousePos) {
            let xOffset = input.mousePos.x - this._clientMouseInitialX;
            let yOffset = input.mousePos.y- this._clientMouseInitialY;

            this._selectedShape!.x = this._selectedShapeInitialX + xOffset;
            this._selectedShape!.y = this._selectedShapeInitialY + yOffset;

            this.render();
        }

        if (input.mouseUp) {
            this._draggingMouse = false;

            this._enteringState = true;
            this.setState("shapeSelected");
            this.handleShapeSelected(input);
        }
    }

    // relevant fields: _selectedShape
    handleShapeSelected(input: Input) {
        if (this._enteringState) {
            this._enteringState = false;
            this.render();
            return;
        }

        if (input.mouseDown && input.mousePos) {
            this._selectedShape = null;

            for (const shape of this._diagram.getShapes()) {
                if (shape.detect(input.mousePos.x, input.mousePos.y)) {
                    this._selectedShape = shape;
                    // break because earliest found is at front of array, highest layer
                    break;
                }
            }

            if (this._selectedShape) {
                this._enteringState = true;
                this.setState("draggingShape");
                this.handleDraggingShape(input);
            }
            else {
                this._enteringState = true;
                this.setState("nothingSelected");
                //this.handleNothingSelected(input);
                this.render();
            }
        }
    } */

    render(): void {
        this._renderer.render(this._diagram, this._selectedShape, this._draggingMouse, this._selectedCP, this._selectedConnection);
    }

    selectShape(shape: Shape | null): void {
        this._selectedShape = shape;
    }

    detectShape(mousePos: Coord): Shape | null {
        for (const shape of this._diagram.getShapes()) {
            if (shape.detect(mousePos.x, mousePos.y)) {
                // return because earliest found is at front of array, highest layer
                return shape;
            }
        }

        return null;
    }
}