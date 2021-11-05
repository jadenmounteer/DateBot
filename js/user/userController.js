// Import the model and the view
import UserModel from "./userModel.js";
import UserView from "./userView.js";
import getNewJsonMessage from "../utilities/ajaxHelper.js";


export default class User {

    // Constructor
    constructor() {
        // Create instances of the model and view
        this.model = new UserModel();
        this.userView = new UserView();
    }

    /*** Methods ***/

    /*
    Respond to DateBot. 
    Triggered when the user clicks a button.
    */
    respond(buttonBeingClicked, userObject, dateBotObject) {
        // Grab the user's response
        const words = buttonBeingClicked.innerHTML;
        // Hide the old buttons so the user cannot see them and click them again.
        userObject.userView.hideUserResponseButtons();
        // Make dateBot respond
        dateBotObject.processUserResponse(words, userObject);
    }

    /* 
    Processes DateBot's response.
    Takes the response object as a parameter.
    Makes an AJAX request to user response file.
    Loops through the data and determines the correct user response.
    Creates new response buttons accordingly, after the DateBot animation
    has stopped.
    We don't want to be rude and interrupt DateBot.
    */
    processDateBotsResponse(DateBotsResponseObject, dateBotObject) {
        // Call the method for getting json data from the responses.json file.
        //let responses = getNewJsonMessage("./json/userResponses.json", DateBotsResponseObject);
        getNewJsonMessage.getNewJsonMessage("./json/userResponses.json", DateBotsResponseObject, this.getReadyToRespond, this, dateBotObject);
    }


    /*
    Get's the user ready to respond to DateBot again
    by creating new buttons after DateBot is done with its animation.
    */
    getReadyToRespond(userResponses, dateBotResponse, userObject, dateBotObject) {
        // Loop through the response data
        for (let i=0; i<userResponses.length; i++) {
            // If the dateBot response matches the key
            if (dateBotResponse.dateBotResponse == userResponses[i].dateBotResponse) {
                // grab the user's responses
                let userResponse1 = userResponses[i].response1;
                let userResponse2 = userResponses[i].response2;
                let userResponse3 = userResponses[i].response3;
                // Call the addNewResponseButtons method
                userObject.userView.addNewResponseButtons(userResponse1, userResponse2, userResponse3);
            }
        }
    }

    
}