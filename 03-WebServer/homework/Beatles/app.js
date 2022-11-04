var http = require('http');
var fs   = require('fs');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]

http.createServer((req,res)=>{
 
  if (req.url === "/api") {
    res.writeHead(200,{'content-type':'application/json'});
    res.end(JSON.stringify(beatles))
  }

  if (req.url.substring(0,5) === `/api/`) {
    let searchWord = req.url.split('/').pop(); // searchWord = /api/name%20name ___ 
                                               // searchWord = name%20name  <-----|

    let beatleFound = beatles.find(beatle => beatle.name.toLowerCase() === searchWord.replace('%20', ' ').toLowerCase())
    
    if (beatleFound) {
      res.writeHead(200,{'content-type':'application/json'})
      return res.end(JSON.stringify(beatleFound))
    }
    res.writeHead(404,{'content-type':'text/html,charset=utf-8'})
    return res.end('no encontrado')

  }
  
  if (req.url === "/") {
    res.writeHead(200,{'content-type':'text/html'});
    new Promise((resolve, reject)=>{
      fs.readFile('./index.html', 'utf-8',(err,data) =>{
        if (err) reject(err)
        resolve(data)
      })
    })
    .then(result => {
      return res.end(result)
    })
  }

  if (req.url[0] === '/' && req.url.length > 1) {

    let searchWord = req.url.split('/').pop(); // searchWord = /api/name%20name ___ 
                                               // searchWord = name%20name  <-----|

    let beatleFound = beatles.find(beatle => beatle.name.toLowerCase() === searchWord.replace('%20', ' ').toLowerCase())

    if (beatleFound) {
      res.writeHead(200,{'content-type':'text/html'});
      new Promise((resolve, reject)=>{
        fs.readFile('./beatle.html', 'utf-8',(err,data) =>{
          if (err) reject(err)
          resolve(data)
        })
      })
      .then(result => {
        result = result.replace(/name/g, beatleFound.name)  //con la "g" todas las variables del html con {name} lo va a cambiar 
        result = result.replace('{birthdate}', beatleFound.birthdate) 
        result = result.replace('{profilePic}', beatleFound.profilePic) 
        return res.end(result)
      })
    }else{
      res.writeHead(404,{'content-type':'text/html,charset=utf-8'})
      return res.end('no encontrado')
    }

    
  }

  // res.writeHead(200,{'content-type':'application/json'});
  // beatles.map(date => {
  //   if (req.url === `/api/${date.name}`) {
  //     res.writeHead(200,{'content-type':'text/plane'});
  //     res.end(date)
  //   }
  // })
}).listen(3000, '127.0.0.1')
