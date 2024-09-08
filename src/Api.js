const apiKey = 'f10912e11961435162e798e8236f2367';

const getWeather = async (city) => {

    return await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then((res) => res.json())
    .then((json) => {
        return json;
    })
    
}

export default getWeather
