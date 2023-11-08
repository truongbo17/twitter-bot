const startBot = document.getElementById('startBot');
const stopBot = document.getElementById('stopBot');
let runScroll, currentTab;

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

function startBotPlay() {
  clearTimeout(runScroll);

  chrome.scripting.executeScript({
    target: { tabId: currentTab.id },
    func: () => {
      const elements = document.querySelectorAll(".title-news");
      const elementsInViewport = Array.from(elements).filter(element => {
        const rect = element.getBoundingClientRect();
        return (rect.top >= 0 && rect.left >= 0 && rect.right <= window.innerWidth && rect.bottom <= window.innerHeight);
      });
      console.log(elementsInViewport)
    },
  });

  runScroll = setInterval(scroll, scroll_level_3.timeout);
}

function scroll() {
  executeScript('window.scrollBy(0, ' + scroll_level_3.pixel + ')');
}


function executeScript(script) {
  chrome.tabs.executeScript({
    code: script
  });
}

function stopBotPlay() {
}