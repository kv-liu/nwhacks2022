chrome.runtime.onInstalled.addListener(() => {
<<<<<<< HEAD
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});
=======
  console.log('hello world');
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete" && tab.url.indexOf("/comments/") > -1) {
    console.log(`updated: ${tab.url}`);

    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: summarizePost,
      args: [tab.url],
    });
  }
});

function summarizePost(currentUrl) {
  const whitelist = [
    'TLDR',
    'TL;DR',
    'TLDR;',
    'TL; DR',
    ';TLDR',
    'TLDR:',
    'TL;DR:'
  ]

  const AWS_API = 'https://bhny93bzji.execute-api.us-west-1.amazonaws.com/summarize'

  var text;

  fetch(currentUrl + '.json')
    .then(response => response.json())
    .then(data => {
      text = data[0].data.children[0].data.selftext

      const subredditId = data[0].data.children[0].data.subreddit_id
      const postId = data[0].data.children[0].data.id
      const compositeId = subredditId + '-' + postId

      var result;

      whitelist.forEach((el) => {
        if (!text.includes(el)) {
          console.log(text);
          result = text;
        }
      })

      var payload = {
        "prompt": result
      }

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
        const slice = text.substring(0, 10)
        console.log(slice)

        for (var i = tags.length - 1; i >= 0; i--) {
          if (tags[i].innerHTML.substring(0, 10) === slice) {
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
}
>>>>>>> f08592d5616d30697a41f0ba0982396de9d04b50
