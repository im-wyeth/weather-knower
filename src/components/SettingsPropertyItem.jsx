import "../assets/scss/components/property.scss";

export default function SettingsProperty(props) {
  return (
    <div className="property">
      <div className="property__text">{props.text}</div>
      <div className="property__selection">{props.children}</div>
    </div>
  );
}
