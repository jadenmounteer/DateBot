/* 
This file contains the date bot object, properties, and functions
*/

// Import the model and the view
import DateBotModel from "./dateBotModel.js";
import DateBotView from "./dateBotView.js";
import getNewJsonMessage from "../utilities/ajaxHelper.js";




/* 
The DateBot class
*/
export default class DateBotController {

    // Constructor
    constructor() {
        // Create instances of the model and view
        this.model = new DateBotModel();
        this.dateBotView = new DateBotView();
        // DateBot's voice
        this.voice = new SpeechSynthesisUtterance();
    }
    

    /***  Methods ***/

    /**
     * Initializes dataBot
     */
    initialize() {
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
                    this.voice.voice = voices[i];
                    this.voice.pitch = 1.06; // Change the pitch 1.06
                    this.voice.lang = "en"; // Change the language to English
                    this.voice.text = "Hello I'm DateBot! I'm here to help you find the perfect activity for your date."; // Sets the words that DateBot will say.
                    window.speechSynthesis.speak(this.voice); // Cause DateBot to speak
    
                    // Initialize the dateBot talking.
                    this.dateBotView.talk(4600);
                }
            }  
        }
    
    }

    /* 
    Processes the user's response 
    and then responds.
    TODO: Put all of DateBot's responses in a json file with a key and a value.
    Have the userResponse be the key. Return dateBot's response and add it to the html.
    Change the buttons accordingly. Maybe the json can have something for the buttons as well?
    */
   processUserResponse(userResponse, userObject) {
      // Call the function for getting json data from the responses.json file.
      getNewJsonMessage.getNewJsonMessage("./json/dateBotResponses.json", userResponse, this.respond, this, userObject);
   }

    /* 
    Takes the user response as input, outputs the response
    */
    respond(responseJsonData, userResponse, objectCallingFunction, userObject) {

        // Loop through the response data
        for (let i=0; i<responseJsonData.length; i++) {
            // If the user response matches the key
            if (userResponse == responseJsonData[i].userResponse) {
                // grab datebot's response
                let dateBotResponse = responseJsonData[i].dateBotResponse;
                // grab the animation to play
                let dateBotAnimation = responseJsonData[i].animation;
                // grab the animation duration
                let dateBotAnimationDuration = responseJsonData[i].animationDuration;
                objectCallingFunction.voice.text = dateBotResponse; // Sets the words that DateBot will say.
                window.speechSynthesis.speak(objectCallingFunction.voice); // Cause DateBot to speak
                // Play the animation
                objectCallingFunction.dateBotView.playAnimation(dateBotAnimationDuration, dateBotAnimation);
                // Display dateBot's response to the user
                objectCallingFunction.dateBotView.displayResponse(dateBotResponse);
                // Have the user process DateBot's response after the animation plays
                setTimeout(function(){ userObject.processDateBotsResponse(responseJsonData[i], objectCallingFunction); },
                 responseJsonData[i].animationDuration);
            }
        }
    }

}
