import { Link } from "react-router-dom";

import "../assets/scss/components/bottom-navigation.scss";
import MainBottomNavigationCentralShape from "./MainBottomNavigationCentralShape";
import { useDispatch, useSelector } from "react-redux";
import * as locationSlice from "../features/location/locationSlice";
import * as citiesWeatherDataSlice from "../features/citiesWeatherData/citiesWeatherDataSlice.js";

export default function MainBottomNavigation(props) {
  const dispatch = useDispatch();

  const coordinates = useSelector((state) => state.location.coordinates);
  const citiesWeatherDataList = useSelector(
    (state) => state.citiesWeatherData.list
  );

  function onClick(event) {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        dispatch(
          locationSlice.setLocationData({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        );

        const fetchResult = await fetch(
          `http://api.weatherapi.com/v1/forecast.json?key=104b303882e44cb497094324231009&q=${
            position.coords.latitude + "," + position.coords.longitude
          }&aqi=no`
        );

        if (fetchResult.status === 200) {
          const json = await fetchResult.json();

          dispatch(locationSlice.setName(json.location.name));
          dispatch(
            citiesWeatherDataSlice.setCitiesWeatherDataList([
              ...citiesWeatherDataList,
              json,
            ])
          );
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
      <button
        onClick={onClick}
        className={
          "bottom-navigation__button" +
          (coordinates.longitude != null
            ? " bottom-navigation__button_active"
            : "")
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 44 44"
          width="44"
          height="44"
          fill="none"
        >
          <path
            d="M17.9609 14.499C17.9609 16.3896 19.2393 17.9688 20.9902 18.4092V25.209C20.9902 28.3779 21.5596 30.1074 21.9893 30.1074C22.4297 30.1074 22.9883 28.3887 22.9883 25.209V18.4092C24.7393 17.9795 26.0283 16.3896 26.0283 14.499C26.0283 12.2754 24.2344 10.4492 21.9893 10.4492C19.7549 10.4492 17.9609 12.2754 17.9609 14.499ZM20.8398 14.7246C20.1094 14.7246 19.4648 14.0801 19.4648 13.3281C19.4648 12.5869 20.1094 11.9531 20.8398 11.9531C21.6025 11.9531 22.2256 12.5869 22.2256 13.3281C22.2256 14.0801 21.6025 14.7246 20.8398 14.7246ZM22 34.0391C28.4775 34.0391 32.1943 31.8047 32.1943 29.4414C32.1943 26.6055 27.6934 24.876 24.7393 24.8438V26.4121C26.8125 26.4443 30.0244 27.5723 30.0244 29.1836C30.0244 31.0312 26.6191 32.3418 22 32.3418C17.3594 32.3418 13.9756 31.0527 13.9756 29.1836C13.9756 27.5723 17.1768 26.4443 19.25 26.4121V24.8438C16.2959 24.876 11.7949 26.6055 11.7949 29.4414C11.7949 31.8047 15.5225 34.0391 22 34.0391Z"
            fill="white"
          />
        </svg>
      </button>
      <div className="bottom-navigation__center">
        <MainBottomNavigationCentralShape />

        <div className="bottom-navigation__central-button-wrapper">
          <button className="bottom-navigation__central-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
            >
              <path
                d="M0.269226 12.1289C0.269226 13.2773 1.19891 14.207 2.34735 14.207H9.93524V21.7949C9.93524 22.9297 10.8513 23.873 11.9997 23.873C13.1481 23.873 14.0778 22.9297 14.0778 21.7949V14.207H21.6657C22.8005 14.207 23.7302 13.2773 23.7302 12.1289C23.7302 10.9941 22.8005 10.0645 21.6657 10.0645H14.0778V2.47656C14.0778 1.3418 13.1481 0.398438 11.9997 0.398438C10.8513 0.398438 9.93524 1.3418 9.93524 2.47656V10.0645H2.34735C1.19891 10.0645 0.269226 10.9941 0.269226 12.1289Z"
                fill="#48319D"
              />
            </svg>
          </button>
        </div>
      </div>
      <Link to="/search" className="bottom-navigation__button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 44 44"
          width="44"
          height="44"
          fill="none"
        >
          <path
            d="M12.418 17.5283L13.3418 16.8516L14.2334 17.5283C14.5557 17.7646 14.8994 17.5176 14.7812 17.1631L14.4268 16.0674L15.3291 15.3906C15.6084 15.1758 15.501 14.7783 15.1465 14.7783H14.0186L13.6426 13.6074C13.5459 13.2959 13.127 13.2959 13.0303 13.6074L12.6543 14.7783H11.5156C11.1611 14.7783 11.043 15.1758 11.333 15.3906L12.2461 16.0674L11.8916 17.1631C11.7627 17.5176 12.1064 17.7539 12.418 17.5283ZM18.4336 16.626H31.958C32.4414 16.626 32.8174 16.25 32.8174 15.7666C32.8174 15.2725 32.4414 14.8965 31.958 14.8965H18.4336C17.9502 14.8965 17.5635 15.2725 17.5635 15.7666C17.5635 16.25 17.9502 16.626 18.4336 16.626ZM12.418 24.0059L13.3418 23.3291L14.2334 24.0059C14.5557 24.2529 14.8994 23.9951 14.7812 23.6406L14.4268 22.5449L15.3291 21.8682C15.6084 21.6533 15.501 21.2666 15.1465 21.2666H14.0186L13.6426 20.085C13.5459 19.7842 13.127 19.7842 13.0303 20.085L12.6543 21.2666H11.5156C11.1611 21.2666 11.043 21.6533 11.333 21.8682L12.2461 22.5449L11.8916 23.6406C11.7734 23.9951 12.1064 24.2314 12.418 24.0059ZM18.4336 23.125H31.958C32.4414 23.125 32.8174 22.7383 32.8174 22.2549C32.8174 21.7715 32.4414 21.3955 31.958 21.3955H18.4336C17.9502 21.3955 17.5635 21.7715 17.5635 22.2549C17.5635 22.7383 17.9502 23.125 18.4336 23.125ZM12.418 30.5156L13.3418 29.8389L14.2334 30.5156C14.5557 30.7627 14.8994 30.5049 14.7812 30.1504L14.4268 29.0547L15.3291 28.3779C15.6084 28.1631 15.501 27.7764 15.1465 27.7764H14.0186L13.6426 26.5947C13.5459 26.2939 13.127 26.2832 13.0303 26.5947L12.6543 27.7764H11.5156C11.1611 27.7764 11.043 28.1631 11.333 28.3779L12.2461 29.0547L11.8916 30.1504C11.7734 30.5049 12.1064 30.7412 12.418 30.5156ZM18.4336 29.6133H31.958C32.4414 29.6133 32.8174 29.2373 32.8174 28.7539C32.8174 28.2598 32.4414 27.8838 31.958 27.8838H18.4336C17.9502 27.8838 17.5635 28.2598 17.5635 28.7539C17.5635 29.2373 17.9502 29.6133 18.4336 29.6133Z"
            fill="white"
          />
        </svg>
      </Link>
    </nav>
  );
}
