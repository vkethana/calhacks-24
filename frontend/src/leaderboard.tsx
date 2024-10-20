import React, { useEffect, useState } from "react";
import { Agent } from "./App";

interface LeaderboardProps {
  data: Agent[];
}

const Leaderboard = ({ data }: LeaderboardProps) => {
  const [rankings, setRankings] = useState<Agent[]>(data);
  useEffect(() => {
    // Sort agents by pnl in descending order (highest pnl first)
    const sortedRankings = [...data].sort((a, b) => b.pnl - a.pnl);
    setRankings(sortedRankings);
  }, [data]);

  return (
    <div className="leaderboard-parent">
      <div className="ranking pinned">
        <div className="cell">#</div>
        <div className="cell">Model</div>
        <div className="cell">Change</div>
        <div className="cell">Pnl</div>
      </div>
      {rankings &&
        rankings.map((model, index) => (
          <div key={index} className="ranking">
            <div className="cell">{index + 1}</div>
            <div className="cell">{model.name}</div>
            <div className="cell">+/-%</div>
            <div className="cell">{model.pnl}</div>
          </div>
        ))}
    </div>
  );
};

export default Leaderboard;
