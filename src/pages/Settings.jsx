import "../assets/scss/pages/settings.scss";
import AppCustomSelection from "../components/AppCustomSelection";
import SettingsPropertyItem from "../components/SettingsPropertyItem";

const LANGUAGE_SELECTING_DATA = [
  { value: "ru", text: "русский" },
  { value: "en", text: "english" },
];

const DATA_OF_PROPERTY_SETTINGS = {
  ru: [
    {
      text: "Язык",
      select: {
        values: LANGUAGE_SELECTING_DATA,
      },
    },
    {
      text: "Тема",
      select: {
        values: [
          { value: "dark", text: "тёмная" },
          { value: "light", text: "светлая" },
        ],
      },
    },
  ],
  en: [
    {
      text: "Language",
      select: {
        values: LANGUAGE_SELECTING_DATA,
      },
    },
    {
      text: "Theme",
      select: {
        values: [
          { value: "dark", text: "dark" },
          { value: "light", text: "light" },
        ],
      },
    },
  ],
};

export default function Settings() {
  return (
    <main className="settings">
      <section className="settings__properties">
        {DATA_OF_PROPERTY_SETTINGS.ru.map((setting, idx) => {
          return (
            <SettingsPropertyItem key={idx} text={setting.text}>
              <AppCustomSelection
                defaultValueIndex={0}
                currentValue={0}
                values={setting.select.values}
              />
            </SettingsPropertyItem>
          );
        })}
      </section>
    </main>
  );
}
