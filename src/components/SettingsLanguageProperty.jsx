import AppCustomSelection from "../components/AppCustomSelection";
import SettingsPropertyItem from "../components/SettingsPropertyItem";
import { useDispatch } from "react-redux";
import * as appSlice from "../features/app/appSlice";

const PROPERTY_DATA = {
  ru: {
    text: "Язык",
    selection: {
      options: [
        { value: "ru", text: "русский" },
        { value: "en", text: "english" },
      ],
    },
  },
  en: {
    text: "Language",
    selection: {
      options: [
        { value: "ru", text: "русский" },
        { value: "en", text: "english" },
      ],
    },
  },
};

export default function SettingsLanguageProperty() {
  const dispatch = useDispatch();

  function onSelect(event, option) {
    dispatch(appSlice.setLanguage(option.value));
  }

  return (
    <SettingsPropertyItem text={PROPERTY_DATA.ru.text}>
      <AppCustomSelection
        onSelect={onSelect}
        selectedOptionIndex={0}
        options={PROPERTY_DATA.ru.selection.options}
      />
    </SettingsPropertyItem>
  );
}
