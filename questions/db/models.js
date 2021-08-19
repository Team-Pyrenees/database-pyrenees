const { connection } = require('./db.js');

// insertData = function (array) {
//     connection.query(
//       'INSERT INTO questions (product_id, body, date_written, asker_name, asker_email, reported, helpful) VALUES (?, ?, ?, ?, ?, ?, ?)', array,
//       (err, results) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log('The data was inserted!!');
//         }
//       }
//     );
//   };

getFromQuestionsTable = function (id) {
   return connection.promise().query(`SELECT id, product_id, body, date_written, asker_name, asker_email, IF(reported, "true", "false") reported, helpful FROM questions WHERE product_id=${id}`)
}

getFromAnswersTable = function (id) {
   return connection.promise().query(`SELECT id, question_id, body, date_written, answerer_name, answerer_email, IF(reported, "true", "false") reported, helpful FROM answers WHERE question_id=${id}`)
}

getFromPhotosTable = function (id) {
   return connection.promise().query(`SELECT * FROM photos WHERE answer_id=${id}`)
}

// `SELECT id, product_id, body, date_written, asker_name, asker_email, IF(reported, "true", "false") reported, helpful FROM questions WHERE product_id=${id}`

module.exports = {
    getFromQuestionsTable: getFromQuestionsTable,
    getFromAnswersTable: getFromAnswersTable,
    getFromPhotosTable: getFromPhotosTable
}