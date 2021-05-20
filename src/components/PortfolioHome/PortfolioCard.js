import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { relDiff, isProfitable } from "../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";


const PortfolioCard = ({
  portfolio,
  portfolioId,
  setSelectedPortfolio,
  selectedPortfolio,
}) => {
  const history = useHistory();

  function handleClick() {
    setSelectedPortfolio(portfolio);
    history.push(`/portfolio-home/${portfolio.id}`);
  }

  return (
    <div
      onClick={handleClick}
      class={
        "card bg-white m-2 b-width clickable " +
        (portfolio.id == portfolioId ? "border-primary shadow" : null)
      }
    >
      <div class="card-header bg-white d-flex justify-content-between pb-0">
        <h6>{portfolio.name}</h6>
        <h6 className={
          "font-weight-bold" +
          (isProfitable(
            portfolio.equity_investment,
            portfolio.equity_valuation
          )
            ? " text-success"
            : " text-danger")
        }>
          {portfolio ?
            <>
            <FontAwesomeIcon
            className="mr-1"
            icon={
              isProfitable(
                portfolio.equity_investment,
                portfolio.equity_valuation
              )
                ? faArrowUp
                : faArrowDown
            }
          />
          {relDiff(
            portfolio.equity_investment,
            portfolio.equity_valuation
          )}
          % </>:null}
        </h6>
      </div>
      <div class="card-body p-2">
        <p class="card-text mb-1">{portfolio.note}</p>
        <ul class="mb-1 pl-4">
          <li>
            Created on: {moment(portfolio.created_at).format("DD MMM YY")}
          </li>
          <li>Diversification level</li>
          <li>Num Positions</li>
        </ul>
      </div>
    </div>
  );
};

export default PortfolioCard;
