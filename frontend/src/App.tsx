import React, { useEffect, useState } from "react";
import "./styles/general.scss";
import Dashboard from "./dashboard";
import Timeline from "./timeline";
import { fetchApiTrades } from "./util/functions";

export interface Trade {
  timestamp: string | Date;
  action: string;
  volume: number;
  ticker: string;
}

export interface Agent {
  name: string;
  trades: Trade[];
  portfolio_total: number;
}

function App() {
  const [agents, setAgents] = useState<Agent[]>([
    { name: "Chat GPT", trades: [], portfolio_total: 0 },
  ]);
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    const fetchTrades = async () => {
      const fetchedTrades = await fetchApiTrades(); // Get trades from API
      if (fetchedTrades) {
        setTrades(fetchedTrades); // Set trades in state
      }
    };

    fetchTrades();
  }, []);

  return (
    <div className="main">
      <Dashboard agents={agents} />
      <Timeline />
    </div>
  );
}

export default App;
