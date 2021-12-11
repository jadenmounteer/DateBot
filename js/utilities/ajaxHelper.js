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


function getNewJsonList(jsonFile) {
    const xhttp = new XMLHttpRequest();

    xhttp.onload = function() {
    // Parse the response to turn it into a JavaScript object
    // Return it
    return this.responseText;
    };

    xhttp.open("GET", jsonFile);
    xhttp.send();
}


/**
 * Fetch helper function for fetching a json response from a file or url
 * @param {*} url 
 * @returns a json response
 */
function fetchJSON(url) {
    return fetch(url)
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText); 
        } else {
          return response.json();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
}

export default {getNewJsonMessage, getNewJsonList, fetchJSON}
