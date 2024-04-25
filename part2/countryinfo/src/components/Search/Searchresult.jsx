import Searchitem from "./Searchitem";

const Searchresult = ({ list, handleShow }) => {
  if (list.length === 0) {
    return null;
  } else {
    return (
      <div className="search-results">
        {list.map((country) => {
          return (
            <Searchitem
              text={country.name + " : " + country.official}
              key={country.id}
              id = {country.id}
              handleShow={handleShow}
            />
          );
        })}
      </div>
    );
  }
};

export default Searchresult;
