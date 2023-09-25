import "../assets/scss/components/sunrise.scss";

export default function MainWeatherDetailsSunrise(props) {
  return (
    <div className="sunrise">
      <h2 className="sunrise__time">{props.sunrise}</h2>
      <span className="sunrise__sunset-time">Sunset {props.sunset}</span>
    </div>
  );
}
