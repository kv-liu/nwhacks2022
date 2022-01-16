
fetchReadingList()
document.getElementById('delBtn').addEventListener("click", removeEntry);
document.getElementById('clearBtn').addEventListener("click", clearList);

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

      var aTag = document.createElement("a");
      aTag.setAttribute('href', link); //URL
      aTag.setAttribute('target', '_blank'); //URL


      var liTag = document.createElement('li');
      liTag.setAttribute('class', 'py-4 hover:bg-gray-800')
      // entry.appendChild(document.createTextNode(items[key]));

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


      var form = document.createElement('form');
      form.setAttribute('class', 'h-3 w-3 mr-3 ml-auto');

      var btn = document.createElement('button');
      btn.setAttribute('id', 'delBtn');
      btn.setAttribute('style', 'filter:brightness(0) invert(1);');

      var img2 = document.createElement('img');
      img2.src = '/images/x.png';
      

      aTag.appendChild(liTag);
      liTag.appendChild(div1);
      div1.appendChild(img);
      div1.appendChild(div2);
      div1.appendChild(form);
      form.appendChild(btn)
      btn.appendChild(img2);
      div2.appendChild(p1);
      div2.appendChild(p2);
      list.appendChild(aTag);
    }
  })
}




function clearList() {
  console.log("Clearing storage....");
  chrome.storage.local.clear()
  fetchReadingList()
}


function removeEntry(el) {
  var listItemId = el.parentElement.parentElement.parentElement.parentElement.id
  chrome.storage.local.get(function(res) {
    var filtered = res.tldrReadingList.filter(e => e.compositeKey != listItemId)
    chrome.storage.local.set({ 'tldrReadingList': filtered })
    fetchReadingList()
  })
}

{/* <a href="https://www.google.com" target='_blank'>
<li class="py-4 hover:bg-gray-800">
  <div class="flex flex-wrap ml-3 items-center">
    <img src="./images/reddit-logo-512x512.png" class="h-7 w-7">
    <div class='ml-5'>
      <p class="font-medium text-gray-100">This is the title.</p>
      <p class="text-gray-300">This is the URL.</p>
    </div>

    <form class='h-3 w-3 mr-3 ml-auto'>
      <button id='delBtn' style='filter:brightness(0) invert(1);'>
        <img src='./images/x.png'>
      </button>
    </form>
  </div>
</li>
</a> */}
