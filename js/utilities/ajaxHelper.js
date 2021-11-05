/*
The AJAX request for getting json data.
Gets a list of responses from a json file.
*/
function getNewJsonMessage(jsonFile, responseFromEntity, callBack, objectCallingFunction, otherObject) {
    const xhttp = new XMLHttpRequest();

    xhttp.onload = function() {
    // Parse the response to turn it into a JavaScript object
    let responses = JSON.parse(this.responseText);

    callBack(responses, responseFromEntity, objectCallingFunction, otherObject);
    };

    xhttp.open("GET", jsonFile);
    xhttp.send();
}

export default {getNewJsonMessage}
