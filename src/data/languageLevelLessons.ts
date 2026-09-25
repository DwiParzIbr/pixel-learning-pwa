import { CharacterDef, StoryLesson } from '@/types/story';

const budiDef: CharacterDef = {
  id: 'budi',
  name: 'Budi',
  asset: 'character_budi',
  color: '#3b82f6',
  personality: 'Ceria, suka membaca, dan rajin mengeja kata',
  voiceProfile: { pitch: 1.45, rate: 1.05 },
};

const sitiDef: CharacterDef = {
  id: 'siti',
  name: 'Siti',
  asset: 'character_siti',
  color: '#ec4899',
  personality: 'Pintar merangkai kalimat, lembut, dan gemar berdongeng',
  voiceProfile: { pitch: 1.75, rate: 0.96 },
};

// ==========================================
// 🔤 LEVEL 1: HURUF VOKAL & ALFABET CERIA (SOAL 2-5)
// ==========================================

export const languageAlphabetLesson2: StoryLesson = {
  lessonId: 'lang-alpha-002',
  levelId: 201,
  title: 'Soal 2: Huruf Pertama Nama Benda',
  subject: 'language',
  topic: 'language_letters',
  difficulty: 1,
  metadata: {
    ageGroup: '5-7',
    grade: 'TK-B / SD 1',
    theme: 'Kebun Buah Huruf',
  },
  learningObjective: [
    'Mengenal huruf awalan pada nama benda',
    'Menghubungkan bunyi huruf A dengan buah Apel',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'lang1_s2_1',
      title: 'Memetik Buah Apel Merah',
      background: 'park',
      narration: 'Budi memegang sebuah buah apel merah yang ranum. Siti membawa kartu huruf besar berhuruf A.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 480, y: 320 }, animation: 'idle' },
        { type: 'spawn_object', object: 'apple', quantity: 1, position: { x: 360, y: 330 } },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Apel merah ini sangat lezat! Kata "Apel" diawali dengan bunyi huruf apa ya, Siti?',
      },
    },
    {
      id: 'lang1_s2_2',
      title: 'Huruf A yang Ceria',
      background: 'park',
      narration: 'Siti menunjukkan kartu huruf A sambil tersenyum riang.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Huruf A! A untuk Apel, Awan, dan Ayam!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Huruf apakah yang menjadi HURUF PERTAMA (awalan) dari kata: A - P - E - L ?',
    options: [
      { id: 'A', value: 'A', label: 'Huruf A' },
      { id: 'B', value: 'B', label: 'Huruf B' },
      { id: 'C', value: 'C', label: 'Huruf C' },
    ],
    correctAnswer: 'A',
    explanation: 'Kata "Apel" diawali dengan huruf A (A-P-E-L)!',
    hint: 'Huruf pertama dari vokal A-I-U-E-O.',
  },
  rewardXp: 50,
};

export const languageAlphabetLesson3: StoryLesson = {
  lessonId: 'lang-alpha-003',
  levelId: 201,
  title: 'Soal 3: Sahabat Huruf Konsonan B dan C',
  subject: 'language',
  topic: 'language_letters',
  difficulty: 1,
  metadata: {
    ageGroup: '5-7',
    grade: 'SD Kelas 1',
    theme: 'Papan Tulis Sekolah',
  },
  learningObjective: [
    'Mengenal huruf konsonan B dan C',
    'Menemukan contoh benda yang diawali huruf B (Buku, Bola)',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'lang1_s3_1',
      title: 'Budi Membawa Buku dan Bola',
      background: 'classroom',
      narration: 'Di dalam kelas, Budi meletakkan buku bacaan di atas meja. Di sampingnya ada bola mainan berwarna biru cerah.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 460, y: 320 }, animation: 'idle' },
        { type: 'spawn_object', object: 'book', quantity: 1, position: { x: 360, y: 330 } },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Buku, Bola, dan Baju! Semuanya diawali dengan huruf B yang berkaki tegak dan berperut gendut!',
      },
    },
    {
      id: 'lang1_s3_2',
      title: 'Menulis Huruf B',
      background: 'classroom',
      narration: 'Siti mengacungkan jempol memuji kejelian Budi mengenali bunyi huruf konsonan B.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Hebat Budi! Huruf B berbunyi "beh", seperti pada kata Buku!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Benda apakah berikut ini yang nama katanya DIAWALI dengan huruf B ?',
    options: [
      { id: 'A', value: 'Buku', label: 'Buku Bacaan' },
      { id: 'B', value: 'Apel', label: 'Apel Merah' },
      { id: 'C', value: 'Ikan', label: 'Ikan Kolam' },
    ],
    correctAnswer: 'A',
    explanation: 'Kata "Buku" diawali dengan huruf B: B-U-K-U!',
    hint: 'Benda yang kita baca untuk belajar dan mencari ilmu.',
  },
  rewardXp: 50,
};

export const languageAlphabetLesson4: StoryLesson = {
  lessonId: 'lang-alpha-004',
  levelId: 201,
  title: 'Soal 4: Menemukan Huruf Vokal di Kata "MATA"',
  subject: 'language',
  topic: 'language_letters',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Kuis Kata Bergambar',
  },
  learningObjective: [
    'Mengidentifikasi huruf vokal di dalam kata',
    'Menghitung jumlah huruf vokal A pada kata M-A-T-A',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'lang1_s4_1',
      title: 'Mengeja Bagian Wajah',
      background: 'classroom',
      narration: 'Siti menunjuk gambar sepasang mata yang jernih di papan tulis. Di bawahnya tertulis kata: M - A - T - A.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'budi', position: { x: 480, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Ayo Budi, kita hitung berapa huruf vokal A yang ada pada kata M-A-T-A!',
      },
    },
    {
      id: 'lang1_s4_2',
      title: 'Dua Huruf A',
      background: 'classroom',
      narration: 'Budi mengeja dengan teliti: huruf kedua adalah A, dan huruf keempat juga adalah A!',
      actions: [
        { type: 'animate_character', characterId: 'budi', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Ada dua huruf vokal A pada kata M-A-T-A!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Berapakah jumlah huruf vokal "A" pada kata: M - A - T - A ?',
    options: [
      { id: 'A', value: '1', label: '1 Huruf A' },
      { id: 'B', value: '2', label: '2 Huruf A' },
      { id: 'C', value: '3', label: '3 Huruf A' },
    ],
    correctAnswer: 'B',
    explanation: 'Pada kata M-A-T-A terdapat 2 huruf vokal A (huruf ke-2 dan ke-4)!',
    hint: 'Hitung huruf A yang ada setelah huruf M dan setelah huruf T.',
  },
  rewardXp: 50,
};

export const languageAlphabetLesson5: StoryLesson = {
  lessonId: 'lang-alpha-005',
  levelId: 201,
  title: 'Soal 5: Kereta Gerbong Alfabet A-B-C-D',
  subject: 'language',
  topic: 'language_letters',
  difficulty: 1,
  metadata: {
    ageGroup: '5-7',
    grade: 'TK-B / SD 1',
    theme: 'Stasiun Kereta Kata',
  },
  learningObjective: [
    'Mengenal urutan abjad A, B, C, D, E',
    'Menentukan huruf yang tepat setelah huruf C',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'lang1_s5_1',
      title: 'Kereta Huruf Warna-Warni',
      background: 'park',
      narration: 'Budi dan Siti menyusun gerbong mainan kereta alfabet: gerbong A merah, gerbong B kuning, dan gerbong C hijau.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 500, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Tuuut tuuut! Gerbong A, B, C sudah siap meluncur! Gerbong selanjutnya huruf apa ya?',
      },
    },
    {
      id: 'lang1_s5_2',
      title: 'Gerbong Huruf D',
      background: 'park',
      narration: 'Siti memasang gerbong berwarna biru bertuliskan huruf D di belakang gerbong C.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Setelah huruf C adalah huruf D! A, B, C, lalu D!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Dalam urutan alfabet yang benar: A, B, C, [ ... ]. Huruf apakah yang datang tepat setelah huruf C?',
    options: [
      { id: 'A', value: 'D', label: 'Huruf D' },
      { id: 'B', value: 'F', label: 'Huruf F' },
      { id: 'C', value: 'Z', label: 'Huruf Z' },
    ],
    correctAnswer: 'A',
    explanation: 'Urutan abjad yang benar adalah A - B - C - D - E!',
    hint: 'Huruf ke-4 dalam lagu abjad ABC.',
  },
  rewardXp: 50,
};

