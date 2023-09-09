import "../assets/scss/components/weather-property-big.scss";

export default function MainWeatherPropertyBig(props) {
  return (
    <div className="weather-property-big">
      <div className="weather-property-big__top">
        <div className="weather-property-big__icon">{props.icon}</div>
        <span className="weather-property-big__name">{props.name}</span>
      </div>
      <div className="weather-property-big__bottom">{props.children}</div>
    </div>
  );
}
