const express = require('express');
const app = express();
const sumArrayNum = require('./functions/app')

app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.send({
    message: 'hola',
  });
});

app.get('/test', (req, res) => {
  res.send({
    message: 'test',
  });
});

app.post('/sum',(req,res)=>{
  res.send({
    result: req.body.a + req.body.b,
  });
})

app.post('/product', (req, res) => {
  res.send({
    result: req.body.a * req.body.b,
  });
});

app.post('/sumArray',(req,res)=>{
  const {array , num} = req.body
  return res.send({
    result: sumArrayNum(array,num)
  })
  
})

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
