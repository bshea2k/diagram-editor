export const SELECTED_POINT_OFFSET = 20;

export abstract class Shape {
    _id: string;
    _x: number;
    _y: number;

    constructor(x: number, y: number) {
        this._id = self.crypto.randomUUID();
        this._x = x;
        this._y = y;
    }

    get id() { return this._id; }
    get x() { return this._x; }
    get y() { return this._y; }

    set x(x) { this._x = x; }
    set y(y) { this._y = y; }

    // renders the shape
    abstract render(ctx: CanvasRenderingContext2D): void;

    // renders the hovered version portion of the shape
    abstract renderHovered(ctx: CanvasRenderingContext2D): void;

    // renders the selected version portion of the shape
    abstract renderSelected(ctx: CanvasRenderingContext2D): void;

    // returns true if x & y are within the shapes area, false otherwise
    abstract detect(x: number, y: number): boolean;
}