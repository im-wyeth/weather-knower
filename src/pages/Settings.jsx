import "../assets/scss/pages/settings.scss";
import AppCustomSelect from "../components/AppCustomSelect";
import SettingsPropertyItem from "../components/SettingsPropertyItem";

export default function Settings() {
  return (
    <main className="settings">
      <section className="settings__items">
        <SettingsPropertyItem text="Язык">
          <AppCustomSelect
            defaultValueIndex={0}
            currentValue={0}
            items={[
              { value: "ru", text: "Русский" },
              { value: "en", text: "English" },
            ]}
          />
        </SettingsPropertyItem>
        <SettingsPropertyItem text="Тема">
          <AppCustomSelect
            defaultValueIndex={0}
            currentValue={0}
            items={[
              { value: "dark", text: "Тёмная" },
              { value: "light", text: "Светлая" },
            ]}
          />
        </SettingsPropertyItem>
      </section>
    </main>
  );
}
