import { UtilityPoint } from "./utilityPoint";
import type { Connection } from "../connection";
import type { Coord } from "../utils";

const WIDTH = 10;
type Side = "start" | "end";

export class MovementPoint extends UtilityPoint {
    public connection: Connection;
    public side: Side;
    private x!: number;
    private y!: number;

    constructor(connection: Connection, side: Side) {
        super("MovementPoint")
        this.connection = connection;
        this.side = side;
        this.updatePosition();
    }

    detect(pos: Coord, xOffset: number, yOffset: number): boolean {
        this.updatePosition();

        if (pos.x > this.x + xOffset && pos.x < this.x + xOffset + WIDTH && pos.y > this.y + yOffset && pos.y < this.y + yOffset + WIDTH) {
            return true;
        }
        else return false;
    }

    render(ctx: CanvasRenderingContext2D, xOffset: number, yOffset: number): void {
        this.updatePosition();

        ctx.strokeStyle = "#855CC0";
        ctx.fillStyle = "#F8F8F8";
        ctx.beginPath();
        ctx.rect(this.x + xOffset, this.y + yOffset, WIDTH, WIDTH);
        ctx.stroke();
        ctx.fill();
    }

    renderActive(ctx: CanvasRenderingContext2D, xOffset: number, yOffset: number): void {
        this.updatePosition();

        ctx.strokeStyle = "#855CC0";
        ctx.fillStyle = "#855CC0";
        ctx.beginPath();
        ctx.rect(this.x + xOffset, this.y + yOffset, WIDTH, WIDTH);
        ctx.stroke();
        ctx.fill();
    }

    // could use subscriber pattern, so function is only called when parent shape moves & thus notifies
    updatePosition(): void {
        switch(this.side) {
            case "start":
                this.x = this.connection.getActualStartPos().x - WIDTH / 2;
                this.y = this.connection.getActualStartPos().y - WIDTH / 2;
                break;
            case "end":
                this.x = this.connection.getActualEndPos().x - WIDTH / 2;
                this.y = this.connection.getActualEndPos().y - WIDTH / 2;
                break;
        }
    }
}