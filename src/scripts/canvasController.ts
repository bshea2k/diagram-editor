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

        this._canvas.addEventListener("mousedown", this.startMovingShape);
    }

    /**
     * Selects a shape at the mouse position, if any, and
     * allows for movement of the shape via mouse movement
     */
    startMovingShape = (e: MouseEvent): void => {
        // only allow left clicks, dont do anything if a CP is hovered
        if (e.button !== 0 || this._selectedCP) return;

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
            this._draggingMouse = true;
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

        this._draggingMouse = false;

        this.render();

        this._canvas.removeEventListener("mouseup", this.endMovingShape);
    }

    /**
     * Highlights connection points if they are hovered by the mouse,
     * and allows them to create connection lines
     */
    hoverConnectionPoint = (e: MouseEvent): void => {
        let mousePos = getMousePosition(e, this._canvasPos);

        for (const cp of this._selectedShape!.connectionPoints) {
            if (cp.detect(mousePos.x, mousePos.y)) {
                this._selectedCP = cp;
                this._canvas.addEventListener("mousedown", this.startMovingCreatedConnection);
                break;
            }
            else {
                this._selectedCP = null;
                this._canvas.removeEventListener("mousedown", this.startMovingCreatedConnection);
            }
        }

        this.render();
    }

    startMovingCreatedConnection = (e: MouseEvent): void => {
        if (e.button !== 0) {
            return;
        }
        
        let mousePos = getMousePosition(e, this._canvasPos);
        this._draggingMouse = true;

        let connection = new Connection({x: this._selectedShape!.x, y: this._selectedShape!.y}, {x: mousePos.x, y: mousePos.y});
        this._selectedConnection = connection;
        this._diagram.addConnection(connection);

        this.unselectSelectedShape();
        this._canvas.removeEventListener("mousedown", this.startMovingCreatedConnection);
        this._canvas.addEventListener("mousemove", this.moveCreatedConnection);
        this._canvas.addEventListener("mouseup", this.endMovingCreatedConnection);
        
        this.render();
    }

    moveCreatedConnection = (e: MouseEvent): void => {
        let mousePos = getMousePosition(e, this._canvasPos);
        this._selectedConnection!.endPos = {x: mousePos.x, y: mousePos.y};
        this.render();
    }

    endMovingCreatedConnection = (e: MouseEvent): void => {
        this._canvas.removeEventListener("mousemove", this.moveCreatedConnection);
        this._canvas.removeEventListener("mouseup", this.endMovingCreatedConnection);
        this._draggingMouse = false;
        this.render();
    }


    render(): void {
        this._renderer.render(this._diagram, this._selectedShape, this._draggingMouse, this._selectedCP);
    }

    selectShape(shape: Shape): void {
        this._selectedShape = shape;
        this._canvas.addEventListener("mousemove", this.hoverConnectionPoint);
    }

    unselectSelectedShape(): void {
        this._selectedShape = null;
        this._selectedCP = null;
        this._canvas.removeEventListener("mousemove", this.hoverConnectionPoint);
    }
}