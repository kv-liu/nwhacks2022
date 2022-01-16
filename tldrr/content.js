var btn = document.createElement("BUTTON")
btn.setAttribute('id', 'button-id-1')
var t = document.createTextNode("CLICK ME");
btn.appendChild(t);
//Appending to DOM 
document.body.appendChild(btn);
var i = 1
document.getElementById("button-id-1").addEventListener("click", function() {  
    chrome.storage.local.set({'button': i++}, function(result) {
        console.log("set storage" + result)
    })
    chrome.storage.local.get(['button'], function(result) {
        console.log('The buttons state is currently ' + result.button);
      });
  });