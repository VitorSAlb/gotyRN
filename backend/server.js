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

      function adicionarJogosIniciais(callback) {
        // Verificar se há jogos existentes antes de adicionar
        obterTodosOsJogos((err, jogos) => {
          if (err) {
            console.error('Erro ao obter jogos existentes:', err.message);
            return;
          }
      
          if (jogos.length === 0) {
            const jogosIniciais = [
              { JogosNome: 'Starfield', ImagemJogo: "starfield", PlataformaNome: 'Microsoft', GeneroNome: "RPG | Aventura", Descricao: "Jogo", DataDeLancamento: "06/09/2023", Nota: 70, Avaliacoes: 1, PlataformaID: 0  },
              { JogosNome: 'Redfall', ImagemJogo: "redfall", PlataformaNome: 'Microsoft', GeneroNome: "Aventura", Descricao: "A cidade-ilha de Redfall, Massachusetts, foi cercada por uma legião de vampiros, que bloquearam o sol e isolaram os habitantes do mundo exterior", DataDeLancamento: "2023-05-02"},
              { JogosNome: 'Star Wars Jedi Survivor', ImagemJogo: "star-wars-jedi-survivor", PlataformaNome: 'Steam | Microsoft | PSN', GeneroNome: "Aventura | Ação", Descricao: "A história de Cal Kestis continua em STAR WARS Jedi: Survivor™, uma aventura em terceira pessoa na galáxia.", DataDeLancamento: "2023-04-28", Nota: 64, Avaliacoes: 1, PlataformaID: 0  },
              { JogosNome: 'Spider Man 02', ImagemJogo: "spider-man-02", PlataformaNome: 'PSN', GeneroNome: "Aventura | Ação", Descricao: "Os Spiders Peter Parker e Miles Morales estão de volta em mais uma aventura eletrizante da famosa franquia Marvel's Spider-Man para PS5.", DataDeLancamento: "2023-10-20", Nota: 91, Avaliacoes: 1, PlataformaID: 0  },
              { JogosNome: "Baldur's Gate III", ImagemJogo: "baldurs-gate-III", PlataformaNome: 'Steam | PSN', GeneroNome: "RPG | Aventura", Descricao: "Reúna seu grupo e retorne aos Reinos Esquecidos em uma história de companheirismo e traição, sacrifício e sobrevivência, e a atração do poder absoluto.", DataDeLancamento: "2023-08-03", Nota: 89, Avaliacoes: 1, PlataformaID: 0  },
              { JogosNome: 'Dead Space', ImagemJogo: "dead-space-remake", PlataformaNome: 'PSN | Steam | Microsoft', GeneroNome: "Terror | Ação", Descricao: "O clássico de terror de sobrevivência e ficção científica está de volta, totalmente reformulado para oferecer uma experiência ainda mais imersiva", DataDeLancamento: "2023-01-27", Nota: 88, Avaliacoes: 1, PlataformaID: 0  },
              { JogosNome: 'Diablo IV', ImagemJogo: "diablo-IV", PlataformaNome: 'Microsoft | Steam', GeneroNome: "RPG | Aventura", Descricao: "Junte-se à luta por Santuário no Diablo IV, a aventura suprema de RPG de ação. Vivencie a campanha aclamada pela crítica e os novos conteúdos de temporada", DataDeLancamento: "2023-06-06", Nota: 22, Avaliacoes: 0, PlataformaID: 0  },
              { JogosNome: 'Minecraft', ImagemJogo: "minecraft", PlataformaNome: 'PSN | Microsoft | Nintendo', GeneroNome: "Sandbox | Aventura", Descricao: "Minecraft é um jogo feito de blocos que você pode transformar em tudo que puder imaginar", DataDeLancamento: "2012-05-09", Nota: 100, Avaliacoes: 0, PlataformaID: 0 },
              { JogosNome: 'Super Mario 64', ImagemJogo: "super-mario-64", PlataformaNome: 'Nintendo', GeneroNome: "Plataforma", Descricao: "Com controles intuitivos, a mecânica de saltos acrobáticos de Mario foi aprimorada para se adaptar ao ambiente 3D. Os diferentes cursos oferecem uma variedade de objetivos e quebra-cabeças, incentivando a exploração.", DataDeLancamento: "2004-11-20", Nota: 99, Avaliacoes: 0, PlataformaID: 0 },
              { JogosNome: 'The Legend of Zelda Tears of the Kingdom', ImagemJogo: "zelda-tears-of-the-kingdom", PlataformaNome: 'Nintendo', GeneroNome: "Aventura", Descricao: "Nesta continuação de The Legend of Zelda: Breath of the Wild, você decidirá seu próprio caminho pelas extensas paisagens de Hyrule e pelas misteriosas ilhas flutuantes nos vastos céus.", DataDeLancamento: "2023-05-12", Nota: 96, Avaliacoes: 0, PlataformaID: 0 },
              { JogosNome: 'God of War', ImagemJogo: "god-of-war-2018", PlataformaNome: 'PSN', GeneroNome: "Aventura", Descricao: "Esta impressionante repaginação de God of War reúne todas as características marcantes dessa famosa franquia — combate brutal, lutas épicas contra chefes e uma grandiosidade de tirar o fôlego — e as mescla a uma narrativa poderosa e emocionante que reestabelece o mundo de Kratos", DataDeLancamento: "2018-04-20", Nota: 91, Avaliacoes: 0, PlataformaID: 0  },
              { JogosNome: 'Pokemon: Fire Red', ImagemJogo: "pokemon-fire-red", PlataformaNome: 'Nintendo', GeneroNome: "Aventura | RPG", Descricao: "Uma recriação do clássico Pokemon Red, apresenta gráficos aprimorados, novos recursos e a região de Kanto para explorar. Os jogadores embarcam em uma jornada para se tornarem mestres Pokémon, capturando e treinando criaturas, derrotando líderes de ginásio e enfrentando a Equipe Rocket.", DataDeLancamento: "2004-09-07", Nota: 100, Avaliacoes: 0, PlataformaID: 0 }
            ];
      
            jogosIniciais.forEach((jogo) => {
              adicionarJogo(jogo, (err) => {
                if (err) {
                  console.error('Erro ao adicionar jogo inicial:', err.message);
                }
              });
            });
      
          } else {
            console.log('Jogos já existem. Não há necessidade de adicionar jogos iniciais.');
          }
        });
      }
      
      // Função para adicionar plataformas de exemplo
      function adicionarPlataformasIniciais(callback) {
        // Verificar se há plataformas existentes antes de adicionar
        obterTodasAsPlataformas((err, plataformas) => {
          if (err) {
            console.error('Erro ao obter plataformas existentes:', err.message);
            return;
          }
      
          if (plataformas.length === 0) {
            const plataformasIniciais = [
              { PlataformaNome: 'PSN' },
              { PlataformaNome: 'Steam' },
              { PlataformaNome: 'Microsoft' },
              { PlataformaNome: 'Nintendo' },
              { PlataformaNome: 'Epic Games' },
              // Adicione mais plataformas conforme necessário
            ];
      
            plataformasIniciais.forEach((plataforma) => {
              adicionarPlataforma(plataforma, (err) => {
                if (err) {
                  console.error('Erro ao adicionar plataforma inicial:', err.message);
                }
              });
            });
      
          } else {
            console.log('Plataformas já existem. Não há necessidade de adicionar plataformas iniciais.');
            
          }
        });
      }
  
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
            Nota INTEGER,
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

    adicionarJogosIniciais()
    adicionarPlataformasIniciais()
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

  function obterJogoPorId(jogosId, callback) {
      const sql = 'SELECT * FROM Jogos WHERE JogosID = ?';
    
      db.get(sql, [jogosId], (err, row) => {
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
  
    db.run(sql, [JogosNome, ImagemJogo, PlataformaNome, GeneroNome, Descricao, DataDeLancamento, jogoId], (err) => {
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

  function pesquisaJogos(pesquisa, callback) {
    const sql = 'SELECT * FROM Jogos WHERE JogosNome LIKE ?';
    const termoPesquisa = `%${pesquisa}%`;
  
    db.all(sql, [termoPesquisa], (err, rows) => {
      if (err) {
        console.error('Erro ao obter jogos por nome aproximado:', err.message);
        callback(err, null);
      } else {
        callback(null, rows);
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

  function verificarUsuarioAtivo(callback) {
    const sql = 'SELECT * FROM Usuarios WHERE Ativo = 1';

    db.get(sql, (err, row) => {
        if (err) {
            console.error('Erro ao verificar usuário ativo:', err.message);
            callback(err, null);
        } else {
            callback(null, row !== null);
        }
    });
  }

// -----------------------------------------------------
// FUNÇÕES TABELA PLATAFORMAS

  function obterTodasAsPlataformas(callback) {
    const sql = 'SELECT * FROM Plataformas';

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Erro ao obter todos as plataformas:', err.message);
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
  }

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

  function obterPlataformaPorID(plataformaID, callback) {
    const sql = 'SELECT * FROM Plataformas WHERE PlataformaID = ?';
    
      db.get(sql, [plataformaID], (err, row) => {
          if (err) {
              console.error('Erro ao obter o jogo:', err.message);
              // callback(err, null);
          } else {
              // callback(null, row);
          }
      });
  }

  function editarPlataforma(plataformaId, novosDados, callback) {
    const {PlataformaNome, Descricao} = novosDados;
    const sql = 'UPDATE Plataformas SET PlataformaNome = ?, Descricao = ? WHERE PlataformaID = ?';

    db.run(sql, [PlataformaNome, Descricao, plataformaId], (err) => {
      if (err) {
        console.error('Erro ao editar a plataforma:', err.message);
        callback(err);
      } else {
        callback(null);
      }
    });
  }

  function excluirPlataforma(plataformaId, callback) {
    const sql = 'DELETE FROM Plataformas WHERE PlataformaID = ?';

    db.run(sql, [plataformaId], (err) => {
      if (err) {
        console.error('Erro ao excluir a plataforma:', err.message);
        callback(err);
      } else {
        callback(null);
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
    
  app.get('/obterJogoPorId/:id', (req, res) => {
    const jogoId = req.params.id;
    obterJogoPorId(jogoId, (err, jogo) => {
        if (err || !jogo) {
            res.status(404).send('Jogo não encontrado');
        } else {
            // Incluir informações sobre a plataforma
            const plataforma = obterPlataformaPorID(jogo.PlataformaID);
            const jogoComPlataforma = { ...jogo, Plataforma: plataforma };
            res.json(jogoComPlataforma);
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

  
  app.get('/jogos/pesquisar', (req, res) => {
    const pesquisa = req.query.termo; 
    if (!pesquisa) {
      res.status(400).send('Parâmetro "termo" não fornecido na consulta.');
      return;
    }
    pesquisaJogos(pesquisa, (err, jogos) => {
      if (err) {
        res.status(500).send('Erro ao realizar pesquisa por nome aproximado.');
      } else {
        res.json(jogos);
      }
    });
  });

  app.delete('/excluirJogo/:id', (req, res) => {
    const jogoId = req.params.id;
  
    excluirJogo(jogoId, (err) => {
      if (err) {
        res.status(500).send('Erro ao excluir o jogo');
      } else {
        res.send('Jogo excluído com sucesso!');
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

  app.get('/verificarUsuario', (req, res) => {
    verificarUsuarioAtivo((err, usuario) => {
      if (err || !usuario) {
        res.status(500).send('Erro ao obter jogos');
      } else {
        res.json(usuario);
      }
    });
  });

// ENDPOINTS PLATAFORMAS ------------------------------------

  app.post('/api/plataformas', (req, res) => {
    const novaPlataforma = req.body;
    adicionarPlataforma(novaPlataforma);
    res.send('Plataforma adicionada com sucesso!');
  });

  app.delete('/excluirPlataforma/:id', (req, res) => {
    const plataformaId = req.params.id;
  
    excluirPlataforma(plataformaId, (err) => {
      if (err) {
        res.status(500).send('Erro ao excluir a plataforma');
      } else {
        res.send('Plataforma excluída com sucesso!');
      }
    });
  });

  app.put('/editarPlataforma/:id', (req, res) => {
    const plataformaId = req.params.id;
    const novosDados = req.body;
  
    editarPlataforma(plataformaId, novosDados, (err) => {
      if (err) {
        res.status(500).send('Erro ao editar a plataforma');
      } else {
        res.send('Plataforma editada com sucesso!');
      }
    });
  });

  app.get('/obterPlataformaPorId/:id', (req,res) =>{
    const plataformaId = req.params.id
    obterPlataformaPorID(plataformaId, (err, jogo) => {
      if (err || !jogo) {
          res.status(404).send('Jogo não encontrado');
      }
    })
  })

  app.get('/obterTodasAsPlataformas', (req, res) => {
    obterTodasAsPlataformas((err, plataformas) => {
      if (err || !plataformas) {
        res.status(500).send('Erro ao obter plataformas');
      } else {
        res.json(plataformas);
      }
    });
  });
  //______________________
  //MODULOS DE EXPORTAÇÃO

  module.exports = {
    obterTodosOsJogos,
    obterJogoPorId,
    adicionarJogo,
    editarJogo,
    excluirJogo,
    verificarUsuarioAtivo
  };

  // No servidor (antes da inicialização do servidor):
  app.post('/logout', (req, res) => {
    const sqlUpdate = 'UPDATE Usuarios SET Ativo = 0 WHERE Ativo = 1';

    db.run(sqlUpdate, [], (err) => {
      if (err) {
        console.error('Erro ao realizar logout:', err.message);
        res.status(500).send('Erro ao realizar logout');
      } else {
        res.send('Logout realizado com sucesso!');
      }
    });
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

