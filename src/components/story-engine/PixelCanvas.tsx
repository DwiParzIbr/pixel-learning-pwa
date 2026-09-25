'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CharacterDef, CharacterEmotion, EnvironmentType, ObjectType, SceneAction, SceneDef } from '@/types/story';
import { soundEngine } from '@/lib/audio/soundEngine';

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
        // Transfer quantity of objects from sender to receiver
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

    // Attach dialogue speech bubble if any
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

      // Disable anti-aliasing for true pixel-art crispness
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
            const arcHeight = Math.sin(newP * Math.PI) * 60; // parabolic arc

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
        // Move towards target
        if (char.x !== char.targetX || char.y !== char.targetY) {
          const dx = char.targetX - char.x;
          char.x += Math.sign(dx) * Math.min(Math.abs(dx), 3);
          if (Math.abs(char.targetX - char.x) < 3) {
            char.x = char.targetX;
            char.emotion = 'idle';
          }
        }

        drawPixelCharacter(ctx, char, tick);

        // Draw Speech Bubble
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

  // Handle tap / click to count objects
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    // Check if clicked near an uncounted object
    setActiveObjects(prev => {
      let newlyCounted = false;
      let nextTotal = countedTotal;
      const updated = prev.map(obj => {
        const dist = Math.hypot(obj.x - clickX, obj.y - clickY);
        if (dist < 22 && !obj.isCounted) {
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
    <div className="relative w-full flex flex-col items-center select-none">
      <div className="relative w-full aspect-[16/9] max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-400/80">
        <canvas
          ref={canvasRef}
          width={800}
          height={450}
          onClick={handleCanvasClick}
          className="w-full h-full cursor-pointer touch-none block"
          style={{ imageRendering: 'pixelated' }}
        />

        {/* Interactive counting indicator */}
        {interactiveCountMode && (
          <div className="absolute top-3 left-4 bg-amber-500/90 text-white font-fun font-bold text-sm md:text-base px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2 animate-bounceSubtle">
            <span>👆 Sentuh objek untuk menghitung:</span>
            <span className="bg-white text-amber-700 px-2.5 py-0.5 rounded-full font-pixel text-xs">
              {countedTotal}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// ----------------------------------------------------
// PIXEL DRAWING UTILITIES
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
      // Sky
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

      // Distant Hills
      ctx.fillStyle = '#4ade80';
      ctx.beginPath();
      ctx.ellipse(200, h * 0.68, 260, 90, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.ellipse(620, h * 0.69, 290, 80, 0, 0, Math.PI * 2);
      ctx.fill();

      // Lawn / Ground
      ctx.fillStyle = '#16a34a';
      ctx.fillRect(0, h * 0.65, w, h * 0.35);

      // Grass fringe details
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
      // Canopy & Sunlight
      const forestSky = ctx.createLinearGradient(0, 0, 0, h);
      forestSky.addColorStop(0, '#14532d');
      forestSky.addColorStop(0.5, '#166534');
      forestSky.addColorStop(1, '#15803d');
      ctx.fillStyle = forestSky;
      ctx.fillRect(0, 0, w, h);

      // Giant Tree Trunks
      ctx.fillStyle = '#78350f';
      ctx.fillRect(40, 0, 60, h);
      ctx.fillRect(w - 120, 0, 75, h);
      ctx.fillStyle = '#451a03';
      ctx.fillRect(80, 0, 20, h);
      ctx.fillRect(w - 75, 0, 25, h);

      // Forest Floor
      ctx.fillStyle = '#1e3a1e';
      ctx.fillRect(0, h * 0.65, w, h * 0.35);

      // Mushrooms
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(140, h * 0.68, 16, 12);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(144, h * 0.70, 4, 4);
      ctx.fillStyle = '#fed7aa';
      ctx.fillRect(146, h * 0.80, 6, 10);
      break;
    }

    case 'classroom': {
      // Wall
      ctx.fillStyle = '#fef3c7';
      ctx.fillRect(0, 0, w, h * 0.65);

      // Blackboard
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(150, 40, w - 300, 160);
      ctx.fillStyle = '#b45309';
      ctx.fillRect(142, 32, w - 284, 8); // top border
      ctx.fillRect(142, 198, w - 284, 8); // bottom border
      ctx.fillRect(142, 32, 8, 174);
      ctx.fillRect(w - 150, 32, 8, 174);

      // Blackboard Chalk Text
      ctx.fillStyle = '#f8fafc';
      ctx.font = '22px "Press Start 2P", monospace';
      ctx.fillText('10 - 4 = ?', w / 2 - 110, 130);

      // Wooden Floor
      ctx.fillStyle = '#d97706';
      ctx.fillRect(0, h * 0.65, w, h * 0.35);
      ctx.fillStyle = '#b45309';
      for (let y = h * 0.65; y < h; y += 24) {
        ctx.fillRect(0, y, w, 2);
      }
      break;
    }

    case 'market': {
      // Sky
      ctx.fillStyle = '#93c5fd';
      ctx.fillRect(0, 0, w, h * 0.65);

      // Cobblestone ground
      ctx.fillStyle = '#64748b';
      ctx.fillRect(0, h * 0.65, w, h * 0.35);

      // Market Canopy (Red and White stripes)
      for (let x = 60; x < w - 60; x += 40) {
        ctx.fillStyle = (x / 40) % 2 === 0 ? '#ef4444' : '#ffffff';
        ctx.fillRect(x, 50, 40, 60);
      }
      // Wooden stall frame
      ctx.fillStyle = '#78350f';
      ctx.fillRect(50, 105, w - 100, 10);
      ctx.fillRect(70, 105, 12, 160);
      ctx.fillRect(w - 82, 105, 12, 160);
      break;
    }

    case 'castle': {
      // Dark twilight sky
      ctx.fillStyle = '#1e1b4b';
      ctx.fillRect(0, 0, w, h * 0.65);

      // Castle Stone Walls
      ctx.fillStyle = '#475569';
      ctx.fillRect(80, 60, w - 160, h * 0.65);

      // Stone Bricks pattern
      ctx.fillStyle = '#334155';
      for (let y = 70; y < h * 0.65; y += 25) {
        for (let x = 90; x < w - 90; x += 50) {
          ctx.fillRect(x + ((y % 50 === 0) ? 20 : 0), y, 44, 20);
        }
      }

      // Torches with animated pixel fire
      const flameFlicker = (tick % 6 > 3 ? 2 : 0);
      drawPixelTorch(ctx, 130, 140, flameFlicker);
      drawPixelTorch(ctx, w - 150, 140, flameFlicker);

      // Gate Arch
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(w / 2 - 90, 130, 180, h * 0.65 - 130);
      ctx.fillStyle = '#eab308';
      ctx.fillRect(w / 2 - 92, 126, 184, 8); // Golden rim

      // Castle Floor
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
  // Wooden mount
  ctx.fillStyle = '#78350f';
  ctx.fillRect(x, y, 8, 20);
  // Flames
  ctx.fillStyle = '#ea580c';
  ctx.fillRect(x - 2, y - 14 - flicker, 12, 14);
  ctx.fillStyle = '#fde047';
  ctx.fillRect(x, y - 10 - flicker, 8, 10);
}

// Draw Character with Pixel Art & Emotions
function drawPixelCharacter(ctx: CanvasRenderingContext2D, char: ActiveCharacter, tick: number) {
  const isBudi = char.asset.includes('budi');
  const cx = Math.round(char.x);
  const cy = Math.round(char.y);

  // Animation offsets
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

  // Shadow on floor
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.beginPath();
  ctx.ellipse(cx, cy + 32, 18, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  // 1. Legs / Shoes
  ctx.fillStyle = '#f8fafc'; // White shoes
  ctx.fillRect(cx - 10 - legSwing, baseCy + 24, 8, 8);
  ctx.fillRect(cx + 2 + legSwing, baseCy + 24, 8, 8);
  // Pants
  ctx.fillStyle = isBudi ? '#1e3a8a' : '#be185d';
  ctx.fillRect(cx - 10, baseCy + 14, 8, 11);
  ctx.fillRect(cx + 2, baseCy + 14, 8, 11);

  // 2. Torso / Shirt
  ctx.fillStyle = isBudi ? '#2563eb' : '#f43f5e'; // Blue shirt (Budi) or Pink/Red (Siti)
  ctx.fillRect(cx - 12, baseCy - 6, 24, 21);

  // Shirt collar / detail
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 4, baseCy - 6, 8, 5);

  // 3. Arms
  ctx.fillStyle = '#fed7aa'; // Skin tone
  if (armRaise > 0) {
    // Arms raised up celebrating
    ctx.fillRect(cx - 18, baseCy - 12, 6, 16);
    ctx.fillRect(cx + 12, baseCy - 12, 6, 16);
  } else {
    // Normal arms
    ctx.fillRect(cx - 16, baseCy - 3, 5, 16);
    ctx.fillRect(cx + 11, baseCy - 3, 5, 16);
  }

  // 4. Head / Face
  ctx.fillStyle = '#fed7aa'; // Skin
  ctx.fillRect(cx - 14, baseCy - 34, 28, 28);

  // 5. Hair
  if (isBudi) {
    // Short spiky dark hair
    ctx.fillStyle = '#1c1917';
    ctx.fillRect(cx - 16, baseCy - 40, 32, 10);
    ctx.fillRect(cx - 16, baseCy - 34, 6, 8);
    ctx.fillRect(cx + 10, baseCy - 34, 6, 8);
  } else {
    // Siti with ribbon and twin hair
    ctx.fillStyle = '#292524';
    ctx.fillRect(cx - 16, baseCy - 40, 32, 10);
    ctx.fillRect(cx - 18, baseCy - 34, 6, 16);
    ctx.fillRect(cx + 12, baseCy - 34, 6, 16);
    // Pink Ribbon
    ctx.fillStyle = '#ec4899';
    ctx.fillRect(cx - 6, baseCy - 44, 12, 6);
  }

  // 6. Eyes
  ctx.fillStyle = '#0f172a';
  if (char.emotion === 'happy' || char.emotion === 'celebrate') {
    // Cheerful crescent eyes ^ ^
    ctx.fillRect(cx - 8, baseCy - 24, 5, 2);
    ctx.fillRect(cx + 3, baseCy - 24, 5, 2);
  } else {
    ctx.fillRect(cx - 8, baseCy - 25, 4, 6);
    ctx.fillRect(cx + 4, baseCy - 25, 4, 6);
    // White eye twinkle
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx - 7, baseCy - 25, 2, 2);
    ctx.fillRect(cx + 5, baseCy - 25, 2, 2);
  }

  // 7. Mouth & Emotion Expression
  if (char.emotion === 'talk') {
    // Mouth animated opening/closing
    const open = Math.sin(tick * 0.4) > 0;
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(cx - 3, baseCy - 14, 6, open ? 5 : 2);
  } else if (char.emotion === 'celebrate' || char.emotion === 'happy') {
    // Big smile
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(cx - 4, baseCy - 14, 8, 4);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx - 2, baseCy - 14, 4, 2);
  } else if (char.emotion === 'think') {
    // Hand on chin
    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(cx + 4, baseCy - 16, 6, 6);
    ctx.fillStyle = '#334155';
    ctx.fillRect(cx - 2, baseCy - 13, 5, 2);
  } else {
    // Gentle smile
    ctx.fillStyle = '#e11d48';
    ctx.fillRect(cx - 3, baseCy - 14, 6, 2);
  }

  // Name Tag
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  ctx.fillRect(cx - 26, baseCy + 38, 52, 16);
  ctx.fillStyle = '#f8fafc';
  ctx.font = '9px "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  ctx.fillText(char.name, cx, baseCy + 49);
}

// Draw Objects (Marbles, Apples, Coins, etc.)
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

  // Pulsing highlight glow
  if (isHighlighted) {
    const pulse = Math.sin(tick * 0.15) * 4;
    ctx.fillStyle = 'rgba(251, 191, 36, 0.45)';
    ctx.beginPath();
    ctx.ellipse(ox, oy, 14 + pulse, 14 + pulse, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  switch (type) {
    case 'marble': {
      const marbleColors = ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];
      const baseColor = marbleColors[colorIdx % marbleColors.length];

      // Marble Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.fillRect(ox - 6, oy + 7, 12, 4);

      // Sphere Body
      ctx.fillStyle = baseColor;
      ctx.fillRect(ox - 7, oy - 7, 14, 14);

      // Specular Highlight
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(ox - 5, oy - 5, 4, 4);
      break;
    }

    case 'apple': {
      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.25)';
      ctx.fillRect(ox - 7, oy + 8, 14, 3);

      // Apple Red Body
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(ox - 8, oy - 7, 16, 14);
      ctx.fillStyle = '#b91c1c';
      ctx.fillRect(ox - 6, oy - 9, 12, 3);

      // Stem & Leaf
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
      ctx.fillRect(ox - 3, oy - 10, 6, 5); // Strawberry on top
      break;
    }
  }

  // Draw counted number floating badge
  if (countedNumber !== undefined) {
    ctx.fillStyle = '#e11d48';
    ctx.beginPath();
    ctx.arc(ox, oy - 16, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(countedNumber), ox, oy - 16);
  }
}

// Draw Speech Bubble
function drawSpeechBubble(ctx: CanvasRenderingContext2D, x: number, y: number, text: string) {
  const maxWidth = 220;
  const padding = 10;

  ctx.font = '12px "Fredoka", sans-serif';
  ctx.textAlign = 'center';

  // Measure text
  const boxW = Math.min(maxWidth, Math.max(120, ctx.measureText(text).width + padding * 2));
  const boxH = 46;

  // Background bubble
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.roundRect(x - boxW / 2, y - boxH / 2, boxW, boxH, 8);
  ctx.fill();
  ctx.stroke();

  // Tail pointing to character
  ctx.beginPath();
  ctx.moveTo(x - 6, y + boxH / 2);
  ctx.lineTo(x + 6, y + boxH / 2);
  ctx.lineTo(x, y + boxH / 2 + 8);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Text
  ctx.fillStyle = '#0f172a';
  ctx.textBaseline = 'middle';

  // Truncate or slice if long
  if (text.length > 34) {
    const p1 = text.slice(0, 30) + '...';
    ctx.fillText(p1, x, y);
  } else {
    ctx.fillText(text, x, y);
  }
}
