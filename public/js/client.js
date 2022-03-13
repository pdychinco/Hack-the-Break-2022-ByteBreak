// invoke ready and pass in a callback function
ready(function () {

    console.log("Client script loaded.");

    // a function declaration inside of a callback ... which takes a callback function :O
    function ajaxGET(url, callback) {

        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                //console.log('responseText:' + xhr.responseText);
                callback(this.responseText);

            } else {
                console.log(this.status);
            }
        }
        xhr.open("GET", url);
        xhr.send();
    }

    document.querySelectorAll(".clear").forEach(function (currentElement, currentIndex, listObj) {
        //console.log(currentElement, currentIndex, listObj);
        currentElement.addEventListener("click", function (e) {

            for (let i = 0; i < this.parentNode.childNodes.length; i++) {
                if (this.parentNode.childNodes[i].nodeType == Node.ELEMENT_NODE) {
                    if (this.parentNode.childNodes[i].getAttribute("class") == "ajax-stuff") {
                        this.parentNode.childNodes[i].innerHTML = "";
                        break;
                    }
                }
            }

        });
    });


    document.querySelector("#recallHTML").addEventListener("click", function (e) {
        ajaxGET("/recall?format=html", function (data) {
            console.log(data);
            // since it's HTML, let's drop it right in
            document.getElementById("recall-html").innerHTML = data;
        });
    });

    // let's wire our ajax call function to an mouse click so we get data
    // when the user clicks
    document.querySelector("#marker").addEventListener("click", function (e) {
        ajaxGET("/markers", function (data) {
            console.log(data);
            // this call is JSON so we have to parse it:
            let parsedData = JSON.parse(data);
            //document.getElementById("p1").innerHTML = parsedData.currentTime;
        });
    });

});

// process the callback function
function ready(callback) {
    if (document.readyState != "loading") {
        callback();
        console.log("ready state is 'complete'");
    } else {
        document.addEventListener("DOMContentLoaded", callback);
        console.log("Listener was invoked");
    }
}

