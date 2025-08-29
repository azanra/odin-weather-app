import WeatherAPI from "../clients/WeatherAPI";
import weatherUtils from "../utils/weatherUtils";

const Location = (function () {
  const locationInput = document.querySelector("#locationInput");
  const weatherForm = document.querySelector("#weatherForm");
  const metricInput = document.querySelector("#metricInput");
  const location = document.querySelector(".location");
  const time = document.querySelector(".time");
  const date = document.querySelector(".date");
  const tempNum = document.querySelector(".temp");
  const detailTemp = document.querySelector(".detailTemp");

  const handleClick = () => {
    weatherForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const location = locationInput.value;
      const unitGroup = checkChosenMetric();
      console.log(location, unitGroup);
      const { extractedCondition, daysCondition } = await WeatherAPI.fetchData(
        location,
        unitGroup,
      );
      console.log(extractedCondition, daysCondition);
      updateInfoView(extractedCondition);
    });
  };

  const checkChosenMetric = () => {
    if (metricInput.checked) {
      return "us";
    } else {
      return "metric";
    }
  };

  const updateInfoView = (condition) => {
    const {
      address,
      datetime,
      datetimeEpoch,
      icon,
      temp,
      humidity,
      feelslike,
      uvindex,
      windspeed,
      cloudcover,
      visibility,
      conditions,
    } = condition;

    location.textContent = weatherUtils.capitalize(address);
    time.textContent = datetime.slice(0, 5);
    date.textContent = weatherUtils.epochToDays(datetimeEpoch);

    const unitGroup = checkChosenMetric();
    const metric = weatherUtils.getMetric(unitGroup);
    tempNum.textContent = `${temp}°${metric}`;

    detailTemp.textContent = `${temp}°${metric} / ${feelslike}°${metric} • ${conditions}`;
  };

  return { handleClick };
})();

export default Location;
