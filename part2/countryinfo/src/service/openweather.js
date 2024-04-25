import axios from "axios";
const KEY = import.meta.env.VITE_OPENWEATHER_APIKEY;
const apiUrl = (lat, lon) =>
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}`;

const iconUrl = (name) => ` https://openweathermap.org/img/wn/${name}@2x.png`;

const getWeather = (lat, lon, ...extracters) => {
  return axios.get(apiUrl(lat, lon)).then(
    (res) =>
      extracters.reduce(
        (result, extracter) => {
          return {
            raw: result.raw,
            data: { ...result.data, ...extracter(result.raw) },
          };
        },
        { raw: res.data, data: {} }
      ).data
  );
};

const extractTemp = (raw) => ({
  temp: (raw.main.temp - 273.15).toFixed(2),
});

const extractWind = (raw) => ({
  wind: raw.wind.speed,
});

const extractIcon = (raw) => ({
  icons: raw.weather.map(w => iconUrl(w.icon))
});

export { getWeather, extractTemp, extractWind, extractIcon };
