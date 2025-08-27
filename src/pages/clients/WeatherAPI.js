import weatherUtils from "../utils/weatherUtils";

const WeatherAPI = (function () {
  const API_KEY = "XNEE4AX2XKR35ZUSM3TRCJNMF";

  const fetchData = async (location, unitGroup) => {
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&key=${API_KEY}`,
      );
      const result = await response.json();
      const { extractedCondition, daysCondition } = processData(result);
      console.log(result, extractedCondition, daysCondition);
    } catch (error) {
      console.log(error);
    }
  };

  const processData = (data) => {
    const { address, currentConditions, days } = data;

    const extractedCondition = weatherUtils.extractCondition(
      address,
      currentConditions,
    );

    const daysCondition = days.slice(0, 5).map((item) => {
      return {
        icon: item.icon,
        temp: item.temp,
        feelslike: item.feelslike,
        datetime: item.datetime,
      };
    });

    return { extractedCondition, daysCondition };
  };

  return { fetchData };
})();

export default WeatherAPI;
