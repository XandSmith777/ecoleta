//importar a dependência do sqlite 3
const sqlite3 = require('sqlite3').verbose();

//criar o objeto que irá fazer operações de banco de dados
const db = new sqlite3.Database('./src/database/database.db');

module.exports = db;
//utilizar o objeto de banco de dados para as operações

//db.serialize(() => {
//   //Com comandos sql eu vou:
//   //Criar uma tabela
//   db.run(`
//     CREATE TABLE IF NOT EXISTS places (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         image TEXT,
//         name TEXT,
//         adress TEXT,
//         adress2 TEXT,
//         state TEXT,
//         city TEXT,
//         items TEXT
//     );
//     `);
//   //Inserir dados na tabela
//   const query = `INSERT INTO places(
//     image,
//     name,
//     adress,
//     adress2,
//     state,
//     city,
//     items
// ) VALUES (?,?,?,?,?,?,?);
// `;
//   const values = [
//     'imagem',
//     'nome',
//     'endereço 1',
//     'endereço 2',
//     'estado',
//     'cidade',
//     'items',
//   ];
//   function afterInsertData(err) {
//     if (err) {
//       return console.log(err);
//     }
//     console.log('Cadastrado com sucesso');
//     console.log(this);
//   }
//   db.run(query, values, afterInsertData); //Executa as varíaveis e funcões que foram declaradas para criar o banco de dados
//   //   Consultar os dados da tabela
//   db.all(`SELECT * FROM places`, function (err, rows) {
//     if (err) {
//       return console.log(err);
//     }
//     console.log('Aqui estão seus registros: ');
//     console.log(rows);
//   });
//   Deletar um dado da tabela
//   db.run(`DELETE FROM places WHERE id = ?`, [5], function (err) {
//     if (err) {
//       return console.log(err);
//     }
//     console.log('Registro deletado com sucesso!');
//   });
//});
