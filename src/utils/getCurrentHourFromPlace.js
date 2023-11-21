import getCurrentDayFromPlace from "./getCurrentDayFromPlace";

export default function getCurrentHourFromPlace(place) {
  const currentDate = new Date(Date.now());

  if (getCurrentDayFromPlace(place).forecastOfHours.length) {
    const currentHour =
      getCurrentDayFromPlace(place).forecastOfHours[currentDate.getHours()];

    if (currentHour) {
      return currentHour;
    }
  }

  return null;
}
