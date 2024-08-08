"use client";
import React, { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import InvestmentForm from "@/app/play/Investment";

const POOL_WIDTH = 800;
const POOL_HEIGHT = 400;
const LANE_HEIGHT = 100;
const SWIMMER_WIDTH = 100;
const SWIMMER_HEIGHT = 100;
const FINISH_LINE = POOL_WIDTH - SWIMMER_WIDTH;
const LANE_COUNT = 3;

const Swimmer = ({ name, position, laneIndex }: any) => (
  <div
    className="absolute"
    style={{
      left: `${position}px`,
      top: `${laneIndex * LANE_HEIGHT + (LANE_HEIGHT - SWIMMER_HEIGHT) / 2}px`,
      width: `${SWIMMER_WIDTH}px`,
      height: `${SWIMMER_HEIGHT}px`,
      transition: "left 0.1s linear",
    }}
  >
    {/* <img src={swim} alt={name} className="w-full h-full object-cover" /> */}
    <iframe src="https://lottie.host/embed/e6b76612-ceb0-4880-a240-f6340d84dab5/GcHX1Kjio3.json"></iframe>
    <span className="absolute top-full left-0 text-xs font-bold whitespace-nowrap">{name}</span>
  </div>
);

const SwimmingPool = ({ children }: { children: React.ReactNode }) => (
  <svg width={POOL_WIDTH} height={POOL_HEIGHT} className="bg-blue-200">
    <defs>
      <pattern id="wave" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M0 5 Q 2.5 0, 5 5 T 10 5 T 15 5 T 20 5" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
      </pattern>
    </defs>

    <rect width="100%" height="100%" fill="url(#wave)" />

    {[...Array(LANE_COUNT + 1)].map((_, i) => (
      <line
        key={`lane-${i}`}
        x1="0"
        y1={i * LANE_HEIGHT}
        x2={POOL_WIDTH}
        y2={i * LANE_HEIGHT}
        stroke="white"
        strokeWidth="2"
      />
    ))}

    {[...Array(8)].map((_, i) => (
      <line
        key={`marker-${i}`}
        x1={((i + 1) * POOL_WIDTH) / 8}
        y1="0"
        x2={((i + 1) * POOL_WIDTH) / 8}
        y2={POOL_HEIGHT}
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1"
        strokeDasharray="5,5"
      />
    ))}

    <line x1={FINISH_LINE} y1="0" x2={FINISH_LINE} y2={POOL_HEIGHT} stroke="red" strokeWidth="2" />

    {children}
  </svg>
);

const SwimmingRace = () => {
  const [swimmers, setSwimmers] = useState([
    { name: "Alice", position: 0 },
    { name: "Bob", position: 0 },
    { name: "Zoey", position: 0 },
  ]);
  const [winner, setWinner] = useState<{ name: string; position: number } | null>(null);
  const [raceStarted, setRaceStarted] = useState(false);

  useEffect(() => {
    if (raceStarted && !winner) {
      const interval = setInterval(() => {
        setSwimmers((prevSwimmers) => {
          const newSwimmers = prevSwimmers.map((swimmer) => ({
            ...swimmer,
            position: Math.min(swimmer.position + Math.random() * 5, FINISH_LINE),
          }));

          const potentialWinner = newSwimmers.find((s) => s.position >= FINISH_LINE);
          if (potentialWinner) {
            clearInterval(interval);
            setWinner(potentialWinner);
            declareWinner(potentialWinner.name);
          }

          return newSwimmers;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [raceStarted, winner]);

  const declareWinner = async (winnerName: string) => {
    console.log(`Winner declared: ${winnerName}`);
    // Here you would call your backend API
  };

  const handleInvestmentSubmit = (investments: any) => {
    console.log("Investments submitted:", investments);
    // Here you would typically send these investments to your backend
  };

  const startRace = () => {
    setRaceStarted(true);
    setWinner(null);
    setSwimmers(swimmers.map((s) => ({ ...s, position: 0 })));
  };

  return (
    <div className="p-4">
      <div className="mt-8">
        <InvestmentForm swimmers={swimmers} onInvestmentSubmit={handleInvestmentSubmit} />
      </div>
      <div className="relative mb-4">
        {/* <SwimmingPool> */}
        <div className={`w-[800px]  h-[300px] bg-[url('/pool.png')] bg-cover broder-2 border-black  bg-center`}>
          {swimmers.map((swimmer, index) => (
            <div
              className="absolute flex flex-col justify-center"
              style={{
                left: `${swimmer.position}px`,
                top: `${index * LANE_HEIGHT + (LANE_HEIGHT - SWIMMER_HEIGHT) / 2}px`,
                width: `${SWIMMER_WIDTH}px`,
                height: `${SWIMMER_HEIGHT}px`,
                transition: "left 0.1s linear",
              }}
            >
              <iframe
                className="w-full h-full"
                src="https://lottie.host/embed/e6b76612-ceb0-4880-a240-f6340d84dab5/GcHX1Kjio3.json"
              ></iframe>
              <span className=" w-full h-full text-black pl-2 absolute">{swimmer.name}</span>
            </div>
          ))}
        </div>
        {/* </SwimmingPool> */}
      </div>

      <button
        onClick={startRace}
        className="bg-green-500 text-white px-4 py-2 rounded"
        disabled={raceStarted && !winner}
      >
        {raceStarted && !winner ? "Race in progress..." : "Start Race"}
      </button>
      {winner && (
        <Alert className="mt-4">
          <AlertTitle>Race Finished!</AlertTitle>
          <AlertDescription>The winner is {winner.name}!</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default SwimmingRace;
