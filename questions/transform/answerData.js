const fs = require('fs');

var lineReader = require('readline').createInterface({  input: require('fs').createReadStream('./answers.csv')});

var stream = fs.createWriteStream("answersNew.csv", { flags: "a" });  

stream.once("open", (fd) => {  });

lineReader.on('line', function (line) {
    const newLine = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g)
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