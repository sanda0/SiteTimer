import { getTodayWeekDay } from "./timeConvert";
import { WebSiteData, WebSiteListItem } from "./types";

/**
 * Stores website data in Chrome local storage.
 * @param url - The full URL of the website.
 * @param data - The data to store for the website.
 */
export function storeWebsiteData(url: string, data: WebSiteData): Promise<WebSiteData> {
  return new Promise((resolve, reject) => {
    try {
      // Get existing data from storage
      chrome.storage.local.get(url, (result) => {
        const existingData = result[url] || {};

        data.timer = existingData.timer || 0;

        // Merge existing data with new data
        const updatedData: WebSiteData = {
          ...existingData,
          ...data,
        };

        // Save updated data to storage
        chrome.storage.local.set({ [url]: updatedData }, () => {
          // console.log(`Data for ${url} updated:`, updatedData);
          resolve(updatedData);
        });
      });
    } catch (error) {
      console.error("Failed to store website data:", error);
      reject(error);
    }
  });
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
          // console.log(`Data for ${weekday} updated:`, [data]);
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
        // console.log(`Data for ${weekday} updated:`, updatedData);
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


export function updateWebSiteTimer(url: string, timer: number): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      // Get existing data from storage
      chrome.storage.local.get(url, (result) => {
        const existingData = result[url] || {};

        // Merge existing data with new data
        const updatedData: WebSiteData = {
          ...existingData,
          timer,
        };

        // Save updated data to storage
        chrome.storage.local.set({ [url]: updatedData }, () => {
          console.log(`Timer for ${url} updated:`, updatedData);

          // Update the timer in the weekday data
          const weekday = getTodayWeekDay();
          chrome.storage.local.get(weekday, (result) => {
            const existingWeekData = result[weekday] || [];
            const updatedWeekData = existingWeekData.map((item: WebSiteListItem) => {
              if (item.webName === url) {
                return {
                  ...item,
                  timer,
                };
              }
              return item;
            });

            chrome.storage.local.set({ [weekday]: updatedWeekData }, () => {
              console.log(`Timer for ${url} in ${weekday} updated:`, updatedWeekData);
              resolve();
            });
          });
        });
      });
    } catch (error) {
      console.error("Failed to update website timer:", error);
      reject(error);
    }
  });
}

export function updateWebsitesSpendTime(url:string,mins:number):Promise<void>{
  return new Promise((resolve,reject)=>{
    try{

      const weekday = getTodayWeekDay();
      chrome.storage.local.get(weekday, (result) => {
        const existingWeekData = result[weekday] || [];
    
        const updatedWeekData = existingWeekData.map((item: WebSiteListItem) => {
          if (item.webName === url) {
            const spendTime = item.spendTime + mins;
            return {
              ...item,
              spendTime,
            };
          }
          return item;
        });

        chrome.storage.local.set({ [weekday]: updatedWeekData }, () => {
          // console.log(`Timer for ${url} in ${weekday} updated:`, updatedWeekData);
          resolve();
        });
      });

    }catch(error){
      console.error("Failed to update website spend time:",error);
      reject(error);
    }
  })
}