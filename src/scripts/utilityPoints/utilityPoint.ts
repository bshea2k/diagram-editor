import type { Coord } from "../utils";

export abstract class UtilityPoint {
    constructor(public type: string) {}

    abstract detect(pos: Coord): boolean;

    abstract render(ctx: CanvasRenderingContext2D): void;

    abstract renderActive(ctx: CanvasRenderingContext2D): void;
}