import "../assets/scss/components/humidity.scss";

export default function MainWeatherDetailsHumidity(props) {
  return (
    <div className="humidity">
      <div className="humidity__percent">{props.percent}%</div>
    </div>
  );
}
