var fs = require('fs');
var request = require('request');

module.exports = {
    pwd: function() {process.stdout.write(process.cwd())},

    date: function() {process.stdout.write(Date())},
    
    echo: function (data){process.stdout.write(data.join(' '))},
    
    ls: function(file, done) {
        var output = "";
        fs.readdir('.', function(err, files) {
          files.forEach(function(file) {
            output += file.toString() + "\n";
          })
          done(output);
        });},
    
    cat: function(arg,done){
        fs.readFile(arg[0] ,function(err, data){
            if(err) throw err;
            done(data)
        })
    },

    head: function (arg,done){
        fs.readFile(arg[0],'utf8',function(err,data){ //--> al manipular la data le pasamos como un parametro mas el 'utf8'
            if (err) throw err;
            const primerasLineas = data.split("\n").slice(0,7).join('\n');
            done(primerasLineas)
        })
    },

    tail: function (arg,done){
        fs.readFile(arg[0],'utf8',function(err,data){ //--> al manipular la data le pasamos como un parametro mas el 'utf8'
            if (err) throw err;
            const ultimasLineas = data.split("\n").slice(7).join('\n');
            done(ultimasLineas)
        })
    },

    curl: function(arg,done){
        request(arg[0], function(err, response, body){
            if (err) throw err;
            done(body)
        })
    }
}

