var io = io.connect('http://localhost:3030');

io.emit('demo-socket', {
    userId: "580683491f438573afc7fe06",
    deviceId: "580683491f438573afc7fe05",
    switchId: "580683491f438573afc7fe04",
    switchStatus: "activo"
});

io.on('demo-holis', function(data) {
    console.log(data);
});