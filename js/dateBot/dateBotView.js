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
        this.dateBotImg.setAttribute("src", "./assets/DateBot-talking.gif");
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
        console.log("smiling");
        dateBotImg.setAttribute("src", "./assets/DateBot-blinking-straight-face.gif"); 
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
}

export default DateBotView;