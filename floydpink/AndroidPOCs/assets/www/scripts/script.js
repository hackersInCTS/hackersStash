var Spinach = Spinach || {};

var MapMetaData = function(){
    this.location = "Hartford, CT";
    this.zoom = 14;
    this.width = 288;
    this.height = 200;
    this.markers = ["Hartford, CT"];
    this.sensor = false;
    this.getMapUrl = function(){
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
            navigator.notification.alert("PhoneGap is alive and kicking!!", $.noop,"Apna Alert", "Apna Button");
        },
        locationButtonClick:function () {
            Spinach.Common.navigateTo('map');
        }
    };
}(jQuery));

Spinach.Map = (function ($) {
    return {
        initialize:function () {
            Spinach.Map.plotMap(new MapMetaData());
        },
        plotMap:function (mapMetaData) {
            $('#mapPlotImg').attr('src', mapMetaData.getMapUrl());
        }
    };
}(jQuery));
