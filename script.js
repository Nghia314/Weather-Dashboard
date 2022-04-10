 var APIKey = "a2f42eab89f899c260e503d43e5c869c";
 var searchinput = document.getElementById("search");
 var searchBtn = document.getElementById("searchBtn");
 var todayhead = document.getElementById("today-header");
 var forecast5day = document.getElementById("forecast")

 // create a history list
 var searchHistory; 
  if (searchHistory) {
  (JSON.parse(localStorage.getItem("history")) != null );
    searchHistory = JSON.parse(localStorage.getItem("history"));
  }else
     searchHistory = [];

     searchBtn.addEventListener("click", SearchResult);

     searchList();

     function searchResult() {
         if (document.getElementById("search").value !== "") {
             weatherSearch(search);
             forecastSearch(search);

             saveSearch(search);
             renderSearch();

             document.getElementById("search").value = "";
         }
     }
function weatherSearch(search) {
    todayhead.className = "";

    var api = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}";
    fetch(api)
        .then(function (response) {
            return response.JSON();
        })
        .then(function (data) {
            var todayEl = document.getElementById("today");
            todayEl.textContent = "";
            var titleEl = document.getElementById("card-title");
            var containerEl = document.getElementById("cardContainer")
            var wind = getElementById("wind");
            
            var humidity = getElementById("humidity");
            humidity.textContent = "Humidity: " +data.main.humidity + "%";

            var temperature = getElementById("temperature");
            temperature.textContent = "Temperature: " + data.main.temperature + "°F";

            var uvIndex = getElementById("uvIndex");

            fetch("https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${data.coord.lat}&lon=${data.coord.lon}")
            .then(function (response) {
                response.JSON();
            })
            .then(function (data) {
                uvIndex.textContent = "UV Index: " +data.value;
                if(data.value < 6)
                uvIndex.className = "text-warning";
                if(data.value < 3)
                uvIndex.className = "text-primary";
                else
                uvIndex.className = "text-danger";
                
            });

            var iconUrl = document.createElement("img");
            iconUrl.setAttribute("src", " http://openweathermap.org/img/w/${data.weather[0].icon}.png");

            titleEl.appendChild(iconUrl);
            card.appendChild(titleEl);
            card.appendChild(temperature);
            card.appendChild(wind);
            card.appendChild(humidity);
            card.appendChild(uvIndex);
            card.appendChild(cardContainer);
            todayEl.appendChild(cardContainer);
        });
}
function forecastSearch(search) {
   todayhead.className = "";
   forecast5day.innerHTML = "";

   var api = "https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${APIKey}&units=imperial";

   fetch(api)
    .then(function(response) {
        return response.JSON
    })
    .then(function(data){
        var forecast5dayEl = document.getElementById("forecast");

        for (var i = 0; i < data.list.length; i++) {
            if (data.list[i].dt_text.includes("12:00:00")) {
                var cards = document.createElement("div");
                var cardcontainer = document.createElement("div");
                cardcontainer.className = "card bg-primary text-white";
                 var card = document.createElement("div");
                 var cardHeader = document.createElement("h3");
                 cardHeader.className = "card-title";
                 cardHeader.textContent = moment(data.list[i].dt_text.split("12:")[0]).format("LL");

                 var wind = document.createElement("p");
                 wind.className = "card-text"
                 wind.textContent = "wind Speed: " + data.list[i].wind.speed + "MPH";

                 var humidity = document.createElement("p");
                 humidity.className = "card-text"
                 humidity.textContent = "humidity: " + data.list[i].maintain.humidity + "%";

                 var temperature = document.createElement("p");
                 temperature.className = "card-text"
                 temperature.textContent = "temperature: " + data.list[i].main.temp_max + "°F";

                 var icon = document.createElement("img");
                 icon.setAttribute("src", " http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png");

                 card.appendChild(cardHeader);
                 card.appendChild(icon);
                 cardcontainer.appendChild(card);
                 card.appendChild(wind);
                 card.appendChild(humidity);
                 cards.appendChild(cardcontainer);
                 forecast5dayEl.appendChild(cardcontainer);
            }
        }

    });
}
     function saveSearch(search) {
         if(!searchHistory.includes(search)) {
             searchHistory.push(search);
             localStorage.setItem("history"JSON.stringify(searchHistory));
         }
     }
     function renderSearch(search) {
         while (document.getElementById("history").firstChild) {
             document.getElementById("history").removeChild(document.getElementById("history").firstChild);
         }
         searchList();
     }
     function searchList() {
         searchHistory.forEach(function(search) {
                var historyItem = document.createElement("li");
                historyItem.className = "list-group-item";
                historyItem.textContent = search;

                historyItem.addEventListener
         })
     }
 

 