/* 
This file contains the date bot object, properties, and functions
*/

// Import the model and the view
import DateBotModel from "./dateBotModel.js";
import DateBotView from "./dateBotView.js";
import getNewJsonMessage from "../utilities/ajaxHelper.js";
import  {initializeVoice, setVoiceMessage} from '../utilities/speechSynthHelper.js';




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
    initialize(userObject) {
        // Initialize DateBot's voice
        initializeVoice(this.voice, userObject, this.dateBotView);
    
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
                // Make DateBot remember the user's response
                objectCallingFunction.model.rememberResponse(userResponse);
                // grab the animation to play
                let dateBotAnimation = responseJsonData[i].animation;
                // grab the animation duration
                let dateBotAnimationDuration = responseJsonData[i].animationDuration;
                objectCallingFunction.voice.text = dateBotResponse; // Sets the words that DateBot will say.
                window.speechSynthesis.speak(objectCallingFunction.voice); // Cause DateBot to speak
                // Play the animation
                objectCallingFunction.dateBotView.playAnimation(dateBotAnimation);
                // Display dateBot's response to the user
                objectCallingFunction.dateBotView.displayResponse(dateBotResponse);
                // When DateBot finishes talking...
                objectCallingFunction.voice.onend = function() {
                    // Change DateBot back to smiling
                    objectCallingFunction.dateBotView.playAnimation("smile");
                    // Check if it is time to find a date
                    if (objectCallingFunction.model.timeToFindADate) {
                        // Find the user the perfect date!
                        objectCallingFunction.findPerfectDate(objectCallingFunction);
                    }
                    else {
                        // Have the user process DateBot's response
                        userObject.processDateBotsResponse(responseJsonData[i], objectCallingFunction);
                    }
                    
                };
            }
        }
    }

    /**
     * DateBot asks the user a question.
     * @param {} questionToAsk 
     */
     askQuestion(questionToAsk){
         // Call the necessary function from the view to render the question to the screen
         this.dateBotView.displayQuestion(questionToAsk);
    }

    /**
     * Here, datebot finds the perfect date for the user
     */
    findPerfectDate(dateBotObject){

        // Create the intermediate function to play while DateBot is processing the user's request.
        function saySomethingWhileProcessingRequest(callback) {
            console.log("Inside intermediate function");
            // Grab a witty comment
            dateBotObject.model.comeUpWithSomethingWittyToSay(dateBotObject, callback);
            // Have DateBot say the witty comment
            //dateBotObject.dateBotView.saySomethingWitty(callback, wittyComment, dateBotObject);
            
        }

        // Get the perfect date from the model
        dateBotObject.model.getPerfectDate(dateBotObject.dateBotView.displayPerfectDate, saySomethingWhileProcessingRequest);
    }

    


}
