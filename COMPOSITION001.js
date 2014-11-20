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
		stdout = getRandomInt(min, max);
		brainBox.insertLine(1, 'REQUEST BRAIN INFO | ROUTE 001 | '+stdout);
		screen.render();
		fn(stdout);
	} else {
		exec("tail -n 2 data1", function(error, stdout, stderr){
			stdout = stdout.substr(15, 8);
			stdout = Math.round(stdout);
			stdout = stdout % max;
			if(stdout<min){
				stdout = min+(stdout%(max-min));
				brainBox.insertLine(1, 'REQUEST BRAIN INFO | ROUTE 002.1 | '+stdout);
				screen.render();
				fn(stdout);
			} else {
				brainBox.insertLine(1, 'REQUEST BRAIN INFO | ROUTE 002.2 | '+stdout);
				screen.render();
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

function play(play_i){
	//
	// use this by adding array: channel (1-16), key press (1-127), miliseconds till key up
	//	play([1, 60, 500]);
	//	play([channel, key, miliseconds]);
	//
	//
	// set array like: midival - note - volume
	// midi vals:
	// 144 : play channel 1
	// 145 : play channel 2
	// etc...
	// 128 : stop channel 1
	// 129 : stop channel 2
	// etc...
	// 192 : program change channel 1
	//
	// 176 : controller
	// 176-10 : panning channel 1
	// complete list: http://www.midi.org/techspecs/midimessages.php
	//////////////
	var _channelStart 	= 143+play_i[0];
	var _channelStop 	= 127+play_i[0];
	var _note	 		= play_i[1];
	var _stopSec 		= play_i[2];

	output.sendMessage([_channelStart, _note, 127]); //start playing
	
	musicBox.insertLine(1, 'START '+decBin(_channelStart,7)+','+decBin(_note,7)+','+decBin(127,7));
	screen.render();
	setTimeout(function(){
		output.sendMessage([_channelStop, _note, 127]); //stop playing
		musicBox.insertLine(1, 'STOP  '+decBin(_channelStop,7)+','+decBin(_note,7)+','+decBin(127,7));
		screen.render();
	}, _stopSec);
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
	output.openVirtualPort("node-midi Virtual Output");
var fs 		= require('fs');
var lazy    = require("lazy");
var blessed = require('blessed');
var screen  = blessed.screen();
var brainBox = blessed.box({
  top: 'center',
  left: 'center',
  width: '33%',
  height: '100%',
  left: '0%',
  content: "BRAIN DATA",
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    border: {
      fg: '#f0f0f0'
    },
    hover: {
      bg: 'green'
    }
  }
});
var musicBox = blessed.box({
  top: 'center',
  left: 'center',
  width: '33%',
  height: '100%',
  left: '33%',
  content: "MUSIC DATA",
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    border: {
      fg: '#f0f0f0'
    },
    hover: {
      bg: 'green'
    }
  }
});
var consoleBox = blessed.box({
  top: 'center',
  left: 'center',
  width: '33%',
  height: '100%',
  left: '66%',
  content: "LOG DATA",
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    border: {
      fg: '#f0f0f0'
    },
    hover: {
      bg: 'green'
    }
  }
});
screen.append(brainBox);
screen.append(musicBox);
screen.append(consoleBox);
screen.key(['escape', 'q', 'C-c', 'C-z', 'enter'], function(ch, key) {
	output.sendMessage([255]); //panic
	output.closePort();
	return process.exit(0);
});
brainBox.focus();
screen.render();
//////
/////
// START COMPOSITION
/////
/////
//-------------------------------------//
//
// set random little sounds
// class name = __randomSounds
// sitting in channel: [1]
//
giveMeABrainWave(1250, 4800, function(__randomNewSound_theoutput){
	setInterval(function(){
		var __randomSounds_singleNote = giveMeABrainWave(60, 84, function(__randomSounds_theoutput){
			var __randomSounds_startMe = __randomSounds_theoutput;
			var __randomSounds_stopNote = giveMeABrainWave(100, 750, function(__randomSounds_theoutput){
				__randomSounds_stopMe = __randomSounds_theoutput;
				play([1, __randomSounds_startMe, __randomSounds_stopMe]);
			});
		});
	}, __randomNewSound_theoutput);
});
//-------------------------------------//
//////
/////
//END COMP
/////
//////