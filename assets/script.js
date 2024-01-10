var weatherKey = `03c94a8f5d7f90ec48a9d32b889715d8`;
var cityName = document.querySelector(`#cities`);
var forecastArray = [];
var cardDate = document.querySelectorAll(`.date`)
var cardWeather = document.querySelectorAll(`.weather`)
var cardTemp = document.querySelectorAll(`.temp`)
var cardWind = document.querySelectorAll(`.wind`)
var cardHumid = document.querySelectorAll(`.humid`)



function citySearch(event) {
    event.preventdefault();

    var searchedCity = cityName.value.trim() 
    
}



function fiveDayForecast(cities) {
    cityName = `Dallas`;
    var dataRequest = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherKey}`
    
    fetch(dataRequest)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        var fiveDayRequest = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherKey}&units=imperial`
        
        fetch(fiveDayRequest)
        .then(function (response2) {
            console.log(response2);
            return response2.json()
        })
        .then(function (data2) {
            console.log(data2);
            for (let i = 0; i < data2.list.length; i++) {
                if(data2.list[i].dt_txt.includes(`12:00:00`)){
                    forecastArray.push(data2.list[i])
                    console.log(data2.list[i]);
                    console.log(forecastArray);
                }
            }
            for (let i = 0; i < forecastArray.length; i++) {
                var forecastDate = forecastArray[i].dt_txt.split(` `)
                var weatherIcon = forecastArray[i].weather[0].icon + `.png`
                cardDate[i].textContent = forecastDate[0]
                cardWeather[i].textContent =  `https://openweathermap.org/img/wn/${weatherIcon}`
                cardTemp[i].textContent = `Temp: ` + forecastArray[i].main.temp + ` °F`
                cardWind[i].textContent = `Wind: ` + forecastArray[i].wind.speed + ` MPH`
                cardHumid[i].textContent = `Humidity: ` + forecastArray[i].main.humidity + `%`

            }

            

        })
    })
}

fiveDayForecast()