// variable defining
const apiKey = 'e3d39f20368babf171320725f7051b07';
const apiUrl = `http://api.openweathermap.org/data/2.5/group?id=524901,703448,2643743&units=metric&appid=${apiKey}`;


//put information in html tag
function displayWeather(data) {
    const container = document.getElementById('weather-info');
    data.list.forEach(city => {
        const cityDiv = document.createElement('div');
        cityDiv.className = 'card';
        
        const weatherDescriptionimg = document.createElement('img');
        weatherDescriptionimg.src = `http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`;
        weatherDescriptionimg.className = "weather-icon";
        cityDiv.appendChild(weatherDescriptionimg);
        
        const cityName = document.createElement('h2');
        cityName.textContent = `${city.name},  ${city.sys.country}`;
        cityName.className = 'cityname';
        cityDiv.appendChild(cityName);
        

        const weatherDescription = document.createElement('p');
        weatherDescription.innerHTML = `Weather: ${city.weather[0].description}`;
        cityDiv.appendChild(weatherDescription);

        const temperature = document.createElement('p');
        temperature.innerHTML = `Temperature: ${city.main.temp.toFixed(1)} °C`;
        cityDiv.appendChild(temperature);

        const feelsLike = document.createElement('p');
        feelsLike.innerHTML = `Feels Like: ${city.main.feels_like.toFixed(1)} °C`;
        cityDiv.appendChild(feelsLike);

        const humidity = document.createElement('p');
        humidity.textContent = `Humidity: ${city.main.humidity}%`;
        cityDiv.appendChild(humidity);

        const wind = document.createElement('p');
        wind.textContent = `Wind: ${city.wind.speed} m/s, ${city.wind.deg}°`;
        cityDiv.appendChild(wind);

        container.appendChild(cityDiv);
    });
}


//get data from api
axios.get(apiUrl)
    .then(response => {
        displayWeather(response.data);
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });