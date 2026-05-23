import type { Coord } from "../utils";

export abstract class UtilityPoint {
    constructor(public type: string) {}

    abstract detect(pos: Coord, xOffset: number, yOffset: number): boolean;

    abstract render(ctx: CanvasRenderingContext2D, xOffset: number, yOffset: number): void;

    abstract renderActive(ctx: CanvasRenderingContext2D, xOffset: number, yOffset: number): void;
}