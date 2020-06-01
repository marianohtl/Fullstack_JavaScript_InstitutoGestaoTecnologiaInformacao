//importação
var express = require("express");
//instância
var app = express();

//rota requisição
app.get("/", function (req, res) { res.send("Hello World") });

//iniciando a api  > porta e call back (o que deve ser executado)
app.listen(3000, function () {
  console.log("API Started!");
});