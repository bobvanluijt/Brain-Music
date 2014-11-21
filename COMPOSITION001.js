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
	// use this by adding array: channel (1-16), key press (1-127), miliseconds till key up, velocity
	//	play([1, 60, 500, 127]);
	//	play([channel, key, miliseconds, velocity]);
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
	var _channelVelocity= play_i[3];
	var _note	 		= play_i[1];
	var _stopSec 		= play_i[2];

	output.sendMessage([_channelStart, _note, _channelVelocity]); //start playing
	
	musicBox.insertLine(1, 'START '+decBin(_channelStart,7)+','+decBin(_note,7)+','+decBin(_channelVelocity,7));
	screen.render();
	setTimeout(function(){
		output.sendMessage([_channelStop, _note, _channelVelocity]); //stop playing
		musicBox.insertLine(1, 'STOP  '+decBin(_channelStop,7)+','+decBin(_note,7)+','+decBin(_channelVelocity,7));
		screen.render();
	}, _stopSec);
}

function console(i){
	consoleBox.insertLine(1, i);
	screen.render();
}

function decBin(dec,length){
  var out = "";
  while(length--)
    out += (dec >> length ) & 1;    
  return out;  
}

function beatsToStart(__beats ,__mainTempo){
	return __beats*(60/__mainTempo)*1000;
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

//
// set key
// setKey()
// __mainKey can be changed or used at all times
//
var __mainKey = 0;
function setKey(){ 
	var __mainKey_val = giveMeABrainWave(0, 11, function(__mainKey_val){
		__mainKey = __mainKey_val-6;
		console('MainKey is set to: '+__mainKey);
	});
}
setTimeout(function(){
	setKey();
}, 500);

var __mainTempo;
function setTempo(){
	var __setTempo_val = giveMeABrainWave(80, 140, function(__setTempo_val){
		console("<<SET TEMPO: "+__setTempo_val+'>>');
		__mainTempo = __setTempo_val;
		setTimeout(function(){
			console('__grooveCreator() -> started playing');
			__grooveCreator();
		}, beatsToStart(8*8,__mainTempo));
		
		setTimeout(function(){
			console('__drumCreator() -> started playing');
			__drumCreator();
		}, beatsToStart(14*8,__mainTempo));
		
		setTimeout(function(){
			console('__orchEffect() -> started playing');
			__orchEffect();
		}, beatsToStart(0,__mainTempo));
		
		setTimeout(function(){
			console('BRIDGE');
			__hardStop();
			__earthevoice(); //make some noice with the earthvoice :-)
		}, beatsToStart(18*8,__mainTempo));
		
	});
}
setTimeout(function(){
	setTempo();
}, 500);

// set random little sounds
// class name = __randomSounds
// sitting in channel: [1]
//
var __randomNewSound_theoutput_timeout;
var __randomNewSound_theoutput = 500; //setting for general starting purposes
giveMeABrainWave(5280, 8840, function(__randomNewSound_theoutput){
	console('__randomSounds() -> started playing');
	__randomNewSound_theoutput_timeout = setInterval(function(){
		var __randomSounds_singleNote = giveMeABrainWave(50, 62, function(__randomSounds_theoutput){
			var __randomSounds_startMe = __randomSounds_theoutput;
			var __randomSounds_theoutput = giveMeABrainWave(1250, 3200, function(__randomSounds_theoutput){
				__randomSounds_stopMe = __randomSounds_theoutput;
				play([1, __randomSounds_startMe, __randomSounds_stopMe, 60]);
			});
		});
	}, __randomNewSound_theoutput);
});

// set random bass sounds
// class name = __randomBassSounds
// sitting in channel: [2]
//
var __randomBassSounds_timeout;
function __randomBassSounds(){
	console('__randomBassSounds() -> started playing');
	var __randomBassSounds_theoutput = giveMeABrainWave(14800, 26800, function(__randomBassSounds_theoutput){
		var __randomBassSounds_note = giveMeABrainWave(40, 52, function(__randomBassSounds_note){
			play([2, __randomBassSounds_note, __randomBassSounds_theoutput, 56]);
			__randomBassSounds_timeout = setTimeout(function(){
				__randomBassSounds();
			}, __randomBassSounds_theoutput);
		});
	});
}
setTimeout(function(){
	__randomBassSounds();
}, 22800);

// set random bassdrum sound
// class name = __randomBassdrumSound
// sitting in channel: [3]
//
var __randomBassdrumSound_timeout;
function __randomBassdrumSound(){
	console('__randomBassdrumSounds() -> started playing');
	var __randomBassdrumSound_note = giveMeABrainWave(20000, 32000, function(__randomBassdrumSound_note){
		play([3, 60, 5000, 127]);
		__randomBassdrumSound_timeout = setTimeout(function(){
			__randomBassdrumSound();
		}, __randomBassdrumSound_note);
	});
}
setTimeout(function(){
	__randomBassdrumSound();
}, __randomNewSound_theoutput); //__randomNewSound_theoutput used from __randomNewSound()

// set random crystal sounds
// class name = __randomCrystalSounds
// sitting in channel: [4]
//
var __randomCrystalSounds_timeout;
function __randomCrystalSounds(){
	console('__randomCrystalSounds() -> started playing');
	var __randomCrystalSounds_theoutput = giveMeABrainWave(14800, 26800, function(__randomCrystalSounds_theoutput){
		var __randomCrystalSounds_note = giveMeABrainWave(40, 70, function(__randomCrystalSounds_note){
			play([4, __randomCrystalSounds_note, __randomCrystalSounds_theoutput, 24]);
			__randomCrystalSounds_timeout = setTimeout(function(){
				__randomCrystalSounds();
			}, __randomCrystalSounds_theoutput);
		});
	});
}
setTimeout(function(){
	__randomCrystalSounds();
}, 500);

// set groove creator
// class name = __grooveCreator
// sitting in channel: [5]
//
var __grooveCreator_timeout;
function __grooveCreator(){
	var __basicInput_CMinor = [(58-__mainKey), (60-__mainKey), (62-__mainKey), (63-__mainKey), (65-__mainKey), (67-__mainKey), (68-__mainKey)]; //60 = C, 58=Bb
	var __basicInput_counts = [4,8,12,16];
	var __basicInput_countsChoice = giveMeABrainWave(1, __basicInput_counts.length, function(__basicInput_countsChoice){
		//calculate beats to live to miliseconds
		__basicInput_countsChoice = __basicInput_counts[__basicInput_countsChoice]*((60/__mainTempo)*1000);	
		var __basicInput_noteChoice = giveMeABrainWave(1, __basicInput_CMinor.length, function(__basicInput_noteChoice){
			__basicInput_noteChoice = __basicInput_CMinor[__basicInput_noteChoice];
			console('Groove '+__basicInput_noteChoice+' for '+__basicInput_countsChoice);
			play([5, __basicInput_noteChoice, __basicInput_countsChoice, 42]);
			__grooveCreator_timeout = setTimeout(function(){
				__grooveCreator();
			}, __basicInput_countsChoice);
		});
		
	});
}
// set drum creator
// class name = __drumCreator
// sitting in channel: [6]
//
var __drumCreator_timeout;
function __drumCreator(){
	__drumCreator_durationchoice = [0.25, 0.25, 0.5, 0.5, 0.5, 0.5]; //0.25 = 16th, 0.5 eight etc.
	var __drumCreator_SoundChoice = giveMeABrainWave(60, 96, function(__drumCreator_SoundChoice){
		var __drumCreator_SoundChoiceNextevent = giveMeABrainWave(0, __drumCreator_durationchoice.length, function(__drumCreator_SoundChoiceNextevent){
			//calculate duration in miliseconds.
			__drumCreator_SoundChoiceNextevent = __drumCreator_durationchoice[__drumCreator_SoundChoiceNextevent]*((60/__mainTempo)*1000);	
			play([6, __drumCreator_SoundChoice, __drumCreator_SoundChoiceNextevent, 58]);
			__drumCreator_timeout = setTimeout(function(){
				__drumCreator()
			}, __drumCreator_SoundChoiceNextevent);
		});
	});
}

// set earth voice
// class name = __earthevoice
// sitting in channel: [7]
//
function __earthevoice(){
	var __earthevoice_SoundChoice = giveMeABrainWave(60, 72, function(__earthevoice_SoundChoice){
			play([7, __earthevoice_SoundChoice, 4000, 127]);
	});
}


// set orchestra effects
// class name = __orchEffect
// sitting in channel: [11]
//
var __orchEffect_timeout;
function __orchEffect(){
	var __orchEffect_SoundChoice = giveMeABrainWave(48, 72, function(__orchEffect_SoundChoice){
		var __orchEffect__SoundChoiceNextevent = giveMeABrainWave(2200, 9000, function(__orchEffect__SoundChoiceNextevent){
			play([11, __orchEffect_SoundChoice, __orchEffect__SoundChoiceNextevent, 58]);
			__orchEffect_timeout = setTimeout(function(){
				__orchEffect()
			}, __orchEffect__SoundChoiceNextevent*3.2);
		});
	});
}




function __hardStop(){
	clearInterval(__randomNewSound_theoutput_timeout);
	clearTimeout(__randomBassSounds_timeout);
	clearTimeout(__randomBassdrumSound_timeout);
	clearTimeout(__randomCrystalSounds_timeout);
	clearTimeout(__grooveCreator_timeout);
	clearTimeout(__drumCreator_timeout);
	clearTimeout(__orchEffect_timeout);
}



//-------------------------------------//
//////
/////
//END COMP
/////
//////