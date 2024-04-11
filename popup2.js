function randomIntFromInterval(min, max, excludeSet) {
  let num;
  do {
    num = Math.floor(Math.random() * (max - min + 1) + min);
  } while (excludeSet.has(num));
  return num;
}

document.addEventListener('DOMContentLoaded', function () {
  const fileInput = document.getElementById('file-input');
  
  const removeButton = document.getElementById('remove-all');
  
    removeButton.addEventListener('click', function () {
			chrome.declarativeNetRequest.getDynamicRules({}, (rules) => {

			const ruleIds = rules.map(rule => rule.id);
			chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: ruleIds }, () => {
				console.log("All rules removed.");
			});
		});
		chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            const currentTabId = tabs[0].id;
            chrome.tabs.reload(currentTabId);
        });
	});

  fileInput.addEventListener('change', function () {
    const file = this.files[0];
    const reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function () {
      const urls = reader.result.split('\n').map(url => url.trim()).filter(url => url !== '');

      let rules = []; 
      let generatedIds = new Set(); 

      urls.forEach((url, index) => {
        if (url.startsWith('#')) {
          return;
        }

        if (url.startsWith('0.0.0.0 ')) {
          url = url.substring(8);
        }

        let id;
        do {
          id = randomIntFromInterval(2500, 100000000, generatedIds);
        } while (generatedIds.has(id));

        generatedIds.add(id);

        rules.push({
          "id": id,
          "priority": 1,
          "action": {
            "type": "block"
          },
          "condition": {
            "urlFilter": `*://${url}*`
          }
        });
      });

      chrome.declarativeNetRequest.updateDynamicRules({ 
        removeRuleIds: [],
        addRules: rules
      }, () => {
        console.log("Rules updated successfully");
      });
    };

    chrome.declarativeNetRequest.getDynamicRules({}, (rules) => {
      console.log("Active Rules:", rules);
    });
	    chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            const currentTabId = tabs[0].id;
            chrome.tabs.reload(currentTabId);
        });
  });
});