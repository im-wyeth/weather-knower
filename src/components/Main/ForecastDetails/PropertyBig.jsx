import "../../../assets/scss/components/property-big.scss";
import Sceleton from "../../App/Sceleton";

export function PropertyBig(props) {
  return (
    <div className="property-big">
      <div className="property-big__top">
        <div className="property-big__icon">{props.icon}</div>
        <span className="property-big__name">{props.name}</span>
      </div>
      <div className="property-big__bottom">{props.children}</div>
    </div>
  );
}

export function PropertyBigSceleton() {
  return (
    <div className="property-big property-big_sceleton">
      <Sceleton width={"100%"} height={"100%"} />
    </div>
  );
}
