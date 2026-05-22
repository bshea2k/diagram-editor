export function getElementPosition(element: HTMLElement): Coord {
    let elementX = 0;
    let elementY = 0;
    let current: HTMLElement | null = element;

    while (current) {
        elementX += (current.offsetLeft - current.scrollLeft + current.clientLeft);
        elementY += (current.offsetTop - current.scrollTop + current.clientTop);
        current = current.offsetParent as HTMLElement | null;
    }

    return {
        x: elementX,
        y: elementY
    };
}

export function getMousePosition(e: MouseEvent, canvasPos: Coord): Coord {
    let mouseX = e.clientX - canvasPos.x;
    let mouseY = e.clientY - canvasPos.y;

    return {
        x: mouseX,
        y: mouseY
    }
}

export type Coord = {
    x: number;
    y: number;
}

export type Input = {
    button?: number;
    mousePos?: Coord;
    mouseDown?: boolean;
    mouseMove?: boolean;
    mouseUp?: boolean;
    dblClick?: boolean;
    key?: string;
    keydown?: boolean;
    notify?: boolean;
}