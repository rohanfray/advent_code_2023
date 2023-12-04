//console.log("advent2")

let total: number = 0;

import fs = require('fs');
import readline = require('node:readline');
const Digit_to_num = {
    'one': "1",
    'two': "2",
    'three': "3",
    'four': "4",
    'five': "5",
    'six': "6",
    'seven': "7",
    'eight': "8",
    'nine': "9",
};

const rl = readline.createInterface({
  input: fs.createReadStream('advent2.txt'),
  crlfDelay: Infinity,
});


rl.on('line', (line: any) => {

    const first: string = line.match(/\d|one|two|three|four|five|six|seven|eight|nine/)[0];
    const second: string = line.match(/.*(\d|one|two|three|four|five|six|seven|eight|nine)/)[1];
    

    let firstAmount = (Digit_to_num[first as keyof typeof Digit_to_num] ?? first);
    //console.log(firstAmount);

    let secondAmount = (Digit_to_num[second as keyof typeof Digit_to_num] ?? second);

    let charTotal: number = parseInt(firstAmount.concat(secondAmount));
    //console.log(charTotal);
  
    total += charTotal;

})

rl.on('close', function(){
    console.log(total);
  })
