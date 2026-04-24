import { Connection } from "./connection";

const DEFAULT_WIDTH = 10;
const DEFAULT_HEIGHT = 10;

export class ConnectionMovementPoint {
    _connection: Connection;
    _type: "start" | "end";

    constructor(connection: Connection, type: "start" | "end") {
        this._connection = connection;
        this._type = type;
    }

    detect(x: number, y: number): boolean {
        let currentPos = this.getPosition();

        if (x > currentPos.x && x < currentPos.x + DEFAULT_WIDTH 
            && y > currentPos.y && y < currentPos.y + DEFAULT_HEIGHT) {
                return true;
        }
        
        return false;
    }

    render(ctx: CanvasRenderingContext2D): void {
        let currentPos = this.getPosition();

        ctx.strokeStyle = "#855CC0";
        ctx.beginPath();
        ctx.rect(currentPos.x, currentPos.y, DEFAULT_WIDTH, DEFAULT_HEIGHT);
        ctx.stroke();
    }

    renderHovered(ctx: CanvasRenderingContext2D): void {
        let currentPos = this.getPosition();

        ctx.strokeStyle = "#855CC0";
        ctx.fillStyle = "#855CC0";
        ctx.beginPath();
        ctx.rect(currentPos.x, currentPos.y, DEFAULT_WIDTH, DEFAULT_HEIGHT);
        ctx.stroke();
        ctx.fill();
    }

    getPosition(): {x: number, y: number} {
        switch(this._type) {
            case "start":
                return {x: this._connection.startPos.x - DEFAULT_WIDTH / 2, y: this._connection.startPos.y - DEFAULT_HEIGHT / 2};
            case "end":
                return {x: this._connection.endPos.x - DEFAULT_WIDTH / 2, y: this._connection.endPos.y - DEFAULT_HEIGHT / 2};
        }
    }
}