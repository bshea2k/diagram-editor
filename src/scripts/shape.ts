import { ConnectionPoint } from "./utilityPoints/ConnectionPoint";
import { ResizePoint } from "./utilityPoints/resizePoint";

export const SELECTED_POINT_OFFSET = 20;

export abstract class Shape {
    _id: string;
    _x: number;
    _y: number;
    _width: number;
    _height: number;
    _connectionPoints: ConnectionPoint[];
    public resizePoints: ResizePoint[];

    constructor(x: number, y: number, width: number, height: number) {
        this._id = self.crypto.randomUUID();
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._connectionPoints = [
            new ConnectionPoint(this, "top"), 
            new ConnectionPoint(this, "right"), 
            new ConnectionPoint(this, "bottom"), 
            new ConnectionPoint(this, "left"),
        ];
        this.resizePoints = [
            new ResizePoint(this, "topleft"),
            new ResizePoint(this, "topright"),
            new ResizePoint(this, "bottomright"),
            new ResizePoint(this, "bottomleft"),
        ];
    }

    get id() { return this._id; }
    get x() { return this._x; }
    get y() { return this._y; }
    get height() { return this._height; }
    get width() { return this._width; }
    get connectionPoints() { return this._connectionPoints; }

    set x(x) { this._x = x; }
    set y(y) { this._y = y; }
    set height(height) { this._height = height; }
    set width(width) { this._width = width; }

    // renders the shape
    abstract render(ctx: CanvasRenderingContext2D): void;

    // returns true if x & y are within the shapes area, false otherwise
    abstract detect(x: number, y: number): boolean;
}