// ==========================================
// 📘 LEVEL 2: MENGEJA KATA BENDA (SOAL 2-5)
// ==========================================

export const languageSpellingLesson2: StoryLesson = {
  lessonId: 'lang-spell-002',
  levelId: 202,
  title: 'Soal 2: Mengeja Kata "M - E - J - A"',
  subject: 'language',
  topic: 'language_spelling',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Ruang Kelas Belajar',
  },
  learningObjective: [
    'Mengeja suku kata ME-JA',
    'Menyusun huruf M-E-J-A menjadi kata yang tepat',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'lang2_s2_1',
      title: 'Meja Belajar yang Rapi',
      background: 'classroom',
      narration: 'Siti sedang merapikan meja belajarnya yang terbuat dari kayu halus. Meja adalah tempat kita menulis dan membaca.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'budi', position: { x: 480, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Meja ini bersih dan rapi! Terdiri dari dua suku kata: ME dan JA!',
      },
    },
    {
      id: 'lang2_s2_2',
      title: 'Mengeja Huruf per Huruf',
      background: 'classroom',
      narration: 'Budi mengeja satu per satu: M - E - J - A! Bunyinya menjadi MEJA!',
      actions: [
        { type: 'animate_character', characterId: 'budi', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'M - E dibaca ME, J - A dibaca JA. Digabung menjadi MEJA!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Huruf apakah yang tepat untuk melengkapi kata: M - E - [ ... ] - A ?',
    options: [
      { id: 'A', value: 'J', label: 'Huruf J (Meja)' },
      { id: 'B', value: 'K', label: 'Huruf K (Meka)' },
      { id: 'C', value: 'S', label: 'Huruf S (Mesa)' },
    ],
    correctAnswer: 'A',
    explanation: 'Huruf yang benar adalah J untuk membentuk kata M-E-J-A (Meja)!',
    hint: 'Suku kata keduanya berbunyi -JA.',
  },
  rewardXp: 50,
};

export const languageSpellingLesson3: StoryLesson = {
  lessonId: 'lang-spell-003',
  levelId: 202,
  title: 'Soal 3: Mengeja Kata "B - O - L - A"',
  subject: 'language',
  topic: 'language_spelling',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Lapangan Bermain Bola',
  },
  learningObjective: [
    'Mengeja suku kata BO-LA',
    'Menemukan huruf vokal O dan A pada kata bola',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'lang2_s3_1',
      title: 'Bola Bundar di Lapangan',
      background: 'park',
      narration: 'Budi menendang bola bundar dengan ceria. Bola menggelinding lincah di rumput hijau.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 500, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Asyik sekali bermain BOLA! Ayo Siti, bantu aku mengeja kata B-O-L-A!',
      },
    },
    {
      id: 'lang2_s3_2',
      title: 'Suku Kata BO-LA',
      background: 'park',
      narration: 'Siti bertepuk tangan riang mengikuti suku kata BO dan LA.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'B - O berbunyi BO, L - A berbunyi LA. BO-LA!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Susunan huruf manakah yang tepat untuk membentuk kata nama mainan bundar: BOLA?',
    options: [
      { id: 'A', value: 'BOLA', label: 'B - O - L - A' },
      { id: 'B', value: 'BALO', label: 'B - A - L - O' },
      { id: 'C', value: 'LABO', label: 'L - A - B - O' },
    ],
    correctAnswer: 'A',
    explanation: 'Ejaan yang tepat untuk mainan bundar adalah B-O-L-A (Bola)!',
    hint: 'Dimulai dengan suku kata BO lalu diakhiri LA.',
  },
  rewardXp: 50,
};

export const languageSpellingLesson4: StoryLesson = {
  lessonId: 'lang-spell-004',
  levelId: 202,
  title: 'Soal 4: Mengeja Kata Minuman Sehat "S - U - S - U"',
  subject: 'language',
  topic: 'language_spelling',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Meja Sarapan Pagi',
  },
  learningObjective: [
    'Mengeja kata berulang SU-SU',
    'Mengetahui huruf vokal U yang berulang dua kali',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'lang2_s4_1',
      title: 'Segelas Susu Hangat',
      background: 'classroom',
      narration: 'Setiap pagi sebelum sekolah, Siti selalu meminum segelas susu putih hangat agar tubuhnya kuat dan bertenaga.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'budi', position: { x: 460, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Minum susu membuat tulang kita sehat! Hurufnya mudah sekali: S - U - S - U!',
      },
    },
    {
      id: 'lang2_s4_2',
      title: 'Suku Kata Kembar',
      background: 'classroom',
      narration: 'Budi tersenyum menyadari bahwa kata SUSU memiliki dua suku kata kembar yaitu SU dan SU.',
      actions: [
        { type: 'animate_character', characterId: 'budi', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'SU ditambah SU menjadi SUSU! Minuman lezat penambah energi!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Huruf vokal apakah yang digunakan pada kata: S - [ ... ] - S - [ ... ] (Minuman sehat berkalsium)?',
    options: [
      { id: 'A', value: 'U', label: 'Huruf U (S-U-S-U)' },
      { id: 'B', value: 'A', label: 'Huruf A (S-A-S-A)' },
      { id: 'C', value: 'I', label: 'Huruf I (S-I-S-I)' },
    ],
    correctAnswer: 'A',
    explanation: 'Kata untuk minuman sehat bergizi adalah S-U-S-U (Susu)!',
    hint: 'Huruf vokal yang mulutnya dimajukan berbunyi "U".',
  },
  rewardXp: 50,
};

export const languageSpellingLesson5: StoryLesson = {
  lessonId: 'lang-spell-005',
  levelId: 202,
  title: 'Soal 5: Mengeja Kata Pelindung "T - O - P - I"',
  subject: 'language',
  topic: 'language_spelling',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Taman Bermain Siang Hari',
  },
  learningObjective: [
    'Mengeja suku kata TO-PI',
    'Melengkapi huruf akhir kata benda pelindung kepala',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'lang2_s5_1',
      title: 'Topi Kuning Pelindung Kepala',
      background: 'park',
      narration: 'Saat matahari bersinar cerah di taman, Budi mengenakan topi kuning yang nyaman untuk melindungi kepalanya dari terik mentari.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 480, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Topi ini membuat kepalaku tetap teduh! T - O dibaca TO, P - I dibaca PI!',
      },
    },
    {
      id: 'lang2_s5_2',
      title: 'Ejaan Sempurna',
      background: 'park',
      narration: 'Siti mengulang ejaan kata TOPI dengan lantang dan gembira.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'TO - PI! Budi pintar sekali mengeja benda yang sedang dipakainya!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Huruf apakah yang tepat untuk melengkapi kata benda penutup kepala: T - O - P - [ ... ] ?',
    options: [
      { id: 'A', value: 'I', label: 'Huruf I (Topi)' },
      { id: 'B', value: 'A', label: 'Huruf A (Topa)' },
      { id: 'C', value: 'U', label: 'Huruf U (Topu)' },
    ],
    correctAnswer: 'A',
    explanation: 'Kata yang benar untuk penutup kepala adalah T-O-P-I (Topi)!',
    hint: 'Bunyi akhir kata ini berakhiran suara "I".',
  },
  rewardXp: 50,
};

