function youtubeKiller() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs) => {
        const currentTab = tabs[0];
        if (currentTab && currentTab.url && currentTab.url.includes('youtube.com')) {
            chrome.scripting.executeScript({
                target: {
                    tabId: currentTab.id
                },
                function: injectContentScript
            });
        }
    });
}

function movieKiller() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs) => {
        const currentTab = tabs[0];
        if (currentTab && currentTab.url && !(currentTab.url.includes('bing.com'))) { // Not checking bing.com because search bar gets broken then
            chrome.scripting.executeScript({
                target: {
                    tabId: currentTab.id
                },
                function: injectContentScript2
            });
        }
    });
}

function aternosKiller() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs) => {
        const currentTab = tabs[0];
        if (currentTab && currentTab.url && currentTab.url.includes('aternos.org')) {
            chrome.scripting.executeScript({
                target: {
                    tabId: currentTab.id
                },
                function: injectContentScript3
            });
        }
    });
}

function quizletKiller() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs) => {
        const currentTab = tabs[0];
        if (currentTab && currentTab.url && currentTab.url.includes('quizlet.com')) {
            chrome.scripting.executeScript({
                target: {
                    tabId: currentTab.id
                },
                function: injectContentScript4
            });
        }
    });
}

function twitterKiller() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs) => {
        const currentTab = tabs[0];
        if (currentTab && currentTab.url) {
            if (currentTab.url.includes('twitter.com') || currentTab.url.includes('x.com')) {
                chrome.scripting.executeScript({
                    target: {
                        tabId: currentTab.id
                    },
                    function: injectContentScript5
                });
            }
        }
    });
}

function pinterestKiller() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs) => {
        const currentTab = tabs[0];
        if (currentTab && currentTab.url && currentTab.url.includes('pinterest.')) {
            chrome.scripting.executeScript({
                target: {
                    tabId: currentTab.id
                },
                function: injectContentScript6
            });
        }
    });
}

function redditKiller() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs) => {
        const currentTab = tabs[0];
        if (currentTab && currentTab.url && currentTab.url.includes('reddit.com')) {
            chrome.scripting.executeScript({
                target: {
                    tabId: currentTab.id
                },
                function: injectContentScript7
            });
        }
    });
}

function leoKiller() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs) => {
        const currentTab = tabs[0];
        if (currentTab && currentTab.url && currentTab.url.includes('dict.leo.org')) {
            chrome.scripting.executeScript({
                target: {
                    tabId: currentTab.id
                },
                function: injectContentScript8
            });
        }
    });
}

function phKiller() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs) => {
        const currentTab = tabs[0];
        if (currentTab && currentTab.url && currentTab.url.includes('pornhub.com')) {
            chrome.scripting.executeScript({
                target: {
                    tabId: currentTab.id
                },
                function: injectContentScript9
            });
        }
    });
}

function ladbibleKiller() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs) => {
        const currentTab = tabs[0];
        if (currentTab && currentTab.url && currentTab.url.includes('ladbible.com')) {
            chrome.scripting.executeScript({
                target: {
                    tabId: currentTab.id
                },
                function: injectContentScript10
            });
        }
    });
}

function steamripKiller() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs) => {
        const currentTab = tabs[0];
        if (currentTab && currentTab.url && currentTab.url.includes('steamrip.com')) {
            chrome.scripting.executeScript({
                target: {
                    tabId: currentTab.id
                },
                function: injectContentScript11
            });
        }
    });
}

function filterList() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs) => {
        const currentTab = tabs[0];
        if (currentTab && currentTab.url) {
            chrome.scripting.executeScript({
                target: {
                    tabId: currentTab.id
                },
                function: injectContentScript12
            });
        }
    });
}

chrome.webNavigation.onDOMContentLoaded.addListener((details) => {
    youtubeKiller();
    aternosKiller();
    quizletKiller();
    twitterKiller();
    pinterestKiller();
    redditKiller();
	leoKiller();
	phKiller();
	ladbibleKiller();
	steamripKiller();
});

function injectContentScript() {
    function clickButton() {
        var newContent = document.createElement('div');
        newContent.innerHTML = '<button class="ytp-ad-skip-button-modern ytp-button"><div class="ytp-ad-text ytp-ad-skip-button-text-centered ytp-ad-skip-button-text" id="ad-text:1b" style="">Skip</div><span class="ytp-ad-skip-button-icon-modern"><svg height="100%" viewBox="-6 -6 36 36" width="100%"><path d="M5,18l10-6L5,6V18L5,18z M19,6h-2v12h2V6z" fill="#fff"></path></svg></span></button>';
        // console.log("ADDED");
        var button = document.querySelector('.ytp-ad-skip-button-modern');
        if (button) {
            button.click();
            // console.log("CLICKED");
        } else {
            // console.log("Button not found or not yet loaded.");
        }
    }

    clickButton();

    setInterval(clickButton, 500);
}

