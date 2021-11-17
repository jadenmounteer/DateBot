// Grab the src of the datebot image so we can change it 
let dateBotImg = document.getElementById("datebot-gif");



class DateBotView {

    // Constructor
    constructor() {
        // The datebot's current gif
        this.dateBotImg = document.getElementById("datebot-gif");
    }
    
    /*
    Changes the gif of dateBot to the talking gif
    */
    talk() {
        document.getElementById("datebot-gif").setAttribute("src", "./assets/DateBot-talking.gif");
    }


    /*
    Changes the gif of dateBot to the love it gif
    */
    loveIt() {
        this.dateBotImg.setAttribute("src", "./assets/DateBot-heart-animation.gif");
    }

    /*
    Changes the gif of dateBot to the nailed it gif
    */
    nailedIt() {
        this.dateBotImg.setAttribute("src", "./assets/DateBot-nailed-it.gif");
    }

    /*
    Changes the gif of dateBot to the confused it gif
    */
    confused() {
        this.dateBotImg.setAttribute("src", "./assets/DateBot-question-mark.gif");
    }

    /*
    Changes the gif of dateBot to the smiling gif
    */
    smile() {
        
        document.getElementById("datebot-gif").setAttribute("src", "./assets/DateBot-blinking-straight-face.gif"); 
    }
    
    /*
    Plays the animation
    */
    playAnimation(animationToPlay) {

        switch(animationToPlay) {
            case "talk()":
                this.talk();
                break;
            case "confused()":
                this.confused();
                break;
            case "loveIt()":
                this.loveIt();
                break;
            case "nailedIt()":
                this.nailedIt();
                break;
            case "smile":
                this.smile();
                break;
        }
    }

    /*
    Displays DateBot's response to the user 
    */
    displayResponse(dateBotResponse) {
        document.getElementById("speech-bubble").innerHTML = dateBotResponse;
    }

    /** Displays the question to the user */
    displayQuestion(questionToAsk){
        console.log("Displaying question");
    }

    /**
     * Displays the perfect date to the user
     * Takes the perfect date object as a parameter
     */
     displayPerfectDate(dateBotObject, listOfPerfectDates, indexOfDateToDisplay, userObject){
         // If the index of the date to display is greater than the length of the list of perfect dates...
         // this means that dateBot has read all of the available dates
         if (indexOfDateToDisplay >= listOfPerfectDates.length) {
             // Set the index of the date to display back to 0
             indexOfDateToDisplay = 0;
         }

         // Set the date to display 
         let dateToDisplay = listOfPerfectDates[indexOfDateToDisplay];

         // Grab the index of the next date to display
         let indexOfNextDate = indexOfDateToDisplay + 1;
         console.log(`index of next date: ${indexOfNextDate}`);
         // grab the animation to play
         let dateBotAnimation = "talk()";
         dateBotObject.voice.text = dateToDisplay.activity; // Sets the words that DateBot will say.
         window.speechSynthesis.speak(dateBotObject.voice); // Cause DateBot to speak
         // Play the animation
         dateBotObject.dateBotView.playAnimation(dateBotAnimation);
         // Display dateBot's response to the user
         dateBotObject.dateBotView.displayResponse(dateToDisplay.activity);
         // When DateBot finishes talking...
         dateBotObject.voice.onend = function() {
             // Change DateBot back to smiling
             dateBotObject.dateBotView.playAnimation("smile");
             // Have the user display the user options
             userObject.userView.displayUserOptions(indexOfNextDate, dateBotObject, userObject, listOfPerfectDates);
         };

    }

    /**
     * The generic method for making DateBot say something
     * @param {*} message 
     */
    saySomething(dateBotObject, userObject, message, animation, callBack, introducingDates, additionalCallbackParameter) {
        // Sets the words that DateBot will say.
        dateBotObject.voice.text = message;
        window.speechSynthesis.speak(dateBotObject.voice); // Cause DateBot to speak
        // Play the talk animation
        dateBotObject.dateBotView.playAnimation(animation);
        // Display dateBot's response to the user
        dateBotObject.dateBotView.displayResponse(message);
        // When DateBot finishes talking...
        dateBotObject.voice.onend = function() {
            // Change DateBot back to smiling
            dateBotObject.dateBotView.playAnimation("smile");
            // If DateBot is introducing dates...
            if (introducingDates) {
                // Call the callback with the following arguments...
                callBack(dateBotObject, additionalCallbackParameter, 0, userObject);
            }
            // If not...
            else {
                // Simply call the callback function
                callBack();
            }
        };

    }

}

export default DateBotView;