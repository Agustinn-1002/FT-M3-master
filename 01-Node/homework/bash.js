var fs = require('fs');

const done = function(output) { 
    // muestra el output // muestra el prompt 
    process.stdout.write(output);
    process.stdout.write("\nprompt > ");
}

const commands = require('./commands');
// Output un prompt
process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
  var argm = data.toString().trim().split(' '); //echo Hola mundo ==> ['echo','hola','mundo']
  var cmd = argm.shift(); //cmd = echo; argm = ['hola','mundo']

  if(commands[cmd]) {
    commands[cmd](argm,done)
  }else{
    done(cmd+" not found");
  }
});

