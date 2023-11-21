import getHourForecastModel from "./getHourForecastModel";

export default function getDayForecastModel(dataFromAPI) {
  const hours = [];

  for (const hour of dataFromAPI.hour) {
    hours.push(getHourForecastModel(hour));
  }

  return {
    date: dataFromAPI.date,
    dateEpoch: dataFromAPI.date_epoch,
    sunriseTime: dataFromAPI.astro.sunrise,
    sunsetTime: dataFromAPI.astro.sunset,
    conditionText: dataFromAPI.day.condition.text,
    conditionCode: dataFromAPI.day.condition.code,
    minTemperature: dataFromAPI.day.mintemp_c,
    maxTemperature: dataFromAPI.day.maxtemp_c,
    avgTemperature: dataFromAPI.day.avgtemp_c,
    forecastOfHours: hours,
  };
}
