const weatherUtils = (function () {
  const extractCondition = (address, condition) => {
    const {
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

    const extractedCondition = {
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
    };

    return extractedCondition;
  };

  const capitalize = (str) => {
    if (!str) return;
    const text = str.toLowerCase();
    return text[0].toUpperCase() + text.slice(1);
  };

  const epochToDate = (epoch) => {
    const date = new Date(0);
    date.setUTCSeconds(epoch);
    return date;
  };

  const epochToDays = (epoch) => {
    const date = epochToDate(epoch);
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[date.getDay()];
  };

  const getFullDate = (epoch) => {
    const currentDate = epochToDate(epoch);
    const currentDays = epochToDays(epoch);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const fullDate = `${currentDays}, ${currentDate.getDate()} ${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    return fullDate;
  };

  const getMetric = (metric) => {
    if (metric === "us") {
      return "f";
    } else {
      return "c";
    }
  };

  const getWeatherIcon = async (icon) => {
    const svgIcon = await import(`../../asset/weather-icon/${icon}.svg`);
    return svgIcon;
  };

  return {
    extractCondition,
    capitalize,
    epochToDays,
    getFullDate,
    getMetric,
    getWeatherIcon,
  };
})();

export default weatherUtils;
