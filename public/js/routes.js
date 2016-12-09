/**
 * Created by migdonio1 on 11/23/16.
 */

var basePath = window.location.protocol + "//" + window.location.host + "/";

$('.device-section').click(function(){
    var id = $(this).data('device-id');
    window.location = basePath + "devices/" + id;
});

