import React, { useEffect, useRef } from 'react';
import { create } from 'zustand';
import styled from 'styled-components';

// --- Configuration & Constants ---
const COURT_W = 600;
const COURT_Z = 800; 
const NET_Z = COURT_Z / 2;
const PLAYER_Z = 750;
const AI_Z = 50;
const BALL_SIZE = 14;
const GRAVITY = 0.22;
const BOUNCE_DAMP = 0.72;

// --- State Management (Zustand) ---
const useStore = create((set, get) => ({
  gameState: 'START', // START, PLAYING, POINT_SCORED
  score: { player: 0, ai: 0 },
  playerX: COURT_W / 2,
  aiX: COURT_W / 2,
  racketTilt: 0,
  msg: 'READY?',
  ball: { x: COURT_W / 2, y: -100, z: NET_Z, dx: 0, dy: 0, dz: 0 },

  updatePlayer: (x) => {
    const prevX = get().playerX;
    const newX = Math.max(60, Math.min(COURT_W - 60, x));
    // Calculate tilt based on mouse velocity for "swing" effect
    set({ playerX: newX, racketTilt: (newX - prevX) * 2.8 });
  },

  serve: () => {
    const isPlayerTurn = (get().score.player + get().score.ai) % 2 === 0;
    set({
      gameState: 'PLAYING',
      msg: '',
      ball: {
        x: COURT_W / 2,
        y: -350,
        z: isPlayerTurn ? PLAYER_Z - 40 : AI_Z + 40,
        dx: (Math.random() - 0.5) * 5,
        dy: 1,
        dz: isPlayerTurn ? -7.8 : 7.8,
      }
    });
  },

  tick: () => {
    const state = get();
    if (state.gameState !== 'PLAYING') return;

    let { x, y, z, dx, dy, dz } = state.ball;
    const { playerX, aiX, score, racketTilt } = state;

    // 1. Core Physics
    let nX = x + dx;
    let nY = y + dy;
    let nZ = z + dz;
    let nDy = dy + GRAVITY;

    // 2. Floor Bounce
    if (nY > 0) { 
      nY = 0; 
      nDy = -nDy * BOUNCE_DAMP; 
    }

    // 3. Net Collision (Depth + Height Check)
    if (Math.abs(nZ - NET_Z) < 10 && nY > -55) {
      const winner = nZ > NET_Z ? 'ai' : 'player';
      return set({ 
        gameState: 'START', 
        msg: 'NET!', 
        score: { ...score, [winner]: score[winner] + 1 } 
      });
    }

    // 4. Player Racket Collision (The "Strike Zone")
    // Z-proximity, X-alignment, and Y-height (cannot hit if too high)
    const inHitZone = nZ > PLAYER_Z - 15 && nZ < PLAYER_Z + 15;
    const isAligned = Math.abs(nX - playerX) < 55;
    const isHittableHeight = nY > -140 && nY < -10;

    if (inHitZone && isAligned && isHittableHeight) {
      nZ = PLAYER_Z - 16;
      dz = -Math.abs(dz) - 0.4; // Reverse depth and speed up
      dx = (nX - playerX) * 0.2 + (racketTilt * 0.12); // Directing via swing
      nDy = -7.5; // Arc ball back up
    }

    // 5. AI Racket Collision
    if (nZ < AI_Z + 15 && nZ > AI_Z - 15 && Math.abs(nX - aiX) < 55 && nY > -140) {
      nZ = AI_Z + 16;
      dz = Math.abs(dz) + 0.4;
      dx = (nX - aiX) * 0.2;
      nDy = -7.5;
    }

    // 6. AI Smooth Tracking
    const nextAiX = aiX + (nX - aiX) * 0.11;

    // 7. Scoring & Out-of-Bounds
    if (nZ > COURT_Z + 120 || nZ < -120 || nX < -80 || nX > COURT_W + 80) {
      const playerWon = nZ < -50 && nX > 0 && nX < COURT_W;
      set({
        gameState: 'START',
        msg: playerWon ? 'POINT!' : 'OUT!',
        score: { 
          player: playerWon ? score.player + 1 : score.player, 
          ai: !playerWon ? score.ai + 1 : score.ai 
        }
      });
      return;
    }

    set({ ball: { x: nX, y: nY, z: nZ, dx, dy: nDy, dz }, aiX: nextAiX });
  }
}));

// --- Styles ---
const Scene = styled.div`
  width: 100vw; height: 100vh;
  background: #020617;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  overflow: hidden; perspective: 1200px;
  font-family: 'Inter', system-ui, sans-serif;
`;

const Court = styled.div`
  width: ${COURT_W}px; height: ${COURT_Z}px;
  background: #166534; border: 12px solid #f8fafc;
  position: relative; transform: rotateX(62deg); transform-style: preserve-3d;
  box-shadow: 0 50px 100px rgba(0,0,0,0.8);
`;

