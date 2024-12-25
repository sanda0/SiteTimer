import { getTodayWeekDay } from "./timeConvert";
import { WebSiteData, WebSiteListItem } from "./types";

/**
 * Stores website data in Chrome local storage.
 * @param url - The full URL of the website.
 * @param data - The data to store for the website.
 */
export function storeWebsiteData(url: string, data: WebSiteData): void {
  try {


    // Get existing data from storage
    chrome.storage.local.get(url, (result) => {
      const existingData = result[url] || {};

      // Merge existing data with new data
      const updatedData: WebSiteData = {
        ...existingData,
        ...data,
      };

      // Save updated data to storage
      chrome.storage.local.set({ [url]: updatedData }, () => {
        console.log(`Data for ${url} updated:`, updatedData);
      });
    });
  } catch (error) {
    console.error("Failed to store website data:", error);
  }
}



export function addWebSiteDataToWeekDay(data: WebSiteListItem): void {
  try {
    // Get the current weekday
    const weekday = getTodayWeekDay();

    // Get existing data from storage
    chrome.storage.local.get(weekday, (result) => {
      const existingData = result[weekday] || null;

      if (!existingData) {
        chrome.storage.local.set({ [weekday]: [data] }, () => {
          console.log(`Data for ${weekday} updated:`, [data]);
        });
        return;
      }

      for (let i = 0; i < existingData.length; i++) {
        if (existingData[i].webName === data.webName) {
          return
        }
      }

      // Merge existing data with new data
      const updatedData: WebSiteListItem[] = [
        ...(existingData as WebSiteListItem[]),
        data,
      ];

      // Save updated data to storage
      chrome.storage.local.set({ [weekday]: updatedData }, () => {
        console.log(`Data for ${weekday} updated:`, updatedData);
      });
    });
  } catch (error) {
    console.error("Failed to store website data:", error);
  }
}

export function getWebSiteDataFromWeekDay(weekday: string): Promise<WebSiteListItem[]> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(weekday, (result) => {
      const data = result[weekday] || [];
      resolve(data as WebSiteListItem[]);
    });
  });
}