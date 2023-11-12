import { useNavigate } from "react-router-dom";
import "../assets/scss/pages/search.scss";
import SearchCityWeather from "../components/SearchCityWeather";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as forecastSlice from "../features/forecast/forecastSlice";
import * as locationSlice from "../features/location/locationSlice";
import uiDifferentLanguageData from "../assets/json/uiDifferentLanguageData.json";

export default function Search() {
  const citiesRef = useRef(null);

  const language = useSelector((state) => state.settings.language);

  const places = useSelector((state) => state.forecast.places);

  const [citiesList, setCitiesList] = useState(places.concat());

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const citiesRect = citiesRef.current.getBoundingClientRect();
    const height = document.documentElement.clientHeight - citiesRect.top;
    citiesRef.current.style.height = height + "px";
  }, []);

  let setTimeoutId = undefined;

  function onInputChange(event) {
    if (setTimeoutId) {
      clearTimeout(setTimeoutId);
    }

    if (event.target.value.length >= 2) {
      setTimeoutId = setTimeout(async () => {
        const fetchResult = await fetch(
          `http://api.weatherapi.com/v1/forecast.json?key=104b303882e44cb497094324231009&q=${event.target.value}&aqi=no`
        );

        if (fetchResult.status === 200) {
          const json = await fetchResult.json();

          setCitiesList([json]);

          const indexOfExistCity = places.findIndex(
            (cityWeatherData) =>
              cityWeatherData.location.name === json.location.name &&
              cityWeatherData.location.country === json.location.country
          );

          if (indexOfExistCity >= 0) {
            dispatch(
              forecastSlice.setPlaces([
                ...places.filter((a, i) => indexOfExistCity !== i),
                json,
              ])
            );
          } else {
            dispatch(forecastSlice.setPlaces([...places, json]));
          }
        }
      }, 2000);
    }
  }

  function onClick(event, name) {
    dispatch(locationSlice.setName(name));

    navigate("/");
  }

  return (
    <main className="search">
      <section className="search__top">
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
          <input
            onChange={onInputChange}
            type="text"
            placeholder={
              uiDifferentLanguageData[language].pages.search.search_input_text
            }
          />
        </div>
      </section>
      <section ref={citiesRef} className="search__cities">
        {citiesList.map((cityWeatherData, idx) => {
          return (
            <SearchCityWeather
              onClick={onClick}
              key={idx}
              temperature={Math.floor(cityWeatherData.current.temp_c)}
              highTemperature={Math.floor(
                cityWeatherData.forecast.forecastday[0].day.maxtemp_c
              )}
              lowestTemperature={Math.floor(
                cityWeatherData.forecast.forecastday[0].day.mintemp_c
              )}
              conditionCode={cityWeatherData.current.condition.code}
              isDay={cityWeatherData.is_day}
              weatherCondition={cityWeatherData.current.condition.text}
              city={cityWeatherData.location.name}
              country={cityWeatherData.location.country}
            />
          );
        })}
      </section>
    </main>
  );
}
