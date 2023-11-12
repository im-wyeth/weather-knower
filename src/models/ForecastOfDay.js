import ForecastOfHour from "./ForecastOfHour";

export default class ForecastOfDay {
  date = "2023-11-11";
  dateEpoch = 0;

  sunriseTime = "00:00 AM";
  sunsetTime = "07:00 PM";

  conditionText = "Cloudly";
  conditionCode = 0;

  minTemperature = 10;
  maxTemperature = 20;

  forecastOfHours = [];

  constructor(
    date,
    dateEpoch,
    sunriseTime,
    sunsetTime,
    conditionText,
    conditionCode,
    minTemperature,
    maxTemperature,
    avgTemperature
  ) {
    this.date = date;
    this.dateEpoch = dateEpoch;
    this.sunriseTime = sunriseTime;
    this.sunsetTime = sunsetTime;
    this.conditionText = conditionText;
    this.conditionCode = conditionCode;
    this.minTemperature = minTemperature;
    this.maxTemperature = maxTemperature;
    this.avgTemperature = avgTemperature;
  }

  setForecastOfHours(hoursDataFromAPI) {
    for (const hour of hoursDataFromAPI) {
      this.forecastOfHours.push(
        new ForecastOfHour(
          hour.condition.text,
          hour.condition.code,
          hour.temp_c,
          hour.feelslike_c,
          hour.precip_mm,
          hour.humidity,
          hour.pressure_mb,
          hour.uv,
          hour.wind_dir,
          hour.wind_kph,
          hour.time_epoch,
          hour.is_day
        )
      );
    }
  }
}
