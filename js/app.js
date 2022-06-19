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
                        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${this.apiKey}`)
                            .then(res => res.json())
                            .then(data => {
                                console.log(data)
                            })
                    },
                };
                weather.fetchCurrentWeather()

            })
        } else {
            alert('Geolocation is not supported in this browser')
        };
    }

    getLocation();


});