// ==========================================
// 🐘 LEVEL 3: LAWAN KATA / ANTONIM (SOAL 2-5)
// ==========================================

export const languageAntonymsLesson2: StoryLesson = {
  lessonId: 'lang-ant-002',
  levelId: 203,
  title: 'Soal 2: Lawan Kata: Tinggi vs Pendek',
  subject: 'language',
  topic: 'language_antonyms',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Taman Pohon Kelapa',
  },
  learningObjective: [
    'Mengenal lawan kata (antonim) Tinggi dan Pendek',
    'Membandingkan tinggi pohon dengan rumput di taman',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'lang3_s2_1',
      title: 'Pohon Kelapa yang Tinggi',
      background: 'park',
      narration: 'Budi menatap pohon kelapa yang batangnya menjulang TINGGI ke angkasa. Di bawah kakinya, rumput hijau tumbuh PENDEK merayap di tanah.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 460, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Pohon kelapa itu tinggi sekali! Sedangkan rumput di tanah ini ukurannya pendek ya!',
      },
    },
    {
      id: 'lang3_s2_2',
      title: 'Pasangan Lawan Kata',
      background: 'park',
      narration: 'Siti menjelaskan bahwa kata TINGGI berlawanan arti dengan kata PENDEK.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Tepat sekali! Lawan kata dari TINGGI adalah PENDEK!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Pohon beringin itu TINGGI menjulang, sedangkan tanaman rumput itu ... ? (Lawan kata TINGGI)',
    options: [
      { id: 'A', value: 'Pendek', label: 'Pendek' },
      { id: 'B', value: 'Lebar', label: 'Lebar' },
      { id: 'C', value: 'Jauh', label: 'Jauh' },
    ],
    correctAnswer: 'A',
    explanation: 'Lawan kata (antonim) dari TINGGI adalah PENDEK!',
    hint: 'Bila sesuatu tidak tinggi menjulang, maka ukurannya dekat dengan tanah atau...?',
  },
  rewardXp: 60,
};

export const languageAntonymsLesson3: StoryLesson = {
  lessonId: 'lang-ant-003',
  levelId: 203,
  title: 'Soal 3: Lawan Kata: Panas vs Dingin',
  subject: 'language',
  topic: 'language_antonyms',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Meja Teh & Es Segar',
  },
  learningObjective: [
    'Mengenal lawan kata Panas dan Dingin',
    'Membandingkan suhu teh hangat dan es batu',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'lang3_s3_1',
      title: 'Sup Hangat dan Es Batu',
      background: 'classroom',
      narration: 'Di meja makan, mangkuk sup terasa PANAS mengepulkan asap. Di sebelahnya ada segelas air dengan es batu yang sangat DINGIN.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'budi', position: { x: 480, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Hati-hati supnya masih panas! Kalau es batunya terasa dingin di tangan!',
      },
    },
    {
      id: 'lang3_s3_2',
      title: 'Dua Suhu Berlawanan',
      background: 'classroom',
      narration: 'Budi mengangguk paham bahwa panas dan dingin adalah dua kondisi suhu yang saling berlawanan.',
      actions: [
        { type: 'animate_character', characterId: 'budi', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Panas lawannya dingin! Seperti api yang panas dan salju yang dingin!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Api unggun terasa PANAS, sedangkan es batu di gelas terasa ... ? (Lawan kata PANAS)',
    options: [
      { id: 'A', value: 'Dingin', label: 'Dingin' },
      { id: 'B', value: 'Asin', label: 'Asin' },
      { id: 'C', value: 'Keras', label: 'Keras' },
    ],
    correctAnswer: 'A',
    explanation: 'Lawan kata dari PANAS adalah DINGIN!',
    hint: 'Sensasi beku dan sejuk seperti es di dalam kulkas.',
  },
  rewardXp: 60,
};

export const languageAntonymsLesson4: StoryLesson = {
  lessonId: 'lang-ant-004',
  levelId: 203,
  title: 'Soal 4: Lawan Kata: Cepat vs Lambat',
  subject: 'language',
  topic: 'language_antonyms',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Taman Lomba Lari',
  },
  learningObjective: [
    'Mengenal lawan kata Cepat dan Lambat',
    'Menghubungkan lari kelinci yang cepat dan jalan kura-kura yang lambat',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'lang3_s4_1',
      title: 'Kelinci Lincah dan Kura-Kura',
      background: 'forest',
      narration: 'Seekor kelinci melompat berlari dengan sangat CEPAT. Sementara itu, kura-kura berjalan tenang dan LAMBAT selangkah demi selangkah.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 480, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Wuuush! Kelinci larinya cepat sekali! Kalau kura-kura jalannya santai dan lambat.',
      },
    },
    {
      id: 'lang3_s4_2',
      title: 'Pelajaran Kecepatan',
      background: 'forest',
      narration: 'Siti tersenyum dan mengingatkan bahwa cepat adalah lawan kata dari lambat.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Betul Budi! Lawan kata dari CEPAT adalah LAMBAT!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Kelinci berlari dengan sangat CEPAT, sedangkan kura-kura berjalan dengan ... ? (Lawan kata CEPAT)',
    options: [
      { id: 'A', value: 'Lambat', label: 'Lambat (Pelan)' },
      { id: 'B', value: 'Tinggi', label: 'Tinggi' },
      { id: 'C', value: 'Kuat', label: 'Kuat' },
    ],
    correctAnswer: 'A',
    explanation: 'Lawan kata dari CEPAT adalah LAMBAT (atau pelan)!',
    hint: 'Gerakan yang perlahan dan tidak tergesa-gesa.',
  },
  rewardXp: 60,
};

export const languageAntonymsLesson5: StoryLesson = {
  lessonId: 'lang-ant-005',
  levelId: 203,
  title: 'Soal 5: Lawan Kata: Siang vs Malam',
  subject: 'language',
  topic: 'language_antonyms',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Langit Pergantian Hari',
  },
  learningObjective: [
    'Mengenal lawan kata Siang dan Malam',
    'Mengetahui perbedaan suasana siang terang dan malam beristirahat',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'lang3_s5_1',
      title: 'Matahari Terang di Siang Hari',
      background: 'park',
      narration: 'Saat SIANG hari, matahari bersinar terang dan kita belajar serta bermain dengan gembira. Saat MALAM hari, bulan muncul dan kita tidur lelap.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 460, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Siang hari terang benderang untuk belajar, sedangkan malam hari waktu kita beristirahat.',
      },
    },
    {
      id: 'lang3_s5_2',
      title: 'Pasangan Waktu',
      background: 'park',
      narration: 'Siti melengkapi penjelasan lawan kata waktu.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Siang berlawanan dengan malam, dan terang berlawanan dengan gelap!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Matahari terbit menyinari waktu SIANG, sedangkan rembulan menyinari waktu ... ? (Lawan kata SIANG)',
    options: [
      { id: 'A', value: 'Malam', label: 'Malam' },
      { id: 'B', value: 'Pagi', label: 'Pagi' },
      { id: 'C', value: 'Sore', label: 'Sore' },
    ],
    correctAnswer: 'A',
    explanation: 'Lawan kata dari SIANG adalah MALAM!',
    hint: 'Waktu ketika bintang berkilauan di langit dan kita pergi tidur.',
  },
  rewardXp: 60,
};

