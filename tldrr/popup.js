function fetchReadingList() {
  console.log("fetching reading list...")
  chrome.storage.local.get(['tldrReadingList'], function(res) {
    console.log(res.tldrReadingList)
    const items  = res.tldrReadingList
    var list = document.getElementsByClassName("divide-y divide-gray-700")[0]
    list.innerHTML = ''

    for( var key in items) {
      console.log(key, items[key])
      var entry = document.createElement('li');
      // entry.appendChild(document.createTextNode(items[key]));
  
      var img = document.createElement('img');
      img.src = './images/reddit-logo-16_16x16.png';
      img.setAttribute('class', 'h-6 w-6 rounded-full')
  
      var div = document.createElement('div')
      div.setAttribute('class', 'ml-3')
      var p1 = document.createElement('p')
      var p2 = document.createElement('p')
      p1.setAttribute('class', 'font-medium text-gray-100')
      p2.setAttribute('class', 'text-gray-300')
      p1.innerText = "This is the title1"
      p2.innerText = "This is the title2"
      div.appendChild(p1)
      div.appendChild(p2)
      
      entry.appendChild(img)
      entry.appendChild(div)
      console.log(entry)
      list.appendChild(entry);
    }

  })
}
fetchReadingList()
