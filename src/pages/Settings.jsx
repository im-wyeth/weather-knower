import "../assets/scss/pages/settings.scss";
import SettingsLanguageProperty from "../components/SettingsLanguageProperty";
import SettingsThemeProperty from "../components/SettingsThemeProperty";

export default function Settings() {
  return (
    <main className="settings">
      <section className="settings__properties">
        <SettingsLanguageProperty />
        <SettingsThemeProperty />
      </section>
    </main>
  );
}
