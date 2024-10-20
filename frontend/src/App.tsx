import React, { useMemo, useState, useEffect } from "react";
import "./styles/general.scss";
import Dashboard from "./dashboard";
import Timeline from "./timeline";
import { fetchApiTrades } from "./util/functions";

export interface Trade {
  timestamp: string;
  action: string;
  volume: number;
  ticker: string;
  pnl: number;
}

export interface Agent {
  name: string;
  trades: Trade[];
  pnl: number;
}

function App() {
  const [agents, setAgents] = useState<Agent[]>([
    {
      name: "llama-3.1-8b-instant",
      trades: [],
      pnl: 0,
    },
  ]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [date, setDate] = useState<string>("2022-01-01");
  const [evalDate, setEvalDate] = useState<string>("2022-01-01");

  useMemo(() => {
    const fetchTrades = async () => {
      setIsLoading(true);
      const fetchedTrades = await fetchApiTrades(date, evalDate); // Get trades from API
      if (fetchedTrades) {
        console.log(fetchedTrades.trades);
        setTrades([...trades, fetchedTrades.trades]); // Set trades in state
      }

      setIsLoading(false);
    };

    fetchTrades();
    // eslint-disable-next-line no-console
  }, [date, evalDate]);

  useEffect(() => {
    if (trades.length === 0) return; // Early return if there are no trades

    let updatedAgents = [...agents]; // Create a copy of the current agents

    trades.forEach((trade) => {
      // Check if there are any agents available
      if (updatedAgents[0]) {
        updatedAgents[0] = {
          ...updatedAgents[0],
          trades: [
            ...(updatedAgents[0].trades || []),
            trade, // Append the current trade
          ],
        };
      }
    });

    setAgents(updatedAgents); // Update the agents state once
  }, [trades]); // Include 'agents' as a dependency if it can change

  return (
    <div className="main">
      <Dashboard agents={agents} trades={trades} date={date} />
      <Timeline setDate={setDate} setEvalDate={setEvalDate} />
    </div>
  );
}

export default App;
