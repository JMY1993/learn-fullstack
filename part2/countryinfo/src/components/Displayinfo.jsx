const Displayinfo = ({ info }) => {
  if (!info) {
    return <div>there is no data for {info.name}</div>;
  } else {
    return (
      <div>
        <h1>{info.name}</h1>
        <p>capital: {info.capital}</p>
        <p>area: {info.area}</p>

        {info.languages ? (
          <>
            <h3>languages: </h3>
            <ul>
              {info.languages.map((lang, id) => (
                <li key={id}>{lang}</li>
              ))}
            </ul>
          </>
        ) : null}
        <img src={info.flagPng} alt={info.flagAlt} />
      </div>
    );
  }
};

export default Displayinfo;
