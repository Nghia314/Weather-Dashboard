function initpg() {
    var cityInput = document.getElementById('city-input');
    var searchBtn = document.getElementById('search-btn');
    var clearSearchBtn = document.getElementById('clear-search');
    var citynameInput = document.getElementById('cityname');
    var temperature = document.getElementById('temperature');
    var windspeed = document.getElementById('windspeed');
    var humidity = document.getElementById('humidity');
    var uvlight = document.getElementById('UV-light');
    var history = document.getElementById('history-search');
    var fivedayEl = document.getElementById('fiveday-header');
    let searchHistory = JSON(localStorage.getItem('search-history')) || [];
    console.log(searchHistory);

    var APIKey = 'a2f42eab89f899c260e503d43e5c869c';

    function currentWeather (cityName) {
        let queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + "&appid=" + APIKey;
        $.ajax({
            url: queryURL,
            method: 'GET', })
                 .then(function (response) {
                     

            var weathericon = response.weather[0].icon;
            var iconURL ="http://openweathermap.org/img/wn/"+weathericon +"10d@2x.png";
            var currentdate = new Date(response.dt*1000).toLocaleDateString();
            var day = currentdate.getDate();
            var month = currentdate.getMonth();
            var year = currentdate.getFullYear();
            citynameInput.innerHTML = response.date.name + " (" + day + "/" + month + "/" + year + ")";
            $(citynameInput).html(response.name +"("+currentdate+")" + "<img src="+iconURL+">");

            let lat = response.data.coordinates.lat;
            let long = response.data.coordinates.long;
            let queryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" +lat + "&long=" + long + "&appid=" + APIKey + "&cnt=1";
            axios.get(queryURL)
                .then(function (response) {
                    let UVindex = document.createElement("span");
                    if(response.data[0].value < 4) {
                        UVindex.setAttribute("class","badge badge-success");
                    } else if(response.data[0].value < 8) {
                        UVindex.setAttribute("class","badge badge-warning");
                    } else {
                        UVindex.setAttribute("class","badge badge-danger")
                    }
                    console.log(response.data[0].value);
                    UVindex.innerHTML = response.data[0].value;
                    uvlight.innerHTML = "UV Index: ";
                    uvlight.append(UVindex);
                });
                let cityid = response.data.id;
                let forecastqueryURL = "http://api.openweathermap.org/data/2.5/forecast?id=" + cityid + "&appid=" + APIKey;
                axios.get(forecastqueryURL)
                    .then(function(response) {
                        var forecastEls = document.querySelectorAll(".forecast");
                        for (i = 0; i < forecastEls.length; i++); {
                            forecastEl[i].innerHTML="";
                            var forecastindex = i * 8 + 4;
                            var forecastdate = new date (response.data.list[forecastindex].dx *1000);
                            var forecstday = forecastdate.getdate();
                            var forecastmonth = forecastdate.getmonth();
                            var forecastyear = forecastdate.getdate();
                            var forecastEl= document.createElement('p');


                        }
                    })


        }
    }
}

    
