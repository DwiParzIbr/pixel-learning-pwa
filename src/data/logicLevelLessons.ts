import { CharacterDef, StoryLesson } from '@/types/story';

const budiDef: CharacterDef = {
  id: 'budi',
  name: 'Budi',
  asset: 'character_budi',
  color: '#3b82f6',
  personality: 'Cerdik, teliti, suka memecahkan teka-teki, dan pantang menyerah',
  voiceProfile: { pitch: 1.45, rate: 1.05 },
};

const sitiDef: CharacterDef = {
  id: 'siti',
  name: 'Siti',
  asset: 'character_siti',
  color: '#ec4899',
  personality: 'Cermat, jeli, analitis, dan selalu gembira mencari jawaban',
  voiceProfile: { pitch: 1.75, rate: 0.96 },
};

// ==========================================
// 🔴 LEVEL 1: POLA & URUTAN BERULANG (SOAL 2-5)
// ==========================================

export const logicPatternsLesson2: StoryLesson = {
  lessonId: 'log-pattern-002',
  levelId: 401,
  title: 'Soal 2: Pola Buah di Meja Piknik',
  subject: 'logic',
  topic: 'logic_patterns',
  difficulty: 1,
  metadata: {
    ageGroup: '5-8',
    grade: 'TK-B / SD 1',
    theme: 'Meja Piknik Taman',
  },
  learningObjective: [
    'Mengenali pola pengulangan benda selang-seling ABAB',
    'Menentukan jenis buah berikutnya berdasarkan urutan pola',
  ],
  characters: [sitiDef, budiDef],
  scenes: [
    {
      id: 'log1_s2_1',
      title: 'Barisan Buah di Taplak Meja',
      background: 'park',
      narration: 'Siti menata buah-buahan di taplak meja piknik dengan pola teratur: Apel merah, Pisang kuning, Apel merah, Pisang kuning.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'budi', position: { x: 480, y: 320 }, animation: 'idle' },
        { type: 'spawn_object', object: 'apple', quantity: 2, position: { x: 360, y: 340 } },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Apel merah, lalu pisang kuning, apel merah, lalu pisang kuning... Setelah pisang, kembali ke buah apa ya?',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Buah apakah yang tepat untuk melanjutkan pola: Apel - Pisang - Apel - Pisang - [ ... ]?',
    options: [
      { id: 'A', value: 'Apel', label: 'Buah Apel Merah' },
      { id: 'B', value: 'Semangka', label: 'Buah Semangka Hijau' },
      { id: 'C', value: 'Jeruk', label: 'Buah Jeruk Manis' },
    ],
    correctAnswer: 'A',
    explanation: 'Polanya adalah bergantian: Apel, lalu Pisang. Maka setelah Pisang kembali lagi ke Apel!',
    hint: 'Lihat buah pertama pada urutan pengulangan.',
  },
  rewardXp: 50,
};

export const logicPatternsLesson3: StoryLesson = {
  lessonId: 'log-pattern-003',
  levelId: 401,
  title: 'Soal 3: Pola Bentuk Geometri Berulang',
  subject: 'logic',
  topic: 'logic_patterns',
  difficulty: 1,
  metadata: {
    ageGroup: '5-8',
    grade: 'SD Kelas 1',
    theme: 'Kertas Gambar Stempel',
  },
  learningObjective: [
    'Mengenali pola urutan tiga bentuk geometri ABC-ABC',
    'Memprediksi bentuk ketiga yang melengkapi pola',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'log1_s3_1',
      title: 'Cap Stempel Berwarna',
      background: 'classroom',
      narration: 'Budi mencap stempel di kertas panjang dengan pola teratur: Lingkaran, Kotak, Segitiga, lalu Lingkaran, Kotak...',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 460, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Perhatikan polanya: Lingkaran, Kotak, Segitiga. Setelah Lingkaran dan Kotak, bentuk apakah berikutnya?',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Bentuk apakah berikutnya dalam pola: Lingkaran - Kotak - Segitiga - Lingkaran - Kotak - [ ... ]?',
    options: [
      { id: 'A', value: 'Segitiga', label: 'Segitiga Runcing' },
      { id: 'B', value: 'Bintang', label: 'Bintang Berkilau' },
      { id: 'C', value: 'Bulan', label: 'Bulan Sabit' },
    ],
    correctAnswer: 'A',
    explanation: 'Urutan kelompoknya adalah Lingkaran, Kotak, Segitiga. Setelah Lingkaran dan Kotak, pasti Segitiga!',
    hint: 'Bentuk yang memiliki 3 sisi lancip.',
  },
  rewardXp: 50,
};

export const logicPatternsLesson4: StoryLesson = {
  lessonId: 'log-pattern-004',
  levelId: 401,
  title: 'Soal 4: Pola Ukuran Besar dan Kecil',
  subject: 'logic',
  topic: 'logic_patterns',
  difficulty: 1,
  metadata: {
    ageGroup: '5-8',
    grade: 'TK-B / SD 1',
    theme: 'Rak Boneka Beruang',
  },
  learningObjective: [
    'Mengidentifikasi pola perulangan berdasarkan ukuran benda',
    'Menentukan ukuran berikutnya dalam rangkaian visual',
  ],
  characters: [sitiDef],
  scenes: [
    {
      id: 'log1_s4_1',
      title: 'Deretan Boneka Beruang',
      background: 'classroom',
      narration: 'Siti merapikan boneka beruang di atas meja: Beruang Besar, Beruang Kecil, Beruang Besar, Beruang Kecil.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 280, y: 320 }, animation: 'walk' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Boneka Beruang Besar, lalu Beruang Kecil, Beruang Besar, Beruang Kecil... Boneka mana setelahnya?',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Boneka ukuran apakah yang melengkapi urutan: Besar - Kecil - Besar - Kecil - [ ... ]?',
    options: [
      { id: 'A', value: 'Besar', label: 'Boneka Beruang Besar' },
      { id: 'B', value: 'Mungil', label: 'Boneka Sangat Mungil' },
      { id: 'C', value: 'Sedang', label: 'Boneka Ukuran Sedang' },
    ],
    correctAnswer: 'A',
    explanation: 'Pola ukurannya adalah bergantian: Besar, Kecil, Besar, Kecil, lalu kembali ke Besar!',
    hint: 'Setelah boneka kecil selalu diikuti oleh boneka apa?',
  },
  rewardXp: 50,
};

export const logicPatternsLesson5: StoryLesson = {
  lessonId: 'log-pattern-005',
  levelId: 401,
  title: 'Soal 5: Pola Tepuk dan Lompatan Musik',
  subject: 'logic',
  topic: 'logic_patterns',
  difficulty: 1,
  metadata: {
    ageGroup: '5-8',
    grade: 'SD Kelas 1',
    theme: 'Panggung Senam Irama',
  },
  learningObjective: [
    'Menerapkan pola ritmis gerak tubuh secara berurutan',
    'Melatih ketangkasan berpikir logis melalui gerakan senam',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'log1_s5_1',
      title: 'Tari Irama Ceria',
      background: 'park',
      narration: 'Budi dan Siti menari mengikuti irama musik: Tepuk tangan, Melompat, Tepuk tangan, Melompat.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 240, y: 320 }, animation: 'celebrate' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 440, y: 320 }, animation: 'happy' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Tepuk tangan, lalu melompat, tepuk tangan, lalu melompat! Gerakan apa setelah melompat?',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Gerakan apakah yang mengikuti pola ritmis: Tepuk - Lompat - Tepuk - Lompat - [ ... ]?',
    options: [
      { id: 'A', value: 'Tepuk', label: 'Tepuk Tangan Ceria' },
      { id: 'B', value: 'Tidur', label: 'Berbaring Tidur' },
      { id: 'C', value: 'Duduk', label: 'Duduk Diam Saja' },
    ],
    correctAnswer: 'A',
    explanation: 'Pola gerakannya adalah Tepuk, lalu Lompat. Setelah melompat, gerakannya kembali ke Tepuk tangan!',
    hint: 'Gunakan kedua telapak tangan untuk membuat bunyi bertepuk.',
  },
  rewardXp: 50,
};

// ==========================================
// 🔍 LEVEL 2: KLASIFIKASI & MENCARI YANG BERBEDA (SOAL 2-5)
// ==========================================

export const logicOddOneOutLesson2: StoryLesson = {
  lessonId: 'log-odd-002',
  levelId: 402,
  title: 'Soal 2: Hewan yang Hidup di Air',
  subject: 'logic',
  topic: 'logic_shapes',
  difficulty: 1,
  metadata: {
    ageGroup: '5-8',
    grade: 'SD Kelas 1',
    theme: 'Kolam dan Halaman Rumput',
  },
  learningObjective: [
    'Mengelompokkan hewan berdasarkan habitat hidupnya',
    'Menemukan hewan air di antara kelompok unggas darat',
  ],
  characters: [sitiDef],
  scenes: [
    {
      id: 'log2_s2_1',
      title: 'Tepi Kolam Ikan',
      background: 'park',
      narration: 'Di halaman ada Ayam jago, Bebek berenang di tepi, Burung pipit di dahan, dan seekor Ikan mas berenang di dalam air kolam.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 260, y: 320 }, animation: 'walk' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Ayam, bebek, dan burung berkaki dua dan bernapas dengan paru-paru. Siapa yang bernapas dengan insang di dalam air?',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Di antara: Ayam, Bebek, Burung, dan Ikan Mas. Hewan manakah yang hidup dan bernapas di dalam AIR?',
    options: [
      { id: 'A', value: 'IkanMas', label: 'Ikan Mas di Kolam' },
      { id: 'B', value: 'AyamJago', label: 'Ayam Jago Berkokok' },
      { id: 'C', value: 'BurungPipit', label: 'Burung Pipit Kecil' },
    ],
    correctAnswer: 'A',
    explanation: 'Ikan Mas bernapas dengan insang dan berenang di dalam air, berbeda dari ayam, bebek, dan burung!',
    hint: 'Hewan yang memiliki sirip dan sisik mengilap.',
  },
  rewardXp: 50,
};

export const logicOddOneOutLesson3: StoryLesson = {
  lessonId: 'log-odd-003',
  levelId: 402,
  title: 'Soal 3: Alat Tulis Sekolah vs Alat Makan',
  subject: 'logic',
  topic: 'logic_shapes',
  difficulty: 1,
  metadata: {
    ageGroup: '5-8',
    grade: 'SD Kelas 1',
    theme: 'Meja Belajar Budi',
  },
  learningObjective: [
    'Membedakan perlengkapan sekolah dengan peralatan makan',
    'Mengidentifikasi benda asing di dalam wadah belajar',
  ],
  characters: [budiDef],
  scenes: [
    {
      id: 'log2_s3_1',
      title: 'Merapikan Meja Belajar',
      background: 'classroom',
      narration: 'Di atas meja belajar terdapat Pensil, Penghapus, Penggaris, dan sebuah Sendok makan sup.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 240, y: 320 }, animation: 'walk' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Pensil, penghapus, dan penggaris untuk belajar di sekolah. Benda mana yang biasa dipakai saat makan di dapur?',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Di antara benda berikut, manakah yang BUKAN merupakan alat tulis sekolah melainkan alat makan?',
    options: [
      { id: 'A', value: 'Sendok', label: 'Sendok Makan Sup' },
      { id: 'B', value: 'Pensil', label: 'Pensil Tulis Kayu' },
      { id: 'C', value: 'Penggaris', label: 'Penggaris Plastik' },
    ],
    correctAnswer: 'A',
    explanation: 'Sendok adalah peralatan makan di dapur, sedangkan pensil dan penggaris adalah alat tulis sekolah!',
    hint: 'Benda yang kita gunakan untuk menyuap makanan ke mulut.',
  },
  rewardXp: 50,
};

export const logicOddOneOutLesson4: StoryLesson = {
  lessonId: 'log-odd-004',
  levelId: 402,
  title: 'Soal 4: Kendaraan Udara vs Kendaraan Darat',
  subject: 'logic',
  topic: 'logic_shapes',
  difficulty: 1,
  metadata: {
    ageGroup: '5-8',
    grade: 'SD Kelas 1',
    theme: 'Bandara dan Jalan Raya',
  },
  learningObjective: [
    'Mengkategorikan jenis transportasi berdasarkan lintasannya',
    'Menemukan kendaraan darat di antara kelompok angkutan udara',
  ],
  characters: [sitiDef],
  scenes: [
    {
      id: 'log2_s4_1',
      title: 'Melihat Langit Bandara',
      background: 'park',
      narration: 'Siti melihat Pesawat terbang, Helikopter, Balon udara di angkasa, dan sebuah Mobil yang melaju di jalan aspal.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 260, y: 320 }, animation: 'walk' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Pesawat, helikopter, dan balon udara terbang tinggi di langit. Kendaraan mana yang berjalan di jalan raya darat?',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Manakah kendaraan yang TIDAK terbang di udara melainkan melaju di jalan darat?',
    options: [
      { id: 'A', value: 'Mobil', label: 'Mobil Roda Empat' },
      { id: 'B', value: 'Pesawat', label: 'Pesawat Terbang' },
      { id: 'C', value: 'BalonUdara', label: 'Balon Udara Raksasa' },
    ],
    correctAnswer: 'A',
    explanation: 'Mobil berjalan di atas aspal jalan raya darat dan tidak memiliki sayap untuk terbang di langit!',
    hint: 'Kendaraan beroda empat yang melaju di jalanan.',
  },
  rewardXp: 50,
};

export const logicOddOneOutLesson5: StoryLesson = {
  lessonId: 'log-odd-005',
  levelId: 402,
  title: 'Soal 5: Rasa Makanan Manis vs Asin',
  subject: 'logic',
  topic: 'logic_shapes',
  difficulty: 1,
  metadata: {
    ageGroup: '5-8',
    grade: 'SD Kelas 1',
    theme: 'Meja Dapur Cita Rasa',
  },
  learningObjective: [
    'Mengklasifikasikan bahan makanan berdasarkan sensasi rasa lidah',
    'Menemukan bumbu dapur asin di antara camilan manis',
  ],
  characters: [budiDef],
  scenes: [
    {
      id: 'log2_s5_1',
      title: 'Mencicipi Rasa di Meja',
      background: 'market',
      narration: 'Di meja ada Cokelat batangan manis, Permen buah manis, Es krim vanila manis, dan toples Garam dapur.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'cake', quantity: 2, position: { x: 380, y: 340 } },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Cokelat, permen, dan es krim rasanya manis lezat. Tapi garam ini rasanya apa ya?',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Benda manakah yang rasanya ASIN dan bukan makanan bercita rasa manis?',
    options: [
      { id: 'A', value: 'Garam', label: 'Garam Dapur Asin' },
      { id: 'B', value: 'Cokelat', label: 'Cokelat Batang Manis' },
      { id: 'C', value: 'Permen', label: 'Permen Buah Manis' },
    ],
    correctAnswer: 'A',
    explanation: 'Garam dapur rasanya asin gurih untuk memasak sayur, bukan makanan manis pencuci mulut!',
    hint: 'Butiran putih yang digunakan ibu untuk memberi rasa asin pada sup.',
  },
  rewardXp: 50,
};

// ==========================================
// 📏 LEVEL 3: URUTAN UKURAN, TINGGI & BERAT (SOAL 2-5)
// ==========================================

export const logicSortingLesson2: StoryLesson = {
  lessonId: 'log-sort-002',
  levelId: 403,
  title: 'Soal 2: Urutan dari Paling Tinggi ke Paling Pendek',
  subject: 'logic',
  topic: 'logic_sorting',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Kebun Tumbuhan Hijau',
  },
  learningObjective: [
    'Membandingkan tinggi objek di lingkungan sekitar',
    'Menyusun urutan dari paling tinggi ke paling pendek',
  ],
  characters: [budiDef],
  scenes: [
    {
      id: 'log3_s2_1',
      title: 'Tiga Tanaman di Kebun',
      background: 'park',
      narration: 'Budi mengamati tiga tanaman di kebun: Pohon Kelapa yang menjulang, Pohon Pisang berukuran sedang, dan Rumput liar di tanah.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'walk' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Pohon kelapa paling tinggi, pohon pisang sedang, dan rumput paling pendek di dekat kaki kita.',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Manakah urutan yang tepat dari tanaman yang PALING TINGGI ke yang PALING PENDEK?',
    options: [
      { id: 'A', value: 'K-P-R', label: 'Pohon Kelapa -> Pohon Pisang -> Rumput' },
      { id: 'B', value: 'R-P-K', label: 'Rumput -> Pohon Pisang -> Pohon Kelapa' },
      { id: 'C', value: 'P-R-K', label: 'Pohon Pisang -> Rumput -> Pohon Kelapa' },
    ],
    correctAnswer: 'A',
    explanation: 'Pohon kelapa menjulang sangat tinggi, pohon pisang berukuran sedang, dan rumput paling pendek dekat tanah!',
    hint: 'Mulailah dari pohon yang pucuknya paling dekat ke langit.',
  },
  rewardXp: 60,
};

export const logicSortingLesson3: StoryLesson = {
  lessonId: 'log-sort-003',
  levelId: 403,
  title: 'Soal 3: Benda yang Paling Berat',
  subject: 'logic',
  topic: 'logic_sorting',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Meja Percobaan Massa Benda',
  },
  learningObjective: [
    'Memahami konsep massa dan berat benda melalui perbandingan nalar',
    'Menentukan objek terberat di antara benda-benda ringan',
  ],
  characters: [sitiDef],
  scenes: [
    {
      id: 'log3_s3_1',
      title: 'Menimbang dengan Tangan',
      background: 'classroom',
      narration: 'Siti memegang sehelai kapas putih, selembar daun kering, dan sebuah batu kali besar yang padat.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 280, y: 320 }, animation: 'walk' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Kapas dan daun kering sangat ringan diterbangkan angin, sedangkan batu kali ini kokoh dan berat!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Di antara sehelai kapas, selembar daun kering, dan sebuah batu kali besar, manakah yang PALING BERAT?',
    options: [
      { id: 'A', value: 'BatuKali', label: 'Batu Kali Besar' },
      { id: 'B', value: 'Kapas', label: 'Sehelai Kapas Lembut' },
      { id: 'C', value: 'Daun', label: 'Selembar Daun Kering' },
    ],
    correctAnswer: 'A',
    explanation: 'Batu kali padat memiliki massa dan bobot paling berat dibanding kapas dan daun kering yang ringan!',
    hint: 'Benda yang tidak akan tertiup oleh hembusan angin sepoi-sepoi.',
  },
  rewardXp: 60,
};

export const logicSortingLesson4: StoryLesson = {
  lessonId: 'log-sort-004',
  levelId: 403,
  title: 'Soal 4: Urutan Waktu Pagi, Siang, dan Malam',
  subject: 'logic',
  topic: 'logic_sorting',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Putaran Waktu Sehari-hari',
  },
  learningObjective: [
    'Mengenal kronologi urutan waktu dari awal hingga akhir hari',
    'Menyusun urutan waktu aktivitas harian secara logis',
  ],
  characters: [budiDef],
  scenes: [
    {
      id: 'log3_s4_1',
      title: 'Matahari dan Bintang',
      background: 'park',
      narration: 'Matahari terbit cerah di pagi hari, terasa hangat di siang hari, lalu digantikan oleh bulan dan bintang di malam hari.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'walk' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Kita bangun di pagi hari, makan siang saat terik siang hari, lalu tidur saat malam bertabur bintang.',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Manakah urutan pergantian waktu harian yang benar dari awal hari?',
    options: [
      { id: 'A', value: 'P-S-M', label: 'Pagi Hari -> Siang Hari -> Malam Hari' },
      { id: 'B', value: 'M-S-P', label: 'Malam Hari -> Siang Hari -> Pagi Hari' },
      { id: 'C', value: 'S-P-M', label: 'Siang Hari -> Pagi Hari -> Malam Hari' },
    ],
    correctAnswer: 'A',
    explanation: 'Hari diawali dengan fajar terbitnya matahari di pagi hari, matahari naik di siang hari, dan gelap di malam hari!',
    hint: 'Waktu kita berangkat ke sekolah, lalu waktu makan siang, lalu waktu istirahat tidur.',
  },
  rewardXp: 60,
};

export const logicSortingLesson5: StoryLesson = {
  lessonId: 'log-sort-005',
  levelId: 403,
  title: 'Soal 5: Mengurutkan Jumlah Isi Mangkuk',
  subject: 'logic',
  topic: 'logic_sorting',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Mangkuk Kelereng Berwarna',
  },
  learningObjective: [
    'Mengurutkan wadah berdasarkan kuantitas isi benda',
    'Melatih nalar perbandingan urutan naik (ascending order)',
  ],
  characters: [sitiDef],
  scenes: [
    {
      id: 'log3_s5_1',
      title: 'Tiga Mangkuk di Meja',
      background: 'classroom',
      narration: 'Di meja ada 3 mangkuk: Mangkuk A berisi 2 kelereng, Mangkuk B berisi 5 kelereng, dan Mangkuk C berisi 8 kelereng.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 280, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'marble', quantity: 5, position: { x: 420, y: 340 } },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Ayo kita urutkan mangkuk dari yang berisi paling sedikit kelereng sampai yang paling banyak!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Manakah urutan mangkuk dari yang berisi kelereng PALING SEDIKIT menuju PALING BANYAK?',
    options: [
      { id: 'A', value: 'A-B-C', label: 'Mangkuk A (2) -> Mangkuk B (5) -> Mangkuk C (8)' },
      { id: 'B', value: 'C-B-A', label: 'Mangkuk C (8) -> Mangkuk B (5) -> Mangkuk A (2)' },
      { id: 'C', value: 'B-C-A', label: 'Mangkuk B (5) -> Mangkuk C (8) -> Mangkuk A (2)' },
    ],
    correctAnswer: 'A',
    explanation: '2 butir adalah yang paling sedikit, lalu 5 butir, dan 8 butir adalah yang paling banyak!',
    hint: 'Angka 2 lebih kecil dari 5, dan 5 lebih kecil dari 8.',
  },
  rewardXp: 60,
};

// ==========================================
// ⭕ LEVEL 4: BENTUK GEOMETRI & BAYANGAN (SOAL 2-5)
// ==========================================

export const logicShapesLesson2: StoryLesson = {
  lessonId: 'log-shape-002',
  levelId: 404,
  title: 'Soal 2: Mengenal Bentuk Segitiga 3 Sisi',
  subject: 'logic',
  topic: 'logic_shapes',
  difficulty: 2,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1-2',
    theme: 'Piknik Geometri',
  },
  learningObjective: [
    'Mengenali ciri-ciri bentuk segitiga (3 sisi lurus dan 3 sudut)',
    'Mengidentifikasi benda nyata yang berwujud segitiga',
  ],
  characters: [sitiDef],
  scenes: [
    {
      id: 'log4_s2_1',
      title: 'Seiris Pizza Lezat',
      background: 'park',
      narration: 'Siti mengambil sepotong pizza renyah. Potongan pizza itu memiliki tiga garis sisi lurus dan tiga sudut runcing.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'cake', quantity: 2, position: { x: 420, y: 340 } },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Lihat sepotong pizza ini! Memiliki 3 garis sisi dan 3 titik sudut runcing seperti segitiga!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Benda manakah yang memiliki 3 sisi dan 3 sudut seperti bentuk dasar SEGITIGA?',
    options: [
      { id: 'A', value: 'Pizza', label: 'Seiris Potongan Pizza / Tenda Kemah' },
      { id: 'B', value: 'Piring', label: 'Piring Makan Bundar Melingkar' },
      { id: 'C', value: 'PapanTulis', label: 'Papan Tulis Persegi Kotak' },
    ],
    correctAnswer: 'A',
    explanation: 'Seiris potongan pizza dan tenda kemah memiliki 3 sudut lancip membentuk bangun segitiga!',
    hint: 'Bentuk yang memiliki tiga garis lurus berujung runcing.',
  },
  rewardXp: 70,
};

export const logicShapesLesson3: StoryLesson = {
  lessonId: 'log-shape-003',
  levelId: 404,
  title: 'Soal 3: Mengenal Bentuk Persegi Kotak Sama Sisi',
  subject: 'logic',
  topic: 'logic_shapes',
  difficulty: 2,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1-2',
    theme: 'Kotak Mainan Budi',
  },
  learningObjective: [
    'Mengenali ciri-ciri bangun persegi (4 sisi sama panjang)',
    'Menghubungkan bentuk persegi dengan benda di sekitar',
  ],
  characters: [budiDef],
  scenes: [
    {
      id: 'log4_s3_1',
      title: 'Dadu Permainan Ular Tangga',
      background: 'classroom',
      narration: 'Budi mengamati dadu permainan di tangannya. Keempat sisi bidangnya lurus dan memiliki ukuran panjang yang sama.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Dadu ini memiliki 4 sisi lurus yang sama panjang di setiap sisinya, yaitu bentuk persegi!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Benda manakah yang memiliki 4 sisi lurus sama panjang membentuk PERSEGI (KOTAK)?',
    options: [
      { id: 'A', value: 'Dadu', label: 'Dadu Permainan / Biskuit Kotak' },
      { id: 'B', value: 'BolaSepak', label: 'Bola Sepak Bulat' },
      { id: 'C', value: 'Telur', label: 'Telur Ayam Lonjong' },
    ],
    correctAnswer: 'A',
    explanation: 'Dadu permainan dan biskuit kotak memiliki 4 sisi lurus yang sama panjang membentuk persegi sempurna!',
    hint: 'Bentuk kotak dengan empat sudut siku-siku yang sama panjang.',
  },
  rewardXp: 70,
};

export const logicShapesLesson4: StoryLesson = {
  lessonId: 'log-shape-004',
  levelId: 404,
  title: 'Soal 4: Menjodohkan Benda dengan Bayangannya',
  subject: 'logic',
  topic: 'logic_shapes',
  difficulty: 2,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1-2',
    theme: 'Bayangan Cahaya Dinding',
  },
  learningObjective: [
    'Memahami hubungan bentuk fisik benda dengan bentuk bayangan siluetnya',
    'Melatih persepsi spasial visual anak',
  ],
  characters: [sitiDef],
  scenes: [
    {
      id: 'log4_s4_1',
      title: 'Lampu Senter dan Bola',
      background: 'classroom',
      narration: 'Siti menyalakan lampu senter ke arah bola bulat yang ditaruh di depan dinding putih.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 260, y: 320 }, animation: 'walk' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Saat bola bulat bundar disinari lampu senter, bentuk bayangan di dinding persis seperti bentuk aslinya!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Jika sebuah benda berbentuk BOLA BULAT disinari cahaya, bagaimanakah bentuk bayangan yang muncul di dinding?',
    options: [
      { id: 'A', value: 'Bulat', label: 'Bayangan Bulat Melingkar' },
      { id: 'B', value: 'Persegi', label: 'Bayangan Kotak Persegi Panjang' },
      { id: 'C', value: 'Bintang', label: 'Bayangan Bintang Bergerigi' },
    ],
    correctAnswer: 'A',
    explanation: 'Bentuk bayangan mengikuti kontur luar benda aslinya, sehingga bola bulat akan menghasilkan bayangan bulat!',
    hint: 'Siluet bayangan selalu mencerminkan bentuk luar benda aslinya.',
  },
  rewardXp: 70,
};

export const logicShapesLesson5: StoryLesson = {
  lessonId: 'log-shape-005',
  levelId: 404,
  title: 'Soal 5: Potongan Puzzle Bintang yang Cocok',
  subject: 'logic',
  topic: 'logic_shapes',
  difficulty: 2,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1-2',
    theme: 'Papan Puzzle Kayu',
  },
  learningObjective: [
    'Mencocokkan bentuk rongga geometri dengan kepingan yang sesuai',
    'Melatih ketelitian daya amatan bentuk anak',
  ],
  characters: [budiDef],
  scenes: [
    {
      id: 'log4_s5_1',
      title: 'Kepingan Puzzle Terakhir',
      background: 'castle',
      narration: 'Di pintu gerbang terdapat rongga puzzle kosong berbentuk bintang berujung lima.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'star', quantity: 3, position: { x: 420, y: 320 } },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Lubang puzzle ini memiliki lima sudut lancip seperti bintang! Potongan mana yang bisa pas masuk ke dalamnya?',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Potongan puzzle manakah yang tepat untuk mengisi lubang berbentuk BINTANG berujung lima?',
    options: [
      { id: 'A', value: 'Bintang', label: 'Kepingan Berbentuk Bintang' },
      { id: 'B', value: 'Lingkaran', label: 'Kepingan Berbentuk Lingkaran' },
      { id: 'C', value: 'Segitiga', label: 'Kepingan Berbentuk Segitiga' },
    ],
    correctAnswer: 'A',
    explanation: 'Lubang bintang berujung lima hanya bisa pas tertutup sempurna oleh kepingan yang juga berbentuk bintang!',
    hint: 'Bentuk kepingan harus sama persis dengan bentuk lubangnya.',
  },
  rewardXp: 70,
};

// ==========================================
// 💡 LEVEL 5: SEBAB & AKIBAT CERDIK (SOAL 1-5)
// ==========================================

export const logicCauseEffectLesson1: StoryLesson = {
  lessonId: 'log-cause-001',
  levelId: 405,
  title: 'Soal 1: Payung Saat Hujan Deras',
  subject: 'logic',
  topic: 'logic_cause_effect',
  difficulty: 2,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2',
    theme: 'Hujan di Taman',
  },
  learningObjective: [
    'Memahami hubungan sebab akibat antara hujan dan penggunaan payung',
    'Menalar fungsi alat pelindung dari cuaca',
  ],
  characters: [budiDef],
  scenes: [
    {
      id: 'log5_s1_1',
      title: 'Awan Gelap Menurunkan Hujan',
      background: 'park',
      narration: 'Tetes-tetes air hujan deras mulai berjatuhan dari langit. Budi segera membuka payung lebarnya.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'walk' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Hujan deras turun! Ayo buka payung agar badan dan baju kita tetap kering terlindung!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Mengapa kita perlu membuka payung saat berjalan di tengah guyuran hujan lebat?',
    options: [
      { id: 'A', value: 'LindungKering', label: 'Supaya tubuh dan baju kita terlindung dan tidak basah kuyup' },
      { id: 'B', value: 'Terbang', label: 'Supaya kita bisa melayang terbang ke langit' },
      { id: 'C', value: 'BiarBasah', label: 'Hanya agar payung kita basah saja' },
    ],
    correctAnswer: 'A',
    explanation: 'Kain kedap air pada payung menahan tetesan hujan sehingga badan dan pakaian kita tetap kering!',
    hint: 'Payung berfungsi sebagai atap pelindung dari air hujan.',
  },
  rewardXp: 70,
};

export const logicCauseEffectLesson2: StoryLesson = {
  lessonId: 'log-cause-002',
  levelId: 405,
  title: 'Soal 2: Menjemur Pakaian di Terik Matahari',
  subject: 'logic',
  topic: 'logic_cause_effect',
  difficulty: 2,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2',
    theme: 'Halaman Rumah Cerah',
  },
  learningObjective: [
    'Memahami proses penguapan air akibat energi panas matahari',
    'Menalar sebab pakaian basah menjadi kering',
  ],
  characters: [sitiDef],
  scenes: [
    {
      id: 'log5_s2_1',
      title: 'Tali Jemuran di Halaman',
      background: 'park',
      narration: 'Siti membantu menggantung pakaian basah di tali jemuran saat matahari bersinar sangat terik.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 260, y: 320 }, animation: 'walk' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Panas matahari membuat air pada baju basah menguap ke udara hingga pakaian menjadi kering!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Apa akibat yang terjadi pada pakaian basah setelah dijemur di bawah terik sinar matahari siang?',
    options: [
      { id: 'A', value: 'Kering', label: 'Pakaian menjadi kering bersih dan siap dipakai' },
      { id: 'B', value: 'Es', label: 'Pakaian membeku berubah menjadi es batu' },
      { id: 'C', value: 'MakinBasah', label: 'Pakaian menjadi semakin basah kuyup' },
    ],
    correctAnswer: 'A',
    explanation: 'Panas sinar matahari memanaskan butiran air pada kain sehingga menguap dan pakaian menjadi kering!',
    hint: 'Energi panas matahari menghilangkan kandungan air pada serat kain.',
  },
  rewardXp: 70,
};

export const logicCauseEffectLesson3: StoryLesson = {
  lessonId: 'log-cause-003',
  levelId: 405,
  title: 'Soal 3: Es Krim Dibiarkan di Tempat Panas',
  subject: 'logic',
  topic: 'logic_cause_effect',
  difficulty: 2,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2',
    theme: 'Meja Kafe Terbuka',
  },
  learningObjective: [
    'Mengetahui perubahan wujud padat ke cair akibat suhu tinggi',
    'Menalar efek paparan panas terhadap makanan beku',
  ],
  characters: [budiDef],
  scenes: [
    {
      id: 'log5_s3_1',
      title: 'Es Krim Cone Meleleh',
      background: 'park',
      narration: 'Budi meletakkan es krim cone di atas meja taman terbuka yang panas tanpa segera memakannya.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'surprised' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Waduh! Es krim dingin ini mulai meleleh menjadi tetesan manis karena udaranya panas!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Apa yang akan terjadi pada es krim dingin jika dibiarkan lama di tempat yang panas?',
    options: [
      { id: 'A', value: 'Mencair', label: 'Es krim akan mencair meleleh menjadi cairan' },
      { id: 'B', value: 'Batu', label: 'Es krim akan mengeras menjadi batu padat' },
      { id: 'C', value: 'Apel', label: 'Es krim berubah wujud menjadi buah apel' },
    ],
    correctAnswer: 'A',
    explanation: 'Suhu panas lingkungan membuat es krim yang beku mencair dan meleleh menjadi cairan manis!',
    hint: 'Benda beku akan mencair bila terpapar suhu yang hangat atau panas.',
  },
  rewardXp: 70,
};

export const logicCauseEffectLesson4: StoryLesson = {
  lessonId: 'log-cause-004',
  levelId: 405,
  title: 'Soal 4: Tanaman Bunga Lupa Disiram',
  subject: 'logic',
  topic: 'logic_cause_effect',
  difficulty: 2,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2',
    theme: 'Pot Bunga Jendela',
  },
  learningObjective: [
    'Memahami kebutuhan air bagi kelangsungan hidup tumbuhan',
    'Menalar dampak kekeringan pada tanaman',
  ],
  characters: [sitiDef],
  scenes: [
    {
      id: 'log5_s4_1',
      title: 'Pot Tanaman yang Kering',
      background: 'classroom',
      narration: 'Ada pot tanaman kecil di sudut jendela yang lupa disiram air selama berhari-hari. Tanahnya sangat kering.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'flower', quantity: 1, position: { x: 420, y: 340 } },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Tanaman ini sangat haus karena lupa disiram! Daun dan batangnya mulai layu.',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Apa akibatnya jika tanaman bunga di pot tidak pernah disiram air selama berhari-hari?',
    options: [
      { id: 'A', value: 'Layu', label: 'Tanaman akan layu dan mengering karena kekurangan air' },
      { id: 'B', value: 'Emas', label: 'Tanaman langsung menghasilkan bunga dari emas' },
      { id: 'C', value: 'Es', label: 'Batangnya langsung membeku menjadi es balok' },
    ],
    correctAnswer: 'A',
    explanation: 'Semua tumbuhan membutuhkan air untuk menyerap zat hara. Tanpa air, tanaman akan layu dan kering!',
    hint: 'Air adalah sumber kehidupan bagi tanaman untuk tetap segar berdiri tegak.',
  },
  rewardXp: 70,
};

export const logicCauseEffectLesson5: StoryLesson = {
  lessonId: 'log-cause-005',
  levelId: 405,
  title: 'Soal 5: Meniup Balon Terlalu Besar',
  subject: 'logic',
  topic: 'logic_cause_effect',
  difficulty: 2,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2',
    theme: 'Ulang Tahun dan Balon',
  },
  learningObjective: [
    'Memahami konsep tekanan udara dan batas elastisitas bahan karet',
    'Menalar konsekuensi penambahan udara berlebih',
  ],
  characters: [budiDef],
  scenes: [
    {
      id: 'log5_s5_1',
      title: 'Balon Karet Mengembang',
      background: 'classroom',
      narration: 'Budi meniup balon karet pesta tanpa henti hingga kulit balon meregang sangat tipis dan kencang.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'balloon', quantity: 2, position: { x: 420, y: 320 } },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Hati-hati Siti! Jika ditiup melebihi kapasitasnya, tekanan udara di dalam bisa membuatnya meletus!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Apa yang akan terjadi jika balon karet terus ditiup angin sampai melebihi batas elastisitasnya?',
    options: [
      { id: 'A', value: 'Meletus', label: 'Balon akan meletus pecah dengan bunyi kencang' },
      { id: 'B', value: 'Besi', label: 'Balon akan berubah menjadi bola besi padat' },
      { id: 'C', value: 'Mengecil', label: 'Balon akan mengecil sendiri secara ajaib' },
    ],
    correctAnswer: 'A',
    explanation: 'Tekanan udara di dalam yang terlalu kuat akan merobek karet balon sehingga meletus seketika!',
    hint: 'Karet memiliki batas kelenturan sebelum akhirnya pecah berbunyi dor.',
  },
  rewardXp: 70,
};

// ==========================================
// 🗺️ LEVEL 6: NAVIGASI SPASIAL & ARAH (SOAL 1-5)
// ==========================================

export const logicSpatialLesson1: StoryLesson = {
  lessonId: 'log-space-001',
  levelId: 406,
  title: 'Soal 1: Mengenal Sisi Kanan dan Sisi Kiri',
  subject: 'logic',
  topic: 'logic_spatial',
  difficulty: 2,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2-3',
    theme: 'Orientasi Tubuh Sendiri',
  },
  learningObjective: [
    'Membedakan arah sisi kanan dan sisi kiri tubuh',
    'Melatih orientasi spasial dan koordinasi motorik',
  ],
  characters: [budiDef],
  scenes: [
    {
      id: 'log6_s1_1',
      title: 'Makan dengan Sopan',
      background: 'classroom',
      narration: 'Saat makan bersama, Budi memegang sendok di tangan kanan dan garpu di tangan kiri.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'walk' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Tangan kanan untuk memegang sendok, dan tangan kiri untuk memegang garpu! Jangan sampai terbalik ya!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Jika Budi memakai jam tangan di tangan sebelah kiri, tangan sebelah manakah yang ia pakai untuk melihat waktu?',
    options: [
      { id: 'A', value: 'Kiri', label: 'Tangan Sebelah Kiri' },
      { id: 'B', value: 'Kanan', label: 'Tangan Sebelah Kanan' },
      { id: 'C', value: 'Kaki', label: 'Kaki Sebelah Kiri' },
    ],
    correctAnswer: 'A',
    explanation: 'Tangan tempat jam tangan itu dipasang adalah tangan kiri, pasangan dari tangan kanan!',
    hint: 'Sisi yang berlawanan dengan tangan kanan.',
  },
  rewardXp: 80,
};

export const logicSpatialLesson2: StoryLesson = {
  lessonId: 'log-space-002',
  levelId: 406,
  title: 'Soal 2: Posisi Benda di Atas vs di Bawah',
  subject: 'logic',
  topic: 'logic_spatial',
  difficulty: 2,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2-3',
    theme: 'Meja Ruang Kelas',
  },
  learningObjective: [
    'Menentukan kedudukan posisi relatif atas dan bawah',
    'Menjelaskan letak benda dalam ruang belajar',
  ],
  characters: [sitiDef],
  scenes: [
    {
      id: 'log6_s2_1',
      title: 'Merapikan Barang Kelas',
      background: 'classroom',
      narration: 'Siti meletakkan buku cerita di atas permukaan meja, sedangkan tas ranselnya ditaruh di lantai kolong bawah meja.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'book', quantity: 2, position: { x: 420, y: 320 } },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Buku cerita ada di ATAS permukaan meja, sedangkan tasku ditaruh di BAWAH kolong meja.',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Di manakah letak tas sekolah jika berada di lantai di bawah papan meja belajar?',
    options: [
      { id: 'A', value: 'Bawah', label: 'Di Bawah Kolong Meja' },
      { id: 'B', value: 'Atas', label: 'Di Atas Meja' },
      { id: 'C', value: 'Genteng', label: 'Di Atas Genteng Sekolah' },
    ],
    correctAnswer: 'A',
    explanation: 'Tas yang berada di lantai kolong meja terletak di BAWAH meja!',
    hint: 'Posisi yang lebih rendah dari permukaan meja.',
  },
  rewardXp: 80,
};

export const logicSpatialLesson3: StoryLesson = {
  lessonId: 'log-space-003',
  levelId: 406,
  title: 'Soal 3: Di Luar vs Di Dalam Wadah',
  subject: 'logic',
  topic: 'logic_spatial',
  difficulty: 2,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2-3',
    theme: 'Keranjang Buah Apel',
  },
  learningObjective: [
    'Membedakan konsep spasial di dalam (inside) dan di luar (outside)',
    'Mengidentifikasi posisi benda terhadap wadah penampung',
  ],
  characters: [budiDef],
  scenes: [
    {
      id: 'log6_s3_1',
      title: 'Keranjang Apel Merah',
      background: 'market',
      narration: 'Di meja pasar ada keranjang: 3 buah apel berada di dalam keranjang, dan 1 apel tergeletak di luar keranjang di atas meja.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'apple', quantity: 3, position: { x: 420, y: 340 } },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Tiga apel aman tersimpan di DALAM keranjang, dan satu apel berada di LUAR keranjang.',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Manakah buah apel yang berada di LUAR keranjang?',
    options: [
      { id: 'A', value: 'Luar', label: 'Satu apel yang tergeletak di atas meja di samping keranjang' },
      { id: 'B', value: 'Dalam', label: 'Tiga apel yang masuk di dalam wadah keranjang' },
      { id: 'C', value: 'Semua', label: 'Semua buah apel' },
    ],
    correctAnswer: 'A',
    explanation: 'Apel yang ada di atas meja di samping keranjang posisinya berada di LUAR wadah keranjang!',
    hint: 'Benda yang tidak berada di dalam rongga wadah.',
  },
  rewardXp: 80,
};

export const logicSpatialLesson4: StoryLesson = {
  lessonId: 'log-space-004',
  levelId: 406,
  title: 'Soal 4: Arah Melangkah Maju dan Mundur',
  subject: 'logic',
  topic: 'logic_spatial',
  difficulty: 2,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2-3',
    theme: 'Latihan Baris Berbaris',
  },
  learningObjective: [
    'Memahami pengertian gerak lurus maju ke depan dan mundur ke belakang',
    'Menghubungkan orientasi pandangan dengan arah langkah kaki',
  ],
  characters: [sitiDef, budiDef],
  scenes: [
    {
      id: 'log6_s4_1',
      title: 'Langkah Kaki Pramuka',
      background: 'park',
      narration: 'Budi melangkah ke arah depan menuju tiang bendera di hadapannya.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 440, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Saat Budi melangkah menghadap ke arah tiang bendera di depannya, ia sedang berjalan maju!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Jika kita melangkah ke arah depan menuju tujuan yang kita lihat, gerakan itu disebut melangkah...?',
    options: [
      { id: 'A', value: 'Maju', label: 'Maju ke Depan' },
      { id: 'B', value: 'Mundur', label: 'Mundur ke Belakang' },
      { id: 'C', value: 'Diam', label: 'Diam di Tempat Saja' },
    ],
    correctAnswer: 'A',
    explanation: 'Melangkah searah dengan pandangan wajah menuju ke depan disebut melangkah MAJU!',
    hint: 'Langkah kaki ke arah depan.',
  },
  rewardXp: 80,
};

export const logicSpatialLesson5: StoryLesson = {
  lessonId: 'log-space-005',
  levelId: 406,
  title: 'Soal 5: Memilih Jalur Aman di Persimpangan Jalan',
  subject: 'logic',
  topic: 'logic_spatial',
  difficulty: 2,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2-3',
    theme: 'Labirin Jalan Istana',
  },
  learningObjective: [
    'Membaca tanda petunjuk arah pada persimpangan jalan',
    'Membuat keputusan navigasi yang aman dan logis',
  ],
  characters: [budiDef],
  scenes: [
    {
      id: 'log6_s5_1',
      title: 'Persimpangan Menuju Gerbang Istana',
      background: 'castle',
      narration: 'Di persimpangan jalan ada jalur kiri yang bersih dengan papan petunjuk menuju kastil, dan jalur kanan yang berlumpur licin.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 240, y: 320 }, animation: 'walk' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Papan petunjuk panah mengarahkan kita ke jalur kiri yang aman dan bersih menuju gerbang istana!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Jalur manakah yang harus dipilih agar bisa sampai ke gerbang kastil dengan aman dan bersih?',
    options: [
      { id: 'A', value: 'JalurKiri', label: 'Jalur Kiri yang Aman Sesuai Petunjuk Papan Arah' },
      { id: 'B', value: 'JalurKanan', label: 'Jalur Kanan Berlumpur Licin yang Berbahaya' },
      { id: 'C', value: 'Menangis', label: 'Berhenti Menangis di Tengah Jalan' },
    ],
    correctAnswer: 'A',
    explanation: 'Mengikuti papan petunjuk arah ke jalur kiri adalah pilihan cerdik agar selamat sampai ke kastil!',
    hint: 'Pilihlah jalan yang bersih dan memiliki papan petunjuk arah resmi.',
  },
  rewardXp: 80,
};

// ==========================================
// 💡 LEVEL 7: TEKA-TEKI CERDIK & PEMECAHAN MASALAH (SOAL 1-5)
// ==========================================

export const logicRiddlesLesson1: StoryLesson = {
  lessonId: 'log-riddle-001',
  levelId: 407,
  title: 'Soal 1: Teka-Teki Penunjuk Waktu',
  subject: 'logic',
  topic: 'logic_riddles',
  difficulty: 3,
  metadata: {
    ageGroup: '7-10',
    grade: 'SD Kelas 2-3',
    theme: 'Teka-Teki Ruang Kelas',
  },
  learningObjective: [
    'Menganalisis karakteristik objek melalui teka-teki kata',
    'Menarik kesimpulan logis dari petunjuk yang diberikan',
  ],
  characters: [sitiDef],
  scenes: [
    {
      id: 'log7_s1_1',
      title: 'Teka-Teki Siti yang Cerdik',
      background: 'classroom',
      narration: 'Siti memberikan tebak-tebakan: "Aku punya angka 1 sampai 12 dan dua jarum, berdetak tik-tok tik-tok memberitahu waktu. Siapakah aku?"',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 260, y: 320 }, animation: 'walk' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Aku punya angka 1 sampai 12, berdetak tik-tok tik-tok setiap detik untuk memberitahu waktu. Siapakah aku?',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Benda apakah yang memiliki jarum dan angka 1 sampai 12 untuk menunjukkan waktu kegiatan kita?',
    options: [
      { id: 'A', value: 'Jam', label: 'Jam Dinding / Arloji' },
      { id: 'B', value: 'Piring', label: 'Piring Makan Bundar' },
      { id: 'C', value: 'Kipas', label: 'Kipas Angin Meja' },
    ],
    correctAnswer: 'A',
    explanation: 'Jam dinding dan arloji memiliki jarum berdetak serta angka 1 sampai 12 untuk menunjukkan waktu!',
    hint: 'Benda yang berbunyi tik-tok tik-tok di dinding.',
  },
  rewardXp: 90,
};

export const logicRiddlesLesson2: StoryLesson = {
  lessonId: 'log-riddle-002',
  levelId: 407,
  title: 'Soal 2: Membuka Gembok dengan Kunci yang Tepat',
  subject: 'logic',
  topic: 'logic_riddles',
  difficulty: 3,
  metadata: {
    ageGroup: '7-10',
    grade: 'SD Kelas 2-3',
    theme: 'Peti Rahasia Perpustakaan',
  },
  learningObjective: [
    'Mencocokkan bentuk lubang kunci dengan kepala kunci yang tepat',
    'Menyelesaikan teka-teki kecocokan bentuk geometris',
  ],
  characters: [budiDef],
  scenes: [
    {
      id: 'log7_s2_1',
      title: 'Peti Rahasia Kuno',
      background: 'castle',
      narration: 'Budi menemukan peti dengan gembok berlubang segitiga. Di samping peti ada 3 kunci berkepala Lingkaran, Segitiga, dan Bintang.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'coin', quantity: 3, position: { x: 420, y: 340 } },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Lubang kunci ini berbentuk segitiga! Kita harus mencocokkannya dengan anak kunci yang pas!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Anak kunci dengan bentuk kepala apakah yang cocok untuk membuka gembok berlubang SEGITIGA?',
    options: [
      { id: 'A', value: 'KunciSegitiga', label: 'Kunci dengan Kepala Berbentuk Segitiga' },
      { id: 'B', value: 'KunciLingkaran', label: 'Kunci dengan Kepala Berbentuk Lingkaran' },
      { id: 'C', value: 'KunciBintang', label: 'Kunci dengan Kepala Berbentuk Bintang' },
    ],
    correctAnswer: 'A',
    explanation: 'Gembok berlubang segitiga hanya dapat diputar dibuka oleh kunci yang memiliki bentuk segitiga yang pas!',
    hint: 'Bentuk kepala kunci harus cocok persis dengan lubang kuncinya.',
  },
  rewardXp: 90,
};

export const logicRiddlesLesson3: StoryLesson = {
  lessonId: 'log-riddle-003',
  levelId: 407,
  title: 'Soal 3: Menyeberangi Parit dengan Papan Kayu',
  subject: 'logic',
  topic: 'logic_riddles',
  difficulty: 3,
  metadata: {
    ageGroup: '7-10',
    grade: 'SD Kelas 2-3',
    theme: 'Parit Air Hutan Kastil',
  },
  learningObjective: [
    'Membandingkan ukuran panjang benda untuk memecahkan tantangan fisik',
    'Menilai solusi yang aman dan logis saat menghadapi hambatan',
  ],
  characters: [sitiDef],
  scenes: [
    {
      id: 'log7_s3_1',
      title: 'Tantangan Menyeberang Parit',
      background: 'park',
      narration: 'Di depan mereka ada parit air selebar 2 meter. Di tepi parit tersedia papan kayu kokoh sepanjang 3 meter dan ranting kecil 20 cm.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 260, y: 320 }, animation: 'walk' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Parit ini lebarnya 2 meter. Papan kayu 3 meter cukup panjang untuk melintang menyeberangi parit dengan kokoh!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Benda manakah yang aman dan cukup panjang untuk dijadikan jembatan menyeberangi parit selebar 2 meter?',
    options: [
      { id: 'A', value: 'Papan3M', label: 'Papan Kayu Kokoh Sepanjang 3 Meter' },
      { id: 'B', value: 'Ranting20Cm', label: 'Ranting Pohon Pendek 20 Sentimeter' },
      { id: 'C', value: 'Daun', label: 'Selembar Daun Kering yang Mengapung' },
    ],
    correctAnswer: 'A',
    explanation: 'Panjang 3 meter lebih panjang daripada lebar parit 2 meter, sehingga kedua ujung papan dapat berpijak kokoh di tanah!',
    hint: 'Jembatan harus lebih panjang dari lebar celah parit agar tidak tercebur.',
  },
  rewardXp: 90,
};

export const logicRiddlesLesson4: StoryLesson = {
  lessonId: 'log-riddle-004',
  levelId: 407,
  title: 'Soal 4: Menebak Hewan Berdasarkan Ciri-Ciri',
  subject: 'logic',
  topic: 'logic_riddles',
  difficulty: 3,
  metadata: {
    ageGroup: '7-10',
    grade: 'SD Kelas 2-3',
    theme: 'Kitab Rahasia Satwa',
  },
  learningObjective: [
    'Menghubungkan ciri fisik dan kebiasaan dengan identitas satwa',
    'Melatih kemampuan deduksi logika ilmiah sederhana',
  ],
  characters: [budiDef],
  scenes: [
    {
      id: 'log7_s4_1',
      title: 'Tebakan Hewan Misterius',
      background: 'park',
      narration: 'Budi membaca petunjuk: "Telingaku panjang berdiri tegak, lariku melompat-lompat, dan makanan kesukaanku wortel segar."',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'walk' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Telinganya panjang berdiri tegak, suka melompat kencang, dan makanan favoritnya wortel segar! Hewan apakah itu?',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Hewan apakah yang memiliki sepasang telinga panjang tegak, pandai melompat, dan suka makan wortel?',
    options: [
      { id: 'A', value: 'Kelinci', label: 'Kelinci yang Lucu' },
      { id: 'B', value: 'KuraKura', label: 'Kura-Kura Lambat' },
      { id: 'C', value: 'IkanMas', label: 'Ikan Mas di Kolam' },
    ],
    correctAnswer: 'A',
    explanation: 'Kelinci memiliki ciri khas sepasang telinga panjang, suka melompat lincah, dan gemar memakan wortel!',
    hint: 'Hewan berbulu lembut yang melompat lincah di kebun sayur.',
  },
  rewardXp: 90,
};

export const logicRiddlesLesson5: StoryLesson = {
  lessonId: 'log-riddle-005',
  levelId: 407,
  title: 'Soal 5: Master Cerdik — Urutan Membuat Teh Manis',
  subject: 'logic',
  topic: 'logic_riddles',
  difficulty: 3,
  metadata: {
    ageGroup: '7-10',
    grade: 'SD Kelas 2-3',
    theme: 'Dapur Sahabat Cilik',
  },
  learningObjective: [
    'Memahami prosedur sekuensial (urutan langkah) pemecahan masalah sehari-hari',
    'Menalar fungsi pengadukan untuk melarutkan zat padat ke dalam zat cair',
  ],
  characters: [sitiDef, budiDef],
  scenes: [
    {
      id: 'log7_s5_1',
      title: 'Segelas Teh Manis Hangat',
      background: 'classroom',
      narration: 'Siti menyeduh teh hangat dan memasukkan sesendok gula pasir. Agar rasa manisnya merata, apa yang harus dilakukan?',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'budi', position: { x: 440, y: 320 }, animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Setelah gula dimasukkan ke dalam air teh hangat, kita perlu mengaduknya dengan sendok agar gulanya larut merata!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Apa tindakan yang harus dilakukan setelah gula dimasukkan ke dalam cangkir teh agar rasa manisnya menyatu?',
    options: [
      { id: 'A', value: 'AdukSendok', label: 'Mengaduk Air Teh dengan Sendok Sampai Gula Larut' },
      { id: 'B', value: 'Biarkan', label: 'Membiarkannya Mengendap Tanpa Diaduk' },
      { id: 'C', value: 'Tumpahkan', label: 'Menumpahkan Air Teh ke Lantai' },
    ],
    correctAnswer: 'A',
    explanation: 'Mengaduk dengan sendok membuat butiran gula pasir larut sempurna ke dalam air teh sehingga rasanya manis merata!',
    hint: 'Gunakan sendok kecil untuk memutar air teh sampai butiran gula larut.',
  },
  rewardXp: 100,
};
