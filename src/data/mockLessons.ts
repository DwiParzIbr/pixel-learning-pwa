import { LevelDef, StoryLesson, SubjectDef, SubjectType } from '@/types/story';
import {
  additionLesson2,
  additionLesson3,
  additionLesson4,
  additionLesson5,
  subtractionLesson2,
  subtractionLesson3,
  subtractionLesson4,
  subtractionLesson5,
  comparisonLesson2,
  comparisonLesson3,
  comparisonLesson4,
  comparisonLesson5,
  multiplicationLesson2,
  multiplicationLesson3,
  multiplicationLesson4,
  multiplicationLesson5,
  divisionLesson2,
  divisionLesson3,
  divisionLesson4,
  divisionLesson5,
  finalAdventureLesson2,
  finalAdventureLesson3,
  finalAdventureLesson4,
  finalAdventureLesson5,
} from './mathLevelLessons';
import {
  scienceAnimalsLesson2,
  scienceAnimalsLesson3,
  scienceAnimalsLesson4,
  scienceAnimalsLesson5,
  sciencePlantsLesson2,
  sciencePlantsLesson3,
  sciencePlantsLesson4,
  sciencePlantsLesson5,
  scienceWeatherLesson2,
  scienceWeatherLesson3,
  scienceWeatherLesson4,
  scienceWeatherLesson5,
  scienceSpaceLesson2,
  scienceSpaceLesson3,
  scienceSpaceLesson4,
  scienceSpaceLesson5,
  scienceSensoryLesson1,
  scienceSensoryLesson2,
  scienceSensoryLesson3,
  scienceSensoryLesson4,
  scienceSensoryLesson5,
  scienceMatterLesson1,
  scienceMatterLesson2,
  scienceMatterLesson3,
  scienceMatterLesson4,
  scienceMatterLesson5,
  scienceEnergyLesson1,
  scienceEnergyLesson2,
  scienceEnergyLesson3,
  scienceEnergyLesson4,
  scienceEnergyLesson5,
} from './scienceLevelLessons';
import {
  languageAlphabetLesson2,
  languageAlphabetLesson3,
  languageAlphabetLesson4,
  languageAlphabetLesson5,
  languageSpellingLesson2,
  languageSpellingLesson3,
  languageSpellingLesson4,
  languageSpellingLesson5,
  languageAntonymsLesson2,
  languageAntonymsLesson3,
  languageAntonymsLesson4,
  languageAntonymsLesson5,
  languageStoryLesson2,
  languageStoryLesson3,
  languageStoryLesson4,
  languageStoryLesson5,
  languageSynonymsLesson1,
  languageSynonymsLesson2,
  languageSynonymsLesson3,
  languageSynonymsLesson4,
  languageSynonymsLesson5,
  languageSentenceLesson1,
  languageSentenceLesson2,
  languageSentenceLesson3,
  languageSentenceLesson4,
  languageSentenceLesson5,
  languageLiteratureLesson1,
  languageLiteratureLesson2,
  languageLiteratureLesson3,
  languageLiteratureLesson4,
  languageLiteratureLesson5,
} from './languageLevelLessons';

export const canonicalSubtractionLesson: StoryLesson = {
  lessonId: 'math-subtraction-001',
  levelId: 3,
  title: 'Soal 1: Kelereng Budi dan Siti',
  subject: 'mathematics',
  topic: 'subtraction',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1-2',
    theme: 'Taman Kelereng',
    mathFormula: {
      operandA: 10,
      operator: '-',
      operandB: 4,
      result: 6,
    },
  },
  learningObjective: [
    'Memahami konsep pengurangan sebagai mengambil atau memberikan objek',
    'Menghitung pengurangan bilangan 10 - 4 = 6 dengan objek visual',
  ],
  characters: [
    {
      id: 'budi',
      name: 'Budi',
      asset: 'character_budi',
      color: '#3b82f6',
      personality: 'Penasaran, ramah, dan suka bermain kelereng',
      voiceProfile: { pitch: 1.25, rate: 0.95 },
    },
    {
      id: 'siti',
      name: 'Siti',
      asset: 'character_siti',
      color: '#ec4899',
      personality: 'Ceria, suka belajar, dan sahabat baik Budi',
      voiceProfile: { pitch: 1.35, rate: 0.92 },
    },
  ],
  scenes: [
    {
      id: 'scene_01',
      title: 'Budi di Taman',
      background: 'park',
      narration: 'Di suatu sore yang cerah di taman, Budi sedang bermain dengan gembira. Budi membawa sepuluh butir kelereng warna-warni kesayangannya!',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 200, y: 320 }, animation: 'idle' },
        { type: 'spawn_object', object: 'marble', owner: 'budi', quantity: 10, position: { x: 260, y: 340 } },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Wah, senangnya bermain kelereng di taman hari ini!',
      },
    },
    {
      id: 'scene_02',
      title: 'Siti Datang Berkunjung',
      background: 'park',
      narration: 'Tak lama kemudian, Siti sahabat Budi datang menyapa sambil tersenyum hangat.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 550, y: 320 }, animation: 'walk' },
        { type: 'animate_character', characterId: 'budi', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Halo Budi! Wah, kelerengmu banyak sekali dan berkilauan!',
      },
    },
    {
      id: 'scene_03',
      title: 'Berbagi Kelereng',
      background: 'park',
      narration: 'Budi adalah anak yang baik hati dan suka berbagi. Budi memberikan empat butir kelereng kepada Siti agar mereka bisa bermain bersama!',
      actions: [
        { type: 'transfer_object', object: 'marble', from: 'budi', to: 'siti', quantity: 4 },
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
        { type: 'animate_character', characterId: 'budi', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Ini untukmu Siti, empat kelereng. Sekarang kita bisa main bersama!',
      },
    },
    {
      id: 'scene_04',
      title: 'Menghitung Sisa',
      background: 'park',
      narration: 'Kelereng Budi yang semula ada sepuluh, kini telah diberikan empat kepada Siti. Berapakah sisa kelereng yang dipegang Budi sekarang?',
      actions: [
        { type: 'animate_character', characterId: 'budi', animation: 'think' },
        { type: 'highlight_object', object: 'marble', owner: 'budi' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Hmm, dari 10 kelerengku, sudah kuberikan 4 pada Siti. Berapa kelerengku sekarang ya?',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Berapa butir sisa kelereng Budi sekarang?',
    options: [
      { id: 'A', value: 4, label: '4 Butir' },
      { id: 'B', value: 5, label: '5 Butir' },
      { id: 'C', value: 6, label: '6 Butir' },
      { id: 'D', value: 7, label: '7 Butir' },
    ],
    correctAnswer: 'C',
    explanation: 'Awalnya Budi punya 10 kelereng. Diberikan 4 kelereng kepada Siti. 10 - 4 = 6 kelereng tersisa!',
    hint: 'Awalnya ada 10 kelereng. Coba hitung mundur 4 langkah: 9, 8, 7, 6!',
    visualHint: {
      formula: '10 - 4 = 6',
      initialCount: 10,
      transferCount: 4,
      remainingCount: 6,
      itemType: 'marble',
    },
  },
  remedialStory: {
    title: 'Cerita Remedial: Apel Manis Budi',
    narration: 'Yuk kita coba memahami dengan buah apel! Budi memetik 6 apel merah segar. Lalu ia memberikan 2 apel kepada temannya.',
    scenes: [
      {
        id: 'remedial_01',
        background: 'forest',
        narration: 'Budi memiliki 6 apel merah manis di keranjang.',
        actions: [
          { type: 'spawn_character', characterId: 'budi', position: { x: 250, y: 320 }, animation: 'idle' },
          { type: 'spawn_object', object: 'apple', owner: 'budi', quantity: 6, position: { x: 300, y: 340 } },
        ],
      },
      {
        id: 'remedial_02',
        background: 'forest',
        narration: 'Siti datang dan Budi memberikan 2 buah apel kepada Siti.',
        actions: [
          { type: 'spawn_character', characterId: 'siti', position: { x: 520, y: 320 }, animation: 'walk' },
          { type: 'transfer_object', object: 'apple', from: 'budi', to: 'siti', quantity: 2 },
        ],
      },
    ],
    question: {
      type: 'multiple_choice',
      question: 'Berapa buah sisa apel yang dimiliki Budi sekarang?',
      options: [
        { id: 'A', value: 3, label: '3 Apel' },
        { id: 'B', value: 4, label: '4 Apel' },
        { id: 'C', value: 5, label: '5 Apel' },
      ],
      correctAnswer: 'B',
      explanation: '6 apel dikurangi 2 apel sama dengan 4 apel tersisa.',
      hint: 'Hitung mundur 2 langkah dari 6: 5, lalu 4!',
      visualHint: {
        formula: '6 - 2 = 4',
        initialCount: 6,
        transferCount: 2,
        remainingCount: 4,
        itemType: 'apple',
      },
    },
  },
  rewardXp: 50,
};

export const countingLesson: StoryLesson = {
  lessonId: 'math-counting-001',
  levelId: 1,
  title: 'Soal 1: Memetik Apel Merah di Hutan',
  subject: 'mathematics',
  topic: 'counting',
  difficulty: 1,
  metadata: {
    ageGroup: '5-7',
    grade: 'TK-B / SD 1',
    theme: 'Hutan Ajaib',
    mathFormula: {
      operandA: 5,
      operator: '=',
      operandB: 5,
      result: 5,
    },
  },
  learningObjective: [
    'Mengenal lambang bilangan 1 sampai 10',
    'Menghitung jumlah objek nyata secara berurutan',
  ],
  characters: [
    {
      id: 'budi',
      name: 'Budi',
      asset: 'character_budi',
      color: '#3b82f6',
      voiceProfile: { pitch: 1.25, rate: 0.95 },
    },
  ],
  scenes: [
    {
      id: 'count_scene_1',
      title: 'Pohon Apel Ajaib',
      background: 'forest',
      narration: 'Budi sedang berjalan-jalan di Hutan Ajaib. Di bawah pohon yang rindang, jatuhlah lima buah apel merah segar!',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'apple', owner: 'budi', quantity: 5, position: { x: 380, y: 330 } },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Nyam! Apel-apel merah ini kelihatan manis sekali. Ada berapa ya semuanya?',
      },
    },
    {
      id: 'count_scene_2',
      title: 'Ayo Kita Hitung',
      background: 'forest',
      narration: 'Ayo bantu Budi menghitung apel-apel merah ini satu per satu dengan teliti!',
      actions: [
        { type: 'animate_character', characterId: 'budi', animation: 'happy' },
        { type: 'highlight_object', object: 'apple' },
      ],
    },
  ],
  question: {
    type: 'object_counting',
    question: 'Berapa banyak buah apel merah yang ada di hadapan Budi?',
    options: [
      { id: 'A', value: 3, label: '3 Apel' },
      { id: 'B', value: 4, label: '4 Apel' },
      { id: 'C', value: 5, label: '5 Apel' },
      { id: 'D', value: 6, label: '6 Apel' },
    ],
    correctAnswer: 'C',
    explanation: 'Ada 5 buah apel merah: satu, dua, tiga, empat, lima!',
    hint: 'Sentuh atau hitung setiap apel dari kiri ke kanan!',
    visualHint: {
      formula: 'Jumlah = 5',
      initialCount: 5,
      remainingCount: 5,
      itemType: 'apple',
    },
  },
  rewardXp: 50,
};

