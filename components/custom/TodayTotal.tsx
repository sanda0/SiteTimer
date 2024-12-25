
import React from "react";


interface TodayTotalProps {
  total: String;
}

const TodayTotal: React.FC<TodayTotalProps> = ({ total }) => {
  return (

    <div className="pt-2">
      <h1 className="text-4xl font-extrabold tracking-tight text-center scroll-m-20 lg:text-5xl">
        {total}
      </h1>
  
      <h4 className="text-lg text-center text-gray-500">
        Today
      </h4>
    </div>

  );
}

export default TodayTotal;