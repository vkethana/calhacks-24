import React, { useState } from "react";
import CurrLeader from "./curr-leader";
import Headlines from "./headlines";
import Leaderboard from "./leaderboard";
import LogTable from "./logtable";
import { Agent, Trade } from "./App";

interface DashboardProps {
  agents: Agent[];
  date: string;
}

const Dashboard = ({ agents, date }: DashboardProps) => {
  const [trades, setTrades] = useState<Trade[]>([]);

  return (
    <div className="dashboard-parent">
      <div className="section full-height">
        <h2 className="heading">Newspaper Headlines</h2>
        <Headlines date={date} />
      </div>
      <div className="section full-height">
        <h2 className="heading">Buy/Sell Log</h2>
        <LogTable trades={trades} />
      </div>
      <div className="section top">
        <CurrLeader data={agents} />
      </div>
      <div className="section bottom">
        <h2 className="heading">Leaderboard</h2>
        <Leaderboard data={agents} />
      </div>
    </div>
  );
};

export default Dashboard;
