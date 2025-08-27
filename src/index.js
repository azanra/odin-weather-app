import WeatherAPI from "./pages/clients/WeatherAPI";
import "./style.css";

const unitGroup = "metric";
const location = "tangerang";

WeatherAPI.fetchData(location, unitGroup);
