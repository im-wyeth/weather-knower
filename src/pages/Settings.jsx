import "../assets/scss/pages/settings.scss";
import SettingsLanguageProperty from "../components/SettingsLanguageProperty";

export default function Settings() {
  return (
    <main className="settings">
      <section className="settings__properties">
        <SettingsLanguageProperty />
      </section>
    </main>
  );
}
