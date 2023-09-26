### Master Mind Game

This projecy id a mastermind game, which can be played by a user "against" the computer.
The game has been deployed to GitHub pages. See [played in a browser](https://nataliagourova.github.io/MasterMindGame/). Firefox is recommended as it fully supports the intended featured.
This is a game where a player tries to guess a number combination in 10 attempts. At the end of each attempt to guess the 4 number combinations in a particular order, the computer provides feedback whether the player had guessed a number correctly, or/and a number position correctly. A player must guess the right number combinations within 10 attempts to win the game by process of elimination.
In the event the number sequence is guessed, the game alerts the winner, plays a sound and stops.

The code is housed in three files: html, css and js. It does not utilize external libraries or packages. 
The winning number combination is obtained through an integrated Random Number Generator API. 
The html file contains four buttons and an input form, which allow the player to interact with the game. Two toggle buttons show the game rules and the user input log, so that the correct number combination is easier to deduce. The restart button reloads the game  and has same functionality as the browser reload icon. The play button fires off an onclick event, which in turn executes the JavaScript code.

Js code contains several globally scoped variables and functions. 
The following is supported:
* Collect user input and store it in array
* Display hints on accepted values through native browser functionality and type/min/max input element attributes
* Obtain a randomly generated winning set of four numbers from the API via a promise
* Check user input against the winning combination using a for-loop
* Store results in two variables for numbers and posiitons correctly guessed
* Display results via a custom alert message which disappears after 2 seconds
* Display results via a user input log that can be hidden for higher difficulty
* Display number of attempts left after first attempt is submitted
* Play a sound and display a standard alert in the event user enters a winning combination
* Disable the PLAY button after 10 attempts, make opaque color transparent when disabled
* Make the cursor appear as a "hand" when hovering over buttons
* Display and hide game rules and user input log
* Restart the game at any time
* Store session results in a 2D array *so that the results can be posted to an external server or shared on media platforms* (*future functionality*)
* Console displays the winning number set, so that all of the game's functionality can be tested as needed
* Console logs and alerts used for development purposes are intentionally commented out / not deleted

Effects include a royalty-free jpeg & mp3 files and LinkedIn color palette.

