import type { Shape } from "./shape";
import type { Connection } from "./connection";

export class Diagram {
    private shapes: Shape[] = [];
    private connections: Connection[] = [];

    addShape(shape: Shape): void {
        this.shapes.unshift(shape);
    }

    removeShape(shape: Shape): void {
        this.shapes = this.shapes.filter((s) => {
            return s !== shape;
        })
    }

    getShapes(): Shape[] {
        return this.shapes;
    }

    addConnection(connection: Connection): void {
        this.connections.unshift(connection);
    }

    getConnections(): Connection[] {
        return this.connections;
    }
}