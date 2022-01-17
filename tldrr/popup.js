
fetchReadingList()
//document.getElementById('delBtn').addEventListener("click", function(){ removeEntry(this); });
document.getElementById('clearBtn').addEventListener("click", clearList);

var removalList = document.getElementsByClassName('delBtn');

for (var i = 0; i < removalList.length; i++) {
  (function(index) {
    
    removalList[index].addEventListener("click", function() {
      console.log("Ok");
      {removeEntry(this)};
    })
  })(i);
}



function fetchReadingList() {
  console.log("fetching reading list...")
  chrome.storage.local.get(['tldrReadingList'], function(res) {
    console.log(res.tldrReadingList)
    const items  = res.tldrReadingList
    var list = document.getElementsByClassName("divide-y divide-gray-700")[0]
    list.innerHTML = ''

    for( var key in items) {
      readingListItem = items[key]
      console.log(readingListItem)
      var title = readingListItem.title
      var link = readingListItem.url

      var liTag = document.createElement('li');
      liTag.setAttribute('class', 'flex items-center hover:bg-gray-800')
      liTag.setAttribute('id', readingListItem.compositeKey);
      // entry.appendChild(document.createTextNode(items[key]));

      var aTag = document.createElement("a");
      aTag.setAttribute('href', link); //URL
      aTag.setAttribute('target', '_blank'); //URL
      aTag.setAttribute('style', "display:block; width: 369px;");

      var div = document.createElement('div')
      div.setAttribute('class', 'py-4 hover:bg-gray-800')

      var div1 = document.createElement('div')
      div1.setAttribute('class', 'flex ml-3 items-center')

      var img = document.createElement('img');
      img.src = './images/reddit-logo-512x512.png';
      img.setAttribute('class', 'h-7 w-7');

      var div2 = document.createElement('div');
      div2.setAttribute('class', 'ml-3');

      var p1 = document.createElement('p');
      var p2 = document.createElement('p');
      p1.setAttribute('class', 'font-medium text-gray-100');
      p2.setAttribute('class', 'text-gray-300');
      p1.innerText = title
      p2.innerText = link


      var btn = document.createElement('button');
      btn.setAttribute('style', 'filter:brightness(0) invert(1);');
      btn.setAttribute('class', 'delBtn h-3 w-3 mr-1 ml-auto items-center'); //class = delBtn

      btn.addEventListener("click", function() {
        console.log("Ok2");
        {removeEntry(this)};
      })

      var img2 = document.createElement('img');
      img2.src = '/images/x.png';
      
      
      list.appendChild(liTag);
      liTag.appendChild(aTag);
      aTag.appendChild(div);
      div.appendChild(div1);

      div1.appendChild(img);
      div1.appendChild(div2);

      div2.appendChild(p1);
      div2.appendChild(p2);

      liTag.appendChild(btn)
      btn.appendChild(img2);
    }
  })
}

function clearList() {
  console.log("Clearing storage....");
  chrome.storage.local.clear()
  fetchReadingList()
}


function removeEntry(el) {

  
  console.log("made it to removeEntry function");
  console.log(el)
  console.log(el.parentElement.nodeName)
  var listItemId = el.parentElement.id

  chrome.storage.local.get(function(res) {
    var filtered = res.tldrReadingList.filter(e => e.compositeKey != listItemId)
    console.log("Here")
    console.log(listItemId);
    console.log(filtered);
    console.log("end")
    chrome.storage.local.set({ 'tldrReadingList': filtered })
    console.log(res);

     fetchReadingList()
  })
}

{/* <li class='flex items-center' id='test-id'>
<a href="#" target='_blank' style='display:block; width: 350px;'>
  <div class="py-4 hover:bg-gray-800">
    <div class="flex ml-3 items-center">
      <img src="./images/reddit-logo-512x512.png" class="h-7 w-7">
      <div class='ml-3'>
        <p class="font-medium text-gray-100">This is the title.</p>
        <p class="text-gray-300">This is the URL.</p>
      </div>
    </div>
  </div>
</a>

<button class='h-3 w-3 mr-2 ml-auto items-center' type='button' id='delBtn' style='border:none; filter:brightness(0) invert(1); display:inline-block;'>
  <img src='./images/x.png'>
</button>

</li> */}
