import React, { useEffect, useRef, useState } from 'react';
import { create } from 'zustand';
import styled, { keyframes, css } from 'styled-components';

// --- Constants ---
const COURT_W = 600;
const COURT_Z = 800; 
const NET_Z = COURT_Z / 2;
const PLAYER_Z = 750;
const AI_Z = 50;
const BALL_SIZE = 16;
const GRAVITY = 0.25;
const BOUNCE_DAMP = 0.72;

// --- State Management ---
const useStore = create((set, get) => ({
  gameState: 'START',
  score: { player: 0, ai: 0 },
  playerX: COURT_W / 2,
  aiX: COURT_W / 2,
  racketTilt: 0,
  msg: 'READY?',
  ball: { x: COURT_W / 2, y: -100, z: NET_Z, dx: 0, dy: 0, dz: 0, spin: 0 },
  canHit: false,
  shake: false,

  updatePlayer: (x) => {
    const prevX = get().playerX;
    const newX = Math.max(70, Math.min(COURT_W - 70, x));
    set({ playerX: newX, racketTilt: (newX - prevX) * 2.5 });
  },

  triggerShake: () => {
    set({ shake: true });
    setTimeout(() => set({ shake: false }), 150);
  },

  serve: () => {
    const state = get();
    const isPlayerTurn = (state.score.player + state.score.ai) % 2 === 0;
    set({
      gameState: 'PLAYING',
      msg: '',
      ball: {
        x: COURT_W / 2,
        y: -350,
        z: isPlayerTurn ? PLAYER_Z - 80 : AI_Z + 80,
        dx: (Math.random() - 0.5) * 4,
        dy: 1.5,
        dz: isPlayerTurn ? -6 : 6,
        spin: 0
      }
    });
  },

  tick: () => {
    const state = get();
    if (state.gameState !== 'PLAYING') return;

    let { x, y, z, dx, dy, dz, spin } = state.ball;
    const { playerX, aiX, score, racketTilt, triggerShake } = state;

    let nX = x + dx + spin; // Spin influences horizontal path
    let nY = y + dy;
    let nZ = z + dz;
    let nDy = dy + GRAVITY;

    // Floor Interaction
    if (nY > 0) { 
      nY = 0; 
      nDy = -nDy * BOUNCE_DAMP; 
      if (Math.abs(nDy) > 1) triggerShake(); 
    }

    const isNearPlayerZ = nZ > PLAYER_Z - 65 && nZ < PLAYER_Z + 65;
    const isCorrectHeight = nY > -220 && nY < -10;
    set({ canHit: isNearPlayerZ && isCorrectHeight && Math.abs(nX - playerX) < 85 });

    // Net Collision (Minimized & Rare Bounce)
    if (Math.abs(nZ - NET_Z) < 6 && nY > -50) {
      if (Math.random() < 0.15) { // 15% chance to hit net
        const winner = nZ > NET_Z ? 'ai' : 'player';
        const escapeZ = nZ > NET_Z ? NET_Z + 35 : NET_Z - 35;
        triggerShake();
        return set({ 
          gameState: 'START', msg: 'NET!', 
          score: { ...score, [winner]: score[winner] + 1 },
          ball: { ...state.ball, z: escapeZ, dx: 0, dy: 0, dz: 0 } 
        });
      }
    }

    // Player Hit Logic (With Spin)
    if (nZ > PLAYER_Z - 45 && nZ < PLAYER_Z + 45 && Math.abs(nX - playerX) < 80 && nY > -210 && nY < 5) {
      nZ = PLAYER_Z - 46;
      dz = -Math.abs(dz) - 0.5; 
      if (dz < -10) dz = -10; 
      dx = (nX - playerX) * 0.18 + (racketTilt * 0.1); 
      spin = racketTilt * 0.05; // Apply spin based on racket movement
      nDy = -8.5; 
      triggerShake();
    }

    // AI Hit Logic
    if (nZ < AI_Z + 45 && nZ > AI_Z - 45 && Math.abs(nX - aiX) < 80 && nY > -210 && nY < 5) {
      nZ = AI_Z + 46;
      dz = Math.abs(dz) + 0.5;
      dx = (nX - aiX) * 0.18;
      spin = (Math.random() - 0.5) * 0.5; // AI adds random spin
      nDy = -8.5;
      triggerShake();
    }

    // Adaptive AI Tracking
    const aiDifficulty = 0.12 + (score.player * 0.005); // Gets faster as you score
    const nextAiX = aiX + (nX - aiX) * Math.min(aiDifficulty, 0.2);

    // Scoring
    if (nZ > COURT_Z + 250 || nZ < -250 || nX < -200 || nX > COURT_W + 200) {
      const playerWon = (nZ < -50 && nX > 0 && nX < COURT_W) || (nZ > COURT_Z + 50 && (nX < 0 || nX > COURT_W));
      set({
        gameState: 'START',
        msg: playerWon ? 'NICE SHOT!' : 'OUT!',
        score: { player: playerWon ? score.player + 1 : score.player, ai: !playerWon ? score.ai + 1 : score.ai }
      });
      return;
    }

    set({ ball: { x: nX, y: nY, z: nZ, dx, dy: nDy, dz, spin }, aiX: nextAiX });
  }
}));

// --- Styles & Animations ---

const shakeAnim = keyframes`
  0% { transform: translate(1px, 1px) rotate(0deg); }
  20% { transform: translate(-2px, 0px) rotate(-1deg); }
  40% { transform: translate(2px, 1px) rotate(1deg); }
  60% { transform: translate(-1px, -1px) rotate(0deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
`;

