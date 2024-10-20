import React, { useMemo, useState, useEffect } from "react";
import "./styles/general.scss";
import Dashboard from "./dashboard";
import Timeline from "./timeline";
import { fetchApiTrades } from "./util/functions";

export interface Trade {
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
  const [pnl, setPnl] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [date, setDate] = useState<string>("2022-01-01");
  const [evalDate, setEvalDate] = useState<string>("2022-01-01");
  const [largestTrade, setLargestTrade] = useState<Trade>({
    action: "",
    volume: 0,
    ticker: "",
    pnl: 0,
  });

  useMemo(() => {
    const fetchTrades = async () => {
      setIsLoading(true);
      const fetchedTrades = await fetchApiTrades(date, evalDate); // Get trades from API
      if (fetchedTrades && fetchedTrades.response.trades.trades) {
        console.log(fetchedTrades.response);
        setTrades((prevTrades) => [
          ...prevTrades,
          ...fetchedTrades.response.trades.trades,
        ]); // Append fetched trades to the existing trades
      }
      if (fetchedTrades && fetchedTrades.response.result) {
        console.log(fetchedTrades.response.result);
        setPnl(fetchedTrades.response.result);
      }

      setIsLoading(false);
    };

    fetchTrades();
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
          pnl: pnl,
        };
      }
      if (trade.volume > largestTrade.volume) {
        setLargestTrade(trade);
      }
    });

    setAgents(updatedAgents); // Update the agents state once
  }, [trades, pnl]); // Include 'agents' as a dependency if it can change

  return (
    <div className="main">
      <Dashboard
        agents={agents}
        trades={trades}
        largestTrade={largestTrade}
        date={evalDate}
      />
      <Timeline setDate={setDate} setEvalDate={setEvalDate} />
    </div>
  );
}

export default App;
