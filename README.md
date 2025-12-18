# 🧠 Pattern Grid Puzzle Game

A game-like puzzle built with **React + TypeScript** where users observe flashing patterns
on a 5×5 grid and attempt to decode the underlying logic.

Each level introduces a new hidden rule that determines which cells flash.

---

## 🎯 Features
- 5×5 interactive grid
- Timed flashing animation using JS + CSS
- Multiple logical pattern-based levels
- User selection & validation
- Visual feedback for correct / incorrect guesses
- Responsive UI
- Clean and modular React code

---

## 🧩 Levels Implemented
1. **Even Indices** – cells where `index % 2 === 0`
2. **Diagonals** – main & anti-diagonal
3. **Prime Numbers** – prime index positions
4. **Center Cluster** – center cell + 4 neighbors
5. **(row + col) % 3 === 0**

---

## 🛠️ Tech Stack
- React (Functional Components + Hooks)
- TypeScript
- CSS (no UI or animation libraries)

---

## ▶️ How to Run Locally
```bash
npm create vite@latest pattern-grid -- --template react-ts
cd pattern-grid
npm install
npm run dev
Replace src/App.tsx with the code in the canvas.
