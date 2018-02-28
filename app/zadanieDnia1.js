//Twój kod
const crypto = require('crypto');
const fs = require('fs');

let filePath = process.argv[2];
if(filePath === undefined) {
    console.log('Path to file is not found');
    return;
}

console.log('GREAT! Path to file is: ' + filePath);


let readTextFromFile = fs.readFile (filePath, 'utf-8', (err, data) => {
    if(err) throw err;
    
    printTextFromFile(data.toString());

    let result = hashText(data.toString());
    console.log('\nHere is the code after hash:\n' + result);
});

function printTextFromFile(getText) {
    console.log('\nHere is the text from file:\n' + getText);
};

function hashText(textFromFile) {
    return crypto.createHmac('sha256', textFromFile).digest('hex');
};