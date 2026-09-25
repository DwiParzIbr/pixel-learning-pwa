'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { CharacterDef, CharacterEmotion, EnvironmentType, ObjectType, SceneDef } from '@/types/story';
import { soundEngine } from '@/lib/audio/soundEngine';
import { Hand, RotateCcw } from 'lucide-react';

interface PixelCanvasProps {
  allScenes: SceneDef[];
  activeSceneIndex: number;
  characters: CharacterDef[];
  isPaused: boolean;
  onSceneComplete?: (sceneIndex: number) => void;
  onObjectCounted?: (count: number) => void;
  interactiveCountMode?: boolean;
  activeSpeaker?: string | null;
}

interface CharacterEntity {
  id: string;
  name: string;
  asset: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  isWalking: boolean;
  walkSpeed: number;
  facing: 'left' | 'right';
  emotion: CharacterEmotion;
  speechBubble?: string;
  stepCycle: number;
}

interface ObjectEntity {
  id: string;
  type: ObjectType;
  owner?: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  groundY: number;
  isTransferring: boolean;
  transferProgress: number;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  colorIdx: number;
  isCounted: boolean;
  countNumber?: number;
  isHighlighted: boolean;
  bounceOffset: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
}

export const PixelCanvas: React.FC<PixelCanvasProps> = ({
  allScenes,
  activeSceneIndex,
  characters,
  isPaused,
  onSceneComplete,
  onObjectCounted,
  interactiveCountMode = false,
  activeSpeaker = null,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [countedTotal, setCountedTotal] = useState<number>(0);

  // Persistent Game State across all scenes in the full story
  const gameStateRef = useRef<{
    characters: Map<string, CharacterEntity>;
    objects: ObjectEntity[];
    particles: Particle[];
    tick: number;
    currentProcessedScene: number;
    sceneTimer: number;
  }>({
    characters: new Map(),
    objects: [],
    particles: [],
    tick: 0,
    currentProcessedScene: -1,
    sceneTimer: 0,
  });

  const currentScene = allScenes[activeSceneIndex] || allScenes[0];

  // Process scene actions without destroying existing world state
  const applySceneActions = useCallback(
    (sceneIdx: number) => {
      const scene = allScenes[sceneIdx];
      if (!scene) return;

      const state = gameStateRef.current;
      state.currentProcessedScene = sceneIdx;
      state.sceneTimer = 0;

      // If resetting to scene 0, start completely fresh
      if (sceneIdx === 0) {
        state.characters.clear();
        state.objects = [];
        state.particles = [];
        setCountedTotal(0);
      }

      // 1. Process Characters
      for (const act of scene.actions) {
        if (act.type === 'spawn_character' && act.characterId) {
          const charDef = characters.find(c => c.id === act.characterId);
          const finalX = act.position?.x ?? (act.characterId === 'siti' ? 550 : 220);
          const finalY = act.position?.y ?? 330;

          if (!state.characters.has(act.characterId)) {
            // New character entering the scene
            const isBudi = act.characterId === 'budi';
            const startX = isBudi ? (finalX > 300 ? 50 : 20) : (finalX < 500 ? 760 : 700);

            state.characters.set(act.characterId, {
              id: act.characterId,
              name: charDef?.name || act.characterId,
              asset: charDef?.asset || 'character_budi',
              x: startX,
              y: finalY,
              targetX: finalX,
              targetY: finalY,
              isWalking: startX !== finalX,
              walkSpeed: 2.8,
              facing: finalX >= startX ? 'right' : 'left',
              emotion: act.animation || 'walk',
              speechBubble: undefined,
              stepCycle: 0,
            });
          } else {
            // Existing character moves to new position if specified
            const existing = state.characters.get(act.characterId)!;
            if (act.position) {
              existing.targetX = act.position.x;
              existing.targetY = act.position.y;
              existing.isWalking = existing.x !== act.position.x;
              existing.facing = act.position.x >= existing.x ? 'right' : 'left';
            }
            if (act.animation) {
              existing.emotion = act.animation;
            }
          }
        }

        if (act.type === 'move_character' && act.characterId && act.position) {
          const c = state.characters.get(act.characterId);
          if (c) {
            c.targetX = act.position.x;
            c.targetY = act.position.y;
            c.isWalking = true;
            c.facing = act.position.x >= c.x ? 'right' : 'left';
          }
        }

        if (act.type === 'animate_character' && act.characterId && act.animation) {
          const c = state.characters.get(act.characterId);
          if (c) {
            c.emotion = act.animation;
          }
        }

        // 2. Process Objects
        if (act.type === 'spawn_object' && act.object && act.quantity) {
          const count = act.quantity;
          const baseX = act.position?.x ?? (act.owner === 'siti' ? 520 : 380);
          const groundY = act.position?.y ?? 355;

          for (let i = 0; i < count; i++) {
            const col = i % 5;
            const row = Math.floor(i / 5);
            const targetObjX = baseX + col * 36;
            const targetObjY = groundY + row * 26;

            state.objects.push({
              id: `obj_${act.object}_${i}_${Date.now()}`,
              type: act.object,
              owner: act.owner,
              x: targetObjX,
              y: -30 - i * 15, // Drop from tree/sky with bounce
              targetX: targetObjX,
              targetY: targetObjY,
              groundY: targetObjY,
              isTransferring: false,
              transferProgress: 0,
              fromX: targetObjX,
              fromY: targetObjY,
              toX: targetObjX,
              toY: targetObjY,
              colorIdx: i,
              isCounted: false,
              isHighlighted: false,
              bounceOffset: 0,
            });
          }
        }

        // 3. Object Transfers (e.g. Budi gives 4 marbles to Siti)
        if (act.type === 'transfer_object' && act.from && act.to && act.quantity) {
          let transferredCount = 0;
          const targetBaseX = act.to === 'siti' ? 540 : 250;
          const groundY = 355;

          state.objects.forEach(obj => {
            if (obj.owner === act.from && transferredCount < (act.quantity || 0) && !obj.isTransferring) {
              const col = transferredCount % 5;
              const row = Math.floor(transferredCount / 5);
              obj.owner = act.to;
              obj.fromX = obj.x;
              obj.fromY = obj.y;
              obj.toX = targetBaseX + col * 36;
              obj.toY = groundY + row * 26;
              obj.groundY = obj.toY;
              obj.isTransferring = true;
              obj.transferProgress = -transferredCount * 0.15; // Staggered parabolic flight
              transferredCount++;
            }
          });

          soundEngine.playSfx('transfer');

          const receiver = state.characters.get(act.to);
          if (receiver) receiver.emotion = 'celebrate';
        }

        // 4. Highlight objects (e.g. Budi's remaining marbles)
        if (act.type === 'highlight_object') {
          state.objects.forEach(obj => {
            if (!act.owner || obj.owner === act.owner) {
              obj.isHighlighted = true;
            }
          });
        }
      }

      // Update Speech Bubble only when this character is the active speaker
      state.characters.forEach(char => {
        if (activeSpeaker && scene.dialogue && scene.dialogue.speaker === char.id && activeSpeaker === char.id) {
          char.speechBubble = scene.dialogue.text;
          char.emotion = 'talk';
        } else {
          char.speechBubble = undefined;
          if (char.emotion === 'talk') {
            char.emotion = 'idle';
          }
        }
      });
    },
    [allScenes, characters, activeSpeaker]
  );

  useEffect(() => {
    applySceneActions(activeSceneIndex);
  }, [activeSceneIndex, applySceneActions]);

  // Dynamically update speech bubbles and character talk animation when activeSpeaker changes
  useEffect(() => {
    const scene = allScenes[activeSceneIndex];
    if (!scene) return;
    const state = gameStateRef.current;
    state.characters.forEach(char => {
      if (activeSpeaker && scene.dialogue && scene.dialogue.speaker === char.id && activeSpeaker === char.id) {
        char.speechBubble = scene.dialogue.text;
        char.emotion = 'talk';
      } else {
        char.speechBubble = undefined;
        if (char.emotion === 'talk') {
          char.emotion = 'idle';
        }
      }
    });
  }, [activeSpeaker, activeSceneIndex, allScenes]);

  // Main 60 FPS Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const gameLoop = () => {
      const state = gameStateRef.current;
      if (!isPaused) {
        state.tick++;
        state.sceneTimer += 1 / 60;
      }

      const w = canvas.width;
      const h = canvas.height;

      ctx.imageSmoothingEnabled = false;
      drawEnvironment(ctx, w, h, currentScene.background, state.tick);

      // Character Movement Physics
      state.characters.forEach(char => {
        if (char.x !== char.targetX) {
          const diff = char.targetX - char.x;
          if (Math.abs(diff) <= char.walkSpeed) {
            char.x = char.targetX;
            char.isWalking = false;
            char.emotion = 'idle';
          } else {
            char.x += Math.sign(diff) * char.walkSpeed;
            char.isWalking = true;
            char.stepCycle += 0.25;
            char.facing = diff > 0 ? 'right' : 'left';
          }
        } else {
          char.isWalking = false;
        }
      });

      // Object Drop and Transfer Physics
      state.objects.forEach(obj => {
        if (obj.y < obj.groundY && !obj.isTransferring) {
          obj.y += 6.5;
          if (obj.y >= obj.groundY) {
            obj.y = obj.groundY;
            soundEngine.playSfx('pickup');
            for (let p = 0; p < 4; p++) {
              state.particles.push({
                x: obj.x,
                y: obj.groundY,
                vx: (Math.random() - 0.5) * 3,
                vy: -Math.random() * 3,
                color: '#fde047',
                size: 3,
                alpha: 1,
                life: 0,
                maxLife: 20,
              });
            }
          }
        }

        if (obj.isTransferring) {
          obj.transferProgress += 0.022;
          const p = Math.min(1, Math.max(0, obj.transferProgress));
          obj.x = obj.fromX + (obj.toX - obj.fromX) * p;
          const linearY = obj.fromY + (obj.toY - obj.fromY) * p;
          const arcHeight = Math.sin(p * Math.PI) * 80;
          obj.y = linearY - arcHeight;

          if (obj.transferProgress >= 1) {
            obj.isTransferring = false;
            obj.y = obj.groundY;
            obj.x = obj.toX;
            soundEngine.playSfx('pickup');
          }
        }
      });

      // Render Objects
      state.objects.forEach(obj => {
        drawPixelObjectSprite(ctx, obj, state.tick);
      });

      // Render Characters
      state.characters.forEach(char => {
        drawPixelCharacterSprite(ctx, char, state.tick);
        if (char.speechBubble) {
          drawComicSpeechBubble(ctx, char.x, char.y - 72, char.speechBubble);
        }
      });

      // Render Particles
      for (let i = state.particles.length - 1; i >= 0; i--) {
        const pt = state.particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.vy += 0.12;
        pt.life++;
        pt.alpha = 1 - pt.life / pt.maxLife;

        ctx.fillStyle = pt.color;
        ctx.globalAlpha = Math.max(0, pt.alpha);
        ctx.fillRect(pt.x, pt.y, pt.size, pt.size);
        ctx.globalAlpha = 1;

        if (pt.life >= pt.maxLife) {
          state.particles.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(gameLoop);
    };

    animId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [currentScene, isPaused]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    const state = gameStateRef.current;
    let newlyCounted = false;
    let newCount = countedTotal;

    state.objects.forEach(obj => {
      const dist = Math.hypot(obj.x - clickX, obj.y - clickY);
      if (dist < 44 && !obj.isCounted) {
        newlyCounted = true;
        newCount++;
        obj.isCounted = true;
        obj.countNumber = newCount;
        obj.isHighlighted = true;
        obj.bounceOffset = -22;

        soundEngine.playSfx('count');

        for (let p = 0; p < 10; p++) {
          state.particles.push({
            x: obj.x,
            y: obj.y,
            vx: (Math.random() - 0.5) * 5,
            vy: -Math.random() * 5 - 2,
            color: '#fde047',
            size: 4,
            alpha: 1,
            life: 0,
            maxLife: 25,
          });
        }
      }
    });

    if (newlyCounted) {
      setCountedTotal(newCount);
      onObjectCounted?.(newCount);
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center select-none font-fun">
      {/* Handheld Toy Console Frame */}
      <div className="w-full max-w-4xl bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 rounded-2xl sm:rounded-[2.5rem] p-2 sm:p-4 shadow-[0_12px_32px_rgba(245,158,11,0.25)] border-3 sm:border-4 border-amber-200 relative">
        {/* Top Console Notch */}
        <div className="flex items-center justify-between px-2 sm:px-4 pb-1.5 sm:pb-2 text-amber-900 font-extrabold text-[11px] sm:text-sm">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-amber-600/70 shadow-inner" />
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-600/50" />
            <span className="tracking-wide">PANGGUNG PETUALANGAN CERITA</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundEngine.playSfx('click');
                applySceneActions(0);
                onSceneComplete?.(-1); // Reset story from start
              }}
              className="bg-white/90 hover:bg-white text-amber-900 font-black text-[11px] sm:text-xs px-2.5 sm:px-3.5 py-1 rounded-full flex items-center gap-1 shadow-sm active:scale-95 transition-all"
            >
              <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-700" />
              <span>Putar Dari Awal</span>
            </button>
          </div>
        </div>

        {/* Screen Bevel & Canvas (Bigger & Taller on Mobile) */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] bg-slate-900 rounded-2xl sm:rounded-3xl overflow-hidden shadow-inner border-3 sm:border-4 border-slate-950/40">
          <canvas
            ref={canvasRef}
            width={720}
            height={420}
            onClick={handleCanvasClick}
            className="w-full h-full cursor-pointer touch-none block"
            style={{ imageRendering: 'pixelated' }}
          />

          {/* Interactive touch guidance pill (Only during counting mode) */}
          {interactiveCountMode && (
            <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 bg-white/95 text-slate-800 font-bold text-xs sm:text-base px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-xl sm:rounded-2xl shadow-xl border-2 border-emerald-400 flex items-center gap-1.5 sm:gap-3">
              <Hand className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 animate-wiggle shrink-0" />
              <span>Sentuh apel di layar:</span>
              <span className="bg-emerald-500 text-white px-2 py-0.5 rounded-full font-black text-xs sm:text-sm shadow">
                {countedTotal}
              </span>
            </div>
          )}
        </div>

        {/* Console Footing (Hidden on mobile to avoid clutter) */}
        <div className="hidden sm:flex items-center justify-between px-6 pt-3">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-rose-500 border-2 border-rose-300 shadow" />
            <span className="w-4 h-4 rounded-full bg-sky-500 border-2 border-sky-300 shadow" />
            <span className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-emerald-300 shadow" />
          </div>
          <div className="text-amber-950/70 text-xs font-black tracking-widest uppercase">
            Cerita Berjalan Otomatis Dari Awal Sampai Akhir
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-amber-700/60" />
            <div className="w-2 h-2 rounded-full bg-amber-700/60" />
            <div className="w-2 h-2 rounded-full bg-amber-700/60" />
          </div>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// PIXEL DRAWING ENGINES
// ----------------------------------------------------

function drawEnvironment(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  env: EnvironmentType,
  tick: number
) {
  switch (env) {
    case 'forest': {
      // Sunny bright morning sky
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.72);
      skyGrad.addColorStop(0, '#38bdf8');
      skyGrad.addColorStop(0.6, '#7dd3fc');
      skyGrad.addColorStop(1, '#e0f2fe');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // Smiling Sun
      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.arc(80, 70, 36, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(80, 70, 36, 0, Math.PI * 2);
      ctx.stroke();

      // Soft Clouds
      drawPixelCloud(ctx, 140 + Math.sin(tick * 0.02) * 10, 40);
      drawPixelCloud(ctx, 360 + Math.cos(tick * 0.015) * 12, 60);

      // Distant rolling green hills
      ctx.fillStyle = '#86efac';
      ctx.beginPath();
      ctx.arc(160, h * 0.75, 220, Math.PI, 0);
      ctx.fill();

      ctx.fillStyle = '#4ade80';
      ctx.beginPath();
      ctx.arc(380, h * 0.76, 200, Math.PI, 0);
      ctx.fill();

      // Large Lush Cartoon Apple Tree
      const treeX = w - 190;
      // Trunk
      ctx.fillStyle = '#78350f';
      ctx.fillRect(treeX - 28, h * 0.32, 56, h * 0.42);
      ctx.fillStyle = '#451a03';
      ctx.fillRect(treeX - 8, h * 0.35, 16, h * 0.39);

      // Crown layers
      ctx.fillStyle = '#15803d';
      ctx.beginPath();
      ctx.arc(treeX, h * 0.32, 125, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#16a34a';
      ctx.beginPath();
      ctx.arc(treeX - 45, h * 0.28, 90, 0, Math.PI * 2);
      ctx.arc(treeX + 45, h * 0.28, 90, 0, Math.PI * 2);
      ctx.arc(treeX, h * 0.18, 85, 0, Math.PI * 2);
      ctx.fill();

      // Big bright hanging tree apples
      const treeApples = [
        { x: treeX - 70, y: h * 0.28 },
        { x: treeX - 25, y: h * 0.15 },
        { x: treeX + 45, y: h * 0.19 },
        { x: treeX + 75, y: h * 0.30 },
        { x: treeX, y: h * 0.32 },
      ];
      treeApples.forEach((app, idx) => {
        const bob = Math.sin(tick * 0.08 + idx) * 3;
        ctx.fillStyle = '#dc2626';
        ctx.beginPath();
        ctx.arc(app.x, app.y + bob, 13, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(app.x - 4, app.y + bob - 5, 4, 4);
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(app.x - 2, app.y + bob - 16, 5, 4);
      });

      // Ground (Lush green grass)
      ctx.fillStyle = '#166534';
      ctx.fillRect(0, h * 0.72, w, h * 0.28);
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(0, h * 0.72, w, 14);

      // Wildflowers on grass
      const flowerXs = [50, 110, 190, 260, 340, 420, 520, 620];
      flowerXs.forEach((fx, i) => {
        ctx.fillStyle = i % 2 === 0 ? '#facc15' : '#f43f5e';
        ctx.beginPath();
        ctx.arc(fx, h * 0.77 + (i % 3) * 6, 4, 0, Math.PI * 2);
        ctx.fill();
      });
      break;
    }

    case 'park': {
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.7);
      skyGrad.addColorStop(0, '#38bdf8');
      skyGrad.addColorStop(1, '#bae6fd');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#fde047';
      ctx.fillRect(w - 110, 30, 52, 52);
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(w - 104, 36, 40, 40);

      const cloudX = (tick * 0.5) % (w + 140) - 100;
      drawPixelCloud(ctx, cloudX, 45);
      drawPixelCloud(ctx, ((tick * 0.3) + 360) % (w + 140) - 100, 75);

      ctx.fillStyle = '#4ade80';
      ctx.beginPath();
      ctx.ellipse(220, h * 0.74, 280, 100, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.ellipse(640, h * 0.75, 300, 90, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#16a34a';
      ctx.fillRect(0, h * 0.72, w, h * 0.28);
      ctx.fillStyle = '#15803d';
      ctx.fillRect(0, h * 0.72, w, 10);

      ctx.fillStyle = '#92400e';
      for (let x = 20; x < w; x += 50) {
        ctx.fillRect(x, h * 0.64, 10, 38);
        ctx.fillRect(x - 2, h * 0.63, 14, 6);
      }
      ctx.fillRect(10, h * 0.67, w - 20, 8);

      for (let i = 0; i < 14; i++) {
        const fx = 35 + i * 55;
        const fy = h * 0.78 + (i % 3) * 16;
        ctx.fillStyle = i % 2 === 0 ? '#f43f5e' : '#eab308';
        ctx.fillRect(fx, fy, 8, 8);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(fx + 2, fy + 2, 4, 4);
      }
      break;
    }

    case 'classroom': {
      ctx.fillStyle = '#fef3c7';
      ctx.fillRect(0, 0, w, h * 0.72);

      ctx.fillStyle = '#1e293b';
      ctx.fillRect(140, 35, w - 280, 175);
      ctx.fillStyle = '#b45309';
      ctx.fillRect(132, 27, w - 264, 10);
      ctx.fillRect(132, 208, w - 264, 10);
      ctx.fillRect(132, 27, 10, 191);
      ctx.fillRect(w - 142, 27, 10, 191);

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 32px "Fredoka", sans-serif';
      ctx.fillText('10 - 4 = ?', w / 2 - 80, 135);

      ctx.fillStyle = '#d97706';
      ctx.fillRect(0, h * 0.72, w, h * 0.28);
      ctx.fillStyle = '#b45309';
      for (let y = h * 0.72; y < h; y += 26) {
        ctx.fillRect(0, y, w, 3);
      }
      break;
    }

    case 'market': {
      ctx.fillStyle = '#bae6fd';
      ctx.fillRect(0, 0, w, h * 0.72);

      ctx.fillStyle = '#64748b';
      ctx.fillRect(0, h * 0.72, w, h * 0.28);

      for (let x = 40; x < w - 40; x += 45) {
        ctx.fillStyle = (x / 45) % 2 === 0 ? '#ef4444' : '#ffffff';
        ctx.fillRect(x, 40, 45, 65);
      }
      ctx.fillStyle = '#78350f';
      ctx.fillRect(30, 100, w - 60, 12);
      ctx.fillRect(60, 100, 14, 170);
      ctx.fillRect(w - 74, 100, 14, 170);
      break;
    }

    case 'castle': {
      ctx.fillStyle = '#1e1b4b';
      ctx.fillRect(0, 0, w, h * 0.72);

      ctx.fillStyle = '#475569';
      ctx.fillRect(70, 50, w - 140, h * 0.72);

      ctx.fillStyle = '#334155';
      for (let y = 60; y < h * 0.72; y += 28) {
        for (let x = 80; x < w - 80; x += 55) {
          ctx.fillRect(x + ((y % 56 === 0) ? 22 : 0), y, 48, 22);
        }
      }

      const flicker = (tick % 6 > 3 ? 3 : 0);
      drawPixelTorch(ctx, 120, 140, flicker);
      drawPixelTorch(ctx, w - 140, 140, flicker);

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(w / 2 - 95, 120, 190, h * 0.72 - 120);
      ctx.fillStyle = '#eab308';
      ctx.fillRect(w / 2 - 98, 116, 196, 10);

      ctx.fillStyle = '#334155';
      ctx.fillRect(0, h * 0.72, w, h * 0.28);
      break;
    }
  }
}

function drawPixelCloud(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x, y + 12, 70, 24);
  ctx.fillRect(x + 12, y, 46, 36);
  ctx.fillRect(x + 24, y - 10, 28, 20);
}

function drawPixelTorch(ctx: CanvasRenderingContext2D, x: number, y: number, flicker: number) {
  ctx.fillStyle = '#78350f';
  ctx.fillRect(x, y, 10, 24);
  ctx.fillStyle = '#ea580c';
  ctx.fillRect(x - 3, y - 16 - flicker, 16, 18);
  ctx.fillStyle = '#fde047';
  ctx.fillRect(x, y - 12 - flicker, 10, 12);
}

// ----------------------------------------------------
// DETAILED 2D CHARACTER SPRITE ENGINE
// ----------------------------------------------------

function drawPixelCharacterSprite(ctx: CanvasRenderingContext2D, char: CharacterEntity, tick: number) {
  const isBudi = char.asset.includes('budi');
  const cx = Math.round(char.x);
  const cy = Math.round(char.y);

  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(1.25, 1.25);
  ctx.translate(-cx, -cy);

  let stepOffset = 0;
  let bobY = 0;
  let armSwing = 0;

  if (char.isWalking) {
    stepOffset = Math.sin(char.stepCycle) * 10;
    armSwing = Math.cos(char.stepCycle) * 8;
    bobY = Math.abs(Math.sin(char.stepCycle)) * 6;
  } else if (char.emotion === 'celebrate' || char.emotion === 'happy') {
    bobY = Math.abs(Math.sin(tick * 0.25)) * 16;
    armSwing = -14;
  } else if (char.emotion === 'idle') {
    bobY = Math.sin(tick * 0.08) * 3;
  }

  const baseCy = cy - bobY;

  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.beginPath();
  ctx.ellipse(cx, cy + 32, 22, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(cx - 12 - stepOffset, baseCy + 24, 10, 10);
  ctx.fillRect(cx + 2 + stepOffset, baseCy + 24, 10, 10);

  ctx.fillStyle = isBudi ? '#1e3a8a' : '#be185d';
  ctx.fillRect(cx - 12 - stepOffset * 0.6, baseCy + 14, 10, 12);
  ctx.fillRect(cx + 2 + stepOffset * 0.6, baseCy + 14, 10, 12);

  ctx.fillStyle = isBudi ? '#2563eb' : '#f43f5e';
  ctx.fillRect(cx - 16, baseCy - 10, 32, 26);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 5, baseCy - 10, 10, 8);

  ctx.fillStyle = '#fed7aa';
  if (armSwing < -5) {
    ctx.fillRect(cx - 24, baseCy - 18, 8, 20);
    ctx.fillRect(cx + 16, baseCy - 18, 8, 20);
  } else {
    ctx.fillRect(cx - 22 + armSwing, baseCy - 6, 7, 20);
    ctx.fillRect(cx + 15 - armSwing, baseCy - 6, 7, 20);
  }

  ctx.fillStyle = '#fed7aa';
  ctx.fillRect(cx - 18, baseCy - 44, 36, 34);

  if (isBudi) {
    ctx.fillStyle = '#1c1917';
    ctx.fillRect(cx - 20, baseCy - 52, 40, 14);
    ctx.fillRect(cx - 20, baseCy - 44, 8, 12);
    ctx.fillRect(cx + 12, baseCy - 44, 8, 12);
  } else {
    ctx.fillStyle = '#292524';
    ctx.fillRect(cx - 20, baseCy - 52, 40, 14);
    ctx.fillRect(cx - 24, baseCy - 44, 8, 24);
    ctx.fillRect(cx + 16, baseCy - 44, 8, 24);
    ctx.fillStyle = '#ec4899';
    ctx.fillRect(cx - 8, baseCy - 56, 16, 8);
  }

  ctx.fillStyle = '#0f172a';
  if (char.emotion === 'happy' || char.emotion === 'celebrate') {
    ctx.fillRect(cx - 10, baseCy - 30, 6, 3);
    ctx.fillRect(cx + 4, baseCy - 30, 6, 3);
  } else {
    ctx.fillRect(cx - 11, baseCy - 32, 6, 8);
    ctx.fillRect(cx + 5, baseCy - 32, 6, 8);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx - 10, baseCy - 32, 3, 3);
    ctx.fillRect(cx + 6, baseCy - 32, 3, 3);
  }

  if (char.emotion === 'talk') {
    const mouthOpen = Math.sin(tick * 0.4) > 0;
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(cx - 4, baseCy - 18, 8, mouthOpen ? 7 : 3);
  } else if (char.emotion === 'celebrate' || char.emotion === 'happy') {
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(cx - 5, baseCy - 18, 10, 5);
  } else if (char.emotion === 'think') {
    ctx.fillStyle = '#334155';
    ctx.fillRect(cx - 3, baseCy - 17, 7, 3);
  } else {
    ctx.fillStyle = '#e11d48';
    ctx.fillRect(cx - 4, baseCy - 17, 8, 3);
  }

  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(cx - 30, baseCy + 38, 60, 20, 10);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 12px "Fredoka", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(char.name, cx, baseCy + 52);

  ctx.restore();
}

// ----------------------------------------------------
// 32PX PIXEL OBJECT SPRITES
// ----------------------------------------------------

function drawPixelObjectSprite(ctx: CanvasRenderingContext2D, obj: ObjectEntity, tick: number) {
  const ox = Math.round(obj.x);
  const oy = Math.round(obj.y + obj.bounceOffset);

  ctx.save();
  ctx.translate(ox, oy);
  ctx.scale(1.35, 1.35);
  ctx.translate(-ox, -oy);

  if (obj.bounceOffset < 0) {
    obj.bounceOffset += 1.5;
  }

  if (obj.isHighlighted) {
    const pulse = Math.sin(tick * 0.15) * 6;
    ctx.fillStyle = 'rgba(250, 204, 21, 0.45)';
    ctx.beginPath();
    ctx.arc(ox, oy, 22 + pulse, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.beginPath();
  ctx.ellipse(ox, obj.groundY + 12, 16, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  switch (obj.type) {
    case 'apple': {
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.arc(ox - 5, oy, 11, 0, Math.PI * 2);
      ctx.arc(ox + 5, oy, 11, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(ox, oy, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(ox - 6, oy - 7, 4, 4);

      ctx.fillStyle = '#78350f';
      ctx.fillRect(ox - 1.5, oy - 18, 3, 7);

      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.ellipse(ox + 5, oy - 16, 6, 3, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'marble': {
      const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];
      const baseColor = colors[obj.colorIdx % colors.length];

      ctx.fillStyle = baseColor;
      ctx.beginPath();
      ctx.arc(ox, oy, 13, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.beginPath();
      ctx.arc(ox - 2, oy - 2, 7, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(ox - 6, oy - 6, 5, 5);
      break;
    }

    case 'coin': {
      ctx.fillStyle = '#d97706';
      ctx.beginPath();
      ctx.arc(ox, oy, 14, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.arc(ox, oy, 11, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#b45309';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('★', ox, oy);
      break;
    }

    case 'star': {
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(
          ox + Math.cos(((18 + i * 72) * Math.PI) / 180) * 16,
          oy - Math.sin(((18 + i * 72) * Math.PI) / 180) * 16
        );
        ctx.lineTo(
          ox + Math.cos(((54 + i * 72) * Math.PI) / 180) * 7,
          oy - Math.sin(((54 + i * 72) * Math.PI) / 180) * 7
        );
      }
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(ox - 2, oy - 2, 4, 4);
      break;
    }

    case 'cake': {
      ctx.fillStyle = '#fbcfe8';
      ctx.fillRect(ox - 14, oy - 8, 28, 18);
      ctx.fillStyle = '#fb7185';
      ctx.fillRect(ox - 14, oy - 2, 28, 6);
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(ox, oy - 12, 6, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'book': {
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(ox - 14, oy - 10, 28, 20);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(ox - 12, oy - 8, 11, 16);
      ctx.fillRect(ox + 1, oy - 8, 11, 16);
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(ox - 10, oy - 4, 7, 2);
      ctx.fillRect(ox - 10, oy, 7, 2);
      ctx.fillRect(ox + 3, oy - 4, 7, 2);
      ctx.fillRect(ox + 3, oy, 7, 2);
      break;
    }

    case 'flower': {
      const petalColors = ['#f43f5e', '#ec4899', '#fb7185', '#a855f7'];
      const color = petalColors[obj.colorIdx % petalColors.length];
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(ox - 2, oy, 4, 14);
      ctx.beginPath();
      ctx.ellipse(ox + 5, oy + 7, 5, 2.5, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(ox - 6, oy - 6, 6, 0, Math.PI * 2);
      ctx.arc(ox + 6, oy - 6, 6, 0, Math.PI * 2);
      ctx.arc(ox - 6, oy + 4, 6, 0, Math.PI * 2);
      ctx.arc(ox + 6, oy + 4, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(ox, oy - 1, 5, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'letter': {
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(ox - 12, oy - 12, 24, 24);
      ctx.fillStyle = '#fef3c7';
      ctx.fillRect(ox - 10, oy - 10, 20, 20);
      ctx.fillStyle = '#b45309';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const letters = ['A', 'B', 'C', 'D', 'E'];
      ctx.fillText(letters[obj.colorIdx % letters.length], ox, oy);
      break;
    }

    case 'balloon': {
      const balloonColors = ['#f43f5e', '#38bdf8', '#facc15', '#a855f7', '#4ade80'];
      const color = balloonColors[obj.colorIdx % balloonColors.length];

      // Balloon body (oval)
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.ellipse(ox, oy - 4, 12, 16, 0, 0, Math.PI * 2);
      ctx.fill();

      // Highlight sheen
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.beginPath();
      ctx.ellipse(ox - 4, oy - 9, 4, 7, -Math.PI / 6, 0, Math.PI * 2);
      ctx.fill();

      // Balloon knot
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(ox - 3, oy + 12);
      ctx.lineTo(ox + 3, oy + 12);
      ctx.lineTo(ox, oy + 15);
      ctx.closePath();
      ctx.fill();

      // Balloon string
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(ox, oy + 15);
      ctx.quadraticCurveTo(ox + 4, oy + 22, ox - 2, oy + 30);
      ctx.stroke();
      break;
    }
  }

  if (obj.countNumber !== undefined) {
    ctx.fillStyle = '#ef4444';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(ox, oy - 26, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'black 16px "Fredoka", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(obj.countNumber), ox, oy - 26);
  }

  ctx.restore();
}

function drawComicSpeechBubble(ctx: CanvasRenderingContext2D, x: number, y: number, text: string) {
  const maxWidth = 260;
  const padding = 14;

  ctx.font = 'bold 14px "Fredoka", sans-serif';
  ctx.textAlign = 'center';

  const boxW = Math.min(maxWidth, Math.max(140, ctx.measureText(text).width + padding * 2));
  const boxH = 50;

  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.roundRect(x - boxW / 2, y - boxH / 2, boxW, boxH, 16);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x - 8, y + boxH / 2);
  ctx.lineTo(x + 8, y + boxH / 2);
  ctx.lineTo(x, y + boxH / 2 + 10);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#0f172a';
  ctx.textBaseline = 'middle';

  if (text.length > 36) {
    const p1 = text.slice(0, 32) + '...';
    ctx.fillText(p1, x, y);
  } else {
    ctx.fillText(text, x, y);
  }
}
