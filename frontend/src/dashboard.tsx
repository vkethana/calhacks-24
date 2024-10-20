import React from "react";
import CurrLeader from "./curr-leader";
import Headlines from "./headlines";
import Leaderboard from "./leaderboard";
import LogTable from "./logtable";
import { Agent, Trade } from "./App";

interface DashboardProps {
  agents: Agent[];
  rankedAgents: Agent[];
  trades: Trade[];
  date: string;
}

const Dashboard = ({ agents, rankedAgents, trades, date }: DashboardProps) => {
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
        <CurrLeader data={rankedAgents} />
      </div>
      <div className="section bottom">
        <h2 className="heading">Leaderboard</h2>
        <Leaderboard data={rankedAgents} />
      </div>
    </div>
  );
};

export default Dashboard;
