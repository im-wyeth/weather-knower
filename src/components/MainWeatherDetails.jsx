import { useEffect, useRef, useState } from "react";
import "../assets/scss/components/weather-details.scss";
import moveLineToTarget from "../utils/moveLineToTarget";
import MainWeatherDetailsForecastItem from "./MainWeatherDetailsForecastItem";
import MainWeatherDetailsPropertyBig from "./MainWeatherDetailsPropertyBig";
import MainWeatherDetailsPropertyMin from "./MainWeatherDetailsPropertyMin";
import MainWeatherDetailsUVIndex from "./MainWeatherDetailsUVIndex";
import MainWeatherDetailsSunrise from "./MainWeatherDetailsSunrise";
import MainWeatherDetailsWind from "./MainWeatherDetailsWind";
import MainWeatherDetailsRainfall from "./MainWeatherDetailsRainfall";
import MainWeatherDetailsFeelsLike from "./MainWeatherDetailsFeelsLike";
import MainWeatherDetailsHumidity from "./MainWeatherDetailsHumidity";
import MainWeatherDetailsPressure from "./MainWeatherDetailsPressure";
import { useSelector } from "react-redux";
import uiDifferentLanguageData from "../assets/json/uiDifferentLanguageData.json";

const HEIGHT_AND_TOP_MARGIN = 70 + 77;
const TOP_MARGIN = 230;

