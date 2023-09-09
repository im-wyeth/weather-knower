import "../assets/scss/components/uv-index.scss";

export default function MainWeatherDetailsUVIndex() {
  return (
    <div className="uv-index">
      <span className="uv-index__quantity">9 Moderate</span>
      <div className="uv-index__bar">
        <div className="uv-index__bar-point"></div>
      </div>
    </div>
  );
}
