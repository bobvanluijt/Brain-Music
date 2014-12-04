/*_          _          _      _         _                   
 | |        | |        (_)    | |       | |                  
 | | ___   _| |__  _ __ _  ___| | _____ | | ___   __ _ _   _ 
 | |/ / | | | '_ \| '__| |/ __| |/ / _ \| |/ _ \ / _` | | | |
 |   <| |_| | |_) | |  | | (__|   < (_) | | (_) | (_| | |_| |
 |_|\_\\__,_|_.__/|_|  |_|\___|_|\_\___/|_|\___/ \__, |\__, |
                                                  __/ | __/ |
                                                 |___/ |___/ 
	Composition and code by Bob van Luijt
	You are free to use and dance :-P
												 */
												 
var blessed = require('blessed');
var screen  = blessed.screen();
var brainBox = blessed.box({
  top: 'center',
  left: 'center',
  width: '50%',
  height: '100%',
  left: '39%',
  tags: true,
  //border: {
  //  type: 'line'
  //},
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
var brainBox2 = blessed.box({
  top: 'center',
  left: 'center',
  width: '40%',
  height: '30%',
  left: '30%',
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
screen.key(['escape', 'q', 'C-c', 'C-z', 'enter'], function(ch, key) {
	return process.exit(0);
});

brainBox.focus();
screen.render();

brainBox.insertLine(1, "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
brainBox.insertLine(2, "@@@@@@@@@@@@@@@#:,@@@@@@@@@@@@@@@@");
brainBox.insertLine(3, "@@@@@@@@@@@@@@`@@@@`@@@@@@@@@@@@@@");
brainBox.insertLine(4, "@@@@@@@@@@@@.@@@@@@@@:@@@@@@@@@@@@");
brainBox.insertLine(5, "@@@@@@@@@@''@@@@@@@@@@'#@@@@@@@@@@");
brainBox.insertLine(6, "@@@@@@@@@.@@@@@@@@@@@'@;@@@@@@@@@@");
brainBox.insertLine(7, "@@@@@@@`@@@@@@@@@@@@;@@;@@@@@@@@@@");
brainBox.insertLine(8, "@@@@@:#@@@@@@@@@@@.@@@@;@@@@@@@@@@");
brainBox.insertLine(9, "@@@#:@@@@@@@@@@@:@@@@@+:@@@@@@@@@@");
brainBox.insertLine(10, "@@ @@@@@@@@@@@#;@@@@@,@@@.@@@@@@@@");
brainBox.insertLine(11, "@:@@@@@@@@@@@`@@@@@,@@@@@@@,@@@@@@");
brainBox.insertLine(12, "@  #@@@@@@@.@@@@@##@@@@@@@@@#'@@@@");
brainBox.insertLine(13, "@    @@@@+'@@@@@@#+@@@@@@@@@@@;@@@");
brainBox.insertLine(14, "@     `@`@@@@@@@@@@.@@@@@@@@@@@@,@");
brainBox.insertLine(15, "@      .@@@@@@@@@@@@@`@@@@@@@@@. @");
brainBox.insertLine(16, "@      `@@@@@@@@@@@@@@#'@@@@@'   @");
brainBox.insertLine(17, "@      `@@@@@@@@@@@@@@@@,@@@     @");
brainBox.insertLine(18, "@      `@@@@@@@@@@@@@@@@@@       @");
brainBox.insertLine(19, "@      `@@@@@@@@` @@@@@@@@       @");
brainBox.insertLine(20, "@      `@@@@@@.@@@@,@@@@@@       @");
brainBox.insertLine(21, "@      `@@@@+'@@@@@@;#@@@@       @");
brainBox.insertLine(22, "@      `@@@`@@@@@@@@@@ @@@       @");
brainBox.insertLine(23, "@      `@`@@@@@@@@@@@@@@.@       @");
brainBox.insertLine(24, "@      `+@@@@@@@@@@@@@@@@;       @");
brainBox.insertLine(25, "@       `@@@@@@@@@@@@@@@@        @");
brainBox.insertLine(26, "@         :@@@@@@@@@@@@,         @");
brainBox.insertLine(27, "@           #@@@@@@@@+         @@@");
brainBox.insertLine(28, "@             @@@@@@         +@@@@");
brainBox.insertLine(29, "@              ,@@.           ,@@@");
brainBox.insertLine(30, "@      `                        +@");
brainBox.insertLine(31, "@      `@+                       @");
brainBox.insertLine(32, "@      `@@@.          .@:        @");
brainBox.insertLine(33, "@      `@@@@@        @@@@@       @");
brainBox.insertLine(34, "@      `@@@@@@#    #@@@@@@       @");
brainBox.insertLine(35, "@      `@@@@@@@@,:@@@@@@@@       @");
brainBox.insertLine(36, "@      `@@@@@@@@@@@@@@@@@@       @");
brainBox.insertLine(37, "@      `@@@@@@@@@@@@@@@@@@       @");
brainBox.insertLine(38, "@      `@@@@@@@@@@@@@@@@@@       @");
brainBox.insertLine(39, "@      `@@@@@@@@@@@@@@@@@@       @");
brainBox.insertLine(40, "@      `@@@@@@@@@@@@@@@@@@       @");
brainBox.insertLine(41, "@      `@@@@@@@#:,@@@@@@@@       @");
brainBox.insertLine(42, "@      `@@@@@@`@@@@`@@@@@@       @");
brainBox.insertLine(43, "@'     `@@@@,@@@@@@@@:@@@@      +@");
brainBox.insertLine(44, "@@@.   `@@#'@@@@@@@@@@;#@@    ,@@@");
brainBox.insertLine(45, "@@@@@  `@`@@@@@@@@@@@@@@`@   @@@@@");
brainBox.insertLine(46, "@@@@@@# @@@@@@@@@@@@@@@@@@ #@@@@@@");
brainBox.insertLine(47, "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
screen.render();

setTimeout(function(){
	screen.append(brainBox2);
	brainBox2.setLine(1, "Connect to Muse Brain Brain Sensing Headband");
	brainBox2.focus();
	screen.render();
}, 900);

setTimeout(function(){
	brainBox2.setLine(2, "Bluetooth connection [               ]");
	brainBox2.focus();
	screen.render();
}, 2200);
setTimeout(function(){
	brainBox2.setLine(2, "Bluetooth connection [::             ]");
	brainBox2.focus();
	screen.render();
}, 2280);
setTimeout(function(){
	brainBox2.setLine(2, "Bluetooth connection [:::::          ]");
	brainBox2.focus();
	screen.render();
}, 2400);
setTimeout(function(){
	brainBox2.setLine(2, "Bluetooth connection [:::::::        ]");
	brainBox2.focus();
	screen.render();
}, 2500);
setTimeout(function(){
	brainBox2.setLine(2, "Bluetooth connection [::::::::::::   ]");
	brainBox2.focus();
	screen.render();
}, 2540);
setTimeout(function(){
	brainBox2.setLine(2, "Bluetooth connection [:::::::::::::::]");
	brainBox2.focus();
	screen.render();
}, 2590);
setTimeout(function(){
	brainBox2.setLine(2, "Bluetooth connection [     CHECK     ]");
	brainBox2.focus();
	screen.render();
}, 2690);








setTimeout(function(){
	brainBox2.setLine(3, "EEG SCAN DUMP        [    WAITING    ]");
	brainBox2.focus();
	screen.render();
}, 4200);
setTimeout(function(){
	brainBox2.setLine(3, "EEG SCAN DUMP        [ TRANSMITTING  ]");
	brainBox2.focus();
	screen.render();
}, 4800);
setTimeout(function(){
	brainBox2.setLine(3, "EEG SCAN DUMP        [     CHECK     ]");
	brainBox2.focus();
	screen.render();
}, 4200);

setTimeout(function(){
	brainBox2.setLine(4, "RECEIVING -> TRANSLATE TO MIDI BINARY");
	brainBox2.focus();
	screen.render();
}, 6200);

setTimeout(function(){
	brainBox2.setLine(4, "LOADING MUSIC...");
	brainBox2.focus();
	screen.render();
}, 7800);


setTimeout(function(){
	require('./COMPOSITION001.js');
}, 9200);