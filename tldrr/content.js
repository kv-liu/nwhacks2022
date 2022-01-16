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
const tldr = ['TLDR', 'TL;DR', 'TLDR;', 'TL; DR', ';TLDR', 'TLDR:', 'TL;DR:']
const AWS_API = 'https://yhbz7ctiy5.execute-api.us-west-1.amazonaws.com/api/v1/summarize'
fetch(window.location.href + '.json')
.then(response => response.json())
.then(data => {
    const text = data[0].data.children[0].data.selftext
    var result;

    tldr.forEach((el) => {
        if(!text.includes(el)) {
            console.log(text);
            result = text;
        }
    })

    var payload = {
        "prompt": result
    }
    // send to API
    fetch(AWS_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(payload)
    }).then(response => response.json()).then(data => { console.log(data) }).catch((err) => console.log(err))
});



// check if current post has TLDR
// If not, parse DOM for body and make API request for TLDR
// Inject new TLDR into body with button
// Add event listener to button connected to localStorage
