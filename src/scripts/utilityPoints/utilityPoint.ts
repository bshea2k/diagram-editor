export abstract class UtilityPoint {
    constructor() {}

    abstract detect(x: number, y: number): boolean;

    abstract render(): void;

    abstract renderActive(): void;
}