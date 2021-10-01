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
    

    /***  Methods ***/

    /*
    Changes the gif of dateBot to the talking gif
    */
    talk: function() {
        console.log("Initializing the talk method");
        this.dateBotImg.setAttribute("src", "../assets/DateBot-talking.gif"); 
    },

    talk2: function() {
        console.log("Initializing the talk2 method");
        this.dateBotImg.setAttribute("src", "./assets/DateBot-talking.gif"); 
    },

    talk3: function() {
        console.log("Initializing the talk3 method");
        this.dateBotImg.setAttribute("src", "/assets/DateBot-talking.gif"); 
    },

    talk4: function() {
        console.log("Initializing the talk4 method");
        this.dateBotImg.setAttribute("src", "assets/DateBot-talking.gif"); 
    },

    /*
    Changes the gif of dateBot to the smiling gif
    */
    smile: function() {
        this.dateBotImg.setAttribute("src", "../assets/DateBot-blinking-straight-face.gif"); 
    },

    /*
    Changes the gif of dateBot to the love it gif
    */
    loveIt: function() {
        this.dateBotImg.setAttribute("src", "../assets/DateBot-heart-animation.gif"); 
    },

    /*
    Changes the gif of dateBot to the nailed it gif
    */
    nailedIt: function() {
        this.dateBotImg.setAttribute("src", "../assets/DateBot-nailed-it.gif"); 
    },

    /*
    Changes the gif of dateBot to the confused it gif
    */
    confused: function() {
        this.dateBotImg.setAttribute("src", "../assets/DateBot-question-mark.gif"); 
    },

}
