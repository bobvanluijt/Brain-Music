var midi = require('midi');
var input = new midi.input();

input.openVirtualPort("node-midi MUSE001");
input.getPortName(0);

input.on('message', function(deltaTime, message) {
  console.log('m:' + message + ' d:' + deltaTime);
  console.log('-----');
});
