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
  agent: string;
  pnl: number;
}

export interface Agent {
  name: string;
  trades: Trade[];
  pnl: number;
}

function App() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [date, setDate] = useState<string>("2022-01-01");
  const [evalDate, setEvalDate] = useState<string>("2022-01-01");
  const [rankedAgents, setRankedAgents] = useState<Agent[]>([]);

  useMemo(() => {
    const fetchTrades = async () => {
      setIsLoading(true);
      const fetchedTrades = await fetchApiTrades(date, evalDate); // Get trades from API
      if (fetchedTrades) {
        // eslint-disable-next-line no-console
        console.log(fetchedTrades);
        setTrades([...trades, fetchedTrades]); // Set trades in state
      }
      setIsLoading(false);
    };

    fetchTrades();
    // eslint-disable-next-line no-console
  }, [date, evalDate]);

  useEffect(() => {
    const updatedAgents = [...agents]; // Create a copy of the current agents

    trades.forEach((trade) => {
      // Check if the agent already exists
      const existingAgentIndex = updatedAgents.findIndex(
        (agent) => agent.name === trade.agent
      );

      if (existingAgentIndex !== -1) {
        // If the agent exists, update their trades
        updatedAgents[existingAgentIndex] = {
          ...updatedAgents[existingAgentIndex],
          trades: [
            ...(updatedAgents[existingAgentIndex].trades || []),
            trade, // Append the current trade
          ],
        };
      } else {
        // If the agent does not exist, create a new agent
        const newAgent = {
          name: trade.agent,
          trades: [trade], // Initialize with the current trade
          pnl: 0,
        };
        updatedAgents.push(newAgent); // Add the new agent to the agents array

        const rankedAgents = updatedAgents
          .map((agent) => {
            const totalPnL = agent.trades.reduce(
              (sum, trade) => sum + trade.pnl,
              0
            ); // Calculate total PnL
            return { ...agent, pnl: totalPnL }; // Add total PnL to agent object
          })
          .sort((a, b) => b.pnl - a.pnl); // Sort agents by PnL in descending order

        // Update the rankedAgents state with the sorted agents
        setRankedAgents(rankedAgents);
      }
    });
    setAgents(updatedAgents);

    const rankedAgents = updatedAgents
      .map((agent) => {
        const totalPnL = agent.trades.reduce(
          (sum, trade) => sum + trade.pnl,
          0
        ); // Calculate total PnL
        return { ...agent, pnl: totalPnL }; // Add total PnL to agent object
      })
      .sort((a, b) => b.pnl - a.pnl); // Sort agents by PnL in descending order

    // Update the rankedAgents state with the sorted agents
    setRankedAgents(rankedAgents);
  }, [trades]);

  return (
    <div className="main">
      <Dashboard
        agents={agents}
        rankedAgents={rankedAgents}
        trades={trades}
        date={date}
      />
      <Timeline setDate={setDate} setEvalDate={setEvalDate} />
    </div>
  );
}

export default App;
