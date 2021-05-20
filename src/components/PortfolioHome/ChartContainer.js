import React, { useEffect, useState } from "react";
import { getTickers, getTickerData } from "../../utils/api";
import Select from "react-select";
import MainChart from "./MainChart";
import BarLoader from "react-bar-loader";

const ChartContainer = ({
  tickers,
  setSelectedTicker,
  selectedTicker,
  setPositionTickers,
}) => {
  const [chartData, setChartData] = useState([]);
  const [fetchingChartData, setFetchingChartData] = useState(true);

  useEffect(() => {
    setFetchingChartData(true);
    if (selectedTicker && selectedTicker.symbol) {
      getTickerData(selectedTicker.symbol)
        .then((res) => {
          setChartData(res.data);
          setFetchingChartData(false);
        })
        .catch();
    }
  }, [selectedTicker]);

  return (
    <div class="shadow p-3 mt-2 h-50 bg-white rounded d-flex flex-column justify-content-between">
      <h3>{selectedTicker.label}</h3>
      {fetchingChartData ? (
        <div className="d-flex flex-column text-center">
          <div className="text-muted">Fetching data...</div>
          <BarLoader className="w-50 align-self-center" height="3" />
        </div>
      ) : null}
      {!fetchingChartData ? <MainChart chartData={chartData} /> : null}
      <div className="w-25">
        <Select
          keepSelectedInList={false}
          placeholder={"Pick a stock...."}
          options={tickers}
          value={{ value: selectedTicker.value, label: selectedTicker.label }}
          onChange={(value) => {
            setSelectedTicker(value);
          }}
        />
      </div>
    </div>
  );
};

export default ChartContainer;
