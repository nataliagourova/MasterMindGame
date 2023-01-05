//generate 2D array to store guesses and results
let guessNum = Array.from(Array(10), () => new Array (3));
console.log(guessNum);
//input got moved from inside the checkAnswers() function - move back after 2d array is functional
let input = new Array (4);  
// //results for single attempt moved from inside selection() function - move back after 2d array is functional
// let digitsGuessed = 0;
// let positionsGuessed = 0;
//initiate array to hold the winning number set
let secretNum = new Array (4);

//obtain the winning number set from API
fetch('https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new')
.then ((response) => response.text())
.then((data) => {
    secretNum  = data.trim().split('\n');
    console.log(`set to guess/loaded: ${secretNum}`);
    console.log(`value type: ${typeof data}`);
    console.log(`data type: ${typeof secretNum}`); 
});
console.dir(`starter number set: ${JSON.stringify(secretNum)}`);

//provides button toggle functionality
function toggle(elementId) {
    const element = document.getElementById(elementId);
    if (element.style.display === "none") {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  }

//adds a row to User Input Log table
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
}

//collects user input as part of one attempt
function selection (input){
    input[0] = document.getElementById("1num").value;
    console.log(`User's first num: ${input[0]}`);
 
    input[1] = document.getElementById("2num").value;
    console.log(`User's second num: ${input[1]}`);  

    input[2] = document.getElementById("3num").value;
    console.log(`User's third num: ${input[2]}`);  

    input[3] = document.getElementById("4num").value;
    console.log(`User's fourth num: ${input[3]}`);
    return input;
}

let counter = 1;

//checks user input against the API generated number set
function checkAnswers(){
    // let input = new Array (4);  
    //start the guess check loop
    let button = document.getElementById("submit");
    if (counter == 10) {
        button.disabled = true;
        // alert("Last Try!");
    }
    console.log(`starter user input array: ${input}`);

    let digitsGuessed = 0;
    let positionsGuessed = 0;
    selection(input);
    console.log(`user input number set: ${input}`);

    if (JSON.stringify(secretNum) == JSON.stringify(input)) {
        alert('Congratulations, You Won!');
        return;
    }
    //start the 4-number array comparison loop
    for(let i=0; i<4; i++) {
        if(secretNum[i] == input[i]) {
            digitsGuessed ++;
            positionsGuessed ++;
        } else if(secretNum.includes(input[i])) {
            digitsGuessed++;
        } 
    }
    addRow("userLog", counter, input, digitsGuessed, positionsGuessed);
    // if (digitsGuessed == 0 && positionsGuessed == 0) {
    //     alert('Your guess was incorrect');
    // } else {
    //     alert(`You guessed ${digitsGuessed} of 4 numbers and
    //         ${positionsGuessed} of 4 positions correctly!`)
    // }
//     // Call addRow() with the table's ID
    // addRow("userLog", 1, input, digitsGuessed, positionsGuessed);

    counter ++;
    // alert(`You have ${11-counter} attempts remaining`);

    if (JSON.stringify(secretNum) == JSON.stringify(input)) {
        alert('Congratulations, You Won!');
    }

}