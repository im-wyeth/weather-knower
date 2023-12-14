import { useEffect, useRef, useState } from "react";

export default function Line({
  className,
  bottomLineSelectionRef,
  targetElement,
}) {
  const thisRef = useRef(null);

  const [width, setWidth] = useState(0);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    window.addEventListener("resize", moveThisLineToSelectedElem);

    return () => {
      window.removeEventListener("resize", moveThisLineToSelectedElem);
    };
  });

  useEffect(() => {
    if (!(targetElement instanceof HTMLDivElement)) {
      return;
    }

    moveThisLineToSelectedElem();
  }, [targetElement]);

  function moveThisLineToSelectedElem() {
    const rectOfTargetElement = targetElement.getBoundingClientRect();
    const rectOfContainer =
      bottomLineSelectionRef.current.getBoundingClientRect();

    const x = rectOfTargetElement.x - rectOfContainer.x;
    const y =
      rectOfTargetElement.y - rectOfContainer.y + rectOfTargetElement.height;

    setWidth(rectOfTargetElement.width);
    setPosition({
      x,
      y,
    });
  }

  return (
    <div
      onClick={moveThisLineToSelectedElem}
      ref={thisRef}
      style={{
        width: width + "px",
        left: position.x + "px",
        top: position.y + "px",
      }}
      className={
        "horizontal-selection__line" + (className ? ` ${className}` : "")
      }
    ></div>
  );
}
