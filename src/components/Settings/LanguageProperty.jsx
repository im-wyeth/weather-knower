import CustomSelection from "../App/CustomSelection";
import PropertyItem from "../Settings/PropertyItem";
import { useDispatch, useSelector } from "react-redux";
import * as settingsSlice from "../../features/settings/settinsSlice";
import uiDifferentLanguageData from "../../assets/json/uiDifferentLanguageData.json";

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

export default function LanguageProperty() {
  const dispatch = useDispatch();

  const language = useSelector((state) => state.settings.language);

  function onSelect(event, option) {
    dispatch(settingsSlice.setLanguage(option.value));
  }

  return (
    <PropertyItem
      text={
        uiDifferentLanguageData[language].components.settings_language_property
          .text
      }
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
