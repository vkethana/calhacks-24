import React, { useState } from "react";
import formatToUSCurrency from "./util/functions";

interface TableRow {
  id: number;
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
    id: i,
    date: date.toISOString().split("T")[0],
    stock: "TSLA",
    amount: 3.21,
    total: 1400,
    model: "Chat GPT",
  });
}

const LogTable = () => {
  const [rows, setRows] = useState<TableRow[]>(dummyRows);

  return (
    <div className="table-container">
      <div className="table-row pinned">
        <div className="table-cell">Date</div>
        <div className="table-cell">Stock</div>
        <div className="table-cell">Amount</div>
        <div className="table-cell">Total</div>
        <div className="table-cell">Model</div>
      </div>
      {rows.map((row) => (
        <div className="table-row" key={row.id}>
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
