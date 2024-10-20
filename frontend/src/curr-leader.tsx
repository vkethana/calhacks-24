import React, { useEffect, useState } from "react";
import { Model } from "./dashboard";
import formatToUSCurrency from "./util/functions";

interface CurrLeaderProps {
  data: Model[];
}

const CurrLeader = ({ data }: CurrLeaderProps) => {
  const first = data[0] ? data[0] : undefined;
  const [leader, setLeader] = useState(first);

  useEffect(() => {}, [data]);

  return (
    <div className="curr-leader-parent">
      <div className="title-parent">
        <h2 className="heading">Current Leader:</h2>
        <h3 className="leaderTitle">{leader ? leader.name : "..."}</h3>
      </div>
      <div className="leaderInfo">
        <div className="infoCell">
          <div className="val">
            {leader && formatToUSCurrency(leader.portfolio_total)}
          </div>
          <h4 className="subtitle">portfolio total</h4>
        </div>
        <div className="infoCell">
          <div className="val">+2.1%</div>
          <h4 className="subtitle">% change</h4>
        </div>
      </div>
      <div className="infoCell">
        <div className="val">SOLD 5.21 Shares TSLA for $12,000</div>
        <h4 className="subtitle">largest trade</h4>
      </div>
    </div>
  );
};

export default CurrLeader;
