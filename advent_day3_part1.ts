console.log("day3_part1")

let total: number = 0;

import fs = require('fs');

const filePath = './advent_3_1.txt';
const fileContent = fs.readFileSync(filePath, 'utf8');

const lines = fileContent.split('\n');

const symboltest: RegExp = /(?!\.)\D/

for(let i: number=0; 
    i <  lines.length;
    i++){
    

    let currentline: string = lines[i].trim();
    //console.log(currentline.length);

    //let number_token: string[] = currentline.match(/\d+/g)
    let matches = [...currentline.matchAll(/\d+/g)];

    //console.log(currentline.matchAll(/\d+/g))

    if(matches === null){
        continue;
    }

    matches.forEach((match) => {
        //console.log(match);
        let valid_part_number: boolean = false;

        
        //let start_position: number = currentline.indexOf(num);
        let start_position = match.index

        //let start_position: number = currentline.rfind(num);
        //console.log(start_position)


        let end_position: number = start_position! + match[0].length-1;
        //console.log(start_position);
        //console.log(end_position);

        //test left and right most character



        let L_rect = currentline.charAt(start_position!-1);
        let R_rect = currentline.charAt(end_position+1);
        //console.log(R_rect)
       


        let T_rect = i < 1 ? '' : lines[i-1].slice(Math.max(start_position!-1,0),end_position+1+1).trim();
        let B_rect = i === lines.length -1 ? '' : lines[i+1].slice(Math.max(start_position!-1,0),end_position+1+1).trim();

        //console.log(B_rect)
        //console.log(symboltest.test(T_rect))


        //valid_part_number = valid_part_number || (!!L_rect ? symboltest.test(L_rect) : false) || (!!R_rect ? symboltest.test(R_rect) : false) || symboltest.test(T_rect) || symboltest.test(B_rect);
        valid_part_number = valid_part_number || (L_rect!=="" && symboltest.test(L_rect)) || (R_rect!=="" && symboltest.test(R_rect)) || symboltest.test(T_rect) || symboltest.test(B_rect);


        
        if(valid_part_number){
      
            //console.log(parseInt(match[0]))
            total += parseInt(match[0]);
        }else{
            //console.log(match[0])
        }

    })







}

console.log(total);
