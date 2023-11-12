import { Link } from "react-router-dom";
import "../assets/scss/components/bottom-navigation.scss";
import MainBottomNavigationCentralShape from "./MainBottomNavigationCentralShape";
import { useDispatch, useSelector } from "react-redux";
import * as locationSlice from "../features/location/locationSlice";
import * as forecastSlice from "../features/forecast/forecastSlice";
import { useEffect, useState } from "react";

const COORDINATES_LIFE_TIME_IN_MS = 7200000;

export default function MainBottomNavigation(props) {
  const dispatch = useDispatch();

  const language = useSelector((state) => state.settings.language);
  const coordinates = useSelector((state) => state.location.coordinates);
  const coordinatesUpdatedTimeStamp = useSelector(
    (state) => state.location.coordinatesUpdatedTimeStamp
  );
  const places = useSelector((state) => state.forecast.places);
  const [isGeolocationOn, setIsGeolocationOn] = useState(false);

  useEffect(() => {
    if (coordinates.latitude) {
      if (
        Date.now() - coordinatesUpdatedTimeStamp <
        COORDINATES_LIFE_TIME_IN_MS
      ) {
        setIsGeolocationOn(true);
      }
    }
  }, []);

  function onClick() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        dispatch(
          locationSlice.setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        );

        const fetchResult = await fetch(
          `http://api.weatherapi.com/v1/forecast.json?key=104b303882e44cb497094324231009&q=${
            position.coords.latitude + "," + position.coords.longitude
          }&aqi=no&lang=` + language
        );

        // Add a check that the city are already exists
        if (fetchResult.status === 200) {
          const json = await fetchResult.json();

          dispatch(locationSlice.setName(json.location.name));
          dispatch(forecastSlice.setPlaces([...places, json]));
        }
      });
    }
  }

  return (
    <nav
      ref={props.mainBottomNavigationRef}
      className={
        "bottom-navigation" +
        (props.isHidden ? " bottom-navigation_hidden" : "")
      }
    >
      <svg
        className="bottom-navigation__background-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 390 89"
      >
        <path
          d="M0 1C0 1 76.0769 16.9822 127 21C153.339 23.0782 168.554 24 195 24C221.446 24 235.661 23.0782 262 21C312.923 16.9822 390 1 390 1V89H0V1Z"
          fillOpacity="0.26"
        />
        <path
          d="M0 1L0.0513978 0.755341L-0.25 0.692023V1V89V89.25H0H390H390.25V89V1V0.692844L389.949 0.755207L390 1C389.949 0.755207 389.949 0.755266 389.948 0.755386L389.946 0.755929L389.935 0.758104L389.893 0.766774L389.727 0.801111C389.58 0.831451 389.36 0.876545 389.072 0.935541C388.495 1.05353 387.643 1.22713 386.539 1.44951C384.333 1.89427 381.124 2.53416 377.113 3.31459C369.093 4.87548 357.868 6.99851 345.053 9.24707C319.42 13.7446 287.43 18.7428 261.98 20.7508C235.644 22.8287 221.437 23.75 195 23.75C168.563 23.75 153.355 22.8286 127.02 20.7508C101.571 18.7428 69.8304 13.7446 44.4475 9.24714C31.757 6.99859 20.6577 4.87557 12.731 3.3147C8.76767 2.53427 5.59756 1.89439 3.41838 1.44963C2.32879 1.22725 1.48694 1.05366 0.917538 0.935668C0.632837 0.876674 0.416248 0.831581 0.270862 0.801242L0.10657 0.766906L0.0651988 0.758237L0.054834 0.756062L0.0522476 0.755519C0.0516779 0.755399 0.0513978 0.755341 0 1Z"
          strokeOpacity="0.5"
          strokeWidth="0.5"
        />
      </svg>

      <div className="bottom-navigation__content">
        <button
          onClick={onClick}
          className={
            "bottom-navigation__button" +
            (isGeolocationOn ? " bottom-navigation__button_active" : "")
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 44 44"
            width="44px"
            height="44px"
          >
            <path d="M17.9609 14.499C17.9609 16.3896 19.2393 17.9688 20.9902 18.4092V25.209C20.9902 28.3779 21.5596 30.1074 21.9893 30.1074C22.4297 30.1074 22.9883 28.3887 22.9883 25.209V18.4092C24.7393 17.9795 26.0283 16.3896 26.0283 14.499C26.0283 12.2754 24.2344 10.4492 21.9893 10.4492C19.7549 10.4492 17.9609 12.2754 17.9609 14.499ZM20.8398 14.7246C20.1094 14.7246 19.4648 14.0801 19.4648 13.3281C19.4648 12.5869 20.1094 11.9531 20.8398 11.9531C21.6025 11.9531 22.2256 12.5869 22.2256 13.3281C22.2256 14.0801 21.6025 14.7246 20.8398 14.7246ZM22 34.0391C28.4775 34.0391 32.1943 31.8047 32.1943 29.4414C32.1943 26.6055 27.6934 24.876 24.7393 24.8438V26.4121C26.8125 26.4443 30.0244 27.5723 30.0244 29.1836C30.0244 31.0312 26.6191 32.3418 22 32.3418C17.3594 32.3418 13.9756 31.0527 13.9756 29.1836C13.9756 27.5723 17.1768 26.4443 19.25 26.4121V24.8438C16.2959 24.876 11.7949 26.6055 11.7949 29.4414C11.7949 31.8047 15.5225 34.0391 22 34.0391Z" />
          </svg>
        </button>
        <div className="bottom-navigation__center">
          <MainBottomNavigationCentralShape />

          <div className="bottom-navigation__central-button-wrapper">
            <Link to="/search" className="bottom-navigation__central-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24px"
                height="24px"
                fill="none"
              >
                <path
                  d="M0.269226 12.1289C0.269226 13.2773 1.19891 14.207 2.34735 14.207H9.93524V21.7949C9.93524 22.9297 10.8513 23.873 11.9997 23.873C13.1481 23.873 14.0778 22.9297 14.0778 21.7949V14.207H21.6657C22.8005 14.207 23.7302 13.2773 23.7302 12.1289C23.7302 10.9941 22.8005 10.0645 21.6657 10.0645H14.0778V2.47656C14.0778 1.3418 13.1481 0.398438 11.9997 0.398438C10.8513 0.398438 9.93524 1.3418 9.93524 2.47656V10.0645H2.34735C1.19891 10.0645 0.269226 10.9941 0.269226 12.1289Z"
                  fill="#48319D"
                />
              </svg>
            </Link>
          </div>
        </div>
        <Link to="/settings" className="bottom-navigation__button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28px"
            height="28px"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.2788 2.15224C13.9085 2 13.439 2 12.5 2C11.561 2 11.0915 2 10.7212 2.15224C10.2274 2.35523 9.83509 2.74458 9.63056 3.23463C9.53719 3.45834 9.50065 3.7185 9.48635 4.09799C9.46534 4.65568 9.17716 5.17189 8.69017 5.45093C8.20318 5.72996 7.60864 5.71954 7.11149 5.45876C6.77318 5.2813 6.52789 5.18262 6.28599 5.15102C5.75609 5.08178 5.22018 5.22429 4.79616 5.5472C4.47814 5.78938 4.24339 6.1929 3.7739 6.99993C3.30441 7.80697 3.06967 8.21048 3.01735 8.60491C2.94758 9.1308 3.09118 9.66266 3.41655 10.0835C3.56506 10.2756 3.77377 10.437 4.0977 10.639C4.57391 10.936 4.88032 11.4419 4.88029 12C4.88026 12.5581 4.57386 13.0639 4.0977 13.3608C3.77372 13.5629 3.56497 13.7244 3.41645 13.9165C3.09108 14.3373 2.94749 14.8691 3.01725 15.395C3.06957 15.7894 3.30432 16.193 3.7738 17C4.24329 17.807 4.47804 18.2106 4.79606 18.4527C5.22008 18.7756 5.75599 18.9181 6.28589 18.8489C6.52778 18.8173 6.77305 18.7186 7.11133 18.5412C7.60852 18.2804 8.2031 18.27 8.69012 18.549C9.17714 18.8281 9.46533 19.3443 9.48635 19.9021C9.50065 20.2815 9.53719 20.5417 9.63056 20.7654C9.83509 21.2554 10.2274 21.6448 10.7212 21.8478C11.0915 22 11.561 22 12.5 22C13.439 22 13.9085 22 14.2788 21.8478C14.7726 21.6448 15.1649 21.2554 15.3694 20.7654C15.4628 20.5417 15.4994 20.2815 15.5137 19.902C15.5347 19.3443 15.8228 18.8281 16.3098 18.549C16.7968 18.2699 17.3914 18.2804 17.8886 18.5412C18.2269 18.7186 18.4721 18.8172 18.714 18.8488C19.2439 18.9181 19.7798 18.7756 20.2038 18.4527C20.5219 18.2105 20.7566 17.807 21.2261 16.9999C21.6956 16.1929 21.9303 15.7894 21.9827 15.395C22.0524 14.8691 21.9088 14.3372 21.5835 13.9164C21.4349 13.7243 21.2262 13.5628 20.9022 13.3608C20.4261 13.0639 20.1197 12.558 20.1197 11.9999C20.1197 11.4418 20.4261 10.9361 20.9022 10.6392C21.2263 10.4371 21.435 10.2757 21.5836 10.0835C21.9089 9.66273 22.0525 9.13087 21.9828 8.60497C21.9304 8.21055 21.6957 7.80703 21.2262 7C20.7567 6.19297 20.522 5.78945 20.2039 5.54727C19.7799 5.22436 19.244 5.08185 18.7141 5.15109C18.4722 5.18269 18.2269 5.28136 17.8887 5.4588C17.3915 5.71959 16.7969 5.73002 16.3099 5.45096C15.8229 5.17191 15.5347 4.65566 15.5136 4.09794C15.4993 3.71848 15.4628 3.45833 15.3694 3.23463C15.1649 2.74458 14.7726 2.35523 14.2788 2.15224ZM12.5 15C14.1695 15 15.5228 13.6569 15.5228 12C15.5228 10.3431 14.1695 9 12.5 9C10.8305 9 9.47716 10.3431 9.47716 12C9.47716 13.6569 10.8305 15 12.5 15Z"
            />
          </svg>
        </Link>
      </div>
    </nav>
  );
}
