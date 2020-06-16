const express = require('express');
const server = express();

//pegar o banco de dados
const db = require('./database/db');

// configurar a pasta public para que apresente as subpastas contidas nele
server.use(express.static('public'));

//habilita o uso do req.body na aplicação
server.use(express.urlencoded({ extended: true }));

//utilizando template engine
const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
  express: server,
  noCache: true, //inpede que ocorram bugs de atualização da página no desenvolvimento
});

//configurar os caminhos da aplicação

//página inicial
//req = requisição
//res = resposta
server.get('/', (req, res) => {
  return res.render('index.html', { title: 'Um título' }); //envia a página desejada como resposta para o servidor
});

server.get('/create-point', (req, res) => {
  //req query recebe os dados gravados no formulário da página cridad abaixo
  //req.query;

  return res.render('create-point.html'); //envia a página desejada como resposta para o servidor
});

server.post('/savepoint', (req, res) => {
  //req.body: O corpo do formulário
  // console.log(req.body);

  //insere os dados no banco de dados
  const query = `INSERT INTO places(
     image,
     name,
     adress,
     adress2,
     state,
     city,
     items
 ) VALUES (?,?,?,?,?,?,?);
 `;
  const values = [
    req.body.image,
    req.body.name,
    req.body.adress,
    req.body.adress2,
    req.body.state,
    req.body.city,
    req.body.items,
  ];

  function afterInsertData(err) {
    if (err) {
      console.log(err);
      return res.send('Erro no cadastro');
    }
    console.log('Cadastrado com sucesso');
    console.log(this);

    return res.render('create-point.html', { saved: true });
  }

  db.run(query, values, afterInsertData); //Executa as varíaveis e funcões que foram declaradas para criar o banco de dados
});

server.get('/search', (req, res) => {
  const search = req.query.search;

  if (search == '') {
    //pesquisa vazia
    return res.render('search-results.html', { total: 0 });
  }

  //pegar os dados do banco de dados
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (
    err,
    rows
  ) {
    if (err) {
      return console.log(err);
    }

    const total = rows.length;

    //mostrar a página html com os dados do banco de dados
    return res.render('search-results.html', { places: rows, total: total }); //envia a página deseja  da como resposta para o servidor
  });
});

//ligar o servidor
server.listen(3000);
