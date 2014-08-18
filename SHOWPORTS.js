var midi = require('midi');
var input = new midi.input();

var i=0;

while(i<input.getPortCount()){
    console.log( input.getPortName(i) );
    //input.openPort(i);
    //input.closePort();
    i++;
}
//input.closePort();