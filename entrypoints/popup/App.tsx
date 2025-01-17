import { useState, useEffect } from 'react';
import reactLogo from '@/assets/react.svg';
import wxtLogo from '/wxt.svg';
import './App.css';
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import TodayTotal from '@/components/custom/TodayTotal';
import SevenDayChart from '@/components/custom/SevenDayChart';
import { Card } from '@/components/ui/card';
import WebSites from '@/components/custom/WebSites';
import { ChartEntry } from '@/lib/types';
import { getWeekTotalTime } from '@/lib/funcs';
import { convertMinutesToHoursAndMinutes, getTodayWeekDay } from '@/lib/timeConvert';

function App() {

  const [sevenDayData, setSevenDayData] = useState<ChartEntry[]>([]);
  const [todayTotal, setTodayTotal] = useState<number>(0);

  useEffect(() => {
    getWeekTotalTime().then((data) => {
      setSevenDayData(data);
      console.log(data);
      const today = getTodayWeekDay();
      setTodayTotal(data.find((item) => item.day === today)?.time || 0);
    });
  }, []);

  return (
    <>
      <div className='p-4' >
        <Card>
          <TodayTotal total={convertMinutesToHoursAndMinutes(todayTotal)} />
          <hr className='pb-2' />
          <SevenDayChart data={sevenDayData}></SevenDayChart>
        </Card>

        <Card className='mt-4'>
          <WebSites></WebSites>
        </Card>
      </div>
    </>
  );
}

export default App;
