import { Link } from "react-router-dom";

import "../assets/scss/pages/search.scss";
import SearchCityWeather from "../components/SearchCityWeather";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as citiesWeatherDataSlice from "../features/citiesWeatherData/citiesWeatherDataSlice";

const LOCATIONS = ["London", "Japan", "Paris"];

export default function Search() {
  const citiesRef = useRef(null);

  const [citiesWeatherDataFromApi, setCitiesWeatherDataFromApi] = useState([]);

  const dispatch = useDispatch();
  let citiesWeatherData = dispatch(
    citiesWeatherDataSlice.setCitiesWeatherDataList(
      JSON.parse(localStorage.getItem("citiesWeatherData"))
    )
  ).payload;

  useEffect(() => {
    const citiesRect = citiesRef.current.getBoundingClientRect();
    const height = document.documentElement.clientHeight - citiesRect.top;
    citiesRef.current.style.height = height + "px";

    // const citiesWeatherDataTemp = [];

    // const fetchCities = async () => {
    //   for (const location of LOCATIONS) {
    //     const fetchRes = await fetch(
    //       `http://api.weatherapi.com/v1/forecast.json?key=104b303882e44cb497094324231009&q=${location}&aqi=no`
    //     );
    //     const res = await fetchRes.json();

    //     citiesWeatherDataTemp.push(res);
    //   }

    //   setCitiesWeatherDataFromApi(citiesWeatherDataTemp);
    // };

    // fetchCities();
  }, []);

  // useEffect(() => {
  //   localStorage.setItem(
  //     "citiesWeatherData",
  //     JSON.stringify(citiesWeatherDataFromApi)
  //   );
  // }, [citiesWeatherDataFromApi]);

  return (
    <main className="search">
      <section className="search__top">
        <Link to="/">
          <div className="search__cancel">
            <svg
              className="search__cancel-arrow"
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="21"
              viewBox="0 0 13 21"
            >
              <path
                d="M0.80127 10.8916C0.80127 11.2734 0.947266 11.5991 1.25049 11.8911L10.0103 20.46C10.2461 20.707 10.5605 20.8306 10.9199 20.8306C11.6499 20.8306 12.2227 20.269 12.2227 19.5278C12.2227 19.1685 12.0767 18.8428 11.8296 18.5957L3.93457 10.8916L11.8296 3.1875C12.0767 2.9292 12.2227 2.60352 12.2227 2.24414C12.2227 1.51416 11.6499 0.952637 10.9199 0.952637C10.5605 0.952637 10.2461 1.07617 10.0103 1.32324L1.25049 9.89209C0.947266 10.1841 0.8125 10.5098 0.80127 10.8916Z"
                fill="black"
              />
            </svg>
            <span className="search__cancel-text">Weather</span>
          </div>
        </Link>
        <div className="search__input">
          <svg
            className="search__input-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
          >
            <path d="M6.3833 12.8767C7.76953 12.8767 9.04785 12.4285 10.0938 11.6814L14.0283 15.616C14.2109 15.7986 14.4517 15.8899 14.709 15.8899C15.2485 15.8899 15.6304 15.4749 15.6304 14.9436C15.6304 14.6946 15.5474 14.4539 15.3647 14.2795L11.4551 10.3616C12.2769 9.28247 12.7666 7.94604 12.7666 6.49341C12.7666 2.98218 9.89453 0.110107 6.3833 0.110107C2.88037 0.110107 0 2.97388 0 6.49341C0 10.0046 2.87207 12.8767 6.3833 12.8767ZM6.3833 11.4988C3.64404 11.4988 1.37793 9.23267 1.37793 6.49341C1.37793 3.75415 3.64404 1.48804 6.3833 1.48804C9.12256 1.48804 11.3887 3.75415 11.3887 6.49341C11.3887 9.23267 9.12256 11.4988 6.3833 11.4988Z" />
          </svg>
          <input type="text" placeholder="Search for a city or airport" />
        </div>
      </section>
      <section ref={citiesRef} className="search__cities">
        {citiesWeatherData.map((cityWeatherData, idx) => {
          return (
            <SearchCityWeather
              key={idx}
              temperature={cityWeatherData.current.temp_c}
              highTemperature={
                cityWeatherData.forecast.forecastday[0].day.maxtemp_c
              }
              lowestTemperature={
                cityWeatherData.forecast.forecastday[0].day.mintemp_c
              }
              conditionCode={cityWeatherData.current.condition.code}
              isDay={cityWeatherData.is_day}
              weatherCondition={cityWeatherData.current.condition.text}
              city={cityWeatherData.location.name}
              country={cityWeatherData.location.country}
            />
          );
        })}
      </section>

      <div className="search__ellipse-1"></div>
      <div className="search__ellipse-2"></div>
    </main>
  );
}