export const countingLesson2: StoryLesson = {
  lessonId: 'math-counting-002',
  levelId: 1,
  title: 'Soal 2: Balon Pesta Warna-Warni di Taman',
  subject: 'mathematics',
  topic: 'counting',
  difficulty: 1,
  metadata: {
    ageGroup: '5-7',
    grade: 'TK-B / SD 1',
    theme: 'Taman Bermain',
    mathFormula: {
      operandA: 4,
      operator: '=',
      operandB: 4,
      result: 4,
    },
  },
  learningObjective: [
    'Mengenal jumlah 4 objek konkret',
    'Menghubungkan benda melayang dengan lambang bilangan',
  ],
  characters: [
    {
      id: 'siti',
      name: 'Siti',
      asset: 'character_siti',
      color: '#ec4899',
      voiceProfile: { pitch: 1.35, rate: 0.95 },
    },
    {
      id: 'budi',
      name: 'Budi',
      asset: 'character_budi',
      color: '#3b82f6',
      voiceProfile: { pitch: 1.25, rate: 0.95 },
    },
  ],
  scenes: [
    {
      id: 'balloon_scene_1',
      title: 'Balon Terbang di Taman',
      background: 'park',
      narration: 'Siti membawa empat balon warna-warni yang ceria ke Taman Bermain. Angin sepoi-sepoi membuat balon melayang gembira!',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 260, y: 320 }, animation: 'happy' },
        { type: 'spawn_object', object: 'balloon', owner: 'siti', quantity: 4, position: { x: 380, y: 280 } },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Lihat balon-balonku yang indah melayang ditiup angin sepoi-sepoi!',
      },
    },
    {
      id: 'balloon_scene_2',
      title: 'Budi Ikut Menghitung',
      background: 'park',
      narration: 'Budi datang menghampiri dengan wajah riang gembira melihat balon-balon Siti.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 540, y: 320 }, animation: 'walk' },
        { type: 'highlight_object', object: 'balloon' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Wah, indah sekali Siti! Ayo kita hitung ada berapa balon yang terbang!',
      },
    },
  ],
  question: {
    type: 'object_counting',
    question: 'Berapa banyak balon warna-warni yang dibawa Siti di taman?',
    options: [
      { id: 'A', value: 3, label: '3 Balon' },
      { id: 'B', value: 4, label: '4 Balon' },
      { id: 'C', value: 5, label: '5 Balon' },
      { id: 'D', value: 6, label: '6 Balon' },
    ],
    correctAnswer: 'B',
    explanation: 'Hebat! Ada 4 balon warna-warni: satu, dua, tiga, empat!',
    hint: 'Perhatikan balon yang melayang di dekat Siti, hitung satu per satu ya!',
    visualHint: {
      formula: 'Jumlah = 4',
      initialCount: 4,
      remainingCount: 4,
      itemType: 'balloon',
    },
  },
  rewardXp: 50,
};

export const countingLesson3: StoryLesson = {
  lessonId: 'math-counting-003',
  levelId: 1,
  title: 'Soal 3: Cupcake Lezat di Toko Roti',
  subject: 'mathematics',
  topic: 'counting',
  difficulty: 1,
  metadata: {
    ageGroup: '5-7',
    grade: 'TK-B / SD 1',
    theme: 'Toko Roti Manis',
    mathFormula: {
      operandA: 6,
      operator: '=',
      operandB: 6,
      result: 6,
    },
  },
  learningObjective: [
    'Mengenal jumlah 6 objek berurutan',
    'Menghitung kue cupcake di atas nampan',
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
      voiceProfile: { pitch: 1.35, rate: 0.95 },
    },
  ],
  scenes: [
    {
      id: 'cake_scene_1',
      title: 'Aroma Harum Toko Roti',
      background: 'market',
      narration: 'Budi dan Siti berkunjung ke Toko Roti Manis. Di atas nampan piring saji, tersusun enam kue cupcake cokelat berhias krim stroberi!',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 520, y: 320 }, animation: 'idle' },
        { type: 'spawn_object', object: 'cake', quantity: 6, position: { x: 370, y: 340 } },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Aroma kuenya enak sekali! Ada deretan cupcake cokelat di atas nampan.',
      },
    },
    {
      id: 'cake_scene_2',
      title: 'Menghitung Kue Cupcake',
      background: 'market',
      narration: 'Siti ingin tahu berapa banyak cupcake manis yang siap disantap bersama!',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
        { type: 'highlight_object', object: 'cake' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Bantu kami menghitung ada berapa cupcake manis di atas meja ya!',
      },
    },
  ],
  question: {
    type: 'object_counting',
    question: 'Ada berapa jumlah kue cupcake lezat di atas meja toko roti?',
    options: [
      { id: 'A', value: 5, label: '5 Kue' },
      { id: 'B', value: 6, label: '6 Kue' },
      { id: 'C', value: 7, label: '7 Kue' },
      { id: 'D', value: 8, label: '8 Kue' },
    ],
    correctAnswer: 'B',
    explanation: 'Tepat sekali! Ada 6 kue cupcake lezat: 1, 2, 3, 4, 5, 6!',
    hint: 'Hitung cupcake dari piring kiri hingga ke kanan!',
    visualHint: {
      formula: 'Jumlah = 6',
      initialCount: 6,
      remainingCount: 6,
      itemType: 'cake',
    },
  },
  rewardXp: 50,
};

export const countingLesson4: StoryLesson = {
  lessonId: 'math-counting-004',
  levelId: 1,
  title: 'Soal 4: Bunga Matahari Mekar di Kebun Ceria',
  subject: 'mathematics',
  topic: 'counting',
  difficulty: 1,
  metadata: {
    ageGroup: '5-7',
    grade: 'TK-B / SD 1',
    theme: 'Kebun Bunga Ceria',
    mathFormula: {
      operandA: 7,
      operator: '=',
      operandB: 7,
      result: 7,
    },
  },
  learningObjective: [
    'Mengenal jumlah 7 objek alami',
    'Melatih ketelitian berhitung kelompok bunga',
  ],
  characters: [
    {
      id: 'siti',
      name: 'Siti',
      asset: 'character_siti',
      color: '#ec4899',
      voiceProfile: { pitch: 1.35, rate: 0.95 },
    },
    {
      id: 'budi',
      name: 'Budi',
      asset: 'character_budi',
      color: '#3b82f6',
      voiceProfile: { pitch: 1.25, rate: 0.95 },
    },
  ],
  scenes: [
    {
      id: 'flower_scene_1',
      title: 'Kebun Bunga Matahari',
      background: 'park',
      narration: 'Matahari pagi bersinar hangat di Kebun Ceria. Tujuh kuntum bunga cantik bermekaran menyambut pagi dengan ceria!',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 200, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'flower', quantity: 7, position: { x: 380, y: 340 } },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Bunga-bunga di kebun ini mekar sangat indah dan berwarna-warni!',
      },
    },
    {
      id: 'flower_scene_2',
      title: 'Budi Mengagumi Bunga',
      background: 'park',
      narration: 'Budi tersenyum bahagia melihat kebun yang asri dan penuh warna.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 550, y: 320 }, animation: 'celebrate' },
        { type: 'highlight_object', object: 'flower' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Ayo teman-teman, kita hitung berapa kuntum bunga yang sedang bermekaran!',
      },
    },
  ],
  question: {
    type: 'object_counting',
    question: 'Berapa banyak bunga cantik yang sedang bermekaran di kebun?',
    options: [
      { id: 'A', value: 6, label: '6 Bunga' },
      { id: 'B', value: 7, label: '7 Bunga' },
      { id: 'C', value: 8, label: '8 Bunga' },
      { id: 'D', value: 9, label: '9 Bunga' },
    ],
    correctAnswer: 'B',
    explanation: 'Pintar sekali! Ada 7 kuntum bunga cantik yang sedang bermekaran!',
    hint: 'Sentuh setiap bunga perlahan dan sebut angkanya secara berurutan!',
    visualHint: {
      formula: 'Jumlah = 7',
      initialCount: 7,
      remainingCount: 7,
      itemType: 'flower',
    },
  },
  rewardXp: 50,
};

