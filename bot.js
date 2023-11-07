const startBot = document.getElementById('startBot');
const stopBot = document.getElementById('stopBot');
let timeout;
const pixels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

startBot.onclick = startBotPlay;
stopBot.onclick = stopBotPlay;

function startBotPlay() {
  clearTimeout(timeout);

  timeout = setInterval(scroll, 100);
}

function scroll() {
  executeScript('window.scrollBy(0, ' + 5 + ')');
}

function executeScript(script) {
  chrome.tabs.executeScript({
    code: script
  });
}

function stopBotPlay() {
}