// ==========================================
// 📜 LEVEL 4: DONGENG & PEMAHAMAN BACAAN (SOAL 2-5)
// ==========================================

export const languageStoryLesson2: StoryLesson = {
  lessonId: 'lang-story-002',
  levelId: 204,
  title: 'Soal 2: Dongeng Semut yang Gotong Royong',
  subject: 'language',
  topic: 'language_comprehension',
  difficulty: 2,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1-2',
    theme: 'Lembah Semut Pekerja',
  },
  learningObjective: [
    'Memahami isi cerita fabel sederhana',
    'Menyimpulkan nilai moral gotong royong dan kerja sama',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'lang4_s2_1',
      title: 'Sepotong Roti Besar',
      background: 'forest',
      narration: 'Ada sepotong remah roti manis yang jatuh di tanah. Seekor semut kecil tidak sanggup mengangkatnya sendirian.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 460, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Semut itu memanggil teman-temannya. Sepuluh semut datang bersama-sama mengangkat roti itu!',
      },
    },
    {
      id: 'lang4_s2_2',
      title: 'Berat Sama Dipikul',
      background: 'forest',
      narration: 'Dengan bekerja sama dan bergotong royong, roti yang berat terasa ringan dan berhasil dibawa ke sarang mereka.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Gotong royong membuat pekerjaan berat menjadi terasa sangat ringan!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Bagaimanakah cara semut-semut kecil berhasil membawa sepotong roti yang berat ke sarang mereka?',
    options: [
      { id: 'A', value: 'GotongRoyong', label: 'Bekerja Sama & Gotong Royong Mengangkat Bersama' },
      { id: 'B', value: 'Ditinggal', label: 'Meninggalkan Roti Begitu Saja' },
      { id: 'C', value: 'Bertengkar', label: 'Saling Berebut dan Bertengkar' },
    ],
    correctAnswer: 'A',
    explanation: 'Semut berhasil membawa roti besar karena mereka saling tolong-menolong dan bergotong royong!',
    hint: 'Bekerja bersama-sama agar beban berat menjadi ringan.',
  },
  rewardXp: 70,
};

export const languageStoryLesson3: StoryLesson = {
  lessonId: 'lang-story-003',
  levelId: 204,
  title: 'Soal 3: Kisah Kura-kura yang Pantang Menyerah',
  subject: 'language',
  topic: 'language_comprehension',
  difficulty: 2,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1-2',
    theme: 'Garis Akhir Perlombaan',
  },
  learningObjective: [
    'Memahami pesan moral ketekunan dan kesabaran',
    'Mengetahui alasan kura-kura bisa mencapai garis akhir perlombaan',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'lang4_s3_1',
      title: 'Kelinci yang Tertidur Pulas',
      background: 'forest',
      narration: 'Dalam lomba lari, Kelinci yang merasa dirinya sangat cepat malah tidur santai di bawah pohon rindang karena meremehkan lawannya.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 480, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Kelinci tertidur lelap! Tapi Kura-kura terus melangkah dengan sabar tanpa pernah berhenti!',
      },
    },
    {
      id: 'lang4_s3_2',
      title: 'Kura-kura Tiba di Garis Akhir',
      background: 'forest',
      narration: 'Kura-kura yang tekun dan tidak sombong akhirnya berhasil menembus pita garis akhir lebih dulu!',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Pesan moralnya: jangan pernah sombong dan teruslah tekun berusaha pantang menyerah!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Sikap terpuji apakah yang membuat Kura-kura berhasil memenangkan perlombaan lari?',
    options: [
      { id: 'A', value: 'SabarTekun', label: 'Sabar, Tekun, dan Pantang Menyerah' },
      { id: 'B', value: 'Sombong', label: 'Merasa Paling Hebat dan Sombong' },
      { id: 'C', value: 'Malas', label: 'Tidur Seharian di Bawah Pohon' },
    ],
    correctAnswer: 'A',
    explanation: 'Ketekunan dan kesabaran kura-kura yang tidak pernah putus asa mengantarkannya menjadi pemenang!',
    hint: 'Sikap rajin terus melangkah dan tidak mudah menyerah.',
  },
  rewardXp: 70,
};

export const languageStoryLesson4: StoryLesson = {
  lessonId: 'lang-story-004',
  levelId: 204,
  title: 'Soal 4: Kancil Cerdik dan Buaya Sungai',
  subject: 'language',
  topic: 'language_comprehension',
  difficulty: 2,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1-2',
    theme: 'Tepi Sungai Rimba',
  },
  learningObjective: [
    'Memahami kecerdasan mencari solusi saat menghadapi rintangan',
    'Menarik informasi penting dari tokoh cerita fabel',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'lang4_s4_1',
      title: 'Sungai Berarus Deras',
      background: 'forest',
      narration: 'Kancil ingin menyeberang sungai untuk memetik buah mentimun segar di seberang, namun sungai dipenuhi buaya yang lapar.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 460, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Kancil menggunakan kecerdikannya mengajak buaya berbaris rapi untuk dihitung!',
      },
    },
    {
      id: 'lang4_s4_2',
      title: 'Melompati Punggung Buaya',
      background: 'forest',
      narration: 'Satu, dua, tiga! Kancil melompati punggung buaya sambil berhitung hingga berhasil tiba di seberang sungai dengan selamat.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Kancil terkenal cerdik dalam menggunakan akal pikirannya untuk menyelesaikan masalah!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Mengapa tokoh Kancil dalam dongeng nusantara sangat terkenal?',
    options: [
      { id: 'A', value: 'Cerdik', label: 'Karena Cerdas dan Banyak Akal Mencari Solusi' },
      { id: 'B', value: 'Galak', label: 'Karena Menakutkan dan Galak' },
      { id: 'C', value: 'Malas', label: 'Karena Suka Tidur Sepanjang Hari' },
    ],
    correctAnswer: 'A',
    explanation: 'Tokoh kancil terkenal karena kecerdikan dan kecerdasannya dalam mengatasi rintangan!',
    hint: 'Memiliki akal yang pintar dan cerdik.',
  },
  rewardXp: 70,
};

