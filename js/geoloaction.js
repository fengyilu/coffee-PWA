
var target = document.getElementById('target');
var watchId;

function appendLocation(location, verb) {
  verb = verb || 'updated';
  var ifrm = document.createElement('iframe');
  ifrm.setAttribute("src", "https://maps.google.com/maps?&z=15&q=" + location.coords.latitude + '+' + location.coords.longitude + '&ll=' + location.coords.latitude + '+' + location.coords.longitude  + location.coords.latitude + ', ' + location.coords.longitude);
  ifrm.style.width = "640px";
  ifrm.style.height = "480px";
  document.body.appendChild(ifrm);
}

if ('geolocation' in navigator) {
  document.getElementById('askButton').addEventListener('click', function () {
    navigator.geolocation.getCurrentPosition(function (location) {
      appendLocation(location, 'fetched');
    });
    watchId = navigator.geolocation.watchPosition(appendLocation);
  });
} else {
  target.innerText = 'Geolocation API not supported.';
}