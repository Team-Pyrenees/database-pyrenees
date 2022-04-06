const fs = require('fs');

var lineReader = require('readline').createInterface({  input: require('fs').createReadStream('/Users/marcanthony/Desktop/HR/database-pyrenees/questions/transform/questions.csv')}).on('error', function(err) {
    console.log(err);
});

var stream = fs.createWriteStream("questionsNew.csv", { flags: "a" });  

stream.once("open", (fd) => {  });

lineReader.on('line', function (line) {
    const newLine = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
    const dateNumber = Number(newLine[3]);
    const newDate = new Date(dateNumber);
    let correctFormat = newDate.toISOString()
    correctFormat = JSON.stringify(correctFormat.toString())
    newLine.splice(3, 1, correctFormat);

    if (newLine[6] === '0') {
        newLine.splice(6, 1, false);
    } else {
        newLine.splice(6, 1, true);
    }

    const string = newLine.join(',');

    stream.write(string + "\r\n");
});












// LOAD DATA INFILE '/Users/marcanthony/Desktop/HR/database-pyrenees/questions/questionsNew.csv' 
// INTO TABLE questions 
// FIELDS TERMINATED BY ',' 
// ENCLOSED BY '"'
// LINES TERMINATED BY '\n'

// SELECT id, product_id, body, date_written, asker_name, asker_email, IF(reported, "true", "false") reported, helpful FROM answers limit 5;
