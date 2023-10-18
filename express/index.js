// Importar a biblioteca express
const express = require('express');
const app = express();

// Constante que vai receber o módulo bodyParser
const bodyParser = require('body-parser')
//BodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Importando a biblioteca de mysql
const mysql = require('mysql2');


// Configuração da conexão com o banco de dados MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'usuario'
});

// Testando a conexão
connection.connect((err) => {
    if (err) {
        console.error('Erro na conexão com o MySQL:', err);
        return;
    }
    console.log('Conectado ao MySQL');
});


// Rota para criar um registro
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


 // Rota para buscar registros
app.get('/ler', (req, res) => {
    const sql = 'SELECT * FROM usuarios';
    connection.query(sql, (err, results) => {
      if (err) {
        console.error('Erro ao buscar registros:', err);
        res.status(500).json({ mensagem: 'Erro ao buscar registros' });
        return;
      }
  
      res.status(200).json(results);
    });
  });


// Rota para excluir um registro
app.get('/deletar/:id', (req, res) => {
    const { id } = req.params;
  
    const sql = 'DELETE FROM usuarios WHERE id = ?';
    connection.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Erro ao excluir o registro:', err);
        res.status(500).json({ mensagem: 'Erro ao excluir o registro' });
        return;
      }
  
      res.status(200).json({ mensagem: 'Registro excluído com sucesso' });
    });
  });

//   // Rota para atualizar um registro
// app.put('/atualizar/:id', (req, res) => {
//     const { id } = req.params;
//     const { nome, email } = req.body;
  
//     const sql = 'UPDATE usuarios SET nome = ?, email = ? WHERE id = ?';
//     connection.query(sql, [nome, email, id], (err, result) => {
//       if (err) {
//         console.error('Erro ao atualizar o registro:', err);
//         res.status(500).json({ mensagem: 'Erro ao atualizar o registro' });
//         return;
//       }
  
//       res.status(200).json({ mensagem: 'Registro atualizado com sucesso' });
//     });
//   });


app.get('/editar/:id', (req, res) => {
    const { id } = req.params;
  
    // Execute a consulta SQL para buscar o registro com base no ID
    const sql = 'SELECT * FROM usuarios WHERE id = ?';
    connection.query(sql, [id], (err, resultados) => {
      if (err) {
        console.error('Erro ao buscar o registro para edição:', err);
        res.status(500).json({ mensagem: 'Erro ao buscar o registro para edição' });
        return;
      }
  
      if (resultados.length > 0) {
        // Renderize um formulário de edição com os dados do registro
        res.sendFile(__dirname + "/html/formulario_editar.html", { registro: resultados[0] });
      } else {
        res.status(404).json({ mensagem: 'Registro não encontrado' });
      }
    });
  });
  











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

// Carregando um arquivo html
app.get("/inserir", function (req, res) {
    res.sendFile(__dirname + "/html/formulario.html")
})


// Carregando um arquivo html
app.get("/listar", function (req, res) {
    res.sendFile(__dirname + "/html/index.html")
})




// Sempre colocado no final do arquivo
app.listen(8081, function () {
    console.log("Servidor Rodando na url http://localhost:8081");
});
