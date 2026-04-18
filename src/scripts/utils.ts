export function getElementPosition(element: HTMLElement) {
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

export function getMousePosition(e: MouseEvent, canvasPos: {x: number, y: number}) {
    let mouseX = e.clientX - canvasPos.x;
    let mouseY = e.clientY - canvasPos.y;

    return {
        x: mouseX,
        y: mouseY
    }
}