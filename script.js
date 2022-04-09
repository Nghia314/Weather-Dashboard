function initpg() {
    var city = "";
    var cityInput = document.getElementById('city-input');
    var searchBtn = document.getElementById('search-btn');
    var clearSearchBtn = document.getElementById('clear-search');
    var citynameInput = document.getElementById('cityname');
    var temperature = document.getElementById('temperature');
    var windspeed = document.getElementById('windspeed');
    var humidity = document.getElementById('humidity');
    var uvlight = document.getElementById('UV-light');
    var history = document.getElementById('history-search');
    let searchHistory = JSON(localStorage.getItem('search-history')) || [];
    console.log(searchHistory);

    var APIKey = 'a2f42eab89f899c260e503d43e5c869c';

    function displayWeather (event) {
        event.preventDefault();
        if(cityInput.val().trim()!==""){
            city=cityInput.val().trim();
            currentWeather(city);
        }
    }
    function currentWeather (city) {
        let queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + "&appid=" + APIKey;
        $.ajax({
            url: queryURL,
            method: 'GET',
        }).then(function (response) {
            console.log(response);
            var weathericon = response.weather[0].icon;
            var iconURL ="http://openweathermap.org/img/wn/"+weathericon +"10d@2x.png";
            var date = new Date(response.dt*1000).toLocaleDateString();
            $(citynameInput).html(response.name +"("+date+")" + "<img src="+iconURL+">");
            

            var temp = (response.main.temp - 273.15) * 1.80 + 32;
            $(temperature).html((temp).toFixed(2)+"&#8457");

            $(humidity).html(response.main.humidity + "%");

            var wind= response.wind.speed;
            var windmph = (wind *2.237).toFixed(1);
            $(windspeed).html(windmph + "MPH");

            uvlight(response.coordinate.lon, response.coordinate.lat);
            forecast(response.id);
            if(response.cod==200) {
                scity=Json.parse(localStorage.getItem("cityname"));
                console.log(scity);
                if(scity==null) {
                    scity=[];
                    scity.push(city.toUpperCase());
                    
                }

            }

        })
            
    }
}
