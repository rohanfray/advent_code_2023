let total = 0;

import fs = require('fs');
import readline = require('node:readline');

const rl = readline.createInterface({
    input: fs.createReadStream('advent4.txt'),
    crlfDelay: Infinity,
  });



rl.on('line', (line: any) => {

    let maxRed = 1;
    let maxBlue = 1;
    let maxGreen = 1;

    const gameTokens = line.split(':')[1].split(';');

    gameTokens.forEach((pull: string) => {

        let redstring = pull.match(/([0-9]|[1-9][0-9]) red/);
        let bluestring = pull.match(/([0-9]|[1-9][0-9]) blue/);
        let greenstring = pull.match(/([0-9]|[1-9][0-9]) green/);

        let redValue = redstring === null ? 0 : parseInt(redstring[1]);
        let blueValue = bluestring === null ? 0 : parseInt(bluestring[1]);
        let greenValue = greenstring === null ? 0 : parseInt(greenstring[1]);

        maxRed = maxRed < redValue ? redValue : maxRed;
        maxBlue = maxBlue < blueValue ? blueValue : maxBlue;
        maxGreen = maxGreen < greenValue ? greenValue : maxGreen;


        
    });

    //console.log(maxRed);
    total += (maxRed * maxBlue * maxGreen);
});


rl.on('close', function(){
    console.log(total);
  })
