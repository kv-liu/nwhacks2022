var btn = document.createElement("BUTTON")
btn.setAttribute('id', 'button-id-1')
var t = document.createTextNode("CLICK ME");
btn.appendChild(t);
//Appending to DOM 
document.body.appendChild(btn);
const tldr = ['TLDR', 'TL;DR', 'TLDR;', 'TL; DR', ';TLDR', 'TLDR:', 'TL;DR:']
const AWS_API = 'https://bhny93bzji.execute-api.us-west-1.amazonaws.com/summarize'
var text;


createLocalStorageIfNotExist()
printLocalStorage()

fetch(window.location.href + '.json')
.then(response => response.json())
.then(data => {
    text = data[0].data.children[0].data.selftext
    const subredditId = data[0].data.children[0].data.subreddit_id
    const postId = data[0].data.children[0].data.id
    const compositeId = subredditId + '-' + postId
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
    }).then(response => response.json()).then(data => { 
        var node = document.createElement("p")
        var button = document.createElement("button")
        var t = document.createTextNode("Add to reading list");
        button.setAttribute('id', subredditId + '-' + postId + '-' + 'reading-list-button')
        button.appendChild(t)
        node.innerText = "TLDR: " + data.choices[0].text
        node.style.backgroundColor = 'lightblue';
        node.style.color = 'black';


        var tags = document.getElementsByTagName("p")
        const slice = text.substring(0,10)
        console.log(slice)
        for(var i=0;i<tags.length;i++){
            if(tags[i].innerHTML.includes(slice)){ 
                var parent = tags[i].parentNode;
                break;
            }
        }

        parent.appendChild(node)
        parent.appendChild(button)
        renderReadingListButton(compositeId, button)
        handleButtonClick(compositeId, button)

    }).catch((err) => console.log(err))
});

function printLocalStorage() {
    chrome.storage.local.get(function(result){console.log(result)})
}
function createLocalStorageIfNotExist() {
    chrome.storage.local.get(function(result){
        if (!('tldrReadingList' in result)) {
            console.log("LoalStorage not configured. Configuring... ")
            chrome.storage.local.set({'tldrReadingList': {}})
            console.log("Localstorage configured!")
        }
    })

}

function renderReadingListButton(compositeId, button) {
    chrome.storage.local.get(['tldrReadingList'], function(res) {
        const result = res.tldrReadingList
        if(compositeId in result) {
            console.log("current page in reading list")
            button.disabled = true;
            button.innerText = "Added!"
        }
    })
}

function handleButtonClick(composite1, button) {
    document.getElementById(composite1 + '-' + "reading-list-button").addEventListener("click", function() {
        chrome.storage.local.get(["tldrReadingList"], function(res) {
            const result = res.tldrReadingList
            if(composite1 in res.tldrReadingList) {
                console.log("found it")
            } else {
                console.log("did not find it")
                var obj = {}
                obj['tldrReadingList'] = {}
                obj['tldrReadingList'][composite1] = window.location.href
                chrome.storage.local.set(obj, function() {
                    console.log(`Adding ${composite1} page to Local Storage`);
                    button.disabled = true;
                    button.innerText = "Added!"
                    printLocalStorage()
                  });
            }
            
        })
        
        
      });
}
// check if current post has TLDR
// If not, parse DOM for body and make API request for TLDR
// Inject new TLDR into body with button
// Add event listener to button connected to localStorage