export const languageStoryLesson5: StoryLesson = {
  lessonId: 'lang-story-005',
  levelId: 204,
  title: 'Soal 5: Sahabat Lebah Pelindung Bunga',
  subject: 'language',
  topic: 'language_comprehension',
  difficulty: 2,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1-2',
    theme: 'Taman Sari Madu',
  },
  learningObjective: [
    'Memahami hubungan persahabatan lebah dan bunga',
    'Mengetahui madu manis yang dihasilkan dari nektar bunga',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'lang4_s5_1',
      title: 'Lebah Terbang di Atas Kuntum Bunga',
      background: 'park',
      narration: 'Seekor lebah kecil terbang berdengung lembut dari satu kuntum mawar ke kuntum melati menghisap sari manis nektar.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'budi', position: { x: 480, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Lebah dan bunga saling membantu! Lebah mendapatkan madu, dan bunga terbantu penyerbukannya!',
      },
    },
    {
      id: 'lang4_s5_2',
      title: 'Madu Emas yang Menyehatkan',
      background: 'park',
      narration: 'Budi kagum betapa alam diciptakan dengan saling melengkapi dan penuh kebaikan.',
      actions: [
        { type: 'animate_character', characterId: 'budi', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Cerita ini mengajarkan kita bahwa saling tolong-menolong membuat semua pihak bahagia!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Apakah cairan manis menyehatkan yang dihasilkan oleh lebah dari sari bunga di sarangnya?',
    options: [
      { id: 'A', value: 'Madu', label: 'Madu Manis' },
      { id: 'B', value: 'Minyak', label: 'Minyak Kelapa' },
      { id: 'C', value: 'Cuka', label: 'Cuka Asam' },
    ],
    correctAnswer: 'A',
    explanation: 'Lebah mengumpulkan nektar bunga lalu mengolahnya menjadi madu manis alami yang kaya manfaat!',
    hint: 'Cairan kental berwarna keemasan yang rasanya manis lezat.',
  },
  rewardXp: 70,
};

// ==========================================
// 🌟 LEVEL 5: PERSAMAAN KATA / SINONIM (SOAL 1-5)
// ==========================================

export const languageSynonymsLesson1: StoryLesson = {
  lessonId: 'lang-syn-001',
  levelId: 205,
  title: 'Soal 1: Sinonim Kata: Senang = Gembira',
  subject: 'language',
  topic: 'language_antonyms',
  difficulty: 2,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 2',
    theme: 'Pesta Senyum Sahabat',
  },
  learningObjective: [
    'Mengenal konsep sinonim (persamaan kata)',
    'Mengetahui kata Senang memiliki makna sama dengan Gembira',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'lang5_s1_1',
      title: 'Wajah Penuh Senyuman',
      background: 'park',
      narration: 'Budi dan Siti tertawa bahagia saat bermain ayunan di taman. Wajah mereka berseri-seri penuh kegembiraan.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 460, y: 320 }, animation: 'happy' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Hari ini hatiku sangat SENANG! Boleh juga dibilang hatiku sangat GEMBIRA!',
      },
    },
    {
      id: 'lang5_s1_2',
      title: 'Dua Kata Bermakna Sama',
      background: 'park',
      narration: 'Siti menerangkan bahwa dua kata yang artinya mirip atau sama disebut sebagai sinonim.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Senang sama artinya dengan gembira atau bahagia!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Kata apakah yang memiliki PERSAMAAN ARTI (sinonim) dengan kata SENANG?',
    options: [
      { id: 'A', value: 'Gembira', label: 'Gembira (Bahagia)' },
      { id: 'B', value: 'Sedih', label: 'Sedih' },
      { id: 'C', value: 'Marah', label: 'Marah' },
    ],
    correctAnswer: 'A',
    explanation: 'Sinonim (persamaan kata) dari SENANG adalah GEMBIRA atau BAHAGIA!',
    hint: 'Pilihan yang menunjukkan rasa sukacita dan senyum lebar.',
  },
  rewardXp: 60,
};

export const languageSynonymsLesson2: StoryLesson = {
  lessonId: 'lang-syn-002',
  levelId: 205,
  title: 'Soal 2: Sinonim Kata: Pintar = Cerdas',
  subject: 'language',
  topic: 'language_antonyms',
  difficulty: 2,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 2',
    theme: 'Kuis Cerdas Cermat',
  },
  learningObjective: [
    'Memahami sinonim kata Pintar dan Cerdas',
    'Menghargai semangat anak yang rajin belajar',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'lang5_s2_1',
      title: 'Menjawab Soal dengan Cepat',
      background: 'classroom',
      narration: 'Siti berhasil memecahkan teka-teki buku cerita dengan sangat tepat. Ibu guru memuji Siti anak yang PINTAR.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'budi', position: { x: 480, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Wah, Siti anak yang pintar! Sama artinya seperti Siti anak yang pandai dan cerdas!',
      },
    },
    {
      id: 'lang5_s2_2',
      title: 'Rajin Pangkal Pandai',
      background: 'classroom',
      narration: 'Siti tersenyum ramah dan berkata bahwa siapa saja yang rajin membaca pasti menjadi pandai.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Kata PINTAR, PANDAI, dan CERDAS memiliki arti yang sama!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Kata apakah yang merupakan sinonim (persamaan arti) dari kata PINTAR?',
    options: [
      { id: 'A', value: 'Cerdas', label: 'Cerdas (Pandai)' },
      { id: 'B', value: 'Malas', label: 'Malas' },
      { id: 'C', value: 'Lupa', label: 'Lupa' },
    ],
    correctAnswer: 'A',
    explanation: 'Sinonim dari kata PINTAR adalah CERDAS atau PANDAI!',
    hint: 'Kata sifat untuk anak yang tanggap dan berprestasi.',
  },
  rewardXp: 60,
};

export const languageSynonymsLesson3: StoryLesson = {
  lessonId: 'lang-syn-003',
  levelId: 205,
  title: 'Soal 3: Sinonim Kata: Indah = Elok / Cantik',
  subject: 'language',
  topic: 'language_antonyms',
  difficulty: 2,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 2',
    theme: 'Taman Bunga Mekar',
  },
  learningObjective: [
    'Memahami sinonim kata Indah dan Cantik/Elok',
    'Menggunakan kosakata yang kaya dalam mendeskripsikan alam',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'lang5_s3_1',
      title: 'Pemandangan Bunga Berwarna-Warni',
      background: 'park',
      narration: 'Kelopak bunga mawar bermekaran dengan harumnya. Pemandangan kebun tampak sangat INDAH dipandang mata.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'budi', position: { x: 480, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Bunga-bunga ini indah sekali! Boleh juga kita sebut bunga yang cantik dan elok rupanya!',
      },
    },
    {
      id: 'lang5_s3_2',
      title: 'Kekayaan Kata Bahasa Indonesia',
      background: 'park',
      narration: 'Budi mengagumi keindahan bahasa Indonesia yang memiliki banyak kata indah.',
      actions: [
        { type: 'animate_character', characterId: 'budi', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'INDAH, CANTIK, dan ELOK adalah sinonim yang memuji keelokan alam!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Pemandangan taman itu sangat INDAH. Kata apakah yang sama artinya dengan INDAH?',
    options: [
      { id: 'A', value: 'Cantik', label: 'Cantik / Elok' },
      { id: 'B', value: 'Kotor', label: 'Kotor Berdebu' },
      { id: 'C', value: 'Gelap', label: 'Gelap Gulita' },
    ],
    correctAnswer: 'A',
    explanation: 'Kata INDAH bersinonim dengan CANTIK, BAGUS, atau ELOK!',
    hint: 'Sesuatu yang menyenangkan dan mempesona untuk dilihat.',
  },
  rewardXp: 60,
};

export const languageSynonymsLesson4: StoryLesson = {
  lessonId: 'lang-syn-004',
  levelId: 205,
  title: 'Soal 4: Sinonim Kata: Sahabat = Teman / Kawan',
  subject: 'language',
  topic: 'language_antonyms',
  difficulty: 2,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 2',
    theme: 'Pohon Persahabatan',
  },
  learningObjective: [
    'Memahami sinonim kata Sahabat, Teman, dan Kawan',
    'Menghargai arti kebersamaan antar sesama',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'lang5_s4_1',
      title: 'Budi dan Siti Selalu Rukun',
      background: 'park',
      narration: 'Budi dan Siti selalu bermain bersama dan saling menolong saat belajar. Mereka berdua adalah SAHABAT sejati.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 440, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Siti adalah sahabat baikku! Kita juga bisa menyebut sahabat dengan kata teman atau kawan!',
      },
    },
    {
      id: 'lang5_s4_2',
      title: 'Tiga Kata yang Hangat',
      background: 'park',
      narration: 'Siti tersenyum bangga memiliki sahabat yang baik hati seperti Budi.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Ya Budi! SAHABAT, TEMAN, dan KAWAN memiliki makna yang sama!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Kata manakah di bawah ini yang memiliki arti SAMA (sinonim) dengan kata SAHABAT?',
    options: [
      { id: 'A', value: 'Kawan', label: 'Kawan / Teman' },
      { id: 'B', value: 'Musuh', label: 'Musuh' },
      { id: 'C', value: 'Lawan', label: 'Lawan Lomba' },
    ],
    correctAnswer: 'A',
    explanation: 'Sinonim dari SAHABAT adalah TEMAN atau KAWAN yang selalu ada untuk kita!',
    hint: 'Orang yang bermain dan belajar bersama kita secara rukun.',
  },
  rewardXp: 60,
};

