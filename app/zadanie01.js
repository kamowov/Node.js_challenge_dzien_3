const MY_PWD_HASH = '5dca0fc4e306d92b2077ad85e7c4bd87a3e8648e';

//Twój kod
const crypto = require('crypto');

const txtArray = ['??TegoHasła', 'CodersLab', 'Node.js Szyfruje Pliki', 'Zaźółć Gęślą Jaźń', 'Moje Haslo 1@3!', '111#$((@)n', 'Dzisiaj Szyfruje 83', 'Hello, World!'];
const algorithmArray = ['sha256', 'sha512', 'md5', 'rmd160'];
const formatArray = ['base64', 'hex'];

const hash = (algorithm, txt, format) => {
    return crypto.createHmac(algorithm, txt).digest(format);
}

let isEqual = false;
let resultArray = [];

for(let txtInd = 0; txtInd < txtArray.length; txtInd++) {
    for(let algorithmInd = 0; algorithmInd < algorithmArray.length; algorithmInd++){
        for(let formatInd = 0; formatInd < formatArray.length; formatInd++){
            let pwd = hash(algorithmArray[algorithmInd], txtArray[txtInd], formatArray[formatInd]);
            if(pwd == MY_PWD_HASH) isEqual = true; 
            
            if (isEqual) {
                resultArray = [algorithmArray[algorithmInd], txtArray[txtInd], formatArray[formatInd]];
                break;
            }
            else continue;
        }
        if (isEqual) break;
    }
    if (isEqual) break;
}

console.log('Algorithm: ' + resultArray[0, 0] + ' , password: ' + resultArray[0, 1] + ' , format: ' + resultArray[0, 2]);