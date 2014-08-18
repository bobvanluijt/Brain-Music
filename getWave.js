//
// start: muse-io --preset 14 --osc osc.udp://localhost:5000
// start: oscdump 5000 | grep /muse/eeg > data1
//

function giveMeABrainWave(min, max, fn){
    //
    //OUPUT as 0 to 127 MIDI signal or other min max
    //
	//oscdump 5000 | grep /muse/eeg
	//
	exec("tail -n 2 data1", function(error, stdout, stderr){
		stdout = stdout.substr(15, 8);
		stdout = Math.round(stdout);
		stdout = stdout % max;
		if(stdout<min){
			stdout = min+(stdout%(max-min));
			fn(stdout);
		} else {
			fn(stdout);
		}
	});
}

var fs = require('fs');
var lazy    = require("lazy");
var exec = require('child_process').exec;

giveMeABrainWave(20, 127, function(stdout){
	console.log( stdout );
});