const UV_LEVEL_WORDS = {
  ru: {
    low: "низкий",
    moderate: "умеренный",
    high: "высокий",
    veryHigh: "очень высокий",
    extreme: "экстримальный",
  },
  en: {
    low: "low",
    moderate: "moderate",
    high: "high",
    veryHigh: "very high",
    extreme: "extreme",
  },
};

export default function getUVLevelWord(uvIndex = 0, language = "en") {
  switch (uvIndex) {
    case 0:
    case 1:
    case 2:
      return UV_LEVEL_WORDS[language].low;
    case 3:
    case 4:
    case 5:
      return UV_LEVEL_WORDS[language].moderate;
    case 6:
    case 7:
      return UV_LEVEL_WORDS[language].high;
    case 8:
    case 9:
    case 10:
      return UV_LEVEL_WORDS[language].veryHigh;
    case 11:
      return UV_LEVEL_WORDS[language].extreme;
    default:
      return UV_LEVEL_WORDS[language].extreme;
  }
}
