function checkYouTubeTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];
    if (currentTab && currentTab.url && currentTab.url.includes('youtube.com')) {
      chrome.scripting.executeScript({
        target: { tabId: currentTab.id },
        function: injectContentScript
      });
    }
  });
}

function checkMovieTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];
    if (currentTab && currentTab.url) {
      chrome.scripting.executeScript({
        target: { tabId: currentTab.id },
        function: injectContentScript2
      });
    }
  });
}

chrome.webNavigation.onDOMContentLoaded.addListener((details) => {
  checkYouTubeTab();
});

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  checkMovieTab();
  checkYouTubeTab();
});

function injectContentScript() {
  function clickButton() {
        var newContent = document.createElement('div');
        newContent.innerHTML = '<button class="ytp-ad-skip-button-modern ytp-button"><div class="ytp-ad-text ytp-ad-skip-button-text-centered ytp-ad-skip-button-text" id="ad-text:1b" style="">Skip</div><span class="ytp-ad-skip-button-icon-modern"><svg height="100%" viewBox="-6 -6 36 36" width="100%"><path d="M5,18l10-6L5,6V18L5,18z M19,6h-2v12h2V6z" fill="#fff"></path></svg></span></button>';
		// console.log("ADDED");
    var button = document.querySelector('.ytp-ad-skip-button-modern');
    if (button) {
      button.click();
      console.log("CLICKED");
    } else {
      // console.log("Button not found or not yet loaded.");
    }
  }
  
  clickButton();

  setInterval(clickButton, 3500);
}

function injectContentScript2() {
function removeLinkElements(relValue) {
  var preconnectLinks = document.querySelectorAll(`link[rel="${relValue}"]`); // Fixed typo here
  preconnectLinks.forEach(function(link) {
    link.remove();
  });
}

function executeBeforePageLoad() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // console.log("REMOVED");
      removeLinkElements("prefetch");
      removeLinkElements("preconnect");
      removeLinkElements("dns-prefetch");
    });
  } else {
    // console.log("REMOVED");
    removeLinkElements("prefetch");
    removeLinkElements("preconnect");
    removeLinkElements("dns-prefetch");
  }
}

executeBeforePageLoad();

setInterval(executeBeforePageLoad, 2500);
}

