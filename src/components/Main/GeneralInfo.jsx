import "../../assets/scss/components/general-info.scss";
import uiDifferentLanguageData from "../../assets/json/uiDifferentLanguageData.json";
import Sceleton from "../App/Sceleton";

export function GeneralInfo({
  mainFullscreenMode,
  language,
  name,
  conditionText,
  temperature,
  maxTemperature,
  minTemperature,
}) {
  return (
    <section
      className={
        "general-info" + (mainFullscreenMode ? " general-info_fullscreen" : "")
      }
    >
      <div className="general-info__location-name">{name}</div>
      <div className="general-info__fullscreen-wrapper">
        <div className="general-info__temperature">{temperature + "°"}</div>
        <div className="general-info__condition">{conditionText}</div>
      </div>
      <div className="general-info__temperature-limits">
        {uiDifferentLanguageData[language].pages.main.max_temperature +
          ":" +
          maxTemperature +
          "° " +
          uiDifferentLanguageData[language].pages.main.min_temperature +
          ":" +
          minTemperature +
          "°"}
      </div>
    </section>
  );
}

export function GeneralInfoSceleton({ mainFullscreenMode }) {
  return (
    <section
      className={
        "general-info general-info_sceleton" +
        (mainFullscreenMode ? " general-info_fullscreen" : "")
      }
    >
      <div className="general-info__location-name">
        <Sceleton width={"129px"} height={"41px"} borderRadius={"8px"} />
      </div>
      <div className="general-info__fullscreen-wrapper">
        <div className="general-info__temperature">
          <Sceleton width={"170px"} height={"70px"} borderRadius={"8px"} />
        </div>
        <div className="general-info__condition">
          <Sceleton width={"115px"} height={"48px"} borderRadius={"8px"} />
        </div>
      </div>
    </section>
  );
}
