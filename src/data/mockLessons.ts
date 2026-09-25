import { LevelDef, StoryLesson } from '@/types/story';

export const canonicalSubtractionLesson: StoryLesson = {
  lessonId: 'math-subtraction-001',
  levelId: 3,
  title: 'Kelereng Budi dan Siti',
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
  title: 'Petualangan Menghitung Apel Hutan',
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
      narration: 'Budi sedang berjalan-jalan di Hutan Ajaib. Di bawah pohon yang rindang, jatuhlah apel-apel merah yang segar!',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'apple', owner: 'budi', quantity: 5, position: { x: 380, y: 330 } },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Nyam! Apel-apel ini kelihatan manis sekali. Ada berapa ya semuanya?',
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
    question: 'Berapa banyak buah apel yang ada di hadapan Budi?',
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

export const additionLesson: StoryLesson = {
  lessonId: 'math-addition-001',
  levelId: 2,
  title: 'Koin Bintang Persahabatan',
  subject: 'mathematics',
  topic: 'addition',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Pasar Ceria',
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
      title: 'Koin Emas di Pasar',
      background: 'market',
      narration: 'Budi dan Siti sedang mengunjungi Pasar Ceria. Budi memiliki tiga koin emas berkilauan.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'idle' },
        { type: 'spawn_object', object: 'coin', owner: 'budi', quantity: 3, position: { x: 280, y: 340 } },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Aku punya 3 koin emas untuk membeli buku cerita!',
      },
    },
    {
      id: 'add_scene_2',
      title: 'Siti Menambahkan Koin',
      background: 'market',
      narration: 'Siti membawa empat koin emas lagi dan menggabungkannya dengan koin Budi!',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 520, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'coin', owner: 'siti', quantity: 4, position: { x: 450, y: 340 } },
        { type: 'animate_character', characterId: 'budi', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Aku tambahkan 4 koin lagi ya Budi, sekarang koin kita terkumpul!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Berapakah total koin emas Budi dan Siti jika digabungkan?',
    options: [
      { id: 'A', value: 6, label: '6 Koin' },
      { id: 'B', value: 7, label: '7 Koin' },
      { id: 'C', value: 8, label: '8 Koin' },
      { id: 'D', value: 9, label: '9 Koin' },
    ],
    correctAnswer: 'B',
    explanation: '3 koin ditambah 4 koin sama dengan 7 koin: 3 + 4 = 7!',
    hint: 'Mulai dari 3, lalu lanjutkan hitung maju 4 kali: 4, 5, 6, 7!',
    visualHint: {
      formula: '3 + 4 = 7',
      initialCount: 3,
      transferCount: 4,
      remainingCount: 7,
      itemType: 'coin',
    },
  },
  rewardXp: 50,
};

export const comparisonLesson: StoryLesson = {
  lessonId: 'math-comparison-001',
  levelId: 4,
  title: 'Bintang Emas: Lebih Banyak Mana?',
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
  title: 'Perkalian Keranjang Apel Ceria',
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
  title: 'Membagi Kue Ulang Tahun Adil',
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
  title: 'Petualangan Terakhir: Gerbang Kastil Ajaib',
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

export const mockLevels: LevelDef[] = [
  {
    id: 1,
    title: 'Level 1 — Mengenal Angka',
    subtitle: 'Belajar berhitung buah di Hutan Ajaib',
    topic: 'counting',
    environment: 'forest',
    icon: '🍎',
    requiredXp: 0,
    description: 'Kenali angka 1 sampai 10 sambil memetik buah apel segar bersama Budi.',
    lessons: [countingLesson],
  },
  {
    id: 2,
    title: 'Level 2 — Penjumlahan',
    subtitle: 'Menggabungkan koin emas di Pasar Ceria',
    topic: 'addition',
    environment: 'market',
    icon: '🪙',
    requiredXp: 50,
    description: 'Gabungkan koin-koin emas berkilauan bersama Budi dan Siti.',
    lessons: [additionLesson],
  },
  {
    id: 3,
    title: 'Level 3 — Pengurangan',
    subtitle: 'Petualangan Kelereng di Taman Bunga',
    topic: 'subtraction',
    environment: 'park',
    icon: '🔮',
    requiredXp: 100,
    description: 'Bantu Budi menghitung sisa kelereng setelah berbagi dengan Siti.',
    lessons: [canonicalSubtractionLesson],
  },
  {
    id: 4,
    title: 'Level 4 — Perbandingan',
    subtitle: 'Bintang Emas di Ruang Kelas',
    topic: 'comparison',
    environment: 'classroom',
    icon: '⭐',
    requiredXp: 160,
    description: 'Bandingkan jumlah koleksi bintang prestasi siapa yang paling banyak!',
    lessons: [comparisonLesson],
  },
  {
    id: 5,
    title: 'Level 5 — Perkalian Dasar',
    subtitle: 'Keranjang Buah Berkelompok',
    topic: 'multiplication',
    environment: 'market',
    icon: '🧺',
    requiredXp: 220,
    description: 'Pelajari konsep perkalian sebagai penjumlahan berulang yang mengasyikkan.',
    lessons: [multiplicationLesson],
  },
  {
    id: 6,
    title: 'Level 6 — Pembagian Dasar',
    subtitle: 'Membagi Kue Pesta Sama Rata',
    topic: 'division',
    environment: 'park',
    icon: '🍰',
    requiredXp: 280,
    description: 'Belajar membagi makanan dan mainan secara adil untuk sahabat-sahabat.',
    lessons: [divisionLesson],
  },
  {
    id: 7,
    title: 'Level 7 — Final Adventure',
    subtitle: 'Membuka Gerbang Kastil Ajaib',
    topic: 'general',
    environment: 'castle',
    icon: '🏰',
    requiredXp: 350,
    description: 'Ujian pamungkas untuk menjadi Pahlawan Angka Sejati di Kastil Pixel!',
    lessons: [finalAdventureLesson],
  },
];
