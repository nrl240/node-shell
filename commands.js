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
  'uniq': uniq,
  'curl': curl
}

var fs = require('fs');

function pwd(stdin, args, done) {
  done(__dirname);
};

function date(stdin, args, done) {
  done(new Date(Date.now()).toString());
}

function ls(stdin, args, done) {
  var filenamesToPrint = [];
  fs.readdir('.', function(err, files) {
    if (err) throw err;
    files.forEach(function(file) {
      filenamesToPrint.push(file.toString());
    });
    done(filenamesToPrint.join('\n'));
  })
}

function echo(stdin, argsString, done) {
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

  // process.stdout.write(argsToPrint.join(' '));
  // process.stdout.write('\nprompt > ');
  done(argsToPrint.join(' '));
}

function cat(stdin, filenames, done, i) {
  console.log("HERE");
  var filenames = filenames.split(' ');
  var i = i || 0;
  fs.readFile(filenames[i], function(err, data) {
    if (err) throw err;
    i++;
    if (i === filenames.length) {
      done(data.toString());
    } else {
      process.stdout.write(data.toString());
      cat(filenames.join(' '), done, i);
    }
  });
}

function head(stdin, filenames, done, i) {
  var filenames = filenames.split(' ');
  var i = i || 0;

  function processFile(data) {
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

    i++;
    if (i === filenames.length) {
      done(linesToWrite.join('\n'));
    } else {
      process.stdout.write(linesToWrite.join('\n'));
      head(filenames.join(' '), done, i);
    }
  }

  if (filenames) {
    fs.readFile(filenames[i], function(err, data) {
      if (err) throw err;
      processFile(data);
    });
  } else {
    processFile(stdin);
  }
}

function tail(filenames, done, i) {
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


    i++;
    if (i === filenames.length) {
      done(linesToWrite.join('\n'));
    } else {
      process.stdout.write(linesToWrite.join('\n'));
      head(filenames.join(' '), done, i);
    }
  });
}

function sort(filename, done) {
  fs.readFile(filename, function(err, data) {
    if (err) throw err;
    var lines = data.toString().split('\n');
    lines.sort()

    done(lines.join('\n'));
  });
}

function wc(filename, done) {
  fs.readFile(filename, function(err, data) {
    if (err) throw err;
    var lines = data.toString().split('\n');
    const numLines = lines.length;

    done(numLines + ' ' + filename);
  });
}

function uniq(filename, done) {
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

    done(linesToPrint.join('\n'));
  });
}

function curl(url, done) {
  var request = require('request');
  request(url, function (err, response, body) {
    if (err) throw err;
    done(body);
  });
}

