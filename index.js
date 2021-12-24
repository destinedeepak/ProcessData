var fs = require('fs');
const { parse } = require('csv-parse/sync');
var moment = require('moment');

function readFromCSVFile(filePath) {
  var data = fs.readFileSync(filePath, 'utf8');

  const records = parse(data, {
    columns: true,
    skip_empty_lines: true,
  });
  return records;
}

// Section A,
//  Question 1.
function questionA1() {
  let records = readFromCSVFile('data/courses.csv');
  const filename = 'coursesFixed.csv';
  const header = ['id, course_name, code, start_date, end_date, duration_days'];
  const rows = records.map((record) => {
    record.start_date = moment(record.start_date).format('YYYY-MM-DD');
    record.end_date = moment(record.end_date).format('YYYY-MM-DD');
    return `${Object.entries(record)[0][1]},${record.course_name},${
      record.code
    },${record.start_date},${record.end_date},${record.duration_days}`;
  });
  let extractedAsCSV = header.concat(rows).join('\n');

  fs.writeFile(filename, extractedAsCSV, (err) => {
    if (err) {
      console.log('Error writing to csv file', err);
    } else {
      console.log(`saved as ${filename}`);
    }
  });
}
//  Question 2.
function questionA2() {
  let records = readFromCSVFile('data/courses.csv');
  return records.reduce((acc, cv) => {
    let obj = {};
    obj.code = cv.code;
    obj.duration = moment(cv.end_date).diff(moment(cv.start_date), 'days');
    acc.push(obj);
    return acc;
  }, []);
}

// Section B,
//  Question 1.
function questionB1() {
  let salesDataARecords = readFromCSVFile('data/salesDataA.csv');
  let salesDataBRecords = readFromCSVFile('data/salesDataB.csv');
  
  let records =  salesDataARecords.reduce((acc,cv1)=>{
    let count = 0;
    salesDataBRecords.forEach((cv2)=>{
      if( JSON.stringify(cv1) === JSON.stringify(cv2) ){
         count++;
      }
    })
    if(count > 1){
      acc.push(cv1)
    }
    return acc;
  },[])
  console.log(records,"result");

  const filename = 'salesDataC.csv';
  
  const header = ['order_id, order_date,	payment_date,	order_value,	item_name'];
  const rows = records.map((record) => {
    return `${Object.entries(record)[0][1]},${record.order_date},${
      record.payment_date
    },${record.order_value},${record.item_name}`;
  });
  let extractedAsCSV = header.concat(rows).join('\n');

  fs.writeFile(filename, extractedAsCSV, (err) => {
    if (err) {
      console.log('Error writing to csv file', err);
    } else {
      console.log(`saved as ${filename}`);
    }
  });
}

// Section C,
//  Question 1.
function questionC1() {
  let string = ''
fs.createReadStream('data/sample.txt')
  .on('data', function (row) {
    string = string + row;
  })
  .on('end', function () {
      let temp =''
      let splittedStringInArray = []
      for (let i = 0; i < string.length; i++) {
        // console.log(string[i], )
        if(string[i] === '\r' || string[i] === '\n' || string[i] === '.' || string[i] === ',' || string[i] === '?'  || (string[i] !== ' ' && !isNaN(string[i]))){
          continue;
        }
        if(string[i] === ' '){
          splittedStringInArray.push(temp);
          temp =''
        }else{
          temp += string[i] ;
        }
      }
      let wordCount = splittedStringInArray.reduce((acc, cv)=>{
         if(acc[cv]){
           acc[cv] = acc[cv] + 1;
         }else {
           acc[cv] = 1;
         }
         return acc
      },{})
      console.log(wordCount);
    })
}

// questionA1();
// console.log("List the course code and the duration of the section in days:", questionA2())
// questionB1()
// questionC1()



