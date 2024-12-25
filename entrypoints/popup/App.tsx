import { useState } from 'react';
import reactLogo from '@/assets/react.svg';
import wxtLogo from '/wxt.svg';
import './App.css';
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import TodayTotal from '@/components/custom/TodayTotal';
import SevenDayChart from '@/components/custom/SevenDayChart';
import { Card } from '@/components/ui/card';
import WebSites from '@/components/custom/WebSites';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className='p-4' >
        <Card>
          <TodayTotal total="2 hr, 35 min" />
          <hr className='pb-2' />
          <SevenDayChart></SevenDayChart>
        </Card>

        <Card className='mt-4'>
          <WebSites></WebSites>
        </Card>
      </div>
    </>
  );
}

export default App;
