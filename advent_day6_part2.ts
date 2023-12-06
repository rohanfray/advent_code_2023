console.log("advent_2023_day_6_part2")
const startProg = performance.now();

type Race = {
    Time: number,
    Distance: number
}

import fs = require('fs');

const filePath = './advent_6_input.txt';
const fileContent = fs.readFileSync(filePath, 'utf8');

const lines = fileContent.split('\n');

function parseLines(lines: string[]): Race {
    let race = lines.map((line)=>line.split(':')[1].split(" ").join('')).map(n=>parseInt(n))
    return {Time: race[0], Distance: race[1]}
}

let testRace= parseLines(lines)

//let testRace = {Time: 71530, Distance: 940200}
//let testRace = {Time: 7, Distance: 9}
//let testRace = {Time: 30, Distance: 200}


let total = 0;

let eRace = {
    even: (testRace.Time %2 == 0),
    forLength: Math.ceil(testRace.Time/2)
}



//We only have to find the first instance of a 'Win'
for(let i=0;i<eRace.forLength+1;i++){
    //console.log(i)
    //total += testNumber(i,testRace.Time, testRace.Distance) ? 1 : 0
    if(testNumber(i,testRace.Time, testRace.Distance)){
        total = i;
        break
    }
}


function testNumber(index: number, time:number, distance: number): boolean{
    return ((time - index) * index)>distance
}


//if odd add 0
//if even add 1

total = Math.ceil(testRace.Time/2) - total
total *=2
total += (eRace.even) ? 1: 0
console.log(`Elapsed time is ${(performance.now()- startProg).toFixed(2)} milliseconds and Total is ${total}`)