const Net = styled.div`
  position: absolute; top: 50%; width: 100%; height: 60px;
  background: repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(255,255,255,0.1) 4px, rgba(255,255,255,0.1) 5px);
  border-top: 4px solid #fff; transform: rotateX(-90deg); transform-origin: top; z-index: 5;
`;

const Ball = styled.div.attrs(({ pos }) => ({
  style: { transform: `translate3d(${pos.x}px, ${pos.z}px, ${-pos.y}px)` }
}))`
  position: absolute; width: ${BALL_SIZE}px; height: ${BALL_SIZE}px;
  background: #bef264; border-radius: 50%; box-shadow: inset -3px -3px 6px rgba(0,0,0,0.4); z-index: 10;
`;

const Shadow = styled.div.attrs(({ pos }) => ({
  style: { 
    transform: `translate3d(${pos.x}px, ${pos.z}px, 0px) scale(${1 - Math.abs(pos.y)/400})`,
    opacity: 0.5 - (Math.abs(pos.y)/900)
  }
}))`
  position: absolute; width: ${BALL_SIZE}px; height: ${BALL_SIZE}px;
  background: rgba(0,0,0,0.6); border-radius: 50%; filter: blur(4px);
`;

// --- Racket Component ---
const RacketAsset = ({ isAI, x, z, tilt }) => (
  <RacketContainer style={{ transform: `translate3d(${x - 40}px, ${z}px, 0px) rotateY(${tilt}deg) rotateX(-90deg)` }}>
    <div className="head" style={{ borderColor: isAI ? '#ef4444' : '#3b82f6' }}>
      <div className="strings" />
    </div>
    <div className="handle" style={{ background: isAI ? '#ef4444' : '#3b82f6' }} />
  </RacketContainer>
);

const RacketContainer = styled.div`
  position: absolute; width: 80px; height: 120px;
  transform-style: preserve-3d; transition: transform 0.04s linear;
  display: flex; flex-direction: column; align-items: center;

  .head {
    width: 55px; height: 75px; border: 5px solid; border-radius: 50%;
    background: rgba(255,255,255,0.05); position: relative;
  }
  .strings {
    position: absolute; inset: 0;
    background: repeating-linear-gradient(90deg, transparent, transparent 7px, rgba(255,255,255,0.1) 7px, rgba(255,255,255,0.1) 8px),
                repeating-linear-gradient(0deg, transparent, transparent 7px, rgba(255,255,255,0.1) 7px, rgba(255,255,255,0.1) 8px);
  }
  .handle { width: 10px; height: 45px; border-radius: 2px; }
`;

const HUD = styled.div`
  position: absolute; top: 40px; color: #fff; text-align: center; pointer-events: none;
  h1 { font-size: 5rem; margin: 0; font-weight: 900; letter-spacing: -2px; }
  span { font-size: 1.5rem; color: #bef264; font-weight: bold; text-transform: uppercase; letter-spacing: 5px; }
`;

export default function App() {
  const { gameState, score, playerX, aiX, ball, racketTilt, updatePlayer, tick, serve, msg } = useStore();
  const requestRef = useRef();

  useEffect(() => {
    const loop = () => { tick(); requestRef.current = requestAnimationFrame(loop); };
    requestRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(requestRef.current);
  }, [tick]);

  return (
    <Scene onMouseMove={(e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      updatePlayer(e.clientX - rect.left);
    }}>
      <HUD>
        <span>{msg}</span>
        <h1>{score.player} — {score.ai}</h1>
      </HUD>

      <Court>
        {/* Court Markings */}
        <div style={{ position: 'absolute', top: '25%', width: '100%', height: '4px', background: 'rgba(255,255,255,0.3)' }} />
        <div style={{ position: 'absolute', bottom: '25%', width: '100%', height: '4px', background: 'rgba(255,255,255,0.3)' }} />
        <div style={{ position: 'absolute', left: '50%', top: '25%', bottom: '25%', width: '4px', background: 'rgba(255,255,255,0.3)' }} />
        
        <Net />
        <Shadow pos={ball} />
        <Ball pos={ball} />
        
        <RacketAsset isAI x={aiX} z={AI_Z} tilt={0} />
        <RacketAsset x={playerX} z={PLAYER_Z} tilt={racketTilt} />

        {gameState === 'START' && (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotateX(-62deg)', zIndex: 100 }}>
            <button onClick={serve} style={{ 
              padding: '16px 48px', fontSize: '1.5rem', background: '#bef264', border: 'none', 
              borderRadius: '8px', cursor: 'pointer', fontWeight: '900', boxShadow: '0 8px 0 #65a30d' 
            }}>
              SERVE
            </button>
          </div>
        )}
      </Court>
      <div style={{ color: 'white', marginTop: '60px', opacity: 0.4 }}>
        Move mouse to swing • Time your strike as the ball drops
      </div>
    </Scene>
  );
}