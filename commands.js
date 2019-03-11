const fs = require('fs');

function done(output) {
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
}

function evaluateCmd(userInput) {
  const userInputArray = userInput.split(' ');
  const command = userInputArray[0];

  switch (command) {
    case 'echo':
       commandLibrary.echo(userInputArray.slice(1).join(' '));
       break;
    case 'cat':
       commandLibrary.cat(userInputArray.slice(1));
       break;
    case 'head':
      commandLibrary.head(userInputArray.slice(1));
    case 'tail':
      commandLibrary.tail(userInputArray.slice(1));
    default:
      done('This command does not exist');
  }
}

const commandLibrary = {
  'echo': function(userInput) {
    done(userInput);
  },

  'cat': function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      done(data);
    });
  },

  'head': function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      done(data.slice(0, data.toString().search('\n')));
    });
  },

  'tail': function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      done(data.slice(data.toString().lastIndexOf('\n'), data.length))
    })
  }

};

const reverseString = (input => {
  res = input.split('');
  res.reverse().join('');
  return res;
});

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
module.exports.reverseString = reverseString;
