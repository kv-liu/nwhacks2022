var btn = document.createElement("BUTTON")
btn.setAttribute('id', 'button-id-1')
var t = document.createTextNode("CLICK ME");
btn.appendChild(t);
//Appending to DOM 
document.body.appendChild(btn);

document.getElementById("button-id-1").addEventListener("click", function() {
    chrome.storage.local.set({ 'foo': '1' }, function() {
        console.log("set storage")
    })
  });