/*_          _          _      _         _                   
 | |        | |        (_)    | |       | |                  
 | | ___   _| |__  _ __ _  ___| | _____ | | ___   __ _ _   _ 
 | |/ / | | | '_ \| '__| |/ __| |/ / _ \| |/ _ \ / _` | | | |
 |   <| |_| | |_) | |  | | (__|   < (_) | | (_) | (_| | |_| |
 |_|\_\\__,_|_.__/|_|  |_|\___|_|\_\___/|_|\___/ \__, |\__, |
                                                  __/ | __/ |
                                                 |___/ |___/ */
												 
function giveMeABrainWave(min, max, fn){
    //
    //OUPUT as 0 to 127 MIDI signal or other min max
    //
	//oscdump 5000 | grep /muse/eeg
	//
	if(status=='REHEARSE'){
		console.log('REQUEST BRAIN INFO | ROUTE 001');
		stdout = getRandomInt(min, max);
		fn(stdout);
	} else {
		console.log('REQUEST BRAIN INFO | ROUTE 002');
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
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function getAllMethods(object) {
    return Object.getOwnPropertyNames(object).filter(function(property) {
        return typeof object[property] == 'function';
    });
}

function playNote(i){
	//
	// set array like: midival - note - volume
	// midi vals:
	// 144 : play channel 1
	// 145 : play channel 2
	// etc...
	// 128 : stop channel 1
	// 128 : stop channel 2
	// etc...
	// 192 : program change channel 1
	//
	// 176 : controller
	// 176-10 : panning channel 1
	// complete list: http://www.midi.org/techspecs/midimessages.php
	output.sendMessage(i);
	console.log('SEND: '+decBin(i[0],7)+','+decBin(i[1],7)+','+decBin(i[2],7));
}

function decBin(dec,length){
  var out = "";
  while(length--)
    out += (dec >> length ) & 1;    
  return out;  
}


///////
// set main variables
///////
var status  = 'REHEARSE'; //REHEARSE or LIVE
var exec 	= require('child_process').exec;
var midi    = require('midi');
var output 	= new midi.output();
var fs 		= require('fs');
var lazy    = require("lazy");

output.openVirtualPort("node-midi Virtual Output");

///////
//START COMPOSITION
///////

///////
//END COMP
///////

output.closePort();