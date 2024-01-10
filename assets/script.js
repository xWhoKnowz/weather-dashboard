var cityName = document.querySelector(`#cities`);
var weatherKey = `03c94a8f5d7f90ec48a9d32b889715d8`;
var forecastArray = [];
var  cardBody= document.querySelectorAll(`.cardText`)

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
                if(data2.list[i].dt_txt.includes('12:00:00')){
                    forecastArray.push(data2.list[i])
                    console.log(data2.list[i]);
                    console.log(forecastArray);
                }
            }
            for (let i = 0; i < forecastArray.length; i++) {
                cardBody[i].textContent = forecastArray[i].main.temp
            }

            

        })
    })
}

fiveDayForecast()