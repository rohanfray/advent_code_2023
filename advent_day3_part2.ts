console.log("day3_part2")
function twoNonNull(a: string | null, b: string | null, c: string | null, d: string | null, e: string | null, f: string | null) {
    let nonNullCount = 0;
    const nonNullList = [];
  
    for (const v of [a, b, c, d, e, f]) {
      if (v !== null) {
        nonNullCount++;
        nonNullList.push(v);
      }
    }
  
    if (nonNullCount === 2) {
      return nonNullList;
    } else {
      return null;
    }
  }

let total: number = 0;

import fs = require('fs');

const filePath = './advent_3_2.txt';
const fileContent = fs.readFileSync(filePath, 'utf8');

const lines = fileContent.split('\n');

for(let i: number=0; 
    i <  lines.length;
    i++){


    let currentline: string = lines[i].trim();

    let matches = [...currentline.matchAll(/\*/g)];

    if(matches === null){
        continue;
    }

    matches.forEach((match) =>{
        //console.log(match.index)

        let validLeft = null;
        const leftParts = currentline.slice(0,match.index);
        //console.log(leftParts.length)
        //let validLeft = !isNaN(parseInt(leftParts.slice(-1)));
        const leftmatches = [...leftParts.matchAll(/\d+/g)];
        for(let leftnum of leftmatches){
            //console.log(leftnum.index)
            validLeft = ((leftnum.index! + leftnum[0].length-1) === leftParts.length-1) ? leftnum[0] : null;
            if(validLeft!==null){
                break;
            }
        }

        let validRight = null;
        const rightParts = currentline.slice(match.index!+1);
        //let validRight = !isNaN(parseInt(rightParts.slice(0,1)))
        const rightmatches = [...rightParts.matchAll(/\d+/g)];
        for(let rightnum of rightmatches){
            //console.log(rightnum.index === 0)
            validRight = (rightnum.index === 0) ? rightnum[0] : null;
            if(validRight!==null){
                break;
            }
        }



        let validTopEnd = null;
        let validTopStart = null;
        const topParts = lines[i-1]?.trim();
        const topmatches = topParts === undefined ? [] : [...topParts.matchAll(/\d+/g)];
        for(let topnum of topmatches){
            //console.log(topnum)
            //get end index of number
            let endIndex = topnum.index! + topnum[0].length -1;
            if(endIndex === match.index!-1 || endIndex === match.index){
                validTopEnd = topnum[0];
            }else{
                validTopEnd = null;
            }
            if(validTopEnd !== null){
                break;
            }
        }
        for(let topnum of topmatches){
            let startIndex = topnum.index;
            if((topnum.index === match.index! -1)&&(topnum[0].length > 2)){
                validTopStart = topnum[0];
            }else if((topnum.index === match.index)&&(topnum[0].length >1)){
                validTopStart = topnum[0];
            }else if((topnum.index === match.index! + 1)){
                validTopStart = topnum[0];
            }else{
                validTopStart = null;
            }
            if(validTopStart !== null){
                break;
            }
        }

        let validBottonEnd = null;
        let validBottomStart = null;
        const BottomParts = lines[i+1]?.trim();
        const bottommatches = BottomParts === undefined ? [] : [...BottomParts.matchAll(/\d+/g)];
        //console.log(bottommatches)
        for(let bottomnum of bottommatches){
            //console.log(topnum)
            //get end index of number
            let endIndex = bottomnum.index! + bottomnum[0].length -1;
            if(endIndex === match.index!-1 || endIndex === match.index){
                validBottonEnd = bottomnum[0];
            }else{
                validBottonEnd = null;
            }
            if(validBottonEnd !== null){
                break;
            }
        }
        for(let bottomnum of bottommatches){
            let startIndex = bottomnum.index;
            if((bottomnum.index === match.index! -1)&&(bottomnum[0].length > 2)){
                validBottomStart = bottomnum[0];
            }else if((bottomnum.index === match.index)&&(bottomnum[0].length >1)){
                validBottomStart = bottomnum[0];
            }else if((bottomnum.index === match.index! + 1)){
                validBottomStart = bottomnum[0];
            }else{
                validBottomStart = null;
            }
            if(validBottomStart !== null){
                break;
            }
        }


        //console.log([validLeft,validRight,validTopEnd,validTopStart,validBottonEnd,validBottomStart])



        const result = twoNonNull(validLeft,validRight,validTopEnd,validTopStart,validBottonEnd,validBottomStart)

        //console.log(result);

        
        if(result !==null){
            total += parseInt(result[0])*parseInt(result[1]);
        }


    })

    }

    console.log(total);

   
