'use strict';

const { SerialPort } = require('serialport');
const { ByteLengthParser } = require('@serialport/parser-byte-length');

let argv;
const ttl = "Serial port Bridge v0.0.1";

if (require.main === module) {
  main({ argv: process.argv })
}

function main(options) {
  argv = options.argv

  if (argv.length > 3) {
    onEnabled();
  } else {
    onUsage();
  }
}

function onUsage() {
  // Usage
  process.stdout.write(ttl + " by nobu24\n\n");
  process.stdout.write("usage:\n");
  process.stdout.write("  node serial <Serial port Name> <Serial port Name>\n\n");

  // Serial port list
  process.stdout.write("Serial port list:\n");
  SerialPort.list().then((list)=>{
    list.forEach((port)=>{
      process.stdout.write("  [" + port.path + "] " + port.friendlyName + "\n");
    });
    process.stdout.write("\n");

    process.exit();
  })
  .catch(err => console.log(err));
}

function onEnabled() {
  let st = 2;

  const portName1 = argv[st];
  const portName2 = argv[st + 1];

  // Serial1
  process.stdout.write("Serial port 1: " + portName1 + "\n");

  // Serial2
  process.stdout.write("Serial port 2: " + portName2 + "\n");

  // Bridge
  process.stdout.write("Ready!\n");
  serialbridge(portName1, portName2);
}

function serialbridge(portName1, portName2) {
  const sp1 = new SerialPort({
    path: portName1,
    baudRate: 38400,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
  });
  const sp2 = new SerialPort({
    path: portName2,
    baudRate: 38400,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
  });

  const parser1 = sp1.pipe(new ByteLengthParser({length:1}));
  const parser2 = sp2.pipe(new ByteLengthParser({length:1}));

  parser1.on('data', (data)=>{
    sp2.write(data);
  });
  parser2.on('data', (data)=>{
    sp1.write(data);
  });
}

