import React from "react";
import PropTypes from "prop-types";

const PortfolioCard = ({portfolio}) => {
  return (
    <div class="card border-success bg-light m-2 b-width clickable">
      <div class="card-header d-flex justify-content-between pb-0">
        <h6>{portfolio.name}</h6>
        <h6>+54%</h6>
      </div>
      <div class="card-body p-2">
        <p class="card-text mb-1">
          {portfolio.note}
        </p>
        <ul class="mb-1 pl-4">
        <li>Created At: {portfolio.created_at}</li>
        <li>Diversification level</li>
        <li>Num Positions</li>
        </ul>
      </div>
    </div>
  );
};

export default PortfolioCard;
