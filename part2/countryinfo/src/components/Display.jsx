import { useEffect, useState } from "react";
import Displayinfo from "./Displayinfo";
import Displayweather from "./Displayweather";
import {
  getWeather,
  extractIcon,
  extractTemp,
  extractWind,
} from "../service/openweather";

const Display = ({ info }) => {
    // console.log(info)
  const [weatherInfo, setWeatherInfo] = useState(null);
  useEffect(() => {
    info &&
      getWeather(
        info.capitalLat,
        info.capitalLng,
        extractIcon,
        extractTemp,
        extractWind
      ).then((weatherInfo) => setWeatherInfo(weatherInfo));
    return;
  }, [info]);
  if (!info) {
    return null;
  }
  return (
    <div>
      <Displayinfo info={info} />
      <Displayweather info={weatherInfo} capital={info.capital} />
    </div>
  );
};

export default Display;
