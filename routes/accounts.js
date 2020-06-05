var express = require("express");
var fs = require("fs");
var router = express.Router();


// req res e a lambda representam a nossa callback, que é a função que será executada quando chega no nosso endereço
router.post('/', (req, res) => {
  let account = req.body; //pegando parametros
  //leitura do método/  
  fs.readFile(global.fileName, 'utf8', (err, data) => {
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
            res.status(400).send({ error: err.message });

          } else {
            res.send("post-account");
            res.end();
          }
        });
      } catch (err) {
        res.status(400).send({ error: err.message });
      }
    } else {
      res.status(400).send({ error: err.message });
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

//estamos respondendo na raiz do /account, pela outra page
router.get('/', (_, res) => {
  fs.readFile(global.fileName, 'utf-8', (err, data) => {
    if (!err) {
      let json = JSON.parse(data);
      delete json.nextId;
      res.send(json);
    } else {
      res.status(400).send({ error: err.message });
    }
  });
});

//exportando o módulo
module.exports = router;