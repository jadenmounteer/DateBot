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
        <button class="response-button" id="response-button-3">Save to favorite dates</button>
        <button class="response-button" id="response-button-4">Let's do something else</button>
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
            userObject.userView.hideUserResponseButtons();
        });

        // Grab the internet search button
        let internetSearchButton = document.getElementById('response-button-2');
        // Make it visible
        internetSearchButton.style.display = 'inline';
        // Add the event listener to make it do its thing
        setInternetSearchListener(internetSearchButton, internetSearchQuery);

        // Grab the Save to favorite dates button
        let favoriteDatesButton = document.getElementById('response-button-3');
        // Make it visible
        favoriteDatesButton.style.display = 'inline';
        // Add the event listener to make it do its thing
        favoriteDatesButton.addEventListener("click", () => {
            console.log("Saving date to list of favorites");
            favoriteDatesButton.innerHTML = "Date saved as favorite";
            // Disable the button
            favoriteDatesButton.disabled = true;
            // Have DateBot remember the date
            dateBotObject.model.rememberFavoriteDate(dateBotObject, userObject, listOfPerfectDates[indexOfNextDate - 1]);
        });

        /** Render the do something else button **/
        let doSomethingElseButton = document.getElementById('response-button-4');
        // Make it visible
        doSomethingElseButton.style.display = 'inline';
        // Add the event listener to make it do its thing
        doSomethingElseButton.addEventListener("click", () => {
            // Make the button disappear. 
            document.getElementById("response-button-4").style.display = "none";
            // Navigate the user back to the "main menu"
            function callbackFunction() {
                userObject.userView.renderMainMenu(userObject,dateBotObject);
            }
            // Make the buttons invisible
            userObject.userView.hideUserResponseButtons();
            dateBotObject.dateBotView.saySomething(dateBotObject, userObject, "What else can I do for you today?", "talk()", callbackFunction, false);
        }); 
    }

    /**
     * Renders the list of favorite dates to the user
     * @param {*} userObject 
     * @param {*} listOfFavoriteDates 
     */
    renderFavoriteDates(userObject, dateBotObject, listOfFavoriteDates) {
        console.log("rendering favorite dates");

        // Create a div and a table
        let favoriteDatesDiv = document.getElementById('favorite-dates-div');
        favoriteDatesDiv.innerHTML = 
        `
            <table id="favorite-dates-table">
                <thead>
                    <tr>
                        <th>Activity</th>
                        <th>Season</th>
                        <th>Min Price</th>
                        <th>Time of Day</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="favorite-dates-table-body">
                </tbody>
            </table>
        `
        // Add the new div element to the main section of the page
        //document.getElementById('main-section').innerHTML += favoriteDatesDiv;

        // Loop through each date in the list of favorites...
        listOfFavoriteDates.forEach(date => {
            // Render the date within a new row
            let dateRow = 
            `
            <tr class="date-row">
            <td class="date-cell activity-cell">${date.activity}</td>
            <td class="date-cell season-cell">${date.season}</td>
            <td class="date-cell min-price-cell">$${date.minPrice}</td>
            <td class="date-cell time-of-day-cell">${date.timeOfDay}</td>
            <td class="date-cell action-cell">${date.searchQueryButtonName}</td>
            </tr>
            `

            // Append the row to the table in the list of favorite dates div
            document.getElementById('favorite-dates-table-body').innerHTML += dateRow;
        });

        // Make the search query cell trigger an internet search...
        // Grab the internet search button
        let internetSearchButtons = document.getElementsByClassName('action-cell');
        for (let i=0; i <internetSearchButtons.length; i++) {
            // Add the event listener to make it do its thing
            setInternetSearchListener(internetSearchButtons[i], listOfFavoriteDates[i].internetSearchQuery);
        }
        
        // Add a button to have DateBot bring the user back to the main menu
        document.getElementById('user-responses-div').innerHTML = `
        <button class="response-button" id="response-button-1">Let's do something else</button>
        `;
        // Make the button visible
        document.getElementById("response-button-1").style.display = "inline";
        document.getElementById("response-button-1").addEventListener("click", () => {
            // Clear the table
            document.getElementById('favorite-dates-div').innerHTML = "";
            // Make the button disappear. 
            document.getElementById("response-button-1").style.display = "none";
            // Navigate the user back to the "main menu"
            function callbackFunction() {
                console.log("inside callback");
                userObject.userView.renderMainMenu(userObject,dateBotObject);
            }
            
            dateBotObject.dateBotView.saySomething(dateBotObject, userObject, "What else can I do for you today?", "talk()", callbackFunction, false);
        }); 
    }

    renderMainMenu(userObject, dateBotObject) {
        // Reset the responses div
        document.getElementById('user-responses-div').innerHTML = 
        `
          <button class="response-button" id="response-button-1">Hello DateBot! Let's get started</button>
          <button class="response-button" id="response-button-2">Hello DateBot! How are you?</button>
          <button class="response-button" id="response-button-3">What do you do?</button>
          <button class="response-button" id="response-button-4">Can you give me some advice for dating?</button>
          <button class="response-button" id="response-button-5">Can I view my list of favorite dates?</button>
          <button class="response-button" id="response-button-6">Delete my favorite dates</button>
        
        `
        // Make the buttons visible
        userObject.userView.makeButtonsVisible();

        
        // Add the onclick listeners
        document.getElementById("response-button-1").addEventListener("click", () => {userObject.respond(1, userObject, dateBotObject)});
        document.getElementById("response-button-2").addEventListener("click", () => {userObject.respond(2, userObject, dateBotObject)});
        document.getElementById("response-button-3").addEventListener("click", () => {userObject.respond(3, userObject, dateBotObject)});
        document.getElementById("response-button-4").addEventListener("click", () => {userObject.respond(4, userObject, dateBotObject)});
        document.getElementById("response-button-5").addEventListener("click", () => {userObject.respond(5, userObject, dateBotObject)});
        document.getElementById("response-button-6").addEventListener("click", () => {userObject.respond(6, userObject, dateBotObject)});
        
    }
    


}


export default UserView;