import React, { useState } from "react";
import Performance from "./Performance";
import PositionsTable from "./PositionsTable";
import NewPositionModal from "./NewPositionModal";

const PortfolioDetailContainer = ({
  selectedTicker,
  selectedPortfolio,
  tickers,
  setSelectedPortfolio
}) => {
  const [showPositionModal, setShowPositionModal] = useState(false);
  const [refetch, setRefetch] = useState(1);
  const [fetchingPerform, setFetchingPerform] = useState(false);

  return (
    <>
      {selectedPortfolio ? (
        <>
          <NewPositionModal
            showPositionModal={showPositionModal}
            tickers={tickers}
            setRefetch={setRefetch}
            setShowPositionModal={setShowPositionModal}
            selectedTicker={selectedTicker}
            selectedPortfolio={selectedPortfolio}
            setSelectedPortfolio={setSelectedPortfolio}
            setFetchingPerform={setFetchingPerform}
          />
          <div className="border bg-white shadow">
            <h3 className="m-2 ml-3">{selectedPortfolio.name}</h3>
          </div>
          <div className="m-0">
            <div className="ml-2 mr-2">
              <Performance
              selectedPortfolio={selectedPortfolio}
              fetchingPerform={fetchingPerform}
              />
            </div>
            <PositionsTable
            refetch={refetch}
            selectedPortfolio={selectedPortfolio}
            setShowPositionModal={setShowPositionModal} />
          </div>
        </>
      ) : null}
    </>
  );
};

export default PortfolioDetailContainer;
