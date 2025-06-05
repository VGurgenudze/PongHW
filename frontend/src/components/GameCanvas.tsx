import { useEffect, useRef, useState } from "react";
import { socket } from "../socket";
import type { GameState } from "../shared/types";

export const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gameState = useRef<GameState | null>(null);

  const [waiting, setWaiting] = useState(true);
  const [ready, setReady] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    socket.on("gameState", (state: GameState) => {
      gameState.current = state;
      draw(state);
    });

    socket.on("waiting", () => setWaiting(true));

    socket.on("gameReady", () => {
      setWaiting(false);
      setReady(true);
    });

    socket.on("gameStarted", () => {
      setGameStarted(true);
    });

    socket.on("gameOver", ({ winner }: { winner: string }) => {
      alert(winner === socket.id ? "🎉 You Win!" : "😞 You Lose!");
      window.location.reload();
    });

    return () => {
      socket.off("gameState");
      socket.off("waiting");
      socket.off("gameReady");
      socket.off("gameStarted");
      socket.off("gameOver");
    };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!gameStarted) return;
      if (e.key === "ArrowUp") socket.emit("paddleMove", "up");
      if (e.key === "ArrowDown") socket.emit("paddleMove", "down");
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [gameStarted]);

  const draw = (state: GameState) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Ball
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(state.ball.x, state.ball.y, 10, 0, Math.PI * 2);
    ctx.fill();

    // Paddles
    ctx.fillRect(10, state.paddles.leftY, 10, 100);
    ctx.fillRect(580, state.paddles.rightY, 10, 100);

    // Score
    ctx.font = "24px Arial";
    ctx.fillText(`${state.score.left} : ${state.score.right}`, 270, 30);
  };

  const handleStart = () => {
    socket.emit("startGame");
  };

  return (
    <div style={{ textAlign: "center", color: "white" }}>
      {waiting && <p>Waiting for another player to join...</p>}
      {!gameStarted && ready && (
        <button onClick={handleStart} style={{ marginBottom: "1rem" }}>
          Start Game
        </button>
      )}
      {gameStarted && (
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          style={{ border: "2px solid white" }}
        />
      )}
    </div>
  );
};
