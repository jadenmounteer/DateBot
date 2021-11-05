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
alert("Initializing page");
// Global variables
let button1 = document.getElementById("response-button-1");
let button2 = document.getElementById("response-button-2");
let button3 = document.getElementById("response-button-3");



/*** This code is called when the page starts up ***/ 

// Create an instance of DateBot
const dateBot = new DateBot();

// Create an instance of the user 
const user = new User();
let voice = new SpeechSynthesisUtterance();
// Test 
document.getElementById("test-button").addEventListener("click", () => {
    alert("You just clicked on the button");
    console.log("You clicked me")
    // Configure DateBot's speech properties
    let voices = [];
    window.speechSynthesis.onvoiceschanged = () => {
        // Get List of Voices
        voices = window.speechSynthesis.getVoices();

        /** This will log all of the available voices **/
        /*
        for (let i=0; i<voices.length; i++) {
            console.log(voices[i]);
        }
        */

        for (let i=0; i<voices.length; i++) {
            // Google UK English Female
            //Google português do Brasil
            if (voices[i].name == 'Google UK English Female') {
                voice.voice = voices[i];
                voice.pitch = 1.06; // Change the pitch 1.06
                voice.lang = "en"; // Change the language to English
                voice.text = "Hello I'm DateBot! I'm here to help you find the perfect activity for your date."; // Sets the words that DateBot will say.
                window.speechSynthesis.speak(voice); // Cause DateBot to speak
            }
        }  
        alert("Voice just sounded ");
    }
});
// Initialize dateBot
//setTimeout(function(){ dateBot.initialize(user); }, 1000);

// Create an onclick event for the initial buttons for the user's response
button1.addEventListener("click", () => {user.respond(button1 ,user, dateBot)});
button2.addEventListener("click", () => {user.respond(button2 ,user, dateBot)});
button3.addEventListener("click", () => {user.respond(button3 ,user, dateBot)});