const Scene = styled.div`
  width: 100vw; height: 100vh;
  background: radial-gradient(circle at center, #1e293b, #020617);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  overflow: hidden; perspective: 1200px;
  cursor: ${props => props.playing ? 'none' : 'default'};
  ${props => props.shake && css`animation: ${shakeAnim} 0.15s linear infinite;`}
`;

const Court = styled.div`
  width: ${COURT_W}px; height: ${COURT_Z}px;
  background: linear-gradient(#15803d, #166534); border: 12px solid #fff;
  position: relative; transform: rotateX(62deg); transform-style: preserve-3d;
  box-shadow: 0 60px 120px rgba(0,0,0,0.8), inset 0 0 100px rgba(0,0,0,0.2);
`;

const HUD = styled.div`
  position: absolute; top: 5%; color: #fff; text-align: center; pointer-events: none; z-index: 100;
  font-family: 'Arial Black', sans-serif;
  h1 { font-size: 7rem; margin: 0; letter-spacing: -5px; color: #fff; opacity: 0.9; }
  span { font-size: 1.5rem; color: #bef264; letter-spacing: 8px; font-style: italic; }
`;

const Ball = styled.div.attrs(({ pos, active }) => ({
  style: { 
    transform: `translate3d(${pos.x}px, ${pos.z}px, ${-pos.y}px)`,
    background: active ? '#fff' : '#d9f99d',
    boxShadow: active ? '0 0 40px #fff' : 'inset -4px -4px 10px rgba(0,0,0,0.6)'
  }
}))`
  position: absolute; width: ${BALL_SIZE}px; height: ${BALL_SIZE}px;
  border-radius: 50%; z-index: 10; transition: background 0.1s;
  &::after { // Motion trail
    content: ''; position: absolute; inset: 0; border-radius: 50%;
    background: inherit; filter: blur(8px); opacity: 0.4;
  }
`;

const PlayButton = styled.button`
  padding: 28px 90px; font-size: 2.5rem; background: #bef264; border: none; 
  border-radius: 20px; cursor: pointer; font-weight: 900; color: #064e3b;
  box-shadow: 0 12px 0 #14532d; transition: all 0.1s;
  &:hover { background: #d9f99d; transform: scale(1.05); }
  &:active { transform: translateY(8px); box-shadow: 0 4px 0 #14532d; }
`;

const Net = styled.div`
  position: absolute; top: 50%; width: 100%; height: 65px;
  background: 
    repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(255,255,255,0.2) 10px, rgba(255,255,255,0.2) 11px),
    repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(255,255,255,0.2) 10px, rgba(255,255,255,0.2) 11px);
  border-top: 5px solid #fff; transform: rotateX(-90deg); transform-origin: top; z-index: 5;
`;

export default function App() {
  const { gameState, score, playerX, aiX, ball, canHit, racketTilt, shake, updatePlayer, tick, serve, msg } = useStore();
  const requestRef = useRef();

  useEffect(() => {
    const loop = () => { tick(); requestRef.current = requestAnimationFrame(loop); };
    requestRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(requestRef.current);
  }, [tick]);

  return (
    <Scene playing={gameState === 'PLAYING'} shake={shake} onMouseMove={(e) => updatePlayer(e.clientX - (window.innerWidth / 2) + (COURT_W / 2))}>
      <HUD>
        <span>{msg}</span>
        <h1>{score.player} - {score.ai}</h1>
      </HUD>

      {gameState === 'START' && (
        <div style={{ position: 'absolute', zIndex: 200 }}>
          <PlayButton onClick={serve}>START MATCH</PlayButton>
        </div>
      )}

      <Court>
        {/* Markings */}
        <div style={{ position: 'absolute', top: '25%', width: '100%', height: '4px', background: 'rgba(255,255,255,0.3)' }} />
        <div style={{ position: 'absolute', bottom: '25%', width: '100%', height: '4px', background: 'rgba(255,255,255,0.3)' }} />
        <div style={{ position: 'absolute', left: '50%', height: '100%', width: '4px', background: 'rgba(255,255,255,0.3)' }} />
        
        <Net />
        <div style={{ position: 'absolute', width: BALL_SIZE, height: BALL_SIZE, background: 'rgba(0,0,0,0.5)', borderRadius: '50%', filter: 'blur(8px)', transform: `translate3d(${ball.x}px, ${ball.z}px, 0)` }} />
        <Ball pos={ball} active={canHit} />
        
        {/* Rackets */}
        <Racket x={aiX} z={AI_Z} color="#f87171" tilt={0} />
        <Racket x={playerX} z={PLAYER_Z} color="#3b82f6" tilt={racketTilt} />
      </Court>
      <div style={{ color: '#94a3b8', marginTop: '50px', fontWeight: 'bold' }}>
        TILT RACKET TO APPLY SPIN • HITS ADD CAMERA SHAKE
      </div>
    </Scene>
  );
}

const Racket = ({ x, z, color, tilt }) => (
  <div style={{ position: 'absolute', transform: `translate3d(${x - 45}px, ${z}px, 0) rotateY(${tilt}deg) rotateX(-90deg)`, transformStyle: 'preserve-3d', pointerEvents: 'none' }}>
    <div style={{ width: '80px', height: '110px', border: `8px solid ${color}`, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', boxShadow: `0 0 20px ${color}44` }} />
    <div style={{ width: '16px', height: '50px', background: color, margin: '-4px auto', borderRadius: '4px' }} />
  </div>
);