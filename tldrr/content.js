createLocalStorageIfNotExist()
printLocalStorage()

function printLocalStorage() {
    chrome.storage.local.get(function (result) { console.log(result) })
}

function createLocalStorageIfNotExist() {
    chrome.storage.local.get(function (result) {
        if (!('tldrReadingList' in result)) {
            console.log("LoalStorage not configured. Configuring... ")
            chrome.storage.local.set({ 'tldrReadingList': {} })
            console.log("Localstorage configured!")
        }
    })

}

function renderReadingListButton(compositeId, button) {
    chrome.storage.local.get(['tldrReadingList'], function (res) {
        const result = res.tldrReadingList
        if (compositeId in result) {
            console.log("current page in reading list")
            button.disabled = true;
            button.innerText = "Added!"
        }
    })
}

function handleButtonClick(composite1, button) {
    document.getElementById(composite1 + '-' + "reading-list-button").addEventListener("click", function () {
        chrome.storage.local.get(["tldrReadingList"], function (res) {
            const result = res.tldrReadingList
            if (composite1 in res.tldrReadingList) {
                console.log("found it")
            } else {
                console.log("did not find it")
                var obj = {}
                obj['tldrReadingList'] = {}
                obj['tldrReadingList'][composite1] = window.location.href
                chrome.storage.local.set(obj, function () {
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
