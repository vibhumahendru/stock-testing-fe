import React, { useState, useEffect } from "react";
import  { createPosition, getPortfolioDetails, getTickerByDate } from "../../utils/api";
import HistoricalBuy from "./HistoricalBuy";
import { Button, Modal, Tabs, Tab } from "react-bootstrap";
import Select from "react-select";
import {getLatestTickerData} from "../../utils/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'



const NewPositionModal = ({
  tickers,
  showPositionModal,
  setShowPositionModal,
  selectedTicker,
  selectedPortfolio,
  setRefetch,
  setSelectedPortfolio,
  setFetchingPerform
}) => {
  const [key, setKey] = useState("live");

  let initPayload = {
    ticker_id: null,
    portfolio_id: selectedPortfolio.id,
    buy_price: null,
    num_units: null,
  };

  const [posPayload, setPosPayload] = useState(initPayload);
  const [posTicker, setPosTicker] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [buyPrice, setBuyPrice] = useState(0);
  const [buyDate, setBuyDate] = useState(null);
  const [fetchingPos, setFetchingPos] = useState(false);
  const [date, setDate] = useState({start:"",end:""});
  const [allowSell, setAllowSell] = useState(false);
  const [histPrices, setHistPrices] = useState({buy:0,sell:0});
  const [histQuantity, setHistQuantity] = useState(0);

  const handleNewPosition = () => {
    if (posTicker && quantity && buyPrice && selectedPortfolio) {
      let payLoad = {
        ticker: posTicker.id,
        portfolio: selectedPortfolio.id,
        buy_price: buyPrice.toFixed(2),
        num_units: quantity,
        buy_date:new Date()
      }
      createPosition(payLoad)
      .then(()=>{
        setRefetch(Math.random())
        setShowPositionModal(false)
        toast.success("Succesfully created new position!")
        setFetchingPerform(true)
        getPortfolioDetails(selectedPortfolio.id)
        .then((res)=>{
          setSelectedPortfolio(res.data)
          setFetchingPerform(false)
        })
        .catch(()=>{})
      })
    }
  }

  useEffect(()=>{
    if (posTicker) {
      setFetchingPos(true)
      getLatestTickerData(posTicker.symbol)
      .then((res)=>{
        setBuyPrice(res.data.data[0].adj_close)
        setBuyDate(res.data.data[0].date)
        setFetchingPos(false)
      })
    }
  },[posTicker])

  useEffect(()=>{
    if (date.start) {
      getTickerByDate(date.start, posTicker.symbol)
      .then((res)=>{
        if (res.data.data.length) {
          setHistPrices({...histPrices, buy:res.data.data[0].adj_close})
        }
      })
    }
  },[date.start])

  useEffect(()=>{
    if (date.end) {
      getTickerByDate(date.end, posTicker.symbol)
      .then((res)=>{
        if (res.data.data.length) {
          setHistPrices({...histPrices, sell:res.data.data[0].adj_close})
        }
      })
    }
  },[date.end])

  console.log(histPrices, "PRICE");



  return (
    <>
      <ToastContainer />
      <Modal
        size="lg"
        show={showPositionModal}
        onHide={() => setShowPositionModal(false)}
        onExit={()=>{
          setQuantity(0)
          setBuyPrice(null)
          setPosTicker(null)
          setBuyDate(null)
          setDate({})
          setAllowSell(false)
        }}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Create New Position
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <Select
            className="w-50"
            placeholder={"Pick a stock...."}
            options={tickers}
            onChange={(value) => {
              setPosTicker(value);
              let obj = { ...posPayload };
              obj.ticker_id = value.value;
              setPosPayload(obj);
            }}
          />
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mt-3"
          >
            <Tab eventKey="live" title="Live Buy">
              <table class="table">
                <tbody className="">
                  <tr>
                    <td>Current Market Price:</td>
                    {fetchingPos ? <td><FontAwesomeIcon icon={faSpinner} className="fa-spin" /></td> : (<td>{buyPrice ? `$${buyPrice.toFixed(2)}`:"-"}</td>)}
                  </tr>
                  <tr>
                    <td>Quantity to buy:</td>
                    <td>
                      <input
                        className="form-control"
                        type="number"
                        name="quantity"
                        min="1"
                        max="5"
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Buy Date:</td>
                    {fetchingPos ? <td><FontAwesomeIcon icon={faSpinner} className="fa-spin" /></td> : (<td>{buyDate ?moment(buyDate).format('DD MMM YY'):"-"}</td>)}
                  </tr>
                  <tr className="table-warning">
                    <td>Total:</td>
                    <td>${(buyPrice * quantity).toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </Tab>
            <Tab eventKey="profile" title="Historical Buy">
              <HistoricalBuy
              setDate={setDate}
              date={date}
              posTicker={posTicker}
              setAllowSell={setAllowSell}
              allowSell={allowSell}
              histPrices={histPrices}
              histQuantity={histQuantity}
              setHistQuantity={setHistQuantity}
              />
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={()=>setShowPositionModal(false)}type="button" class="btn btn-secondary">
            Cancel
          </button>
          <button
            onClick={handleNewPosition}
            type="button"
            class="btn btn-warning"
          >
            Execute
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewPositionModal;

// <div className="mt-2">
//   <h6>Current Market Price: $100</h6>
//   <div className="d-flex mt-2">
//     <h6 className="mr-2">Quantity: </h6>
//     <input type="number" name="quantity" min="1" max="5"/>
//   </div>
// </div>
