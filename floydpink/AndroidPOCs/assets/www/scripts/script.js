var Spinach = Spinach || {};

var MapViewModel = function () {
    this.location = "Hartford, CT";
    this.zoom = 14;
    this.width = 288;
    this.height = 200;
    this.markers = ["Hartford, CT"];
    this.sensor = false;
    this.getMapUrl = function () {
        return 'https://maps.googleapis.com/maps/api/staticmap?center=' + this.location +
            '&zoom=' + this.zoom + '&size=' + this.width + 'x' + this.height +
            '&markers=' + this.markers.join('|') + '&sensor=' + this.sensor;
    }
};

Spinach.Common = (function ($) {
    return {
        getQueryStringValue:function (queryStringName) {
            var allQueryString = window.location.search.substring(1);
            var queryStrings = allQueryString.split('&');
            for (var i = 0; i < queryStrings.length; i++) {
                var nameValuePair = queryStrings[i].split('=');
                if (nameValuePair[0].toLowerCase() === queryStringName.toLowerCase()) {
                    return nameValuePair[1];
                }
            }
            return '';
        },
        navigateTo:function (page) {
            var url = location.href;
            location.href = url.replace(new RegExp("[a-z]*.html", "i"), page + ".html");
        },
        alert:function (message) {
            try{
                navigator.notification.alert(message, $.noop, "CTS Hackers");
            }
            catch(e) {
                alert(message);
            }
        }
    };
}(jQuery));

Spinach.Home = (function ($) {
    return {
        initialize:function () {
            //document.addEventListener("deviceready", Spinach.Common.DeviceReady, true);
            $(document).on("deviceready", Spinach.Home.DeviceReady);
            $('#SpecificLocation, #CurrentLocation').click(Spinach.Home.locationButtonClick);
        },
        DeviceReady:function () {
            Spinach.Common.alert("PhoneGap is alive and kicking!!");

        },
        locationButtonClick:function () {
            Spinach.Common.navigateTo('map');
        }
    };
}(jQuery));

Spinach.Map = (function ($) {
    return {
        initialize:function () {
            Spinach.Map.getCurrentPosition();
        },
        getCurrentPosition:function () {
            // onSuccess Callback
            //   This method accepts a `Position` object, which contains
            //   the current GPS coordinates
            //
            var onSuccess = function (position) {
                Spinach.Common.alert('Latitude: ' + position.coords.latitude + '\n' +
                    'Longitude: ' + position.coords.longitude + '\n' +
                    'Altitude: ' + position.coords.altitude + '\n' +
                    'Accuracy: ' + position.coords.accuracy + '\n' +
                    'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
                    'Heading: ' + position.coords.heading + '\n' +
                    'Speed: ' + position.coords.speed + '\n' +
                    'Timestamp: ' + position.timestamp + '\n');
                //TODO: Map the returned position to a MapViewModel
                Spinach.Map.plotMap(new MapViewModel());
            };

            // onError Callback receives a PositionError object
            //
            var onError = function (error) {
                Spinach.Common.alert('code: ' + error.code + '\n' +
                    'message: ' + error.message + '\n');
            };

            var geoLocationOptions = { maximumAge:3000, timeout:5000, enableHighAccuracy:true };

            navigator.geolocation.getCurrentPosition(onSuccess, onError, geoLocationOptions);
        },
        plotMap:function (mapViewModel) {
            $('#mapPlotImg').attr('src', mapViewModel.getMapUrl());
        }
    };
}(jQuery));
