import React from "react";
import { Form } from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment";

const HistoricalBuy = ({
  allowSell,
  setAllowSell,
  posTicker,
  setDate,
  date,
  histPrices,
  histQuantity,
  setHistQuantity,
  fetchingHistPrices,
}) => {
  return (
    <table class="table">
      <tbody className="">
        <tr>
          <td className="w-50">
            <div className="d-flex  align-items-center">
              <div className="mr-2">Select Buy Date:</div>
              <div class="input-group w-50">
                <input
                  disabled={posTicker ? false : true}
                  className="form-control"
                  placeholder="--/--/--"
                  value={date.start}
                  readonly
                />
                <DateRangePicker
                  initialSettings={{
                    singleDatePicker: true,
                    autoApply: true,
                    maxDate: moment(),
                  }}
                  onCallback={(start, end, label) => {
                    setDate({ start: "", end: "" });
                    setDate({ ...date, start: start.format("YYYY-MM-DD") });
                  }}
                >
                  <div
                    class={"input-group-append" + (posTicker ? "" : " pe-none")}
                  >
                    <span class="input-group-text">
                      <i class="fa fa-calendar"></i>
                    </span>
                  </div>
                </DateRangePicker>
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
              <div className="mr-2">Selsect Sell Date:</div>
              <div class="input-group w-50">
                <input
                  disabled={posTicker && allowSell ? false : true}
                  className="form-control w-50"
                  placeholder="--/--/--"
                  value={date.end}
                  readonly
                />
                {date.start ? (
                  <DateRangePicker
                    initialSettings={{
                      singleDatePicker: true,
                      autoApply: true,
                      maxDate: moment(),
                      minDate: `${moment(date.start).format("M/D/YYYY")}`,
                    }}
                    onCallback={(start, end, label) =>
                      setDate({ ...date, end: end.format("YYYY-MM-DD") })
                    }
                  >
                    <div
                      class={
                        "input-group-append" +
                        (allowSell && posTicker ? "" : " pe-none")
                      }
                    >
                      <span class="input-group-text">
                        <i class="fa fa-calendar"></i>
                      </span>
                    </div>
                  </DateRangePicker>
                ) : null}
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            Buy price as of{" "}
            {<text className="font-weight-bold ml-3">{date.start ? moment(date.start).format("DD MMM YY"):null}</text>}
          </td>
          <td className="w-25 text-center">
            {fetchingHistPrices ? (
              <i class="fa fa-spinner fa-spin"></i>
            ) : histPrices.buy ? (
              `${posTicker ? posTicker.currency_symbol:null} ${histPrices.buy.toFixed(2)}`
            ) : (
              "-"
            )}
          </td>
        </tr>
        {allowSell ? (
          <tr>
            <td>
              Sell price as of{" "}
              {<text className="font-weight-bold ml-3">{date.end ? moment(date.end).format("DD MMM YY"):null}</text>}
            </td>
            <td className="text-center">
            {fetchingHistPrices ? (
              <i class="fa fa-spinner fa-spin"></i>
            ) : histPrices.sell ? (
              `${posTicker ? posTicker.currency_symbol:null} ${histPrices.sell.toFixed(2)}`
            ) : (
              "-"
            )}
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
            {posTicker ? posTicker.currency_symbol:null}{" "}{(histQuantity * histPrices.buy).toFixed(2)}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default HistoricalBuy;
