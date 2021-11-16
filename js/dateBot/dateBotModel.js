import getNewJsonList from "../utilities/ajaxHelper.js";

// This obect holds all of the user's preferences for their date
const userPreferences = {
    budget: undefined,
    season: "undefined",
    time: "undefined"
}


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
        console.log(`The user's time preference is ${userPreferences.time}`);
        console.log(`The user's season preference is ${userPreferences.season}`);


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
                        console.log("Date matches time of day");
                        console.log(`pushing date: ${date.activiy}`);
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


        // Return the list of perfect dates to the user
        return shuffledArray;

    }

    /**
     * Calls an ajax request to return the list of possible dates.
     * Filters the list according to what she rememnbers from the user
     * Takes a callback as an argument. The callback will be called after the code is done doing its thing.
     */
    getPerfectDate(dateBotObject, callBack, intermediateFunction, userObject){

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
                    // Calls the callback function with the perfect date as a parameter
                    // The callback function is the view's displayPerfectDate() method
                    callBack(dateBotObject, value, 0, userObject);
                },
                function(error){console.log(`Error! ${error}`);}
            )
        }); 
        
    }

    /**
     * DateBot comes up with something witty to say 
     * by making an http request to a JSON file.
     */
    comeUpWithSomethingWittyToSay(dateBotObject, callback){
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
                    dateBotObject.dateBotView.saySomethingWitty(callback, wittyComment, dateBotObject);
                }
                // If it is not successful. Reject it with the error
                else {
                    return "Please wait while I process your request";
                }
            };
            xhttp.open("GET", "./json/dateBotWittyComments.json");
            xhttp.send();

    }

    


}