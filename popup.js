let isEnabled = true;

const enabledImg = "images/enabled-image.png";
const disabledImg = "images/disabled-image.png";

const disableRulesetButton = document.querySelector('.disable-ruleset-button');
const rulesetImage = document.getElementById('rulesetImage');
const textField = document.getElementById('textField');

disableRulesetButton.addEventListener('click', handleToggleButtonClick);

chrome.storage.sync.get(['isEnabled'], function(result) {
    isEnabled = result.isEnabled !== undefined ? result.isEnabled : true;
    updateButtonState();
});

function handleToggleButtonClick() {
    isEnabled = !isEnabled;

    updateRulesetState();

    rulesetImage.style.opacity = 0;
    textField.style.opacity = 0;

    setTimeout(() => {
        const imageSource = isEnabled ? enabledImg : disabledImg;
        rulesetImage.src = imageSource;
        textField.textContent = isEnabled ? 'Stop blocking' : 'Continue blocking';

        rulesetImage.style.opacity = 1;
        textField.style.opacity = 1;

        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            const currentTabId = tabs[0].id;
            chrome.tabs.reload(currentTabId);
        });
    }, 300);

    chrome.storage.sync.set({
        isEnabled: isEnabled
    }, function() {
        console.log('State saved to Chrome Storage.');
    });
}


function updateRulesetState() {
    const rulesetId = "ruleset_1";

    if (isEnabled) {
        const updateData = {
            enableRulesetIds: [rulesetId]
        };
        chrome.declarativeNetRequest.updateEnabledRulesets(updateData, function(error) {
            if (error) {
                console.error('Error updating rulesets:', error);
            } else {
                console.log('Rulesets successfully enabled for all websites.');
            }
        });
    } else {
        const updateData = {
            disableRulesetIds: [rulesetId]
        };
        chrome.declarativeNetRequest.updateEnabledRulesets(updateData, function(error) {
            if (error) {
                console.error('Error updating rulesets:', error);
            } else {
                console.log('Rulesets successfully disabled for all websites.');
            }
        });
    }
}

function updateButtonState() {
    const imageSource = isEnabled ? enabledImg : disabledImg;
    rulesetImage.src = imageSource;
    textField.textContent = isEnabled ? 'Stop blocking' : 'Continue blocking';
}

updateButtonState();
updateRulesetState();