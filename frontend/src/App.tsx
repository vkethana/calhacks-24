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
  const [agents, setAgents] = useState<Agent[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [date, setDate] = useState<string>("2022-01-01");
  const [evalDate, setEvalDate] = useState<string>("2022-01-01");

  useEffect(() => {
    const fetchTrades = async () => {
      setIsLoading(true);
      const fetchedTrades = await fetchApiTrades(date, evalDate); // Get trades from API
      if (fetchedTrades) {
        setTrades(fetchedTrades); // Set trades in state
      }
      setIsLoading(false);
    };

    fetchTrades();
    // eslint-disable-next-line no-console
    console.log(trades);
  }, [date, isLoading]);

  return (
    <div className="main">
      <Dashboard agents={agents} date={date} />
      <Timeline setDate={setDate} setEvalDate={setEvalDate} />
    </div>
  );
}

export default App;
