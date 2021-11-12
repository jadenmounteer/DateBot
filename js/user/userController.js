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
        // Find the button being clicked
        let buttonClicked;
        switch(buttonBeingClicked) {
            case 1:
                buttonClicked = document.getElementById("response-button-1");
                break;
            case 2:
                buttonClicked = document.getElementById("response-button-2");
                break;
            case 3:
                buttonClicked = document.getElementById("response-button-3");
                break;
            case 4:
                buttonClicked = document.getElementById("response-button-4");
                break;
            case 5:
                buttonClicked = document.getElementById("response-button-5");
                break;
            case 6:
                buttonClicked = document.getElementById("response-button-6");
                break;
        }

        // Grab the user's response
        const words = buttonClicked.innerHTML;
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
                let userResponse4 = userResponses[i].response4;
                let userResponse5 = userResponses[i].response5;
                let userResponse6 = userResponses[i].response6;
                let userResponse7 = userResponses[i].response7;
                // Call the addNewResponseButtons method
                userObject.userView.addNewResponseButtons(userResponse1, userResponse2, userResponse3, userResponse4, userResponse5, userResponse6, userResponse7);
            }
        }
    }

    
}
