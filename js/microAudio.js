
var blobs = [];
var localstorage = window.localStorage;
function getUserMedia(options, successCallback, failureCallback) {
    var api = navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia;
    if (api) {
        return api.bind(navigator)(options, successCallback, failureCallback);
    }
}

var theStream;
var theRecorder;
var recordedChunks = [];

function getStream() {
    if (!navigator.getUserMedia && !navigator.webkitGetUserMedia &&
        !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
        alert('User Media API not supported.');
        return;
    }

    var constraints = { video: true, audio: true };
    getUserMedia(constraints, function (stream) {
        var mediaControl = document.querySelector('video');

        if ('srcObject' in mediaControl) {
            mediaControl.srcObject = stream;
        } else if (navigator.mozGetUserMedia) {
            mediaControl.mozSrcObject = stream;
        } else {
            mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
        }

        theStream = stream;
        try {
            recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
        } catch (e) {
            console.error('Exception while creating MediaRecorder: ' + e);
            return;
        }
        theRecorder = recorder;
        console.log('MediaRecorder created');
        recorder.ondataavailable = recorderOnDataAvailable;
        recorder.start(100);
    }, function (err) {
        alert('Error: ' + err);
    });
}

function recorderOnDataAvailable(event) {
    if (event.data.size == 0) return;
    recordedChunks.push(event.data);
}

function download() {
    console.log('Saving data');
    theRecorder.stop();
    theStream.getTracks()[0].stop();

    var blob = new Blob(recordedChunks, { type: "video/webm" });
    const reader = new FileReader();

    reader.onload = (event) => {
        localStorage.setItem("file", event.target.result);
    }

    reader.readAsDataURL(blob);




    // setTimeout() here is needed for Firefox.
    setTimeout(function () {
        (window.URL || window.webkitURL).revokeObjectURL(url);
    }, 100);
}



function playVideo() { // as blob 

    var video = document.getElementById('video');

    var videoUrl = localstorage.getItem("file");// blob.data gives actual data

    video.src = videoUrl;
}