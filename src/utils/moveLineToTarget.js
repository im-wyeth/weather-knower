const OFFSET_TOP = 4;

export default function moveLineToTarget(movableLineElement, targetElement) {
  movableLineElement.style.transform = `translate(${
    targetElement.offsetLeft
  }px, ${targetElement.offsetTop + targetElement.clientHeight + OFFSET_TOP}px)`;

  movableLineElement.style.width = `${targetElement.clientWidth}px`;
}
