import React from "react";

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { WebSiteListItem } from "@/lib/types";
import { convertMinutesToHoursAndMinutes, getToday } from "@/lib/timeConvert";
import { Button } from "../ui/button";
import { Hourglass } from "lucide-react";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

const webSiteList: Array<WebSiteListItem> = [

  {
    avatar: "https://cdn-icons-png.flaticon.com/512/732/732200.png",
    webName: "Facebook",
    spentTime: 30,
    timer: 60
  }
  ,
  {
    avatar: "https://cdn-icons-png.flaticon.com/512/732/732245.png",
    webName: "Twitter",
    spentTime: 45,
    timer: 90
  },
  {
    avatar: "https://cdn-icons-png.flaticon.com/512/732/732221.png",
    webName: "Instagram",
    spentTime: 20,
    timer: 50
  },
  {
    avatar: "https://cdn-icons-png.flaticon.com/512/732/732217.png",
    webName: "LinkedIn",
    spentTime: 35,
    timer: 70
  }
]

const WebSites: React.FC = () => {

  return <>
    <ScrollArea className="w-full  rounded-md h-[310px]">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none text-center">{getToday()}</h4>
        {webSiteList.map((web) => (
          <>
            <div key={null}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img src={web.avatar} alt="avatar" className="w-6 h-6 mr-2 rounded-full" />
                  <div>
                    <span className="text-sm font-medium">{web.webName}</span>
                    <br />
                    <span className="text-xs font-medium text-gray-500">{convertMinutesToHoursAndMinutes(web.spentTime)} / {convertMinutesToHoursAndMinutes(web.timer)}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Button variant={"outline"} size={"icon"}>
                    <Hourglass size={24} />
                  </Button>
                </div>
              </div>
            </div>
            <Separator className="my-2" />
          </>
        ))}
      </div>
    </ScrollArea>
  </>

}


export default WebSites;