console.log("advent_2023_day_6_part1")
const startProg = new Date().getTime();

import fs = require('fs');

const filePath = './advent_6_input.txt';
const fileContent = fs.readFileSync(filePath, 'utf8');

const lines = fileContent.split('\n');


type Race = {
    Time: number,
    Distance: number
}

function parseLines(lines: string[]): Race[]{
    //let Times = lines[0].split(':')[1].split(" ").filter(n => n).map(n => parseInt(n))
    let [Times, Distances] = lines.map((line)=>line.split(':')[1].split(" ").filter(n=>n).map(n => parseInt(n)))

    if(Times.length !== Distances.length){
        throw('mismatched Times and Distances length')
    }

    let races: Race[] =[]

    //console.log(Times)
    Times.forEach((element, index) => {
        races.push({Time: Times[index], Distance: Distances[index]})
    })

    //console.log(races)
    return races;
}

let BoatRaces = parseLines(lines);
//console.log(BoatRaces)

//very inefficient
function getRaceLengths(race: Race): number[]{

    let raceTimes = Array(race.Time+1).fill(0);
    raceTimes.forEach((time, index, raceTimes) => {   
        raceTimes[index]=((race.Time - index)*index)
    })
    return raceTimes

}


let totals = BoatRaces.map((race)=>{
    return getRaceLengths(race).reduce((acc, cv) => {
        return acc += (cv > race.Distance) ? 1 :0
    },0)
})

/*
let Race1 = getRaceLengths(BoatRaces[1])
let total = Race1.reduce((acc, cv) => {
    return acc += (cv > BoatRaces[1].Distance) ? 1 :0
},0)
*/
console.log(totals.reduce((acc,cv)=>{
    return acc * cv
},1))
