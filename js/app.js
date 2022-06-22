//Downloading HTML elements
const weatherCity = document.getElementById('city');
const weatherTemp = document.getElementById('temp');
const weatherHumidity = document.getElementById('humidity');
const weatherDate = document.getElementById('date');
const weatherDescription = document.getElementById('description');

//Getting current coordinates and running main function
const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(currentWeather.fetchCurrentWeather);
        setClockAndDate();
    } else {
        alert('Geolocation is not supported in this browser')
    };
};

//setting current Time and Date
const setClockAndDate = () => {
    setInterval(() => {
        const date = new Date();

        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        if (hours < 10) hours = '0' + hours;
        if (minutes < 10) minutes = '0' + minutes;
        if (seconds < 10) seconds = '0' + seconds;

        weatherDate.innerText = `${hours}:${minutes}:${seconds}`;
    }, 1000)
}

//Object which stores functions about current weather
let currentWeather = {

    //fetching data from openweathermap.org
    fetchCurrentWeather: function (position) {

        let lat = position.coords.latitude;
        let long = position.coords.longitude;


        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=1aea2c82b33f33484fe4babbf6bb420f`)
            .then(res => res.json())
            .then(data => currentWeather.setCurrentWeather(data))
    },

    //Setting current weather from API by changing DOM
    setCurrentWeather: function (data) {
        document.querySelector('.loader').style.display = 'none';
        document.querySelector('.weather').classList.add('weather-active');
        document.querySelector('nav').classList.add('search-active');
        document.querySelector('.additional-info').classList.add('active');

        const { name } = data;
        const { temp, humidity } = data.main;
        const { country } = data.sys;
        const { description } = data.weather[0];

        weatherCity.innerText = name + ', ' + country;
        weatherTemp.innerText = Math.ceil(temp) + '°';
        weatherHumidity.innerText = humidity + '%';
        weatherDescription.innerText = description;

        this.setIcon(description);
    },

    //Setting weather icon and background according to current weather 
    setIcon: function (description) {
        const weatherIcon = document.getElementById('icon')
        const bgImage = `linear-gradient(180deg, rgba(68, 78, 88, 0.1) 40%, rgb(0, 0, 0) 100%), url("./img/background/${description}.jpg")`

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

getLocation();




