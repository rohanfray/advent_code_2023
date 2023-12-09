console.log("advent_2023_day_9_part1")
const startProg = performance.now();
let total = 0;

import { readFileSync } from 'node:fs';
const filePath = './advent_9_input.txt';
const fileContent = readFileSync(filePath, 'utf8');
const lines = fileContent.split('\n');

//console.log(lines)
const numlines = lines.map((elem) =>{
    return elem.trim().split(" ").filter(x=>x).map(x=>parseInt(x))
})

function getDifferences(arr: number[]): number[] {
    return arr.slice(1).map((element, index) => element - arr[index]);
  }


function recursiveGetNext(nums: number[]):number {
    if (nums.every(element => element === 0)){
        return 0
    }
    if (nums.length === 1){
        return nums[0]
    }
    if (nums.length === 0){
        console.log("nums.length === 0 ???")
        //not sure about this
        return 0
    }

    let diff = getDifferences(nums);
    //return 0
    return (nums.at(-1)!)+recursiveGetNext(diff)
    
}

//console.log(numlines[2])
//console.log(getDifferences(numlines[1]))
//let tmp = recursiveGetNext(numlines[2]);
//console.log(tmp);

total = numlines.map((elem) => recursiveGetNext(elem)).reduce((acc, cv)=>{return acc + cv})

console.log(`Elapsed time is ${(performance.now()- startProg).toFixed(2)} milliseconds and Total is ${total}`)
