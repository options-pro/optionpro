import React from "react";
import StockChart from "../components/StockChart";
import Features from "../components/Features";

const HomePage = () => {
  return (
    <div className="flex xl:flex-row flex-col items-center xl:gap-4 gap-5 p-10">
      <div className="chart-container p-5 pr-10 xl:border-r-4 xl:border-gray-200">
        <StockChart />
      </div>
      <div>
        <Features />
      </div>
    </div>
  );
};

export default HomePage;
