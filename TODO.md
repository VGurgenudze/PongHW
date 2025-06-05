Game Logic
Define GameState type and share between frontend and backend

Handle paddle movement, ball physics, collisions, scoring

Implement win condition (first to 5 points)

Clear game on player disconnect

Backend
Set up Express and Socket.IO server

Assign players to rooms

Start game when both players submit "start"

Manage game loop with ball movement and collision detection

Handle disconnection and notify clients

Frontend
Create canvas for game rendering

Add keydown listeners for paddle control

Add start button that enables after both players are present

Show waiting message

Display endgame message and reset UI

Dev Tools
Vite for frontend dev server

ts-node-dev for live reload on backend

Shared types folder

CORS and .env support