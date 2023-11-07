const startBot = document.getElementById('startBot');
const stopBot = document.getElementById('stopBot');
let runScroll;

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


startBot.onclick = startBotPlay;
stopBot.onclick = stopBotPlay;

function startBotPlay() {
  clearTimeout(runScroll);

  runScroll = setInterval(scroll, scroll_level_3.timeout);
}

function scroll() {
  executeScript('window.scrollBy(0, ' + scroll_level_3.pixel + ')');
}

window.addEventListener('scroll', function() {
  let elementsInViewport = getElementsInViewport();
  console.log('Elements in viewport:', elementsInViewport);
});
function getElementsInViewport() {
  const viewportHeight = window.innerHeight;
  const elements = document.querySelectorAll('.your-element-class'); // Thay '.your-element-class' bằng lựa chọn phù hợp

  const elementsInViewport = [];

  elements.forEach(function(element) {
    const elementRect = element.getBoundingClientRect();
    if (elementRect.top < viewportHeight && elementRect.bottom >= 0) {
      elementsInViewport.push(element);
    }
  });

  return elementsInViewport;
}


function executeScript(script) {
  chrome.tabs.executeScript({
    code: script
  });
}

function stopBotPlay() {
}