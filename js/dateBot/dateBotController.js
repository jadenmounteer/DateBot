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
        console.log("Initializing DateBot");
        // Initialize DateBot's voice
        initializeVoice(this.voice, userObject, this.dateBotView);
        // Have DateBot rememebr the user's list of favorite dates
        this.model.rememberListOfFavoriteDates();
    
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
                // If the user wants dating advice...
                if (dateBotResponse == "User wants advice for dating") {
                    // Advice for dating code will go here
                    objectCallingFunction.giveUserDatingAdvice(objectCallingFunction, userObject);
                }
                // If the user is deleting their list of favorite dates...
                else if (dateBotResponse == "No problem. Your list of favorite dates are now being wiped from my memory.") {
                    // Call the method to begin the process of deleting the list of favorite dates
                    objectCallingFunction.deleteListOfFavoriteDates(objectCallingFunction, userObject);
                }
                // If the user does not want advice for dating or is not deleting any dates...
                else {
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
                            objectCallingFunction.findPerfectDate(objectCallingFunction, userObject);
                        }
                        else {
                            // Have the user process DateBot's response
                            userObject.processDateBotsResponse(responseJsonData[i], objectCallingFunction);
                        }
                        
                    };

                }
                
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
    findPerfectDate(dateBotObject, userObject){

        // Create the intermediate function to play while DateBot is processing the user's request.
        function saySomethingWhileProcessingRequest(callback) {
            // Grab a witty comment
            dateBotObject.model.comeUpWithSomethingWittyToSay(dateBotObject, callback, userObject);
        }

        // Get the perfect date from the model
        dateBotObject.model.getPerfectDate(dateBotObject, saySomethingWhileProcessingRequest, userObject);
    }

    /**
     * Give the user dating advice
     */
    giveUserDatingAdvice(dateBotObject, userObject) {
        console.log("Giving user dating advice");

        // Create the intermediate function to play while DateBot is processing the user's request.
        function saySomethingWhileProcessingRequest(callback) {
            // Grab a witty comment
            //dateBotObject.model.comeUpWithSomethingWittyToSay(dateBotObject, callback, userObject);
            // Have DateBot tell the user she has found some dates...
            dateBotObject.dateBotView.saySomething(dateBotObject, userObject, "No problem! Here is some dating advice.", "talk()", callback);
        }

        // Grab the dating advice from the model
        dateBotObject.model.getDatingAdvice(dateBotObject, saySomethingWhileProcessingRequest, userObject);

    }

    /**
     * Tells the user that the dates are being erased.
     * @param {*} userObject 
     */
    deleteListOfFavoriteDates(dateBotObject, userObject) {
        // Set a callback function to pass into the saySomething method
       //const callback = dateBotObject.model.deleteListOfFavoriteDatesFromLs(userObject);

        // Create the intermediate function to play while DateBot is processing the user's request.
        function saySomethingWhileProcessingRequest(callback) {
            // Tell the user that the memory is being wiped.
            // After datebot is finished talking, 
            dateBotObject.dateBotView.saySomething(dateBotObject, userObject, "No problem. Your list of favorite dates are now being wiped from my memory.", "talk()", callback);
        }

        // Delete the memory
        dateBotObject.model.deleteListOfFavoriteDatesFromLs(userObject, saySomethingWhileProcessingRequest);

        
    }

    


}
