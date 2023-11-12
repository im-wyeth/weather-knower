export default function getCurrentDayFromPlace(place) {
  if (place.forecastOfDays[0]) {
    return place.forecastOfDays[0];
  } else {
    return null;
  }
}
