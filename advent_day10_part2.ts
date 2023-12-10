console.log("advent_2023_day_10_part2")
const startProg = performance.now();
let total = 0;

import { readFileSync } from 'node:fs';
const filePath = './advent_10_input.txt';
const fileContent = readFileSync(filePath, 'utf8');
const lines = fileContent.split('\n');

const pipeDirectionList  = {
    '|': ['north','south'], '-': ['east','west'], 'L': ['north','east'], 'J':['north','west'], '7':['south','west'], 'F':['south','east'], '.':['ground','ground'], 'S':['start','end']
}

const pipeAmounts = {
    //[top, bottom]
    '|': [1,1], 'L': [1,0], 'J':[1,0], '7':[0,1], 'F':[0,1]
}

class pipe {
    character: string;
    directions: string[];
    inLoop:boolean;

    constructor(char: string){
        this.character = char.trim();
        this.directions = pipeDirectionList[this.character as keyof typeof pipeDirectionList];
        this.inLoop = false;
    }
    setinLoop(){
        this.inLoop = true;
    }
}

function processLines(lines: string[], tiles:pipe[][]){
    lines.forEach((elem, index)=>{
        tiles[index] = [];
        Array.from(elem.trim()).forEach((elem2,index2)=>{
            tiles[index][index2] = new pipe(elem2);
            if(elem2 === 'S'){
                S_row = index;
                S_col = index2;
            }
        })

    })
}

function setnewDirection(incomingdirection:string):string{
    let flipDirection = '';
    switch (incomingdirection){
        case 'north':
            flipDirection = 'south';
            break;
        case 'south':
            flipDirection = 'north';
            break;
        case 'east':
            flipDirection = 'west';
            break;
        case 'west':
            flipDirection = 'east';
            break;
        default:
            console.log(`Strange incoming direction: ${incomingdirection}`)
    }
    return flipDirection
}

function allOdd_or_allEven(nums: number[]):string{
    let odd = nums.every((num) => num % 2 === 1);
    let even = nums.every((num) => num % 2 === 0);

    if(odd && !even){
        return 'odd';
    }else if(even && !odd){
        return 'even'
    }
    return "In theory this shouldn't happen";
}

const tiles: pipe[][] = [];
let S_row = 0;
let S_col = 0;
processLines(lines, tiles);

const maxSteps = lines.length * lines[0].trim().length;
let steps = 0;
let currenttile = 'S';
let currentRow = S_row;
let currentCol = S_col;
//We can get the pipe and directions of S by profiling the data
//We could create a function to determine this, but it's quicker to just look at the input
let currentDirection = 'south'
do {
    tiles[currentRow][currentCol].setinLoop();

    switch (currentDirection){
        case 'north':
            currentRow--;
            break;
        case 'south':
            currentRow++;
            break;
        case 'east':
            currentCol++;
            break;
        case 'west':
            currentCol--;
            break;
        default:
            console.log(`Exited a closed loop at step: ${steps} row:${currentRow} and col:${currentCol}`)
    }
    currenttile = tiles[currentRow][currentCol].character
    currentDirection = tiles[currentRow][currentCol].directions.filter((elem) => elem !== setnewDirection(currentDirection)).at(0)!
    steps++   
} while((steps < maxSteps) && (currenttile !=='S'))


//console.log(tiles[S_row][S_col])
//We could create a function to determine this, but it's quicker to just look at the input
tiles[S_row][S_col].character = '7'


//We can look at the path to the left and the right of each point in the map
//If the path parts cross the horizon a odd number of times, then the point must be in the loop
//So we sum up those that come into the horizon from the north (the top amounts)
//and those that leave the horizon (the bottom amounts)
let enclosed = 0;
tiles.forEach((rowTile, rownum) =>{
    rowTile.forEach((tile,index) =>{
        if(!tile.inLoop){
            const leftTiles = rowTile.slice(0,index)
            const rightTiles = rowTile.slice(index + 1);
            //console.log(tile, rightTiles)

            let topLeftAmounts = leftTiles.map((elem)=>{
                return elem.inLoop ? (pipeAmounts[elem.character as keyof typeof pipeAmounts]?.at(0) || 0):0 ;
            }).reduce((acc, cv)=>{return acc + cv},0)
            let topRightAmounts = rightTiles.map((elem)=>{
                return elem.inLoop ? (pipeAmounts[elem.character as keyof typeof pipeAmounts]?.at(0) || 0):0;
            }).reduce((acc, cv)=>{return acc + cv},0)
            let bottomLeftAmounts = leftTiles.map((elem)=>{
                return elem.inLoop ? (pipeAmounts[elem.character as keyof typeof pipeAmounts]?.at(1) || 0):0;
            }).reduce((acc, cv)=>{return acc + cv},0)
            let bottomRightAmounts = rightTiles.map((elem)=>{
                return elem.inLoop ? (pipeAmounts[elem.character as keyof typeof pipeAmounts]?.at(1) || 0):0;
            }).reduce((acc, cv)=>{return acc + cv},0)

            //console.log(rownum, tile, topLeftAmounts, topRightAmounts, bottomLeftAmounts, bottomRightAmounts)

            const amounts = [topLeftAmounts,topRightAmounts,bottomLeftAmounts, bottomRightAmounts];
            let status = allOdd_or_allEven(amounts);
            if(status.length > 4){
                console.log("dunno")
            }

            if(status === 'odd'){
                enclosed ++
            }



        }
    })
})




total = enclosed

console.log(`Elapsed time is ${(performance.now()- startProg).toFixed(2)} milliseconds and Total is ${total}`)
