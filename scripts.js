//generates 2D array to store guesses and results
let guessNum = Array.from(Array(10), () => new Array (3));
//initiates array for user input
let input = new Array (4);  
//initiates array to hold the winning number set
let secretNum = new Array (4);
//initiate attempts counter
let counter = 1;

//obtains the winning number set from API
fetch('https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new')
.then ((response) => response.text())
.then((data) => {
    secretNum  = data.trim().split('\n');
    //display the winning set in console 
    console.log(`secret set to be guessed/loaded: ${secretNum}`);
});

//supports toggle button functionality
function toggle(elementId) {
    const element = document.getElementById(elementId);
    if (element.style.display === "block") {
      element.style.display = "none";
    } else {
      element.style.display = "block";
    }
  }

//supports restart button functionality
function restart() {
    document.location.reload();
    return;
}

//collects user input as part of one attempt
function selection (input){
    input[0] = document.getElementById("1num").value;
    // console.log(`User's first num: ${input[0]}`);
    input[1] = document.getElementById("2num").value;
    // console.log(`User's second num: ${input[1]}`);  
    input[2] = document.getElementById("3num").value;
    // console.log(`User's third num: ${input[2]}`);  
    input[3] = document.getElementById("4num").value;
    // console.log(`User's fourth num: ${input[3]}`);
    return input;
}

//adds a row to User Input Log table
function addRow(tableID, rowIndex, userInput, digitsGuessed, positionsGuessed) {
    // gets a reference to the table
    let tableRef = document.getElementById(tableID);
    // inserts a row at the end of the table
    let newRow = tableRef.insertRow(-1); 
    // inserts a cell in the row at index 0 and appends a text node to cell
    let cellOne = newRow.insertCell(0).appendChild(document.createTextNode(rowIndex));
    let cellTwo =newRow.insertCell(1).appendChild(document.createTextNode(userInput.toString()))
    let cellThree = newRow.insertCell(2).appendChild(document.createTextNode(digitsGuessed));
    let cellFour = newRow.insertCell(3).appendChild(document.createTextNode(positionsGuessed)); 
    document.getElementById("counter-display").innerHTML = `${10-counter} attempts left`;
}

//creates a custom alert with results of user's guess attempt, with a timeout
function customAlert(msg,duration) {
    const alertLocation = document.querySelector('#results');
    let styler = document.createElement("div");
    styler.setAttribute("style","border: solid 1px Red;width:18rem;height:auto;text-align:center;background-color:#CACCCE");
    styler.innerHTML = "<h5>"+msg+"</h5>";
    setTimeout(function(){styler.parentNode.removeChild(styler);},duration);
    alertLocation.appendChild(styler);
}

//checks user input against the API generated number set and fires off utility functions as needed, main onClick function for PLAY button
function checkAnswers(){
    // let input = new Array (4);  
    //start the guess check loop
    let button = document.getElementById("submit");
    if (counter == 10) {
        button.disabled = true;
        // alert("Last Try!");
    }
    // console.log(`starter user input array: ${input}`);
    //initiates counters for numbers and positions guessed by user in one attempt    
    let digitsGuessed = 0;
    let positionsGuessed = 0;
    selection(input);
    // console.log(`user input number set: ${input}`);
    //checks for a complete winning combination
    if (JSON.stringify(secretNum) == JSON.stringify(input)) {
        document.getElementById('ta-da').play();
        alert('Congratulations, You Won!');
        return;
    }
    //starts the 4-number array comparison loop to count positions guessed in one attempt
    for(let i=0; i<4; i++) {
        if(secretNum[i] == input[i]) {
            positionsGuessed ++;
        } 
    } 
    //to calculate numbers guessed in one attempt, creates two new arrays with input & secret numbers and their counts
    const inputNumCounts = new Array;
    input.forEach(num => {
        inputNumCounts[num]=(inputNumCounts[num] || 0) +1;
    });
    const secretNumCounts = new Array;
    secretNum.forEach(num => {
        secretNumCounts[num] = (secretNumCounts[num] || 0)+1;
    });
    //traverses new sparse array with input numbers and their counts
    //when input number (aka index) exists in both input & secret arrays, compare values at that index, and add min to the number of digits correctly guessed
    //otherwise, increment the number of digits correctly guessed (digitsGuessed) by 0
    inputNumCounts.forEach((count, num) => {
        // console.log(count, num);
        digitsGuessed += Math.min(inputNumCounts[num], secretNumCounts[num]) || 0
    });
    //populates 2D array with the results of each attempt, 2D array to be used in future development in results reporting
    guessNum[counter-1].push(input.toString(), digitsGuessed, positionsGuessed);
    // console.log(guessNum);
    //calls add row function to populate the user input log with results
    addRow("userLog", counter, input, digitsGuessed, positionsGuessed);  
    //sets off custom alerts for non-winning attempts
    if (digitsGuessed == 0 && positionsGuessed == 0) {
        customAlert('Your guess was incorrect', 2000);
    } else {
        customAlert(`You guessed ${digitsGuessed} of 4 numbers and ${positionsGuessed} of 4 positions correctly!`, 2000);
    }
    //increments attempts counter
    counter ++;
    //sets off a standardized alert and an audio for winning attempts
    if (JSON.stringify(secretNum) == JSON.stringify(input)) {
        document.getElementById('ta-da').play();
        alert('Congratulations, You Won!');
    }
}