import ajaxHelper from "../utilities/ajaxHelper.js";
import {readFromLS, writeToLS} from "../utilities/localStorage.js";

// This obect holds all of the user's preferences for their date
const userPreferences = {
    budget: undefined,
    season: "undefined",
    time: "undefined"
}

// A place to hold the dating advice
let listOfDatingAdvice = "";
// A place to hold all of the favorite dates
let listOfFavoriteDates = new Array();


export default class DateBotModel {

    constructor() {
        // This property keeps track of if it is time to find a date
        this.timeToFindADate= false;
    }

    rememberResponse(userResponse){
        // Check if the user's response is something DateBot should remember
        switch(userResponse) {
            // Budget answers
            case "I want a free date":
                userPreferences.budget = 0;
                break;
            case "$5 max":
                userPreferences.budget = 5;
                break;
            case "$10 max":
                userPreferences.budget = 10;
                break;
            case "$20 max":
                userPreferences.budget = 20;
                break;
            case "$30 max":
                userPreferences.budget = 30;
                break;
            case "$50 or more":
                userPreferences.budget = 999;
                break;
            
            // Season answers
            case "Spring":
                userPreferences.season = "Spring";
                break;
            case "Summer":
                userPreferences.season = "Summer";
                break;
            case "Fall":
                userPreferences.season = "Fall";
                break;
            case "Winter":
                userPreferences.season = "Winter";
                break;
            case "I prefer a date I can do in any season":
                userPreferences.season = "Any season";
                break;

            // Time answers
            case "Early morning":
                userPreferences.time = userResponse;
                this.timeToFindADate = true;
                break;
            case "Morning":
                userPreferences.time = userResponse;
                this.timeToFindADate = true;
                break;
            case "Afternoon":
                userPreferences.time = userResponse;
                this.timeToFindADate = true;
                break;
            case "Evening":
                userPreferences.time = userResponse;
                this.timeToFindADate = true;
                break;
            case "Night":
                userPreferences.time = userResponse;
                this.timeToFindADate = true;
                break;
            case "Any time":
                userPreferences.time = userResponse;
                this.timeToFindADate = true;
                break;
        }
    }