export const countingLesson5: StoryLesson = {
  lessonId: 'math-counting-005',
  levelId: 1,
  title: 'Soal 5: Bintang Ajaib di Langit Malam',
  subject: 'mathematics',
  topic: 'counting',
  difficulty: 1,
  metadata: {
    ageGroup: '5-7',
    grade: 'TK-B / SD 1',
    theme: 'Langit Malam Hutan',
    mathFormula: {
      operandA: 8,
      operator: '=',
      operandB: 8,
      result: 8,
    },
  },
  learningObjective: [
    'Mengenal jumlah 8 objek berkilauan',
    'Menghitung bintang di angkasa secara fokus',
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
      voiceProfile: { pitch: 1.35, rate: 0.95 },
    },
  ],
  scenes: [
    {
      id: 'star_scene_1',
      title: 'Malam Berbintang',
      background: 'forest',
      narration: 'Malam yang tenang tiba di Hutan Ajaib. Di langit biru gelap, bertaburan delapan bintang ajaib yang berkilau keemasan!',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'idle' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 520, y: 320 }, animation: 'idle' },
        { type: 'spawn_object', object: 'star', quantity: 8, position: { x: 370, y: 260 } },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Bintang-bintang di angkasa bersinar terang seperti permata emas!',
      },
    },
    {
      id: 'star_scene_2',
      title: 'Menatap Bintang',
      background: 'forest',
      narration: 'Siti mengajak kita menghitung bintang sebelum waktu tidur tiba.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
        { type: 'highlight_object', object: 'star' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Yuk kita hitung bintang-bintang yang berkilau sebelum kita beristirahat!',
      },
    },
  ],
  question: {
    type: 'object_counting',
    question: 'Berapa banyak bintang ajaib yang berkelap-kelip terang di langit malam?',
    options: [
      { id: 'A', value: 7, label: '7 Bintang' },
      { id: 'B', value: 8, label: '8 Bintang' },
      { id: 'C', value: 9, label: '9 Bintang' },
      { id: 'D', value: 10, label: '10 Bintang' },
    ],
    correctAnswer: 'B',
    explanation: 'Luar biasa! Ada 8 bintang ajaib yang bersinar gemerlap di langit malam!',
    hint: 'Hitung bintang-bintang yang berkelap-kelip keemasan di langit!',
    visualHint: {
      formula: 'Jumlah = 8',
      initialCount: 8,
      remainingCount: 8,
      itemType: 'star',
    },
  },
  rewardXp: 50,
};

export const additionLesson: StoryLesson = {
  lessonId: 'math-addition-001',
  levelId: 2,
  title: 'Soal 1: Pesta Buah Stroberi & Jeruk Segar',
  subject: 'mathematics',
  topic: 'addition',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Kebun Ceria',
    mathFormula: {
      operandA: 3,
      operator: '+',
      operandB: 4,
      result: 7,
    },
  },
  learningObjective: [
    'Memahami konsep penjumlahan sebagai menggabungkan dua kelompok objek',
    'Menghitung hasil penjumlahan 3 + 4 = 7',
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
      id: 'add_scene_1',
      title: 'Stroberi Manis di Keranjang',
      background: 'market',
      narration: 'Budi dan Siti sedang memanen buah di Kebun Ceria. Budi memetik tiga buah stroberi merah yang manis.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'idle' },
        { type: 'spawn_object', object: 'apple', owner: 'budi', quantity: 3, position: { x: 280, y: 340 } },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Aku punya 3 buah stroberi merah yang manis dan segar!',
      },
    },
    {
      id: 'add_scene_2',
      title: 'Siti Menambahkan Jeruk',
      background: 'market',
      narration: 'Siti membawakan empat buah jeruk manis dan menggabungkannya ke dalam keranjang Budi!',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 520, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'apple', owner: 'siti', quantity: 4, position: { x: 450, y: 340 } },
        { type: 'animate_character', characterId: 'budi', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Aku tambahkan 4 buah jeruk segar ya Budi, sekarang buah kita terkumpul!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Berapakah total buah segar Budi dan Siti jika digabungkan di keranjang?',
    options: [
      { id: 'A', value: 6, label: '6 Buah' },
      { id: 'B', value: 7, label: '7 Buah' },
      { id: 'C', value: 8, label: '8 Buah' },
      { id: 'D', value: 9, label: '9 Buah' },
    ],
    correctAnswer: 'B',
    explanation: '3 stroberi ditambah 4 jeruk sama dengan 7 buah segar: 3 + 4 = 7!',
    hint: 'Mulai dari 3, lalu lanjutkan hitung maju 4 langkah: 4, 5, 6, 7!',
    visualHint: {
      formula: '3 + 4 = 7',
      initialCount: 3,
      transferCount: 4,
      remainingCount: 7,
      itemType: 'apple',
    },
  },
  rewardXp: 50,
};

export const comparisonLesson: StoryLesson = {
  lessonId: 'math-comparison-001',
  levelId: 4,
  title: 'Soal 1: Bintang Emas: Lebih Banyak Mana?',
  subject: 'mathematics',
  topic: 'comparison',
  difficulty: 2,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1-2',
    theme: 'Ruang Kelas Pintar',
    mathFormula: {
      operandA: 8,
      operator: '>',
      operandB: 5,
      result: 1,
    },
  },
  learningObjective: [
    'Membandingkan dua kelompok objek (lebih banyak, lebih sedikit, atau sama)',
    'Menentukan perbandingan antara bilangan 8 dan 5',
  ],
  characters: [
    {
      id: 'budi',
      name: 'Budi',
      asset: 'character_budi',
      color: '#3b82f6',
    },
    {
      id: 'siti',
      name: 'Siti',
      asset: 'character_siti',
      color: '#ec4899',
    },
  ],
  scenes: [
    {
      id: 'comp_scene_1',
      title: 'Koleksi Bintang Prestasi',
      background: 'classroom',
      narration: 'Di kelas, Budi memiliki 8 bintang emas, sedangkan Siti memiliki 5 bintang emas.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'idle' },
        { type: 'spawn_object', object: 'star', owner: 'budi', quantity: 8, position: { x: 280, y: 340 } },
        { type: 'spawn_character', characterId: 'siti', position: { x: 520, y: 320 }, animation: 'idle' },
        { type: 'spawn_object', object: 'star', owner: 'siti', quantity: 5, position: { x: 450, y: 340 } },
      ],
    },
  ],
  question: {
    type: 'comparison',
    question: 'Siapakah yang memiliki bintang emas lebih banyak?',
    options: [
      { id: 'A', value: 'Budi', label: 'Budi (8 Bintang)' },
      { id: 'B', value: 'Siti', label: 'Siti (5 Bintang)' },
      { id: 'C', value: 'Sama', label: 'Keduanya Sama Banyak' },
    ],
    correctAnswer: 'A',
    explanation: '8 lebih besar daripada 5 (8 > 5), sehingga Budi memiliki bintang lebih banyak!',
    hint: 'Bandingkan jumlahnya: Budi punya 8, Siti punya 5. Angka mana yang lebih besar?',
  },
  rewardXp: 60,
};

export const multiplicationLesson: StoryLesson = {
  lessonId: 'math-multiplication-001',
  levelId: 5,
  title: 'Soal 1: Tiga Keranjang Apel Ceria',
  subject: 'mathematics',
  topic: 'multiplication',
  difficulty: 2,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2',
    theme: 'Pasar Kebun',
    mathFormula: {
      operandA: 3,
      operator: '*',
      operandB: 3,
      result: 9,
    },
  },
  learningObjective: [
    'Memahami perkalian sebagai penjumlahan berulang',
    'Menghitung 3 kelompok yang masing-masing berisi 3 apel (3 x 3 = 9)',
  ],
  characters: [
    {
      id: 'budi',
      name: 'Budi',
      asset: 'character_budi',
      color: '#3b82f6',
    },
  ],
  scenes: [
    {
      id: 'mult_scene_1',
      title: 'Tiga Keranjang Apel',
      background: 'market',
      narration: 'Budi menata 3 keranjang di meja pasar. Setiap keranjang diisi 3 buah apel merah!',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'happy' },
        { type: 'spawn_object', object: 'apple', owner: 'budi', quantity: 9, position: { x: 380, y: 340 } },
      ],
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Jika ada 3 keranjang dan tiap keranjang berisi 3 apel, berapa jumlah semua apel?',
    options: [
      { id: 'A', value: 6, label: '6 Apel' },
      { id: 'B', value: 8, label: '8 Apel' },
      { id: 'C', value: 9, label: '9 Apel' },
      { id: 'D', value: 12, label: '12 Apel' },
    ],
    correctAnswer: 'C',
    explanation: '3 keranjang dikali 3 apel = 3 + 3 + 3 = 9 apel!',
    hint: 'Jumlahkan 3 sebanyak tiga kali: 3 + 3 + 3 = ?',
    visualHint: {
      formula: '3 x 3 = 9',
      initialCount: 9,
      itemType: 'apple',
    },
  },
  rewardXp: 60,
};

export const divisionLesson: StoryLesson = {
  lessonId: 'math-division-001',
  levelId: 6,
  title: 'Soal 1: Membagi Kue Ulang Tahun Adil',
  subject: 'mathematics',
  topic: 'division',
  difficulty: 3,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2-3',
    theme: 'Rumah Pesta',
    mathFormula: {
      operandA: 8,
      operator: '/',
      operandB: 2,
      result: 4,
    },
  },
  learningObjective: [
    'Memahami konsep pembagian sebagai membagi sama rata ke dalam kelompok',
    'Menghitung 8 dibagi 2 sama dengan 4',
  ],
  characters: [
    {
      id: 'budi',
      name: 'Budi',
      asset: 'character_budi',
      color: '#3b82f6',
    },
    {
      id: 'siti',
      name: 'Siti',
      asset: 'character_siti',
      color: '#ec4899',
    },
  ],
  scenes: [
    {
      id: 'div_scene_1',
      title: 'Delapan Potong Kue Lezat',
      background: 'park',
      narration: 'Budi dan Siti memiliki 8 potong kue manis. Mereka ingin membaginya sama rata berdua.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 200, y: 320 }, animation: 'idle' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 550, y: 320 }, animation: 'idle' },
        { type: 'spawn_object', object: 'cake', quantity: 8, position: { x: 380, y: 340 } },
      ],
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Jika 8 kue dibagi sama rata untuk Budi dan Siti (2 orang), berapa kue yang didapat masing-masing?',
    options: [
      { id: 'A', value: 2, label: '2 Potong' },
      { id: 'B', value: 3, label: '3 Potong' },
      { id: 'C', value: 4, label: '4 Potong' },
      { id: 'D', value: 5, label: '5 Potong' },
    ],
    correctAnswer: 'C',
    explanation: '8 kue dibagi 2 orang: masing-masing mendapatkan 4 potong kue (8 ÷ 2 = 4)!',
    hint: 'Coba bagi 8 menjadi dua bagian yang sama banyak: 4 dan 4!',
  },
  rewardXp: 70,
};

