import type { Shape } from "./shape";
import type { Connection } from "./connection";

export class Diagram {
    _shapes: Shape[] = [];
    _connections: Connection[] = [];

    addShape(shape: Shape): void {
        this._shapes.unshift(shape);
    }

    removeShape(shape: Shape): void {
        this._shapes = this._shapes.filter((s) => {
            return s !== shape;
        })
    }

    getShapes(): Shape[] {
        return this._shapes;
    }

    addConnection(connection: Connection): void {
        this._connections.unshift(connection);
    }

    getConnections(): Connection[] {
        return this._connections;
    }
}