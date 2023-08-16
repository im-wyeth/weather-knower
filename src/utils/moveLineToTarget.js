export default function moveLineToTarget(movableLineElement, targetElement) {
  movableLineElement.style.transform = `translate(${
    targetElement.offsetLeft
  }px, ${targetElement.offsetTop + targetElement.clientHeight}px)`;

  // movableLineElement.style.left = `${targetElement.offsetLeft}px`;
  // movableLineElement.style.top = `${
  //   targetElement.offsetTop + targetElement.clientHeight
  // }px`;
  movableLineElement.style.width = `${targetElement.clientWidth}px`;
}
