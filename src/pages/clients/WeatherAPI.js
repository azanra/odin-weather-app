const WeatherAPI = (function () {
  const API_KEY = "XNEE4AX2XKR35ZUSM3TRCJNMF";

  const fetchData = async (location, unitGroup) => {
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&key=${API_KEY}`,
      );
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return { fetchData };
})();

export default WeatherAPI;
