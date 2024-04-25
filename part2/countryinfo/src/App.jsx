import { useState, useEffect } from "react";
// import './index.css';
import {
  getAll as getAllCountries,
  wash,
  extractArea,
  extractCapital,
  extractFlags,
  extractLanguages,
  extractName,
} from "./service/restcountries";

import Search from "./components/Search";
import Display from "./components/Display";
import { nanoid } from "nanoid";

const App = () => {
  const [countryData, setCountryData] = useState(null);
  const [displayInfo, setDisplayInfo] = useState(null);

  const generateId = () => ({
    id: nanoid(),
  });

  useEffect(() => {
    getAllCountries()
      .then((countries) =>
        countries.map((country) =>
          wash(
            country,
            extractArea,
            extractCapital,
            extractFlags,
            extractLanguages,
            extractName,
            generateId
          )
        )
      )
      .then((countries) => setCountryData(countries));
  }, []);

  const handleShow = (id) => () => {
    // console.log(`to show data of ${countryData.find(country => country.id === id).name} with id ${id}`)
    // console.log('get id'+ id)
    setDisplayInfo(id&&countryData.find(country=>country.id===id));
  };

  return (
    <div className="app">
      <Search
        list={countryData && countryData.map(({ name, official, id }) => ({
          name,
          official,
          id,
        }))}
        handleShow={handleShow}
      />
      <Display info={displayInfo}/>
    </div>
  );
};

export default App;
