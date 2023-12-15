chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  const tab = tabs[0];
  const url = tab.url;
  console.log(`Ad blocking for URL: ${url}`);
});
