import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { relDiff, isProfitable } from "../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { deletePortfolio, getPortfolios } from "../../utils/api";
import {  toast } from "react-toastify";


const PortfolioCard = ({
  portfolio,
  portfolioId,
  setSelectedPortfolio,
  selectedPortfolio,
  setPortfolios,
  setFetching
}) => {
  const history = useHistory();

  function handleClick() {
    setSelectedPortfolio(portfolio);
    history.push(`/portfolio-home/${portfolio.id}`);
  }

  function handleDeletePortfolio(id) {
    let confirm = window.confirm("Are you sure you want to delete this portfolio?")
    if (confirm) {
      deletePortfolio(id)
      .then((res)=>{
        toast.success("Succesfully deleted portfolio")
        if (portfolioId) {
          history.push(`/portfolio-home/`)
        }
        getPortfolios()
          .then((res) => {
            setPortfolios(res.data);
            setFetching(false);
            // if (portfolioId && res.data.length) {
            //   setSelectedPortfolio(res.data.find(p => p.id == portfolioId ))
            // }
          })
          .catch(() => {
            setPortfolios([]);
            setFetching(false);
          });

      })
    }
  }


  return (
    <div
      class={
        "card bg-white m-2 b-width clickable " +
        (portfolio.id == portfolioId ? "border-primary shadow" : null)
      }
    >
    <div onClick={handleClick}>
      <div class="card-header bg-white d-flex justify-content-between pb-0">
        <h6>{portfolio.name}</h6>
        <h6
          className={
            "font-weight-bold" +
            (isProfitable(
              portfolio.equity_investment,
              portfolio.equity_valuation
            )
              ? " text-success"
              : " text-danger")
          }
        >
          {portfolio ? (
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
              {relDiff(portfolio.equity_investment, portfolio.equity_valuation)}
              %{" "}
            </>
          ) : null}
        </h6>
      </div>
      <div class="card-body pr-2 pl-2 pt-2 pb-0">
        <p class="card-text mb-1">{portfolio.note}</p>
        <ul class="mb-1 pl-4">

          <li><text className="text-muted">Positions:</text> {portfolio.num_positions}</li>
          <li><text className="text-muted">Unique Stocks:</text> {portfolio.num_unique_stocks}</li>
          <li>
            <text className="text-muted">Created on:</text> {moment(portfolio.created_at).format("DD MMM YY")}
          </li>
        </ul>
      </div>
    </div>
      <div className="d-flex justify-content-end">
        <i onClick={() => handleDeletePortfolio(portfolio.id)} class="fa fa-trash clickable p-1"></i>
      </div>
    </div>
  );
};

export default PortfolioCard;
