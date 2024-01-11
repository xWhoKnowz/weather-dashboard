var weatherKey = `03c94a8f5d7f90ec48a9d32b889715d8`;
var formEl = document.querySelector(`#userInput`)
var ulEl = document.querySelector(`.buttons`)
var cityInput = document.querySelector(`#cities`);
var searchedCity;
var cityButtons = [];
var forecastArray = [];
var cardDate = document.querySelectorAll(`.date`)
var cardWeather = document.querySelectorAll(`.weather`)
var cardTemp = document.querySelectorAll(`.temp`)
var cardWind = document.querySelectorAll(`.wind`)
var cardHumid = document.querySelectorAll(`.humid`)
var currentDate = document.getElementById(`date`)
var currentWeather = document.getElementById(`weather`)
var currentTemp = document.getElementById(`temp`)
var currentWind = document.getElementById(`wind`)
var currentHumid = document.getElementById(`humid`)
var btnEl;


function citySearch(event) {
    event.preventDefault();

    searchedCity = cityInput.value.trim()
    // console.log(searchedCity);

    fiveDayForecast()
    buttonMaker()
    buttonSaver()
}



function fiveDayForecast() {
    cityName = searchedCity;
    var dataRequest = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherKey}&units=imperial`

    fetch(dataRequest)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            var fiveDayRequest = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherKey}&units=imperial`
            // var currentDate = data.dt_txt.split(` `)
            var currentWeatherIcon = data.weather[0].icon + `.png`

            // currentDate.textContent = 
            currentWeather.setAttribute(`src`, `https://openweathermap.org/img/wn/${currentWeatherIcon}`)
            currentTemp.textContent = `Temp: ` + data.main.temp + ` °F`
            currentWind.textContent = `Wind: ` + data.wind.speed + ` MPH`
            currentHumid.textContent = `Humidity: ` + data.main.humidity + `%`


            fetch(fiveDayRequest)
                .then(function (responseToo) {
                    // console.log(responseToo);
                    return responseToo.json()
                })
                .then(function (dataToo) {
                    console.log(dataToo);
                    forecastArray = [];
                    for (let i = 0; i < dataToo.list.length; i++) {
                        if (dataToo.list[i].dt_txt.includes(`12:00:00`)) {
                            forecastArray.push(dataToo.list[i])
                            // console.log(dataToo.list[i]);
                            // console.log(forecastArray);
                        }
                    }
                    console.log(cardDate);
                    console.log(forecastArray.length);
                    for (let i = 0; i < forecastArray.length; i++) {
                        // console.log(`This is FA`, forecastArray[i]);
                        var forecastDate = forecastArray[i].dt_txt.split(` `)
                        var weatherIcon = forecastArray[i].weather[0].icon + `.png`
                        if (cardDate) {
                            // console.log(cardDate[i]);
                            cardDate[i].textContent = forecastDate[0]
                        }
                        cardWeather[i].setAttribute(`src`, `https://openweathermap.org/img/wn/${weatherIcon}`)
                        cardTemp[i].textContent = `Temp: ` + forecastArray[i].main.temp + ` °F`
                        cardWind[i].textContent = `Wind: ` + forecastArray[i].wind.speed + ` MPH`
                        cardHumid[i].textContent = `Humidity: ` + forecastArray[i].main.humidity + `%`

                    }



                })
        })
}

function buttonMaker() {
    console.log(searchedCity);
    cityButtons.push(searchedCity)
    console.log(cityButtons);

    btnEl = document.createElement(`button`)
    btnEl.setAttribute(`class`, `btn, btn-secondary`)

    
    for (let i = 0; i < cityButtons.length; i++) {
        
        btnEl.textContent = cityButtons[i]
        ulEl.appendChild(btnEl)
            
    }
    
    
}
function buttonSaver() {
   localStorage.setItem(`cityButtons`, JSON.stringify(cityButtons)) 
    
}

var savedButtons = JSON.parse(localStorage.getItem(`cityButtons`))
if(savedButtons !== null){
    for (let i = 0; i < cityButtons.length; i++) {
        
      
            
    }
}


formEl.addEventListener(`submit`, citySearch)

