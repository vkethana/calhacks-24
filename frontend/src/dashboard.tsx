import React from "react";
import CurrLeader from "./curr-leader";
import Headlines from "./headlines";
import Leaderboard from "./leaderboard";
import LogTable from "./logtable";

type Trade = {
  stock: string;
  amount: number;
  price: number;
  date: string | Date;
};

export interface Model {
  name: string;
  trades: Trade[];
  portfolio_total: number;
}

let dummyRankings: Model[] = [];
for (let i = 1; i <= 10; i++) {
  const date = new Date(2023, 0, i);
  dummyRankings.push({
    name: "Chat GPT",
    trades: [
      {
        stock: "TSLA",
        amount: 3,
        price: 72.21,
        date: date.toISOString().split("T")[0],
      },
    ],
    portfolio_total: 72042,
  });
}

const Dashboard = () => {
  return (
    <div className="dashboard-parent">
      <div className="section full-height">
        <h2 className="heading">Newspaper Headlines</h2>
        <Headlines />
      </div>
      <div className="section full-height">
        <h2 className="heading">Buy/Sell Log</h2>
        <LogTable />
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
