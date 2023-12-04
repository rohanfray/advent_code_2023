console.log("day4_part2");

import fs = require('fs');

const filePath = './advent_4_1_input.txt';
const fileContent = fs.readFileSync(filePath, 'utf8');

const lines = fileContent.split('\n');

let numMatches: number[] = [];
let numCards: number[] = Array(lines.length).fill(1);

lines.forEach((card) => {

    const nums = card.split(':')[1];

    //console.log(nums)

    let winningnums = nums.split('|')[0].trim().split(" ").filter(n => n);
    let mynums = nums.split('|')[1].trim().split(" ").filter(n => n);



    const found = mynums.filter(v => winningnums.includes(v));

    //console.log(winningnums,mynums,found);
    //console.log(found)
    numMatches.push(found.length);


})

if (numMatches.length !== numCards.length) {
    throw "mismatched lengths";
}

for (let i = 0;
    i < numCards.length;
    //i < 3; 
    i++) {

    //console.log(numMatches[i],numCards[i])

    //let matchNum = numMatches[i];

    let splicestart = i+1;
    let spliceend = splicestart + numMatches[i];

    //console.log(splicestart, spliceend)
    //console.log(numCards.slice(splicestart,spliceend+1));
    for(let j =0; j<numCards[i]; j++){
        numCards.splice(splicestart, spliceend - splicestart, ...numCards.slice(splicestart, spliceend).map((item) => item + 1));
    }
    
    //console.log(numCards);

}


//console.log(numMatches);
//console.log(numCards);
console.log(numCards.reduce((s,v) => s + v))