    /**
     * Filters a list of dates for the dates that meet the user's preferences
     */
     filterForPerfectDates(listOfAllDates) {
        console.log("Filtering for perfect dates!");
        // Create a separate list to house the list of perfect dates
        let listOfPerfectDates = new Array();

        // Loop through the listOfAllDates
        listOfAllDates.forEach(date => {
            // Check if the season matches the user's preference or any season
            if (date.season == userPreferences.season || date.season == "Any season" || date.season.includes(userPreferences.season)) {
                console.log("Date matches season");
                // If it does, check if the user's budget is greater than 
                // or equal to the minimum price of the date
                if (userPreferences.budget >= date.minPrice) {
                    // If it is, check if the time of day is equal to the
                    // user's preference or if the time is Any time
                    // or if the date;s time of day includes the user's preference
                    if (date.timeOfDay == userPreferences.time || date.timeOfDay == "Any time" || date.timeOfDay.includes(userPreferences.time)){
                        // If it is, then it meets all of the criteria to be a perfect date.
                        // Add it to the list of perfect dates
                        listOfPerfectDates.push(date);
                    }

                }

            }
            
        });

        // Shuffle the list of perfect dates
        function shuffle(array) {
            let currentIndex = array.length,  randomIndex;
          
            // While there remain elements to shuffle...
            while (currentIndex != 0) {
          
              // Pick a remaining element...
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex--;
          
              // And swap it with the current element.
              [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
            }
          
            return array;
          }
        let shuffledArray = shuffle(listOfPerfectDates);


        // Return the shuffled list
        return shuffledArray;

    }

    /**
     * Calls an ajax request to return the list of possible dates.
     * Filters the list according to what she rememnbers from the user
     * Takes a callback as an argument. The callback will be called after the code is done doing its thing.
     */
    getPerfectDate(dateBotObject, intermediateFunction, userObject){

        // Create a new promise that will use AJAX to retrieve the perfect date
        // from the date-a-base
        const getDates = new Promise( (resolve, reject) => {
            
            const xhttp = new XMLHttpRequest();

            xhttp.onload = function() {
                
                // If it is successful, resolve the promise with the response
                if (this.status == 200) {
                    console.log(this.responseText);
                    // Filter the returned list of date objects for the perfect date
                    let listOfPerfectDates = dateBotObject.model.filterForPerfectDates(JSON.parse(this.responseText));
                    resolve(listOfPerfectDates);
                }
                // If it is not successful. Reject it with the error
                else {
                    reject(error);
                }
            };
            xhttp.open("GET", "./json/date-a-base.json");
            xhttp.send();
        });
        
        // While DateBot is processing the user's request, play the intermediate function
        // Takes a function as a callback that finishes displaying the date. We do this
        // so that the date isn't displayed until DateBot is finished talking.
        intermediateFunction(() => {
            // When the getDates promise is finished...
            getDates.then(
                // If it was successful...
                function(value){
                    // Have DateBot tell the user she has found some dates...
                    dateBotObject.dateBotView.saySomething(dateBotObject, userObject, "Thank you for waiting. I have found some dates I think you will like. Here they are.", "talk()", dateBotObject.dateBotView.displayPerfectDate, true, value);
                },
                function(error){console.log(`Error! ${error}`);}
            )
        }); 
        
    }

    /**
     * DateBot comes up with something witty to say 
     * by making an http request to a JSON file.
     */
    comeUpWithSomethingWittyToSay(dateBotObject, callback, userObject){
            const xhttp = new XMLHttpRequest();

            xhttp.onload = function() {
                
                // If it is successful, resolve the promise with the response
                if (this.status == 200) {
                    // Parse the witty comment list and store it in a variable
                    let listOfWittyComments = JSON.parse(this.responseText);
                    // Filter the list for a witty comment by choosing a random number between 1 and the length of the list
                    let randomNumber = Math.floor(Math.random() * listOfWittyComments.length);
                    let wittyComment = listOfWittyComments[randomNumber].comment;
                    // Make DateBot say something witty by calling the method in the view
                    dateBotObject.dateBotView.saySomething(dateBotObject, userObject, wittyComment, "talk()", callback, false);
                }
                // If it is not successful. Reject it with the error
                else {
                    return "Error processing request";
                }
            };
            xhttp.open("GET", "./json/dateBotWittyComments.json");
            xhttp.send();

    }

    /**
     * Calls an ajax request to return the list of dating advice.
     * Takes a callback as an argument. The callback will be called after the code is done doing its thing.
     */
     getDatingAdvice(dateBotObject, intermediateFunction, userObject){
        // If this is the first time the user is asking for dating advice...
        if (listOfDatingAdvice == "") {
            // Fetch the dating advice with a promise
            const getDatingAdvice = ajaxHelper.fetchJSON("./json/datingAdvice.json");

            // While DateBot is processing the user's request, play the intermediate function
            // Takes a function as a callback that finishes displaying the advice. We do this
            // so that the advice isn't displayed until DateBot is finished talking.
            intermediateFunction(() => {
                // When the getDates promise is finished...
                getDatingAdvice.then(
                    // If it was successful...
                    function(value){
                        // Update the list of advice
                        listOfDatingAdvice = value;
                        // Have DateBot choose a random piece of advice to give
                        let indexOfRandomPieceOfAdvice = dateBotObject.model.findRandomObjectInArray(listOfDatingAdvice);
                        // Have DateBot tell the user she has found some advice. Call the next function.
                        //dateBotObject.dateBotView.saySomething(dateBotObject, userObject, "Thank you for waiting. I have some dating advice for you.", "talk()", dateBotObject.dateBotView.displayDatingAdvice, true, listOfDatingAdvice);
                        // Have DateBot display a piece of advice
                        dateBotObject.dateBotView.displayDatingAdvice(dateBotObject, listOfDatingAdvice, indexOfRandomPieceOfAdvice, userObject);
                    },
                    function(error){console.log(`Error! ${error}`);}
                )
            }); 
            
        }
        // Since this is not the first time DateBot is getting the dating advice, we can skip the promise 
        else {
            // Have DateBot choose a random piece of advice to give
            let indexOfRandomPieceOfAdvice = dateBotObject.model.findRandomObjectInArray(listOfDatingAdvice);
            // Have DateBot display a piece of advice
            dateBotObject.dateBotView.displayDatingAdvice(dateBotObject, listOfDatingAdvice, indexOfRandomPieceOfAdvice, userObject);
        }
        
        
        
    }

    /** 
     * Grab and return a random index of an array.
     */
    findRandomObjectInArray(listofItems) {
        console.log("Finding index");
        // Grab the lentgh of the array
        const lengthOfArray = listofItems.length + 1;

        // return a random number in the list
        return Math.floor((Math.random() * lengthOfArray) + 1) - 1;

    }

    /**
     * Remembers a date that the user marked as favorite by adding it to the list. Adds the list to local storage.
     * @param {*} dateBotObject 
     * @param {*} userObject 
     * @param {*} favoriteDate 
     */
    rememberFavoriteDate(dateBotObject, userObject, favoriteDate) {
        console.log("Remembering favorite date");
        // Add the favorite date to the list of favorite dates
        console.log(`pushing date: ${favoriteDate.activity}`);
        listOfFavoriteDates.push(favoriteDate);
        console.log(`There are now ${listOfFavoriteDates.length} dates in the list`);
        // Add the list of favorite dates to localStorage so DateBot remembers next time
        // The key to accessing the data is list-of-favorite-dates
        writeToLS("list-of-favorite-dates", listOfFavoriteDates);
    }

    /**
     * DateBot remembers the user's list of favorite dates and pulls them from local storage
     */
    rememberListOfFavoriteDates() {

        if (readFromLS("list-of-favorite-dates") != null) {
            listOfFavoriteDates = readFromLS("list-of-favorite-dates");
        }
        
        if (listOfFavoriteDates) {
            console.log(`Looks like the user had ${listOfFavoriteDates.length} dates saved as favorite`);
        }
        
    }

    // Deletes the list of favorite dates from local storage and clears the list of favorite dates
    deleteListOfFavoriteDatesFromLs(userObject, intermediateFunction) {
        intermediateFunction(() => {
            // Clear local storage
            localStorage.clear();
            // Make the list of favorite dates start from scratch
            listOfFavoriteDates = new Array();
            // Update the view with the user options
            userObject.userView.addNewResponseButtons("Let's get started", "Hello DateBot! How are you?", "What do you do?", "Can you give me some advice for dating?", "Can I view my list of favorite dates?");
        }); 
    }

    /**
     * Grabs the list of favorite dates. If there are no dates, DateBot tells the user and brings them back to the main menu.
     * If there are dates, she displays them to the user.
     * @param {*} userObject 
     * @param {*} intermediateFunction 
     */
     grabFavoriteDates(userObject, dateBotObject, intermediateFunction) {

         // If there are dates in the list of favorite dates...
         if (listOfFavoriteDates.length > 0) {
            console.log(`Looks like the user had ${listOfFavoriteDates.length} dates saved as favorite`);
            intermediateFunction(() => {
                // Update the view
                userObject.userView.renderFavoriteDates(userObject, dateBotObject, listOfFavoriteDates);
                //userObject.userView.addNewResponseButtons("Let's get started", "What do you do?", "Can you give me some advice for dating?", "Can I view my list of favorite dates?");
            }); 
        }
        // If there are no dates in the list of dates...
        else{
            console.log("User has no favorite dates");
            intermediateFunction(() => {
                // Update the view with the user options
                userObject.userView.addNewResponseButtons("Let's get started", "Hello DateBot! How are you?", "What do you do?", "Can you give me some advice for dating?", "Can I view my list of favorite dates?");
               
            }); 
        }
        
    }

}