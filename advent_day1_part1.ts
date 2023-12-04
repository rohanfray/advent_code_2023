
let total: number = 0

import fs = require('fs');
import readline = require('node:readline');

const rl = readline.createInterface({
  input: fs.createReadStream('advent1.txt'),
  crlfDelay: Infinity,
});

rl.on('line', (line: any) => {


  let nums = line.replace(/[^0-9]/g, '');
  //console.log(nums);
  let first: string = nums.slice(0,1);
  //console.log(first);
  let second: string = nums.slice(-1);
  //console.log(second);


  let charTotal: number = parseInt(first.concat(second));
  //console.log(charTotal);

  total += charTotal;

}); 


rl.on('close', function(){
  console.log(total);
})
