import AppCustomSelection from "../components/AppCustomSelection";
import SettingsPropertyItem from "../components/SettingsPropertyItem";
import { useDispatch, useSelector } from "react-redux";
import * as appSlice from "../features/app/appSlice";
import uiDifferentLanguageData from "../assets/json/uiDifferentLanguageData.json";

const PROPERTY_DATA = {
  ru: {
    text: "язык",
    selection: {
      options: [
        {
          value: "ru",
          text: uiDifferentLanguageData.ru.components.settings_language_property
            .options[0].text,
        },
        {
          value: "en",
          text: uiDifferentLanguageData.ru.components.settings_language_property
            .options[1].text,
        },
      ],
    },
  },
  en: {
    text: "language",
    selection: {
      options: [
        {
          value: "ru",
          text: uiDifferentLanguageData.en.components.settings_language_property
            .options[0].text,
        },
        {
          value: "en",
          text: uiDifferentLanguageData.en.components.settings_language_property
            .options[1].text,
        },
      ],
    },
  },
};

export default function SettingsLanguageProperty() {
  const dispatch = useDispatch();

  const language = useSelector((state) => state.app.settings.language);

  function onSelect(event, option) {
    dispatch(appSlice.setLanguage(option.value));
  }

  return (
    <SettingsPropertyItem
      text={
        uiDifferentLanguageData[language].components.settings_language_property
          .text
      }
    >
      <AppCustomSelection
        onSelect={onSelect}
        selectedOptionIndex={
          PROPERTY_DATA.ru.selection.options.findIndex(
            (option) => option.value === language
          ) || 0
        }
        options={PROPERTY_DATA.ru.selection.options}
      />
    </SettingsPropertyItem>
  );
}
