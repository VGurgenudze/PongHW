import { Server, Socket } from "socket.io";
import { roomManager } from "./game";

const readyPlayers = new Map<string, boolean>();

export function handleSocketConnection(io: Server, socket: Socket) {
  const roomId = roomManager.assignPlayerToRoom(socket.id);
  socket.join(roomId);

  const room = roomManager.getRoom(roomId);

  if (room?.players.length === 1) {
    socket.emit("waiting");
  } else if (room?.players.length === 2) {
    io.to(roomId).emit("gameReady");
  }

  socket.on("paddleMove", (direction: "up" | "down") => {
    roomManager.handleInput(roomId, socket.id, direction);
  });

  socket.on("startGame", () => {
    readyPlayers.set(socket.id, true);
    const room = roomManager.getRoom(roomId);
    const bothReady =
      room?.players.length === 2 &&
      room.players.every((p) => readyPlayers.get(p.id));

    if (bothReady) {
      roomManager.startGame(roomId);
      io.to(roomId).emit("gameStarted");
    }
  });

  socket.on("disconnect", () => {
    console.log(`Player disconnected: ${socket.id}`);
    roomManager.removePlayer(socket.id);
    readyPlayers.delete(socket.id);
    io.to(roomId).emit("gameOver", "Other player disconnected");
  });
}