export const languageSynonymsLesson5: StoryLesson = {
  lessonId: 'lang-syn-005',
  levelId: 205,
  title: 'Soal 5: Sinonim Kata: Halaman = Pekarangan',
  subject: 'language',
  topic: 'language_antonyms',
  difficulty: 2,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 2',
    theme: 'Rumah Asri Hijau',
  },
  learningObjective: [
    'Memahami sinonim kata Halaman dan Pekarangan rumah',
    'Mengetahui kosakata lingkungan tempat tinggal',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'lang5_s5_1',
      title: 'Membersihkan Halaman Rumah',
      background: 'park',
      narration: 'Di depan rumah Budi terbentang HALAMAN yang bersih disapu. Tanaman bunga tumbuh berjejer di pekarangan rumah itu.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 460, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Halaman rumahku sudah bersih! Area tanah di luar rumah ini disebut juga pekarangan!',
      },
    },
    {
      id: 'lang5_s5_2',
      title: 'Pekarangan Asri',
      background: 'park',
      narration: 'Siti mengamati tanaman di sekeliling halaman rumah Budi yang tertata rapi.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Halaman dan pekarangan adalah sinonim untuk tanah lapang di sekitar bangunan rumah!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Budi sedang menyiram bunga di HALAMAN rumah. Kata manakah yang sama artinya dengan HALAMAN?',
    options: [
      { id: 'A', value: 'Pekarangan', label: 'Pekarangan' },
      { id: 'B', value: 'Genteng', label: 'Genteng Atap' },
      { id: 'C', value: 'Kamar', label: 'Kamar Tidur' },
    ],
    correctAnswer: 'A',
    explanation: 'Kata HALAMAN memiliki persamaan arti (sinonim) dengan PEKARANGAN!',
    hint: 'Bagian tanah terbuka di depan atau sekitar rumah.',
  },
  rewardXp: 60,
};

// ==========================================
// 📝 LEVEL 6: MENYUSUN KALIMAT SEDERHANA (SOAL 1-5)
// ==========================================

export const languageSentenceLesson1: StoryLesson = {
  lessonId: 'lang-sent-001',
  levelId: 206,
  title: 'Soal 1: Menyusun Kalimat: "Budi membaca buku"',
  subject: 'language',
  topic: 'language_comprehension',
  difficulty: 2,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 2',
    theme: 'Perpustakaan Kata',
  },
  learningObjective: [
    'Menyusun kata acak menjadi kalimat berpola Subjek - Predikat - Objek (S-P-O)',
    'Memahami makna kalimat utuh dalam bahasa Indonesia',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'lang6_s1_1',
      title: 'Kartu Kata Acak di Papan',
      background: 'classroom',
      narration: 'Di papan tulis ada tiga kartu kata acak: [membaca] - [Budi] - [buku]. Budi dan Siti ingin menyusunnya menjadi kalimat yang tepat.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 460, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Siapa yang melakukan kegiatan? Budi! Apa kegiatannya? Membaca buku!',
      },
    },
    {
      id: 'lang6_s1_2',
      title: 'Kalimat Tersusun Rapi',
      background: 'classroom',
      narration: 'Budi meletakkan kartu [Budi] di awal, diikuti [membaca], lalu diakhiri [buku].',
      actions: [
        { type: 'animate_character', characterId: 'budi', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Tersusun sempurna: "Budi membaca buku."!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Susunan kalimat yang PALING TEPAT dari kata acak: [ buku ] - [ Budi ] - [ membaca ] adalah?',
    options: [
      { id: 'A', value: 'BudiMembacaBuku', label: 'Budi membaca buku.' },
      { id: 'B', value: 'BukuMembacaBudi', label: 'Buku membaca Budi.' },
      { id: 'C', value: 'MembacaBukuBudi', label: 'Membaca buku Budi.' },
    ],
    correctAnswer: 'A',
    explanation: 'Susunan kalimat yang tepat dan masuk akal adalah: "Budi membaca buku."',
    hint: 'Orang yang membaca diletakkan di awal kalimat.',
  },
  rewardXp: 70,
};

export const languageSentenceLesson2: StoryLesson = {
  lessonId: 'lang-sent-002',
  levelId: 206,
  title: 'Soal 2: Menyusun Kalimat: "Siti menyiram bunga"',
  subject: 'language',
  topic: 'language_comprehension',
  difficulty: 2,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 2',
    theme: 'Kebun Bunga Ceria',
  },
  learningObjective: [
    'Menyusun kalimat kegiatan sehari-hari yang runtut',
    'Menentukan subjek dan kata kerja yang sesuai',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'lang6_s2_1',
      title: 'Siti Membawa Alat Siram Air',
      background: 'park',
      narration: 'Siti membawa gembor air di kebun. Bunga mawar yang mekar disirami dengan air bersih yang sejuk.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'budi', position: { x: 480, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Lihat, Siti sedang melakukan aktivitas merawat kebun bunga!',
      },
    },
    {
      id: 'lang6_s2_2',
      title: 'Kalimat Tindakan',
      background: 'park',
      narration: 'Siti merangkai kalimat dari apa yang sedang dilakukannya.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Kalimatnya adalah: "Siti menyiram bunga di kebun."',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Susunan kalimat yang BENAR dari kata: [ bunga ] - [ Siti ] - [ menyiram ] adalah?',
    options: [
      { id: 'A', value: 'SitiMenyiramBunga', label: 'Siti menyiram bunga.' },
      { id: 'B', value: 'BungaMenyiramSiti', label: 'Bunga menyiram Siti.' },
      { id: 'C', value: 'MenyiramSitiBunga', label: 'Menyiram Siti bunga.' },
    ],
    correctAnswer: 'A',
    explanation: 'Kalimat yang benar adalah "Siti menyiram bunga.", karena Siti adalah orang yang menyiram!',
    hint: 'Siti adalah pelaku yang memegang air untuk menyiram tanaman.',
  },
  rewardXp: 70,
};

export const languageSentenceLesson3: StoryLesson = {
  lessonId: 'lang-sent-003',
  levelId: 206,
  title: 'Soal 3: Mengenal Kata Kerja (Aktivitas Tubuh)',
  subject: 'language',
  topic: 'language_comprehension',
  difficulty: 2,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 2',
    theme: 'Gedung Olahraga Ceria',
  },
  learningObjective: [
    'Mengenal kata kerja (verba) sebagai kata yang menyatakan tindakan',
    'Menemukan kata kerja seperti berlari, melompat, dan makan',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'lang6_s3_1',
      title: 'Gerakan Olahraga Pagi',
      background: 'park',
      narration: 'Budi sedang BERLARI mengelilingi lapangan. Berlari adalah tindakan atau kegiatan yang menggerakkan tubuh.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 480, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Aku sedang berlari! Berlari, melompat, dan menulis adalah kata kerja!',
      },
    },
    {
      id: 'lang6_s3_2',
      title: 'Kata yang Menggambarkan Tindakan',
      background: 'park',
      narration: 'Siti menambahkan bahwa kata kerja menunjukkan perbuatan yang dilakukan oleh seseorang.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Kata kerja adalah kata yang menunjukkan aksi atau perbuatan kita!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Di antara kata-kata berikut, manakah kata yang merupakan KATA KERJA (kegiatan/tindakan)?',
    options: [
      { id: 'A', value: 'Berlari', label: 'Berlari' },
      { id: 'B', value: 'Batu', label: 'Batu Kali' },
      { id: 'C', value: 'Meja', label: 'Meja Tulis' },
    ],
    correctAnswer: 'A',
    explanation: 'Kata "Berlari" adalah kata kerja karena menunjukkan perbuatan fisik yang dilakukan tubuh!',
    hint: 'Kata yang menyatakan gerakan atau aktivitas tubuh.',
  },
  rewardXp: 70,
};

