import uiDifferentLanguageData from "../../assets/json/uiDifferentLanguageData.json";

export default function GeneralInfo({
  weatherDetailsIsFullScreen,
  language,
  place,
}) {
  return (
    <section
      className={
        "main-general-info" +
        (weatherDetailsIsFullScreen ? " main-general-info_fullscreen" : "")
      }
    >
      <div className="main-general-info__location-name">{name}</div>
      <div className="main-general-info__fullscreen-wrapper">
        <div className="main-general-info__temperature">
          {temperature + "°"}
        </div>
        <div className="main-general-info__condition">
          {getCurrentHourFromPlace(place).conditionText}
        </div>
      </div>
      <div className="main-general-info__temperature-limits">
        {uiDifferentLanguageData[language].pages.main.max_temperature +
          ":" +
          getCurrentDayFromPlace(place).maxTemperature +
          "° " +
          uiDifferentLanguageData[language].pages.main.min_temperature +
          ":" +
          getCurrentDayFromPlace(place).minTemperature +
          "°"}
      </div>
    </section>
  );
}
