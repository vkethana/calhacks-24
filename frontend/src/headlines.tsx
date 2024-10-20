import React, { useState, useEffect } from "react";
import { fetchApiHeadlines } from "./util/functions";

interface HeadlinesProps {
  date: string;
}

const Headlines = ({ date }: HeadlinesProps) => {
  const [headlines, setHeadlines] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHeadlines = async () => {
      setIsLoading(true);
      const fetchedTrades = await fetchApiHeadlines(date); // Get trades from API
      if (fetchedTrades) {
        setHeadlines(fetchedTrades); // Set trades in state
      }
      setIsLoading(false);
    };

    fetchHeadlines();
  }, [date, isLoading]);

  useEffect(() => {}, [headlines]);
  return (
    <div>
      {date && <h2 className="date">{date}</h2>}
      <div className="headlines-parent">
        {headlines &&
          headlines.map((item, index) => (
            <div className="headline" key={index}>
              <h3>{item}</h3>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Headlines;
