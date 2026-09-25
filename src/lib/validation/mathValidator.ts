import { StoryLesson, SceneAction } from '@/types/story';

export interface ValidationIssue {
  type: 'error' | 'warning' | 'info';
  category: 'schema' | 'math' | 'scene_consistency' | 'question' | 'audio';
  message: string;
  field?: string;
}

export interface ValidationResult {
  isValid: boolean;
  score: number; // 0 - 100
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
  infos: ValidationIssue[];
}

export function validateMathEquation(
  opA: number,
  operator: string,
  opB: number,
  expectedResult: number
): boolean {
  switch (operator) {
    case '+':
      return opA + opB === expectedResult;
    case '-':
      return opA - opB === expectedResult;
    case '*':
      return opA * opB === expectedResult;
    case '/':
      return opB !== 0 && opA / opB === expectedResult;
    case '>':
      return (opA > opB) === (expectedResult === 1);
    case '<':
      return (opA < opB) === (expectedResult === 1);
    default:
      return false;
  }
}

export function validateLesson(lesson: StoryLesson): ValidationResult {
  const errors: ValidationIssue[] = [];
  const warnings: ValidationIssue[] = [];
  const infos: ValidationIssue[] = [];

  // 1. Basic Metadata validation
  if (!lesson.lessonId || lesson.lessonId.trim().length === 0) {
    errors.push({ type: 'error', category: 'schema', message: 'Lesson ID wajib diisi.', field: 'lessonId' });
  }
  if (!lesson.title || lesson.title.trim().length === 0) {
    errors.push({ type: 'error', category: 'schema', message: 'Judul lesson wajib diisi.', field: 'title' });
  }
  if (!lesson.learningObjective || lesson.learningObjective.length === 0) {
    warnings.push({ type: 'warning', category: 'schema', message: 'Sebaiknya cantumkan minimal 1 Learning Objective.', field: 'learningObjective' });
  }

  // 2. Character validation
  const charIds = new Set<string>();
  if (!lesson.characters || lesson.characters.length === 0) {
    errors.push({ type: 'error', category: 'scene_consistency', message: 'Lesson harus memiliki minimal 1 karakter.', field: 'characters' });
  } else {
    for (const c of lesson.characters) {
      if (!c.id || !c.name) {
        errors.push({ type: 'error', category: 'schema', message: `Karakter harus memiliki id dan nama lengkap.`, field: 'characters' });
      }
      charIds.add(c.id);
    }
  }

  // 3. Scene validation & consistency check
  if (!lesson.scenes || lesson.scenes.length === 0) {
    errors.push({ type: 'error', category: 'scene_consistency', message: 'Lesson harus memiliki minimal 1 scene.', field: 'scenes' });
  } else {
    const characterInventory: Record<string, Record<string, number>> = {};
    for (const id of charIds) {
      characterInventory[id] = {};
    }

    lesson.scenes.forEach((scene, sceneIndex) => {
      if (!scene.narration || scene.narration.trim().length === 0) {
        warnings.push({
          type: 'warning',
          category: 'audio',
          message: `Scene ${sceneIndex + 1} (${scene.id}) tidak memiliki teks narasi untuk dibacakan voice engine.`,
          field: `scenes[${sceneIndex}].narration`,
        });
      }

      for (const action of scene.actions) {
        // Validate character references
        if (action.characterId && !charIds.has(action.characterId)) {
          errors.push({
            type: 'error',
            category: 'scene_consistency',
            message: `Karakter '${action.characterId}' pada scene ${sceneIndex + 1} belum terdaftar di daftar characters.`,
            field: `scenes[${sceneIndex}].actions`,
          });
        }

        // Validate inventory logic for transfers
        if (action.type === 'spawn_object' && action.owner && action.object && action.quantity) {
          if (!characterInventory[action.owner]) {
            characterInventory[action.owner] = {};
          }
          characterInventory[action.owner][action.object] = (characterInventory[action.owner][action.object] || 0) + action.quantity;
        }

        if (action.type === 'transfer_object' && action.from && action.to && action.object && action.quantity) {
          const fromCount = characterInventory[action.from]?.[action.object] || 0;
          if (fromCount < action.quantity) {
            warnings.push({
              type: 'warning',
              category: 'math',
              message: `Transfer ${action.quantity} ${action.object} dari '${action.from}' ke '${action.to}' melebihi stok yang tercatat (${fromCount}).`,
              field: `scenes[${sceneIndex}].actions`,
            });
          }
          // Update tracking
          if (characterInventory[action.from]) {
            characterInventory[action.from][action.object] = Math.max(0, fromCount - action.quantity);
          }
          if (characterInventory[action.to]) {
            characterInventory[action.to][action.object] = (characterInventory[action.to][action.object] || 0) + action.quantity;
          }
        }
      }
    });
  }

  // 4. Question & Deterministic Math Validation
  const q = lesson.question;
  if (!q) {
    errors.push({ type: 'error', category: 'question', message: 'Pertanyaan interaktif wajib ada dalam lesson.', field: 'question' });
  } else {
    if (!q.question || q.question.trim().length === 0) {
      errors.push({ type: 'error', category: 'question', message: 'Teks pertanyaan tidak boleh kosong.', field: 'question.question' });
    }
    if (!q.options || q.options.length < 2) {
      errors.push({ type: 'error', category: 'question', message: 'Pilihan jawaban minimal harus ada 2 opsi (A & B).', field: 'question.options' });
    } else {
      const correctOpt = q.options.find(opt => opt.id === q.correctAnswer);
      if (!correctOpt) {
        errors.push({
          type: 'error',
          category: 'question',
          message: `Kunci jawaban '${q.correctAnswer}' tidak ditemukan di antara pilihan opsi yang tersedia (${q.options.map(o => o.id).join(', ')}).`,
          field: 'question.correctAnswer',
        });
      }

      // Check duplicate option values
      const values = q.options.map(o => String(o.value).trim());
      const uniqueValues = new Set(values);
      if (uniqueValues.size !== values.length) {
        warnings.push({
          type: 'warning',
          category: 'question',
          message: 'Terdapat pilihan jawaban ganda yang memiliki nilai sama.',
          field: 'question.options',
        });
      }

      // Mathematical consistency check with formula if metadata exists
      if (lesson.metadata?.mathFormula) {
        const { operandA, operator, operandB, result } = lesson.metadata.mathFormula;
        const isMathCorrect = validateMathEquation(operandA, operator, operandB, result);
        if (!isMathCorrect) {
          errors.push({
            type: 'error',
            category: 'math',
            message: `Kalkulasi matematika tidak konsisten: ${operandA} ${operator} ${operandB} bukan ${result}.`,
            field: 'metadata.mathFormula',
          });
        }

        if (correctOpt && Number(correctOpt.value) !== result) {
          warnings.push({
            type: 'warning',
            category: 'math',
            message: `Nilai jawaban benar (${correctOpt.value}) tidak sama dengan hasil kalkulasi formula (${result}).`,
            field: 'question.correctAnswer',
          });
        }
      }
    }

    if (!q.hint) {
      infos.push({
        type: 'info',
        category: 'question',
        message: 'Disarankan menyertakan hint agar sistem adaptive remedial dapat memandu anak saat salah.',
        field: 'question.hint',
      });
    }
  }

  // 5. Remedial check
  if (!lesson.remedialStory) {
    infos.push({
      type: 'info',
      category: 'scene_consistency',
      message: 'Belum ada remedial story. Disarankan untuk mendukung anak yang kesulitan pada percobaan ke-3.',
      field: 'remedialStory',
    });
  }

  const score = Math.max(0, 100 - (errors.length * 30) - (warnings.length * 10));
  const isValid = errors.length === 0;

  return {
    isValid,
    score,
    errors,
    warnings,
    infos,
  };
}
