// Grab the src of the datebot image so we can change it 
let dateBotImg = document.getElementById("datebot-gif");

/*
Changes the gif of dateBot to the smiling gif
*/
function smile() {
        dateBotImg.setAttribute("src", "./assets/DateBot-blinking-straight-face.gif"); 
}

class DateBotView {

    // Constructor
    constructor() {
        // The datebot's current gif
        this.dateBotImg = document.getElementById("datebot-gif");
    }
    
    /*
    Changes the gif of dateBot to the talking gif
    */
    talk(animationDuration) {
        this.dateBotImg.setAttribute("src", "./assets/DateBot-talking.gif");
        // Make dateBot smile after 4 seconds
        //setTimeout(function(){ dateBotImg.setAttribute("src", "./assets/DateBot-blinking-straight-face.gif");}, animationDuration);}
        setTimeout(function(){ smile(); }, animationDuration);
    }


    /*
    Changes the gif of dateBot to the love it gif
    */
    loveIt(animationDuration) {
        this.dateBotImg.setAttribute("src", "./assets/DateBot-heart-animation.gif");
        // Make dateBot smile after 10 seconds
        setTimeout(function(){ smile(); }, animationDuration);
    }

    /*
    Changes the gif of dateBot to the nailed it gif
    */
    nailedIt(animationDuration) {
        this.dateBotImg.setAttribute("src", "./assets/DateBot-nailed-it.gif");
        // Make dateBot smile after 7 seconds
        setTimeout(function(){ smile(); }, animationDuration);
    }

    /*
    Changes the gif of dateBot to the confused it gif
    */
    confused(animationDuration) {
        this.dateBotImg.setAttribute("src", "./assets/DateBot-question-mark.gif");
        // Make dateBot smile after 7 seconds
        setTimeout(function(){ smile(); }, animationDuration);
    }
    
    /*
    Plays the animation
    */
    playAnimation(animationDuration, animationToPlay) {

        switch(animationToPlay) {
            case "talk()":
                this.talk(animationDuration);
                break;
            case "confused()":
                this.confused(animationDuration);
                break;
            case "loveIt()":
                this.loveIt(animationDuration);
                break;
            case "nailedIt()":
                this.nailedIt(animationDuration);
                break;
            case "smile":
                smile();
                break;
        }
    }

    /*
    Displays DateBot's response to the user 
    */
    displayResponse(dateBotResponse) {
        document.getElementById("speech-bubble").innerHTML = dateBotResponse;
    }
}

export default DateBotView;