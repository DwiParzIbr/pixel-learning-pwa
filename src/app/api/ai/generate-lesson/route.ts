import { NextRequest, NextResponse } from 'next/server';
import { StoryLesson } from '@/types/story';
import { validateLesson } from '@/lib/validation/mathValidator';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      subject = 'mathematics',
      topic = 'subtraction',
      difficulty = 1,
      theme = 'Taman Bunga',
      operandA = 10,
      operator = '-',
      operandB = 4,
    } = body;

    let result = 0;
    switch (operator) {
      case '+': result = operandA + operandB; break;
      case '-': result = Math.max(0, operandA - operandB); break;
      case '*': result = operandA * operandB; break;
      case '/': result = operandB !== 0 ? Math.floor(operandA / operandB) : 1; break;
      default: result = operandA - operandB;
    }

    const lessonId = `ai-${topic}-${Date.now().toString().slice(-5)}`;

    const generatedLesson: StoryLesson = {
      lessonId,
      levelId: topic === 'counting' ? 1 : topic === 'addition' ? 2 : topic === 'subtraction' ? 3 : 4,
      title: `Petualangan ${theme}: ${operandA} ${operator} ${operandB}`,
      subject,
      topic,
      difficulty,
      metadata: {
        ageGroup: '6-8',
        grade: 'SD Kelas 1',
        theme,
        mathFormula: {
          operandA,
          operator,
          operandB,
          result,
        },
      },
      learningObjective: [
        `Memahami operasi ${topic} dengan benda visual`,
        `Menyelesaikan masalah ${operandA} ${operator} ${operandB} = ${result}`,
      ],
      characters: [
        {
          id: 'budi',
          name: 'Budi',
          asset: 'character_budi',
          color: '#3b82f6',
          voiceProfile: { pitch: 1.25, rate: 0.95 },
        },
        {
          id: 'siti',
          name: 'Siti',
          asset: 'character_siti',
          color: '#ec4899',
          voiceProfile: { pitch: 1.35, rate: 0.92 },
        },
      ],
      scenes: [
        {
          id: 'scene_01',
          title: 'Awal Cerita',
          background: 'park',
          narration: `Budi berada di ${theme.toLowerCase()} sambil memegang ${operandA} kelereng warna-warni miliknya.`,
          actions: [
            { type: 'spawn_character', characterId: 'budi', position: { x: 200, y: 320 }, animation: 'idle' },
            { type: 'spawn_object', object: 'marble', owner: 'budi', quantity: operandA },
          ],
        },
        {
          id: 'scene_02',
          title: 'Pertemuan Sahabat',
          background: 'park',
          narration: 'Siti datang menghampiri Budi dengan ceria.',
          actions: [
            { type: 'spawn_character', characterId: 'siti', position: { x: 550, y: 320 }, animation: 'walk' },
            { type: 'animate_character', characterId: 'budi', animation: 'happy' },
          ],
        },
        {
          id: 'scene_03',
          title: 'Berbagi Benda',
          background: 'park',
          narration: `Budi memberikan ${operandB} kelereng kepada Siti agar bisa bermain bersama.`,
          actions: [
            { type: 'transfer_object', object: 'marble', from: 'budi', to: 'siti', quantity: operandB },
            { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
          ],
        },
        {
          id: 'scene_04',
          title: 'Menghitung Sisa',
          background: 'park',
          narration: `Berapakah sisa kelereng Budi sekarang?`,
          actions: [
            { type: 'animate_character', characterId: 'budi', animation: 'think' },
            { type: 'highlight_object', object: 'marble', owner: 'budi' },
          ],
        },
      ],
      question: {
        type: 'multiple_choice',
        question: `Berapa butir kelereng yang tersisa pada Budi?`,
        options: [
          { id: 'A', value: Math.max(1, result - 2), label: `${Math.max(1, result - 2)} Butir` },
          { id: 'B', value: Math.max(1, result - 1), label: `${Math.max(1, result - 1)} Butir` },
          { id: 'C', value: result, label: `${result} Butir` },
          { id: 'D', value: result + 2, label: `${result + 2} Butir` },
        ],
        correctAnswer: 'C',
        explanation: `${operandA} ${operator} ${operandB} = ${result}.`,
        hint: `Coba kurangi ${operandB} langkah dari ${operandA}.`,
        visualHint: {
          formula: `${operandA} ${operator} ${operandB} = ${result}`,
          initialCount: operandA,
          transferCount: operandB,
          remainingCount: result,
          itemType: 'marble',
        },
      },
      rewardXp: 50,
    };

    const validation = validateLesson(generatedLesson);

    return NextResponse.json({
      success: true,
      lesson: generatedLesson,
      validation,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
