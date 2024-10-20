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
  date: string;
  trades: Trade[];
}

const LogTable = ({ date, trades }: LogTableProps) => {
  const [rows, setRows] = useState<TableRow[]>([]);

  useEffect(() => {
    // Add new trades only if they don't already exist in rows
    const newRows = trades
      .filter(
        (trade) =>
          trade &&
          trade.action &&
          trade.volume &&
          trade.ticker &&
          !rows.some(
            (row) => row.stock === trade.ticker && row.action === trade.action
          )
      )
      .map((trade) => ({
        date: date, // Set the current date when the trade is added
        action: trade.action,
        volume: trade.volume,
        stock: trade.ticker,
        agent: "llama-3.1-8b-instant",
      }));

    // Only update the rows with newly added trades
    setRows((prevRows) => [...newRows, ...prevRows]); // Prepend new trades to keep the recent ones at the top
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
