import getCurrentDayFromPlace from "./getCurrentDayFromPlace";
import getNextDayFromPlace from "./getNextDayFromPlace";

const HOURS_IN_THE_DAY = 23;

export default function calculatePrecipitationFor24Hour(place) {
  const currentHour = new Date(Date.now()).getHours();

  let totalPrecipitation = 0;
  let hourIndex = currentHour;
  let hourQuantity = 0;
  let calculatingFromCurrentDay = true;

  if (currentHour === 0) {
    for (const hour of getCurrentDayFromPlace(place).forecastOfHours) {
      totalPrecipitation += hour.precipitationInMM;
    }
  } else {
    if (place.forecastOfDays.length > 1) {
      do {
        if (calculatingFromCurrentDay) {
          const hour = getCurrentDayFromPlace(place).forecastOfHours[hourIndex];
          totalPrecipitation += hour.precipitationInMM;
        } else {
          const hour = getNextDayFromPlace(place).forecastOfHours[hourIndex];
          totalPrecipitation += hour.precipitationInMM;
        }

        if (hourIndex === 23) {
          hourIndex = 0;
          calculatingFromCurrentDay = false;
        } else {
          hourIndex++;
        }

        hourQuantity++;
      } while (hourQuantity < HOURS_IN_THE_DAY);
    }
  }

  return totalPrecipitation;
}
