//realizar leitura e gravação de arquivos, modulo nativo file system
var fs = require('fs');

const express = require('express');
//instanciando o express
const app = express();

//fazendo um get
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

//temos que informar para a api que vamos utilizar objetos json para nossas requisições
app.use(express.json());

// req res e a lambda representam a nossa callback, que é a função que será executada quando chega no nosso endereço
app.post('/account', (req, res) => {
  let param = req.body; //pegando parametros
  //método write file cria um file json com a request, e sempre o substitui com um novo
  //fs.writeFile
  //o append file, concatena as requests json  
  //fs.appendFile
  fs.appendFile('accounts.json', JSON.stringify(param), err => {
    console.log(err);
  })//nome do arquivo e json
  //devemos sempre encerrar a request para não ficar uma request eterna
  res.send('response API post account');
});

//iniciar api
app.listen(3000, () => {
  console.log('api started')
})