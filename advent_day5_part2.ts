console.log("day5_part2")

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



type seedRange = {
    start: number,
    length: number
}

function getSeeds2(seedline: number[]): seedRange[]{

    let returnarr: seedRange[] =[];
    let seedstart =  seedline.filter((value, index) => index % 2 === 0);
    let seedlength = seedline.filter((value, index) => index % 2 === 1);

    if (seedstart.length !== seedlength.length){
        throw("mismatched seed lengths")
    }



    //return {seedstart, seedlength}
    
    for(let i =0;
        i < seedstart.length;
        i++){

            //console.log(seedstart[i])
           
            returnarr.push({start:seedstart[i],length:seedlength[i]})

        }

    return returnarr;
    
}









let maps = getMaps(lines.slice(1));

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




let seeds = getSeeds2(getSeeds(lines[0]))

//let seeds = [{start:2655687716, length:8403417}]

let minlocation = Infinity;

seeds.forEach((seed)=>{
    console.log(`Startval: ${seed.start}, Length: ${seed.length}`)
    const start = new Date().getTime();


    for(let i=seed.start; i < seed.start+seed.length; i++){
        //break
        let loc = location(i);
        minlocation = Math.min(minlocation,loc)
    }

    console.log(`MinLocation for ${seed.start} is ${minlocation}`)
    console.log(`Elapsed: ${(new Date().getTime() - start)/1000} seconds`)
    console.log('\n')
})



//console.log(seeds)
console.log(`Final min Location is ${minlocation}`)
//console.log(Math.min(...seeds.map(location)));
