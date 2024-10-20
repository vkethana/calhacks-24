import React, { useEffect, useState } from "react";
import { Agent, Trade } from "./App";
import formatToUSCurrency from "./util/functions";

interface CurrLeaderProps {
  data: Agent[];
  largestTrade: Trade;
}

const CurrLeader = ({ data, largestTrade }: CurrLeaderProps) => {
  const first = data[0] ? data[0] : undefined;
  const [leader, setLeader] = useState(first);

  useEffect(() => {
    if (data && data.length > 0) {
      setLeader(data[0]); // Update leader when data changes
    }
  }, [data]);

  return (
    <div className="curr-leader-parent">
      <div className="title-parent">
        <h2 className="heading">Current Leader:</h2>
        <h3 className="leaderTitle">{leader ? leader.name : "..."}</h3>
      </div>
      <div className="infoWrapper">
        <div className="leaderInfo">
          <div className="infoCell">
            <div className="val">
              {leader && formatToUSCurrency(leader.pnl)}
            </div>
            <h4 className="subtitle">portfolio total</h4>
          </div>
          <div className="infoCell">
            <div className="val">+/-</div>
            <h4 className="subtitle">% change</h4>
          </div>
        </div>
        <div className="infoCell">
          <div className="val desc">
            {largestTrade
              ? `${largestTrade.action} ${largestTrade.volume} ${largestTrade.ticker} shares`
              : "..."}
          </div>
          <h4 className="subtitle">largest trade</h4>
        </div>
      </div>
    </div>
  );
};

export default CurrLeader;
