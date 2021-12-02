/**
 * Set an onclick listener to conduct a google search when the event is triggered.
 * @param {*} element The element that, when clicked on, will cause the browser to open a new tab and conduct an internet search
 * @param {*} searchQuery The string that will be searched 
 */
function setInternetSearchListener(element, searchQuery) {
    // Set the event
    element.onclick = () => {
        // When the user clicks on the element
        // open a new window and conduct the google search
        window.open('http://google.com/search?q='+ searchQuery);
    }
}

// Export the function
export {setInternetSearchListener};