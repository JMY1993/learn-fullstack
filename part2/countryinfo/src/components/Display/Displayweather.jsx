const Displayweather = ({info, capital}) => {
    if (!info) {
        return null
    } else {
        return (
            <div>
                <h2>Weather in {capital} </h2>
                <p>temperature: {info.temp} ℃</p>
                {info.icons.map((iconUrl, i)=><img key={i} src={iconUrl}/>)}
                <img src={info.icon}/>
                <p>wind: {info.wind} m/s </p>
            </div>
        )
    }
}

export default Displayweather;