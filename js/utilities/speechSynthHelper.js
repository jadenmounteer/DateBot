/**
 * Initializes the voice. Chooses a voice depending on the mobile device.
 * Takes a SpeechSynthesisUtterance() object as an argument
 */
function initializeVoice(voiceObject, userObject, dateBotView) {
    // Check if user is on mobile or if the browser does not allow us to change DateBot's voice... || typeof(window.speechSynthesis.onvoiceschanged)=="undefined"
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        // Since the platform the user is using does not let us pick a voice, we let the device pick the voice
        setVoiceMessage(voiceObject, "Hello I'm DateBot! I'm here to help you find the perfect activity for your date.", userObject);
        dateBotView.talk(4600);
      }
    // If user is not on mobile
    else {
        // Configure DateBot's speech properties
        let voices = [];

        // If we are not on Chrome...
        if (!window.chrome) {
            // Get List of Voices
            voices = window.speechSynthesis.getVoices();

            for (let i=0; i<voices.length; i++) {
                console.log(voices[i].name);
                // Google UK English Female
                if (voices[i].name == 'Samantha') {
                    voiceObject.voice = voices[i];
                    voiceObject.pitch = 1.06; // Change the pitch 1.06
                    voiceObject.lang = "en"; // Change the language to English
                    
                    setVoiceMessage(voiceObject, "Hello I'm DateBot! I'm here to help you find the perfect activity for your date.", userObject);
                    dateBotView.talk(4600);
                }
            
            }

        }
        else {
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
