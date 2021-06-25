const fs = require('fs');
const path = require('path');
const etl = require('./etl.js');
const rl = require('readline')
const db = require('../db.js')

// const PRODUCT_ETL = () => {
//   return new Promise ((resolve, reject) => {
    let rowCount = 0;
    let keys = [];
    let field;
    let isFirstLine = true;
    let buffer = 0
    let rowsInserted;
    let readStream = fs.createReadStream(__dirname.substring(0, __dirname.length - 3) + 'raw_data/skus.csv', 'utf8')
    let readLine = rl.createInterface({
        input: readStream
    });
    let currentProductID = null;

    readLine.on('line', (line) => {
      readLine.pause();
      if (isFirstLine) {
        let keyCollection = etl.formatForDatabase(line, undefined, isFirstLine)
        keyCollection.forEach(key => keys.push(key));
        isFirstLine = false;
      } else {
        buffer++
        field = etl.formatForDatabase(line, keys, isFirstLine)
        let id = Number(Object.keys(field)[0]);
        let quantity = field[id].quantity
        let size = field[id].size
        let styleId = field[id].styleId
        let q = `INSERT INTO SKUS (ID, Quantity, Size, Style_ID) VALUES (?, ?, ?, ?)`;
        let v = [id, quantity, size, styleId]
        let insertField = () => {
          return new Promise((resolve, reject) => {
            db.query(q, v, (error, result) => {
              if (error) {
                console.log(error);
                reject(new Error(error))
              } else {
                rowsInserted = result.insertId
                resolve(result);
              }
            })
          })
        }
        insertField()
        .then((result) => {
          buffer--
          rowCount++
          if (rowCount % 5000 === 0) {
            console.log(rowCount)
          }
          if (buffer === 0) {
            readLine.resume();
          }
        })
        .catch((error) => {
          console.log(error)
        })
      }
    })

      // readLine.on('close', () => {
      //   if (rowsInserted === ?) {
      //     resolve('skus.csv uploaded to SQL database')
      //   } else {
      //     reject('skus.csv failed to properly load to SQL database')
      //   }
      // });
    // }
//   }
// }

// module.exports = SKUS_ETL;