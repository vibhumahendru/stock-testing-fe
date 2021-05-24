import React, { useState, useEffect } from "react";
import PortfolioContainer from "./PortfolioContainer";
import ChartContainer from "./ChartContainer";
import NewPortfolioModal from "./NewPortfolioModal";
import PortfolioDetailContainer from "../PortfolioDetail/PortfolioDetailContainer";
import { useParams } from "react-router-dom";
import { getTickers } from "../../utils/api";
import { ToastContainer } from "react-toastify";


const PortfolioHome = ({}) => {
  const { portfolioId } = useParams();
  const [show, setShow] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);

  console.log(localStorage);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [tickers, setTickers] = useState([]);
  const [selectedTicker, setSelectedTicker] = useState({});

  const [portfolios, setPortfolios] = useState([]);
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    getTickers()
      .then((res) => {
        setSelectedTicker({...res.data[0], value:res.data[0].id, label:res.data[0].name});
        setTickers(getTickerOptions(res.data));
      })
      .catch((res)=>{
          if (res.response.status === 401) {
            window.location='/login'
          }
      });
  }, []);

  const getTickerOptions = (t) => {
    return t.map((el) => {
      return {
        ...el,
        value: el.id,
        label: `${el.name} - ${el.exchange}`,
      };
    });
  };

  return (
    <div class="container-fluid">
      <NewPortfolioModal
        handleClose={handleClose}
        handleShow={handleShow}
        show={show}
        setSelectedPortfolio={setSelectedPortfolio}
        portfolios={portfolios}
        setPortfolios={setPortfolios}
        fetching={fetching}
        setFetching={setFetching}
        portfolioId={portfolioId}
      />
      <div class="row">
        <div class="col-3 border p-0">
          <PortfolioContainer
            handleShow={handleShow}
            handleClose={handleClose}
            portfolioId={portfolioId}
            selectedPortfolio={selectedPortfolio}
            setSelectedPortfolio={setSelectedPortfolio}
            portfolios={portfolios}
            setPortfolios={setPortfolios}
            fetching={fetching}
            setFetching={setFetching}
          />
        </div>
        <div class="col border bg-light p-0">
          {portfolioId ? (
            <PortfolioDetailContainer
              selectedPortfolio={selectedPortfolio}
              portfolioId={portfolioId}
              tickers={tickers}
              selectedTicker={selectedTicker}
              setSelectedPortfolio={setSelectedPortfolio}
              setPortfolios={setPortfolios}
              portfolios={portfolios}
            />
          ) : (
            <ChartContainer
            tickers={tickers}
            selectedTicker={selectedTicker}
            setSelectedTicker={setSelectedTicker}
             />
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioHome;
