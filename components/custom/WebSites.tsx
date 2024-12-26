import React from "react";

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { WebSiteListItem } from "@/lib/types";
import { convertMinutesToHoursAndMinutes, getToday, getTodayWeekDay } from "@/lib/timeConvert";
import { Button } from "../ui/button";
import { Hourglass } from "lucide-react";
import { getWebSiteDataFromWeekDay } from "@/lib/funcs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";




const WebSites: React.FC = () => {
  const [webSiteList, setWebSiteList] = useState<WebSiteListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const today = getTodayWeekDay(); // Get today's weekday name
      console.log(today);
      const data = await getWebSiteDataFromWeekDay(today); // Fetch data
      setWebSiteList(data);
      setLoading(false);
      console.log(data);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while fetching
  }

  return (
    <ScrollArea className="w-full rounded-md h-[310px]">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none text-center">{getToday()}</h4>
        {webSiteList.map((web) => (
          <React.Fragment key={web.webName}>
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">

                  <Avatar className="mr-2 bg-gray-300 w-7 h-7">
                    <AvatarImage src={web.avatar}  ></AvatarImage>
                    <AvatarFallback className="font-weight-bold">
                      {web.webName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="text-sm font-medium">{web.webName}</span>
                    <br />
                    <span className="text-xs font-medium text-gray-500">
                      {convertMinutesToHoursAndMinutes(web.spentTime)} /{" "}
                      {convertMinutesToHoursAndMinutes(web.timer)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Button variant="outline" size="icon">
                    <Hourglass size={24} />
                  </Button>
                </div>
              </div>
            </div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  );
};

export default WebSites;