var commands = require('./commands.js');

// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' eent fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmd = data.toString().trim().split(' ')[0]; // remove the newline
  var args = data.toString().trim().split(' ').slice(1).join(' ');

  if (cmd === 'pwd') {
    commands.pwd(args);
  } else if (cmd === 'date') {
    commands.date(args);
  } else if (cmd === 'ls') {
    commands.ls(args);
  } else if (cmd === 'echo') {
    commands.echo(args);
  } else if (cmd === 'cat') {
    commands.cat(args);
  } else if (cmd === 'head') {
    commands.head(args);
  } else if (cmd === 'tail') {
    commands.tail(args);
  } else if (cmd === 'sort') {
    commands.sort(args);
  } else if (cmd === 'wc') {
    commands.wc(args);
  } else if (cmd === 'uniq') {
    commands.uniq(args);
  }

});
