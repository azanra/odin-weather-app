import WeatherAPI from "./pages/clients/WeatherAPI";
import "./style.css";

const unitGroup = "metric";
const location = "jakarta";

WeatherAPI.fetchData(location, unitGroup);
