import ForecastOfDay from "./ForecastOfDay";

export default class Place {
  country = "Country";
  name = "Name";

  lat = 0;
  lon = 0;

  forecastOfDays = [];

  constructor(country, name, lat = 0, lon = 0) {
    this.country = country;
    this.name = name;

    if (lat && lon) {
      this.lat = lat;
      this.lon = lon;
    }
  }

  setForecastOfDays(dataFromAPI) {
    for (const day of dataFromAPI) {
      const forecastOfDay = new ForecastOfDay(
        day.date,
        day.date_epoch,
        day.astro.sunrise,
        day.astro.sunset,
        day.day.condition.text,
        day.day.condition.code,
        day.day.mintemp_c,
        day.day.maxtemp_c,
        day.day.avgtemp_c
      );

      forecastOfDay.setForecastOfHours(day.hour);

      this.forecastOfDays.push(forecastOfDay);
    }
  }
}
