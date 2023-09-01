import { useRef } from "react";

export default function RouteTransitionWrapper(props) {
  const thisRef = useRef(null);

  return (
    <div
      ref={thisRef}
      className={"route-transition-wrapper " + props.transitionStage}
      onAnimationEnd={() => {
        if (props.transitionStage === "fadeOut") {
          props.setTransitionStage("fadeIn");
          props.setDisplayLocation(props.location);

          thisRef.current.style.opacity = 0;
        } else {
          thisRef.current.style.opacity = 1;

          props.setAnimationState(true);
        }
      }}
    >
      {props.children}
    </div>
  );
}
