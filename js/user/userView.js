// Import the internet search listener function so we can search the internet
import  {setInternetSearchListener} from '../utilities/internetSearchHelper.js';

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
    addNewResponseButtons(response1, response2, response3, response4, response5, response6, response7) {
        // Grab all of the response buttons
        const responseButtons = document.getElementsByClassName('response-button');

        // Make a list of the responses
        const listOfNewResponses = [response1, response2, response3, response4, response5, response6, response7];

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

    /**
     * Displays the user's options after DateBot presents a date idea
     */
    displayUserOptions(indexOfNextDate, dateBotObject, userObject, listOfPerfectDates) {

        // Grab the internet search button label
        const internetSearchButtonLabel = listOfPerfectDates[indexOfNextDate - 1].searchQueryButtonName;
        // Grab the internet search query
        const internetSearchQuery = listOfPerfectDates[indexOfNextDate - 1].internetSearchQuery;

        // Grab the user response div and overwrite the innerHTML with the new user options
        document.getElementById('user-responses-div').innerHTML = `
        <button class="response-button" id="response-button-1">Next Idea</button>
        <button class="response-button" id="response-button-2">${internetSearchButtonLabel}</button>
        `
        // Grab the nextButton
        let nextButton = document.getElementById('response-button-1');
        // Make it visible
        nextButton.style.display = 'inline';
        
        // Add the event listener to make it do its thing
        nextButton.addEventListener("click", () => {
            // When the user clicks on the button, display the corresponding date and show the button
            dateBotObject.dateBotView.displayPerfectDate(dateBotObject, listOfPerfectDates, indexOfNextDate, userObject);
            // Make the buttons invisible
            document.getElementById('response-button-1').style.display = 'none';
            document.getElementById('response-button-2').style.display = 'none';
        });

        // Grab the internet search button
        let internetSearchButton = document.getElementById('response-button-2');
        // Make it visible
        internetSearchButton.style.display = 'inline';
        // Add the event listener to make it do its thing
        setInternetSearchListener(internetSearchButton, internetSearchQuery);
    }


}


export default UserView;