export const finalAdventureLesson: StoryLesson = {
  lessonId: 'math-final-001',
  levelId: 7,
  title: 'Soal 1: Gerbang Kastil: Kristal Bintang Ajaib',
  subject: 'mathematics',
  topic: 'general',
  difficulty: 3,
  metadata: {
    ageGroup: '7-10',
    grade: 'SD Kelas 2-3',
    theme: 'Kastil Kerajaan Pixel',
    mathFormula: {
      operandA: 15,
      operator: '-',
      operandB: 7,
      result: 8,
    },
  },
  learningObjective: [
    'Menyelesaikan soal tantangan gabungan',
    'Menemukan kunci gerbang kastil dengan menyelesaikan tantangan matematika',
  ],
  characters: [
    {
      id: 'budi',
      name: 'Budi',
      asset: 'character_budi',
      color: '#3b82f6',
    },
    {
      id: 'siti',
      name: 'Siti',
      asset: 'character_siti',
      color: '#ec4899',
    },
  ],
  scenes: [
    {
      id: 'final_scene_1',
      title: 'Di Depan Gerbang Kastil',
      background: 'castle',
      narration: 'Budi dan Siti akhirnya tiba di depan Gerbang Kastil Ajaib! Pintu kastil terkunci oleh teka-teki kristal bercahaya.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 320, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'star', quantity: 15, position: { x: 480, y: 300 } },
        { type: 'animate_character', characterId: 'budi', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Lihat gerbang megah itu! Kita butuh menghitung kristal untuk membukanya!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Ada 15 kristal bintang bercahaya. Jika 7 kristal digunakan untuk membuka gerbang, berapa kristal yang tersisa?',
    options: [
      { id: 'A', value: 7, label: '7 Kristal' },
      { id: 'B', value: 8, label: '8 Kristal' },
      { id: 'C', value: 9, label: '9 Kristal' },
      { id: 'D', value: 10, label: '10 Kristal' },
    ],
    correctAnswer: 'B',
    explanation: '15 kristal dikurangi 7 kristal sama dengan 8 kristal (15 - 7 = 8)! Gerbang kastil berhasil dibuka!',
    hint: 'Hitung 15 - 7 = ? Ingat: 7 + 8 = 15!',
  },
  rewardXp: 100,
};

export const mockMathLevels: LevelDef[] = [
  {
    id: 1,
    title: 'Level 1 — Mengenal Angka',
    subtitle: '5 Petualangan Berhitung di Alam Ceria',
    topic: 'counting',
    environment: 'forest',
    icon: '🍎',
    requiredXp: 0,
    description: 'Kenali angka 1 sampai 10 melalui 5 kisah seru: apel merah, balon warna-warni, cupcake lezat, bunga matahari, dan bintang malam!',
    lessons: [
      countingLesson,
      countingLesson2,
      countingLesson3,
      countingLesson4,
      countingLesson5,
    ],
  },
  {
    id: 2,
    title: 'Level 2 — Penjumlahan',
    subtitle: '5 Petualangan Menjumlahkan Buah & Benda Ceria',
    topic: 'addition',
    environment: 'market',
    icon: '🍓',
    requiredXp: 50,
    description: 'Gabungkan buah stroberi, balon, buku, bunga, dan cupcake lezat bersama Budi dan Siti dalam 5 kisah penjumlahan seru.',
    lessons: [
      additionLesson,
      additionLesson2,
      additionLesson3,
      additionLesson4,
      additionLesson5,
    ],
  },
  {
    id: 3,
    title: 'Level 3 — Pengurangan',
    subtitle: '5 Kisah Pengurangan Kelereng, Apel & Balon',
    topic: 'subtraction',
    environment: 'park',
    icon: '🔮',
    requiredXp: 100,
    description: 'Bantu Budi dan Siti menghitung sisa kelereng, buah apel, balon terbang, donat, dan koin bintang ajaib dalam 5 petualangan seru.',
    lessons: [
      canonicalSubtractionLesson,
      subtractionLesson2,
      subtractionLesson3,
      subtractionLesson4,
      subtractionLesson5,
    ],
  },
  {
    id: 4,
    title: 'Level 4 — Perbandingan',
    subtitle: '5 Tantangan Membandingkan Koleksi Benda',
    topic: 'comparison',
    environment: 'classroom',
    icon: '⭐',
    requiredXp: 160,
    description: 'Bandingkan jumlah bintang emas, buku cerita, balon festival, buah apel, dan kelereng berkilau untuk menemukan yang lebih banyak atau sama banyak.',
    lessons: [
      comparisonLesson,
      comparisonLesson2,
      comparisonLesson3,
      comparisonLesson4,
      comparisonLesson5,
    ],
  },
  {
    id: 5,
    title: 'Level 5 — Perkalian Dasar',
    subtitle: '5 Petualangan Menghitung Kelompok Perkalian',
    topic: 'multiplication',
    environment: 'market',
    icon: '🧺',
    requiredXp: 220,
    description: 'Pelajari konsep perkalian sebagai penjumlahan berulang melalui keranjang apel, piring cupcake, ikat bunga matahari, krayon, dan bintang keberuntungan.',
    lessons: [
      multiplicationLesson,
      multiplicationLesson2,
      multiplicationLesson3,
      multiplicationLesson4,
      multiplicationLesson5,
    ],
  },
  {
    id: 6,
    title: 'Level 6 — Pembagian Dasar',
    subtitle: '5 Kisah Membagi Makanan & Benda Sama Rata',
    topic: 'division',
    environment: 'park',
    icon: '🍰',
    requiredXp: 280,
    description: 'Belajar membagi makanan, buah segar, kelereng toples, permen pelangi, dan bunga secara adil dan sama rata untuk sahabat-sahabat.',
    lessons: [
      divisionLesson,
      divisionLesson2,
      divisionLesson3,
      divisionLesson4,
      divisionLesson5,
    ],
  },
  {
    id: 7,
    title: 'Level 7 — Final Adventure',
    subtitle: '5 Misi Pamungkas Membuka Rahasia Kastil Kerajaan',
    topic: 'general',
    environment: 'castle',
    icon: '🏰',
    requiredXp: 350,
    description: 'Ujian pamungkas 5 babak (gerbang kristal, jembatan pelangi, menara obor, ruang ramuan, dan peti harta karun) untuk menjadi Pahlawan Angka Sejati di Kastil Pixel!',
    lessons: [
      finalAdventureLesson,
      finalAdventureLesson2,
      finalAdventureLesson3,
      finalAdventureLesson4,
      finalAdventureLesson5,
    ],
  },
];

// ==========================================
// 🔬 SAINS & ALAM CILIK
// ==========================================
export const scienceAnimalsLesson: StoryLesson = {
  lessonId: 'science-animals-001',
  levelId: 101,
  title: 'Soal 1: Burung Merpati di Rimba Hijau',
  subject: 'science',
  topic: 'science_animals',
  difficulty: 1,
  learningObjective: ['Mengenal ciri khas hewan di alam', 'Mengidentifikasi hewan yang memiliki sayap dan bulu'],
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
      id: 'sci_anim_1',
      title: 'Mendengar Kicauan Burung',
      background: 'forest',
      narration: 'Budi dan Siti berjalan di tepi hutan yang sejuk. Mereka mendengar suara kicauan burung yang sangat merdu di atas dahan pohon rindang!',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 200, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 300, y: 320 }, animation: 'walk' },
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Dengarkan Budi! Suara burung berkicau riang sekali menyambut pagi!',
      },
    },
    {
      id: 'sci_anim_2',
      title: 'Mengamati Ciri Hewan',
      background: 'forest',
      narration: 'Burung merpati hinggap di dahan. Ia memiliki sepasang sayap berbulu halus, dua kaki kecil, dan paruh untuk mematuk biji-bijian.',
      actions: [
        { type: 'animate_character', characterId: 'budi', animation: 'think' },
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Wah hebat ya, dengan sayapnya burung bisa terbang tinggi di angkasa!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Hewan apakah yang memiliki sayap berbulu indah, berparuh, dan dapat terbang di udara?',
    options: [
      { id: 'A', value: 'Ikan', label: 'Ikan Mas' },
      { id: 'B', value: 'Burung', label: 'Burung Merpati' },
      { id: 'C', value: 'Kucing', label: 'Kucing Rumahan' },
    ],
    correctAnswer: 'B',
    explanation: 'Burung adalah hewan yang memiliki sepasang sayap, berbulu, dan mampu terbang bebas di udara!',
    hint: 'Hewan ini suka berkicau di pohon dan mengepakkan sayapnya.',
  },
  rewardXp: 50,
};

export const sciencePlantsLesson: StoryLesson = {
  lessonId: 'science-plants-001',
  levelId: 102,
  title: 'Soal 1: Merawat Tanaman & Bagian Bunga',
  subject: 'science',
  topic: 'science_plants',
  difficulty: 1,
  learningObjective: ['Mengenal bagian utama tanaman', 'Memahami fungsi akar menyerap air tanah'],
  characters: [
    {
      id: 'siti',
      name: 'Siti',
      asset: 'character_siti',
      color: '#ec4899',
      voiceProfile: { pitch: 1.35, rate: 0.92 },
    },
    {
      id: 'budi',
      name: 'Budi',
      asset: 'character_budi',
      color: '#3b82f6',
      voiceProfile: { pitch: 1.25, rate: 0.95 },
    },
  ],
  scenes: [
    {
      id: 'sci_plant_1',
      title: 'Taman Bunga Siti',
      background: 'park',
      narration: 'Siti sedang merawat tanaman bunga di kebun. Bunga-bunga berwarna merah dan kuning mekar dengan indahnya di bawah sinar matahari.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 220, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'flower', quantity: 3, position: { x: 380, y: 340 } },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Bunga-bunga ini butuh air dan sinar mentari agar tetap mekar berseri!',
      },
    },
    {
      id: 'sci_plant_2',
      title: 'Rahasia di Bawah Tanah',
      background: 'park',
      narration: 'Budi datang dan bertanya bagaimana tanaman bisa minum air. Siti menjelaskan bahwa ada akar yang menyerap air dari dalam tanah.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 520, y: 320 }, animation: 'walk' },
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Oh, jadi akar di dalam tanah itu seperti sedotan untuk tanaman minum ya!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Bagian tumbuhan manakah yang berada di dalam tanah untuk menyerap air dan mineral?',
    options: [
      { id: 'A', value: 'Akar', label: 'Akar' },
      { id: 'B', value: 'Daun', label: 'Daun Hijau' },
      { id: 'C', value: 'Bunga', label: 'Kelopak Bunga' },
    ],
    correctAnswer: 'A',
    explanation: 'Akar menancap kokoh di dalam tanah dan bertugas menyerap air serta zat hara untuk seluruh tanaman!',
    hint: 'Bagian ini tersembunyi di dalam tanah di bawah batang tanaman.',
  },
  rewardXp: 50,
};

