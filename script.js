var apiKey = "a2f42eab89f899c260e503d43e5c869c";
// my apikey varib
// event listener for search button
var searchBtn = document.getElementById("search-Btn");
searchBtn.addEventListener("click", searchResult);
searchResult.preventDefault();

searchList();
//function for search city pop up today weather, and forecast
function searchResult() {
  var search = document.getElementById("search").value;
      if (document.getElementById("search").value !== "") {

         weatherSearch(search);
          forecastSearch(search);

          saveSearch(search);
         renderSearch();

    document.getElementById("search").value = "";
  }
}
//function for today weather
function weatherSearch(search) {
  var todayhead = document.getElementById("today-header");
  todayhead.className = "";
  var api = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}&units=imperial`
   fetch(api)
      .then(function (response) {
      return response.json();
      })
      // create a card contain moment.js, weather
     .then(function (data) {
      var todayEl = document.getElementById("today");
      todayEl.textContent = "";
           var cardHeader = document.createElement("h3");
            cardHeader.className = "card-title";
            cardHeader.textContent = data.name + " - " + moment().format('L');
                 var cardContainer = document.createElement("div");
                 cardContainer.className = "card";
                    var card = document.createElement("div");
                    card.className = "card-body";
                      var wind = document.createElement("p");
                      wind.className = "card-text";
                        var humidity = document.createElement("p");
                        humidity.className = "card-text";
                         humidity.textContent = "Humidity: " + data.main.humidity + "%";
                          var temperature = document.createElement("p");
                          temperature.className = "card-text";
                          temperature.textContent = "Temperature: " + data.main.temperature + "°F";
                            var uvIndex = document.createElement("p");
                             uvIndex.className = "card-text";
      fetch( `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${data.coord.lat}&lon=${data.coord.lon}` )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          uvIndex.textContent = "UV Index: " + data.value;
          if (data.value < 6)
           uvIndex.className = "text-warning";
          if (data.value < 3)
           uvIndex.className = "text-primary";
          else 
          uvIndex.className = "text-danger";
        });
// appendChild the today-weather-card
      var iconUrl = document.createElement("img");
      iconUrl.setAttribute("src",`http://openweathermap.org/img/w/${data.weather[0].icon}.png` );
      cardHeader.appendChild(iconUrl);
        card.appendChild(cardHeader);
           card.appendChild(temperature);
               card.appendChild(wind);
                  card.appendChild(humidity);
                    card.appendChild(uvIndex);
                       cardContainer.appendChild(card);
                         todayEl.appendChild(cardContainer);
    });
}
//function forecastSearch repeat weathersearch process
function forecastSearch(search) {
  var forecastHeader = document.getElementById("forecast-header");
  forecastHeader.className = "";
  var forecast = document.getElementById("forecast");
  forecast.innerHTML = "";


  var api =`https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${apiKey}&units=imperial`;
  fetch(api)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      var forecast5dayEl = document.getElementById("forecast");
      for (var i = 0; i < data.list.length; i++) {
        if (data.list[i].dt_txt.includes("12:00:00")) {
          var cards = document.createElement("div");
              var cardcontainer = document.createElement("div");
               cardcontainer.className = "card bg-primary text-white";
                var card = document.createElement("div");
                 card.className = "card-body"
                     var cardHeader = document.createElement("h3");
                    cardHeader.className = "card-title";
                    cardHeader.textContent = moment(
                      data.list[i].dt_txt.split("12:")[0]
                    ).format("L");
                       var wind = document.createElement("p");
                        wind.className = "card-text";
                       wind.textContent = "wind Speed: " + data.list[i].wind.speed + "MPH";
                           var humidity = document.createElement("p");
                            humidity.className = "card-text";
                          humidity.textContent =
                           "Humidity: " + data.list[i].main.humidity + "%";
                               var temperature = document.createElement("p");
                              temperature.className = "card-text";
                              temperature.textContent =
                               "Temperature: " + data.list[i].main.temp_max + "°F";

                                   var icon = document.createElement("img");
                                   icon.setAttribute( "src",`https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png` );
          // appendChild forecast card
          card.appendChild(cardHeader);
          card.appendChild(icon);
          card.appendChild(wind);
          card.appendChild(humidity);
          card.appendChild(temperature);
          cardcontainer.appendChild(card);
          cards.appendChild(cardcontainer);
          forecast5dayEl.appendChild(cardcontainer);
        }
      }
    });
}
// search history save up to local storage
var searchhistory;
if (JSON.parse(localStorage.getItem("searchHistory")) != null)
  searchhistory = JSON.parse(localStorage.getItem("searchHistory"));
else
  searchhistory = [];
// save up previous search
function saveSearch(searchhistory) {
  if (!searchhistory.includes(search)) {
    search.push(searchhistory);
    localStorage.setItem("History", JSON.stringify(searchhistory));
  }
}
function renderSearch() {
  while (document.getElementById("searchHistory").firstChild) {
    document.getElementById("searchHistory" ).removeChild(document.getElementById("searchHistory").firstChild);
  }
  searchList();
}
function searchList() {
  searchhistory.each(function (search){
    var historyItem = document.createElement("li");
    historyItem.className = "list-group-item";
    historyItem.textContent = search;
    historyItem.addEventListener("click", function(event) {
      weatherSearch(event.target.textContent);
      forecastSearch(event.target.textContent);
    });
    document.getElementById("searchHistory").appendChild(historyItem);
  });
}


