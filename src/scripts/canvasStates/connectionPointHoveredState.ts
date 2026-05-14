import { CanvasState } from "./canvasState";
import { ShapeSelectedState } from "./shapeSelectedState";
import { MovingConnectionState } from "./movingConnection";
import { Connection } from "../connection";
import type { CanvasController } from "../canvasController";
import type { Input } from "../utils";
import type { UtilityPoint } from "../utilityPoints/utilityPoint";
import type { ConnectionPoint } from "../utilityPoints/ConnectionPoint";

export class ConnectionPointHoveredState extends CanvasState {
    private connectionPoint: ConnectionPoint;

    constructor(canvasController: CanvasController, connectionPoint: UtilityPoint) {
        super(canvasController);
        this.connectionPoint = connectionPoint as ConnectionPoint;
    }

    enter(input?: Input): void {
        this.canvasController.activeUP = this.connectionPoint;
        this.canvasController.render();

        document.body.style.cursor = "crosshair";

        console.log("Entering ConnectionPointHovered"); // temp | debug
    }

    handleInput(input: Input): void {
        if (input.mouseMove && input.mousePos) {
            let hoveredUtilityPoint = null;
            // could be its own function in shape.ts or canvasController.ts?
            for (const up of this.connectionPoint.shape.utilityPoints) {
                if (up.detect(input.mousePos)) {
                    hoveredUtilityPoint = up;
                    break;
                }
            }

            // hover off connection point -> ShapeSelected state
            if (hoveredUtilityPoint !== this.connectionPoint) {
                document.body.style.cursor = "default";
                this.canvasController.activeUP = null;
                this.canvasController.setState(new ShapeSelectedState(this.canvasController, this.connectionPoint.shape));
            }
        }
        else if (input.mouseDown && input.mousePos) {
            this.canvasController.activeUP = null;
            this.canvasController.selectedShape = null;
            let createdConnection = new Connection(this.connectionPoint.getShapeMidpoint(), input.mousePos, this.connectionPoint.shape);
            this.canvasController._diagram.addConnection(createdConnection);
            // click to create connection -> MovingConnection state
            this.canvasController.setState(new MovingConnectionState(this.canvasController, createdConnection.utilityPoints[1]!)); // fix hard code and non-null assertion
        }
    }

    exit(input?: Input): void {
        
    }
}