import React, { useState, useEffect } from "react";
import formatToUSCurrency from "./util/functions";
import { Trade } from "./App";

interface TableRow {
  date: string;
  stock: string;
  amount: number;
  total: number;
  model: string;
}

const dummyRows: TableRow[] = [];
for (let i = 1; i <= 10; i++) {
  const date = new Date(2023, 0, i);
  dummyRows.push({
    date: date.toISOString().split("T")[0],
    stock: "TSLA",
    amount: 3.21,
    total: 1400,
    model: "Chat GPT",
  });
}

interface LogTableProps {
  trades: Trade[];
}

const LogTable = ({ trades }: LogTableProps) => {
  const [rows, setRows] = useState<TableRow[]>([]);

  useEffect(() => {
    const newRow = {};
  }, [trades]);

  return (
    <div className="table-container">
      <div className="table-row pinned">
        <div className="table-cell">Date</div>
        <div className="table-cell">Stock</div>
        <div className="table-cell">Amount</div>
        <div className="table-cell">Total</div>
        <div className="table-cell">Model</div>
      </div>
      {rows.map((row, index) => (
        <div className="table-row" key={index}>
          <div className="table-cell">{row.date}</div>
          <div className="table-cell">{row.stock}</div>
          <div className="table-cell">{row.amount}</div>
          <div className="table-cell">{formatToUSCurrency(row.total)}</div>
          <div className="table-cell">{row.model}</div>
        </div>
      ))}
    </div>
  );
};

export default LogTable;
