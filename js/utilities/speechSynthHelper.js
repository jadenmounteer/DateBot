/**
 * Initializes the voice. Chooses a voice depending on the mobile device.
 * Takes a SpeechSynthesisUtterance() object as an argument
 */
function initializeVoice(voiceObject, userObject, dateBotView) {
    // Check if user is on mobile
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        // Since user is on mobile, rather than choosing a voice, we let the phone pick the voice
        setVoiceMessage(voiceObject, "Hello I'm DateBot! I'm here to help you find the perfect activity for your date.", userObject);
        dateBotView.talk(4600);
      }
    // If user is not on mobile
    else {
        // Configure DateBot's speech properties
        let voices = [];
        window.speechSynthesis.onvoiceschanged = () => {
            // Get List of Voices
            voices = window.speechSynthesis.getVoices();

            for (let i=0; i<voices.length; i++) {
                // Google UK English Female
                //Google português do Brasil
                if (voices[i].name == 'Google UK English Female') {
                    voiceObject.voice = voices[i];
                    voiceObject.pitch = 1.06; // Change the pitch 1.06
                    voiceObject.lang = "en"; // Change the language to English
                    
                    setVoiceMessage(voiceObject, "Hello I'm DateBot! I'm here to help you find the perfect activity for your date.", userObject);
                    dateBotView.talk(4600);
                }
            }
        }
    }
}


function setVoiceMessage(voiceObject, message, userObject) {
    voiceObject.text = message; // Sets the words that DateBot will say.
    window.speechSynthesis.speak(voiceObject); // Cause DateBot to speak
                // Make the buttons appear after dateBot is finished speaking
                voiceObject.onend = function(event) {
                    // Change DateBot back to smiling
                    document.getElementById("datebot-gif").setAttribute("src", "./assets/DateBot-blinking-straight-face.gif");
                    userObject.userView.makeButtonsVisible();
                };
}

function logAvailableVoices() {
    for (let i=0; i<voices.length; i++) {
        console.log(voices[i]);
    }
    
}



export {
    initializeVoice, setVoiceMessage, logAvailableVoices
}
