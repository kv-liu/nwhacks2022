function fetchReadingList() {
  console.log("fetching reading list...")
  chrome.storage.local.get(['tldrReadingList'], function(res) {
    console.log(res.tldrReadingList)
    const items  = res.tldrReadingList
    var list = document.getElementsByClassName("divide-y divide-gray-700")[0]
    list.innerHTML = ''

    for( var key in items) {
      console.log(key, items[key])
      var title = items[key][0]
      var link = items[key][1]

      var aTag = document.createElement("a");
      aTag.setAttribute('href', link); //URL
      aTag.setAttribute('target', '_blank'); //URL


      var liTag = document.createElement('li');
      // entry.appendChild(document.createTextNode(items[key]));

      var div1 = document.createElement('div')
      div1.setAttribute('class', 'flex flex-wrap ml-3 items-center')
  
      var img = document.createElement('img');
      img.src = './images/reddit-logo-512x512.png';
      img.setAttribute('class', 'h-7 w-7')
  
      var div2 = document.createElement('div')
      div2.setAttribute('class', 'ml-5')

      var p1 = document.createElement('p')
      var p2 = document.createElement('p')
      p1.setAttribute('class', 'font-medium text-gray-100')
      p2.setAttribute('class', 'text-gray-300')
      p1.innerText = title
      p2.innerText = link

      
      aTag.appendChild(liTag);
      liTag.appendChild(div1);
      div1.appendChild(img);
      div1.appendChild(div2);
      div2.appendChild(p1);
      div2.appendChild(p2);
      list.appendChild(aTag);
    }

  })
}

fetchReadingList()



{/* <a href="https://www.google.com" target='_blank'>
<li class="py-4 hover:bg-gray-800">
  <div class="flex flex-wrap ml-3 items-center">
    <img src="./images/reddit-logo-512x512.png" class="h-7 w-7">
    <div class='ml-5'>
      <p class="font-medium text-gray-100">This is the title.</p>
      <p class="text-gray-300">This is the URL.</p>
    </div>
  </div>
</li>
</a> */}