export default function MainWeatherDetails(props) {
  const thisRef = useRef(null);
  const forecastFirstButtonRef = useRef(null);
  const forecastSecondButtonRef = useRef(null);
  const movableLineRef = useRef(null);
  const scrollWrapperRef = useRef(null);
  const forecastItemsRef = useRef(null);

  const language = useSelector((state) => state.app.settings.language);
  const routeTransitionIsEnd = useSelector(
    (state) => state.app.route.transitionIsEnd
  );

  const [currentForecastType, setCurrentForecastType] = useState("hourly");
  const [touchStartPosition, setTouchStartPosition] = useState({ x: 0, y: 0 });
  const [precipitationInNext24Hour, setPrecipitationInNext24Hour] = useState(0);
  const currentDate = new Date(Date.now());
  const locationName = useSelector((state) => state.location.name);
  const citiesWeatherData = useSelector(
    (state) => state.citiesWeatherData.list
  );
  const currentCityWeatherData = citiesWeatherData.find(
    (cityWeatherData) => cityWeatherData.location.name === locationName
  );
  const currentDayWeatherData = currentCityWeatherData.forecast.forecastday[0];
  const currentHourWeatherData =
    currentDayWeatherData.hour[currentDate.getHours()];

  useEffect(() => {
    window.addEventListener("resize", onWindowResize);

    moveLineToTarget(movableLineRef.current, forecastFirstButtonRef.current);

    for (let i = currentDate.getHours(); i < 23 - currentDate.getHours(); ++i) {
      setPrecipitationInNext24Hour(
        precipitationInNext24Hour + currentDayWeatherData.hour[i].precip_mm
      );
    }

    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  useEffect(() => {
    // ToDo: Firstly, set transition none, and then add the transition
    const mainBottomNavigationRect =
      props.mainBottomNavigationRef.current.getBoundingClientRect();
    thisRef.current.style.transform = `translate3d(-50%, ${
      mainBottomNavigationRect.top - TOP_MARGIN
    }px, 0)`;
  }, [routeTransitionIsEnd]);

  function onForecastButtonClick(event, forecastType) {
    moveLineToTarget(movableLineRef.current, event.target);

    setCurrentForecastType(forecastType);
  }

  function onWindowResize() {
    const mainBottomNavigationRect =
      props.mainBottomNavigationRef.current.getBoundingClientRect();

    thisRef.current.style.transform = `translate3d(-50%, ${
      mainBottomNavigationRect.top - TOP_MARGIN
    }px, 0)`;

    if (currentForecastType === "hourly") {
      moveLineToTarget(movableLineRef.current, forecastFirstButtonRef.current);
    } else {
      moveLineToTarget(movableLineRef.current, forecastSecondButtonRef.current);
    }
  }

  function onForecastItemsWheel(event) {
    forecastItemsRef.current.scrollLeft += event.deltaY;
  }

  function onTouchStart(event) {
    setTouchStartPosition({
      x: event.touches[0].pageX,
      y: event.touches[0].pageY,
    });
  }

  function onTouchMove(event) {
    if (!props.isFullScreen) {
      thisRef.current.style.transform = `translate3d(-50%, ${event.touches[0].pageY}px, 0)`;
    }

    if (touchStartPosition.y - event.touches[0].pageY >= 100) {
      if (props.isFullScreen) {
        return;
      }

      props.setFullScreen(true);

      thisRef.current.style.transform = `translate3d(-50%, ${HEIGHT_AND_TOP_MARGIN}px, 0)`;

      thisRef.current.addEventListener("transitionend", () => {
        const scrollWrapperRect =
          scrollWrapperRef.current.getBoundingClientRect();

        scrollWrapperRef.current.style.height =
          window.innerHeight - scrollWrapperRect.top + "px";
      });
    }
  }

  function onClick() {
    props.setFullScreen(false);

    thisRef.current.style.transform = `translate3d(-50%, 508px, 0)`;
  }

  return (
    <div ref={thisRef} className="weather-details">
      <div className="weather-details__top-bar">
        <button
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onClick={onClick}
          className="weather-details__main-button"
        ></button>
        <button
          ref={forecastFirstButtonRef}
          onClick={(event) => onForecastButtonClick(event, "hourly")}
          className="weather-details__forecast-button"
        >
          {
            uiDifferentLanguageData[language].components.main_weather_details
              .hourly_forecast
          }
        </button>
        <button
          ref={forecastSecondButtonRef}
          onClick={(event) => onForecastButtonClick(event, "weekly")}
          className="weather-details__forecast-button"
        >
          {
            uiDifferentLanguageData[language].components.main_weather_details
              .weekly_forecast
          }
        </button>
        <div
          ref={movableLineRef}
          className="weather-details__movable-line"
        ></div>
      </div>

      <div ref={scrollWrapperRef} className="weather-details__scroll-wrapper">
        <div
          ref={forecastItemsRef}
          onWheel={onForecastItemsWheel}
          className="weather-details__forecast-items"
        >
          {currentForecastType === "hourly"
            ? currentDayWeatherData.hour.map((hour, idx) => (
                <MainWeatherDetailsForecastItem
                  key={idx}
                  forecastType={currentForecastType}
                  timeInMilliseconds={hour.time_epoch * 1000}
                  conditionCode={hour.condition.code}
                  isDay={hour.is_day}
                  temperature={Math.floor(hour.temp_c)}
                />
              ))
            : currentCityWeatherData.forecast.forecastday.map((day, idx) => (
                <MainWeatherDetailsForecastItem
                  key={idx}
                  forecastType={currentForecastType}
                  timeInMilliseconds={day.date_epoch * 1000}
                  conditionCode={day.day.condition.code}
                  isDay={true}
                  temperature={Math.floor(day.day.avgtemp_c)}
                />
              ))}
        </div>

        <div className="weather-details__container">
          <MainWeatherDetailsPropertyBig
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V4C12.75 4.41421 12.4142 4.75 12 4.75C11.5858 4.75 11.25 4.41421 11.25 4V2C11.25 1.58579 11.5858 1.25 12 1.25ZM3.66865 3.71609C3.94815 3.41039 4.42255 3.38915 4.72825 3.66865L6.95026 5.70024C7.25596 5.97974 7.2772 6.45413 6.9977 6.75983C6.7182 7.06553 6.2438 7.08677 5.9381 6.80727L3.71609 4.77569C3.41039 4.49619 3.38915 4.02179 3.66865 3.71609ZM20.3314 3.71609C20.6109 4.02179 20.5896 4.49619 20.2839 4.77569L18.0619 6.80727C17.7562 7.08677 17.2818 7.06553 17.0023 6.75983C16.7228 6.45413 16.744 5.97974 17.0497 5.70024L19.2718 3.66865C19.5775 3.38915 20.0518 3.41039 20.3314 3.71609ZM1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H4C4.41421 11.25 4.75 11.5858 4.75 12C4.75 12.4142 4.41421 12.75 4 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12ZM19.25 12C19.25 11.5858 19.5858 11.25 20 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H20C19.5858 12.75 19.25 12.4142 19.25 12ZM17.0255 17.0252C17.3184 16.7323 17.7933 16.7323 18.0862 17.0252L20.3082 19.2475C20.6011 19.5404 20.601 20.0153 20.3081 20.3082C20.0152 20.6011 19.5403 20.601 19.2475 20.3081L17.0255 18.0858C16.7326 17.7929 16.7326 17.3181 17.0255 17.0252ZM6.97467 17.0253C7.26756 17.3182 7.26756 17.7931 6.97467 18.086L4.75244 20.3082C4.45955 20.6011 3.98468 20.6011 3.69178 20.3082C3.39889 20.0153 3.39889 19.5404 3.69178 19.2476L5.91401 17.0253C6.2069 16.7324 6.68177 16.7324 6.97467 17.0253ZM12 19.25C12.4142 19.25 12.75 19.5858 12.75 20V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V20C11.25 19.5858 11.5858 19.25 12 19.25Z"
                />
              </svg>
            }
            name={
              uiDifferentLanguageData[language].components.main_weather_details
                .uv_index
            }
          >
            <MainWeatherDetailsUVIndex uvIndex={currentHourWeatherData.uv} />
          </MainWeatherDetailsPropertyBig>

          <div className="weather-details__container-inner">
            <MainWeatherDetailsPropertyMin
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12 10V3M12 3L9 6M12 3L15 6M6 12L5 11M18 12L19 11M3 18H21M5 21H19M7 18C7 15.2386 9.23858 13 12 13C14.7614 13 17 15.2386 17 18"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              name={
                uiDifferentLanguageData[language].components
                  .main_weather_details.sunrise
              }
            >
              <MainWeatherDetailsSunrise
                sunrise={currentDayWeatherData.astro.sunrise}
                sunset={currentDayWeatherData.astro.sunset}
              />
            </MainWeatherDetailsPropertyMin>
            <MainWeatherDetailsPropertyMin
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.25 5.5C6.25 3.70508 7.70507 2.25 9.5 2.25C11.2949 2.25 12.75 3.70507 12.75 5.5C12.75 7.29493 11.2949 8.75 9.5 8.75H3C2.58579 8.75 2.25 8.41421 2.25 8C2.25 7.58579 2.58579 7.25 3 7.25H9.5C10.4665 7.25 11.25 6.4665 11.25 5.5C11.25 4.5335 10.4665 3.75 9.5 3.75C8.5335 3.75 7.75 4.5335 7.75 5.5V5.85714C7.75 6.27136 7.41421 6.60714 7 6.60714C6.58579 6.60714 6.25 6.27136 6.25 5.85714V5.5ZM14.25 7.5C14.25 5.15279 16.1528 3.25 18.5 3.25C20.8472 3.25 22.75 5.15279 22.75 7.5C22.75 9.84721 20.8472 11.75 18.5 11.75H2C1.58579 11.75 1.25 11.4142 1.25 11C1.25 10.5858 1.58579 10.25 2 10.25H18.5C20.0188 10.25 21.25 9.01878 21.25 7.5C21.25 5.98122 20.0188 4.75 18.5 4.75C16.9812 4.75 15.75 5.98122 15.75 7.5V8C15.75 8.41421 15.4142 8.75 15 8.75C14.5858 8.75 14.25 8.41421 14.25 8V7.5ZM3.25 14C3.25 13.5858 3.58579 13.25 4 13.25H18.5C20.8472 13.25 22.75 15.1528 22.75 17.5C22.75 19.8472 20.8472 21.75 18.5 21.75C16.1528 21.75 14.25 19.8472 14.25 17.5V17C14.25 16.5858 14.5858 16.25 15 16.25C15.4142 16.25 15.75 16.5858 15.75 17V17.5C15.75 19.0188 16.9812 20.25 18.5 20.25C20.0188 20.25 21.25 19.0188 21.25 17.5C21.25 15.9812 20.0188 14.75 18.5 14.75H4C3.58579 14.75 3.25 14.4142 3.25 14Z"
                  />
                </svg>
              }
              name={
                uiDifferentLanguageData[language].components
                  .main_weather_details.wind
              }
            >
              <MainWeatherDetailsWind
                windDirection={currentDayWeatherData.hour[0].wind_dir}
                windSpeed={currentDayWeatherData.hour[0].wind_kph}
              />
            </MainWeatherDetailsPropertyMin>
            <MainWeatherDetailsPropertyMin
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12,20a6,6,0,0,1-6-6c0-4,6-10.8,6-10.8S18,10,18,14A6,6,0,0,1,12,20Z" />
                </svg>
              }
              name={
                uiDifferentLanguageData[language].components
                  .main_weather_details.rainfall
              }
            >
              <MainWeatherDetailsRainfall
                precipitationInLastHour={
                  currentDayWeatherData.hour[0].precip_mm
                }
                precipitationInNext24Hour={precipitationInNext24Hour}
              />
            </MainWeatherDetailsPropertyMin>
            <MainWeatherDetailsPropertyMin
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  version="1.1"
                >
                  <path d="M21.25 6.008c0-6.904-10.5-6.904-10.5 0v13.048c-1.238 1.298-2.001 3.061-2.001 5.001 0 4.004 3.246 7.25 7.25 7.25s7.25-3.246 7.25-7.25c0-1.94-0.762-3.702-2.003-5.003l0.003 0.003zM16 28.75c-2.623 0-4.75-2.127-4.75-4.75 0-1.405 0.61-2.667 1.58-3.537l0.004-0.004c0.009-0.008 0.013-0.020 0.022-0.029 0.059-0.063 0.112-0.133 0.157-0.208l0.003-0.006c0.043-0.053 0.084-0.113 0.119-0.175l0.003-0.006c0.020-0.055 0.037-0.122 0.049-0.19l0.001-0.007c0.027-0.081 0.047-0.175 0.056-0.272l0-0.005 0.007-0.033v-13.52c-0.001-0.031-0.002-0.068-0.002-0.105 0-1.52 1.232-2.752 2.752-2.752s2.752 1.232 2.752 2.752c0 0.037-0.001 0.074-0.002 0.11l0-0.005v13.52c0 0.012 0.007 0.023 0.007 0.035 0.009 0.098 0.028 0.188 0.056 0.274l-0.002-0.009c0.013 0.079 0.031 0.149 0.055 0.217l-0.003-0.009c0.038 0.068 0.079 0.127 0.123 0.182l-0.002-0.002c0.048 0.081 0.101 0.151 0.16 0.215l-0.001-0.001c0.009 0.009 0.012 0.021 0.022 0.029 0.974 0.874 1.584 2.136 1.584 3.541 0 2.623-2.127 4.75-4.75 4.75v0zM26.5 1.75c-2.071 0-3.75 1.679-3.75 3.75s1.679 3.75 3.75 3.75c2.071 0 3.75-1.679 3.75-3.75v0c-0.002-2.070-1.68-3.748-3.75-3.75h-0zM26.5 6.75c-0.69 0-1.25-0.56-1.25-1.25s0.56-1.25 1.25-1.25c0.69 0 1.25 0.56 1.25 1.25v0c-0.001 0.69-0.56 1.249-1.25 1.25h-0z" />
                </svg>
              }
              name={
                uiDifferentLanguageData[language].components
                  .main_weather_details.feels_like
              }
            >
              <MainWeatherDetailsFeelsLike
                temperature={Math.floor(currentHourWeatherData.feelslike_c)}
              />
            </MainWeatherDetailsPropertyMin>
            <MainWeatherDetailsPropertyMin
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M15.0066 3.25608C16.8483 2.85737 19.1331 2.8773 22.2423 3.65268C22.7781 3.78629 23.1038 4.32791 22.9699 4.86241C22.836 5.39691 22.2931 5.7219 21.7573 5.58829C18.8666 4.86742 16.9015 4.88747 15.4308 5.20587C13.9555 5.52524 12.895 6.15867 11.7715 6.84363L11.6874 6.89494C10.6044 7.55565 9.40515 8.28729 7.82073 8.55069C6.17734 8.82388 4.23602 8.58235 1.62883 7.54187C1.11607 7.33724 0.866674 6.75667 1.0718 6.24513C1.27692 5.73359 1.85889 5.48479 2.37165 5.68943C4.76435 6.6443 6.32295 6.77699 7.492 6.58265C8.67888 6.38535 9.58373 5.83916 10.7286 5.14119C11.855 4.45445 13.1694 3.6538 15.0066 3.25608Z" />
                  <path d="M22.2423 7.64302C19.1331 6.86765 16.8483 6.84772 15.0066 7.24642C13.1694 7.64415 11.855 8.44479 10.7286 9.13153C9.58373 9.8295 8.67888 10.3757 7.492 10.573C6.32295 10.7673 4.76435 10.6346 2.37165 9.67977C1.85889 9.47514 1.27692 9.72393 1.0718 10.2355C0.866674 10.747 1.11607 11.3276 1.62883 11.5322C4.23602 12.5727 6.17734 12.8142 7.82073 12.541C9.40515 12.2776 10.6044 11.546 11.6874 10.8853L11.7715 10.834C12.895 10.149 13.9555 9.51558 15.4308 9.19621C16.9015 8.87781 18.8666 8.85777 21.7573 9.57863C22.2931 9.71224 22.836 9.38726 22.9699 8.85275C23.1038 8.31825 22.7781 7.77663 22.2423 7.64302Z" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.9998 10.0266C18.6526 10.0266 18.3633 10.2059 18.1614 10.4772C18.0905 10.573 17.9266 10.7972 17.7089 11.111C17.4193 11.5283 17.0317 12.1082 16.6424 12.7555C16.255 13.3996 15.8553 14.128 15.5495 14.8397C15.2567 15.5213 14.9989 16.2614 14.9999 17.0117C15.0006 17.2223 15.0258 17.4339 15.0604 17.6412C15.1182 17.9872 15.2356 18.4636 15.4804 18.9521C15.7272 19.4446 16.1131 19.9674 16.7107 20.3648C17.3146 20.7664 18.0748 21 18.9998 21C19.9248 21 20.685 20.7664 21.2888 20.3648C21.8864 19.9674 22.2724 19.4446 22.5192 18.9522C22.764 18.4636 22.8815 17.9872 22.9393 17.6413C22.974 17.4337 22.9995 17.2215 22.9998 17.0107C23.0001 16.2604 22.743 15.5214 22.4501 14.8397C22.1444 14.128 21.7447 13.3996 21.3573 12.7555C20.968 12.1082 20.5803 11.5283 20.2907 11.111C20.073 10.7972 19.909 10.573 19.8382 10.4772C19.6363 10.2059 19.3469 10.0266 18.9998 10.0266ZM20.6119 15.6257C20.3552 15.0281 20.0049 14.3848 19.6423 13.782C19.4218 13.4154 19.2007 13.0702 18.9998 12.7674C18.7989 13.0702 18.5778 13.4154 18.3573 13.782C17.9948 14.3848 17.6445 15.0281 17.3878 15.6257L17.3732 15.6595C17.1965 16.0704 16.9877 16.5562 17.0001 17.0101C17.0121 17.3691 17.1088 17.7397 17.2693 18.0599C17.3974 18.3157 17.574 18.5411 17.8201 18.7048C18.06 18.8643 18.4248 19.0048 18.9998 19.0048C19.5748 19.0048 19.9396 18.8643 20.1795 18.7048C20.4256 18.5411 20.6022 18.3156 20.7304 18.0599C20.8909 17.7397 20.9876 17.3691 20.9996 17.01C21.0121 16.5563 20.8032 16.0705 20.6265 15.6597L20.6119 15.6257Z"
                  />
                  <path d="M14.1296 11.5308C14.8899 11.2847 15.4728 12.076 15.1153 12.7892C14.952 13.1151 14.7683 13.3924 14.4031 13.5214C13.426 13.8666 12.6166 14.3527 11.7715 14.8679L11.6874 14.9192C10.6044 15.5799 9.40516 16.3115 7.82074 16.5749C6.17735 16.8481 4.23604 16.6066 1.62884 15.5661C1.11608 15.3615 0.866688 14.7809 1.07181 14.2694C1.27694 13.7578 1.8589 13.509 2.37167 13.7137C4.76436 14.6685 6.32297 14.8012 7.49201 14.6069C8.67889 14.4096 9.58374 13.8634 10.7286 13.1654C11.8166 12.5021 12.9363 11.9171 14.1296 11.5308Z" />
                </svg>
              }
              name={
                uiDifferentLanguageData[language].components
                  .main_weather_details.humidity
              }
            >
              <MainWeatherDetailsHumidity
                percent={currentHourWeatherData.humidity}
              />
            </MainWeatherDetailsPropertyMin>
            <MainWeatherDetailsPropertyMin
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 9C11.4477 9 11 9.44771 11 10V15.2676C10.4022 15.6134 10 16.2597 10 17C10 18.1046 10.8954 19 12 19C13.1046 19 14 18.1046 14 17C14 16.2597 13.5978 15.6134 13 15.2676V10C13 9.44771 12.5523 9 12 9Z" />
                  <path d="M11 6C11 5.44772 11.4477 5 12 5C12.5523 5 13 5.44772 13 6C13 6.55228 12.5523 7 12 7C11.4477 7 11 6.55228 11 6Z" />
                  <path d="M16 7C15.4477 7 15 7.44772 15 8C15 8.55229 15.4477 9 16 9C16.5523 9 17 8.55229 17 8C17 7.44772 16.5523 7 16 7Z" />
                  <path d="M6 13C5.44772 13 5 12.5523 5 12C5 11.4477 5.44772 11 6 11C6.55228 11 7 11.4477 7 12C7 12.5523 6.55228 13 6 13Z" />
                  <path d="M7 8C7 8.55229 7.44772 9 8 9C8.55228 9 9 8.55228 9 8C9 7.44772 8.55228 7 8 7C7.44772 7 7 7.44772 7 8Z" />
                  <path d="M18 13C17.4477 13 17 12.5523 17 12C17 11.4477 17.4477 11 18 11C18.5523 11 19 11.4477 19 12C19 12.5523 18.5523 13 18 13Z" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM12 20.9932C7.03321 20.9932 3.00683 16.9668 3.00683 12C3.00683 7.03321 7.03321 3.00683 12 3.00683C16.9668 3.00683 20.9932 7.03321 20.9932 12C20.9932 16.9668 16.9668 20.9932 12 20.9932Z"
                  />
                </svg>
              }
              name={
                uiDifferentLanguageData[language].components
                  .main_weather_details.pressure
              }
            >
              <MainWeatherDetailsPressure
                pressure={currentHourWeatherData.pressure_mb}
              />
            </MainWeatherDetailsPropertyMin>
          </div>
        </div>
      </div>

      <div className="weather-details__ellipse-1"></div>
      <div className="weather-details__ellipse-2"></div>
      <div className="weather-details__ellipse-3"></div>
    </div>
  );
}
