import AppCustomSelection from "../components/AppCustomSelection";
import SettingsPropertyItem from "../components/SettingsPropertyItem";
import { useDispatch } from "react-redux";
import * as appSlice from "../features/app/appSlice";

const PROPERTY_DATA = {
  ru: {
    text: "Тема",
    selection: {
      options: [
        { value: "dark", text: "Тёмная" },
        { value: "light", text: "Светлая" },
      ],
    },
  },
  en: {
    text: "Theme",
    selection: {
      options: [
        { value: "dark", text: "Dark" },
        { value: "light", text: "Light" },
      ],
    },
  },
};

export default function SettingsThemeProperty() {
  const dispatch = useDispatch();

  function onSelect(event, option) {
    dispatch(appSlice.setTheme(option.theme));
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
