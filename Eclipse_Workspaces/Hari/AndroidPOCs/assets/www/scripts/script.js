var Spinach = (function ($) {
    return {
        DeviceReady:function () {
            navigator.notification.alert("PhoneGap is alive and kicking!!");
        }
    };
}(jQuery));

(function ($) {
    $(document).ready(function () {
        //document.addEventListener("deviceready", Spinach.DeviceReady, true);
        $(document).on("deviceready", Spinach.DeviceReady);
    });
}(jQuery));