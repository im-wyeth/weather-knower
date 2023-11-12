import Place from "../models/Place";
import testResponseFromAPI from "./testResponseFromAPI.json";
import calculatePrecipitationFor24Hour from "../utils/calculatePrecipitationFor24Hour";

const place = new Place(
  testResponseFromAPI.location.country,
  testResponseFromAPI.location.name
);

place.setForecastOfDays(testResponseFromAPI.forecast.forecastday);

describe("Testing a 'calculatePrecipitationForNext24Hour' function", () => {
  test("Test №1", () => {
    expect(calculatePrecipitationFor24Hour(place)).toBe(0);
  });
});
