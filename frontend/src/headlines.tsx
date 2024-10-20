import React, { useState, useEffect } from "react";
import { fetchApiHeadlines } from "./util/functions";

export interface Headline {
  title: string;
  date: string | Date;
}

const Headlines = () => {
  const [headlines, setHeadlines] = useState<Headline[]>([]);

  useEffect(() => {
    const fetchHeadlines = async () => {
      const fetchedTrades = await fetchApiHeadlines(); // Get trades from API
      if (fetchedTrades) {
        setHeadlines(fetchedTrades); // Set trades in state
      }
    };

    fetchHeadlines();
  }, []);

  useEffect(() => {}, [headlines]);
  return (
    <div className="headlines-parent">
      {headlines &&
        headlines.map((item) => (
          <div className="headline">
            <h3>{item.title}</h3>
            <p>parsed data: {"<empty>"}</p>
          </div>
        ))}
    </div>
  );
};

export default Headlines;
