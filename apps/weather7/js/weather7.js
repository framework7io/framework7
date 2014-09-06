// Initialize your app
var myApp = new Framework7({
    modalTitle: 'weather7'
});

// Export selectors engine
var $$ = Dom7;

// Register required Template7 helpers, before templates compilation
Template7.registerHelper('dayOfWeek', function (date) {
    date = new Date(date);
    var days = ('Monday Tuesday Wednesday Thursday Friday Saturday Sunday').split(' ');
    return days[date.getDay()];
});
// Templates using Template7 template engine
myApp.searchResultsTemplate = Template7.compile($$('#search-results-template').html());
myApp.homeItemsTemplate = Template7.compile($$('#home-items-template').html());
myApp.detailsTemplate = Template7.compile($$('#details-template').html());

// Add view
var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true,
});

// Search Locations
var searchTimeout;
myApp.searchLocation = function (search) {
    var query = encodeURIComponent('select * from geo.places where text="' + search + '"');
    var q = 'http://query.yahooapis.com/v1/public/yql?q=' + query + '&format=json';
    if (searchTimeout) clearTimeout(searchTimeout);
    $$('.popup .preloader').show();
    searchTimeout = setTimeout(function () {
        $$.get(q, function (results) {
            var html = '';
            results = JSON.parse(results);
            $$('.popup .preloader').hide();
            if (results.query.count > 0) {
                var places = results.query.results.place;
                html = myApp.searchResultsTemplate(places);
            }
            $$('.popup .search-results').html(html);
        });
    }, 300);
};
// Get locations weather data
myApp.updateWeatherData = function (callback) {
    var woeids = [];
    if (!localStorage.w7Places) return;
    var places = JSON.parse(localStorage.w7Places);
    if (places.length === 0) {
        localStorage.w7Data = JSON.stringify([]);
        return;
    }
    if (!navigator.onLine) {
        myApp.alert('You need internet connection to update weather data');
    }
    for (var i = 0; i < places.length; i++) {
        woeids.push(places[i].woeid);
    }
    var query = encodeURIComponent('select * from weather.forecast where woeid in (' + JSON.stringify(woeids).replace('[', '').replace(']', '') + ') and u="c"');
    var q = 'http://query.yahooapis.com/v1/public/yql?q=' + query + '&format=json';
    myApp.showIndicator();
    $$.get(q, function (data) {
        var weatherData = [];
        myApp.hideIndicator();
        data = JSON.parse(data);
        if (!data.query || !data.query.results) return;
        var places = data.query.results.channel;
        var place;
        if ($$.isArray(places)) {
            for (var i = 0; i < places.length; i++) {
                place = places[i];
                weatherData.push({
                    city: place.location.city,
                    country: place.location.country,
                    region: place.location.region,
                    humidity: place.atmosphere.humidity,
                    pressure: place.atmosphere.pressure,
                    sunrise: place.astronomy.sunrise,
                    sunset: place.astronomy.sunset,
                    wind: place.wind,
                    condition: place.item.condition,
                    forecast: place.item.forecast,
                    lat: place.item.lat,
                    long: place.item.long,
                    woeid: woeids[i]
                });
            }
        }
        else {
            place = places;
            weatherData.push({
                city: place.location.city,
                country: place.location.country,
                region: place.location.region,
                humidity: place.atmosphere.humidity,
                pressure: place.atmosphere.pressure,
                sunrise: place.astronomy.sunrise,
                sunset: place.astronomy.sunset,
                wind: place.wind,
                condition: place.item.condition,
                forecast: place.item.forecast,
                lat: place.item.lat,
                long: place.item.long,
                woeid: woeids[0]
            });
        }
        localStorage.w7Data = JSON.stringify(weatherData);
        if (callback) callback();
    });
};
// Build list of places on home page
myApp.buildWeatherHTML = function () {
    var weatherData = localStorage.w7Data;
    if (!weatherData) return;
    $$('.places-list ul').html('');
    weatherData = JSON.parse(weatherData);
    var html = myApp.homeItemsTemplate(weatherData);
    $$('.places-list ul').html(html);
};

// Delete place
$$('.places-list').on('delete', '.swipeout', function () {
    var woeid = $$(this).attr('data-woeid');
    // Update Places
    if (!localStorage.w7Places) return;
    var places = JSON.parse(localStorage.w7Places);
    for (var i = 0; i < places.length; i++) {
        if (places[i].woeid === woeid) places.splice(i, 1);
    }
    localStorage.w7Places = JSON.stringify(places);
    // Update places data
    if (!localStorage.w7Data) return;
    var data = JSON.parse(localStorage.w7Data);
    for (i = 0; i < data.length; i++) {
        if (data[i].woeid === woeid) data.splice(i, 1);
    }
    localStorage.w7Data = JSON.stringify(data);
});

// Handle search results
$$('.popup input[type="text"]').on('change keyup keydown', function () {
    myApp.searchLocation(this.value);
});
$$('.popup').on('closed', function () {
    $$('.popup input[type="text"]').val('');
    $$('.popup .search-results').html('');
    $$('.popup .preloader').hide();
});
$$('.popup').on('open', function () {
    $$('.views').addClass('blured');
    $$('.statusbar-overlay').addClass('with-popup-opened');
});
$$('.popup').on('opened', function () {
    $$('.popup input[type="text"]')[0].focus();
});
$$('.popup').on('close', function () {
    $$('.views').removeClass('blured');
    $$('.popup input[type="text"]')[0].blur();
    $$('.statusbar-overlay').removeClass('with-popup-opened');
});
$$('.popup .search-results').on('click', 'li', function () {
    var li = $$(this);
    var woeid = li.attr('data-woeid');
    var city = li.attr('data-city');
    var country = li.attr('data-country');
    var places;
    if (localStorage.w7Places) places = JSON.parse(localStorage.w7Places);
    else places = [];
    places.push({
        woeid: li.attr('data-woeid'),
        city: li.attr('data-city'),
        country: li.attr('data-country')
    });
    localStorage.w7Places = JSON.stringify(places);
    myApp.updateWeatherData(function () {
        myApp.buildWeatherHTML();
    });
});

// Update html and weather data on app load
myApp.buildWeatherHTML();
myApp.updateWeatherData(function () {
    myApp.buildWeatherHTML();
});

// Build details page
$$('.places-list').on('click', 'a.item-link', function (e) {
    var woeid = $$(this).attr('data-woeid');
    var item;
    var weatherData = JSON.parse(localStorage.w7Data);
    for (var i = 0; i < weatherData.length; i++) {
        if (weatherData[i].woeid === woeid) item = weatherData[i];
    }
    var pageContent = myApp.detailsTemplate(item);
    mainView.loadContent(pageContent);
});

// Update app when manifest updated 
// http://www.html5rocks.com/en/tutorials/appcache/beginner/
// Check if a new cache is available on page load.
window.addEventListener('load', function (e) {
    window.applicationCache.addEventListener('updateready', function (e) {
        if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
            // Browser downloaded a new app cache.
            myApp.confirm('A new version of weather7 is available. Do you want to load it right now?', function () {
                window.location.reload();
            });
        } else {
            // Manifest didn't changed. Nothing new to server.
        }
    }, false);
}, false);
