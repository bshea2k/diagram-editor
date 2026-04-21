import type { Shape } from "./shape";
import type { Connection } from "./connection";

export class Diagram {
    _shapes: Shape[] = [];
    _connections: Connection[] = [];

    addShape(shape: Shape): void {
        this._shapes.unshift(shape);
    }

    getShapes(): Shape[] {
        return this._shapes;
    }

    addConncetion(connection: Connection): void {
        this._connections.unshift(connection);
    }

    getConnections(): Connection[] {
        return this._connections;
    }
}