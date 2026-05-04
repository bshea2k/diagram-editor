export abstract class UtilityPoint {
    constructor() {}

    abstract detect(x: number, y: number): boolean;

    abstract render(ctx: CanvasRenderingContext2D): void;

    abstract renderActive(ctx: CanvasRenderingContext2D): void;
}