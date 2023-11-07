const startBot = document.getElementById('startBot');
const stopBot = document.getElementById('stopBot');
let runScroll;

const configScroll = [

];

startBot.onclick = startBotPlay;
stopBot.onclick = stopBotPlay;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startBotPlay() {
  const scrollDirection = getRandomInt(0, 1) === 0 ? 1 : -1; // Ngẫu nhiên chọn hướng cuộn lên hoặc xuống
  const scrollAmount = getRandomInt(1, 5); // Ngẫu nhiên chọn số pixel cuộn (1-5, tùy chỉnh theo nhu cầu)

  scroll(scrollDirection * scrollAmount)

  const waitTime = getRandomInt(1000, 6000); // Ngẫu nhiên thời gian chờ (1 giây - 6 giây, tùy chỉnh theo nhu cầu)
  setTimeout(startBotPlay, waitTime);
}

function scroll(scrollTo) {
  executeScript('window.scrollBy(0, ' + scrollTo + ')');
}

function executeScript(script) {
  chrome.tabs.executeScript({
    code: script
  });
}

function stopBotPlay() {
}