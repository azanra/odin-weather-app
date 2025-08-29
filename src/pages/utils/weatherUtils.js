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
    };

    return extractedCondition;
  };

  const capitalize = (str) => {
    if (!str) return;
    const text = str.toLowerCase();
    return text[0].toUpperCase() + text.slice(1);
  };

  return { extractCondition, capitalize };
})();

export default weatherUtils;
