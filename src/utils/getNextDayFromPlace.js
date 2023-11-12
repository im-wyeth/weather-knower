export default function getNextDayFromPlace(place) {
  if (place.forecastOfDays[1]) {
    return place.forecastOfDays[1];
  } else {
    return null;
  }
}
