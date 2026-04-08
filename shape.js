export class Shape {
    constructor(x, y) {
        this._id = self.crypto.randomUUID();
        this._x = x;
        this._y = y;
    }

    get id() { return this._id; }
    get x() { return this._x; }
    get y() { return this._y; }

    set x(x) { this._x = x; }
    set y(y) { this._y = y; }

    render() { }
    renderHovered() { }
    renderSelected() { }
}