
const weatherCity = document.getElementById('city');
const weatherTemp = document.getElementById('temp');
const weatherHumidity = document.getElementById('humidity');
const weatherDate = document.getElementById('date');
const weatherDescription = document.getElementById('description');

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(currentWeather.fetchCurrentWeather);
    } else {
        alert('Geolocation is not supported in this browser')
    };
};

let currentWeather = {
    fetchCurrentWeather: function (position) {

        let lat = position.coords.latitude;
        let long = position.coords.longitude;


        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=1aea2c82b33f33484fe4babbf6bb420f`)
            .then(res => res.json())
            .then(data => currentWeather.setCurrentWeather(data))
    },

    setCurrentWeather: function (data) {
        document.querySelector('.loader').style.display = 'none';
        document.querySelector('.weather').classList.add('weather-active');
        document.querySelector('.additional-info').classList.add('active');

        const { name } = data;
        const { temp, humidity } = data.main;
        const { country } = data.sys;
        const { description } = data.weather[0];

        const date = new Date();

        weatherCity.innerText = name + ', ' + country;
        weatherTemp.innerText = Math.ceil(temp) + '°';
        weatherHumidity.innerText = humidity + '%';
        weatherDate.innerText = `${date.getHours()}:${date.getMinutes()}`;
        weatherDescription.innerText = description;

        this.setIcon(description);
    },

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




