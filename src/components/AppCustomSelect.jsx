import { useState } from "react";

import "../assets/scss/components/custom-select.scss";

export default function AppCustomSelect(props) {
  const [dropActive, setDropActive] = useState(false);
  const [currentValueText, setCurrentValueText] = useState(
    props.items[props.currentValue].text
  );

  function onClick(e) {
    console.log(1);
    setDropActive(!dropActive);
  }

  return (
    <div
      onClick={onClick}
      className={"custom-select" + (dropActive ? " custom-select_active" : "")}
    >
      <div className="custom-select__current-value">{currentValueText}</div>
      <div className="custom-select__drop">
        {props.items.map((item) => (
          <div className="custom-select__item">{item.text}</div>
        ))}
      </div>
    </div>
  );
}
