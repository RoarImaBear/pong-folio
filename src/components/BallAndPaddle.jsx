import { useContext, useEffect, useState } from "react";
import HitboxContext, { HitboxContextProvider } from "../context/HitboxContext";

export default function BallAndPaddle({ targetRefs, setScore }) {
  const ballStartTop = 440;
  const ballStartLeft = 174;
  const paddleStartTop = 470;
  const paddleStartLeft = 120;
  const paddleWidth = 100;

  const { hitboxes, setHitboxes } = useContext(HitboxContext);
  const [ballPosition, setBallPosition] = useState({
    left: ballStartLeft,
    top: ballStartTop,
  });
  const [paddlePosition, setPaddlePosition] = useState({
    left: paddleStartLeft,
    top: paddleStartTop,
  });

  const [running, setRunning] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(200);

  let trueBallPosition = { left: ballStartLeft, top: ballStartTop };
  let trueBallVelocity = { dx: 0, dy: 1 };
  let truePaddlePosition = { left: 120, top: paddleStartTop };
  let truePaddleVelocity = 1;

  let paddleLeft = false;
  let paddleRight = false;

  useEffect(() => {
    if (running) {
      const interval = setInterval(() => {
        moveBall();
        if (paddleLeft) moveLeft();
        if (paddleRight) moveRight();
      }, 1000 / gameSpeed);

      return () => clearInterval(interval);
    }
  }, [running]);

  useEffect(() => {
    const paddle = document.getElementById("paddle");
    if (paddle) {
      paddle.addEventListener("keydown", handleKeyDown);
      paddle.addEventListener("keyup", handleKeyUp);
      paddle.tabIndex = 0;
      paddle.focus();
      return () => {
        paddle.removeEventListener("keydown", handleKeyDown);
        paddle.removeEventListener("keyup", handleKeyUp);
      };
    }
  }, [running]);

  const respawn = () => {
    trueBallPosition.left = ballStartLeft;
    trueBallPosition.top = ballStartTop;
    setBallPosition({ left: ballStartLeft, top: ballStartTop });
    truePaddlePosition.left = paddleStartLeft;
    setPaddlePosition({
      left: paddleStartLeft,
      top: paddleStartTop,
    });
    setScore((prev) => prev - 5);
    setGameSpeed((prev) => prev + 20);
  };

  const reset = () => {
    setRunning(false);
    respawn();
  };

  const start = () => {
    console.log("in");
    setRunning(true);
  };

  // Changes ball coordinates using pure JS, checking new coordinates against hitBoxes. Runs at gamespeed. Rerenders handled by react.
  const moveBall = () => {
    trueBallPosition.left += trueBallVelocity.dx;
    trueBallPosition.top += trueBallVelocity.dy;

    let nextTrueLeft = Math.round(trueBallPosition.left + trueBallVelocity.dx);
    let nextTrueTop = Math.round(trueBallPosition.top + trueBallVelocity.dy);

    if (nextTrueTop > paddleStartTop + 20) {
      reset();
    }
    if (trueBallVelocity.dy > 0 && nextTrueTop === paddleStartTop) {
      if (
        nextTrueLeft >= truePaddlePosition.left &&
        nextTrueLeft < truePaddlePosition.left + paddleWidth
      ) {
        let bounceOffset =
          trueBallPosition.left - (truePaddlePosition.left + paddleWidth / 2);
        let newDX = bounceOffset / (paddleWidth / 2);
        let newDY = -Math.sqrt(1 - newDX * newDX);
        trueBallVelocity.dx = newDX;
        trueBallVelocity.dy = newDY;
      }
      setBallPosition({
        left: trueBallPosition.left,
        top: trueBallPosition.top,
      });
      return;
    }
    if (nextTrueTop > paddleStartTop) {
      console.log("death");
    }
    if (hitboxes[nextTrueLeft][nextTrueTop][0]) {
      trueBallVelocity.dy *= -1;
    }
    if (hitboxes[nextTrueLeft][nextTrueTop][1]) {
      trueBallVelocity.dx *= -1;
    }
    if (hitboxes[nextTrueLeft][nextTrueTop][2] !== false) {
      const specificRef =
        targetRefs.current[hitboxes[nextTrueLeft][nextTrueTop][2]];
      specificRef.destroy();
      setScore((prevScore) => prevScore + 1);
    }
    setBallPosition({ left: trueBallPosition.left, top: trueBallPosition.top });
  };

  const handleKeyDown = (event) => {
    if (event.key === "a") {
      paddleLeft = true;
    }
    if (event.key === "d") {
      paddleRight = true;
    }
    if (event.key === " ") {
      start();
    }
  };

  const handleKeyUp = () => {
    paddleLeft = false;
    paddleRight = false;
  };

  const moveLeft = () => {
    const paddle = document.getElementById("paddle");
    const startX = paddle?.offsetLeft;

    if (startX <= 0) {
      truePaddlePosition.left = 0;
      setPaddlePosition({ left: 0 });
    } else {
      truePaddlePosition.left = truePaddlePosition.left - truePaddleVelocity;
      setPaddlePosition({ left: truePaddlePosition.left });
    }
  };

  const moveRight = () => {
    const paddle = document.getElementById("paddle");
    const endX = paddle?.offsetLeft + paddle?.offsetWidth;

    // Hard coded boundaries -- pull the variable out.
    if (endX > 360) {
      truePaddlePosition.left = 360 - 102;
      setPaddlePosition({ left: 360 - 102 });
    } else {
      truePaddlePosition.left = truePaddlePosition.left + truePaddleVelocity;
      setPaddlePosition({ left: truePaddlePosition.left });
    }
  };

  return (
    <div id="arena">
      <div
        id="ball"
        style={{ left: `${ballPosition.left}px`, top: `${ballPosition.top}px` }}
      ></div>
      <div
        id="paddle"
        style={{
          left: `${paddlePosition.left}px`,
          top: `${paddlePosition.top}px`,
        }}
      ></div>
    </div>
  );
}
