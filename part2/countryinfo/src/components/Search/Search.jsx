import Searchresult from "./Searchresult";
import { useEffect, useState } from "react";
// import { debounce } from "lodash";

const Search = ({ list, handleShow }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  const shownCountries =
    searchValue === ""
      ? []
      : list.filter(
          (country) =>
            country.name.toLowerCase().includes(searchValue.toLowerCase()) || 
            country.official.toLowerCase().includes(searchValue.toLowerCase())
        );
  const searchResultJsx = (
    <>
      {shownCountries.length === 1 ? null : (
        <Searchresult list={shownCountries} handleShow={handleShow} />
      )}
    </>
  );
  useEffect(() => {
    // console.log(shownCountries.length)
    if (shownCountries.length === 1) {
      handleShow(shownCountries[0].id)();
    }
    //  else {
    //     handleShow(null)();
    // }
  }, [shownCountries]);

  return (
    <div>
      <div>
        find countries:
        <input className={"search-input"} type="text" value={searchValue} onChange={handleSearch} />
      </div>
      {searchResultJsx}
    </div>
  );
};

export default Search;
