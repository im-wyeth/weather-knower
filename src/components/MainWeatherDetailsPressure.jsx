import "../assets/scss/components/pressure.scss";

export default function MainWeatherDetailsPressure(props) {
  return (
    <div className="pressure">
      <div className="pressure__digits">{props.pressure}</div>
    </div>
  );
}
