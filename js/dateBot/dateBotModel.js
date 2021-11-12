import getNewJsonList from "../utilities/ajaxHelper.js";

// This obect holds all of the user's preferences for their date
const userPreferences = {
    budget: "undefined",
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
                userPreferences.budget = "Free";
                break;
            case "$5 max":
                userPreferences.budget = "5";
                break;
            case "$10 max":
                userPreferences.budget = "10";
                break;
            case "$20 max":
                userPreferences.budget = "20";
                break;
            case "$30 max":
                userPreferences.budget = "30";
                break;
            case "$50 or more":
                userPreferences.budget = "50";
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
     * Calls an ajax request to return the list of possible dates.
     * Filters the list according to what she rememnbers from the user
     * Takes a callback as an argument. The callback will be called after the code is done doing its thing.
     */
    getPerfectDate(callBack, intermediateFunction){

        // Create a new promise that will use AJAX to retrieve the perfect date
        // from the date-a-base
        const getDates = new Promise( (resolve, reject) => {
            
            const xhttp = new XMLHttpRequest();

            xhttp.onload = function() {
                
                // If it is successful, resolve the promise with the response
                if (this.status == 200) {
                    resolve(this.responseText);
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
                    // Filter the returned list of date objects for the perfect date
                    console.log("Filtering for perfect date");
                    let perfectDate = value;
                    // Calls the callback function with the perfect date as a parameter
                    callBack(perfectDate);
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
                    console.log(`something witty = ${this.responseText}`);
                    let listOfWittyComments = JSON.parse(this.responseText);
                    // Filter the list for a witty comment by choosing a random number between 1 and the length of the list
                    let randomNumber = Math.floor(Math.random() * listOfWittyComments.length);
                    console.log("The randome number is " + randomNumber);
                    console.log(`The witty comment object is ${listOfWittyComments[randomNumber]}`);
                    let wittyComment = listOfWittyComments[randomNumber].comment;
                    console.log(`Witty comment: ${wittyComment}`);
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