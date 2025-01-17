


export type WebSiteListItem = {
  avatar:string;
  webName:string;
  spendTime:number;
  timer:number
}

export type WebSiteData = {
  avatar:string;
  webName:string;
  timer:number;
}

export type WebSiteDataList = WebSiteData[]


export const tabTimeMap: Record<string, number> = {};


export type ChartEntry = {
  day:string;
  time:number;
}