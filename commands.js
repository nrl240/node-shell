module.exports = {
  'pwd': pwd,
  'date': date,
  'ls': ls,
  'echo': echo,
  'cat': cat,
  'head': head,
  'tail': tail,
  'sort': sort,
  'wc': wc,
  'uniq': uniq
}

var fs = require('fs');

function pwd(args) {
  process.stdout.write(__dirname);
  process.stdout.write('\nprompt > ');
};

function date(args) {
  process.stdout.write(new Date(Date.now()).toString());
  process.stdout.write('\nprompt > ');
}

function ls(args) {
  fs.readdir('.', function(err, files) {
    if (err) throw err;
    files.forEach(function(file) {
      process.stdout.write(file.toString() + "\n");
    });
    process.stdout.write('prompt > ');
  })
}

function echo(argsString) {
  var args = argsString.split(' ');
  var argsToPrint = [];

  args.forEach(function(arg) {
    if (arg[0] === '$') {
      var envVar = process.env[arg.slice(1)];
      argsToPrint.push(envVar);
    } else {
      argsToPrint.push(arg);
    }
  });

  process.stdout.write(argsToPrint.join(' '));
  process.stdout.write('\nprompt > ');
}

function cat(filenames, i) {
  var filenames = filenames.split(' ');
  var i = i || 0;
  fs.readFile(filenames[i], function(err, data) {
    if (err) throw err;
    process.stdout.write(data.toString());
    i++;
    if (i === filenames.length) {
      process.stdout.write('\nprompt > ');
    } else {
      cat(filenames.join(' '), i);
    }
  });
}

function head(filenames, i) {
  var filenames = filenames.split(' ');
  var i = i || 0;
  fs.readFile(filenames[i], function(err, data) {
    if (err) throw err;
    var lines = data.toString().split('\n');
    const numLines = 5;
    var linesToWrite = [];

    if (filenames.length > 1) {
      var header = '==>' + filenames[i] + '<==\n'
      if (i > 0) {
        header = '\n' + header; // Add newline to start new file block
      }
      process.stdout.write(header);
    }
    for (var j = 0; j < numLines; j++) {
      linesToWrite.push(lines[j]);
    }

    process.stdout.write(linesToWrite.join('\n'));

    i++;
    if (i === filenames.length) {
      process.stdout.write('\nprompt > ');
    } else {
      head(filenames.join(' '), i);
    }
  });
}

function tail(filenames, i) {
  var filenames = filenames.split(' ');
  var i = i || 0;
  fs.readFile(filenames[i], function(err, data) {
    if (err) throw err;
    var lines = data.toString().split('\n');
    const numLines = 5;
    var linesToWrite = [];
    lines = lines.slice(lines.length - numLines);

    if (filenames.length > 1) {
      process.stdout.write('==>' + filenames[i] + '<==\n')
    }
    for (var j = 0; j < numLines; j++) {
      linesToWrite.push(lines[j]);
    }

    process.stdout.write(linesToWrite.join('\n'));

    i++;
    if (i === filenames.length) {
      process.stdout.write('\nprompt > ');
    } else {
      head(filenames.join(' '), i);
    }
  });
}

function sort(filename) {
  fs.readFile(filename, function(err, data) {
    if (err) throw err;
    var lines = data.toString().split('\n');
    lines.sort()

    process.stdout.write(lines.join('\n'));
    process.stdout.write('\nprompt > ');

  });
}

function wc(filename) {
  fs.readFile(filename, function(err, data) {
    if (err) throw err;
    var lines = data.toString().split('\n');
    const numLines = lines.length;

    process.stdout.write(numLines + ' ' + filename);
    process.stdout.write('\nprompt > ');

  });
}

function uniq(filename) {
  fs.readFile(filename, function(err, data) {
    if (err) throw err;
    var lines = data.toString().split('\n');
    var linesToPrint = []
    var prevLine = null;
    for (var i = 0; i < lines.length; i++) {
      if (lines[i] !== prevLine) {
        linesToPrint.push(lines[i]);
      }
      prevLine = lines[i];
    }

    process.stdout.write(linesToPrint.join('\n'));
    process.stdout.write('\nprompt > ');

  });
}
