const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(weather.fetchCurrentWeather);
    } else {
        alert('Geolocation is not supported in this browser')
    };
}

let weather = {
    fetchCurrentWeather: function (position) {

        let lat = position.coords.latitude;
        let long = position.coords.longitude;


        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=1aea2c82b33f33484fe4babbf6bb420f`)
            .then(res => res.json())
            .then(data => weather.setCurrentWeather(data))
    },
    setCurrentWeather: function (data) {
        // console.log(data)
        const { name } = data;
        const { temp, humidity } = data.main;
        const date = new Date();
        console.log(date)
        document.getElementById('city').innerText = name;
        document.getElementById('temp').innerText = Math.ceil(temp) + '°';
        document.getElementById('humidity').innerText = humidity;
        document.getElementById('date').innerText = `${date.getHours()}:${date.getMinutes()}`;
    },
};




getLocation();




