var menu   = require('terminal-menu')({ x: 0, y: 0 });
var midi   = require('midi');
var output = new midi.output();
var input  = new midi.input();

menu.reset();
menu.write('BRAINWAVE MUSIC\n');
menu.write('(c) 2014 bobvanluijt.com \n');
menu.write('-------------------------\n');
menu.add('show active MIDIports');
menu.add('enable MIDIport MUSE001');
menu.add('listen to MIDI signals');
menu.write('-------------------------\n');
menu.add('send test signals to MUSE001');
menu.write('-------------------------\n');
menu.add('PLAY COMPOSITION I');
menu.add('EXIT');

menu.on('select', function (label) {
    menu.close();
    console.log('SELECTED: ' + label);
});

menu.createStream().pipe(process.stdout);

