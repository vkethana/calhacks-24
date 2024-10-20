import React, { useState, useEffect } from "react";

export interface Headline {
  title: string;
  date: string | Date;
}

const dummyHeadlines: Headline[] = [];
for (let i = 1; i <= 10; i++) {
  const date = new Date(2023, 0, i);
  dummyHeadlines.push({
    title: `Headline ${i}`,
    date: date.toISOString().split("T")[0],
  });
}

const Headlines = () => {
  const [headlines, setHeadlines] = useState<Headline[]>(dummyHeadlines);

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
