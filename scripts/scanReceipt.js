import { API_KEYS } from "./apikey.js";
// const API_KEYS = require("./apikey");
var receiptBase64, parsedData;
var retrievedUPCs;
const ocrEndpointURL = "https://api.ocr.space/parse/image";
const UPC_LENGTH = 12;


ready(function () {
    console.log("Receipt Scanning script loaded.");
    let uploadButtonQuery = "#submit";

    // Handles the AJAX POST request with an XMLHttpRequest object.
    function ajaxPOST(url, callback, data) {
        let params = "base64image=" + encodeURIComponent(data) + "&isTable=true&filetype=JPG";

        // console.log(data);

        const xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('apikey', API_KEYS["ocr"]);
        xhr.send(params);
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                callback(this.responseText);
            } else {
                console.log(this.status);
            }
        }
    }

    function getUPCs(data) {
        // Data from API is a long JSON string of OCR Data
        parsedData = JSON.parse(data);
        // console.log(parsedData);
        // Reset UPCs Array so each receipt is scanned separately
        retrievedUPCs = [];
        
        // Get each line from ParsedResults
        parsedData.ParsedResults[0].TextOverlay.Lines.forEach(line => {
            if ('Words' in line) {
                // Get each word in line
                line.Words.forEach(currentWord => {
                    // Tests if a given word contains only digits
                    let isNum = /^\d+$/.test(word)
                    let word = currentWord.WordText;

                    if (word.length == UPC_LENGTH && isNum) {
                        // Append to UPC array
                        retrievedUPCs.push(word);
                    }
                });
            }
        });

        console.log(retrievedUPCs);
    }

    // POSTs image in base64 to OCR endpoint
    document.querySelector(uploadButtonQuery).addEventListener("click", function (e) {
        e.preventDefault();
        // Get image from form
        var uploadedFile = document.querySelector('input[type=file]')['files'][0];

        var reader = new FileReader();
        // POST the result after reader parsing finishes
        reader.onloadend = function () {
            receiptBase64 = reader.result;
            // console.log(receiptBase64);

            ajaxPOST(ocrEndpointURL, function(data) {
                if (data) {
                    // console.log(data);
                    getUPCs(data);
                }
            }, receiptBase64);
        }
        // Sends request for the image data
        reader.readAsDataURL(uploadedFile);
    });

});

function ready(callback) {
    if (document.readyState != "loading") {
        callback();
        // console.log("Document is 'Ready'.");
    } else {
        document.addEventListener("DOMContentLoaded", callback);
        // console.log("Listener was invoked");
    }
}