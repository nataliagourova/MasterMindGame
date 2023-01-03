//obtain winning number set
let secretNum = new Array (4);
//generate 2D array to store guesses and results
let guessNum = Array.from(Array(3), () => new Array (10));
console.log(guessNum);
//input got moved from inside the checkAnswers() function - move back after 2d array is functional
let input = new Array (4);  
//results for single attempt moved from inside selection() function - move back after 2d array is functional
let digitsGuessed = 0;
let positionsGuessed = 0;

fetch('https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new')
.then ((response) => response.text())
.then((data) => {
    secretNum  = data.trim().split('\n');
    console.log(`set to guess: ${secretNum}`);
    console.log(typeof data);
    console.log(typeof secretNum);
    console.dir(`secret number set: ${secretNum}`);    
});
console.dir(`secret number set: ${JSON.stringify(secretNum)}`);

//TABLE

// var mytable = "<table><tr>";
// for (var CELL of ARRAY) {  mytable += "<td>" + CELL + "</td>"; }
// mytable += "</tr></table>";
// document.getElementById("ID").innerHTML = mytable; 

// let table = document.createElement('table');
// let row = table.insertRow();
// row.textContent = "Your input";
// let cell = row.insertCell();
// cell.textContent = "New Cell!";
// document.body.appendChild(table);

// console.dir(table.rows);

//function to compare user input to the secret winning number set

//add a row to User Input Log table
function addRow(tableID, rowIndex, userInput, digitsGuessed, positionsGuessed) {
    // Get a reference to the table
    let tableRef = document.getElementById(tableID);
  
    // Insert a row at the end of the table
    let newRow = tableRef.insertRow(-1);
  
    // Insert a cell in the row at index 0 and append a text node to cell
    let cellOne = newRow.insertCell(0).appendChild(document.createTextNode(rowIndex));
    let cellTwo =newRow.insertCell(1).appendChild(document.createTextNode(userInput.toString()))
    let cellThree = newRow.insertCell(2).appendChild(document.createTextNode(digitsGuessed));
    let cellFour = newRow.insertCell(3).appendChild(document.createTextNode(positionsGuessed)); 
    // let textOne = document.createTextNode(rowIndex);
    // cellOne.appendChild(textOne);
  }

  //collect user input as part of one attempt
function selection (input){
//     const first = document.getElementById("1num");
//     console.log(`input 1num is ${first.value}`);
//     input[0] = first.value;
//     // first.addEventListener("input", () => {
//     //     input.first = first.value;
//     // });
//     console.log(`first num: ${input[0]}`);

    input[0] = document.getElementById("1num").value;
    console.log(`first num: ${input[0]}`);

    // const second = document.getElementById("2num");
    // console.log(`input 2num is ${second.value}`);
    // input[1] = second.value;   
    // console.log(`second num: ${input[1]}`);    
    input[1] = document.getElementById("2num").value;
    console.log(`second num: ${input[1]}`);  

    // const third = document.getElementById("3num");
    // console.log(`input 3num is ${third.value}`);
    // input[2] = third.value;  
    // console.log(`third num: ${input[2]}`);  

    input[2] = document.getElementById("3num").value;
    console.log(`third num: ${input[2]}`);  

    // const fourth = document.getElementById("4num");
    // console.log(`input 4num is ${fourth.value}`);
    // input[3] = fourth.value;   
    // console.log(`fourth num: ${input[3]}`);

    input[3] = document.getElementById("4num").value;
    console.log(`fourth num: ${input[3]}`);
    return input;
}

function checkAnswers(){
    // let input = new Array (4);  
    console.log(`starter user input array: ${input}`);
    // function to collect user input

    selection(input);
    console.log(`user input number set: ${input}`);
    // console.log(JSON.stringify(secretNum) == JSON.stringify(input));
    // if (JSON.stringify(secretNum) == JSON.stringify(input)) {
    //     alert('Congratulations, You Won!');
    //     return;
    // }
    let guesses = 10;
    //start the guess check loop
    for (let i=0; i<1; i++ ) {
        // let digitsGuessed = 0;
        // let positionsGuessed = 0;
        if (JSON.stringify(secretNum) == JSON.stringify(input)) {
            alert('Congratulations, You Won!');
            return;
        }
        //start the array of 4 comparison loop
        for(let i=0; i<4; i++) {
            if(secretNum[i] == input[i]) {
                digitsGuessed ++;
                positionsGuessed ++;
            } else if(secretNum.includes(input[i])) {
                digitsGuessed++;
            } 
        }
        if (digitsGuessed == 0 && positionsGuessed == 0) {
            alert('Your guess was incorrect');
        } else {
            alert(`You guessed ${digitsGuessed} of four numbers\n 
            and ${positionsGuessed} of four positions correctly!`)
        }
            // Call addRow() with the table's ID
        addRow("userLog", 1, input, digitsGuessed, positionsGuessed);

        guesses--;
        alert(`You have ${guesses} attempts remaining`);

    }
    if (JSON.stringify(secretNum) == JSON.stringify(input)) {
        alert('Congratulations, You Won!');
    }

}
// const api = 'https://www.random.org/integers/?num=4&min=0&max=7&col=4&base=10&format=html&rnd=new';


 


// async function getRandomInt(url) {
//     const response = await fetch(url);
//     let data = await response.json();
//     console.log(data);
// }
// getRandomInt(api);