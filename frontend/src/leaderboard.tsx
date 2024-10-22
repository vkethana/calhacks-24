import React, { useEffect, useState } from "react";
import { Agent } from "./App";
import formatToUSCurrency from "./util/functions";

interface LeaderboardProps {
  data: Agent[];
}

const Leaderboard = ({ data }: LeaderboardProps) => {
  const [rankings, setRankings] = useState<Agent[]>(data);
  const [prevPnls, setPrevPnls] = useState<{ [name: string]: number | null }>(
    {}
  );
  const [percentChanges, setPercentChanges] = useState<{
    [name: string]: number | null;
  }>({});

  useEffect(() => {
    // Sort agents by pnl in descending order (highest pnl first)
    const sortedRankings = [...data].sort((a, b) => b.pnl - a.pnl);
    setRankings(sortedRankings);

    const newPrevPnls: { [name: string]: number | null } = {};
    const newPercentChanges: { [name: string]: number | null } = {};

    sortedRankings.forEach((agent) => {
      const prevPnl = prevPnls[agent.name] || null;

      if (prevPnl !== null) {
        const percentChange = ((agent.pnl - prevPnl) / prevPnl) * 100;
        newPercentChanges[agent.name] = percentChange;
      } else {
        newPercentChanges[agent.name] = null; // No previous value
      }

      newPrevPnls[agent.name] = agent.pnl; // Store the current pnl for the next calculation
    });

    setPrevPnls(newPrevPnls); // Update previous pnl values
    setPercentChanges(newPercentChanges); // Update percent change for each agent
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
            <div className="cell">
              {percentChanges[model.name] !== null
                ? `${percentChanges[model.name]?.toFixed(2)}%`
                : "n/a"}
            </div>
            <div className="cell">{formatToUSCurrency(model.pnl)}</div>
          </div>
        ))}
    </div>
  );
};

export default Leaderboard;
