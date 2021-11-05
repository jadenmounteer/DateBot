class UserView {

    /* 
    Loops through the user response buttons and makes them visible
    */
    makeButtonsVisible() {
        // Grab all of the response buttons
        const responseButtons = document.getElementsByClassName('response-button');

        // Loop through the buttons
        for (let i=0; i<responseButtons.length; i++) {
            // Make the button visible
            responseButtons[i].style.display = "block";
        }
    }

    /* 
    Hides all of the buttons
    */
    hideUserResponseButtons() {
        // Grab the user response buttons 
        const listOfButtons = document.getElementsByClassName('response-button');
        // Loop through the buttons
        for (let i=0; i<listOfButtons.length; i++) {
            // Hide the button
            listOfButtons[i].style.display = 'none';
        }
    }

    /* 
    Adds new response buttons to the screen.
    */
    addNewResponseButtons(response1, response2, response3) {
        // Grab all of the response buttons
        const responseButtons = document.getElementsByClassName('response-button');

        // Make a list of the responses
        const listOfNewResponses = [response1, response2, response3];

        // Loop through the buttons
        for (let i=0; i<responseButtons.length; i++) {
            // Change the text of the button to the new text
            responseButtons[i].innerHTML = listOfNewResponses[i];
            // If the button text is not undefined
            if (responseButtons[i].innerHTML != 'undefined') {
                // Make the button visible again
                responseButtons[i].style.display = "inline";
            }
            
        }

    }


}


export default UserView;