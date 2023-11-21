export default function getHourForecastModel(dataFromAPI) {
  return {
    time: dataFromAPI.time,
    timeEpoch: dataFromAPI.time_epoch,
    conditionText: dataFromAPI.condition.text,
    conditionCode: dataFromAPI.condition.code,
    temperature: dataFromAPI.temp_c,
    feelslikeTemperature: dataFromAPI.feelslike_c,
    precipitationInMM: dataFromAPI.precip_mm,
    humidity: dataFromAPI.humidity,
    pressureInMB: dataFromAPI.pressure_mb,
    uvIndex: dataFromAPI.uv,
    windDirection: dataFromAPI.wind_dir,
    windSpeedInKPH: dataFromAPI.wind_kph,
    isDay: dataFromAPI.is_day,
  };
}
