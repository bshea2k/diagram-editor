export abstract class UtilityPoint {
    constructor(public type: string) {}

    abstract detect(x: number, y: number): boolean;

    abstract render(ctx: CanvasRenderingContext2D): void;

    abstract renderActive(ctx: CanvasRenderingContext2D): void;
}