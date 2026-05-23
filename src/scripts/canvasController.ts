import type { Renderer } from "./renderer";
import type { Shape } from "./shapes/shape";
import type { Diagram } from "./diagram";
import type { Coord, Input } from "./utils";
import type { CanvasState } from "./canvasStates/canvasState";
import type { UtilityPoint } from "./utilityPoints/utilityPoint";
import { NothingSelectedState } from "./canvasStates/nothingSelectedState";
import { TextIdleState } from "./canvasStates/textIdleState";
import { Connection } from "./connection";
import { getElementPosition, getMousePosition } from "./utils";

export class CanvasController {
    private state: CanvasState;
    private textState: CanvasState;
    private observers: CanvasState[] = [];

    _canvas: HTMLCanvasElement;
    _canvasPos: Coord;
    _ctx: CanvasRenderingContext2D;
    _diagram: Diagram;
    _renderer: Renderer;
    public selectedShape: Shape | null = null;
    public activeUP: UtilityPoint | null = null;
    public selectedConnection: Connection | null = null;
    public draggingMouse: boolean = false;
    public canvasXOffset: number = 0;
    public canvasYOffset: number = 0;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, diagram: Diagram, renderer: Renderer) {
        this._canvas = canvas;
        this._ctx = ctx;
        this._diagram = diagram;
        this._renderer = renderer;
        this._canvasPos = getElementPosition(this._canvas);

        this.state = new NothingSelectedState(this);
        this.textState = new TextIdleState(this);

        this._canvas.addEventListener("mousedown", this.handleMouseDown);
        this._canvas.addEventListener("mousemove", this.handleMouseMove);
        this._canvas.addEventListener("mouseup", this.handleMouseUp);
        document.addEventListener("keydown", this.handleKeyDown);
        window.addEventListener("resize", this.handleResize);

        this._canvas.oncontextmenu = function(e) { e.preventDefault(); e.stopPropagation(); };
    }
    
    handleMouseDown = (e: MouseEvent): void => {
        const input = {button: e.button, mousePos: getMousePosition(e, this._canvasPos), mouseDown: true};

        //this.textState.handleInput(input);
        this.state.handleInput(input);
    }

    handleMouseMove = (e: MouseEvent): void => {
        const input = {button: e.button, mousePos: getMousePosition(e, this._canvasPos), mouseMove: true};

        //this.textState.handleInput(input);
        this.state.handleInput(input);
    }

    handleMouseUp = (e: MouseEvent): void => {
        const input = {button: e.button, mousePos: getMousePosition(e, this._canvasPos), mouseUp: true};

        //this.textState.handleInput(input);
        this.state.handleInput(input);
    }

    handleKeyDown = (e: KeyboardEvent): void => {
        const input = {key: e.key, keydown: true};
        
        this.textState.handleInput(input);
        this.state.handleInput(input);
    }

    handleResize = (e: Event): void => {
        const toolbar = document.querySelector(".toolbar");
        const toolBarRect = toolbar!.getBoundingClientRect();
        const creationMenu = document.querySelector(".shape-creation-menu");
        const creationMenuRect = creationMenu!.getBoundingClientRect();

        this._canvas.width = window.innerWidth - creationMenuRect.width;
        this._canvas.height = window.innerHeight - toolBarRect.height;
    }

    render(): void {
        this._renderer.render(this._diagram, this.selectedShape, this.draggingMouse, this.activeUP, this.selectedConnection, this.canvasXOffset, this.canvasYOffset);
    }

    setState(state: CanvasState, input?: Input): void {
        this.state.exit(input);
        this.state = state;
        state.enter(input);
    }

    setTextState(textState: CanvasState, input?: Input): void {
        this.textState.exit(input);
        this.textState = textState;
        textState.enter(input);
    }

    detectShape(mousePos: Coord): Shape | null {
        for (const shape of this._diagram.getShapes()) {
            if (shape.detect(mousePos.x - this.canvasXOffset, mousePos.y - this.canvasYOffset)) {
                // return because earliest found is at front of array, highest layer
                return shape;
            }
        }

        return null;
    }

    detectConnection(mousePos: Coord): Connection | null {
        for (const connection of this._diagram.getConnections()) {
            if (connection.detect(mousePos.x - this.canvasXOffset, mousePos.y - this.canvasYOffset)) {
                // return because earliest found is at front of array, highest layer
                return connection;
            }
        }

        return null;
    }

    subscribe(observer: CanvasState): void {
        this.observers.push(observer);
    }

    unsubscribe(observer: CanvasState): void {
        this.observers = this.observers.filter((o) => o !== observer);
    }

    notify(): void {
        this.observers.forEach((observer) => observer.handleInput({notify: true}));
    }
}