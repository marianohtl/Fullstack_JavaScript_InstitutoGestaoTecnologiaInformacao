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
  let account = req.body; //pegando parametros
  //leitura do método/  
  fs.readFile('accounts.json', 'utf8', (err, data) => {
    //verificando se não deu erro para a leitura do arquivo
    if (!err) {
      try {

        let json = JSON.parse(data);
        console.log(json);
        account = { id: json.nextId++, ...account };

        json.accounts.push(account);
        //reescevendo o arquivo
        fs.writeFile('accounts.json', JSON.stringify(json), err => {
          if (err) {
            console.log(err);
          } else {
            res.send("post-account");
          }
        });
      } catch (err) {
        res.status(400).res({ error: err.message });
      }
    } else {
      console.log("erro de leitura");
      res.send("erro de leitura");
    }
  });



  //método write file cria um file json com a request, e sempre o substitui com um novo
  //fs.writeFile
  //o append file, concatena as requests json  
  //fs.appendFile
  // fs.appendFile('accounts.json', JSON.stringify(param), err => {
  //   console.log(err);
  // })
  //nome do arquivo e json
});

//iniciar api
app.listen(3000, function () {
  try {
    fs.readFile('accounts.json', 'utf8', (err, data) => {
      //verificando se arquivo existe, se não existe cria arquivo
      if (err) {
        const initialJson = {
          nextId: 1,
          accounts: []
        };
        fs.writeFile('accounts.json', JSON.stringify(initialJson), err => {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
  console.log('api started');
});