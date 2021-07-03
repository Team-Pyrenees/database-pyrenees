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
   return connection.promise().query(`SELECT * FROM questions WHERE product_id=${id}`)
}

getFromAnswersTable = function (id, callback) {
   return connection.promise().query(`SELECT * FROM answers WHERE question_id=${id}`)
}

getFromPhotosTable = function (id, callback) {
   return connection.promise().query(`SELECT * FROM photos WHERE photo_id=${id}`)
}


module.exports = {
    getFromQuestionsTable: getFromQuestionsTable,
    getFromAnswersTable: getFromAnswersTable
}