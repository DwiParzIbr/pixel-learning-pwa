'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CharacterDef, CharacterEmotion, EnvironmentType, ObjectType, SceneDef } from '@/types/story';
import { soundEngine } from '@/lib/audio/soundEngine';
import { Sparkles, Hand } from 'lucide-react';

interface PixelCanvasProps {
  currentScene: SceneDef;
  characters: CharacterDef[];
  isPaused: boolean;
  onSceneAnimationComplete?: () => void;
  onObjectCounted?: (count: number) => void;
  interactiveCountMode?: boolean;
}

interface ActiveCharacter {
  id: string;
  name: string;
  asset: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  emotion: CharacterEmotion;
  animFrame: number;
  direction: 'left' | 'right';
  speechBubble?: string;
}

interface ActiveObjectItem {
  id: string;
  type: ObjectType;
  owner?: string;
  x: number;
  y: number;
  targetX?: number;
  targetY?: number;
  arcProgress?: number;
  isTransferring?: boolean;
  colorIdx: number;
  isCounted?: boolean;
  countedNumber?: number;
  isHighlighted?: boolean;
}

export const PixelCanvas: React.FC<PixelCanvasProps> = ({
  currentScene,
  characters,
  isPaused,
  onSceneAnimationComplete,
  onObjectCounted,
  interactiveCountMode = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeChars, setActiveChars] = useState<Map<string, ActiveCharacter>>(new Map());
  const [activeObjects, setActiveObjects] = useState<ActiveObjectItem[]>([]);
  const [countedTotal, setCountedTotal] = useState<number>(0);
  const animFrameRef = useRef<number | null>(null);

  // Initialize or update scene actions
  useEffect(() => {
    const chars = new Map<string, ActiveCharacter>();
    let objects: ActiveObjectItem[] = [];

    // Parse and apply actions
    for (const act of currentScene.actions) {
      if (act.type === 'spawn_character' && act.characterId) {
        const charDef = characters.find(c => c.id === act.characterId);
        const posX = act.position?.x ?? 200;
        const posY = act.position?.y ?? 310;
        chars.set(act.characterId, {
          id: act.characterId,
          name: charDef?.name || act.characterId,
          asset: charDef?.asset || 'character_budi',
          x: posX,
          y: posY,
          targetX: posX,
          targetY: posY,
          emotion: act.animation || 'idle',
          animFrame: 0,
          direction: posX > 400 ? 'left' : 'right',
        });
      }

      if (act.type === 'spawn_object' && act.object && act.quantity) {
        const startX = act.position?.x ?? (act.owner === 'siti' ? 500 : 250);
        const startY = act.position?.y ?? 340;
        for (let i = 0; i < act.quantity; i++) {
          const row = Math.floor(i / 5);
          const col = i % 5;
          objects.push({
            id: `obj_${act.object}_${act.owner || 'neutral'}_${i}`,
            type: act.object,
            owner: act.owner,
            x: startX + col * 26 + (row % 2) * 10,
            y: startY + row * 22,
            colorIdx: i % 5,
            isHighlighted: false,
          });
        }
      }
    }

    // Process movements / animations / transfers
    for (const act of currentScene.actions) {
      if (act.type === 'move_character' && act.characterId) {
        const c = chars.get(act.characterId);
        if (c && act.position) {
          c.targetX = act.position.x;
          c.targetY = act.position.y;
          c.emotion = 'walk';
          c.direction = act.position.x >= c.x ? 'right' : 'left';
        }
      }

      if (act.type === 'animate_character' && act.characterId && act.animation) {
        const c = chars.get(act.characterId);
        if (c) {
          c.emotion = act.animation;
        }
      }

      if (act.type === 'highlight_object') {
        objects = objects.map(o => {
          if (!act.owner || o.owner === act.owner) {
            return { ...o, isHighlighted: true };
          }
          return o;
        });
      }

      if (act.type === 'transfer_object' && act.from && act.to && act.quantity) {
        let transferred = 0;
        const targetBaseX = act.to === 'siti' ? 520 : 240;
        const targetBaseY = 340;

        objects = objects.map(o => {
          if (o.owner === act.from && transferred < (act.quantity || 0)) {
            const row = Math.floor(transferred / 5);
            const col = transferred % 5;
            transferred++;
            return {
              ...o,
              owner: act.to,
              targetX: targetBaseX + col * 26,
              targetY: targetBaseY + row * 22,
              isTransferring: true,
              arcProgress: 0,
            };
          }
          return o;
        });
        soundEngine.playSfx('transfer');
      }
    }

    if (currentScene.dialogue) {
      const spk = chars.get(currentScene.dialogue.speaker);
      if (spk) {
        spk.speechBubble = currentScene.dialogue.text;
        spk.emotion = 'talk';
      }
    }

    setActiveChars(chars);
    setActiveObjects(objects);
    setCountedTotal(0);

    const timer = setTimeout(() => {
      onSceneAnimationComplete?.();
    }, 2500);

    return () => clearTimeout(timer);
  }, [currentScene, characters]);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let tick = 0;

    const render = () => {
      if (!isPaused) {
        tick++;
      }

      const width = canvas.width;
      const height = canvas.height;

      // Keep pixel crispness for the story world inside the canvas
      ctx.imageSmoothingEnabled = false;

      // 1. Draw Background Environment
      drawEnvironment(ctx, width, height, currentScene.background, tick);

      // 2. Update & Draw Interactive Objects
      setActiveObjects(prevObjects => {
        return prevObjects.map(obj => {
          let updated = { ...obj };
          if (obj.isTransferring && obj.targetX !== undefined && obj.targetY !== undefined) {
            const currentP = obj.arcProgress || 0;
            const newP = Math.min(1, currentP + 0.025);
            updated.arcProgress = newP;

            // Parabolic arc interpolation
            const dx = obj.targetX - obj.x;
            const dy = obj.targetY - obj.y;
            const currentX = obj.x + dx * (newP - currentP);
            const currentY = obj.y + dy * (newP - currentP);
            const arcHeight = Math.sin(newP * Math.PI) * 60;

            drawPixelObject(ctx, obj.type, currentX, currentY - arcHeight, obj.colorIdx, obj.isHighlighted, obj.countedNumber, tick);

            if (newP >= 1) {
              updated.isTransferring = false;
              updated.x = obj.targetX;
              updated.y = obj.targetY;
            }
          } else {
            drawPixelObject(ctx, obj.type, obj.x, obj.y, obj.colorIdx, obj.isHighlighted, obj.countedNumber, tick);
          }
          return updated;
        });
      });

      // 3. Update & Draw Characters
      activeChars.forEach(char => {
        if (char.x !== char.targetX || char.y !== char.targetY) {
          const dx = char.targetX - char.x;
          char.x += Math.sign(dx) * Math.min(Math.abs(dx), 3);
          if (Math.abs(char.targetX - char.x) < 3) {
            char.x = char.targetX;
            char.emotion = 'idle';
          }
        }

        drawPixelCharacter(ctx, char, tick);

        if (char.speechBubble) {
          drawSpeechBubble(ctx, char.x, char.y - 75, char.speechBubble);
        }
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [currentScene, isPaused, activeChars]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    setActiveObjects(prev => {
      let newlyCounted = false;
      let nextTotal = countedTotal;
      const updated = prev.map(obj => {
        const dist = Math.hypot(obj.x - clickX, obj.y - clickY);
        if (dist < 26 && !obj.isCounted) {
          newlyCounted = true;
          nextTotal++;
          soundEngine.playSfx('count');
          return {
            ...obj,
            isCounted: true,
            countedNumber: nextTotal,
            isHighlighted: true,
          };
        }
        return obj;
      });

      if (newlyCounted) {
        setCountedTotal(nextTotal);
        onObjectCounted?.(nextTotal);
      }
      return updated;
    });
  };

  return (
    <div className="relative w-full flex flex-col items-center select-none font-fun">
      {/* Playful Toy Tablet / Game Console Frame */}
      <div className="w-full max-w-4xl bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 rounded-[2.5rem] p-4 sm:p-5 shadow-[0_16px_32px_rgba(234,179,8,0.35)] border-4 border-amber-200 relative">
        {/* Top Console Details (Camera notch + speaker holes) */}
        <div className="flex items-center justify-between px-4 pb-2 text-amber-700/80 font-bold text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-600/60 shadow-inner" />
            <span className="w-2 h-2 rounded-full bg-amber-600/40" />
            <span className="font-extrabold tracking-wider text-amber-900">PIXEL ADVENTURE 2D</span>
          </div>
          <div className="flex items-center gap-1.5 bg-amber-200/60 px-3 py-0.5 rounded-full text-amber-900 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" />
            <span>Cerita Interaktif</span>
          </div>
        </div>

        {/* Screen Bevel & Inner Canvas Container */}
        <div className="relative w-full aspect-[16/9] bg-slate-900 rounded-3xl overflow-hidden shadow-inner border-4 border-slate-950/40">
          <canvas
            ref={canvasRef}
            width={800}
            height={450}
            onClick={handleCanvasClick}
            className="w-full h-full cursor-pointer touch-none block pixel-canvas"
            style={{ imageRendering: 'pixelated' }}
          />

          {/* Interactive touch guidance pill */}
          {interactiveCountMode && (
            <div className="absolute top-4 left-4 bg-white/95 text-slate-800 font-bold text-sm sm:text-base px-4 py-2 rounded-2xl shadow-xl border-2 border-emerald-400 flex items-center gap-3 animate-wiggle">
              <Hand className="w-5 h-5 text-emerald-500" />
              <span>Sentuh benda untuk berhitung:</span>
              <span className="bg-emerald-500 text-white text-base px-3 py-0.5 rounded-full font-extrabold shadow">
                {countedTotal}
              </span>
            </div>
          )}
        </div>

        {/* Bottom Console Buttons Deco */}
        <div className="flex items-center justify-between px-6 pt-3">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-rose-500 border-2 border-rose-300 shadow" />
            <span className="w-4 h-4 rounded-full bg-sky-500 border-2 border-sky-300 shadow" />
            <span className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-emerald-300 shadow" />
          </div>
          <div className="text-amber-900/70 text-[11px] font-extrabold tracking-widest uppercase">
            Sentuh Layar untuk Berinteraksi
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-700/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-700/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-700/60" />
          </div>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// PIXEL DRAWING UTILITIES (Internal to canvas)
// ----------------------------------------------------

function drawEnvironment(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  env: EnvironmentType,
  tick: number
) {
  switch (env) {
    case 'park': {
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.65);
      skyGrad.addColorStop(0, '#60a5fa');
      skyGrad.addColorStop(1, '#bae6fd');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // Pixel Sun
      ctx.fillStyle = '#fde047';
      ctx.fillRect(w - 110, 30, 48, 48);
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(w - 104, 36, 36, 36);

      // Clouds
      const cloudX = (tick * 0.4) % (w + 120) - 80;
      drawPixelCloud(ctx, cloudX, 50);
      drawPixelCloud(ctx, ((tick * 0.25) + 300) % (w + 120) - 80, 80);

      // Hills
      ctx.fillStyle = '#4ade80';
      ctx.beginPath();
      ctx.ellipse(200, h * 0.68, 260, 90, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.ellipse(620, h * 0.69, 290, 80, 0, 0, Math.PI * 2);
      ctx.fill();

      // Lawn
      ctx.fillStyle = '#16a34a';
      ctx.fillRect(0, h * 0.65, w, h * 0.35);

      // Grass fringe
      ctx.fillStyle = '#15803d';
      for (let x = 0; x < w; x += 16) {
        ctx.fillRect(x, h * 0.65 - 4, 8, 4);
      }

      // Wooden fence
      ctx.fillStyle = '#92400e';
      for (let x = 30; x < w; x += 45) {
        ctx.fillRect(x, h * 0.58, 8, 35);
        ctx.fillRect(x - 2, h * 0.57, 12, 5);
      }
      ctx.fillRect(20, h * 0.61, w - 40, 6);

      // Flowers
      for (let i = 0; i < 15; i++) {
        const fx = 40 + i * 50;
        const fy = h * 0.72 + (i % 3) * 18;
        ctx.fillStyle = i % 2 === 0 ? '#f43f5e' : '#eab308';
        ctx.fillRect(fx, fy, 6, 6);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(fx + 2, fy + 2, 2, 2);
      }
      break;
    }

    case 'forest': {
      const forestSky = ctx.createLinearGradient(0, 0, 0, h);
      forestSky.addColorStop(0, '#14532d');
      forestSky.addColorStop(0.5, '#166534');
      forestSky.addColorStop(1, '#15803d');
      ctx.fillStyle = forestSky;
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#78350f';
      ctx.fillRect(40, 0, 60, h);
      ctx.fillRect(w - 120, 0, 75, h);
      ctx.fillStyle = '#451a03';
      ctx.fillRect(80, 0, 20, h);
      ctx.fillRect(w - 75, 0, 25, h);

      ctx.fillStyle = '#1e3a1e';
      ctx.fillRect(0, h * 0.65, w, h * 0.35);

      ctx.fillStyle = '#ef4444';
      ctx.fillRect(140, h * 0.68, 16, 12);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(144, h * 0.70, 4, 4);
      ctx.fillStyle = '#fed7aa';
      ctx.fillRect(146, h * 0.80, 6, 10);
      break;
    }

    case 'classroom': {
      ctx.fillStyle = '#fef3c7';
      ctx.fillRect(0, 0, w, h * 0.65);

      ctx.fillStyle = '#1e293b';
      ctx.fillRect(150, 40, w - 300, 160);
      ctx.fillStyle = '#b45309';
      ctx.fillRect(142, 32, w - 284, 8);
      ctx.fillRect(142, 198, w - 284, 8);
      ctx.fillRect(142, 32, 8, 174);
      ctx.fillRect(w - 150, 32, 8, 174);

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 26px "Fredoka", sans-serif';
      ctx.fillText('10 - 4 = ?', w / 2 - 70, 130);

      ctx.fillStyle = '#d97706';
      ctx.fillRect(0, h * 0.65, w, h * 0.35);
      ctx.fillStyle = '#b45309';
      for (let y = h * 0.65; y < h; y += 24) {
        ctx.fillRect(0, y, w, 2);
      }
      break;
    }

    case 'market': {
      ctx.fillStyle = '#93c5fd';
      ctx.fillRect(0, 0, w, h * 0.65);

      ctx.fillStyle = '#64748b';
      ctx.fillRect(0, h * 0.65, w, h * 0.35);

      for (let x = 60; x < w - 60; x += 40) {
        ctx.fillStyle = (x / 40) % 2 === 0 ? '#ef4444' : '#ffffff';
        ctx.fillRect(x, 50, 40, 60);
      }
      ctx.fillStyle = '#78350f';
      ctx.fillRect(50, 105, w - 100, 10);
      ctx.fillRect(70, 105, 12, 160);
      ctx.fillRect(w - 82, 105, 12, 160);
      break;
    }

    case 'castle': {
      ctx.fillStyle = '#1e1b4b';
      ctx.fillRect(0, 0, w, h * 0.65);

      ctx.fillStyle = '#475569';
      ctx.fillRect(80, 60, w - 160, h * 0.65);

      ctx.fillStyle = '#334155';
      for (let y = 70; y < h * 0.65; y += 25) {
        for (let x = 90; x < w - 90; x += 50) {
          ctx.fillRect(x + ((y % 50 === 0) ? 20 : 0), y, 44, 20);
        }
      }

      const flameFlicker = (tick % 6 > 3 ? 2 : 0);
      drawPixelTorch(ctx, 130, 140, flameFlicker);
      drawPixelTorch(ctx, w - 150, 140, flameFlicker);

      ctx.fillStyle = '#1e293b';
      ctx.fillRect(w / 2 - 90, 130, 180, h * 0.65 - 130);
      ctx.fillStyle = '#eab308';
      ctx.fillRect(w / 2 - 92, 126, 184, 8);

      ctx.fillStyle = '#334155';
      ctx.fillRect(0, h * 0.65, w, h * 0.35);
      break;
    }
  }
}

function drawPixelCloud(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x, y + 10, 60, 20);
  ctx.fillRect(x + 10, y, 40, 30);
  ctx.fillRect(x + 20, y - 8, 24, 16);
}

function drawPixelTorch(ctx: CanvasRenderingContext2D, x: number, y: number, flicker: number) {
  ctx.fillStyle = '#78350f';
  ctx.fillRect(x, y, 8, 20);
  ctx.fillStyle = '#ea580c';
  ctx.fillRect(x - 2, y - 14 - flicker, 12, 14);
  ctx.fillStyle = '#fde047';
  ctx.fillRect(x, y - 10 - flicker, 8, 10);
}

function drawPixelCharacter(ctx: CanvasRenderingContext2D, char: ActiveCharacter, tick: number) {
  const isBudi = char.asset.includes('budi');
  const cx = Math.round(char.x);
  const cy = Math.round(char.y);

  let bobY = 0;
  let legSwing = 0;
  let armRaise = 0;

  if (char.emotion === 'walk') {
    legSwing = Math.sin(tick * 0.25) * 6;
    bobY = Math.abs(Math.sin(tick * 0.25)) * 4;
  } else if (char.emotion === 'celebrate' || char.emotion === 'happy') {
    bobY = Math.abs(Math.sin(tick * 0.3)) * 14;
    armRaise = 10;
  } else if (char.emotion === 'idle') {
    bobY = Math.sin(tick * 0.08) * 2;
  }

  const baseCy = cy - bobY;

  // Soft shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.beginPath();
  ctx.ellipse(cx, cy + 32, 18, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  // Shoes & Pants
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(cx - 10 - legSwing, baseCy + 24, 8, 8);
  ctx.fillRect(cx + 2 + legSwing, baseCy + 24, 8, 8);
  ctx.fillStyle = isBudi ? '#1e3a8a' : '#be185d';
  ctx.fillRect(cx - 10, baseCy + 14, 8, 11);
  ctx.fillRect(cx + 2, baseCy + 14, 8, 11);

  // Torso / Shirt
  ctx.fillStyle = isBudi ? '#2563eb' : '#f43f5e';
  ctx.fillRect(cx - 12, baseCy - 6, 24, 21);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 4, baseCy - 6, 8, 5);

  // Arms
  ctx.fillStyle = '#fed7aa';
  if (armRaise > 0) {
    ctx.fillRect(cx - 18, baseCy - 12, 6, 16);
    ctx.fillRect(cx + 12, baseCy - 12, 6, 16);
  } else {
    ctx.fillRect(cx - 16, baseCy - 3, 5, 16);
    ctx.fillRect(cx + 11, baseCy - 3, 5, 16);
  }

  // Head
  ctx.fillStyle = '#fed7aa';
  ctx.fillRect(cx - 14, baseCy - 34, 28, 28);

  // Hair
  if (isBudi) {
    ctx.fillStyle = '#1c1917';
    ctx.fillRect(cx - 16, baseCy - 40, 32, 10);
    ctx.fillRect(cx - 16, baseCy - 34, 6, 8);
    ctx.fillRect(cx + 10, baseCy - 34, 6, 8);
  } else {
    ctx.fillStyle = '#292524';
    ctx.fillRect(cx - 16, baseCy - 40, 32, 10);
    ctx.fillRect(cx - 18, baseCy - 34, 6, 16);
    ctx.fillRect(cx + 12, baseCy - 34, 6, 16);
    ctx.fillStyle = '#ec4899';
    ctx.fillRect(cx - 6, baseCy - 44, 12, 6);
  }

  // Eyes
  ctx.fillStyle = '#0f172a';
  if (char.emotion === 'happy' || char.emotion === 'celebrate') {
    ctx.fillRect(cx - 8, baseCy - 24, 5, 2);
    ctx.fillRect(cx + 3, baseCy - 24, 5, 2);
  } else {
    ctx.fillRect(cx - 8, baseCy - 25, 4, 6);
    ctx.fillRect(cx + 4, baseCy - 25, 4, 6);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx - 7, baseCy - 25, 2, 2);
    ctx.fillRect(cx + 5, baseCy - 25, 2, 2);
  }

  // Mouth
  if (char.emotion === 'talk') {
    const open = Math.sin(tick * 0.4) > 0;
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(cx - 3, baseCy - 14, 6, open ? 5 : 2);
  } else if (char.emotion === 'celebrate' || char.emotion === 'happy') {
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(cx - 4, baseCy - 14, 8, 4);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx - 2, baseCy - 14, 4, 2);
  } else if (char.emotion === 'think') {
    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(cx + 4, baseCy - 16, 6, 6);
    ctx.fillStyle = '#334155';
    ctx.fillRect(cx - 2, baseCy - 13, 5, 2);
  } else {
    ctx.fillStyle = '#e11d48';
    ctx.fillRect(cx - 3, baseCy - 14, 6, 2);
  }

  // Name Tag in clean rounded pill
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(cx - 26, baseCy + 38, 52, 16, 8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#1e293b';
  ctx.font = 'bold 10px "Fredoka", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(char.name, cx, baseCy + 50);
}

function drawPixelObject(
  ctx: CanvasRenderingContext2D,
  type: ObjectType,
  x: number,
  y: number,
  colorIdx: number,
  isHighlighted?: boolean,
  countedNumber?: number,
  tick: number = 0
) {
  const ox = Math.round(x);
  const oy = Math.round(y);

  if (isHighlighted) {
    const pulse = Math.sin(tick * 0.15) * 5;
    ctx.fillStyle = 'rgba(250, 204, 21, 0.5)';
    ctx.beginPath();
    ctx.ellipse(ox, oy, 15 + pulse, 15 + pulse, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  switch (type) {
    case 'marble': {
      const marbleColors = ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];
      const baseColor = marbleColors[colorIdx % marbleColors.length];

      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.fillRect(ox - 6, oy + 7, 12, 4);

      ctx.fillStyle = baseColor;
      ctx.fillRect(ox - 7, oy - 7, 14, 14);

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(ox - 5, oy - 5, 4, 4);
      break;
    }

    case 'apple': {
      ctx.fillStyle = 'rgba(0,0,0,0.25)';
      ctx.fillRect(ox - 7, oy + 8, 14, 3);

      ctx.fillStyle = '#ef4444';
      ctx.fillRect(ox - 8, oy - 7, 16, 14);
      ctx.fillStyle = '#b91c1c';
      ctx.fillRect(ox - 6, oy - 9, 12, 3);

      ctx.fillStyle = '#78350f';
      ctx.fillRect(ox - 1, oy - 12, 2, 4);
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(ox + 1, oy - 13, 5, 3);
      break;
    }

    case 'coin': {
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(ox - 8, oy - 8, 16, 16);
      ctx.fillStyle = '#fde047';
      ctx.fillRect(ox - 6, oy - 6, 12, 12);
      ctx.fillStyle = '#b45309';
      ctx.fillRect(ox - 2, oy - 4, 4, 8);
      break;
    }

    case 'star': {
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(ox - 2, oy - 8, 4, 16);
      ctx.fillRect(ox - 8, oy - 2, 16, 4);
      ctx.fillRect(ox - 5, oy - 5, 10, 10);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(ox - 1, oy - 1, 2, 2);
      break;
    }

    case 'cake': {
      ctx.fillStyle = '#fbcfe8';
      ctx.fillRect(ox - 9, oy - 6, 18, 12);
      ctx.fillStyle = '#fb7185';
      ctx.fillRect(ox - 9, oy - 2, 18, 4);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(ox - 3, oy - 10, 6, 5);
      break;
    }
  }

  // Draw cute friendly round counter tag
  if (countedNumber !== undefined) {
    ctx.fillStyle = '#ef4444';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ox, oy - 18, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px "Fredoka", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(countedNumber), ox, oy - 18);
  }
}

function drawSpeechBubble(ctx: CanvasRenderingContext2D, x: number, y: number, text: string) {
  const maxWidth = 220;
  const padding = 12;

  ctx.font = 'bold 13px "Fredoka", sans-serif';
  ctx.textAlign = 'center';

  const boxW = Math.min(maxWidth, Math.max(120, ctx.measureText(text).width + padding * 2));
  const boxH = 46;

  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2.5;

  ctx.beginPath();
  ctx.roundRect(x - boxW / 2, y - boxH / 2, boxW, boxH, 14);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x - 6, y + boxH / 2);
  ctx.lineTo(x + 6, y + boxH / 2);
  ctx.lineTo(x, y + boxH / 2 + 8);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#0f172a';
  ctx.textBaseline = 'middle';

  if (text.length > 34) {
    const p1 = text.slice(0, 30) + '...';
    ctx.fillText(p1, x, y);
  } else {
    ctx.fillText(text, x, y);
  }
}
