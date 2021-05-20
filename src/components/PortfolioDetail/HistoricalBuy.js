import React from "react";
import { Form } from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";

const HistoricalBuy = ({
  allowSell,
  setAllowSell,
  posTicker,
  setDate,
  date,
  histPrices,
  histQuantity,
  setHistQuantity,
}) => {
  return (
    <table class="table">
      <tbody className="">
        <tr>
          <td className="w-50">
            <div className="d-flex  align-items-center">
              <div className="mr-2">Select Buy Date:</div>
              <div class="input-group w-50">
                <DateRangePicker
                  initialSettings={{
                    singleDatePicker: true,
                    autoApply: true,
                  }}
                  onCallback={(start, end, label) =>
                    setDate({ ...date, start: start.format("YYYY-MM-DD") })
                  }
                >
                  <input
                    disabled={posTicker ? false : true}
                    className="form-control"
                  />
                </DateRangePicker>
                <div class="input-group-append">
                  <span class="input-group-text">
                    <i class="fa fa-calendar"></i>
                  </span>
                </div>
              </div>
            </div>
          </td>
          <td className="w-50">
            <div className="d-flex  align-items-center">
              <Form>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  onChange={(e) => setAllowSell(e.target.checked)}
                />
              </Form>
              <div className="mr-2">Select Sell Date:</div>
              <div class="input-group w-50">
                <DateRangePicker
                  initialSettings={{
                    singleDatePicker: true,
                    autoApply: true,
                  }}
                  onCallback={(start, end, label) =>
                    setDate({ ...date, end: end.format("YYYY-MM-DD") })
                  }
                >
                  <input
                    disabled={posTicker && allowSell ? false : true}
                    className="form-control w-50"
                  />
                </DateRangePicker>
                <div class="input-group-append">
                  <span class="input-group-text">
                    <i class="fa fa-calendar"></i>
                  </span>
                </div>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            Buy price as of{" "}
            {<text className="font-weight-bold ml-3">{date.start}</text>}
          </td>
          <td className="w-25 text-center">
            {histPrices.buy ? `$${histPrices.buy.toFixed(2)}` : "-"}
          </td>
        </tr>
        {allowSell ? (
          <tr>
            <td>
              Sell price as of{" "}
              {<text className="font-weight-bold ml-3">{date.end}</text>}
            </td>
            <td className="text-center">
              {histPrices.sell ? `$${histPrices.sell.toFixed(2)}` : "-"}
            </td>
          </tr>
        ) : null}
        <tr>
          <td className="">Quantity to buy:</td>
          <td className="">
            <input
              disabled={posTicker ? false : true}
              className="form-control"
              type="number"
              name="quantity"
              min="1"
              max="5"
              onChange={(e) => setHistQuantity(e.target.value)}
            />
          </td>
        </tr>
        <tr className="table-warning">
          <td>Total:</td>
          <td className="text-center">
            ${(histQuantity * histPrices.buy).toFixed(2)}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default HistoricalBuy;