export const scienceWeatherLesson: StoryLesson = {
  lessonId: 'science-weather-001',
  levelId: 103,
  title: 'Soal 1: Keajaiban Cuaca & Siklus Hujan',
  subject: 'science',
  topic: 'science_weather',
  difficulty: 2,
  learningObjective: ['Memahami proses terjadinya hujan dari awan', 'Mengenal manfaat hujan bagi bumi'],
  characters: [
    {
      id: 'budi',
      name: 'Budi',
      asset: 'character_budi',
      color: '#3b82f6',
      voiceProfile: { pitch: 1.25, rate: 0.95 },
    },
  ],
  scenes: [
    {
      id: 'sci_weath_1',
      title: 'Awan Abu-abu di Langit',
      background: 'park',
      narration: 'Langit taman yang cerah perlahan berganti teduh. Gumpalan awan tebal mengumpul dan tetesan air hujan yang sejuk mulai turun membasahi dedaunan.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 300, y: 320 }, animation: 'surprised' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Hore, hujan turun! Udara jadi sejuk dan tanaman tidak kehausan lagi!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Dari manakah tetesan air hujan di langit berasal?',
    options: [
      { id: 'A', value: 'Awan', label: 'Gumpalan Awan yang Mengembun' },
      { id: 'B', value: 'Angin', label: 'Tiupan Angin Gunung' },
      { id: 'C', value: 'Bintang', label: 'Kilauan Bintang' },
    ],
    correctAnswer: 'A',
    explanation: 'Uap air di bumi menguap ke udara, berkumpul membentuk awan, lalu turun kembali ke bumi sebagai air hujan!',
    hint: 'Lihatlah ke langit sebelum hujan, benda bulat kelabu itu adalah awan.',
  },
  rewardXp: 60,
};

export const scienceSpaceLesson: StoryLesson = {
  lessonId: 'science-space-001',
  levelId: 104,
  title: 'Soal 1: Terangnya Sinar Mentari di Siang Hari',
  subject: 'science',
  topic: 'science_space',
  difficulty: 2,
  learningObjective: ['Mengenal benda penerang siang dan malam', 'Membedakan matahari dan bulan'],
  characters: [
    {
      id: 'budi',
      name: 'Budi',
      asset: 'character_budi',
      color: '#3b82f6',
    },
    {
      id: 'siti',
      name: 'Siti',
      asset: 'character_siti',
      color: '#ec4899',
    },
  ],
  scenes: [
    {
      id: 'sci_space_1',
      title: 'Menatap Langit Malam',
      background: 'castle',
      narration: 'Di menara kastil yang tinggi, Budi dan Siti menatap angkasa. Ribuan bintang berkilauan menemani rembulan yang bulat terang.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'idle' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 320, y: 320 }, animation: 'idle' },
        { type: 'spawn_object', object: 'star', quantity: 5, position: { x: 450, y: 260 } },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Bintang di malam hari indah sekali! Tapi kalau siang hari, matahari yang paling terang ya Budi!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Benda langit apakah yang memberikan cahaya terang dan rasa hangat di siang hari?',
    options: [
      { id: 'A', value: 'Bulan', label: 'Bulan Purnama' },
      { id: 'B', value: 'Matahari', label: 'Matahari' },
      { id: 'C', value: 'Komet', label: 'Komet Ekor' },
    ],
    correctAnswer: 'B',
    explanation: 'Matahari adalah bintang raksasa paling dekat dengan bumi yang menyinari kita setiap siang hari!',
    hint: 'Benda ini terbit di pagi hari dari sebelah timur.',
  },
  rewardXp: 70,
};

export const mockScienceLevels: LevelDef[] = [
  {
    id: 101,
    title: 'Level 1 — Sahabat Hewan',
    subtitle: '5 Kisah Ciri, Makanan & Siklus Hewan',
    topic: 'science_animals',
    environment: 'forest',
    icon: '🐦',
    requiredXp: 0,
    description: 'Kenali burung bersayap, ikan perenang, hewan herbivora pemakan rumput, metamorfosis kupu-kupu, dan hewan bertelur bersama Budi & Siti.',
    lessons: [
      scienceAnimalsLesson,
      scienceAnimalsLesson2,
      scienceAnimalsLesson3,
      scienceAnimalsLesson4,
      scienceAnimalsLesson5,
    ],
  },
  {
    id: 102,
    title: 'Level 2 — Tanaman & Bunga',
    subtitle: '5 Rahasia Bagian & Pertumbuhan Tumbuhan',
    topic: 'science_plants',
    environment: 'park',
    icon: '🌸',
    requiredXp: 40,
    description: 'Pelajari akar penyerap air, daun hijau pembuat makanan, buah manis pelindung biji, tunas kecambah baru, dan batang pohon yang kokoh.',
    lessons: [
      sciencePlantsLesson,
      sciencePlantsLesson2,
      sciencePlantsLesson3,
      sciencePlantsLesson4,
      sciencePlantsLesson5,
    ],
  },
  {
    id: 103,
    title: 'Level 3 — Rahasia Cuaca & Air',
    subtitle: '5 Petualangan Awan, Pelangi & Siklus Air',
    topic: 'science_weather',
    environment: 'park',
    icon: '🌧️',
    requiredXp: 90,
    description: 'Temukan bagaimana hujan turun dari awan, lengkungan 7 warna pelangi, hembusan angin sejuk, 2 musim di Nusantara, dan siklus air bersih di bumi.',
    lessons: [
      scienceWeatherLesson,
      scienceWeatherLesson2,
      scienceWeatherLesson3,
      scienceWeatherLesson4,
      scienceWeatherLesson5,
    ],
  },
  {
    id: 104,
    title: 'Level 4 — Tata Surya & Angkasa',
    subtitle: '5 Ekspedisi Matahari, Bulan & Planet Bumi',
    topic: 'science_space',
    environment: 'castle',
    icon: '☀️',
    requiredXp: 150,
    description: 'Jelajahi matahari sumber cahaya, kilau lembut bulan purnama, rotasi bumi penyebab siang-malam, planet bumi biru, dan roket astronot.',
    lessons: [
      scienceSpaceLesson,
      scienceSpaceLesson2,
      scienceSpaceLesson3,
      scienceSpaceLesson4,
      scienceSpaceLesson5,
    ],
  },
  {
    id: 105,
    title: 'Level 5 — Panca Indra & Tubuh Sehat',
    subtitle: '5 Kehebatan Mata, Telinga, Hidung, Lidah & Kulit',
    topic: 'science_nature',
    environment: 'classroom',
    icon: '👁️',
    requiredXp: 220,
    description: 'Mengenal 5 indra manusia: mata pelihat warna, telinga pendengar bunyi, hidung pencium aroma, lidah pengecap rasa, dan kulit peraba sentuhan.',
    lessons: [
      scienceSensoryLesson1,
      scienceSensoryLesson2,
      scienceSensoryLesson3,
      scienceSensoryLesson4,
      scienceSensoryLesson5,
    ],
  },
  {
    id: 106,
    title: 'Level 6 — Benda & Wujud Zat',
    subtitle: '5 Percobaan Benda Padat, Cair, Gas & Perubahannya',
    topic: 'science_nature',
    environment: 'market',
    icon: '🧊',
    requiredXp: 300,
    description: 'Pelajari sifat benda padat yang kokoh, benda cair yang mengalir, gas pengisi balon, es batu mencair terkena panas, dan benda terapung vs tenggelam.',
    lessons: [
      scienceMatterLesson1,
      scienceMatterLesson2,
      scienceMatterLesson3,
      scienceMatterLesson4,
      scienceMatterLesson5,
    ],
  },
  {
    id: 107,
    title: 'Level 7 — Petualangan Sains Pamungkas',
    subtitle: '5 Misi Magnet, Cahaya, Bayangan & Kelestarian Bumi',
    topic: 'science_nature',
    environment: 'castle',
    icon: '🧲',
    requiredXp: 400,
    description: 'Tantangan akhir sains: daya tarik magnet pada besi, sumber cahaya senter, pembentukan bayangan gelap, panas matahari pengering baju, dan menjaga bumi lestari!',
    lessons: [
      scienceEnergyLesson1,
      scienceEnergyLesson2,
      scienceEnergyLesson3,
      scienceEnergyLesson4,
      scienceEnergyLesson5,
    ],
  },
];

// ==========================================
// 📖 BAHASA & MEMBACA
// ==========================================
export const languageVowelsLesson: StoryLesson = {
  lessonId: 'lang-vowels-001',
  levelId: 201,
  title: 'Soal 1: Mengenal 5 Huruf Vokal A-I-U-E-O',
  subject: 'language',
  topic: 'language_letters',
  difficulty: 1,
  learningObjective: ['Mengenal dan melafalkan 5 huruf vokal', 'Menemukan contoh kata dengan huruf vokal'],
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
      id: 'lang_vow_1',
      title: 'Papan Tulis Huruf Ajaib',
      background: 'classroom',
      narration: 'Di dalam kelas pintar, Budi dan Siti bernyanyi riang mengenal huruf vokal: A, I, U, E, dan O!',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'happy' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 340, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'letter', quantity: 5, position: { x: 480, y: 320 } },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'A - I - U - E - O! Huruf vokal membuat kata berbunyi nyaring dan jelas!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Manakah kelompok huruf yang merupakan 5 huruf vokal bahasa Indonesia?',
    options: [
      { id: 'A', value: 'A-I-U-E-O', label: 'A, I, U, E, O' },
      { id: 'B', value: 'B-C-D-F-G', label: 'B, C, D, F, G' },
      { id: 'C', value: 'K-L-M-N-P', label: 'K, L, M, N, P' },
    ],
    correctAnswer: 'A',
    explanation: 'Huruf vokal (huruf hidup) ada 5 yaitu A, I, U, E, dan O. Contoh: Apel, Ikan, Udang, Elang, Ombak!',
    hint: 'Huruf-huruf ini bunyinya paling terbuka dan nyaring di mulut.',
  },
  rewardXp: 50,
};

