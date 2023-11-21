import "../assets/scss/pages/settings.scss";
import LanguageProperty from "../components/Settings/LanguageProperty";

export default function Settings() {
  return (
    <main className="settings">
      <section className="settings__properties">
        <LanguageProperty />
      </section>
    </main>
  );
}
