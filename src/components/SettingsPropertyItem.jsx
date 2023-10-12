import "../assets/scss/components/property-item.scss";

export default function SettingsPropertyItem(props) {
  return (
    <div className="property-item">
      <div className="property-item__text">{props.text}</div>
      <div className="property-item__select">{props.children}</div>
    </div>
  );
}
