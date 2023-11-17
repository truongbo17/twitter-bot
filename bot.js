const startBot = document.getElementById('startBot');
const stopBot = document.getElementById('stopBot');
let runScroll, currentTab;
let countScroll = 0;

// Cuộn rất nhanh và rất mượt
const scroll_level_1 = {
  'timeout': 1,
  'pixel': 1
};

// Cuộn rất nhanh và mượt
const scroll_level_2 = {
  'timeout': 1,
  'pixel': 10
};

// Cuộn bình thường
const scroll_level_3 = {
  'timeout': 10,
  'pixel': 1
};

// Cuộn bình thường và khá giật
const scroll_level_4= {
  'timeout': 100,
  'pixel': 5
};

// Cuộn khá chậm và giật
const scroll_level_5= {
  'timeout': 200,
  'pixel': 20
};

// Cuộn cực chậm
const scroll_level_6= {
  'timeout': 200,
  'pixel': 1
};

document.addEventListener("DOMContentLoaded", function(event) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const tab = tabs[0];
    if (tab) {
      currentTab = tab;
    }
  });
});

startBot.onclick = startBotPlay;
stopBot.onclick = stopBotPlay;

function findCeil(arr, r, l, h)
{
  let mid;
  while (l < h)
  {
    mid = l + ((h - l) >> 1); // Same as mid = (l+h)/2
    (r > arr[mid]) ? (l = mid + 1) : (h = mid);
  }
  return (arr[l] >= r) ? l : -1;
}

function myRand(arr, freq,  n) {
  let prefix= [];
  let i;
  prefix[0] = freq[0];
  for (i = 1; i < n; ++i)
    prefix[i] = prefix[i - 1] + freq[i];
  let r = Math.floor((Math.random()* prefix[n - 1])) + 1;

  let indexc = findCeil(prefix, r, 0, n - 1);
  return arr[indexc];
}

// Driver code
let arr = [scroll_level_1, scroll_level_2, scroll_level_3, scroll_level_4];
let freq = [10, 5, 20, 100];
let i;
let n = arr.length;

for (i = 0; i < 5; i++)
  document.write(myRand(arr, freq, n));

async function startBotPlay() {
  clearTimeout(runScroll);

  await chrome.storage.session.set({scroll_pixel: scroll_level_3.pixel});
  await chrome.storage.session.set({scroll_timeout: scroll_level_3.timeout});

  // https://raw.githubusercontent.com/MartinStyk/quotes-recommender/master/data/quotes.csv
  fetch("./comment.text")
      .then((res) => res.text())
      .then((text) => {
        console.log(text)
      })
      .catch((e) => console.error(e));

  await chrome.storage.local.set({ comments: 123123 })

  runScroll = setInterval(await scroll, scroll_level_3.timeout);
}

async function scroll() {
  const scroll_pixel = await chrome.storage.session.get('scroll_pixel');
  const scroll_timeout = await chrome.storage.session.get('scroll_timeout');

  console.log(await chrome.storage.local.get('comments'))

  chrome.scripting.executeScript({
    target: {tabId: currentTab.id},
    func: (scroll_pixel) => {
      window.scrollBy(0, scroll_pixel)
    },
    args: [scroll_pixel.scroll_pixel]
  });

  chrome.scripting.executeScript({
    target: {tabId: currentTab.id},
    func: (scroll_timeout, scroll_pixel, contentString) => {
      if (localStorage.getItem("count_get_e") === null || localStorage.getItem("count_get_e") == 'NaN') {
        localStorage.setItem('count_get_e', '0')
      }
      let count_for_get_e = parseInt(localStorage.getItem('count_get_e'))

      count_for_get_e++
      localStorage.setItem('count_get_e', count_for_get_e.toString())

      const rate = (1500 / scroll_timeout - scroll_pixel) + parseInt(Math.floor(Math.random() * 500).toFixed())

      if (count_for_get_e > 1000) {
        localStorage.setItem('count_get_e', '0')
      }


      if (count_for_get_e === 1000) {


        // const elements = document.querySelectorAll('[data-testid="like"]');
        // const elementsInViewport = Array.from(elements).filter(element => {
        //   const bounding = element.getBoundingClientRect();
        //   return (bounding.top >= 0 && bounding.left >= 0 && bounding.right <= window.innerWidth && bounding.bottom <= window.innerHeight);
        // });
        //
        // const elementClick = elementsInViewport[(Math.floor(Math.random() * elementsInViewport.length))];
        // if (elementClick) {
        //   elementClick.click()
        // }

        localStorage.setItem('count_get_e', '0')
      }
    },
    args: [scroll_timeout.scroll_timeout, scroll_pixel.scroll_pixel]
  });
}


function executeScript(script) {
  chrome.tabs.executeScript({
    code: script
  });
}

function stopBotPlay() {
}