import React, { useState, useEffect } from "react";
import {
  getPositionsForPortfolio,
  getPortfolioDetails,
  deletePosition,
} from "../../utils/api";
import BarLoader from "react-bar-loader";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import { toast } from "react-toastify";
import { relDiff, isProfitable } from "../../utils/utils";

const PositionsTable = ({
  refetch,
  selectedPortfolio,
  setShowPositionModal,
  setRefetch,
  setFetchingPerform,
  setSelectedPortfolio,
}) => {
  const [positions, setPositions] = useState([]);
  const [fetchingPositions, setFetchingPositions] = useState(true);

  useEffect(() => {
    setFetchingPositions(true);
    getPositionsForPortfolio(selectedPortfolio.id)
      .then((res) => {
        setPositions(res.data);
        setFetchingPositions(false);
      })
      .catch((res) => console.log(res));
  }, [selectedPortfolio.id, refetch]);

  const handleDeletePosition = (position) => {
    let confirm = window.confirm(
      "Are you sure you want to delete this position?"
    );
    if (confirm) {
      deletePosition(position).then(() => {
        setRefetch(Math.random());
        toast.success("Succesfully deleted position");
        setFetchingPerform(true);
        getPortfolioDetails(selectedPortfolio.id)
          .then((res) => {
            setSelectedPortfolio(res.data);
            setFetchingPerform(false);
          })
          .catch(() => {});
      });
    }
  };

  const getClass = (p) => {
    let cls = "";
    if (!p.sell_price && !p.current_price) {
      return cls;
    }
    if (!p.sell_price && parseFloat(p.buy_price) <= p.current_price) {
      cls = "table-success";
    } else if (!p.sell_price && parseFloat(p.buy_price) > p.current_price) {
      cls = "table-danger";
    } else if (parseFloat(p.buy_price) <= parseFloat(p.sell_price)) {
      cls = "table-success";
    } else {
      cls = "table-danger";
    }
    return cls;
  };

  const getChange = (buy, sell, current) => {
    return sell ? relDiff(parseFloat(buy), parseFloat(sell)) : relDiff(parseFloat(buy), parseFloat(current))
  }


  return (
    <>
      <div className="bg-white rounded ml-2 mr-2 man-h-68 overflow-auto">
        <div className="sticky-top bg-white text-muted p-1 pl-3 border-bottom">
          Positions
          <span
            onClick={() => setShowPositionModal(true)}
            class="badge badge-primary ml-2 clickable"
          >
            New +
          </span>
        </div>
        <table class="table table-hover text-center mb-0">
          <thead className="">
            <tr>
              <th scope="col">Stock</th>
              <th scope="col">Position</th>
              <th scope="col">Quantity</th>
              <th scope="col">Buy/Sell Date</th>
              <th scope="col">Buy Price</th>
              <th scope="col">Sell Price</th>
              <th scope="col">Current Price</th>
              <th scope="col">% Change</th>
              <th scope="col"></th>
            </tr>
          </thead>
          {!fetchingPositions ? (
            <tbody className="">
              {positions.map((p) => {
                return (
                  <tr className={getClass(p)}>
                    <td>{p.ticker_name}</td>
                    <td>{p.sell_date ? "CLOSED" : "BUY"}</td>
                    <td>{p.num_units}</td>
                    <td>
                      {moment(p.buy_date).format("DD MMM YY") +
                        (p.sell_date
                          ? ` - ${moment(p.sell_date).format("DD MMM YY")}`
                          : "")}
                    </td>
                    <td>
                      {p.ticker_cur_symbol} {p.buy_price}
                    </td>
                    <td>
                      {p.sell_price
                        ? `${p.ticker_cur_symbol} ${p.sell_price}`
                        : "-"}
                    </td>
                    <td>
                      {p.current_price
                        ? `${p.ticker_cur_symbol} ${p.current_price}`
                        : "-"}
                    </td>
                    <td>
                    {getClass(p) == "table-success" ? <i class="fa fa-arrow-up text-success"></i>: <i class="fa fa-arrow-down text-danger"></i>}
                      {getChange(p.buy_price, p. sell_price, p.current_price)}
                    </td>
                    <td>
                      <i
                        onClick={() => handleDeletePosition(p)}
                        class="fa fa-trash clickable"
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : null}
        </table>
        {fetchingPositions ? (
          <div className="pl-2 pr-2">
            <Skeleton height={30} duration={1} count={30} />
          </div>
        ) : null}
        {!fetchingPositions && !positions.length ?
          <div class="alert alert-warning" role="alert">
    No positions created yet!
  </div>:null}
      </div>
    </>
  );
};

export default PositionsTable;
