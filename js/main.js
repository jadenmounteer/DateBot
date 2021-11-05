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

// Global variables
let button1 = document.getElementById("response-button-1");
let button2 = document.getElementById("response-button-2");
let button3 = document.getElementById("response-button-3");



/*** This code is called when the page starts up ***/ 

// Create an instance of DateBot
const dateBot = new DateBot();

// Create an instance of the user 
const user = new User();

// Initialize dateBot
window.addEventListener("click", () => {
    console.log("Setting timeout");
    setTimeout(function(){ dateBot.initialize(user); }, 1000);
});
//setTimeout(function(){ dateBot.initialize(user); }, 1000);

// Create an onclick event for the initial buttons for the user's response
button1.addEventListener("click", () => {user.respond(button1 ,user, dateBot)});
button2.addEventListener("click", () => {user.respond(button2 ,user, dateBot)});
button3.addEventListener("click", () => {user.respond(button3 ,user, dateBot)});