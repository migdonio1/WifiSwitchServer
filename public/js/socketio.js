var io = io.connect('http://192.168.0.5:3030');

var $devicePage = $('.device-section');
var $deviceButton = $('.button-section');
var $deviceCircle = $('.device-section .circle');
var $sensorPage = $('.sensor-section');
var $sensorButton = $('.sensor-button-section');
var $switchPage = $('.switch-section');
var $switchButton = $('.switch-button-section');

var devices;
var socket = io.connect();

$devicePage.click(function () {
    var data = $(this).data('device-id');
    io.emit('update-socket', {
        devices : data
    });
});

$deviceButton.click(function () {
    console.log("1",$(this).attr('data-device-status'));
    var status = $(this).attr('data-device-status') == "activo"? "inactivo" : "activo";
    console.log("2",status);
    io.emit('update-state', {
            id : $(this).data('device-id'),
            status: status
    });
});

socket.on('update', function (data) {
    console.log(data);
    devices = data;
});

$sensorPage.click(function () {
    var data = $(this).data('sensor-id');
    io.emit('update-sensor', {
        sensor : data
    });
});

$sensorButton.click(function () {
    console.log("1",$(this).attr('data-sensor-status'));
    var status = $(this).attr('data-sensor-status') == "activo"? "inactivo" : "activo";
    console.log("2",status);
    io.emit('update-state-sensor', {
        id : $(this).data('sensor-id'),
        status: status
    });
});

socket.on('update-sensor', function (data) {
    console.log(data);
    sensor = data;
});

$switchPage.click(function () {
    var data = $(this).data('switch-id');
    io.emit('update-switch', {
        switch : data
    });
});

$switchButton.click(function () {
    console.log("1",$(this).attr('data-switch-status'));
    var status = $(this).attr('data-switch-status') == "activo"? "inactivo" : "activo";
    console.log("2",status);
    io.emit('update-state-switch', {
        id : $(this).data('switch-id'),
        status: status
    });
});

socket.on('update-switch', function (data) {
    console.log(data);
    switchIot = data;
});

socket.on('connect',function() {
    console.log('Client has connected to the server!');
});
// Add a connect listener
socket.on('message',function(data) {
    console.log('Received a message from the server!',data);
});
// Add a disconnect listener
socket.on('disconnect',function() {
    console.log('The client has disconnected!');
});

socket.on('statedevice',function(data) {
    var status = data.status;
    var id = data.id;
    var text;
    console.log("5",status);
    $deviceButton.attr("data-device-status", status);
    $deviceButton.children("div").children("button").attr("class", "status-" + status);
    if(status=="inactivo"){
        text = "OFF";
    }else{
        text ="ON"
    }
    $deviceButton.children("div").children("button").text(text);
    //$deviceCircle.attr("class", "circle status-" + status);
    $('.device-section[data-device-id="'+id+'"] .circle').attr("class", "circle status-" + status);
    //console.log($('.device-status[data-device-id="'+id+'"]'));
});

socket.on('statesensor',function(data) {
    var status = data.status;
    var id = data.id;
    var text;
    console.log("5",status);
    $sensorButton.attr("data-sensor-status", status);
    $sensorButton.children("buttonSensor").attr("class", "status-" + status);
    if(status=="inactivo"){
        text = "OFF";
    }else{
        text ="ON"
    }
    $sensorButton.children("buttonSensor").text(text);
    $('.sensor-status-section[data-sensor-id="'+id+'"] .circle').attr("class", "circle status-" + status);
});

socket.on('stateswitch',function(data) {
    var status = data.status;
    var id = data.id;
    var text;
    console.log("5",status);
    $switchButton.attr("data-switch-status", status);
    $switchButton.children("buttonSwitch").attr("class", "status-" + status);
    if(status=="inactivo"){
        text = "OFF";
    }else{
        text ="ON"
    }
    $switchButton.children("buttonSwitch").text(text);
    $('.switch-status-section[data-switch-id="'+id+'"] .circle').attr("class", "circle status-" + status);
});

// Sends a message to the server via sockets
function sendMessageToServer(message) {
    socket.send(message);
};