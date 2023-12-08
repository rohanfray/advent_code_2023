console.log("advent_2023_day_8_part2")
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

function valToMapNode(val:string):mapnode{
    //meh
    return {Left: val.slice(1,4), Right: val.slice(6,9)}
}

function processLines(lines:string[], m: Map<string, mapnode>){
    lines.forEach((elem)=>{
        let [key, val] = elem.split("=");
        m.set(key.trim(),valToMapNode(val.trim()));
        if(key.trim().slice(-1)==='A'){
            Aentries.push(key.trim())
        }
    })
}


let camelMap = new Map<string, mapnode>()
let Aentries:string[] = [];
processLines(lines.slice(2),camelMap)

const maxSteps = LRSteps.length * camelMap.size
function numberOfStepsZ(firststep:string):number{
    let steps = 0;
    let current = firststep;

    while(steps < maxSteps){
        if(current.slice(-1) === 'Z'){
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
    return steps
}



//let first = '11A'
//console.log(numberOfStepsZ(first))

//If step '11A' takes 2 steps to get to a Z and step '22A' takes 3 steps, wouldn't the answer be the LCM of that (=6)
//console.log(Aentries)
let AtoZ = Aentries.map((elem)=>{return numberOfStepsZ(elem)})
//console.log(AtoZ)

//Why isnt there a LCM function?
//The following two lines were not written by me.  I am not going to write an lcm function
const gcd = (a: number, b: number): number => (a ? gcd(b % a, a) : b);
const lcm = (a: number, b: number): number => a * b / gcd(a, b);

total = AtoZ.reduce(lcm)
console.log(`Elapsed time is ${(performance.now()- startProg).toFixed(2)} milliseconds and Total is ${total}`)
