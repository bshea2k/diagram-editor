import type { Renderer } from "./renderer";
import type { Shape } from "./shapes/shape";
import type { Diagram } from "./diagram";
import type { Coord, Input } from "./utils";
import type { CanvasState } from "./canvasStates/canvasState";
import type { UtilityPoint } from "./utilityPoints/utilityPoint";
import { NothingSelectedState } from "./canvasStates/nothingSelectedState";
import { Connection } from "./connection";
import { getElementPosition, getMousePosition } from "./utils";

//type CanvasState = "nothingSelected" | "shapeHovered" | "draggingShape" | "shapeSelected" | "connectionPointHovered" | "movingLine" | "lineSelected" | "lineHovered" | "lineMovePointHovered" | "resizeEdgeHovered" | "resizedPointHovered" | "resizingShape" | "rotatePointHovered" | "rotatingShape";

export class CanvasController {
    private state: CanvasState;

    _canvas: HTMLCanvasElement;
    _canvasPos: Coord;
    _ctx: CanvasRenderingContext2D;
    _diagram: Diagram;
    _renderer: Renderer;
    public selectedShape: Shape | null = null;
    public activeUP: UtilityPoint | null = null;
    public selectedConnection: Connection | null = null;
    public draggingMouse: boolean = false;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, diagram: Diagram, renderer: Renderer) {
        this._canvas = canvas;
        this._ctx = ctx;
        this._diagram = diagram;
        this._renderer = renderer;
        this._canvasPos = getElementPosition(this._canvas);
        this.state = new NothingSelectedState(this);

        this._canvas.addEventListener("mousedown", this.handleMouseDown);
        this._canvas.addEventListener("mousemove", this.handleMouseMove);
        this._canvas.addEventListener("mouseup", this.handleMouseUp);
        document.addEventListener("keydown", this.handleKeyDown);
    }
    
    handleMouseDown = (e: MouseEvent): void => {
        const input = {mousePos: getMousePosition(e, this._canvasPos), mouseDown: true};

        this.state.handleInput(input);
    }

    handleMouseMove = (e: MouseEvent): void => {
        const input = {mousePos: getMousePosition(e, this._canvasPos), mouseMove: true};

        this.state.handleInput(input);
    }

    handleMouseUp = (e: MouseEvent): void => {
        const input = {mousePos: getMousePosition(e, this._canvasPos), mouseUp: true};

        this.state.handleInput(input);
    }

    handleKeyDown = (e: KeyboardEvent): void => {
        const input = {key: e.key, keydown: true};
        
        this.state.handleInput(input);
    }

    render(): void {
        this._renderer.render(this._diagram, this.selectedShape, this.draggingMouse, this.activeUP, this.selectedConnection);
    }

    setState(state: CanvasState, input?: Input): void {
        this.state.exit(input);
        this.state = state;
        state.enter(input);
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

    detectConnection(mousePos: Coord): Connection | null {
        for (const connection of this._diagram.getConnections()) {
            if (connection.detect(mousePos.x, mousePos.y)) {
                // return because earliest found is at front of array, highest layer
                return connection;
            }
        }

        return null;
    }
}