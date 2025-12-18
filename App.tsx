import React, { useEffect, useMemo, useState } from "react";

const GRID_SIZE = 5;
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;
const FLASH_DURATION_MS = 10000; // 10 seconds
const FLASH_INTERVAL_MS = 600; // on/off toggle speed

// Utility: check prime numbers
const isPrime = (n: number) => {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
};

// Level definitions
const levels = [
  {
    name: "Even Indices",
    rule: (index: number) => index % 2 === 0,
    hint: "Even numbers only",
  },
  {
    name: "Diagonals",
    rule: (index: number) => {
      const row = Math.floor(index / GRID_SIZE);
      const col = index % GRID_SIZE;
      return row === col || row + col === GRID_SIZE - 1;
    },
    hint: "Main X shape",
  },
  {
    name: "Prime Numbers",
    rule: (index: number) => isPrime(index),
    hint: "Math primes",
  },
  {
    name: "Center Cluster",
    rule: (index: number) => {
      const center = 12; // 5x5 center
      const neighbors = [7, 11, 12, 13, 17];
      return neighbors.includes(index);
    },
    hint: "Middle + cross",
  },
  {
    name: "(row + col) % 3 === 0",
    rule: (index: number) => {
      const row = Math.floor(index / GRID_SIZE);
      const col = index % GRID_SIZE;
      return (row + col) % 3 === 0;
    },
    hint: "Row + Column math",
  },
];

export default function App() {
  const [level, setLevel] = useState(0);
  const [flashing, setFlashing] = useState(true);
  const [flashOn, setFlashOn] = useState(true);
  const [selected, setSelected] = useState<boolean[]>(Array(TOTAL_CELLS).fill(false));
  const [showResult, setShowResult] = useState(false);

  // Correct pattern for current level
  const answer = useMemo(() => {
    return Array.from({ length: TOTAL_CELLS }, (_, i) => levels[level].rule(i));
  }, [level]);

  // Flashing timer
  useEffect(() => {
    setFlashing(true);
    setShowResult(false);
    setSelected(Array(TOTAL_CELLS).fill(false));

    const interval = setInterval(() => {
      setFlashOn((prev) => !prev);
    }, FLASH_INTERVAL_MS);

    const timeout = setTimeout(() => {
      setFlashing(false);
      clearInterval(interval);
    }, FLASH_DURATION_MS);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [level]);

  const toggleCell = (i: number) => {
    if (flashing) return; // disable clicks while flashing
    setSelected((prev) => {
      const copy = [...prev];
      copy[i] = !copy[i];
      return copy;
    });
  };

  const submit = () => {
    setShowResult(true);
  };

  const nextLevel = () => {
    if (level < levels.length - 1) {
      setLevel((l) => l + 1);
    } else {
      alert("🎉 All levels completed!");
    }
  };

  return (
    <div className="app">
      <h1>🧠 Pattern Grid Puzzle</h1>
      <h2>Level {level + 1}: {levels[level].name}</h2>

      <div className="grid">
        {Array.from({ length: TOTAL_CELLS }, (_, i) => {
          const shouldFlash = answer[i] && flashOn && flashing;
          const isCorrect = showResult && answer[i];
          const isWrong = showResult && selected[i] && !answer[i];

          return (
            <div
              key={i}
              className={
                "cell " +
                (shouldFlash ? "flash " : "") +
                (selected[i] ? "selected " : "") +
                (isCorrect ? "correct " : "") +
                (isWrong ? "wrong " : "")
              }
              onClick={() => toggleCell(i)}
            />
          );
        })}
      </div>

      {!flashing && !showResult && (
        <button onClick={submit}>Submit Guess</button>
      )}

      {showResult && (
        <div className="result">
          <p>Green = correct | Red = wrong</p>
          <p>Hint: {levels[level].hint}</p>
          <button onClick={nextLevel}>Next Level ▶</button>
        </div>
      )}

      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; font-family: sans-serif; }
        .app {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: #0f172a;
          color: white;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(5, 60px);
          gap: 8px;
          margin: 16px 0;
        }
        .cell {
          width: 60px;
          height: 60px;
          background: #1e293b;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s, transform 0.2s;
        }
        .cell:hover { transform: scale(1.05); }
        .flash { background: #38bdf8; }
        .selected { outline: 2px solid #94a3b8; }
        .correct { background: #22c55e !important; }
        .wrong { background: #ef4444 !important; }
        button {
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          background: #38bdf8;
          font-weight: bold;
        }
        button:hover { opacity: 0.9; }
        .result { text-align: center; }
        @media (max-width: 500px) {
          .grid { grid-template-columns: repeat(5, 48px); }
          .cell { width: 48px; height: 48px; }
        }
      `}</style>
    </div>
  );
}
