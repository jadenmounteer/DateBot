/* 
main.js updates view in index.html.
Creates events as well. Does not style,
but it changes the classes of the html elements
User clicks a button and method is triggered in main.js
*/

/*
Called when the user initializes the web page.
*/

// Global variables
let button1 = document.getElementById("response-button-1");
let button2 = document.getElementById("response-button-2");
let button3 = document.getElementById("response-button-3");

function initialize() {
    // Configure DateBot's speech properties
    let voices = [];
    window.speechSynthesis.onvoiceschanged = () => {
        // Get List of Voices
        voices = window.speechSynthesis.getVoices();

        for (let i=0; i<voices.length; i++) {
            
            if (voices[i].name == 'Google UK English Female') {
                dateBot.voice.voice = voices[i];
                dateBot.voice.pitch = 1.06;
                dateBot.voice.lang = "en"; // Change the language to English
                dateBot.voice.text = "Hello I'm DateBot! I'm here to help you find the perfect activity for your date."; // Sets the words that DateBot will say.
                window.speechSynthesis.speak(dateBot.voice); // Cause DateBot to speak
                

                // Initialize the dateBot talking.
                dateBot.talk(4600);
                // Make the buttons appear after the talking animation stops.
                setTimeout(function(){ makeButtonsVisible(); }, 4600);
            }
        }
        
       
    }

    // Create an onclick event for the initial buttons for the user's response
    button1.addEventListener("click", user.respond);
    button2.addEventListener("click", user.respond);
    button3.addEventListener("click", user.respond);


}

/* 
Loops through the user response buttons and makes them visible
*/
function makeButtonsVisible() {
    // Grab all of the response buttons
    const responseButtons = document.getElementsByClassName('response-button');

    // Loop through the buttons
    for (let i=0; i<responseButtons.length; i++) {
        // Make the button visible
        responseButtons[i].style.display = "block";
    }
}



/*** This code is called when the page starts up ***/ 
// Initialize the page
setTimeout(function(){ initialize(); }, 2000);