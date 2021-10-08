const user = {

    /*** Methods ***/

    /* 
    Hides all of the buttons
    */
    hideUserResponseButtons: function() {
        // Grab the user response buttons 
        const listOfButtons = document.getElementsByClassName('response-button');
        // Loop through the buttons
        for (let i=0; i<listOfButtons.length; i++) {
            // Hide the button
            listOfButtons[i].style.display = 'none';
        }
    },

    /*
    Respond to DateBot. 
    Triggered when the user clicks a button.
    */
    respond: function(event) {
        // Grab the user's response
        const words = event.target.innerHTML;
        // Hide the old buttons so the user cannot see them and click them again.
        user.hideUserResponseButtons();
        // Make dateBot respond
        dateBot.processUserResponse(words);
    },

    /* 
    Processes DateBot's response.
    Takes the response object as a parameter.
    Makes an AJAX request to user response file.
    Loops through the data and determines the correct user response.
    Creates new response buttons accordingly, after the DateBot animation
    has stopped.
    We don't want to be rude and interrupt DateBot.
    */
    processDateBotsResponse: function(DateBotsResponseObject) {
        // Call the method for getting json data from the responses.json file.
        user.getNewJsonMessage("./json/userResponses.json", DateBotsResponseObject); 
    },

    /*
    The AJAX request for getting json data
    */
    getNewJsonMessage: function(jsonFile, dateBotResponse) {
        const xhttp = new XMLHttpRequest();

        xhttp.onload = function() {
        // Parse the response to turn it into a JavaScript object
        let responses = JSON.parse(this.responseText);
        // Call the respond method
        user.getReadyToRespond(responses, dateBotResponse);
        };

        xhttp.open("GET", jsonFile);
        xhttp.send();
    },

    /*
    Get's the user ready to respond to DateBot again
    by creating new buttons after DateBot is done with its animation.
    */
    getReadyToRespond(userResponses, dateBotResponse) {
        // Loop through the response data
        for (let i=0; i<userResponses.length; i++) {
            // If the dateBot response matches the key
            if (dateBotResponse.dateBotResponse == userResponses[i].dateBotResponse) {
                // grab the user's responses
                let userResponse1 = userResponses[i].response1;
                let userResponse2 = userResponses[i].response2;
                let userResponse3 = userResponses[i].response3;
                // Call the addNewResponseButtons method
                user.addNewResponseButtons(userResponse1, userResponse2, userResponse3);
            }
        }
    },

    /* 
    Adds new response buttons to the screen.
    */
    addNewResponseButtons(response1, response2, response3) {
        console.log("Adding new response buttons");
        // Grab all of the response buttons
        const responseButtons = document.getElementsByClassName('response-button');

        // Make a list of the responses
        const listOfNewResponses = [response1, response2, response3];

        // Loop through the buttons
        for (let i=0; i<responseButtons.length; i++) {
            // Change the text of the button to the new text
            responseButtons[i].innerHTML = listOfNewResponses[i];
            // Make the button visible again
            responseButtons[i].style.display = "inline";
        }

    }

    


    

    
}