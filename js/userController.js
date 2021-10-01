const user = {

    /*** Methods ***/
    respond: function(event) {
        // Grab the user's response
        let words = event.target.innerHTML;
        // Make dateBot respond
        dateBot.processUserResponse(words);

        
    }
}