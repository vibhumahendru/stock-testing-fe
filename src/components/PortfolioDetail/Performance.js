import React from "react";
import BarLoader from "react-bar-loader";
import {relDiff, isProfitable} from "../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

const Performance = ({ selectedPortfolio, fetchingPerform }) => {
  const formatMoney = (n) => {
    return (Math.round(n * 100) / 100).toLocaleString();
  };

  return (
    <div className=" mt-2 bg-white rounded">
      <div className="text-muted p-1 pl-3 border-bottom">Performance</div>
      <table class="table">
        <tbody className="">
          <tr>
            <td>
              <text className="mr-2">Equity Investment:</text>
              {fetchingPerform ? (
                <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
              ) : (
                <text className="font-weight-bold">
                  {selectedPortfolio.portfolio_currency}{" "}{formatMoney(selectedPortfolio.equity_investment)}
                </text>
              )}
            </td>
            <td>
              <text className="mr-2">Equity Valuation:</text>
              {fetchingPerform ? (
                <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
              ) : (
                <text
                  className={
                    "font-weight-bold" +
                    (isProfitable(
                      selectedPortfolio.equity_investment,
                      selectedPortfolio.equity_valuation
                    )
                      ? " text-success"
                      : " text-danger")
                  }
                >
                  {selectedPortfolio.portfolio_currency}{" "}{formatMoney(selectedPortfolio.equity_valuation)}
                </text>
              )}
            </td>
            <td>
              <text className="mr-2">% Change:</text>
              {fetchingPerform ? (
                <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
              ) : (
                <text className={"font-weight-bold" + (isProfitable(selectedPortfolio.equity_investment, selectedPortfolio.equity_valuation)? " text-success": " text-danger")}>
                  <FontAwesomeIcon className="mr-1" icon={isProfitable(selectedPortfolio.equity_investment, selectedPortfolio.equity_valuation)? faArrowUp:faArrowDown} />
                  {relDiff(
                    selectedPortfolio.equity_investment,
                    selectedPortfolio.equity_valuation
                  )}
                  %
                </text>
              )}
            </td>
          </tr>
          <tr>
            <td>
              <text className="mr-2">Unrealised Return:</text>
              {fetchingPerform ? (
                <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
              ) : (
                <text className={"font-weight-bold" + (isProfitable(selectedPortfolio.equity_investment, selectedPortfolio.equity_valuation)? " text-success": " text-danger")}>
                  {selectedPortfolio.portfolio_currency} {" "}
                  {formatMoney(
                    selectedPortfolio.equity_valuation -
                      selectedPortfolio.equity_investment
                  )}
                </text>
              )}
            </td>
            <td>
              <text className="mr-2">Actualised Return:</text>
              {fetchingPerform ? (
                <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
              ) : (
                <text className={"font-weight-bold" + (isProfitable(0, selectedPortfolio.actualised_return)? " text-success": " text-danger")}>
                  {selectedPortfolio.portfolio_currency} {" "}{formatMoney(selectedPortfolio.actualised_return)}
                </text>
              )}
            </td>
            <td>
              <text className="mr-2">{selectedPortfolio.portfolio_currency == "Rs" ? "Nifty Comparison" : null}</text>
              { selectedPortfolio.portfolio_currency == "Rs" ?
                <text className={"font-weight-bold" + ( selectedPortfolio.nifty_comparison > 0 ? " text-success": " text-danger")}>
              <FontAwesomeIcon className="mr-1" icon={selectedPortfolio.nifty_comparison > 0 ? faArrowUp:faArrowDown} />
              {selectedPortfolio.nifty_comparison}%
              </text> :null
            }
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Performance;
