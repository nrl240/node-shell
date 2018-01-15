var commands = require('./commands.js');

// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' eent fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmdList = data.toString().split(/\s*\|\s*/g);
  // var args = data.toString().trim().split(' ').slice(1).join(' ');
  var currentCmdIdx = 0;
  var args = [];
  var trimmedCmds = [];

  for (var i = 0; i < cmdList.length; i++) {
    args.push(cmdList[i].trim().split(' ').slice(1).join(' '));
    trimmedCmds.push(cmdList[i].split(' ')[0]);
  }

  function done(output) {
    if(currentCmdIdx === cmdList.length - 1) {
      process.stdout.write(output);
      process.stdout.write('\nprompt > ');
    } else {
      console.log('DONE');
      console.log(trimmedCmds[currentCmdIdx], output);
      executeCmd(trimmedCmds[currentCmdIdx], output, args[currentCmdIdx], done);
      currentCmdIdx++;
    }
  }
  console.log(trimmedCmds);
  console.log(args);
  executeCmd(trimmedCmds[currentCmdIdx], null, args[currentCmdIdx], done);

});

function executeCmd(cmd, stdin, args, done) {
  if (cmd === 'pwd') {
    commands.pwd(stdin, args, done);
  } else if (cmd === 'date') {
    commands.date(stdin, args, done);
  } else if (cmd === 'ls') {
    commands.ls(stdin, args, done);
  } else if (cmd === 'echo') {
    commands.echo(stdin, args, done);
  } else if (cmd === 'cat') {
    commands.cat(stdin, args, done);
  } else if (cmd === 'head') {
    commands.head(stdin, args, done);
  } else if (cmd === 'tail') {
    commands.tail(stdin, args, done);
  } else if (cmd === 'sort') {
    commands.sort(stdin, args, done);
  } else if (cmd === 'wc') {
    commands.wc(stdin, args, done);
  } else if (cmd === 'uniq') {
    commands.uniq(stdin, args, done);
  } else if (cmd === 'curl') {
    commands.curl(stdin, args, done);
  }
}
