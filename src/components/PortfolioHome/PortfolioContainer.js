import React, { useEffect, useState } from "react";
import PortfolioCard from "./PortfolioCard";
import { getPortfolios } from "../../utils/api";

const PortfolioContainer = ({}) => {
  const [portfolios, setPortfolios] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    getPortfolios()
      .then((res) => {
        setPortfolios(res.data);
        setFetching(false);
      })
      .catch(() => {
        setPortfolios([]);
        setFetching(false);
      });
  }, []);

  return (
    <div class="bg-white">
      <div className="border-bottom d-flex justify-content-between">
        <h4 class="m-3">My Portfolios</h4>
        <div>
          {" "}
          <button type="button" class="btn btn-warning m-2 font-weight-bold">New +</button>
        </div>
      </div>
      <div class="h-scroll">
        {fetching ? "loading" : null}
        {!fetching && portfolios.length
          ? portfolios.map((p) => <PortfolioCard portfolio={p} />)
          : "NONEEEEE"}
      </div>
    </div>
  );
};

export default PortfolioContainer;
