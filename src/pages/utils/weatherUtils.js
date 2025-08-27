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

  return { extractCondition };
})();

export default weatherUtils;