export const languageSentenceLesson4: StoryLesson = {
  lessonId: 'lang-sent-004',
  levelId: 206,
  title: 'Soal 4: Kata Tanya Ajaib: Siapa, Apa, Di Mana',
  subject: 'language',
  topic: 'language_comprehension',
  difficulty: 2,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 2',
    theme: 'Ruang Detektif Cilik',
  },
  learningObjective: [
    'Mengenal kata tanya "Siapa" untuk menanyakan orang',
    'Mengetahui fungsi kata tanya "Di mana" dan "Apa"',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'lang6_s4_1',
      title: 'Menanyakan Sahabat Baru',
      background: 'classroom',
      narration: 'Ada anak baru yang tersenyum ramah di depan pintu kelas. Budi ingin mengetahui nama anak tersebut.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 460, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Untuk menanyakan nama orang, kita menggunakan kata tanya "Siapa namamu?"',
      },
    },
    {
      id: 'lang6_s4_2',
      title: 'Kegunaan Kata Tanya',
      background: 'classroom',
      narration: 'Siti melengkapi bahwa "Di mana" untuk tempat, dan "Apa" untuk benda atau kabar.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Tepat sekali! Kata tanya "Siapa" khusus digunakan untuk menanyakan orang!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Kata tanya apakah yang kita gunakan saat ingin menanyakan NAMA SESEORANG atau pelaku?',
    options: [
      { id: 'A', value: 'Siapa', label: 'Siapa' },
      { id: 'B', value: 'Berapa', label: 'Berapa' },
      { id: 'C', value: 'Kapan', label: 'Kapan' },
    ],
    correctAnswer: 'A',
    explanation: 'Kata tanya "SIAPA" digunakan untuk menanyakan orang atau nama tokoh!',
    hint: 'Contohnya: "[ ... ] nama sahabatmu itu?"',
  },
  rewardXp: 70,
};

export const languageSentenceLesson5: StoryLesson = {
  lessonId: 'lang-sent-005',
  levelId: 206,
  title: 'Soal 5: Tanda Titik (.) dan Tanda Tanya (?)',
  subject: 'language',
  topic: 'language_comprehension',
  difficulty: 2,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 2',
    theme: 'Papan Tanda Baca',
  },
  learningObjective: [
    'Mengenal tanda titik (.) di akhir kalimat berita',
    'Mengenal tanda tanya (?) di akhir kalimat pertanyaan',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'lang6_s5_1',
      title: 'Menulis Kalimat Pertanyaan',
      background: 'classroom',
      narration: 'Siti menulis di papan tulis: "Apakah kamu suka membaca buku cerita[ ... ]" Siti mencari tanda baca penutup yang tepat.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'budi', position: { x: 480, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Karena ini adalah kalimat pertanyaan, kita harus menutupnya dengan tanda tanya (?)!',
      },
    },
    {
      id: 'lang6_s5_2',
      title: 'Tanda Baca yang Pas',
      background: 'classroom',
      narration: 'Budi setuju. Kalimat berita diakhiri titik, sedangkan pertanyaan diakhiri tanda tanya.',
      actions: [
        { type: 'animate_character', characterId: 'budi', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Benar sekali! Tanda tanya (?) membuat pembaca tahu bahwa itu adalah pertanyaan yang butuh jawaban!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Tanda baca apakah yang wajib diletakkan di AKHIR KALIMAT PERTANYAAN?',
    options: [
      { id: 'A', value: 'Tanya', label: 'Tanda Tanya ( ? )' },
      { id: 'B', value: 'Titik', label: 'Tanda Titik ( . )' },
      { id: 'C', value: 'Koma', label: 'Tanda Koma ( , )' },
    ],
    correctAnswer: 'A',
    explanation: 'Setiap kalimat pertanyaan wajib diakhiri dengan tanda tanya (?)!',
    hint: 'Tanda yang berbentuk melengkung dengan titik di bawahnya.',
  },
  rewardXp: 70,
};

// ==========================================
// 📜 LEVEL 7: SASTRA CILIK, PANTUN & TEKA-TEKI (SOAL 1-5)
// ==========================================

export const languageLiteratureLesson1: StoryLesson = {
  lessonId: 'lang-lit-001',
  levelId: 207,
  title: 'Soal 1: Rima Indah Pantun Nasihat Ceria',
  subject: 'language',
  topic: 'language_comprehension',
  difficulty: 3,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2-3',
    theme: 'Panggung Puisi Nusantara',
  },
  learningObjective: [
    'Mengenal rima akhir pantun (a-b-a-b)',
    'Melengkapi baris rima pantun dengan bunyi kata yang selaras',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'lang7_s1_1',
      title: 'Budi Membacakan Pantun',
      background: 'castle',
      narration: 'Di panggung seni istana, Budi membacakan dua baris pantun pembuka yang berbunyi merdu.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 460, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Pergi ke pasar membeli mangga, jangan lupa membeli papaya!',
      },
    },
    {
      id: 'lang7_s1_2',
      title: 'Baris Nasihat Penutup',
      background: 'castle',
      narration: 'Siti menyambut dengan baris pantun nasihat yang memiliki bunyi rima akhir yang selaras.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Rajin belajar setiap masa, agar kelak menjadi anak berguna!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Pola rima akhir bunyi yang menjadi ciri khas utama pantun empat baris adalah?',
    options: [
      { id: 'A', value: 'ABAB', label: 'Pola a - b - a - b' },
      { id: 'B', value: 'AAAA', label: 'Pola x - y - z - w yang acak' },
      { id: 'C', value: 'TanpaRima', label: 'Tanpa bunyi berirama sama sekali' },
    ],
    correctAnswer: 'A',
    explanation: 'Pantun tradisional yang indah memiliki ciri khas rima bersilang a-b-a-b pada akhir barisnya!',
    hint: 'Baris 1 berima dengan baris 3, dan baris 2 berima dengan baris 4.',
  },
  rewardXp: 80,
};

