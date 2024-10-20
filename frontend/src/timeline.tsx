import React, { useState } from "react";
import Slider from "@mui/material/Slider";

const marks = [
  {
    value: 0,
    label: "Jan",
  },
  {
    value: 31,
    label: "Feb",
  },
  {
    value: 59,
    label: "Mar",
  },
  {
    value: 90,
    label: "Apr",
  },
  {
    value: 121,
    label: "May",
  },
  {
    value: 151,
    label: "Jun",
  },
  {
    value: 181,
    label: "Jul",
  },
  {
    value: 212,
    label: "Aug",
  },
  {
    value: 243,
    label: "Sep",
  },
  {
    value: 273,
    label: "Oct",
  },
  {
    value: 303,
    label: "Nov",
  },
  {
    value: 333,
    label: "Dec",
  },
];

function valuetext(value: number) {
  return `Day: ${value}`;
}

const Timeline = () => {
  const [value, setValue] = useState<number[]>([0, 365]); // Initial range values

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <div className="timeline-parent">
      <Slider
        className="timeline-component"
        aria-label="Custom marks"
        defaultValue={20}
        step={1}
        min={0}
        max={365}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </div>
  );
};

export default Timeline;
