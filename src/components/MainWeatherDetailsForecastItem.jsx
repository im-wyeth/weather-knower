import "../assets/scss/components/forecast-item.scss";

export default function MainWeatherDetailsForecastItem() {
  return (
    <div className="forecast-item">
      <div className="forecast-item__top">
        <div className="forecast-item__time">12 AM</div>
        <img
          className="forecast-item__weather-image"
          src={require("../assets/images/weather/rain.png")}
          alt="weather"
        />
      </div>
      <div className="forecast-item__air-humidity">30%</div>

      <div className="forecast-item__temperature">19°</div>
    </div>
  );
}
