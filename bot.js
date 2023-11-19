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

async function startBotPlay() {
  clearTimeout(runScroll);

  await chrome.storage.session.set({scroll_pixel: scroll_level_3.pixel});
  await chrome.storage.session.set({scroll_timeout: scroll_level_3.timeout});

  await chrome.storage.session.set({is_scroll: true});

  runScroll = setInterval(await runBot, scroll_level_3.timeout);
}

async function runBot() {
  const scroll_pixel = await chrome.storage.session.get('scroll_pixel');
  const scroll_timeout = await chrome.storage.session.get('scroll_timeout');
  const is_scroll = await chrome.storage.session.get('is_scroll');

  chrome.scripting.executeScript({
    target: {tabId: currentTab.id},
    func: (scroll_timeout, scroll_pixel, is_scroll) => {
      if (is_scroll) {
        window.scrollBy(0, scroll_pixel)
      }

      function weightedRandomChoice(e, n) {
        let t = n.reduce((e, n) => e + n, 0), o = Math.random() * t, r = 0;
        for (let d = 0; d < e.length; d++) if (o <= (r += n[d])) return e[d]
      }

      function getComment() {
        // https://raw.githubusercontent.com/MartinStyk/quotes-recommender/master/data/quotes.csv
        // const contentComment = await fetch("https://raw.githubusercontent.com/MartinStyk/quotes-recommender/master/data/quotes.csv");
        // if (contentComment.ok) {
        //   const arrayComment = (await contentComment.text()).split('"');
        //   if (arrayComment.length > 0) {
        //     await chrome.storage.local.set({content_comment: arrayComment[(Math.floor(Math.random() * arrayComment.length))].replace('/[,:-+\n\s]+/g', '')})
        //   }
        // }
      }

      function getElementInViewPort(querySelector, getAll = false) {
        const elements = document.querySelectorAll(querySelector);
        const elementsInViewport = Array.from(elements).filter(element => {
          const bounding = element.getBoundingClientRect();
          return (bounding.top >= 0 && bounding.left >= 0 && bounding.right <= window.innerWidth && bounding.bottom <= window.innerHeight);
        });

        if (getAll) {
          return elementsInViewport
        }
        return elementsInViewport[(Math.floor(Math.random() * elementsInViewport.length))];
      }

      function likeAction() {
        const elementClick = getElementInViewPort('[data-testid="like"]')
        if (elementClick) {
          elementClick.click()
        }
      }

      function commentAction() {
        const elementClick = getElementInViewPort('[data-testid="reply"]', true)

        if (elementClick[0]) {
          elementClick[0].click()

          chrome.storage.session.set({is_scroll: false})

          setTimeout(function () {
            const tweetInput = document.querySelector('div[aria-labelledby="modal-header"] div[role="textbox"]');
            tweetInput.dispatchEvent(new Event('input', { bubbles: true }));
          }, 3000)
        }

        // const elementClick = elementsInViewport[(Math.floor(Math.random() * elementsInViewport.length))];
        // if (elementClick) {
        //   elementClick.click()
        // }
      }

      function bookmarkAction() {
        const elementClick = getElementInViewPort('[data-testid="bookmark"]')
        if (elementClick) {
          elementClick.click()
        }
      }

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

      // const action = weightedRandomChoice(['like', 'comment', 'bookmark'], [10000, 100, 1]);
      const action = 'comment';
      if (count_for_get_e === 100) {
        if (action === 'like') {
          likeAction()
        } else if (action === 'comment') {
          commentAction()
        } else if (action === 'bookmark') {
          bookmarkAction()
        }
        // window.scrollBy(0, scroll_pixel) // restart

        localStorage.setItem('count_get_e', '0')
      }
    },
    args: [scroll_timeout.scroll_timeout, scroll_pixel.scroll_pixel, is_scroll.is_scroll]
  });
}


function executeScript(script) {
  chrome.tabs.executeScript({
    code: script
  });
}

function stopBotPlay() {
}