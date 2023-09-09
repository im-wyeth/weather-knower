import "../assets/scss/components/rainfall.scss";

export default function MainWeatherDetailsRainfall() {
  return (
    <div className="rainfall">
      <div className="rainfall__last-hour">1.8 mm</div>
      <span className="rainfall__last-hour-text">in last hour</span>
      <span className="rainfall__expect">1.2 mm expected in next 24h</span>
    </div>
  );
}
