console.log("day4_part1")

let total = 0;

import fs = require('fs');

const filePath = './advent_4_1_input.txt';
const fileContent = fs.readFileSync(filePath, 'utf8');

const lines = fileContent.split('\n');

//console.log(lines);
lines.forEach((card) =>{

    const nums = card.split(':')[1];

    //console.log(nums)

    let winningnums = nums.split('|')[0].trim().split(" ").filter(n => n);
    let mynums = nums.split('|')[1].trim().split(" ").filter(n => n);

    
    
    const found = mynums.filter(v => winningnums.includes(v));

    //console.log(winningnums,mynums,found);
    //console.log(found)

    if(found.length >0){
        //console.log(2**(found.length-1))
        total += (2**(found.length-1));
    }else{
        total += 0;
    }



})

console.log(total)
