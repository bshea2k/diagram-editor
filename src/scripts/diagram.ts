import type { Shape } from "./shape"

export class Diagram {
    _shapes: Shape[] = [];

    addShape(shape: Shape): void {
        this._shapes.unshift(shape);
    }

    getShapes(): Shape[] {
        return this._shapes;
    }
}