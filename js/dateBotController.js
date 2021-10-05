/* 
This file contains the date bot object, properties, and functions
*/


/* 
The DateBot object
*/
const dateBot = {

    /***  Properties ***/

    // The DateBot's current gif
    dateBotImg: document.getElementById("datebot-gif"),

    // The DateBot's voice
    voice: new SpeechSynthesisUtterance(),
    

    /***  Methods ***/

    /*
    Changes the gif of dateBot to the talking gif
    */
    talk: function(animationDuration) {
        this.dateBotImg.setAttribute("src", "./assets/DateBot-talking.gif");
        // Make dateBot smile after 4 seconds
        setTimeout(function(){ dateBot.smile(); }, animationDuration);
    },

    /*
    Changes the gif of dateBot to the smiling gif
    */
    smile: function() {
        this.dateBotImg.setAttribute("src", "./assets/DateBot-blinking-straight-face.gif"); 
    },

    /*
    Changes the gif of dateBot to the love it gif
    */
    loveIt: function(animationDuration) {
        this.dateBotImg.setAttribute("src", "./assets/DateBot-heart-animation.gif");
        // Make dateBot smile after 10 seconds
        setTimeout(function(){ dateBot.smile(); }, animationDuration);
    },

    /*
    Changes the gif of dateBot to the nailed it gif
    */
    nailedIt: function(animationDuration) {
        this.dateBotImg.setAttribute("src", "./assets/DateBot-nailed-it.gif");
        // Make dateBot smile after 7 seconds
        setTimeout(function(){ dateBot.smile(); }, animationDuration);
    },

    /*
    Changes the gif of dateBot to the confused it gif
    */
    confused: function(animationDuration) {
        this.dateBotImg.setAttribute("src", "./assets/DateBot-question-mark.gif");
        // Make dateBot smile after 7 seconds
        setTimeout(function(){ dateBot.smile(); }, animationDuration);
    },

    /* 
    Processes the user's response 
    and then responds.
    TODO: Put all of DateBot's responses in a json file with a key and a value.
    Have the userResponse be the key. Return dateBot's response and add it to the html.
    Change the buttons accordingly. Maybe the json can have something for the buttons as well?
    */
   processUserResponse: function(userResponse) {
      // Call the method for getting json data from the responses.json file.
      dateBot.getNewJsonMessage("./json/dateBotResponses.json", userResponse);   
   },

   /*
   The AJAX request for getting json data
   */
   getNewJsonMessage: function(jsonFile, userResponse) {
    const xhttp = new XMLHttpRequest();

    xhttp.onload = function() {
      // Parse the response to turn it into a JavaScript object
      let responses = JSON.parse(this.responseText);
      // Call the respond method
      dateBot.respond(responses, userResponse);
    };

    xhttp.open("GET", jsonFile);
    xhttp.send();
  },

    /* 
    Takes the user response as input, outputs the response
    */
    respond: function(responseJsonData, userResponse) {
        
        // Loop through the response data
        for (let i=0; i<responseJsonData.length; i++) {
            // If the user response matches the key
            if (userResponse == responseJsonData[i].userResponse) {
                // grab datebot's response
                let dateBotResponse = responseJsonData[i].dateBotResponse;
                // grab the animation to play
                let dateBotAnimation = responseJsonData[i].animation;
                // grab the animation duration
                let dateBotAnimationDuration = responseJsonData[i].animationDuration;
                // Play the animation
                dateBot.playAnimation(dateBotAnimationDuration, dateBotAnimation);
                // Display dateBot's response to the user
                dateBot.displayResponse(dateBotResponse);
                dateBot.voice.text = dateBotResponse; // Sets the words that DateBot will say.
                window.speechSynthesis.speak(dateBot.voice); // Cause DateBot to speak
                // Have the user process DateBot's response after the animation plays
                setTimeout(function(){ user.processDateBotsResponse(responseJsonData[i]); },
                 responseJsonData[i].animationDuration);
            }
        }
    },


    /*
    Plays the animation
    */
    playAnimation: function(animationDuration, animationToPlay) {

        switch(animationToPlay) {
            case "talk()":
                dateBot.talk(animationDuration);
                break;
            case "confused()":
                dateBot.confused(animationDuration);
                break;
            case "loveIt()":
                dateBot.loveIt(animationDuration);
                break;
            case "nailedIt()":
                dateBot.nailedIt(animationDuration);
                break;
            case "smile":
                dateBot.smile(animationDuration);
                break;
        }
    },

    /*
    Displays DateBot's response to the user 
    */
    displayResponse: function(dateBotResponse) {
        document.getElementById("speech-bubble").innerHTML = dateBotResponse;
    }


}
