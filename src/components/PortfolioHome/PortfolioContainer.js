import React, { useEffect, useState } from "react";
import PortfolioCard from "./PortfolioCard";
import { getPortfolios } from "../../utils/api";
import BarLoader from "react-bar-loader";

const PortfolioContainer = ({
  handleShow,
  portfolioId,
  selectedPortfolio,
  setSelectedPortfolio,
  portfolios,
  setPortfolios,
  fetching,
  setFetching,
}) => {
  useEffect(() => {
    getPortfolios()
      .then((res) => {
        setPortfolios(res.data);
        setFetching(false);
        if (portfolioId && res.data.length) {
          setSelectedPortfolio(res.data.find((p) => p.id == portfolioId));
        }
      })
      .catch(() => {
        setPortfolios([]);
        setFetching(false);
      });
  }, []);

  return (
    <div class="bg-light">
      <div className="border-bottom d-flex justify-content-between">
        <h4 class="m-3">My Portfolios</h4>
        <div>
          {" "}
          <button
            onClick={handleShow}
            type="button"
            class="btn btn-warning m-2 font-weight-bold"
          >
            New +
          </button>
        </div>
      </div>
      <div class="h-scroll man-h-85">
        {fetching ? (
          <div className="h-100 p-5 d-flex text-center flex-column justify-content-center align-content-center">
            <div className="text-muted">Fetching your portfolios...</div>
            <BarLoader />
          </div>
        ) : null}
        {portfolios.length
          ? portfolios.map((p) => (
              <PortfolioCard
                portfolio={p}
                portfolioId={portfolioId}
                setPortfolios={setPortfolios}
                selectedPortfolio={selectedPortfolio}
                setSelectedPortfolio={setSelectedPortfolio}
                setFetching={setFetching}
              />
            ))
          : null}
        {!fetching && !portfolios.length ? (
          <div class="alert alert-warning" role="alert">
          No portfolios created yet! 
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PortfolioContainer;
