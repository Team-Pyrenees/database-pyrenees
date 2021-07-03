const fs = require('fs');

var lineReader = require('readline').createInterface({  input: require('fs').createReadStream('./test.csv')});

var stream = fs.createWriteStream("newQuestions.csv", { flags: "a" });  

stream.once("open", (fd) => {  });

lineReader.on('line', function (line) {
    console.log(line)
    const newLine = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g)
    const number = Number(newLine[3])
    const newDate = new Date(number);
    newLine.splice(3, 1, newDate.toISOString());
    if (newLine[6] === '0') {
        newLine.splice(6, 1, false);
    } else {
        newLine.splice(6, 1, true);
    }
    const string = newLine.join(',');

    stream.write(string + "\r\n");
});