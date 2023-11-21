import getDayForecastModel from "./getDayForecastModel";

export default function getPlaceForecastModel(dataFromAPI) {
  const days = [];

  for (const day of dataFromAPI.forecast.forecastday) {
    days.push(getDayForecastModel(day));
  }

  return {
    country: dataFromAPI.location.country,
    name: dataFromAPI.location.name,
    lat: 0,
    lon: 0,
    forecastOfDays: days,
  };
}
