# Multiplayer Pong Game

A real-time multiplayer Pong game built using **React**, **TypeScript**, **Socket.IO**, and **Node.js**. Two players are automatically matched into rooms. Each must press "Start" to begin, and the first to reach 5 points wins.

---

## Features

- Real-time two-player gameplay
- Auto room pairing
- "Start Game" button (both players must start)
- Keyboard controls for paddles
- Score tracking and win logic
- Game over handling and auto-reset

---

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Backend:** Node.js, Express, TypeScript
- **WebSockets:** Socket.IO
- **Dev Tools:** ts-node-dev, concurrently

---

## Project Structure

multiplayer-pong/
├── backend/
│ ├── src/
│ │ ├── server.ts # Main backend server
│ │ ├── game.ts # Game logic and room manager
│ │ ├── events.ts # Socket event handlers
│ ├── package.json
│ └── tsconfig.json
│
├── frontend/
│ ├── src/
│ │ ├── App.tsx # Main React app
│ │ ├── GameCanvas.tsx # Canvas for drawing game
│ │ ├── socket.ts # Socket.IO client setup
│ │ └── shared/
│ │ └── types.ts # Shared game state types
│ ├── index.tsx
│ ├── vite.config.ts
│ └── package.json
│
├── shared/
│ └── types.ts # (Optional) shared types between frontend and backend
└── README.md

yaml
Copy
Edit

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/multiplayer-pong.git
cd multiplayer-pong
2. Install Dependencies
Backend:

bash
Copy
Edit
cd backend
npm install
Frontend:

bash
Copy
Edit
cd ../frontend
npm install
3. Start the App
Backend:

bash
Copy
Edit
cd backend
npm run dev
Frontend:

bash
Copy
Edit
cd ../frontend
npm run dev
How to Play
Open http://localhost:5173 in two browser windows (or devices).

Wait until both players connect.

Press Start Game on both screens.

Use ↑ (Arrow Up) and ↓ (Arrow Down) to control your paddle.

First to score 5 points wins.

If a player disconnects, the game ends automatically.

Game Controls
Arrow Up – Move paddle up

Arrow Down – Move paddle down

Notes
Ensure CORS is configured to allow frontend to connect to backend.

Room ID is auto-generated and pairing is based on connection order.

Score, paddle positions, and ball state are all synchronized via WebSocket