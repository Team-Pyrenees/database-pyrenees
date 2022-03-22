const express = require('express')
const db = require('./db/db.js');
const app = express()
const port = 3000
const { getFromAnswersTable, getFromPhotosTable, getAllFromTables } = require('./db/models.js')

app.use(express.json());

app.get('/qa/questions', (req, res) => {
  getAllFromTables(req.query.product_id)
  .then((results) => {
    res.status(200).send(results[0])
  })
  .catch((err) => {
    res.status(400).send(err)
  })
})


app.get('/qa/questions/:question_id/answers', (req, res) => {
  const id = Number(req.url.split('/')[3])
  getFromAnswersTable(id)
  .then((results) => {
    res.status(200).send(results[0])
  })
  .catch((err) => {
    res.status(400).send(err)
  })
})

app.get('/qa/questions/:answer_id/photos', (req, res) => {
  const id = Number(req.url.split('/')[3])
  getFromPhotosTable(id)
  .then((results) => {
    res.status(200).send(results[0])
  })
  .catch((err) => {
    res.status(400).send(err)
  })
})

app.post('/qa/questions', (req, res) => {

})

app.post('/qa/questions/:question_id/answers', (req, res) => {

})

app.put('/qa/questions/:question_id/helpful', (req, res) => {

})

app.put('/qa/questions/:question_id/report', (req, res) => {

})

app.put('/qa/answers/:answer_id/helpful', (req, res) => {

})

app.put('/qa/answers/:answer_id/report', (req, res) => {

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

