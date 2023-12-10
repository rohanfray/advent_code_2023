console.log("advent_2023_day_10_part1")
const startProg = performance.now();
let total = 0;

import { readFileSync } from 'node:fs';
const filePath = './advent_10_input.txt';
const fileContent = readFileSync(filePath, 'utf8');
const lines = fileContent.split('\n');

const pipeDirectionList  = {
    '|': ['north','south'], '-': ['east','west'], 'L': ['north','east'], 'J':['north','west'], '7':['south','west'], 'F':['south','east'], '.':['ground','ground'], 'S':['start','end']
}

class pipe {
    character: string;
    directions: string[];

    constructor(char: string){
        this.character = char.trim();
        this.directions = pipeDirectionList[this.character as keyof typeof pipeDirectionList];
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



const tiles: pipe[][] = [];
let S_row = 0;
let S_col = 0;
processLines(lines, tiles);
//console.log(lines)
//console.log(S_row, S_col, tiles[S_row][S_col])
//console.log(tiles)


//We're not going to traverse the whole map more than once
const maxSteps = lines.length * lines[0].trim().length;
let steps = 0;
let currenttile = 'S';
let currentRow = S_row;
let currentCol = S_col;
//We can get the pipe and directions of S by profiling the data
//We could create a function to determine this, but it's quicker to just look at the input
let currentDirection = 'south'

do {

    //takeAstep(currentRow, currentCol, currentDirection)
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

    //setnewDirection(currentRow, currentCol, currentDirection);
    //console.log(currentRow, currentCol, currentDirection)

    //console.log(tiles[currentCol])
    currenttile = tiles[currentRow][currentCol].character
    /*
    if(currenttile === 'S'){
        break;
    }
    */

    currentDirection = tiles[currentRow][currentCol].directions.filter((elem) => elem !== setnewDirection(currentDirection)).at(0)!

    //console.log(currentRow, currentCol, currentDirection)
    //break
    
    
    steps++
    


    
} while((steps < maxSteps) && (currenttile !=='S'))

total = steps/2

console.log(`Elapsed time is ${(performance.now()- startProg).toFixed(2)} milliseconds and Total is ${total}`)
