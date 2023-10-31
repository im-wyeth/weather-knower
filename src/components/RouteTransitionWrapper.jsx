import { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import * as appSlice from "../features/app/appSlice";

export default function RouteTransitionWrapper(props) {
  const dispatch = useDispatch();

  const thisRef = useRef(null);

  const [transitionStage, setTransitionStage] = useState("fadeIn");

  function onAnimationEnd() {
    if (transitionStage === "fadeOut") {
      setTransitionStage("fadeIn");

      thisRef.current.style.opacity = 0;
    } else {
      thisRef.current.style.opacity = 1;

      dispatch(appSlice.setTransitionIsEnd(true));
    }
  }

  return (
    <div
      ref={thisRef}
      className={"route-transition-wrapper " + transitionStage}
      onAnimationEnd={onAnimationEnd}
    >
      {props.children}
    </div>
  );
}
