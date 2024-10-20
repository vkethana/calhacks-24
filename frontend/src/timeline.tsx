import React, { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import { Tooltip, IconButton } from "@mui/material";
import { getMonthAndDay } from "./util/functions";
import {
  faPlay,
  faArrowsRotate,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const monthMarks = [
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

interface TimelineProps {
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setEvalDate: React.Dispatch<React.SetStateAction<string>>;
}

function valuetext(value: number) {
  return `Day: ${value}`;
}

const Timeline = ({ setDate, setEvalDate }: TimelineProps) => {
  const [value, setValue] = useState<number>(0); // Initial range values
  const [playing, setPlaying] = useState<boolean>(false);
  const [initState, setInitState] = useState<boolean>(true);
  const [tradingMarker, setTradingMarker] = useState<number | null>(null); // Track eval date value
  const handleChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setValue(newValue);
    }
  };

  const handleReset = () => {
    setValue(0);
    setPlaying(false);
    setTradingMarker(null);
    setInitState(true);
  };

  useEffect(() => {
    const { month, day } = getMonthAndDay(value);
    setEvalDate(`2022-${month}-${String(day).padStart(2, "0")}`);
  }, [value]);

  useEffect(() => {
    if (initState) {
      const { month, day } = getMonthAndDay(value);
      setDate(`2022-${month}-${String(day).padStart(2, "0")}`); // Example for 2023
      setTradingMarker(value);
      setInitState(false);
    }
    if (playing) {
      const intervalId = setInterval(() => {
        if (value <= 365) {
          setValue((prevValue) => prevValue + 1);
        }
      }, 2000); // Increment value every second (1000 ms)

      return () => clearInterval(intervalId);
    }
  }, [playing]);

  const marks = [
    ...monthMarks,
    ...(tradingMarker !== null
      ? [{ value: tradingMarker, label: "" }] // Add custom marker
      : []),
  ];

  return (
    <div className="timeline-parent">
      <Slider
        className="timeline-component"
        aria-label="Custom marks"
        onChange={handleChange}
        value={value}
        step={1}
        min={0}
        max={365}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        marks={marks}
      />
      <div className="player-controls">
        <Tooltip title={playing ? "Pause" : "Play"}>
          <IconButton className="control" onClick={() => setPlaying(!playing)}>
            <FontAwesomeIcon icon={playing ? faPause : faPlay} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Reset">
          <IconButton className="control" onClick={handleReset}>
            <FontAwesomeIcon icon={faArrowsRotate} />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default Timeline;
