import "../assets/scss/components/rainfall.scss";

export default function MainWeatherDetailsRainfall(props) {
  return (
    <div className="rainfall">
      <div className="rainfall__last-hour">
        {props.precipitationInLastHour} mm
      </div>
      <span className="rainfall__last-hour-text">in last hour</span>
      <span className="rainfall__expect">
        {props.precipitationInNext24Hour} mm expected in next 24h
      </span>
    </div>
  );
}
