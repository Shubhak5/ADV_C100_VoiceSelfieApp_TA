var speechRecognition = window.webkitSpeechRecognition;
var recognition = new speechRecognition();

function start() {
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
}

recognition.onresult = function run(event) {
    console.log(event);

    var content = event.results[0][0].transcript;
    console.log(content);

    document.getElementById("textbox").innerHTML = content;

    //check if msg given is "take my Selfie"
    if (content == "take my selfie") {
        console.log("Taking Selfie....");
        speak();
    }

}

function speak() {
    var synth = window.speechSynthesis;

    //speak_data = document.getElementById("textbox").value;
    speak_data = "Taking Your Selfie in 5 seconds";

    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);

    // set the webcam
    Webcam.attach(camera);

    //take selfie after 5sec
    setTimeout(function() {
        takeSnapshot();
        save();
    }, 5000);
}

Webcam.set({
    width: 360,
    height: 240,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");

function takeSnapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = "<img id='selfie_img' src='" + data_uri + "'>";
    })
}

//Save the photo
function save() {
    link = document.getElementById("link"); //get the anchor tag 
    image = document.getElementById("selfie_img").src; //get the selfie taken

    link.href = image; //set the reference to anchor tag as image
    link.click(); //automatically click the link(anchor tag) so that image gets downloaded
}