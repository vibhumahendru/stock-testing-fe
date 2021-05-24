import React from "react";
import PropTypes from "prop-types";
import { AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';



const MainChart = ({chartData, selectedTicker}) => {

  const formatXAxis = (tickItem) => {
    return moment(tickItem).format('DD MMM YY');
  }

  const getChartColor = (chartData) => {
    if (chartData && chartData.data.length) {
      let firstItem = chartData.data[0];
      let lastItem = chartData.data[chartData.data.length-1];
      let color;

      if(firstItem.adj_close < lastItem.adj_close){
        color = "green"
      } else {
        color = "red"
      }
      return color
    }
  }

  return (
    <ResponsiveContainer width={"95%"} height="95%">
        <AreaChart
          data={chartData.data}
        >
        <CartesianGrid strokeDasharray="2"/>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={getChartColor(chartData)} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={getChartColor(chartData)} stopOpacity={0}/>
          </linearGradient>
        </defs>
          <XAxis minTickGap={100}  dataKey="date"  tickFormatter={formatXAxis} />
          <YAxis type="number" domain={['auto', 'auto']} />
          <Tooltip content={<CustomTooltip selectedTicker={selectedTicker}/>} />
          <Area fillOpacity={1} fill="url(#colorUv)" strokeWidth={1} dot={false} type="monotone" dataKey="adj_close" stroke={getChartColor(chartData)} activeDot={{ r: 4 }} />
        </AreaChart>
        </ResponsiveContainer>
  )
};

export default MainChart;

const CustomTooltip = ({ active, payload, label, selectedTicker }) => {
if (active && payload && payload.length) {
  return (
    <div className="rounded bg-white d-flex p-1 shadow">
      <text className="">{`${payload[0].value.toFixed(2)} ${selectedTicker.currency_code} `}</text>
      <text className=" ml-2 text-muted">{<small>{moment(label).format('DD MMM YY')}</small>}</text>
    </div>
  );
}

return null;
};
