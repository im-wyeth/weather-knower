import getCurrentDayFromPlace from "./getCurrentDayFromPlace";

export default function getCurrentHourFromPlace(place) {
  const currentDate = new Date(Date.now());

  if (currentDay.forecastOfHours.length) {
    const currentHour =
      getCurrentDayFromPlace(place).forecastOfHours[currentDate.getHours()];

    if (currentHour) {
      return currentHour;
    }
  }

  return null;
}
