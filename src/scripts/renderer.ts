import type { Diagram } from "./diagram";
import type { Shape } from "./shape";
import type { Connection } from "./connection";
import type { UtilityPoint } from "./utilityPoints/utilityPoint";

export class Renderer {
    _ctx: CanvasRenderingContext2D;
    // have diagram parameter instead of passing into render()? check performance of passing in reference parameters

    constructor(ctx: CanvasRenderingContext2D) {
        this._ctx = ctx;
    }

    render(
        diagram: Diagram, 
        selectedShape: Shape | null, 
        draggingMouse: boolean,
        selectedUtilityPoint: UtilityPoint | null,
        selectedConnection: Connection | null,
    ): void {
        this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);

        for (let i = diagram.getConnections().length -1; i >= 0; i--) {
            diagram.getConnections()[i]!.render(this._ctx); // CHECK NONNULL ASSERTION
        }

        // iterate in reverse due to top layer shapes being at index 0, so render them last
        for (let i = diagram.getShapes().length - 1; i >= 0; i--) {
            diagram.getShapes()[i]!.render(this._ctx); // CHECK NONNULL ASSERTION
        }

        // render connection points for the selected shape
        if (selectedShape && !draggingMouse) {
            selectedShape.connectionPoints.forEach((cp) => {
                if (cp === selectedUtilityPoint) cp.renderActive(this._ctx);
                else cp.render(this._ctx);
            });

            selectedShape.resizePoints.forEach((rp) => {
                if (rp === selectedUtilityPoint) rp.renderActive(this._ctx);
                else rp.render(this._ctx);
            })
        }

        if (selectedConnection && !draggingMouse) {
            selectedConnection.movementPoints.forEach((mp) => {
                mp.render(this._ctx);
            })
        }
    }
}