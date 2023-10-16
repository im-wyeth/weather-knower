import AppCustomSelection from "../components/AppCustomSelection";
import SettingsPropertyItem from "../components/SettingsPropertyItem";
import { useDispatch, useSelector } from "react-redux";
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

  const theme = useSelector((state) => state.app.settings.theme);

  function onSelect(event, option) {
    dispatch(appSlice.setTheme(option.value));
  }

  return (
    <SettingsPropertyItem text={PROPERTY_DATA.ru.text}>
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
