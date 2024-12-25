import { addWebSiteDataToWeekDay, storeWebsiteData } from "@/lib/funcs";

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

      console.log("Current tab:", tab);
      console.log("Current URL:", url);
      console.log("Current Favicon:", favicon);

      if (!url) {
        console.error("Invalid URL:", url);
        return;
      }

      if(url.includes('chrome://') || url.includes('chrome-extension://')) {
        console.log('Ignoring internal chrome pages');
        return;
      }

      if(url.includes('localhost')) {
        console.log('Ignoring localhost');
        return;
      }

      if(url === 'newtab') {
        console.log('Ignoring newtab');
        return;
      }

      storeWebsiteData(url, { avatar: favicon, webName: url, timer: 0 });

      addWebSiteDataToWeekDay({
        avatar: favicon,
        webName: url,
        spentTime: 0,
        timer: 0
      })

    });
  }


  //init calls

  chrome.tabs.onActivated.addListener(getCurrentWebsiteData);
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      getCurrentWebsiteData();
    }
  });
});
