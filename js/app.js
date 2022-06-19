window.addEventListener('load', () => {
    let long;
    let lat;

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                long = position.coords.longitude;
                lat = position.coords.latitude;


                let weather = {
                    apiKey: '1aea2c82b33f33484fe4babbf6bb420f',
                    fetchCurrentWeather: function () {
                        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${this.apiKey}`)
                            .then(res => res.json())
                            .then(data => this.setCurrentWeather(data))
                    },
                    setCurrentWeather: function (data) {
                        console.log(data)
                        const { name } = data;
                        const { temp, humidity } = data.main;
                        const date = new Date();
                        document.getElementById('city').innerText = name;
                        document.getElementById('temp').innerText = Math.ceil(temp) + '°';
                        document.getElementById('humidity').innerText = humidity;
                        document.getElementById('date').innerText = `${date.getHours()}:${date.getMinutes()}`;
                    },
                };
                weather.fetchCurrentWeather();


            })
        } else {
            alert('Geolocation is not supported in this browser')
        };
    }
    getLocation();
});