export const languageLiteratureLesson2: StoryLesson = {
  lessonId: 'lang-lit-002',
  levelId: 207,
  title: 'Soal 2: Teka-Teki Cerdik Benda Sahabat Belajar',
  subject: 'language',
  topic: 'language_comprehension',
  difficulty: 3,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2-3',
    theme: 'Menara Teka-Teki Kata',
  },
  learningObjective: [
    'Menganalisis petunjuk deskripsi untuk menebak benda',
    'Menemukan jawaban teka-teki tentang buku bacaan',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'lang7_s2_1',
      title: 'Teka-Teki dari Gulungan Kertas',
      background: 'castle',
      narration: 'Siti membuka gulungan kertas teka-teki kuno di perpustakaan istana. Tertulis teka-teki yang sangat menarik.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'budi', position: { x: 460, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Aku punya banyak lembaran halaman, berisi tulisan dan gambar ilmu, tapi aku tidak bisa berbicara. Siapakah aku?',
      },
    },
    {
      id: 'lang7_s2_2',
      title: 'Tebakan Budi yang Jitu',
      background: 'castle',
      narration: 'Budi langsung tersenyum karena mengenali benda yang setiap hari ia pegang untuk belajar.',
      actions: [
        { type: 'animate_character', characterId: 'budi', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Jawabannya pasti BUKU CERITA! Jendela dunia tempat kita menimba ilmu!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Teka-teki: "Aku memiliki lembaran berhalaman, penuh tulisan ilmu, dibaca oleh siswa. Benda apakah aku?"',
    options: [
      { id: 'A', value: 'Buku', label: 'Buku Bacaan' },
      { id: 'B', value: 'Piring', label: 'Piring Makan' },
      { id: 'C', value: 'Sepatu', label: 'Sepatu Roda' },
    ],
    correctAnswer: 'A',
    explanation: 'Benda yang memiliki banyak halaman berisi tulisan dan ilmu adalah BUKU!',
    hint: 'Benda yang dibaca setiap hari oleh Budi dan Siti di kelas.',
  },
  rewardXp: 80,
};

export const languageLiteratureLesson3: StoryLesson = {
  lessonId: 'lang-lit-003',
  levelId: 207,
  title: 'Soal 3: Ungkapan Bijak "Kutu Buku"',
  subject: 'language',
  topic: 'language_comprehension',
  difficulty: 3,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2-3',
    theme: 'Koleksi Buku Kerajaan',
  },
  learningObjective: [
    'Mengenal arti ungkapan kiasan bahasa Indonesia',
    'Memahami makna ungkapan "Kutu Buku" sebagai orang yang sangat gemar membaca',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'lang7_s3_1',
      title: 'Siti yang Selalu Membaca',
      background: 'castle',
      narration: 'Di setiap waktu luang, Siti selalu memegang dan membaca buku ensiklopedia. Teman-teman menjulukinya "Kutu Buku" dengan penuh kagum.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 480, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Siti dijuluki "Kutu Buku" bukan karena ada kutu di kepalanya, tapi karena ia sangat suka membaca buku!',
      },
    },
    {
      id: 'lang7_s3_2',
      title: 'Makna Kiasan yang Positif',
      background: 'castle',
      narration: 'Siti tersipu senang. Ungkapan "Kutu Buku" adalah pujian bagi orang yang rajin dan haus akan ilmu pengetahuan.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Ayo teman-teman, mari kita semua menjadi anak yang gemar membaca buku!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Apakah ARTI sebenarnya dari ungkapan kata kiasan "KUTU BUKU"?',
    options: [
      { id: 'A', value: 'SukaMembaca', label: 'Orang yang Sangat Gemar dan Rajin Membaca Buku' },
      { id: 'B', value: 'KutuHewan', label: 'Serangga Kecil yang Merusak Kertas' },
      { id: 'C', value: 'MalasBelajar', label: 'Orang yang Tidak Suka Membaca' },
    ],
    correctAnswer: 'A',
    explanation: 'Ungkapan "Kutu Buku" adalah kiasan bahasa Indonesia untuk orang yang sangat rajin dan senang membaca buku!',
    hint: 'Bukan arti serangga, melainkan sifat anak yang cinta membaca buku.',
  },
  rewardXp: 80,
};

export const languageLiteratureLesson4: StoryLesson = {
  lessonId: 'lang-lit-004',
  levelId: 207,
  title: 'Soal 4: Peribahasa "Rajin Pangkal Pandai"',
  subject: 'language',
  topic: 'language_comprehension',
  difficulty: 3,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2-3',
    theme: 'Aula Bintang Kebaikan',
  },
  learningObjective: [
    'Mengenal peribahasa terkenal bahasa Indonesia',
    'Mengetahui makna peribahasa "Rajin pangkal pandai, hemat pangkal kaya"',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'lang7_s4_1',
      title: 'Prasasti Nasihat Belajar',
      background: 'castle',
      narration: 'Di dinding perpustakaan megah terukir peribahasa emas: "Rajin Pangkal Pandai". Budi membacanya dengan penuh semangat.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 440, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Peribahasa "Rajin Pangkal Pandai" artinya jika kita rajin belajar, kita pasti akan menjadi anak yang cerdas!',
      },
    },
    {
      id: 'lang7_s4_2',
      title: 'Kunci Menuju Keberhasilan',
      background: 'castle',
      narration: 'Siti mengangguk setuju bahwa ketekunan setiap hari selalu membuahkan hasil yang manis.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Tidak ada anak yang tidak bisa, asalkan kita selalu rajin dan tekun berlatih!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Lengkapi peribahasa terkenal yang menjadi nasihat bagi para pelajar ini: "Rajin Pangkal [ ... ]" ?',
    options: [
      { id: 'A', value: 'Pandai', label: 'Pandai' },
      { id: 'B', value: 'Lelah', label: 'Lelah' },
      { id: 'C', value: 'Tidur', label: 'Tidur' },
    ],
    correctAnswer: 'A',
    explanation: 'Peribahasa yang lengkap adalah "Rajin Pangkal Pandai, Hemat Pangkal Kaya"!',
    hint: 'Kata yang berarti pintar, berilmu, dan cerdas.',
  },
  rewardXp: 80,
};

export const languageLiteratureLesson5: StoryLesson = {
  lessonId: 'lang-lit-005',
  levelId: 207,
  title: 'Soal 5: Mahkota Raja Literasi Membaca',
  subject: 'language',
  topic: 'language_comprehension',
  difficulty: 3,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2-3',
    theme: 'Ruang Mahkota Kebanggaan',
  },
  learningObjective: [
    'Menyimpulkan seluruh manfaat membaca dan kemampuan literasi',
    'Menjadi duta literasi cilik yang cinta bahasa Indonesia',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'lang7_s5_1',
      title: 'Peti Buku Ajaib Terbuka',
      background: 'castle',
      narration: 'Selamat! Budi dan Siti telah menyelesaikan seluruh tantangan kata, ejaan, pantun, dan cerita bergambar. Sebuah peti emas berkilau terbuka!',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 440, y: 320 }, animation: 'walk' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Hore! Membaca membuka jendela ilmu dunia dan membuat pikiran kita semakin luas!',
      },
    },
    {
      id: 'lang7_s5_2',
      title: 'Bintang Pahlawan Bahasa',
      background: 'castle',
      narration: 'Siti menyematkan lencana Bintang Pahlawan Bahasa. Membaca dan menulis adalah sahabat terbaik kita seumur hidup.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
        { type: 'animate_character', characterId: 'budi', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Selamat untuk kita semua! Teruslah gemar membaca dan mencintai bahasa Indonesia yang indah!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Mengapa buku sering dijuluki sebagai "JENDELA DUNIA" bagi semua orang?',
    options: [
      { id: 'A', value: 'BukaIlmu', label: 'Karena dengan Membaca Kita Mengenal Segala Ilmu dan Pengetahuan di Dunia' },
      { id: 'B', value: 'KacaJendela', label: 'Karena Buku Terbuat dari Kaca Jendela Rumah' },
      { id: 'C', value: 'TutupAngin', label: 'Hanya untuk Menutup Angin Masuk' },
    ],
    correctAnswer: 'A',
    explanation: 'Buku disebut jendela dunia karena lewat membaca kita bisa melihat dan menjelajahi seluruh ilmu serta keajaiban dunia!',
    hint: 'Pilihan yang menjelaskan manfaat membaca membuka wawasan dan pengetahuan.',
  },
  rewardXp: 90,
};
