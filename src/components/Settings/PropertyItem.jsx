import "../../assets/scss/components/property-item.scss";

export default function PropertyItem(props) {
  return (
    <div className="property-item">
      <div className="property-item__text">{props.text}</div>
      <div className="property-item__selection">{props.children}</div>
    </div>
  );
}
