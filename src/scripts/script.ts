import { Diagram } from "./diagram";
import { Renderer } from "./renderer";
import { CanvasController } from "./canvasController";
import { ShapeCreationController } from "./shapeCreationController";
import { ToolbarController } from "./toolbarController";

const canvas: HTMLCanvasElement = document.querySelector("#workspace")!; // IMPROVE NONNULL ASSERTION
const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

const diagram = new Diagram();
const renderer = new Renderer(ctx);
const canvasController = new CanvasController(canvas, ctx, diagram, renderer);
const shapeCreationController = new ShapeCreationController(canvas, canvasController, diagram);
const toolbarController = new ToolbarController(canvasController);