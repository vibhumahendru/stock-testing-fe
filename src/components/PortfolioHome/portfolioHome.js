import React, { useState, useEffect } from "react";
import PortfolioContainer from "./PortfolioContainer";
import ChartContainer from "./ChartContainer";
import NewPortfolioModal from "./NewPortfolioModal";
import PortfolioDetailContainer from "../PortfolioDetail/PortfolioDetailContainer";
import { useParams } from "react-router-dom";
import { getTickers } from "../../utils/api";


const PortfolioHome = ({}) => {
  const { portfolioId } = useParams();
  const [show, setShow] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [tickers, setTickers] = useState([]);
  const [selectedTicker, setSelectedTicker] = useState({});

  useEffect(() => {
    getTickers()
      .then((res) => {
        setSelectedTicker({
          name: res.data[0].name,
          value: res.data[0].id,
          label: res.data[0].name,
          symbol: res.data[0].symbol,
        });
        setTickers(getTickerOptions(res.data));
      })
      .catch();
  }, []);

  const getTickerOptions = (t) => {
    return t.map((el) => {
      return {
        ...el,
        value: el.id,
        label: el.name,
      };
    });
  };

  return (
    <div class="container-fluid">
      <NewPortfolioModal
        handleClose={handleClose}
        handleShow={handleShow}
        show={show}
      />
      <div class="row">
        <div class="col-3 border p-0">
          <PortfolioContainer
            handleShow={handleShow}
            handleClose={handleClose}
            portfolioId={portfolioId}
            selectedPortfolio={selectedPortfolio}
            setSelectedPortfolio={setSelectedPortfolio}
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
