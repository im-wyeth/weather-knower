import { useEffect, useRef, useState } from "react";
import "../assets/scss/components/uv-index.scss";
import getUVLevelWord from "../utils/getUVLevelWord";
import getPercentOfOneNumberFromAnother from "../utils/getPercentOfOneNumberFromAnother";
import { useSelector } from "react-redux";

const MAX_UV_INDEX = 11;

export default function MainWeatherDetailsUVIndex(props) {
  const barPointRef = useRef(null);

  const language = useSelector((state) => state.app.settings.language);

  const [uvIndexPercent] = useState(
    getPercentOfOneNumberFromAnother(props.uvIndex, MAX_UV_INDEX)
  );

  useEffect(() => {
    barPointRef.current.style.left = uvIndexPercent + "%";
  });

  return (
    <div className="uv-index">
      <span className="uv-index__quantity">
        {props.uvIndex} {getUVLevelWord(props.uvIndex, language)}
      </span>
      <div className="uv-index__bar">
        <div ref={barPointRef} className="uv-index__bar-point"></div>
      </div>
    </div>
  );
}
