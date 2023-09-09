import "../assets/scss/components/weather-property-min.scss";

export default function MainWeatherDetailsPropertyMin(props) {
  return (
    <div className="weather-property-min">
      <div className="weather-property-min__top">
        <div className="weather-property-min__icon">{props.icon}</div>
        <span className="weather-property-min__name">{props.name}</span>
      </div>
      <div className="weather-property-min__bottom">{props.children}</div>
    </div>
  );
}
