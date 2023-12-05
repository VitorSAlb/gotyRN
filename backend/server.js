const express = require('express');
const app = express();
const http = require('http');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json({ limit: '10mb'}));
const port = 3000;

//------------------------------------------------------
// BANCO DE DADOS E TABELAS 

  // CRIA A CONEXÃO COM O BANCO DE DADOS, CASO NÃO EXISTA, CRIA UM NOVO DB CHAMADO 'GOTY.db'
    const db = new sqlite3.Database('GOTY.db', (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Conexão estabelecida com sucesso.');
        }
      });

  // -----------------------------------------------------
  // CRIAÇÃO DE TABELAS PARA JOGOS, PLATAFORMAS E USUARIOS

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

  db.run(
      `CREATE TABLE IF NOT EXISTS Usuarios(
          UsuariosID INTEGER PRIMARY KEY AUTOINCREMENT,
          UsuarioNome TEXT,
          Username TEXT,
          UsuarioEmail TEXT,
          UsuarioSenha TEXT,
          dataDeNascimento TEXT,
          Ativo BOOLEAN
      )`,
      (err)=>{
          if(err){
              console.error(err);
          }else{
              console.log("Tabela Usuarios criada com sucesso.");
          }
      }
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS Plataformas(
        PlataformaID INTEGER PRIMARY KEY AUTOINCREMENT,
        PlataformaNome TEXT,
        Descricao TEXT
    )`,
    (err)=>{
        if(err){
            console.error(err);
        }else{
            console.log("Tabela Plataforma criada com sucesso.");
        }
    }
  );

// -----------------------------------------------------
// FUNÇÕES TABELA JOGOS

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
      const sql = 'INSERT INTO Jogos ( JogosNome, ImagemJogo, PlataformaNome, GeneroNome, Descricao, DataDeLancamento, Nota, Avaliacoes) VALUES (?, ?, ?, ?, ?, ?, 0, 0)';
    
      db.run(sql, [JogosNome, ImagemJogo, PlataformaNome, GeneroNome, Descricao, DataDeLancamento], (err) => {
        if (err) {
          console.error('Erro ao adicionar o Jogo:', err.message);
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

// -----------------------------------------------------
// FUNÇÕES TABELA USUARIOS

  function adicionarUsuario(novoUsuario) {
    const { UsuarioNome, Username, UsuarioEmail, UsuarioSenha, dataDeNascimento, Ativo } = novoUsuario;
    const sql = 'INSERT INTO Usuarios ( UsuarioNome, Username, UsuarioEmail, UsuarioSenha, dataDeNascimento, Ativo ) VALUES (?, ?, ?, ?, ?, 1)';
  
    db.run(sql, [UsuarioNome, Username, UsuarioEmail, UsuarioSenha, dataDeNascimento], (err) => {
      if (err) {
        console.error('Erro ao adicionar o Usuario:', err.message);
      } else {
        console.log('Usuario adicionado com sucesso!');
      }
    });
  }

  function realizarLogin(UsuarioEmail, UsuarioSenha, callback) {
    const sqlSelect = 'SELECT * FROM Usuarios WHERE UsuarioEmail = ? AND UsuarioSenha = ?';
    const sqlUpdate = 'UPDATE Usuarios SET Ativo = 1 WHERE UsuariosID = ?';
  
    db.get(sqlSelect, [UsuarioEmail, UsuarioSenha], (err, row) => {
      if (err) {
        console.error('Erro ao realizar login:', err.message);
        callback(err, null);
      } else if (!row) {
        callback(null, null); // Usuário ou senha inválidos
      } else {
        const usuarioId = row.UsuariosID;
  
        // Marcar o usuário como ativo
        db.run(sqlUpdate, [usuarioId], (errUpdate) => {
          if (errUpdate) {
            console.error('Erro ao marcar o usuário como ativo:', errUpdate.message);
            callback(errUpdate, null);
          } else {
            callback(null, row);
          }
        });
      }
    });
  }

// -----------------------------------------------------
// FUNÇÕES TABELA PLATAFORMAS

function adicionarPlataforma(novaPlataforma) {
  const { PlataformaID, PlataformaNome, Descricao } = novaPlataforma;
  const sql = 'INSERT INTO Plataformas ( PlataformaID, PlataformaNome, Descricao ) VALUES ( ?, ?, ?)';

  db.run(sql, [PlataformaID, PlataformaNome, Descricao], (err) => {
    if (err) {
      console.error('Erro ao adicionar a plataforma:', err.message);
    } else {
      console.log('Plataforma adicionada com sucesso!');
    }
  });
}

// -----------------------------------------------------
// FUNÇÕES IMAGEM

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../frontend/public/img/capaGames'); // Especifique o caminho desejado aqui
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext);
    },
  });

  const upload = multer({ storage });

// -----------------------------------------------------
// SERVIDOR 
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

  // ENDPOINTS JOGOS ------------------------------------------
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

    app.post('/api/jogos', (req, res) => {
      const novoJogo = req.body;
      adicionarJogo(novoJogo);
      res.send('Jogo adicionado com sucesso!');
    });

    app.post('/api/upload-imagem', upload.single('ImagemJogo'), (req, res) => {
      const imagePath = `caminho/do/upload/${req.file.filename}`;
      res.json(imagePath);
    });

  // ENDPOINTS USUARIO ----------------------------------------

    app.post('/api/usuarios', (req, res) => {
      const novoUsuario = req.body;
      adicionarUsuario(novoUsuario);
      res.send('Usuario adicionado com sucesso!');
    });

    app.post('/login', (req, res) => {
      const { UsuarioEmail, UsuarioSenha } = req.body;
    
      // Função para realizar login
      realizarLogin(UsuarioEmail, UsuarioSenha, (err, usuarioAutenticado) => {
        if (err || !usuarioAutenticado) {
          res.status(401).send('Email ou senha inválidos');
        } else {
          res.json({ mensagem: 'Login bem-sucedido', usuario: usuarioAutenticado });
        }
      });
    });

  // ENDPOINTS PLATAFORMAS ------------------------------------

    app.post('/api/plataformas', (req, res) => {
      const novaPlataforma = req.body;
      adicionarPlataforma(novaPlataforma);
      res.send('Plataforma adicionada com sucesso!');
    });

  // ______________________
  // INICIALIZAÇÃO SERVIDOR
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