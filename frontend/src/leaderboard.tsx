import React, { useState } from "react";
import { Model } from "./dashboard";

interface LeaderboardProps {
  data: Model[];
}

const Leaderboard = ({ data }: LeaderboardProps) => {
  const [rankings, setRankings] = useState<Model[]>(data);
  return (
    <div className="leaderboard-parent">
      <div className="ranking pinned">
        <div className="cell">#</div>
        <div className="cell">Model</div>
        <div className="cell">Change</div>
        <div className="cell">Portfolio Value</div>
      </div>
      {rankings &&
        rankings.map((model, index) => (
          <div key={index} className="ranking">
            <div className="cell">{index + 1}</div>
            <div className="cell">{model.name}</div>
            <div className="cell">+2.1%</div>
            <div className="cell">{model.portfolio_total}</div>
          </div>
        ))}
    </div>
  );
};

export default Leaderboard;
