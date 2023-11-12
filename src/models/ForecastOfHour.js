export default class ForecastOfHour {
  conditionText = "Cloudly";
  conditionCode = 0;

  temperature = 10;
  feelslikeTemperature = 12;

  precipitationInMM = 0;
  humidity = 10;
  pressureMB = 0;
  uvIndex = 0;

  windDirection = "ENE";
  windSpeedInKPH = 10;

  timeEpoch = 0;

  isDay = false;

  constructor(
    conditionText,
    conditionCode,
    temperature,
    feelslikeTemperature,
    precipitationInMM,
    humidity,
    pressureMB,
    uvIndex,
    windDirection,
    windSpeedInKPH,
    timeEpoch,
    isDay
  ) {
    this.conditionText = conditionText;
    this.conditionCode = conditionCode;
    this.temperature = temperature;
    this.feelslikeTemperature = feelslikeTemperature;
    this.precipitationInMM = precipitationInMM;
    this.humidity = humidity;
    this.pressureMB = pressureMB;
    this.uvIndex = uvIndex;
    this.windDirection = windDirection;
    this.windSpeedInKPH = windSpeedInKPH;
    this.timeEpoch = timeEpoch;
    this.isDay = isDay;
  }
}
