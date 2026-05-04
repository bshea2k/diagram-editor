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

        // render utility points for the selected shape
        if (selectedShape && !draggingMouse) {
            // iterate in reverse due to top layer UPs being at index 0, so render them last
            for (let i = selectedShape.utilityPoints.length -1; i>=0; i--) {
                const up = selectedShape.utilityPoints[i];

                if (up === selectedUtilityPoint) up.renderActive(this._ctx);
                else up!.render(this._ctx);
            }
        }

        // when dragging a shape, only render the resize edges
        if (selectedShape && draggingMouse) {
            selectedShape.utilityPoints.forEach((up) => {
                if (up.type === "ResizeEdge") up.render(this._ctx);
            })
        }

        if (selectedConnection && !draggingMouse) {
            selectedConnection.movementPoints.forEach((mp) => {
                mp.render(this._ctx);
            })
        }
    }
}