import AppCustomSelection from "../components/AppCustomSelection";
import SettingsPropertyItem from "../components/SettingsPropertyItem";
import { useDispatch, useSelector } from "react-redux";
import * as appSlice from "../features/app/appSlice";
import uiDifferentLanguageData from "../assets/json/uiDifferentLanguageData.json";

const PROPERTY_DATA = {
  ru: {
    text: "тема",
    selection: {
      options: [
        {
          value: "dark",
          text: uiDifferentLanguageData.ru.components.settings_theme_property
            .options[0].text,
        },
        {
          value: "light",
          text: uiDifferentLanguageData.ru.components.settings_theme_property
            .options[1].text,
        },
      ],
    },
  },
  en: {
    text: "theme",
    selection: {
      options: [
        {
          value: "dark",
          text: uiDifferentLanguageData.ru.components.settings_theme_property
            .options[0].text,
        },
        {
          value: "light",
          text: uiDifferentLanguageData.ru.components.settings_theme_property
            .options[1].text,
        },
      ],
    },
  },
};

export default function SettingsThemeProperty() {
  const dispatch = useDispatch();

  const language = useSelector((state) => state.app.settings.language);
  const theme = useSelector((state) => state.app.settings.theme);

  function onSelect(event, option) {
    dispatch(appSlice.setTheme(option.value));
  }

  return (
    <SettingsPropertyItem
      text={
        uiDifferentLanguageData[language].components.settings_theme_property
          .text
      }
    >
      <AppCustomSelection
        onSelect={onSelect}
        selectedOptionIndex={
          PROPERTY_DATA.ru.selection.options.findIndex(
            (option) => option.value === theme
          ) || 0
        }
        options={PROPERTY_DATA.ru.selection.options}
      />
    </SettingsPropertyItem>
  );
}
