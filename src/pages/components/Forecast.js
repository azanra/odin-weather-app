import elementUtils from "../utils/elementUtils";
import weatherUtils from "../utils/weatherUtils";
import Location from "./Location";

const forecastAttr = {
  elementType: "div",
  elementAttr: {
    class: "forecast",
  },
};

const daysAttr = {
  elementType: "p",
  elementAttr: {
    class: "days",
  },
};

const iconAttr = {
  elementType: "img",
  elementAttr: {
    class: "weatherIcon",
  },
};

const conditionAttr = {
  elementType: "p",
  elementAttr: {
    class: "condition",
  },
};

const tempContainerAttr = {
  elementType: "div",
  elementAttr: {
    class: "tempContainer",
  },
};

const tempAttr = {
  elementType: "p",
  elementAttr: {
    class: "temperature",
  },
};

const feelslikeAttr = {
  elementType: "p",
  elementAttr: {
    class: "feelslike",
  },
};

const Forecast = (function () {
  const renderContainer = ({
    icon,
    temp,
    feelslike,
    datetimeEpoch,
    conditions,
  }) => {
    const days = weatherUtils.epochToDays(datetimeEpoch);
    const forecast = elementUtils.render(forecastAttr);
    forecast.appendChild(renderDays(days));
    forecast.appendChild(renderIcon(icon));
    forecast.appendChild(renderCondition(conditions));
    forecast.appendChild(renderTemperature(temp, feelslike));
    return forecast;
  };

  const renderDays = (days) => {
    daysAttr.textContent = days;
    const daysElement = elementUtils.render(daysAttr);
    return daysElement;
  };

  const renderIcon = (icon) => {
    const weatherIcon = elementUtils.render(iconAttr);
    weatherUtils.getWeatherIcon(icon).then((svgIcon) => {
      weatherIcon.src = svgIcon.default;
    });
    return weatherIcon;
  };

  const renderCondition = (conditions) => {
    conditionAttr.textContent = conditions;
    const condition = elementUtils.render(conditionAttr);
    return condition;
  };

  const renderTemperature = (temp, feelslike) => {
    const selectedMetric = Location.getMetric();
    const tempContainer = elementUtils.render(tempContainerAttr);
    tempAttr.textContent = `${temp}°${selectedMetric}`;
    const tempElement = elementUtils.render(tempAttr);
    feelslikeAttr.textContent = `${feelslike}°${selectedMetric}`;
    const feelsLikeElement = elementUtils.render(feelslikeAttr);
    tempContainer.appendChild(tempElement);
    tempContainer.appendChild(feelsLikeElement);
    return tempContainer;
  };

  return { renderContainer };
})();

export default Forecast;
