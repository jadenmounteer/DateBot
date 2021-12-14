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

console.log("In main.js");

// Create an instance of DateBot
const dateBot = new DateBot();

// Create an instance of the user 
const user = new User();

let buttonEvent;
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    buttonEvent = "touchend";
}
else {
    buttonEvent = "click"
}
// Add an event listener to the on button
document.getElementById("on-button").addEventListener(buttonEvent, () => {
    console.log("User clicked on ON button");
    // Make the button invisible
    event.target.style.display = 'none';
    // DateBot turns on by playing the animation
    const dateBotGif = document.getElementById('datebot-gif');
    dateBotGif.src = "assets/DateBot Initializing.gif";

    // Change the necessary html after the animation stops playing
    setTimeout(function(){ 
        console.log("In timeout function");

        // Remove the invisble class from speech bubble
        const speechBubble = document.getElementById('speech-bubble');
        speechBubble.classList.remove('speech-bubble-invisible');
        speechBubble.innerHTML = "Hello I am DateBot! I'm here to help you find the perfect activity for your date.";

        // Change datebot to the correct animation
        dateBotGif.classList.remove('datebot-sleeping');
        console.log("Changed datebot class");

        // Change the buttons
        document.getElementById('user-responses-div').innerHTML = `
        <div id="user-responses-div">

          <button class="response-button" id="response-button-1">Hello DateBot! Let's get started</button>
          <button class="response-button" id="response-button-2">Hello DateBot! How are you?</button>
          <button class="response-button" id="response-button-3">What do you do?</button>
          <button class="response-button" id="response-button-4">Can you give me some advice for dating?</button>
          <button class="response-button" id="response-button-5">Can I view my list of favorite dates?</button>
          <button class="response-button" id="response-button-6">Delete my favorite dates</button>
        </div>
        `;
        console.log("Added user response buttons");

        // Initialize dateBot
        dateBot.initialize(user);
        //setTimeout(function(){ dateBot.initialize(user); }, 500);

        // Create an onclick event for the initial buttons for the user's response
        document.getElementById("response-button-1").addEventListener("click", () => {user.respond(1, user, dateBot)});
        document.getElementById("response-button-2").addEventListener("click", () => {user.respond(2, user, dateBot)});
        document.getElementById("response-button-3").addEventListener("click", () => {user.respond(3, user, dateBot)});
        document.getElementById("response-button-4").addEventListener("click", () => {user.respond(4, user, dateBot)});
        document.getElementById("response-button-5").addEventListener("click", () => {user.respond(5, user, dateBot)});
        document.getElementById("response-button-6").addEventListener("click", () => {user.respond(6, user, dateBot)});


     }, 3500);

    

    

});

