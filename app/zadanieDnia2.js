const ENCRYPTED_TEXT = '4f9fa8f98650091c4910f5b597773c0a48278cfb001fe4eb3ff47ada85cbf0ed3dc17016b031e1459e6e4d9b001ab6e102c11e834a98dce9530c9668c47b76ee6f09d075d19a38e48b415e067c6ddcfad0d3526c405a4f4f2fb1e7502f303c40';

//Twój kod
const crypto = require('crypto');

let textToGetPassword = 'Pobawmy się jak komputerowy Detektyw';

const algorithmArray = ['aes192', 'aes-256-cbc', 'aes-256-ecb'];   // All alghoritms which we talked in chapter

// This is a function to found password from text
//      Algorithm: first and last letter of each word
function foundPassword (textToPwd) {
    let endOfString = false;
    let positionsToPwd = [0];           // Positions of letters to get to password. 0 is the position of first letter.
    let pwd = '';
    
    do {
        let spacePosition = textToGetPassword.indexOf(' ', positionsToPwd[positionsToPwd.length - 1]);      // Find every space position
        if(spacePosition < 0) {     // if position is less than 0 (next space does not exists):
            endOfString = true;     // change flag of endOfString variable
            positionsToPwd.push(textToGetPassword.length - 1);      // and add a character with last index in text string
        } else {                                            // if position is greater or equal 0 then:
            positionsToPwd.push(spacePosition - 1);         // add to array the position of letter before space (last letter of previous word)
            positionsToPwd.push(spacePosition + 1);         // and add to array the position of letter after space (first letter of next word)
        }
    } while(!endOfString);      // When flag of endOfString variable is true then exit the loop

    for(let i = 0; i < textToPwd.length; i++) {
        for(let j = 0; j < positionsToPwd.length; j++) {
            if(i == positionsToPwd[j]) {                        // Check if position of each letter in text from which we have to get password is equal to indexes of letters to password
                pwd += textToPwd[positionsToPwd[j]];            //  if yes then add letter to password
            } else { continue; };
        }
    }

    return pwd;
}

function decodeText(encodedText, password, algorithm){              // This is a function which use an algorithm to decrypt an encoded text with a password.
    const decipher = crypto.createDecipher(algorithm, password);
    
    let decrypted = decipher.update(encodedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

const mainFunc = ((textToGetPassword, algorithmArray) => {                  // Main function to control program's flow.
    const password = foundPassword(textToGetPassword);                      // Get a password by use right function.
    console.log();
    console.log('Used password: ' + password);

    let decoded = '';

    for(let algorithm of algorithmArray) {                                  // Check each algorithm
        try {
            decoded = decodeText(ENCRYPTED_TEXT, password, algorithm);      // Try to decrypt with algorithm.
            console.log();
            console.log('Used algorithm: ' + algorithm);
        } catch(e) {                                                        // If function return an error then... do nothing! Try next algorithm.
        }
    }
    console.log();
    console.log('The decoded text is:\n' + decoded);                        // And here we have decoded text.

}) (textToGetPassword, algorithmArray);