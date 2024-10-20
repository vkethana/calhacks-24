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
  const [prevPnl, setPrevPnl] = useState<number | null>(null); // Store previous pnl
  const [percentChange, setPercentChange] = useState<number | null>(null); // Store percent change

  useEffect(() => {
    if (data && data.length > 0) {
      const newLeader = data[0];

      // Calculate percentage change if previous pnl exists
      if (prevPnl !== null) {
        const change = ((newLeader.pnl - prevPnl) / prevPnl) * 100;
        setPercentChange(change);
      }

      // Update previous pnl and leader
      setPrevPnl(newLeader.pnl);
      setLeader(newLeader);
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
            <div
              className={`val ${
                percentChange !== null && percentChange > 0 ? "green" : "red"
              }`}
            >
              {percentChange !== null ? `${percentChange.toFixed(2)}%` : "n/a"}
            </div>
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
