// Importar a biblioteca do express
const express = require('express');
const app = express();

// importar a biblioteca body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Importar a biblioteca do mysql
const mysql = require('mysql2');

// Configuração com o servidor mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database:'teste',
});


// Testando a conexão
connection.connect((err)=>{
    if(err){
        console.error("Erro na conexão",err);
        return; 
    }
    console.log("Conexão realizada com sucesso!")
})



// Definir rota para acessar o formulário
app.get("/inserir", function(req,res){
    res.sendFile(__dirname+"/html/formulario.html");
});

//Ler os dados do banco
app.get('/ler', (req, res)=>{
    const sql = 'SELECT * FROM usuarios';
    connection.query(sql,(err, results)=>{
        if(err){
            console.error('Erro ao buscar registros:', err);
            res.status(500).json({mensagem:'Erro ao buscar registros'});
            return;
        }
        res.status(200).json(results);
    });
});

// Rota para criar um registro no banco
app.post('/criar', (req, res) => {
    const { nome, email } = req.body;

    const sql = 'INSERT INTO usuarios (nome, email) VALUES (?, ?)';
    connection.query(sql, [nome, email], (err, result) => {
      if (err) {
        console.error('Erro ao criar o registro:', err);
        res.status(500).json({ mensagem: 'Erro ao criar o registro' });
        return;
      } 

        res.status(201).json({ mensagem: 'Registro criado com sucesso' });
  
        });
  });

// Deletar
app.get('/deletar/:id',(req,res)=>{
    const { id } = req.params;

    const sql = 'DELETE FROM usuarios WHERE id = ?';
    connection.query(sql, [id],(err,result)=>{
        if(err){
            console.error('Erro ao excluir registro', err);
            res.status(500).json({mensagem:'Erro ao excluir registro'});
            return;
        }
        res.status(200).json({mensagem:'Registro excluído com sucesso'});
    });
})



// Definir uma rota principal para o site
app.get("/", function(req,res){
    res.send("Seja bem vindo ao meu site!");
}); 


app.get("/ola/:nome", function(req,res){
    res.send("Olá, " + req.params.nome + "!")
})

app.get("/sobre", function(req, res){
    res.sendFile(__dirname+"/html/sobre.html");
})

app.get("/listar", function(req, res){
    res.sendFile(__dirname+"/html/index.html");
})

// Definindo   onde será executado
app.listen(8081, function(){
    console.log("Servidor rodando na url: http://localhost:8081 ")
})
