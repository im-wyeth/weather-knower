import { useEffect, useState } from "react";

import "../assets/scss/components/custom-selection.scss";

export default function AppCustomSelection(props) {
  const [dropActive, setDropActive] = useState(false);
  const [currentValueText, setCurrentValueText] = useState(
    props.values[props.currentValue].text
  );

  const cb = () => setDropActive(false);

  useEffect(() => {
    window.addEventListener("click", cb);

    return () => {
      window.removeEventListener("click", cb);
    };
  }, []);

  function customSelectionOnClick(e) {
    e.stopPropagation();

    setDropActive(!dropActive);
  }

  function valueOnClick(valueData) {
    console.log(valueData);
  }

  return (
    <div
      onClick={customSelectionOnClick}
      className={
        "custom-selection" + (dropActive ? " custom-selection_active" : "")
      }
    >
      <div className="custom-selection__current-value">{currentValueText}</div>
      <div className="custom-selection__values">
        {props.values.map((value, idx) => (
          <div
            onClick={() => valueOnClick(value)}
            key={idx}
            className="custom-selection__value"
          >
            {value.text}
          </div>
        ))}
      </div>
    </div>
  );
}
