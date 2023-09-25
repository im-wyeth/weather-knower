import "../assets/scss/components/uv-index.scss";

import getUVLevelWord from "../utils/getUVLevelWord";

export default function MainWeatherDetailsUVIndex(props) {
  return (
    <div className="uv-index">
      <span className="uv-index__quantity">
        {props.uvIndex} {getUVLevelWord(props.uvIndex, "en")}
      </span>
      <div className="uv-index__bar">
        <div className="uv-index__bar-point"></div>
      </div>
    </div>
  );
}