export const languageSpellingLesson: StoryLesson = {
  lessonId: 'lang-spelling-001',
  levelId: 202,
  title: 'Soal 1: Mengeja Kata B-U-K-U',
  subject: 'language',
  topic: 'language_spelling',
  difficulty: 1,
  learningObjective: ['Mengeja suku kata sederhana BU-KU', 'Melengkapi huruf yang hilang'],
  characters: [
    {
      id: 'budi',
      name: 'Budi',
      asset: 'character_budi',
      color: '#3b82f6',
      voiceProfile: { pitch: 1.25, rate: 0.95 },
    },
  ],
  scenes: [
    {
      id: 'lang_spell_1',
      title: 'Buku Cerita Bergambar',
      background: 'classroom',
      narration: 'Budi memegang buku cerita bergambar kesayangannya. Buku adalah jendela dunia yang penuh petualangan!',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'happy' },
        { type: 'spawn_object', object: 'book', quantity: 1, position: { x: 380, y: 330 } },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Ayo teman-teman, bantu aku mengeja kata: B - U - K - U!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Huruf apakah yang tepat untuk melengkapi kata: B - U - K - [ ... ] ?',
    options: [
      { id: 'A', value: 'A', label: 'Huruf A (Buka)' },
      { id: 'B', value: 'U', label: 'Huruf U (Buku)' },
      { id: 'C', value: 'I', label: 'Huruf I (Buki)' },
    ],
    correctAnswer: 'B',
    explanation: 'Kata yang benar untuk benda bacaan adalah B-U-K-U (Buku)!',
    hint: 'Bunyi akhir kata ini berakhiran -KU.',
  },
  rewardXp: 50,
};

