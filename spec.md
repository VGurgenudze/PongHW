🔥 Overview
This project is a browser-based real-time multiplayer Pong game. It uses WebSockets to synchronize game state (ball, paddles, score) between two connected players. A Node.js server handles game logic, session management, and communication via Socket.IO. The client is built using React and renders the game using the <canvas> API.

🎯 Objectives
Allow two players to connect to a shared game room.

Wait until both players press "Start" before the game begins.

Synchronize paddle and ball movement at 60 FPS.

Display score and end the game when one player reaches 5 points.

Reset or reload game after game over or disconnect.

🧱 Architecture
Backend (Node.js + TypeScript)
Express HTTP Server

Serves as base for WebSocket transport.

Responds with a health check route.

Socket.IO WebSocket Server

Accepts real-time connections.

Automatically pairs players into rooms.

Manages paddle input, ball physics, scoring, and game start triggers.

Game Loop

Runs with setInterval at 60 FPS.

Updates ball position, detects collisions, tracks scores.

Emits game state to both players.

Room Manager

Dynamically creates rooms as players connect.

Deletes room and stops game loop on disconnect or game end.

Frontend (React + TypeScript)
Socket.IO Client

Connects to backend WebSocket server.

Emits paddle input and receives game state updates.

Canvas Renderer

Draws background, paddles, ball, and score.

Displays "Waiting", "Game Over", and "Start" UI states.

UI State Management

Tracks connection, readiness, start status, and win/loss outcomes.

📦 Data Structures
GameState
ts
Copy
Edit
type GameState = {
  ball: { x: number; y: number };
  paddles: { leftY: number; rightY: number };
  score: { left: number; right: number };
};
Player
ts
Copy
Edit
type Player = {
  id: string;
  paddleY: number;
};
🔁 Game Flow
Player connects → assigned to room.

If only 1 player: emits waiting.

When 2 players connect: emits ready to both.

Each must emit startGame to begin.

Game loop starts when both are ready.

Real-time updates:

Ball and paddle positions

Score

Game over when score = 5

Emits gameOver with winner ID

Server clears interval and deletes room.

🕹 Controls
ArrowUp → Paddle moves up

ArrowDown → Paddle moves down

Start Game button → Initiates game when both players are ready

📂 File Breakdown
Backend

src/server.ts – Express and Socket.IO server entry

src/game.ts – Game logic, room management

src/events.ts – Socket.IO event handlers

Frontend

src/GameCanvas.tsx – Renders game and handles keyboard input

src/socket.ts – Configures socket connection

src/App.tsx – Main entry and container

Shared

shared/types.ts – Shared types between frontend and backend

🔧 Future Improvements
Add player names or avatars

Support mobile controls

Track high scores

Implement chat per room

Add game restart button post-game-over