// Importar a biblioteca express
const express = require('express');
const app = express();


// Definir uma rota principal para o site
app.get("/", function (req, res) {
    res.send("Seja bem-vindo ao meu site!")
})


// Definindo uma rota passando o nome como parametro
app.get("/ola/:nome", function (req, res) {
    res.send("<h1>Ola, " + req.params.nome + "!</h1>")
})


// Carregando um arquivo html
app.get("/sobre", function (req, res) {
    res.sendFile(__dirname + "/html/sobre.html")
})



// Sempre colocado no final do arquivo
app.listen(8081, function () {
    console.log("Servidor Rodando na url http://localhost:8081");
});