export const languageAntonymsLesson: StoryLesson = {
  lessonId: 'lang-antonyms-001',
  levelId: 203,
  title: 'Soal 1: Lawan Kata: Besar vs Kecil',
  subject: 'language',
  topic: 'language_antonyms',
  difficulty: 1,
  learningObjective: ['Mengenal konsep antonim (lawan kata)', 'Menemukan lawan kata dari besar, yaitu kecil'],
  characters: [
    {
      id: 'siti',
      name: 'Siti',
      asset: 'character_siti',
      color: '#ec4899',
      voiceProfile: { pitch: 1.35, rate: 0.92 },
    },
    {
      id: 'budi',
      name: 'Budi',
      asset: 'character_budi',
      color: '#3b82f6',
      voiceProfile: { pitch: 1.25, rate: 0.95 },
    },
  ],
  scenes: [
    {
      id: 'lang_ant_1',
      title: 'Membandingkan Dua Ukuran',
      background: 'park',
      narration: 'Siti membawa buah semangka yang BESAR, sedangkan Budi membawa sebutir anggur yang KECIL di tangannya.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 220, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'budi', position: { x: 500, y: 320 }, animation: 'walk' },
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Semangka ini besar sekali! Kalau anggur Budi ukurannya mungil dan kecil ya!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Gajah memiliki tubuh yang BESAR, sedangkan semut memiliki tubuh yang ... ? (Lawan kata BESAR)',
    options: [
      { id: 'A', value: 'Tinggi', label: 'Tinggi' },
      { id: 'B', value: 'Kecil', label: 'Kecil' },
      { id: 'C', value: 'Berat', label: 'Berat' },
    ],
    correctAnswer: 'B',
    explanation: 'Lawan kata (antonim) dari BESAR adalah KECIL. Gajah itu besar, semut itu kecil!',
    hint: 'Bila sesuatu tidak besar, maka ukurannya mungil atau...?',
  },
  rewardXp: 60,
};

export const languageStoryLesson: StoryLesson = {
  lessonId: 'lang-story-001',
  levelId: 204,
  title: 'Soal 1: Cerita Burung Pipit yang Rajin',
  subject: 'language',
  topic: 'language_comprehension',
  difficulty: 2,
  learningObjective: ['Memahami isi cerita sederhana', 'Menarik kesimpulan positif dari bacaan'],
  characters: [
    {
      id: 'budi',
      name: 'Budi',
      asset: 'character_budi',
      color: '#3b82f6',
    },
  ],
  scenes: [
    {
      id: 'lang_story_1',
      title: 'Sarang Hangat Sebelum Hujan',
      background: 'forest',
      narration: 'Setiap pagi Burung Pipit rajin mengumpulkan ranting kering untuk membangun sarang yang kokoh agar anak-anaknya hangat dan tidak kehujanan.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Burung Pipit sangat rajin bersiap-siap sebelum musim hujan tiba!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Mengapa Burung Pipit rajin membuat sarang yang kokoh sebelum musim hujan tiba?',
    options: [
      { id: 'A', value: 'Hangat', label: 'Agar sarangnya hangat dan terlindung dari air hujan' },
      { id: 'B', value: 'Bermain', label: 'Hanya untuk bermain-main' },
      { id: 'C', value: 'Tidur', label: 'Supaya bisa tidur seharian' },
    ],
    correctAnswer: 'A',
    explanation: 'Burung Pipit rajin mempersiapkan sarang agar ia dan anak-anaknya aman serta hangat saat hujan turun!',
    hint: 'Sarang burung adalah rumah pelindung dari cuaca dingin dan basah.',
  },
  rewardXp: 70,
};

export const mockLanguageLevels: LevelDef[] = [
  {
    id: 201,
    title: 'Level 1 — Huruf Vokal & Alfabet Ceria',
    subtitle: '5 Kisah Bunyi Huruf, Vokal & Abjad',
    topic: 'language_letters',
    environment: 'classroom',
    icon: '🔤',
    requiredXp: 0,
    description: 'Kenali 5 huruf vokal A-I-U-E-O, huruf pertama nama benda, huruf konsonan B, dan urutan alfabet bersama Budi & Siti.',
    lessons: [
      languageVowelsLesson,
      languageAlphabetLesson2,
      languageAlphabetLesson3,
      languageAlphabetLesson4,
      languageAlphabetLesson5,
    ],
  },
  {
    id: 202,
    title: 'Level 2 — Mengeja Kata Benda',
    subtitle: '5 Tantangan Mengeja Buku, Meja, Bola & Susu',
    topic: 'language_spelling',
    environment: 'classroom',
    icon: '📘',
    requiredXp: 40,
    description: 'Belajar mengeja kata benda sehari-hari: B-U-K-U, M-E-J-A, B-O-L-A, S-U-S-U, dan T-O-P-I secara tepat dan menyenangkan.',
    lessons: [
      languageSpellingLesson,
      languageSpellingLesson2,
      languageSpellingLesson3,
      languageSpellingLesson4,
      languageSpellingLesson5,
    ],
  },
  {
    id: 203,
    title: 'Level 3 — Lawan Kata (Antonim)',
    subtitle: '5 Pasang Lawan Kata Ukuran, Suhu & Waktu',
    topic: 'language_antonyms',
    environment: 'park',
    icon: '🐘',
    requiredXp: 90,
    description: 'Pahami pasangan antonim: Besar vs Kecil, Tinggi vs Pendek, Panas vs Dingin, Cepat vs Lambat, dan Siang vs Malam.',
    lessons: [
      languageAntonymsLesson,
      languageAntonymsLesson2,
      languageAntonymsLesson3,
      languageAntonymsLesson4,
      languageAntonymsLesson5,
    ],
  },
  {
    id: 204,
    title: 'Level 4 — Dongeng Bergambar & Makna',
    subtitle: '5 Cerita Fabel Penuh Pesan Moral Kebaikan',
    topic: 'language_comprehension',
    environment: 'forest',
    icon: '📜',
    requiredXp: 150,
    description: 'Simak dongeng seru: Burung Pipit rajin, Semut gotong royong, Kura-kura pantang menyerah, Kancil cerdik, dan Lebah penjaga bunga.',
    lessons: [
      languageStoryLesson,
      languageStoryLesson2,
      languageStoryLesson3,
      languageStoryLesson4,
      languageStoryLesson5,
    ],
  },
  {
    id: 205,
    title: 'Level 5 — Persamaan Kata (Sinonim)',
    subtitle: '5 Kosa Kata Indah yang Bermakna Sama',
    topic: 'language_antonyms',
    environment: 'park',
    icon: '🌟',
    requiredXp: 220,
    description: 'Kembangkan perbendaharaan kata dengan sinonim: Senang=Gembira, Pintar=Cerdas, Indah=Cantik, Sahabat=Teman, dan Halaman=Pekarangan.',
    lessons: [
      languageSynonymsLesson1,
      languageSynonymsLesson2,
      languageSynonymsLesson3,
      languageSynonymsLesson4,
      languageSynonymsLesson5,
    ],
  },
  {
    id: 206,
    title: 'Level 6 — Menyusun Kalimat Pintar',
    subtitle: '5 Misi Menyusun Kata Menjadi Kalimat Utuh (S-P-O)',
    topic: 'language_comprehension',
    environment: 'classroom',
    icon: '📝',
    requiredXp: 300,
    description: 'Rangkai kalimat teratur: Budi membaca buku, Siti menyiram bunga, kata kerja aktivitas, kata tanya Siapa, dan tanda baca tepat.',
    lessons: [
      languageSentenceLesson1,
      languageSentenceLesson2,
      languageSentenceLesson3,
      languageSentenceLesson4,
      languageSentenceLesson5,
    ],
  },
  {
    id: 207,
    title: 'Level 7 — Petualangan Sastra Cilik',
    subtitle: '5 Misi Pantun, Teka-Teki & Mahkota Raja Literasi',
    topic: 'language_comprehension',
    environment: 'castle',
    icon: '👑',
    requiredXp: 400,
    description: 'Tantangan sastra pamungkas: rima pantun a-b-a-b, teka-teki buku, ungkapan kutu buku, peribahasa rajin pangkal pandai, dan mahkota literasi!',
    lessons: [
      languageLiteratureLesson1,
      languageLiteratureLesson2,
      languageLiteratureLesson3,
      languageLiteratureLesson4,
      languageLiteratureLesson5,
    ],
  },
];

// ==========================================
// 💖 BUDI PEKERTI & KARAKTER
// ==========================================
export const characterPolitenessLesson: StoryLesson = {
  lessonId: 'char-politeness-001',
  levelId: 301,
  title: 'Tiga Kata Ajaib: Tolong, Maaf, Terima Kasih',
  subject: 'character',
  topic: 'character_politeness',
  difficulty: 1,
  learningObjective: ['Membiasakan mengucap kata maaf saat berbuat salah', 'Menjaga kerukunan antar sahabat'],
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
      id: 'char_pol_1',
      title: 'Pensil Warna yang Terjatuh',
      background: 'classroom',
      narration: 'Saat berjalan di kelas, Budi tidak sengaja menyenggol meja Siti sehingga pensil warna Siti terjatuh ke lantai.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 200, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 480, y: 320 }, animation: 'idle' },
        { type: 'animate_character', characterId: 'budi', animation: 'surprised' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Wah, maafkan aku ya Siti, aku tidak sengaja menyenggol mejamu!',
      },
    },
    {
      id: 'char_pol_2',
      title: 'Saling Memaafkan dan Menolong',
      background: 'classroom',
      narration: 'Budi dengan sigap membantu memungut pensil itu, lalu Siti tersenyum hangat dan mengucapkan terima kasih.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
        { type: 'animate_character', characterId: 'budi', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Tidak apa-apa Budi, terima kasih banyak sudah membantuku merapikannya kembali!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Kata ajaib apakah yang harus kita ucapkan saat tidak sengaja berbuat salah kepada teman?',
    options: [
      { id: 'A', value: 'Maaf', label: 'Mengucapkan Maaf' },
      { id: 'B', value: 'Biarin', label: 'Mendiamkannya Saja' },
      { id: 'C', value: 'Lari', label: 'Pergi Berlari' },
    ],
    correctAnswer: 'A',
    explanation: 'Meminta maaf dengan tulus adalah perbuatan ksatria yang sangat mulia dan membuat pertemanan selalu rukun!',
    hint: 'Kata ini diucapkan dengan lembut saat kita menyadari kesalahan kita.',
  },
  rewardXp: 50,
};

export const characterSharingLesson: StoryLesson = {
  lessonId: 'char-sharing-001',
  levelId: 302,
  title: 'Indahnya Berbagi dengan Sahabat',
  subject: 'character',
  topic: 'character_sharing',
  difficulty: 1,
  learningObjective: ['Menumbuhkan empati dan kerelaan berbagi', 'Merasakan kebahagiaan saat menolong teman'],
  characters: [
    {
      id: 'siti',
      name: 'Siti',
      asset: 'character_siti',
      color: '#ec4899',
      voiceProfile: { pitch: 1.35, rate: 0.92 },
    },
    {
      id: 'budi',
      name: 'Budi',
      asset: 'character_budi',
      color: '#3b82f6',
      voiceProfile: { pitch: 1.25, rate: 0.95 },
    },
  ],
  scenes: [
    {
      id: 'char_shar_1',
      title: 'Kue Manis di Taman',
      background: 'park',
      narration: 'Siti membawa dua potong kue manis yang lezat. Budi belum sempat makan siang karena bekalnya tertinggal di rumah.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 240, y: 320 }, animation: 'idle' },
        { type: 'spawn_character', characterId: 'budi', position: { x: 480, y: 320 }, animation: 'idle' },
        { type: 'spawn_object', object: 'cake', quantity: 2, position: { x: 360, y: 340 } },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Budi, ini sepotong kue untukmu! Ayo kita makan bersama-sama!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Bagaimana perasaan teman kita saat kita mau berbagi makanan atau mainan dengannya?',
    options: [
      { id: 'A', value: 'Sedih', label: 'Sedih dan Kecewa' },
      { id: 'B', value: 'Senang', label: 'Sangat Gembira dan Bahagia' },
      { id: 'C', value: 'Takut', label: 'Takut dan Menangis' },
    ],
    correctAnswer: 'B',
    explanation: 'Berbagi membawa kegembiraan bagi sesama teman dan membuat persahabatan terasa semakin manis!',
    hint: 'Tersenyum lebar dan hati merasa gembira.',
  },
  rewardXp: 50,
};

export const characterCleanlinessLesson: StoryLesson = {
  lessonId: 'char-clean-001',
  levelId: 303,
  title: 'Pahlawan Kebersihan Lingkungan',
  subject: 'character',
  topic: 'character_cleanliness',
  difficulty: 1,
  learningObjective: ['Membiasakan membuang sampah pada tempatnya', 'Menjaga alam dan fasilitas umum tetap bersih'],
  characters: [
    {
      id: 'budi',
      name: 'Budi',
      asset: 'character_budi',
      color: '#3b82f6',
    },
  ],
  scenes: [
    {
      id: 'char_cln_1',
      title: 'Taman yang Asri dan Bersih',
      background: 'park',
      narration: 'Setelah selesai minum jus buah kotak, Budi mencari tong sampah di taman agar tidak ada sampah yang berserakan di rumput hijau.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'walk' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Taman yang bersih membuat semua orang nyaman bermain. Sampah ini harus kubuang ke tempat sampah!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Di manakah tempat yang tepat untuk membuang bungkus snack atau botol minuman bekas?',
    options: [
      { id: 'A', value: 'TempatSampah', label: 'Di Tempat Sampah' },
      { id: 'B', value: 'Sungai', label: 'Dilempar ke Aliran Sungai' },
      { id: 'C', value: 'Jalanan', label: 'Ditinggal di Lantai/Jalanan' },
    ],
    correctAnswer: 'A',
    explanation: 'Membuang sampah di tempat sampah menjaga bumi kita tetap sehat, bersih, dan bebas banjir!',
    hint: 'Wadah khusus penampung barang yang tidak terpakai lagi.',
  },
  rewardXp: 60,
};

export const characterHealthyLesson: StoryLesson = {
  lessonId: 'char-healthy-001',
  levelId: 304,
  title: 'Kebiasaan Sehat & Cuci Tangan',
  subject: 'character',
  topic: 'character_healthy',
  difficulty: 1,
  learningObjective: ['Memahami pentingnya mencuci tangan sebelum makan', 'Menjaga kesehatan tubuh dari kuman'],
  characters: [
    {
      id: 'budi',
      name: 'Budi',
      asset: 'character_budi',
      color: '#3b82f6',
    },
    {
      id: 'siti',
      name: 'Siti',
      asset: 'character_siti',
      color: '#ec4899',
    },
  ],
  scenes: [
    {
      id: 'char_hlth_1',
      title: 'Mencuci Tangan Pakai Sabun',
      background: 'classroom',
      narration: 'Sebelum membuka kotak bekal makan siang, Siti mengajak Budi mencuci tangan dengan sabun dan air bersih yang mengalir.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'budi', position: { x: 420, y: 320 }, animation: 'walk' },
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Cuci tangan pakai sabun dulu ya Budi, supaya kuman-kuman jahat kabur dan perut kita sehat!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Mengapa kita harus mencuci tangan menggunakan sabun sebelum makan?',
    options: [
      { id: 'A', value: 'Kuman', label: 'Agar kuman dan bakteri mati sehingga perut kita sehat' },
      { id: 'B', value: 'Basah', label: 'Hanya agar tangan kita basah saja' },
      { id: 'C', value: 'Main', label: 'Supaya bisa bermain busa sabun' },
    ],
    correctAnswer: 'A',
    explanation: 'Sabun dan air mengalir ampuh membunuh kuman penyakit agar tidak ikut tertelan saat kita makan!',
    hint: 'Tangan kita menyentuh banyak benda, sehingga butuh dibersihkan dari kuman jahat.',
  },
  rewardXp: 60,
};

export const mockCharacterLevels: LevelDef[] = [
  {
    id: 301,
    title: 'Level 1 — Tiga Kata Ajaib',
    subtitle: 'Tolong, Maaf, dan Terima Kasih',
    topic: 'character_politeness',
    environment: 'classroom',
    icon: '🤝',
    requiredXp: 0,
    description: 'Belajar sopan santun dan pentingnya meminta maaf saat tidak sengaja berbuat salah.',
    lessons: [characterPolitenessLesson],
  },
  {
    id: 302,
    title: 'Level 2 — Indahnya Berbagi',
    subtitle: 'Membawa senyum bagi sahabat',
    topic: 'character_sharing',
    environment: 'park',
    icon: '🎁',
    requiredXp: 40,
    description: 'Tumbuhkan empati dan rasakan kebahagiaan saat berbagi bekal dengan teman.',
    lessons: [characterSharingLesson],
  },
  {
    id: 303,
    title: 'Level 3 — Jaga Kebersihan',
    subtitle: 'Membuang sampah pada tempatnya',
    topic: 'character_cleanliness',
    environment: 'park',
    icon: '🗑️',
    requiredXp: 90,
    description: 'Jadilah pahlawan lingkungan dengan menjaga taman tetap bersih dan asri.',
    lessons: [characterCleanlinessLesson],
  },
  {
    id: 304,
    title: 'Level 4 — Kebiasaan Sehat',
    subtitle: 'Cuci tangan bersih sebelum makan',
    topic: 'character_healthy',
    environment: 'classroom',
    icon: '🧼',
    requiredXp: 150,
    description: 'Bina kebiasaan sehat melindungi tubuh dari kuman jahat.',
    lessons: [characterHealthyLesson],
  },
];

// ==========================================
// 🧩 LOGIKA & ASAH OTAK
// ==========================================
export const logicPatternsLesson: StoryLesson = {
  lessonId: 'logic-pattern-001',
  levelId: 401,
  title: 'Menemukan Pola Warna Ceria',
  subject: 'logic',
  topic: 'logic_patterns',
  difficulty: 1,
  learningObjective: ['Mengenali pola berulang ABAB', 'Memprediksi urutan warna berikutnya'],
  characters: [
    {
      id: 'budi',
      name: 'Budi',
      asset: 'character_budi',
      color: '#3b82f6',
      voiceProfile: { pitch: 1.25, rate: 0.95 },
    },
  ],
  scenes: [
    {
      id: 'log_pat_1',
      title: 'Pola Ubin Warna-Warni',
      background: 'park',
      narration: 'Budi melompat di atas ubin taman yang berpola teratur: Merah, Biru, Merah, Biru... Warna apakah ubin berikutnya?',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'marble', quantity: 4, position: { x: 380, y: 340 } },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Lihat polanya: Merah, Biru, Merah, Biru... Setelah Biru, kembali ke warna apa ya?',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Perhatikan pola berikut: Merah - Biru - Merah - Biru - [ ... ]. Warna apakah selanjutnya?',
    options: [
      { id: 'A', value: 'Kuning', label: 'Warna Kuning' },
      { id: 'B', value: 'Merah', label: 'Warna Merah' },
      { id: 'C', value: 'Hijau', label: 'Warna Hijau' },
    ],
    correctAnswer: 'B',
    explanation: 'Polanya adalah bergantian selang-seling: Merah, Biru, Merah, Biru, lalu kembali lagi ke Merah!',
    hint: 'Lihat pola pengulangan: Merah, lalu Biru. Setelah Biru, selalu kembali ke...?',
  },
  rewardXp: 50,
};

export const logicOddOneOutLesson: StoryLesson = {
  lessonId: 'logic-odd-001',
  levelId: 402,
  title: 'Mencari Benda yang Berbeda',
  subject: 'logic',
  topic: 'logic_shapes',
  difficulty: 1,
  learningObjective: ['Mengelompokkan benda sejenis', 'Mengidentifikasi benda yang bukan termasuk dalam kelompok'],
  characters: [
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
      id: 'log_odd_1',
      title: 'Meja Pasar Buah',
      background: 'market',
      narration: 'Di meja pasar ada keranjang berisi buah Apel, buah Pisang, buah Jeruk, dan sebatang Pensil Tulis.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'apple', quantity: 3, position: { x: 420, y: 340 } },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Hmm, ada satu benda di keranjang ini yang bukan buah-buahan. Yang mana ya?',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Di antara: Apel, Jeruk, Pisang, dan Pensil Tulis. Benda manakah yang BUKAN merupakan buah?',
    options: [
      { id: 'A', value: 'Apel', label: 'Apel Merah' },
      { id: 'B', value: 'Jeruk', label: 'Jeruk Manis' },
      { id: 'C', value: 'Pensil', label: 'Pensil Tulis' },
    ],
    correctAnswer: 'C',
    explanation: 'Pensil Tulis adalah alat untuk menggambar atau menulis, bukan jenis makanan atau buah-buahan!',
    hint: 'Benda mana yang tidak bisa kita makan?',
  },
  rewardXp: 50,
};

export const logicSortingLesson: StoryLesson = {
  lessonId: 'logic-sort-001',
  levelId: 403,
  title: 'Mengurutkan Ukuran Benda',
  subject: 'logic',
  topic: 'logic_sorting',
  difficulty: 1,
  learningObjective: ['Memahami urutan tingkatan ukuran', 'Menyusun benda dari paling kecil ke paling besar'],
  characters: [
    {
      id: 'budi',
      name: 'Budi',
      asset: 'character_budi',
      color: '#3b82f6',
    },
  ],
  scenes: [
    {
      id: 'log_sort_1',
      title: 'Tiga Ukuran Berbeda',
      background: 'classroom',
      narration: 'Budi menata benda-benda dari ukuran yang paling mungil, ukuran sedang, sampai ukuran yang paling besar.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'idle' },
      ],
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Manakah urutan yang benar dari ukuran yang PALING KECIL menuju yang PALING BESAR?',
    options: [
      { id: 'A', value: 'K-S-B', label: 'Semut -> Kucing -> Gajah' },
      { id: 'B', value: 'G-K-S', label: 'Gajah -> Kucing -> Semut' },
      { id: 'C', value: 'K-G-S', label: 'Kucing -> Gajah -> Semut' },
    ],
    correctAnswer: 'A',
    explanation: 'Semut bertubuh sangat kecil, kucing berukuran sedang, dan gajah berukuran paling besar!',
    hint: 'Mulailah dari hewan yang paling mungil di tanah.',
  },
  rewardXp: 60,
};

export const logicMazeLesson: StoryLesson = {
  lessonId: 'logic-maze-001',
  levelId: 404,
  title: 'Teka-Teki Bentuk Geometri',
  subject: 'logic',
  topic: 'logic_shapes',
  difficulty: 2,
  learningObjective: ['Mengenali bentuk geometri dasar lingkaran', 'Menghubungkan bentuk geometri dengan benda nyata'],
  characters: [
    {
      id: 'budi',
      name: 'Budi',
      asset: 'character_budi',
      color: '#3b82f6',
    },
    {
      id: 'siti',
      name: 'Siti',
      asset: 'character_siti',
      color: '#ec4899',
    },
  ],
  scenes: [
    {
      id: 'log_maze_1',
      title: 'Pintu Rahasia Kastil Lingkaran',
      background: 'castle',
      narration: 'Di pintu kastil terdapat teka-teki: pilih benda yang memiliki bentuk dasar bundar seperti lingkaran!',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'idle' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 340, y: 320 }, animation: 'idle' },
        { type: 'spawn_object', object: 'cake', quantity: 3, position: { x: 480, y: 320 } },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Benda yang bundar bulat tanpa sudut... seperti donat manis atau roda sepeda!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Benda manakah yang memiliki bentuk dasar LINGKARAN (Bulat melingkar tanpa sudut)?',
    options: [
      { id: 'A', value: 'Buku', label: 'Buku Catatan Kotak' },
      { id: 'B', value: 'Donat', label: 'Donat Manis / Roda Sepeda' },
      { id: 'C', value: 'Pintu', label: 'Daun Pintu Persegi' },
    ],
    correctAnswer: 'B',
    explanation: 'Donat manis dan roda sepeda berbentuk lingkaran bulat melingkar sempurna tanpa sudut!',
    hint: 'Bentuknya bundar melingkar seperti donat atau roda sepeda.',
  },
  rewardXp: 70,
};

export const mockLogicLevels: LevelDef[] = [
  {
    id: 401,
    title: 'Level 1 — Pola Warna Ceria',
    subtitle: 'Menebak urutan warna selang-seling',
    topic: 'logic_patterns',
    environment: 'park',
    icon: '🔴',
    requiredXp: 0,
    description: 'Latih kejelian anak dalam menemukan pola urutan warna berulang.',
    lessons: [logicPatternsLesson],
  },
  {
    id: 402,
    title: 'Level 2 — Mencari yang Berbeda',
    subtitle: 'Klasifikasi benda ganjil di keranjang',
    topic: 'logic_shapes',
    environment: 'market',
    icon: '🔍',
    requiredXp: 40,
    description: 'Temukan benda yang bukan termasuk dalam kelompok buah-buahan.',
    lessons: [logicOddOneOutLesson],
  },
  {
    id: 403,
    title: 'Level 3 — Urutan Ukuran',
    subtitle: 'Dari paling kecil ke paling besar',
    topic: 'logic_sorting',
    environment: 'classroom',
    icon: '📏',
    requiredXp: 90,
    description: 'Urutkan hewan dari yang berukuran paling mungil sampai raksasa.',
    lessons: [logicSortingLesson],
  },
  {
    id: 404,
    title: 'Level 4 — Bentuk Lingkaran',
    subtitle: 'Mengenal bentuk geometri di sekitar kita',
    topic: 'logic_shapes',
    environment: 'castle',
    icon: '⭕',
    requiredXp: 150,
    description: 'Pecahkan teka-teki bentuk lingkaran pada benda sehari-hari.',
    lessons: [logicMazeLesson],
  },
];

// ==========================================
// 📚 DAFTAR MATA PELAJARAN (SUBJECT HUB)
// ==========================================
export const mockSubjects: SubjectDef[] = [
  {
    id: 'mathematics',
    title: 'Matematika & Berhitung',
    subtitle: 'Petualangan angka, penjumlahan, dan berhitung benda',
    icon: '🔢',
    badge: '7 Level Petualangan',
    bannerTitle: 'Jelajahi Pulau Angka! 🏝️',
    bannerDescription: 'Pilih pulau petualanganmu, nikmati cerita seru bersama Budi & Siti, dan kumpulkan bintang pahlawan!',
    bannerGradient: 'from-amber-400 via-yellow-500 to-orange-500',
    badgeBg: 'bg-amber-400 text-amber-950',
    themeColor: 'amber',
    levels: mockMathLevels,
  },
  {
    id: 'science',
    title: 'Sains & Alam Cilik',
    subtitle: 'Mengenal hewan, tumbuhan, cuaca, dan rahasia alam',
    icon: '🔬',
    badge: '7 Level Petualangan',
    bannerTitle: 'Lembah Peneliti Cilik! 🌿',
    bannerDescription: 'Temukan keajaiban alam di sekitar kita, dengarkan suara hewan, dan rawat kebun bunga bersama Budi & Siti!',
    bannerGradient: 'from-emerald-400 via-teal-500 to-green-600',
    badgeBg: 'bg-emerald-400 text-emerald-950',
    themeColor: 'emerald',
    levels: mockScienceLevels,
  },
  {
    id: 'language',
    title: 'Bahasa & Membaca',
    subtitle: 'Mengenal huruf vokal, mengeja kata, dan cerita seru',
    icon: '📖',
    badge: '7 Level Petualangan',
    bannerTitle: 'Taman Kata & Cerita Indah! 📚',
    bannerDescription: 'Buka buku ajaib berilustrasi, susun huruf warna-warni, dan kembangkan kemampuan literasi membaca!',
    bannerGradient: 'from-sky-400 via-blue-500 to-indigo-600',
    badgeBg: 'bg-sky-400 text-sky-950',
    themeColor: 'sky',
    levels: mockLanguageLevels,
  },
  {
    id: 'character',
    title: 'Budi Pekerti & Karakter',
    subtitle: 'Belajar sopan santun, empati, tolong-menolong & kebersihan',
    icon: '💖',
    badge: '4 Level Petualangan',
    bannerTitle: 'Desa Sahabat Teladan! 🌟',
    bannerDescription: 'Tumbuhkan hati yang penuh kasih, gunakan kata ajaib (Tolong, Maaf, Terima Kasih), dan jadilah anak hebat!',
    bannerGradient: 'from-rose-400 via-pink-500 to-red-500',
    badgeBg: 'bg-rose-400 text-rose-950',
    themeColor: 'rose',
    levels: mockCharacterLevels,
  },
  {
    id: 'logic',
    title: 'Logika & Asah Otak',
    subtitle: 'Pola warna, teka-teki cerdik, dan klasifikasi benda',
    icon: '🧩',
    badge: '4 Level Petualangan',
    bannerTitle: 'Labirin Teka-Teki Cerdik! 💡',
    bannerDescription: 'Asah ketelitian dan daya pikir anak dengan memecahkan teka-teki logika yang mengasyikkan!',
    bannerGradient: 'from-violet-500 via-purple-500 to-fuchsia-600',
    badgeBg: 'bg-purple-400 text-purple-950',
    themeColor: 'purple',
    levels: mockLogicLevels,
  },
];

// Backwards-compatible export
export const mockLevels: LevelDef[] = mockMathLevels;
