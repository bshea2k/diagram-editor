import { Diagram } from "./diagram";
import { Renderer } from "./renderer";
import { CanvasController } from "./canvasController";
import { ShapeCreationController } from "./shapeCreationController";

const canvas: HTMLCanvasElement = document.querySelector("#workspace")!; // IMPROVE NONNULL ASSERTION
const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

const diagram = new Diagram();
const renderer = new Renderer(ctx);
const canvasController = new CanvasController(canvas, diagram, renderer);
const shapeCreationController = new ShapeCreationController(canvas, canvasController, diagram);