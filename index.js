//realizar leitura e gravação de arquivos, modulo nativo file system
var fs = require('fs');

const express = require('express');
//instanciando o express
const app = express();

var accountsRouter = require("./routes/accounts.js");

//criando uma variável global
global.fileName = "accounts.json";

app.use(express.json());
app.use("/account", accountsRouter);



//fazendo um get
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

//iniciar api
app.listen(3000, function () {
  try {
    fs.readFile(global.fileName, 'utf8', (err, data) => {
      //verificando se arquivo existe, se não existe cria arquivo
      if (err) {
        const initialJson = {
          nextId: 1,
          accounts: []
        };
        fs.writeFile(global.fileName, JSON.stringify(initialJson), err => {
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