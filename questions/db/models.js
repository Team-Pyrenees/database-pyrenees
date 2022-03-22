const { connection } = require('./db.js');


getFromQuestionsTable = function (id) {
   return connection.promise().query(`SELECT id, product_id, body, date_written, asker_name, asker_email, IF(reported, "true", "false") reported, helpful FROM questions WHERE product_id=${id}`)
}

getFromAnswersTable = function (id) {
   return connection.promise().query(`SELECT id, question_id, body, date_written, answerer_name, answerer_email, IF(reported, "true", "false") reported, helpful FROM answers WHERE question_id=${id}`)
}

getFromPhotosTable = function (id) {
   return connection.promise().query(`SELECT * FROM photos WHERE answer_id=${id}`)
}

getAllFromTables = function (id) {
   const queryString = `SELECT
   id as question_id,
   body as question_body,
   date_written as question_date,
   asker_name,
   helpful as question_helpfulness,
   IF(reported, "true", "false") reported,
   (
      SELECT JSON_OBJECTAGG(answers.id, JSON_OBJECT(
         'id', answers.id,
         'body', answers.body,
         'date', answers.date_written,
         'answerer_name', answerer_name,
         'helpfulness', answers.helpful,
         'photos', (
            SELECT JSON_OBJECTAGG(JSON_OBJECT(
               'id', photos.id,
               'url', photos.url,
               ))
            FROM photos
            WHERE answers.id = photos.answer_id
         )
      ))
      FROM answers
      WHERE questions.id = answers.question_id
   ) as answers
   FROM questions
   WHERE product_id = ${id} AND reported = 0 limit 5`;
   return connection.promise().query(queryString)
}

// `SELECT id, product_id, body, date_written, asker_name, asker_email, IF(reported, "true", "false") reported, helpful FROM questions WHERE product_id=${id}`

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

module.exports = {
    getFromQuestionsTable: getFromQuestionsTable,
    getFromAnswersTable: getFromAnswersTable,
    getFromPhotosTable: getFromPhotosTable,
    getAllFromTables: getAllFromTables
}