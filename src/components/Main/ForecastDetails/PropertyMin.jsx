import "../../../assets/scss/components/property-min.scss";
import Sceleton from "../../App/Sceleton";

export function PropertyMin(props) {
  return (
    <div className="property-min">
      <div className="property-min__top">
        <div className="property-min__icon">{props.icon}</div>
        <span className="property-min__name">{props.name}</span>
      </div>

      {props.children}
    </div>
  );
}

export function PropertyMinSceleton() {
  return (
    <div className="property-min property-min_sceleton">
      <Sceleton width={"100%"} height={"100%"} />
    </div>
  );
}
