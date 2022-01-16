createLocalStorageIfNotExist()

function createLocalStorageIfNotExist() {
    chrome.storage.local.get(function(result){
        if (!('tldrReadingList' in result)) {
            console.log("LoalStorage not configured. Configuring... ")
            chrome.storage.local.set({'tldrReadingList': []})
            console.log("Localstorage configured!")
        }
    })

}

function renderReadingListButton(compositeId, button) {
    chrome.storage.local.get(['tldrReadingList'], function(res) {
        if(res.tldrReadingList.filter(e => e.compositeKey === compositeId).length > 0) {
            console.log("current page in reading list")
            button.disabled = true;
            button.innerText = "Added!"
        }
    })
  }

function handleButtonClick(composite1, button, title) {
    // chrome.storage.local.clear()
    chrome.storage.local.get(function(result){console.log(result)})
    document.getElementById(composite1 + '-' + "reading-list-button").addEventListener("click", function() {
        chrome.storage.local.get(["tldrReadingList"], function(res) {
            console.log(res.tldrReadingList)
            if(res.tldrReadingList.filter(e => e.compositeKey === composite1).length > 0) {
                console.log("found it")
            } else {
                console.log("did not find it")
                var readingListItem = {}
                readingListItem["compositeKey"] = composite1

                var url = window.location.href

                if (title.length > 50) {
                    title = title.substring(0, 50) + "..."
                }

                if (url.length > 50) {
                    url = url.substring(0, 50) + "..."
                }

                readingListItem["title"] = title
                readingListItem["url"] = url


                res.tldrReadingList.push(readingListItem)
                chrome.storage.local.set({ 'tldrReadingList': res.tldrReadingList}, function() {
                    console.log(`Adding ${composite1} page to Local Storage`);
                    button.disabled = true;
                    button.innerText = "Added!"
                    });
            }

        })
        });
}




// check if current post has TLDR
// If not, parse DOM for body and make API request for TLDR
// Inject new TLDR into body with button
// Add event listener to button connected to localStorage
