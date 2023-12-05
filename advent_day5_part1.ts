console.log("day5_part1")

import fs = require('fs');

const filePath = './advent_5_input.txt';
const fileContent = fs.readFileSync(filePath, 'utf8');

const lines = fileContent.split(/\n\s*\n/);

function sortsecondColumn(a: number[], b: number[]) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? -1 : 1;
    }
}

type Row = {
    destination: number;
    source: number;
    sourceend: number,
    range_length: number;
}

type mapObject = {
    mapName: string;
    rows: Row[]
}

function getSeeds(line: string): number[]{
    return line.split(':')[1].trim().split(" ").filter(n => n).map(n => parseInt(n))
}

//The maps are in logical order
function getMaps(lines: string[]):mapObject[]{
           
    return lines.map((line) =>{  
            const mapName = line.split(':')[0].trim()
        
            const mapvals = line.split(':')[1].trim().split('\n').map((v) => {
               return v.split(' ').filter(n => n).map((v)=>parseInt(v))
            })
            
            //Source column should be sorted
            mapvals.sort(sortsecondColumn);

            let tmprows: Row[]
            tmprows = mapvals.map(v =>{
                return {destination: v[0], source: v[1], sourceend: v[1]+v[2], range_length: v[2]}
            })
            
            
            return {mapName, rows: tmprows}
        })

}

let seeds = getSeeds(lines[0])

let maps = getMaps(lines.slice(1));

//test case
//let seed = 14;


const location = (seed:number) => maps.reduce((acc,cv)=>{
    let target = acc;
    let currentMap = cv.rows;
    currentMap.every((c)=>{
        
        if(target >= c.source && target <c.sourceend){
            //console.log(cv.mapName, c)
            
            target = (target - c.source) + c.destination

            //console.log(acc, target)
            return false;
        }
        return true;
    })
    //console.log(target);
    return target;
},seed)



console.log(Math.min(...seeds.map(location)));
