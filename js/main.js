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
    dateBot.smile();

    // Create an onclick event for the initial buttons for the user's response
    button1.addEventListener("click", user.respond);
    button2.addEventListener("click", user.respond);
    button3.addEventListener("click", user.respond);


}


/*** This code is called when the page starts up ***/ 

// Initialize the page
initialize();
