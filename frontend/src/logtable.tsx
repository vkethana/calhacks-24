import React, { useState, useEffect } from "react";
import { Trade } from "./App";

interface TableRow {
  date: string;
  action: string;
  volume: number;
  stock: string;
  agent: string;
}

interface LogTableProps {
  trades: Trade[];
}

const LogTable = ({ trades }: LogTableProps) => {
  const [rows, setRows] = useState<TableRow[]>([]);

  useEffect(() => {
    setRows(
      trades.map((trade) => ({
        date: trade.timestamp,
        action: trade.action,
        volume: trade.volume,
        stock: trade.ticker,
        agent: "Chat GPT",
      }))
    );
  }, [trades]);

  return (
    <div className="table-container">
      <div className="table-row pinned">
        <div className="table-cell">Date</div>
        <div className="table-cell">Action</div>
        <div className="table-cell">Volume</div>
        <div className="table-cell">Stock</div>
        <div className="table-cell">Agent</div>
      </div>
      {rows.map((row, index) => (
        <div className="table-row" key={index}>
          <div className="table-cell">{row.date}</div>
          <div className="table-cell">{row.action}</div>
          <div className="table-cell">{row.volume}</div>
          <div className="table-cell">{row.stock}</div>
          <div className="table-cell">{row.agent}</div>
        </div>
      ))}
    </div>
  );
};

export default LogTable;