function injectContentScript2() {
    function removeLinkElements(relValue) {
        var preconnectLinks = document.querySelectorAll(`link[rel="${relValue}"]`);
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

function injectContentScript3() {
    function makeAternosCryCauseSad() {
        var spanElement = document.querySelector('span[awbljcwabvdcxx="PARAYyRxnLTRWdE"]');

        spanElement.textContent = "I do not like Aternos";

        var divElement = document.querySelector('div[gajjvxjygu="xDbKf"]');

        divElement.remove();

        var newImage = document.createElement('img');

        newImage.src = 'data:image/png;base64,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';

        var parentDiv = document.getElementById('bJdsBgsDBosQ');

        var iconElement = parentDiv.querySelector('i[gorsckzaggr="VidFrIHDGOJ"]');

        parentDiv.replaceChild(newImage, iconElement);

        var divToRemove = document.querySelector('div[zmnnyoholgwgybn="AWO"]');

        divToRemove.remove();

        var linkToRemove = document.querySelector('a[class="btn btn-red"]');

        linkToRemove.remove();

        var iconToRemove = document.querySelector('i[class="far fa-sad-tear"]');

        iconToRemove.remove();

        var divElement = document.querySelector('div[class="btn btn-white DLxfbAqXMrey"]');

        divElement.textContent = "sad is just better hehe";

        document.querySelector('.btn.btn-white.DLxfbAqXMrey').click();

        var adReplacement = document.querySelector('div[class="responsive-leaderboard mobile-full-width ad-dfp"]');

        adReplacement.remove();

        var adReplacement2 = document.querySelector('aside[class="sidebar"]');

        adReplacement2.remove();

        var adReplacement3 = document.querySelector('div[class="server-b-tutorials"]');

        adReplacement3.remove();

        var adReplacement4 = document.querySelector('div[class="responsive-leaderboard mobile-full-width ad-dfp"]');

        adReplacement4.remove();

        var adReplacement5 = document.querySelector('div[class="header-link-exaroton"]');

        adReplacement5.remove();
    }

    makeAternosCryCauseSad();

    setInterval(makeAternosCryCauseSad, 500);
}

function injectContentScript4() {
    function clickButton() {
        var button = document.querySelector('.AssemblyButtonBase.AssemblyPrimaryButton--default.AssemblyButtonBase--large.AssemblyButtonBase--padding');

        if (button) {
            button.disabled = false;
            button.click();
            // console.log("CLICKED");
        } else {
            // console.log("Button not found or not yet loaded.");
        }
    }

    clickButton();

    setInterval(clickButton, 500);
}

function injectContentScript5() {
    function twitter() {
        const articles = document.querySelectorAll('article');

        articles.forEach(article => {
            const divs = article.querySelectorAll('div');

            divs.forEach(div => {
                const pathElement = div.querySelector('path[d="M19.498 3h-15c-1.381 0-2.5 1.12-2.5 2.5v13c0 1.38 1.119 2.5 2.5 2.5h15c1.381 0 2.5-1.12 2.5-2.5v-13c0-1.38-1.119-2.5-2.5-2.5zm-3.502 12h-2v-3.59l-5.293 5.3-1.414-1.42L12.581 10H8.996V8h7v7z"]');
                if (pathElement) {
                    div.remove();
                    // console.log('First div containing specified path element deleted under this article');
                }
            });
        });

        var elementsToDelete = document.querySelectorAll('.css-175oi2r.r-1habvwh.r-eqz5dr.r-uaa2di.r-ymttw5.r-1f1sjgu');

        elementsToDelete.forEach(function(element) {
            element.remove();
        });

    }
    twitter();

    setInterval(twitter, 500);
}

function injectContentScript6() {
    function pinterest() {
        const pinDivs = document.querySelectorAll('div[data-test-id="pin"]');

        pinDivs.forEach(div => {
            const pinId = div.getAttribute('data-test-pin-id');

            if (/\D/.test(pinId)) {
                div.remove();
            }
        });
    }
    pinterest();

    setInterval(pinterest, 500);
}

function injectContentScript7() {
    function reddit() {
        var elementsToDelete = document.querySelectorAll('shreddit-ad-post');

        elementsToDelete.forEach(function(element) {
            element.remove();
            // console.log("Deleted");
        });
    }
    reddit();

    setInterval(reddit, 500);
}

function injectContentScript8() {
    function leo() {
        document.querySelector('[data-dz-ui="adv-halfpage"]').remove();
		document.querySelector('[data-dz-ui="adv-drectangle1"]').remove();
		var h5Element = document.querySelector('h5.ta-l.gray');
		h5Element.innerHTML = '';
		h5Element.textContent = 'sad 4 ever';

    }
    leo();

    setInterval(leo, 500);
}

function injectContentScript9() {
    function ph() {
        const videos = document.querySelectorAll('video');

		videos.forEach(video => {
			const src = video.getAttribute('src');

			if (src && src.includes('Blob:')) {
				const parentElement = video.parentElement;
				if (parentElement) {
					parentElement.remove();
				}
			}
		});

		const images = document.querySelectorAll('img');

		images .forEach(image => {
			const src = image.getAttribute('src');

			if (src && src.includes('data:')) {
				const parentElement = image.parentElement;
				if (parentElement) {
					parentElement.remove();
				}
			}
		});
    }
    ph();

    setInterval(ph, 500);
}

function injectContentScript10() {
    function ladbible() {
		var elements = document.querySelectorAll('div[id*="primis_playerSekindoSPlayer"]');
		elements.forEach(function(element) {
			element.parentNode.removeChild(element);
		});
		var elements = document.querySelectorAll('div.soft-notification-modal_modal__8KcpZ.soft-notification-modal_headerOffset__p6Mdk');
		elements.forEach(function(element) {
			element.parentNode.removeChild(element);
		});
    }
    ladbible();

    setInterval(ladbible, 500);
}

function injectContentScript11() {
    function steamrip() {	
		document.querySelector('div._1il6q4h').click();
    }
    steamrip();

    setInterval(steamrip, 500);
}

function injectContentScript12() {
    function steamrip() {	
		document.querySelector('div._1il6q4h').click();
    }
    steamrip();

    setInterval(steamrip, 500);
}