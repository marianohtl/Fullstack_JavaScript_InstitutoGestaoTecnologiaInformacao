var express = require("express");
var fs = require("fs");
var router = express.Router();


// req res e a lambda representam a nossa callback, que é a função que será executada quando chega no nosso endereço
router.post('/', (req, res) => {
  let account = req.body; //pegando parametros
  //leitura do método/  
  fs.readFile(global.fileName, 'utf8', (err, data) => {
    try {
      //verificando se não deu erro para a leitura do arquivo
      if (err) throw err;

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
    try {
      if (err) throw err;
      let json = JSON.parse(data);
      delete json.nextId;
      res.send(json);
    } catch (error) {
      res.status(400).send({ error: err.message });
    }
  });
});

//aqui usamos o objeto da requisição para pegar o id que necessitamos
router.get("/:id", (req, res) => {

  fs.readFile(global.fileName, 'utf-8', (err, data) => {
    try {
      if (err) {
        throw err;
      }

      let json = JSON.parse(data);
      const account = json.accounts.find(account => account.id === parseInt(req.params.id, 10));
      if (account) {
        res.send(account);
      } else {
        res.end();
      }

    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  });
});

router.delete("/:id", (req, res) => {
  fs.readFile(global.fileName, "utf8", (err, data) => {
    try {
      if (err) throw err;

      let json = JSON.parse(data);
      //retirando da lista de arrays o id == id request
      let accounts = json.accounts.filter(account => account.id !== parseInt(req.params.id, 10));
      //colocando o novo array em json.accounts
      json.accounts = accounts;

      //escrevendo no file
      fs.writeFile(global.fileName, JSON.stringify(json), err => {
        if (err) {
          res.status(400).send({ error: err.message });
        } else {
          res.end();
        }
      });
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  });
});

router.put("/", (req, res) => {
  let newAccount = req.body;
  fs.readFile(global.fileName, "utf8", (err, data) => {
    try {
      if (err) throw err;
      let json = JSON.parse(data);

      let oldIndex = json.accounts.findIndex(account => account.id === newAccount.id);

      //aqui eu pego o array, indico o índice que foi detectado acima e o substituo pelos valores de newAccount
      json.accounts[oldIndex].name = newAccount.name;
      json.accounts[oldIndex].balance = newAccount.balance;

      fs.writeFile(global.fileName, JSON.stringify(json), err => {
        if (err) {
          json.accounts[oldIndex].name = newAccount.name;
          res.status(400).send({ error: err.message });
        } else {
          res.end();
        }
      });

    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  });
});

router.post("/transaction", (req, res) => {
  let params = req.body;
  fs.readFile(global.fileName, "utf8", (err, data) => {
    try {

      if (err) throw err;

      let json = JSON.parse(data);
      let index = json.accounts.findIndex(account => account.id === params.id);


      if ((params.value < 0) && ((json.accounts[index].balance + params.value) < 0)) {
        throw new Error("Não há suficiente.");
      }

      //aqui eu pego o array, indico o índice que foi detectado acima e o substituo pelos valores de newAccount
      json.accounts[index].balance += params.value;

      fs.writeFile(global.fileName, JSON.stringify(json), err => {
        if (err) {
          res.status(400).send({ error: err.message });
        } else {
          res.send(json.accounts[index]);
        }
      });
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  });
});


//exportando o módulo
module.exports = router;