import React from "react";
import PortfolioContainer from './PortfolioContainer'

const PortfolioHome = ({}) => (
  <div class="container-fluid">
    <div class="row">
      <div class="col-3 border p-0">
        <PortfolioContainer/>
      </div>
      <div class="col border">One of three columns</div>
    </div>
  </div>
);

export default PortfolioHome;
