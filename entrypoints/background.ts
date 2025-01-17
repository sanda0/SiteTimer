import { addWebSiteDataToWeekDay, storeWebsiteData, updateWebsitesSpendTime } from "@/lib/funcs";
import { tabTimeMap } from "@/lib/types";




let currentTabId: number | null = null;
let isWindowFocused = false;

export default defineBackground(() => {

  function getCurrentWebsiteData(): void {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0 || !tabs[0].url) {
        console.error("No active tab found.");
        return;
      }

      const tab = tabs[0];
      let url = tab.url || "";
      const favicon = tab.favIconUrl || ""; // Favicon URL provided by the tab object

      url = new URL(url).hostname.replace(/^www\./, "");



      if (!url) {
        // console.error("Invalid URL:", url);
        return;
      }

      if (url.includes('chrome://') || url.includes('chrome-extension://')) {
        console.log('Ignoring internal chrome pages');
        return;
      }

      if (url.includes('localhost')) {
        console.log('Ignoring localhost');
        return;
      }

      if (url === 'newtab') {
        console.log('Ignoring newtab');
        return;
      }

      storeWebsiteData(url, { avatar: favicon, webName: url, timer: 0 }).then((data) => {
        addWebSiteDataToWeekDay({
          avatar: favicon,
          webName: url,
          spendTime: 0,
          timer: data.timer
        })
      });

    });
  }



  ///// traking the current website data




  setInterval(() => {
    chrome.windows.getCurrent().then((window) => {
      isWindowFocused = window.focused;
    });
  }, 1000);



  setInterval(() => {
    if (isWindowFocused) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0 || !tabs[0].url) {
          console.error("No active tab found.");
          return;
        }

        const tab = tabs[0];
        let url = tab.url || "";
        url = new URL(url).hostname.replace(/^www\./, "");
        console.log('current tab', url);
        if (!url) {
          return;
        }
        if (url.includes('chrome://') || url.includes('chrome-extension://') || url.includes('chrome://extensions')) {
          return;
        }

        if (url.includes('localhost')) {
          return;
        }

        if (url === 'newtab') {
          return;
        }

        tabTimeMap[url] = tabTimeMap[url] + 1 || 0;

      });
    }
  }, 1000);

  setInterval(() => {
    for (const [url, time] of Object.entries(tabTimeMap)) {
      const roundedTime = Math.round(time / 60);
      const remainingTime = time % 60;

      tabTimeMap[url] = remainingTime;

      console.log('url', url, 'time', time, 'roundedTime', roundedTime);
      updateWebsitesSpendTime(url, roundedTime);
    }
  }, 1000 * 60)



  //init calls

  chrome.tabs.onActivated.addListener((info) => {
    getCurrentWebsiteData();
    console.log('tab activated', info);
  });
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      getCurrentWebsiteData();
    }
    console.log('tab updated', tabId, changeInfo.status);
  });

  chrome.windows.onFocusChanged.addListener((windowId) => {
    console.log('window focus changed', windowId);
  });
});
