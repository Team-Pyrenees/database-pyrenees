const fs = require('fs');
const csv = require('csv-parser');
const db = require('../db/db.js');
// const questionsData = require('../data/questions.csv');

fs.createReadStream('../data/questions.csv')
  .pipe(csv({}))
  .on('data', (data) => {
    // var stringData = Object.values(data).join(",").split(",")
    let reported;

    if (data.reported === "0") {
        reported = false;
    } else {
        reported = true;
    }

    let original = Date(data.date_written);
   
    let date = new Date(original);
    
    let parsedDateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 )).toISOString();

    // let transformedData = [
    //     Number(data.id),
    //     Number(data.product_id),
    //     data.body,
    //     parsedDateString,
    //     data.asker_name,
    //     data.asker_email,
    //     reported,
    //     Number(data.helpful)
    // ]

    var lineReader = require('readline').createInterface({  input: require('fs').createReadStream('file.in')});lineReader.on('line', function (line) {  console.log('Line from file:', line);});

    let id = Number(data.id);
    let product_id = Number(data.product_id);
    let body = data.body;
    // parsedDateString
    let asker_name = data.asker_name;
    let asker_email = data.asker_email;
    // reported
    let helpful = Number(data.helpful);

    var string = `${id},${product_id},${body},${parsedDateString},${asker_name},${asker_email},${reported},${helpful}`

    console.log('This is the data chunk', string);

    var stream = fs.createWriteStream("newQuestions.csv", { flags: "a" });  console.log(stream);  

    stream.once("open", (fd) => {    stream.write(string + "\r\n");  });
  })
  .on('end', () => {
    console.log('everything worked');
  });


