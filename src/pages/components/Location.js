import WeatherAPI from "../clients/WeatherAPI";
import weatherUtils from "../utils/weatherUtils";
import Forecast from "./Forecast";

const Location = (function () {
  const locationInput = document.querySelector("#locationInput");
  const weatherForm = document.querySelector("#weatherForm");
  const metricInput = document.querySelector("#metricInput");
  const location = document.querySelector(".location");
  const time = document.querySelector(".time");
  const date = document.querySelector(".date");
  const tempNum = document.querySelector(".temp");
  const detailTemp = document.querySelector(".detailTemp");
  const cloudCoverText = document.querySelector(".cloudCover");
  const humidityText = document.querySelector(".humidity");
  const uvIndexText = document.querySelector(".uvIndex");
  const visibilityText = document.querySelector(".visibility");
  const windSpeedText = document.querySelector(".windSpeed");
  const weatherIcon = document.querySelector("#mainWeatherIcon");
  const forecastContainer = document.querySelector(".forecastContainer");
  const infoContainer = document.querySelector(".infoContainer");
  const detailInfo = document.querySelector(".detailInfo");
  const stateStatus = document.querySelector(".stateStatus");

  const handleClick = () => {
    weatherForm.addEventListener("submit", async (e) => {
      try {
        e.preventDefault();
        setLoadingState();
        forecastContainer.replaceChildren();
        const location = locationInput.value;
        const unitGroup = checkChosenMetric();
        console.log(location, unitGroup);
        const { extractedCondition, daysCondition } =
          await WeatherAPI.fetchData(location, unitGroup);
        console.log(extractedCondition, daysCondition);
        setFinishedState();
        updateInfoView(extractedCondition);
        renderForecast(daysCondition);
      } catch (error) {
        console.log(error);
        setErrorState();
      }
    });
  };

  const setLoadingState = () => {
    infoContainer.style.opacity = "0";
    detailInfo.style.opacity = "0";
    stateStatus.textContent = "Fetching data...";
  };

  const setFinishedState = () => {
    infoContainer.style.opacity = "1";
    detailInfo.style.opacity = "1";
    stateStatus.textContent = "";
  };

  const setErrorState = () => {
    stateStatus.textContent = `Location doesn't exist!`;
  };

  const checkChosenMetric = () => {
    if (metricInput.checked) {
      return "us";
    } else {
      return "metric";
    }
  };

  const getMetric = () => {
    const currentMetric = checkChosenMetric();
    if (currentMetric === "us") {
      return "f";
    } else {
      return "c";
    }
  };

  const updateInfoView = (currentCondition) => {
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
    } = currentCondition;

    location.textContent = weatherUtils.capitalize(address);
    time.textContent = datetime.slice(0, 5);
    date.textContent = weatherUtils.getFullDate(datetimeEpoch);

    const unitGroup = checkChosenMetric();
    const metric = weatherUtils.getMetric(unitGroup);
    tempNum.textContent = `${temp}°${metric}`;

    detailTemp.textContent = `${temp}°${metric} / ${feelslike}°${metric} • ${conditions}`;

    cloudCoverText.textContent = `${cloudcover}%`;
    humidityText.textContent = `${humidity}%`;
    uvIndexText.textContent = uvindex;
    visibilityText.textContent = `${visibility} km`;
    windSpeedText.textContent = `${windspeed} km/h`;

    weatherUtils
      .getWeatherIcon(icon)
      .then((svgIcon) => {
        weatherIcon.src = svgIcon.default;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  const renderForecast = (daysCondition) => {
    daysCondition.forEach((day) => {
      const forecast = Forecast.renderContainer(day);
      forecastContainer.appendChild(forecast);
    });
  };

  return { handleClick, getMetric, setErrorState };
})();

export default Location;
