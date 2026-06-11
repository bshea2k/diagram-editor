import { ConnectionPoint } from "../utilityPoints/ConnectionPoint";
import { ResizePoint } from "../utilityPoints/resizePoint";
import { ResizeEdge } from "../utilityPoints/resizeEdge";
import type { UtilityPoint } from "../utilityPoints/utilityPoint";
import type { Coord } from "../utils";

export const SELECTED_POINT_OFFSET = 20;

export abstract class Shape {
    public id: string;
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public text: string;
    public bolded: boolean = false;
    public utilityPoints: UtilityPoint[];

    constructor(x: number, y: number, width: number, height: number, text: string) {
        this.id = self.crypto.randomUUID();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.utilityPoints = [
            new ResizePoint(this, "topleft"),
            new ResizePoint(this, "topright"),
            new ResizePoint(this, "bottomright"),
            new ResizePoint(this, "bottomleft"),
            new ConnectionPoint(this, "top"), 
            new ConnectionPoint(this, "right"), 
            new ConnectionPoint(this, "bottom"), 
            new ConnectionPoint(this, "left"),
            new ResizeEdge(this, "top"),
            new ResizeEdge(this, "right"),
            new ResizeEdge(this, "bottom"),
            new ResizeEdge(this, "left"),
        ];
    }

    // renders the shape
    abstract render(ctx: CanvasRenderingContext2D, xOffset: number, yOffset: number): void;

    // returns true if x & y are within the shapes area, false otherwise
    abstract detect(x: number, y: number): boolean;

    // returns the coordinate of the closest point of the edge of the shape
    abstract getNearestEdgePoint(x: number, y: number): Coord;
}