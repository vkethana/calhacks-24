import React, { useState } from "react";
import CurrLeader from "./curr-leader";
import Headlines from "./headlines";
import Leaderboard from "./leaderboard";
import LogTable from "./logtable";
import { Agent, Trade } from "./App";

let dummyRankings: Agent[] = [];
for (let i = 1; i <= 10; i++) {
  const date = new Date(2023, 0, i);
  dummyRankings.push({
    name: "Chat GPT",
    trades: [
      {
        timestamp: date.toISOString().split("T")[0],
        action: "buy",
        volume: 3,
        ticker: "TSLA",
      },
    ],
    portfolio_total: 72042,
  });
}

interface DashboardProps {
  agents: Agent[];
}

const Dashboard = ({ agents }: DashboardProps) => {
  const [trades, setTrades] = useState<Trade[]>([]);

  return (
    <div className="dashboard-parent">
      <div className="section full-height">
        <h2 className="heading">Newspaper Headlines</h2>
        <Headlines />
      </div>
      <div className="section full-height">
        <h2 className="heading">Buy/Sell Log</h2>
        <LogTable trades={trades} />
      </div>
      <div className="section top">
        <CurrLeader data={dummyRankings} />
      </div>
      <div className="section bottom">
        <h2 className="heading">Leaderboard</h2>
        <Leaderboard data={dummyRankings} />
      </div>
    </div>
  );
};

export default Dashboard;
