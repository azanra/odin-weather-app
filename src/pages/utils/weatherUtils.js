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

  const getMetric = (metric) => {
    if (metric === "us") {
      return "f";
    } else {
      return "c";
    }
  };

  return { extractCondition, capitalize, epochToDays, getMetric };
})();

export default weatherUtils;
