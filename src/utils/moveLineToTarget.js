export default function moveLineToTarget(movableLineElement, targetElement) {
  const x = targetElement.offsetLeft;
  const y = targetElement.offsetTop + targetElement.clientHeight;

  movableLineElement.style.transform = `translate(${x}px, ${y}px)`;

  movableLineElement.style.width = `${targetElement.clientWidth}px`;
}
