const apiKey = '1aea2c82b33f33484fe4babbf6bb420f'

//Downloading HTML elements
const weatherCity = document.getElementById('city');
const weatherTemp = document.getElementById('temp');
const weatherHumidity = document.getElementById('humidity');
const weatherDate = document.getElementById('date');
const weatherDescription = document.getElementById('description');
const weatherWind = document.getElementById('wind');
const weatherClouds = document.getElementById('clouds');
const weatherContainer = document.querySelector('.weather');
const detailsContainer = document.querySelector('.additional-info');

//Getting current coordinates and running main function
let cityName;

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let lat = position.coords.latitude;
            let long = position.coords.longitude;


            fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=5&appid=${apiKey}`)
                .then(res => res.json())
                .then((data) => {
                    cityName = data[0].name;
                    currentWeather.fetchCurrentWeather(cityName)
                    console.log(lat, long)
                })
        });

        setClockAndDate();
    } else {
        alert('Geolocation is not supported in this browser')
    };
};

// //setting current Time and Date
const setClockAndDate = () => {
    setInterval(() => {
        const date = new Date();
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        let hours = date.getHours();
        let minutes = date.getMinutes();
        let day = date.getDay();
        let monthName = month[date.getMonth()]
        let year = date.getFullYear();

        if (hours < 10) hours = '0' + hours;
        if (minutes < 10) minutes = '0' + minutes;

        weatherDate.innerText = `${hours}:${minutes}, ${day} ${monthName} ${year}`;
    }, 1000)
}

// //Object which stores functions about current weather
let currentWeather = {

    //fetching data from openweathermap.org
    fetchCurrentWeather: function (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
            .then(res => res.json())
            .then(data => this.setCurrentWeather(data))
    },

    searchCity: function () {
        let input = document.querySelector('.search');
        this.fetchCurrentWeather(input.value);
    },

    // Setting current weather from API by changing DOM
    setCurrentWeather: function (data) {
        document.querySelector('.loader').style.display = 'none';
        weatherContainer.classList.add('weather-active');
        detailsContainer.classList.add('active');
        console.log(data)
        const { name } = data;
        const { temp, humidity } = data.main;
        const { country } = data.sys;
        const { description } = data.weather[0];
        const { wind } = data;
        const { clouds } = data;

        weatherCity.innerText = name + ', ' + country;
        weatherTemp.innerText = Math.ceil(temp) + '°';
        weatherHumidity.innerText = humidity + '%';
        weatherDescription.innerText = description;
        weatherWind.innerHTML = wind.speed + 'km/h';
        weatherClouds.innerHTML = clouds.all + '%';

        this.setIcon(description);
    },

    //Setting weather icon and background according to current weather 
    setIcon: function (description) {
        const weatherIcon = document.getElementById('icon')
        const bgImage = `linear-gradient(180deg, rgba(68, 78, 88, 0.1) 20%, rgb(0, 0, 0) 100%), url("./img/background/${description}.jpg")`

        if (description === 'clear sky') {
            weatherIcon.setAttribute('src', `img/icons/${description}.svg`);
            document.body.style.backgroundImage = bgImage;
        }
        if (description === 'few clouds') {
            weatherIcon.setAttribute('src', `img/icons/${description}.svg`);
            document.body.style.backgroundImage = bgImage;
        }
        if (description === 'scattered clouds') {
            weatherIcon.setAttribute('src', `img/icons/${description}.svg`);
            document.body.style.backgroundImage = bgImage;
        }
        if (description === 'broken clouds') {
            weatherIcon.setAttribute('src', `img/icons/${description}.svg`);
            document.body.style.backgroundImage = bgImage;
        }
        if (description === 'shower rain') {
            weatherIcon.setAttribute('src', `img/icons/${description}.svg`);
            document.body.style.backgroundImage = bgImage;
        }
        if (description === 'rain') {
            weatherIcon.setAttribute('src', `img/icons/${description}.svg`);
            document.body.style.backgroundImage = bgImage;
        }
        if (description === 'thunderstorm') {
            weatherIcon.setAttribute('src', `img/icons/${description}.svg`);
            document.body.style.backgroundImage = bgImage;
        }
        if (description === 'snow') {
            weatherIcon.setAttribute('src', `img/icons/${description}.svg`);
            document.body.style.backgroundImage = bgImage;
        }
        if (description === 'mist') {
            weatherIcon.setAttribute('src', `img/icons/${description}.svg`);
            document.body.style.backgroundImage = bgImage;
        }
    }
};

window.addEventListener('load', getLocation());



document.querySelector('.search-btn').addEventListener('click', () => {
    setTimeout(() => {
        currentWeather.searchCity();
    }, 2000)
})

document.querySelector('.search').addEventListener('keyup', (e) => {
    if (e.key === 'Enter') currentWeather.searchCity();
});






