console.log("advent_2023_day_7_part2")
const startProg = performance.now();
let total = 0;

import { readFileSync } from 'node:fs';

const filePath = './advent_7_input.txt';
const fileContent = readFileSync(filePath, 'utf8');
const lines = fileContent.split('\n');

const CardStrengths  = {
    '2': 0, '3': 1, '4': 2, '5':3, '6':4, '7':5, '8':6, '9':7, 'T':8, 'J':-1, 'Q':10, 'K':11, 'A':12
}

const HandStrengths ={
    'Five of a kind':6, 'Four of a kind': 5, 'Full house':4, 'Three of a kind':3, 'Two pair':2, 'One pair':1, 'High card':0
}

function NOfAKind(hand: string, num:number): boolean{
    const chars = hand.split("");
    const uniqueChars = new Set(chars);
    // Loop through each unique character and check its count
    for (const char of uniqueChars) {
      const count = chars.filter((innerChar) => innerChar === char).length;
      if (count === num) {
        return true;
      }
    } 
    return false;
}
function sameStrengthHand(hand1: Hand, hand2:Hand): number{

    for (let i=0; i<hand1.cards.length; i++){
        const hand1_char = hand1.cards[i];
        const hand2_char = hand2.cards[i]
        
        const hand1_val = CardStrengths[hand1_char as keyof typeof CardStrengths]
        const hand2_val = CardStrengths[hand2_char as keyof typeof CardStrengths]

        //console.log(hand1_char, hand1_val)
        //console.log(hand2_char, hand2_val)

        if(hand1_val < hand2_val){
            return -1
        } else if(hand1_val > hand2_val){
            return 1
        }
    }

    return 0
}

function getHandStrength(hand: string): number{
    //I'm not sure how to do this more efficiently
    const uniq = new Set(hand).size
    if (uniq === 5){
        return HandStrengths['High card']
    } else if (uniq === 4){
        return HandStrengths['One pair']
    } else if (uniq === 1){
        return HandStrengths['Five of a kind']
    } else if (uniq === 2){
        return (NOfAKind(hand,4)) ? HandStrengths['Four of a kind'] : HandStrengths['Full house']
    } else if (uniq === 3){
        return (NOfAKind(hand,3)) ? HandStrengths['Three of a kind'] : HandStrengths['Two pair']
    }
    return -1
}
function allUniqCharsExceptJ(hand: string): string[]{
    const set = new Set<string>();
    for (const char of hand) {
        if (char !== "J") {
        set.add(char);
        }
    }
    return Array.from(set);
}
function getHandStrength_Jokers(hand: string, Jokers: number): number{
    if(Jokers === 0){
        return getHandStrength(hand)
    }else if(Jokers ===5){
        return HandStrengths['Five of a kind']
    }else if (Jokers >0 ){
        //we can replace J with each other card in the string and test all those hands
        const allothers = allUniqCharsExceptJ(hand);
        let possible_Hand_strengths = allothers.map((card)=>{
            return getHandStrength(hand.replaceAll('J',card))
        })
        //console.log(hand)
        //console.log(possible_Hand_strengths)
        return Math.max(...possible_Hand_strengths)
    }

    return -1
}

class Hand {
    readonly cards: string;
    readonly bid:number;
    numJokers: number;
    handStrength: number;

    constructor(cardline: string){
        this.cards = cardline.split(" ")[0].trim();
        this.bid = parseInt(cardline.split(" ")[1]);
        this.numJokers = this.cards.split("").filter((c) => c === 'J').length
        this.handStrength = getHandStrength_Jokers(this.cards,this.numJokers);
    }

}




const hands: Hand[] = []
lines.forEach((line)=>hands.push(new Hand(line)));
hands.sort((a, b) => {
    
    let diff = a.handStrength - b.handStrength;

    if(diff === 0){
        return sameStrengthHand(a,b)
    }else{
        return diff;
    }

  });


//hands.forEach((hand)=> console.log(hand.cards, hand.handStrength))
total = hands.reduce((acc,cv,index)=>{
    return acc + (cv.bid * (index+1))
},0)

console.log(`Elapsed time is ${(performance.now()- startProg).toFixed(2)} milliseconds and Total is ${total}`)
