/**
 * Created by migdonio1 on 11/12/16.
 */
var maps;

function initMaps() {
    maps = $('.map');
    maps.each(function() {
        var id = $(this).attr('id');
        var lat = $(this).data('lat');
        var lng = $(this).data('lng');
        var deviceName = $(this).data('device-name');
        console.log(id,lat,lng);

        var map = new google.maps.Map(document.getElementById(id), {
            center: {lat: lat, lng: lng},
            mapTypeId: 'satellite',
            zoom: 19
        });

        var marker = new google.maps.Marker({
            map: map,
            position: {lat: lat, lng: lng},
            icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            title: deviceName
        });
    });
}
