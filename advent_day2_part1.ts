
let total = 0;

const redCubes = 12;
const blueCubes = 14;
const greenCubes = 13;

import fs = require('fs');
import readline = require('node:readline');

const rl = readline.createInterface({
    input: fs.createReadStream('advent3.txt'),
    crlfDelay: Infinity,
  });

rl.on('line', (line: any) => {

    let validGame: boolean = true;

    
    const gameNum = parseInt(line.match(/\b([1-9]|[1-9][0-9]|100)\b:/)[0].replace(":",''));
    
    const gameTokens = line.split(':')[1].split(';');

    gameTokens.forEach((pull: string) => {

        let redstring = pull.match(/([0-9]|[1-9][0-9]) red/);
        let bluestring = pull.match(/([0-9]|[1-9][0-9]) blue/);
        let greenstring = pull.match(/([0-9]|[1-9][0-9]) green/);

        let redValue = redstring === null ? 0 : parseInt(redstring[1]);
        let blueValue = bluestring === null ? 0 : parseInt(bluestring[1]);
        let greenValue = greenstring === null ? 0 : parseInt(greenstring[1]);

        if(redValue > redCubes || blueValue > blueCubes || greenValue > greenCubes){
            validGame = false;
        }

        
    });




    if(validGame){
        total += gameNum;
    }

  }); 


  rl.on('close', function(){
    console.log(total);
  })
