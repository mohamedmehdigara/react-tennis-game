import React, { useEffect, useRef } from 'react';
import { create } from 'zustand';
import styled from 'styled-components';

// --- Constants ---
const COURT_W = 600;
const COURT_Z = 800; 
const NET_Z = COURT_Z / 2;
const PLAYER_Z = 750;
const AI_Z = 50;
const BALL_SIZE = 16;
const GRAVITY = 0.26;
const BOUNCE_DAMP = 0.68;

const useStore = create((set, get) => ({
  gameState: 'START',
  score: { player: 0, ai: 0 },
  playerX: COURT_W / 2,
  aiX: COURT_W / 2,
  racketTilt: 0,
  msg: 'READY?',
  ball: { x: COURT_W / 2, y: -100, z: NET_Z, dx: 0, dy: 0, dz: 0 },
  canHit: false,

  updatePlayer: (x) => {
    const prevX = get().playerX;
    const newX = Math.max(70, Math.min(COURT_W - 70, x));
    set({ playerX: newX, racketTilt: (newX - prevX) * 2.2 });
  },

  serve: () => {
    const state = get();
    const isPlayerTurn = (state.score.player + state.score.ai) % 2 === 0;
    set({
      gameState: 'PLAYING',
      msg: '',
      ball: {
        x: COURT_W / 2,
        y: -320,
        z: isPlayerTurn ? PLAYER_Z - 70 : AI_Z + 70,
        dx: (Math.random() - 0.5) * 4,
        dy: 1.5,
        dz: isPlayerTurn ? -6.5 : 6.5,
      }
    });
  },

  tick: () => {
    const state = get();
    if (state.gameState !== 'PLAYING') return;

    let { x, y, z, dx, dy, dz } = state.ball;
    const { playerX, aiX, score, racketTilt } = state;

    let nX = x + dx;
    let nY = y + dy;
    let nZ = z + dz;
    let nDy = dy + GRAVITY;

    if (nY > 0) { nY = 0; nDy = -nDy * BOUNCE_DAMP; }

    const isNearPlayerZ = nZ > PLAYER_Z - 65 && nZ < PLAYER_Z + 65;
    const isCorrectHeight = nY > -220 && nY < -5;
    set({ canHit: isNearPlayerZ && isCorrectHeight && Math.abs(nX - playerX) < 80 });

    // --- ENHANCED NET LOGIC: MINIMIZED & RARE BOUNCE ---
    // Reduced hitbox to 6px. Added 80% chance to pass through (clipping).
    if (Math.abs(nZ - NET_Z) < 6 && nY > -45) {
      const rareHit = Math.random() < 0.2; // Only 20% of hits actually stop the ball
      
      if (rareHit) {
        const winner = nZ > NET_Z ? 'ai' : 'player';
        // Force escape from net plane
        const escapeZ = nZ > NET_Z ? NET_Z + 30 : NET_Z - 30;
        
        return set({ 
          gameState: 'START', 
          msg: 'NET!', 
          score: { ...score, [winner]: score[winner] + 1 },
          ball: { x: nX, y: nY, z: escapeZ, dx: 0, dy: 0, dz: 0 } 
        });
      }
    }

    // Player Racket
    if (nZ > PLAYER_Z - 45 && nZ < PLAYER_Z + 45 && Math.abs(nX - playerX) < 75 && nY > -210 && nY < 5) {
      nZ = PLAYER_Z - 46;
      dz = -Math.abs(dz) - 0.45; 
      if (dz < -8.5) dz = -8.5; 
      dx = (nX - playerX) * 0.16 + (racketTilt * 0.08); 
      nDy = -8.2; 
    }

    // AI Racket
    if (nZ < AI_Z + 45 && nZ > AI_Z - 45 && Math.abs(nX - aiX) < 75 && nY > -210 && nY < 5) {
      nZ = AI_Z + 46;
      dz = Math.abs(dz) + 0.45;
      if (dz > 8.5) dz = 8.5; 
      dx = (nX - aiX) * 0.16;
      nDy = -8.2;
    }

    const nextAiX = aiX + (nX - aiX) * 0.14;

    if (nZ > COURT_Z + 220 || nZ < -220 || nX < -180 || nX > COURT_W + 180) {
      const playerWon = (nZ < -50 && nX > 0 && nX < COURT_W) || (nZ > COURT_Z + 50 && (nX < 0 || nX > COURT_W));
      set({
        gameState: 'START',
        msg: playerWon ? 'POINT!' : 'OUT!',
        score: { player: playerWon ? score.player + 1 : score.player, ai: !playerWon ? score.ai + 1 : score.ai }
      });
      return;
    }

    set({ ball: { x: nX, y: nY, z: nZ, dx, dy: nDy, dz }, aiX: nextAiX });
  }
}));

const Scene = styled.div`
  width: 100vw; height: 100vh;
  background: radial-gradient(circle at center, #1e293b, #020617);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  overflow: hidden; perspective: 1200px;
  cursor: ${props => props.playing ? 'none' : 'default'};
`;

