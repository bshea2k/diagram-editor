import { UtilityPoint } from "./utilityPoint";
import type { Shape } from "../shape"

export class ResizePoint extends UtilityPoint {
    private shape: Shape;

    constructor(shape: Shape) {
        super();
        this.shape = shape;
    }

    detect(x: number, y: number): boolean {
        return true;
    }

    render(ctx: CanvasRenderingContext2D): void {

    }

    renderActive(ctx: CanvasRenderingContext2D): void {
        
    }
}