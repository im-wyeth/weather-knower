import CustomSelection from "../App/CustomSelection";
import PropertyItem from "../Settings/PropertyItem";
import { useDispatch, useSelector } from "react-redux";
import * as settingsSlice from "../../features/settings/settinsSlice";
import uiLanguageData from "../../assets/json/uiLanguageData.json";

const PROPERTY_DATA = {
  ru: {
    text: "язык",
    selection: {
      options: [
        {
          value: "ru",
          text: uiLanguageData.ru.components.settings_language_property
            .options[0].text,
        },
        {
          value: "en",
          text: uiLanguageData.ru.components.settings_language_property
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
          text: uiLanguageData.en.components.settings_language_property
            .options[0].text,
        },
        {
          value: "en",
          text: uiLanguageData.en.components.settings_language_property
            .options[1].text,
        },
      ],
    },
  },
};

export default function LanguageProperty() {
  const dispatch = useDispatch();

  const language = useSelector((state) => state.settings.language);

  function onSelect(event, option) {
    dispatch(settingsSlice.setLanguage(option.value));
  }

  return (
    <PropertyItem
      text={uiLanguageData[language].components.settings_language_property.text}
    >
      <CustomSelection
        onSelect={onSelect}
        selectedOptionIndex={
          PROPERTY_DATA.ru.selection.options.findIndex(
            (option) => option.value === language
          ) || 0
        }
        options={PROPERTY_DATA.ru.selection.options}
      />
    </PropertyItem>
  );
}
