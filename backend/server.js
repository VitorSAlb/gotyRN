const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 3000;

// Cria uma conexão com o banco de dados GOTY.db se estiver criado, se não, cria o banco de dados
const db = new sqlite3.Database('GOTY.db', (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Conexão estabelecida com sucesso.');
    }
  });

// Cria uma tabela cao ela não exista no banco de dados GOTY.db
db.run(
    `CREATE TABLE IF NOT EXISTS Jogos(
        JogosID INTEGER PRIMARY KEY AUTOINCREMENT,
        JogosNome TEXT,
        ImagemJogo TEXT,
        PlataformaNome TEXT,
        GeneroNome TEXT,
        Descricao TEXT,
        DataDeLancamento DATE,
        Nota FLOAT,
        Avaliacoes INTEGER
    )`,
    (err)=>{
        if(err){
            console.error(err);
        }else{
            console.log("Tabela Jogos criada com sucesso.");
        }
    }
);

function obterTodosOsJogos(callback) {
    const sql = 'SELECT * FROM Jogos';
  
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Erro ao obter todos os jogos:', err.message);
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
  }

function obterJogoPorId(jogoId, callback) {
    const sql = 'SELECT * FROM Jogos WHERE JogosID = ?';
  
    db.get(sql, [jogoId], (err, row) => {
        if (err) {
            console.error('Erro ao obter o jogo:', err.message);
            callback(err, null);
        } else {
            callback(null, row);
        }
    });
}

function adicionarJogo(novoJogo) {
    const { JogosNome, ImagemJogo, PlataformaNome, GeneroNome, Descricao, DataDeLancamento } = novoJogo;
    const sql = 'INSERT INTO Jogos ( JogosNome, ImagemJogo, PlataformaNome, GeneroNome, Descricao, DataDeLancamento) VALUES (?, ?, ?, ?, ?, ?)';
  
    db.run(sql, [JogosNome, ImagemJogo, PlataformaNome, GeneroNome, Descricao, DataDeLancamento], (err) => {
      if (err) {
        console.error('Erro ao adicionar o jogo:', err.message);
      } else {
        console.log('Jogo adicionado com sucesso!');
      }
    });
  }

  function editarJogo(jogoId, novosDados, callback) {
    const { JogosNome, ImagemJogo, PlataformaNome, GeneroNome, Descricao, DataDeLancamento } = novosDados;
    const sql = 'UPDATE Jogos SET JogosNome = ?, ImagemJogo = ?, PlataformaNome = ?, GeneroNome = ?, Descricao = ?, DataDeLancamento = ? WHERE JogosID = ?';
  
    db.run(sql, [JogosNome, ImagemJogo, PlataformaNome, GeneroNome, Descricao, DataDeLancamento], (err) => {
      if (err) {
        console.error('Erro ao editar o jogo:', err.message);
        callback(err);
      } else {
        callback(null);
      }
    });
  }

  function excluirJogo(jogoId, callback) {
    const sql = 'DELETE FROM Jogos WHERE JogosID = ?';
  
    db.run(sql, [jogoId], (err) => {
      if (err) {
        console.error('Erro ao excluir o jogo:', err.message);
        callback(err);
      } else {
        callback(null);
      }
    });
  }

// Agora vamos criar o servidor e trazer as informações do bd para o servidor.
const server = http.createServer((req, res)=>{
    // Para permitir os CORS e que não tenha problema en este exemplo.
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    // Retorna todas as informações para o servidor.
    search((result)=>{
        res.write(JSON.stringify(result));
        res.end();
    });
    }
);

app.get('/obterTodosOsJogos', (req, res) => {
    obterTodosOsJogos((err, jogos) => {
      if (err || !jogos) {
        res.status(500).send('Erro ao obter jogos');
      } else {
        res.json(jogos);
      }
    });
  });

app.get('/obterJogo/:id', (req, res) => {
    const jogoId = req.params.id;
    obterJogoPorId(jogoId, (err, jogo) => {
      if (err || !jogo) {
        res.status(404).send('Jogo não encontrado');
      } else {
        res.json(jogo);
      }
    });
  });

app.put('/editarJogo/:id', (req, res) => {
    const jogoId = req.params.id;
    const novosDados = req.body;
  
    editarJogo(jogoId, novosDados, (err) => {
      if (err) {
        res.status(500).send('Erro ao editar o jogo');
      } else {
        res.send('Jogo editado com sucesso!');
      }
    });
});

  // Example endpoint to add a new Jogo
  app.post('/api/jogos', (req, res) => {
    const novoJogo = req.body;
    adicionarJogo(novoJogo);
    res.send('Jogo adicionado com sucesso!');
  });

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  
  // Middleware to parse JSON in requests
  app.use(express.json());
  
  // Start the server
  app.listen(port, () => {
    console.log(`Servidor escutando no porto ${port}`);
  });