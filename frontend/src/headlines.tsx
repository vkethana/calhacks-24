import React, { useState, useEffect } from "react";
import { fetchApiHeadlines } from "./util/functions";

interface HeadlinesProps {
  date: string;
}

const Headlines = ({ date }: HeadlinesProps) => {
  const [headlines, setHeadlines] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true; // Track whether the component is still mounted

    const fetchHeadlines = async () => {
      setIsLoading(true);
      try {
        const fetchedHeadlines = await fetchApiHeadlines(date); // Fetch headlines from API
        if (isMounted && fetchedHeadlines) {
          setHeadlines(fetchedHeadlines); // Update state if still mounted
        }
      } catch (error) {
        console.error("Failed to fetch headlines:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchHeadlines();

    // Clean-up function to prevent setting state on an unmounted component
    return () => {
      isMounted = false;
    };
  }, [date]); // Only re-fetch when `date` changes

  useEffect(() => {}, [headlines]);
  return (
    <div>
      {date && <h2 className="date">{date}</h2>}
      <div className="headlines-wrapper">
        <div className="headlines-parent">
          {headlines &&
            headlines.map((item, index) => (
              <div className="headline" key={index}>
                <h3>{item}</h3>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Headlines;
