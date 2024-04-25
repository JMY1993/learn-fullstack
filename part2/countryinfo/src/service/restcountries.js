import axios from "axios";

// const SITE_URL = "http://localhost:3001";
// const API_ALL_COUNTRIES_LIST = "/all";
// const infoByName = (name) => "api/name/" + name;

const infoByName = (name) => "api/name/" + name;
const SITE_URL = "https://studies.cs.helsinki.fi/restcountries";
const API_ALL_COUNTRIES_LIST = "/api/all";

const wash = (raw, ...extracters) => {
  return extracters.reduce(
    (result, extracter) => {
      return {
        raw: result.raw,
        data: { ...result.data, ...extracter(result.raw) },
      };
    },
    { raw: raw, data: {} }
  ).data;
};

const getAll = () =>
  axios.get(SITE_URL + API_ALL_COUNTRIES_LIST).then((res) => res.data);

const getByName = (name) =>
  axios.get(SITE_URL + infoByName(name)).then((res) => res.data);

const extractName = (raw) => ({
  name: raw.name.common,
  official: raw.name.official,
});

const extractCapital = (raw) => {
    // console.log(raw.capitalInfo.latlng[0])
  return {
    capital: raw.capital && raw.capital[0],
    capitalLat: raw.capitalInfo.latlng && raw.capitalInfo.latlng[0],
    capitalLng: raw.capitalInfo.latlng && raw.capitalInfo.latlng[1],
  };
};

const extractLanguages = (raw) => ({
  languages: raw.languages && Object.values(raw.languages),
});

const extractFlags = (raw) => ({
  flagPng: raw.flags.png,
  flagAlt: raw.flags.alt,
});

const extractArea = (raw) => ({
  area: raw.area,
});

export {
  getAll,
  getByName,
  wash,
  extractName,
  extractCapital,
  extractLanguages,
  extractFlags,
  extractArea,
};
