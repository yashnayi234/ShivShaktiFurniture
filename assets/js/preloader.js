function redirect () {
    var interval = setInterval(myURL, 6000);
    var result = document.getElementById("loader");
    // result.innerHTML = "<b> The page will redirect after delay of 5 seconds setInterval() method.";
 }

 function myURL() {
    document.location.href = 'home.html';
    clearInterval(interval);
 }