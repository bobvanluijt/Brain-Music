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

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function getAllMethods(object) {
    return Object.getOwnPropertyNames(object).filter(function(property) {
        return typeof object[property] == 'function';
    });
}

function decBin(dec,length){
  var out = "";
  while(length--)
    out += (dec >> length ) & 1;    
  return out;  
}

var exec = require('child_process').exec;
var midi = require('midi');
var output = new midi.output();
var fs = require('fs');
var lazy    = require("lazy");

output.openVirtualPort("node-midi MUSE001");

//
//START COMPO. WITH FUNCTION NAME arpInt()
//
function arpInt() {
 	
	  setTimeout(function() {
	
		output.sendMessage([144,rand,80]);
		console.log('SEND: ['+decBin(144,7)+','+decBin(rand,7)+','+decBin(80,7)+'] REFRESH TIME MicroSec: '+randomTempo);
	
		setTimeout(function() {
			//message = insideChannel (example, 8=balance), value
			output.sendMessage([128,rand,40]);		
			giveMeABrainWave(50,96,function(stdout){
				rand = stdout;	
				giveMeABrainWave(10,200,function(stdout){
					randomTempo = stdout;
					arpInt();	
				});
			});
		}, 49);
	
	  }, randomTempo);
	
}

var rand;
var randomTempo;
giveMeABrainWave(64,90,function(stdout){
	rand = stdout;	
	giveMeABrainWave(20,190,function(stdout){
		randomTempo = stdout;
		arpInt();	
	});
});
//
//END COMP
//

output.closePort();