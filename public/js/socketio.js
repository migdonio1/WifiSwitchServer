var io = io.connect('http://localhost:3030');

var $devicePage = $('.device-section');
var $deviceButton = $('.button-section');
var $sensorPage = $('.sensor-section');
var $sensorButton = $('.sensor-buttonn-section');
var $switchPage = $('.switch-section');
var $switchButton = $('.switch-buttonnn-section');
var $sensorValue = $('.sensor-value-section');
var $switchValue = $('.switch-timeOn-section');

var devices;

$devicePage.click(function () {
    var data = $(this).data('device-id');
    io.emit('update-socket', {
        devices : data
    });
});

$deviceButton.click(function () {
    var status = $(this).attr('data-device-status') == "activo" ? "inactivo" : "activo";
    console.log("2",status);
    io.emit('update-state', {
            id : $(this).data('device-id'),
            status: status
    });
    var iddevice = '57feaab555f70680bcaa9768';
    var idsensor = '57feaab555f70680bcaa9766';
    var datasensors = '90';
    io.emit('insert-data-sensor', {
        devices : iddevice,
        sensors : idsensor,
        datasensor : datasensors
    });
    var iddevices = '57feaab555f70680bcaa9768';
    var idswitch = '57feaab555f70680bcaa9767';
    var dataswitchs = '0';
    io.emit('insert-data-switch', {
        devices : iddevices,
        switchs : idswitch,
        dataswitch : dataswitchs
    });
});

io.on('update', function (data) {
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

io.on('update-sensor', function (data) {
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

io.on('update-switch', function (data) {
    console.log(data);
    switchIot = data;
});

io.on('connect',function() {
    console.log('Client has connected to the server!');
});
// Add a connect listener
io.on('message',function(data) {
    console.log('Received a message from the server!',data);
});
// Add a disconnect listener
io.on('disconnect',function() {
    console.log('The client has disconnected!');
});

io.on('actual-value-sensor',function(data) {
    var value = data.value;
    var id = data.id;
    var text = value.value;
    $sensorValue.text(text);
});

io.on('actual-value-switch',function(data) {
    var value = data.value;
    var id = data.id;
    var text = value.value;
    $switchValue.text(text);
});

io.on('state-device-button',function(data) {
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
    //console.log($('.device-status[data-device-id="'+id+'"]'));
});

io.on('state-device-circle',function(data) {
    var status = data.status;
    var id = data.id;
    var text;
    console.log("5",status);
    //$deviceCircle.attr("class", "circle status-" + status);
    $('.device-section[data-device-id="'+id+'"] .circle').attr("class", "circle status-" + status);
    //console.log($('.device-status[data-device-id="'+id+'"]'));
});

io.on('statesensor',function(data) {
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

io.on('stateswitch',function(data) {
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