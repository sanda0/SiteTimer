import { addWebSiteDataToWeekDay, storeWebsiteData, updateWebsitesSpendTime,updateWebsitesSpendTimeBatch } from "@/lib/funcs";
import { tabTimeMap } from "@/lib/types";




let currentTabId: number | null = null;
let isWindowFocused = false;

const UPDATE_INTERVAL_MS = 10000; // Update storage every 10 seconds
const ONE_SECOND_IN_MINUTES = 1 / 60; // Minutes per second
let isUpdating = false;
let websiteTimeTracker: Record<string, number> = {};
let currentWebTimer: number = 0;
let currentWebSpendTime: number = 0;

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
        }).then((data2)=>{
          
          currentWebTimer = data.timer;
          currentWebSpendTime = data2.spendTime;
          
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
    if (isUpdating) return; // Prevent overlapping updates
    isUpdating = true;
  
    updateWebsitesSpendTimeBatch(websiteTimeTracker)
      .catch((err) => console.error("Batch update error:", err))
      .finally(() => {
        isUpdating = false;
        websiteTimeTracker = {};
      });
  }, UPDATE_INTERVAL_MS);

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
        // console.log('current tab', url);
        if (
          !url ||
          url.includes("chrome://") ||
          url.includes("chrome-extension://") ||
          url.includes("localhost") ||
          url === "newtab"
        ) {
          return;
        }


        // updateWebsitesSpendTime(url, 0.016666667);
        websiteTimeTracker[url] = (websiteTimeTracker[url] || 0) + ONE_SECOND_IN_MINUTES;
        currentWebSpendTime += ONE_SECOND_IN_MINUTES;

        if(currentWebTimer != 0){
          console.log('currentWebTimer',currentWebTimer);
          console.log('currentWebSpendTime',currentWebSpendTime);
          if(currentWebSpendTime > currentWebTimer){
            console.log(tab.id)
            chrome.tabs.update(tab.id??0, { url: chrome.runtime.getURL("blockpage.html") });
          }
        }

      });
    }
  }, 1000);





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
