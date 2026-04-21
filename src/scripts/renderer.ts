import type { Diagram } from "./diagram"
import type { Shape } from "./shape"

export class Renderer {
    _ctx: CanvasRenderingContext2D;
    // have diagram parameter instead of passing into render()? check performance of passing in reference parameters

    constructor(ctx: CanvasRenderingContext2D) {
        this._ctx = ctx;
    }

    render(diagram: Diagram, selectedShape: Shape | null, draggingShape: boolean): void {
        this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);

        // iterate in reverse due to top layer shapes being at index 0, so render them last
        for (let i = diagram.getShapes().length - 1; i >= 0; i--) {
            diagram.getShapes()[i]!.render(this._ctx); // CHECK NONNULL ASSERTION
        }

        for (let i = diagram.getConnections().length -1; i >= 0; i--) {
            diagram.getConnections()[i]!.render(this._ctx); // CHECK NONNULL ASSERTION
        }

        if (selectedShape && !draggingShape) {
            //selectedShape.renderSelected(this._ctx);
            selectedShape.connectionPoints.forEach((cp) => cp.render(this._ctx));
        }
    }
}