import React, {useState, useEffect} from "react";
import {getPositionsForPortfolio} from "../../utils/api";
import BarLoader from "react-bar-loader";
import Skeleton from 'react-loading-skeleton';
import moment from 'moment'

const PositionsTable = ({ refetch, selectedPortfolio, setShowPositionModal }) => {


  const [positions, setPositions] = useState([])
  const [fetchingPositions, setFetchingPositions] = useState(true)

  useEffect(()=>{
    setFetchingPositions(true)
    getPositionsForPortfolio(selectedPortfolio.id)
    .then((res)=>{
      setPositions(res.data)
      setFetchingPositions(false)
    })
    .catch(res=>console.log(res))

  },[selectedPortfolio.id, refetch])


  return (
    <>
      <div className="bg-white rounded ml-2 mr-2 man-h-68 overflow-auto">
        <div className="sticky-top bg-white text-muted p-1 pl-3 border-bottom">
          Positions
          <span
            onClick={() => setShowPositionModal(true)}
            class="badge badge-primary ml-2 clickable"
          >
            New +
          </span>
        </div>
        <table class="table table-hover text-center mb-0">
          <thead className="">
            <tr>
              <th scope="col">Stock</th>
              <th scope="col">Position</th>
              <th scope="col">Quantity</th>
              <th scope="col">Buy/Sell Date</th>
              <th scope="col">Buy/Sell Price</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          {!fetchingPositions ? <tbody className="">
            {positions.map((p) => {
              return (
                <tr>
                  <td>{p.ticker_name}</td>
                  <td>BUY</td>
                  <td>{p.num_units}</td>
                  <td>{moment(p.buy_date).format('DD MMM YY')}</td>
                  <td>${p.buy_price}</td>
                  <td>10</td>
                </tr>
              );
            })}
          </tbody>:null}
        </table>
        {fetchingPositions ? <div className="pl-2 pr-2"><Skeleton height={30} duration={1} count={30}/></div>:null}
      </div>
    </>
  );
};

export default PositionsTable;
