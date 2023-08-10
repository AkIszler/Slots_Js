
// slot machine in termmal
// imports
const prompt = require("prompt-sync")();

// set global vars
const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {

    A: 2,
    B: 4,
    C: 6,
    D: 8,

} 

const SYMBOLS_VALUE = {

    A: 5,
    B: 4,
    C: 3,
    D: 2,

}

// depoist money
const depositCash = () => {
    while (true) {
        const depoAmount = prompt("enter deposit amount: ");
        const number_depoAmount = parseFloat(depoAmount);
    
        if (isNaN(number_depoAmount) || number_depoAmount <= 0) {
            console.log("Please enter a number");
        }
        else {
            return number_depoAmount;
            break;
        }
    }
}


//. determine number of lines

const GetNumberOfLines = () => { 
    while (true) {
        const lineamount = prompt("Enter how many lines you want to play 1-3 : ");
        const number_line = parseInt(lineamount);

        if (isNaN(number_line) || number_line > 3 || number_line <= 0) {
            console.log("invlaid line amount")
        }
        else {
            console.log(`you are playing ${number_line} lines`)
            return number_line;
            break;
        }
    }
}

// collect bet amount

const getBet = (balance, lines) => {
    
    while (true) {
        const bet = prompt("place your bet per line: ");
        const betAmount = parseInt(bet);

        if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance / lines) {
            console.log("Invalid bet, try again.");
        } else {
            return betAmount;
        }
    }
}    
// spin machine

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) { 
            symbols.push(symbol);
        }
    }
    

    const reels = [];
    for (let i = 0; i < COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) { 
            const randomIndex = Math.round(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }

    return reels;
}
// check if win or loss

const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) { 
            rows[i].push(reels[j][i])
        }
            
    }
        
    return rows
}

const printRows = (rows) => { 
    for (const row of rows) { 
        let rowString = ""
        for (const [i, symbol] of row.entries()) {
            rowString += symbol
            if (i != row.length - 1) {
                rowString += " | "
            }
        }
        console.log(rowString)
    }

}

// give or take money

const getWinning = (rows, betAmount, lines) => { 

    let winnings = 0;
    
    for (let row = 0; row < lines; row++){
        const symbols = rows[row]
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false
                break;
            }
        }

        if (allSame) { 
            winnings += betAmount * SYMBOLS_VALUE[symbols[0]];
        }
    }
    



    return winnings;
}




// play machine again


const game = () => {
    let balance = depositCash();

    while (true) {

        console.log(`your current balance is $${balance}`)
        const number_ofLines = GetNumberOfLines();
        const betPlaced = getBet(balance, number_ofLines);
        
        balance -= (betPlaced * number_ofLines);
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows)
        const winnings = getWinning(rows, betPlaced, number_ofLines)
        balance += winnings;
        if (winnings > 0) {
            console.log(`you win $ ${winnings}`)
        }
        else {
            console.log("you lose")
        }

        if (balance <= 0) {
            console.log(`your balance is $${balance} feel free to try again`)
            break;
        }
        const playAgain = prompt("do you want to play again? y/n: ")

        if (playAgain != "y") { 
            console.log(`you left with $${balance}`)
        break;console.log();
    }
    
    }
}


// program run 

game();