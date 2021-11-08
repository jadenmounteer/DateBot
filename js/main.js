/* 
main.js updates view in index.html.
Creates events as well. Does not style,
but it changes the classes of the html elements
User clicks a button and method is triggered in main.js
*/

/*
Called when the user initializes the web page.
*/

// Imports 
import DateBot from "./dateBot/dateBotController.js";
import User from "./user/userController.js";

/*** This code is called when the page starts up ***/ 

// Create an instance of DateBot
const dateBot = new DateBot();

// Create an instance of the user 
const user = new User();

// Add an event listener to the get started button
document.getElementById("get-started-button").addEventListener("click", () => {

    // Insert the necessary html

    document.getElementsByTagName("main")[0].innerHTML = `
    <div id="speech-bubble">Hello I'm DateBot! I'm here to help you find the perfect activity for your date.</div>          

    <!-- The datebot -->

    <div id="date-bot-div">
    <img id="datebot-gif" src="assets/DateBot-blinking-straight-face.gif" width="500">
    </div>
    
    <div id="user-responses-div">

          <button class="response-button" id="response-button-1">Hello DateBot! Let's get started</button>
          <button class="response-button" id="response-button-2">Hello DateBot! How are you?</button>
          <button class="response-button" id="response-button-3">What do you do?</button>
          
        </div>

    
    `;

    // Initialize dateBot
    setTimeout(function(){ dateBot.initialize(user); }, 2000);

    // Create an onclick event for the initial buttons for the user's response
    document.getElementById("response-button-1").addEventListener("click", () => {user.respond(1, user, dateBot)});
    document.getElementById("response-button-2").addEventListener("click", () => {user.respond(2, user, dateBot)});
    document.getElementById("response-button-3").addEventListener("click", () => {user.respond(3, user, dateBot)});

});

