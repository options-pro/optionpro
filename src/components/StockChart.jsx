import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
// const proxyUrl = "https://cors-anywhere.herokuapp.com/";
// const stonksUrl = `${proxyUrl}/query1.finance.yahoo.com/v8/finance/chart/GME`;
// import { chartData } from "../data/chartData";
import axios from "axios";

const options = {
  method: "GET",
  url: "https://yh-finance.p.rapidapi.com/stock/v3/get-chart",
  params: {
    interval: "1mo",
    symbol: "AMRN",
    range: "5y",
    region: "US",
    includePrePost: "false",
    useYfid: "true",
    includeAdjustedClose: "true",
    events: "capitalGain,div,split",
  },
  headers: {
    "X-RapidAPI-Key": "e859b2517amsh47321229900d36ep1230fdjsnb8729fc29a51",
    "X-RapidAPI-Host": "yh-finance.p.rapidapi.com",
  },
};

async function getStonks() {
  const response = await axios(options);
  return response.data;
}

const chartData = {
  options: {
    chart: {
      type: "candlestick",
      height: 350,
    },
    title: {
      text: "CandleStick Chart",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  },
};

const round = (number) => {
  return number ? +number.toFixed(2) : null;
};

const StockChart = () => {
  const [price, setPrice] = useState(-1);
  const [priceTime, setPriceTime] = useState(null);
  const [series, setSeries] = useState([
    {
      data: [],
    },
  ]);

  useEffect(() => {
    // let timeoutId;

    getStonks().then((data) => {
      const gme = data.chart.result[0];
      console.log(gme);
      setPrice("$" + gme.meta.regularMarketPrice.toFixed(2));
      setPriceTime(new Date(gme.meta.regularMarketTime * 1000));
      const quote = gme.indicators.quote[0];
      const prices = gme.timestamp.map((timestamp, index) => ({
        x: new Date(timestamp * 1000),
        y: [
          round(quote.open[index]),
          round(quote.high[index]),
          round(quote.low[index]),
          round(quote.close[index]),
        ],
      }));
      setSeries([
        {
          data: prices,
        },
      ]);
    });
  }, []);

  return (
    <div className="flex flex-col gap-5 justify-center">
      <div className="pl-2 pb-5">
        <p className="font-bold text-5xl text-blue-900">
          See Your Favorite Stocks
        </p>
      </div>
      <div>
        {/* {price}
      <br />
      {priceTime && priceTime.toLocaleTimeString()} */}
        <Chart
          options={chartData.options}
          series={series}
          type="candlestick"
          width="700px"
        />
      </div>
    </div>
  );
};

export default StockChart;
