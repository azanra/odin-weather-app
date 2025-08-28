import WeatherAPI from "../clients/WeatherAPI";

const Location = (function () {
  const locationInput = document.querySelector("#locationInput");
  const weatherForm = document.querySelector("#weatherForm");
  const metricInput = document.querySelector("#metricInput");

  const handleClick = () => {
    weatherForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const location = locationInput.value;
      const unitGroup = checkChosenMetric();
      console.log(location, unitGroup);
      WeatherAPI.fetchData(location, unitGroup);
    });
  };

  const checkChosenMetric = () => {
    if (metricInput.checked) {
      return "us";
    } else {
      return "metric";
    }
  };

  return { handleClick };
})();

export default Location;
