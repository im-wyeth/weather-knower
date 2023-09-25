import "../assets/scss/components/feels-like.scss";

export default function MainWeatherDetailsFeelsLike(props) {
  return (
    <div className="feels-like">
      <div className="feels-like__temperature">{props.temperature}°</div>
    </div>
  );
}