const HUD = styled.div`
  position: absolute; top: 40px; color: #fff; text-align: center; pointer-events: none; z-index: 100;
  h1 { font-size: 6rem; margin: 0; font-weight: 900; letter-spacing: -4px; }
  span { font-size: 1.5rem; color: #bef264; font-weight: bold; text-transform: uppercase; letter-spacing: 5px; }
`;

const StartOverlay = styled.div`
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  z-index: 200; background: ${props => props.visible ? 'rgba(0,0,0,0.5)' : 'transparent'};
  pointer-events: ${props => props.visible ? 'all' : 'none'};
`;

const PlayButton = styled.button`
  padding: 26px 85px; font-size: 2.5rem; background: #bef264; border: none; 
  border-radius: 18px; cursor: pointer; font-weight: 900; color: #064e3b;
  box-shadow: 0 12px 0 #14532d; transition: transform 0.1s;
  &:active { transform: translateY(8px); box-shadow: 0 4px 0 #14532d; }
`;

const Court = styled.div`
  width: ${COURT_W}px; height: ${COURT_Z}px;
  background: #15803d; border: 12px solid #fff;
  position: relative; transform: rotateX(62deg); transform-style: preserve-3d;
  box-shadow: 0 60px 120px rgba(0,0,0,0.8);
`;

const Net = styled.div`
  position: absolute; top: 50%; width: 100%; height: 60px; // Slightly lower net visual
  background: repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(255,255,255,0.1) 4px, rgba(255,255,255,0.1) 5px);
  border-top: 4px solid #fff; transform: rotateX(-90deg); transform-origin: top; z-index: 5;
`;

const Ball = styled.div.attrs(({ pos, active }) => ({
  style: { 
    transform: `translate3d(${pos.x}px, ${pos.z}px, ${-pos.y}px)`,
    background: active ? '#fff' : '#d9f99d',
    boxShadow: active ? '0 0 35px #fff' : 'inset -4px -4px 8px rgba(0,0,0,0.5)'
  }
}))`
  position: absolute; width: ${BALL_SIZE}px; height: ${BALL_SIZE}px;
  border-radius: 50%; z-index: 10;
`;

const Shadow = styled.div.attrs(({ pos }) => ({
  style: { 
    transform: `translate3d(${pos.x}px, ${pos.z}px, 0px) scale(${1 - Math.abs(pos.y)/450})`,
    opacity: 0.7 - (Math.abs(pos.y)/1000)
  }
}))`
  position: absolute; width: ${BALL_SIZE}px; height: ${BALL_SIZE}px;
  background: rgba(0,0,0,0.8); border-radius: 50%; filter: blur(6px);
`;

const RacketAsset = ({ isAI, x, z, tilt }) => (
  <div style={{ position: 'absolute', transform: `translate3d(${x - 45}px, ${z}px, 0px) rotateY(${tilt}deg) rotateX(-90deg)`, pointerEvents: 'none' }}>
    <div style={{ width: '75px', height: '105px', border: `8px solid ${isAI ? '#f87171' : '#3b82f6'}`, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
    <div style={{ width: '15px', height: '45px', background: isAI ? '#f87171' : '#3b82f6', margin: '-3px auto', borderRadius: '3px' }} />
  </div>
);

export default function App() {
  const { gameState, score, playerX, aiX, ball, canHit, racketTilt, updatePlayer, tick, serve, msg } = useStore();
  const requestRef = useRef();

  useEffect(() => {
    const loop = () => { tick(); requestRef.current = requestAnimationFrame(loop); };
    requestRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(requestRef.current);
  }, [tick]);

  const handleMouseMove = (e) => {
    const x = e.clientX - (window.innerWidth / 2) + (COURT_W / 2);
    updatePlayer(x);
  };

  return (
    <Scene playing={gameState === 'PLAYING'} onMouseMove={handleMouseMove}>
      <HUD>
        <span>{msg}</span>
        <h1>{score.player} — {score.ai}</h1>
      </HUD>
      <StartOverlay visible={gameState === 'START'}>
        <PlayButton onClick={serve}>START MATCH</PlayButton>
      </StartOverlay>
      <Court>
        <div style={{ position: 'absolute', top: '25%', width: '100%', height: '4px', background: 'rgba(255,255,255,0.4)' }} />
        <div style={{ position: 'absolute', bottom: '25%', width: '100%', height: '4px', background: 'rgba(255,255,255,0.4)' }} />
        <div style={{ position: 'absolute', left: '50%', top: '25%', bottom: '25%', width: '4px', background: 'rgba(255,255,255,0.4)' }} />
        <Net />
        <Shadow pos={ball} />
        <Ball pos={ball} active={canHit} />
        <RacketAsset isAI x={aiX} z={AI_Z} tilt={0} />
        <RacketAsset x={playerX} z={PLAYER_Z} tilt={racketTilt} />
      </Court>
    </Scene>
  );
}