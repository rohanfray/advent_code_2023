console.log("advent_2023_day_8_part1")
const startProg = performance.now();
let total = 0;

import { readFileSync } from 'node:fs';
const filePath = './advent_8_input.txt';
const fileContent = readFileSync(filePath, 'utf8');
const lines = fileContent.split('\n');

type mapnode = {
    Left: string,
    Right: string
}

const LRSteps = lines[0].trim();
//console.log(steps);
//console.log(lines.slice(2))

function valToMapNode(val:string):mapnode{
    //meh
    return {Left: val.slice(1,4), Right: val.slice(6,9)}
}

function processLines(lines:string[], m: Map<string, mapnode>){
    lines.forEach((elem)=>{
        let [key, val] = elem.split("=")
        //console.log(val.trim(), val.trim().slice(6,9))
        m.set(key.trim(),valToMapNode(val.trim()))
    })
}


let camelMap = new Map<string, mapnode>()
processLines(lines.slice(2),camelMap)
//console.log(camelMap)

let steps = 0;
let current = 'AAA'
const finalstop = 'ZZZ'

//I don't think we need to loop more than the number of steps times the number of nodes
let maxSteps = LRSteps.length * camelMap.size
//let maxSteps = 10
while(steps < maxSteps){
    if(current === finalstop){
        break
    }
    if(!camelMap.has(current)){
        console.log(`${current} not found in map`)
        steps = maxSteps;
        break
    }
    let stepAt = steps % LRSteps.length
    //console.log(LRSteps.charAt(stepAt))
    if(LRSteps.charAt(stepAt) === 'L'){
        current = camelMap.get(current)!.Left
    }else if(LRSteps.charAt(stepAt) === 'R'){
        current = camelMap.get(current)!.Right
    }else{
        console.log(`Strange LRstep: ${LRSteps.charAt(stepAt)}`)
        steps = maxSteps;
        break
    }

    steps++
}

//console.log(current, steps)
total = steps;
console.log(`Elapsed time is ${(performance.now()- startProg).toFixed(2)} milliseconds and Total is ${total}`)
