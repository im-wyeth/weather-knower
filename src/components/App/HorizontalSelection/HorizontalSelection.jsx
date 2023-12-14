import { useEffect, useRef, useState } from "react";
import "../../../assets/scss/components/horizontal-selection.scss";
import Line from "./Line";
import Selection from "./Selection";

export default function HorizontalSelection({
  className,
  selectionClassName,
  lineClassName,
  value,
  setValue,
  selections,
}) {
  const thisRef = useRef(null);

  const [selectedElement, setSelectedElement] = useState(null);

  useEffect(() => {
    for (const child of thisRef.current.children) {
      if (child.dataset.value === value) {
        setSelectedElement(child);
      }
    }
  }, []);

  function onClick(event, value) {
    setValue(value);
    setSelectedElement(event.target);
  }

  return (
    <div
      ref={thisRef}
      className={"horizontal-selection" + (className ? ` ${className}` : "")}
    >
      {selections.map((selection, idx) => {
        return (
          <Selection
            key={idx}
            onClick={onClick}
            className={selectionClassName}
            value={selection.value}
            text={selection.text}
          />
        );
      })}

      <Line
        className={lineClassName}
        bottomLineSelectionRef={thisRef}
        targetElement={selectedElement}
      />
    </div>
  );
}
