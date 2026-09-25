import { CharacterDef, StoryLesson } from '@/types/story';

const budiDef: CharacterDef = {
  id: 'budi',
  name: 'Budi',
  asset: 'character_budi',
  color: '#3b82f6',
  personality: 'Lincah, bersemangat, dan suka bermain',
  voiceProfile: { pitch: 1.45, rate: 1.05 },
};

const sitiDef: CharacterDef = {
  id: 'siti',
  name: 'Siti',
  asset: 'character_siti',
  color: '#ec4899',
  personality: 'Manis, lembut, dan cerdas',
  voiceProfile: { pitch: 1.75, rate: 0.96 },
};

// ==========================================
// 🍓 LEVEL 2: PENJUMLAHAN (ADDITION) — SOAL 2-5
// ==========================================

export const additionLesson2: StoryLesson = {
  lessonId: 'math-addition-002',
  levelId: 2,
  title: 'Soal 2: Menghias Balon Pesta Ulang Tahun',
  subject: 'mathematics',
  topic: 'addition',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Taman Pesta',
    mathFormula: { operandA: 5, operator: '+', operandB: 3, result: 8 },
  },
  learningObjective: ['Menghitung penjumlahan 5 + 3 = 8 menggunakan benda visual'],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'add2_s1',
      title: 'Balon Merah Budi',
      background: 'park',
      narration: 'Budi membawa lima balon merah cerah untuk menghias panggung pesta di taman.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'balloon', owner: 'budi', quantity: 5, position: { x: 280, y: 340 } },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Aku sudah tiup 5 balon merah! Cantik sekali ya!',
      },
    },
    {
      id: 'add2_s2',
      title: 'Siti Menambahkan Balon Biru',
      background: 'park',
      narration: 'Siti datang membawa tiga balon biru dan menggabungkannya ke barisan balon Budi.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 520, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'balloon', owner: 'siti', quantity: 3, position: { x: 460, y: 340 } },
        { type: 'animate_character', characterId: 'budi', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Ini aku tambahkan 3 balon biru agar hiasan kita makin ramai!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Ada 5 balon merah dan 3 balon biru. Berapakah jumlah seluruh balon hiasan sekarang?',
    options: [
      { id: 'A', value: 7, label: '7 Balon' },
      { id: 'B', value: 8, label: '8 Balon' },
      { id: 'C', value: 9, label: '9 Balon' },
      { id: 'D', value: 10, label: '10 Balon' },
    ],
    correctAnswer: 'B',
    explanation: '5 balon merah ditambah 3 balon biru sama dengan 8 balon (5 + 3 = 8)!',
    hint: 'Mulai dari 5, lalu hitung maju 3 langkah: 6, 7, 8!',
    visualHint: { formula: '5 + 3 = 8', initialCount: 5, transferCount: 3, remainingCount: 8, itemType: 'balloon' },
  },
  rewardXp: 50,
};

export const additionLesson3: StoryLesson = {
  lessonId: 'math-addition-003',
  levelId: 2,
  title: 'Soal 3: Buku Cerita di Perpustakaan Ceria',
  subject: 'mathematics',
  topic: 'addition',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Ruang Kelas',
    mathFormula: { operandA: 4, operator: '+', operandB: 2, result: 6 },
  },
  learningObjective: ['Memahami penggabungan kelompok buku 4 + 2 = 6'],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'add3_s1',
      title: 'Buku di Meja',
      background: 'classroom',
      narration: 'Budi meletakkan empat buku cerita petualangan di atas meja membaca.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'idle' },
        { type: 'spawn_object', object: 'book', owner: 'budi', quantity: 4, position: { x: 280, y: 340 } },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Aku baru saja meminjam 4 buku dongeng yang sangat seru!',
      },
    },
    {
      id: 'add3_s2',
      title: 'Siti Meletakkan Buku Sains',
      background: 'classroom',
      narration: 'Siti datang dan menambahkan dua buku sains bergambar di samping buku Budi.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 520, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'book', owner: 'siti', quantity: 2, position: { x: 440, y: 340 } },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Aku juga pinjam 2 buku tentang hewan dan tumbuhan, Budi!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Berapa banyak seluruh buku cerita yang ada di atas meja sekarang?',
    options: [
      { id: 'A', value: 5, label: '5 Buku' },
      { id: 'B', value: 6, label: '6 Buku' },
      { id: 'C', value: 7, label: '7 Buku' },
      { id: 'D', value: 8, label: '8 Buku' },
    ],
    correctAnswer: 'B',
    explanation: '4 buku cerita ditambah 2 buku sains sama dengan 6 buku (4 + 2 = 6)!',
    hint: 'Hitung maju dari 4 sebanyak 2 langkah: 5, 6!',
    visualHint: { formula: '4 + 2 = 6', initialCount: 4, transferCount: 2, remainingCount: 6, itemType: 'book' },
  },
  rewardXp: 50,
};

export const additionLesson4: StoryLesson = {
  lessonId: 'math-addition-004',
  levelId: 2,
  title: 'Soal 4: Merangkai Bunga Mawar dan Melati',
  subject: 'mathematics',
  topic: 'addition',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Taman Bunga',
    mathFormula: { operandA: 6, operator: '+', operandB: 4, result: 10 },
  },
  learningObjective: ['Menghitung penjumlahan hingga bilangan 10 (6 + 4 = 10)'],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'add4_s1',
      title: 'Bunga Mawar Merah',
      background: 'park',
      narration: 'Di taman bunga, Budi memetik enam tangkai bunga mawar merah harum untuk dimasukkan ke vas.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'flower', owner: 'budi', quantity: 6, position: { x: 280, y: 340 } },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Mawar merah ini wangi sekali! Ada 6 tangkai di tanganku.',
      },
    },
    {
      id: 'add4_s2',
      title: 'Melati Putih Siti',
      background: 'park',
      narration: 'Siti membawa empat tangkai bunga melati putih dan menggabungkannya ke vas Budi.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 520, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'flower', owner: 'siti', quantity: 4, position: { x: 440, y: 340 } },
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Ayo kita tambahkan 4 bunga melati ini agar vas bunga terlihat sempurna!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Jika 6 mawar digabung dengan 4 melati, berapakah jumlah seluruh bunga di dalam vas?',
    options: [
      { id: 'A', value: 8, label: '8 Bunga' },
      { id: 'B', value: 9, label: '9 Bunga' },
      { id: 'C', value: 10, label: '10 Bunga' },
      { id: 'D', value: 11, label: '11 Bunga' },
    ],
    correctAnswer: 'C',
    explanation: '6 ditambah 4 menghasilkan tepat 10 bunga cantik (6 + 4 = 10)!',
    hint: 'Gunakan jari tangan: 6 jari ditambah 4 jari lagi akan menjadi 10 jari lengkap!',
    visualHint: { formula: '6 + 4 = 10', initialCount: 6, transferCount: 4, remainingCount: 10, itemType: 'flower' },
  },
  rewardXp: 50,
};

export const additionLesson5: StoryLesson = {
  lessonId: 'math-addition-005',
  levelId: 2,
  title: 'Soal 5: Memanggang Cupcake Lezat Bersama',
  subject: 'mathematics',
  topic: 'addition',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Dapur Kue',
    mathFormula: { operandA: 5, operator: '+', operandB: 5, result: 10 },
  },
  learningObjective: ['Memahami penjumlahan bilangan kembar 5 + 5 = 10'],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'add5_s1',
      title: 'Cupcake Cokelat',
      background: 'market',
      narration: 'Budi baru selesai memanggang lima buah kue cupcake cokelat yang manis dan harum.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'happy' },
        { type: 'spawn_object', object: 'cake', owner: 'budi', quantity: 5, position: { x: 280, y: 340 } },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Nyam! 5 cupcake cokelat ini sudah matang dan siap disajikan!',
      },
    },
    {
      id: 'add5_s2',
      title: 'Cupcake Stroberi Siti',
      background: 'market',
      narration: 'Siti membawa lima buah cupcake rasa stroberi dan meletakkannya di samping cupcake Budi.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 520, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'cake', owner: 'siti', quantity: 5, position: { x: 440, y: 340 } },
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Aku juga bawa 5 cupcake stroberi! Wah, meja kita penuh kue lezat!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Berapakah jumlah seluruh cupcake di atas meja jika 5 cupcake cokelat ditambah 5 cupcake stroberi?',
    options: [
      { id: 'A', value: 8, label: '8 Cupcake' },
      { id: 'B', value: 9, label: '9 Cupcake' },
      { id: 'C', value: 10, label: '10 Cupcake' },
      { id: 'D', value: 12, label: '12 Cupcake' },
    ],
    correctAnswer: 'C',
    explanation: '5 ditambah 5 sama dengan 10 (5 + 5 = 10)!',
    hint: 'Ingat penjumlahan kembar: 5 di tangan kiri ditambah 5 di tangan kanan = 10!',
    visualHint: { formula: '5 + 5 = 10', initialCount: 5, transferCount: 5, remainingCount: 10, itemType: 'cake' },
  },
  rewardXp: 50,
};

// ==========================================
// 🔮 LEVEL 3: PENGURANGAN (SUBTRACTION) — SOAL 2-5
// ==========================================

export const subtractionLesson2: StoryLesson = {
  lessonId: 'math-subtraction-002',
  levelId: 3,
  title: 'Soal 2: Apel Merah di Keranjang Kebun',
  subject: 'mathematics',
  topic: 'subtraction',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1-2',
    theme: 'Kebun Apel',
    mathFormula: { operandA: 8, operator: '-', operandB: 3, result: 5 },
  },
  learningObjective: ['Menghitung pengurangan bilangan 8 - 3 = 5 secara visual'],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'sub2_s1',
      title: 'Delapan Apel Segar',
      background: 'forest',
      narration: 'Budi memetik delapan buah apel merah manis dan menaruhnya di keranjang kayu.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'apple', owner: 'budi', quantity: 8, position: { x: 280, y: 340 } },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Keranjangku penuh dengan 8 apel merah yang ranum!',
      },
    },
    {
      id: 'sub2_s2',
      title: 'Berbagi dengan Siti',
      background: 'forest',
      narration: 'Budi memberikan tiga buah apel kepada Siti untuk camilan sehat bersama.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 520, y: 320 }, animation: 'walk' },
        { type: 'transfer_object', object: 'apple', from: 'budi', to: 'siti', quantity: 3 },
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Terima kasih banyak Budi! 3 apel ini akan aku cuci untuk kita makan.',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Awalnya ada 8 apel di keranjang. Setelah 3 apel diberikan ke Siti, berapa sisa apel di keranjang Budi?',
    options: [
      { id: 'A', value: 4, label: '4 Apel' },
      { id: 'B', value: 5, label: '5 Apel' },
      { id: 'C', value: 6, label: '6 Apel' },
      { id: 'D', value: 7, label: '7 Apel' },
    ],
    correctAnswer: 'B',
    explanation: '8 apel dikurangi 3 apel yang diberikan tersisa 5 buah apel (8 - 3 = 5)!',
    hint: 'Hitung mundur dari 8 sebanyak 3 langkah: 7, 6, 5!',
    visualHint: { formula: '8 - 3 = 5', initialCount: 8, transferCount: 3, remainingCount: 5, itemType: 'apple' },
  },
  rewardXp: 50,
};

export const subtractionLesson3: StoryLesson = {
  lessonId: 'math-subtraction-003',
  levelId: 3,
  title: 'Soal 3: Balon Gas Terbang ke Langit Biru',
  subject: 'mathematics',
  topic: 'subtraction',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1-2',
    theme: 'Taman Terbuka',
    mathFormula: { operandA: 7, operator: '-', operandB: 2, result: 5 },
  },
  learningObjective: ['Memahami pengurangan saat benda terlepas atau berkurang (7 - 2 = 5)'],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'sub3_s1',
      title: 'Tujuh Balon Warna-Warni',
      background: 'park',
      narration: 'Siti membawa tujuh balon gas warna-warni yang menari-nari ditiup angin sepoi-sepoi.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 300, y: 320 }, animation: 'happy' },
        { type: 'spawn_object', object: 'balloon', owner: 'siti', quantity: 7, position: { x: 360, y: 340 } },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Lihat balon-balonku, ada 7 balon warna-warni terbang tinggi!',
      },
    },
    {
      id: 'sub3_s2',
      title: 'Angin Menerbangkan Balon',
      background: 'park',
      narration: 'Tiba-tiba angin bertiup kencang! Dua balon terlepas dan terbang tinggi ke awan biru.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 180, y: 320 }, animation: 'think' },
        { type: 'animate_character', characterId: 'siti', animation: 'think' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Wah Siti, 2 balonmu terlepas dan melayang ke awan!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Dari 7 balon gas yang dipegang Siti, 2 balon terbang lepas. Berapakah sisa balon yang masih dipegang Siti?',
    options: [
      { id: 'A', value: 4, label: '4 Balon' },
      { id: 'B', value: 5, label: '5 Balon' },
      { id: 'C', value: 6, label: '6 Balon' },
      { id: 'D', value: 7, label: '7 Balon' },
    ],
    correctAnswer: 'B',
    explanation: '7 balon dikurangi 2 balon yang terbang tersisa 5 balon (7 - 2 = 5)!',
    hint: 'Hitung mundur 2 langkah dari 7: 6, 5!',
    visualHint: { formula: '7 - 2 = 5', initialCount: 7, transferCount: 2, remainingCount: 5, itemType: 'balloon' },
  },
  rewardXp: 50,
};

export const subtractionLesson4: StoryLesson = {
  lessonId: 'math-subtraction-004',
  levelId: 3,
  title: 'Soal 4: Kue Donat Manis untuk Sahabat',
  subject: 'mathematics',
  topic: 'subtraction',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1-2',
    theme: 'Pesta Kue',
    mathFormula: { operandA: 9, operator: '-', operandB: 5, result: 4 },
  },
  learningObjective: ['Menyelesaikan operasi pengurangan 9 - 5 = 4'],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'sub4_s1',
      title: 'Sembilan Kue Donat',
      background: 'market',
      narration: 'Di meja perayaan, tersaji sembilan kue donat manis bertabur meses cokelat.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 220, y: 320 }, animation: 'happy' },
        { type: 'spawn_object', object: 'cake', owner: 'siti', quantity: 9, position: { x: 300, y: 340 } },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Ada 9 kue donat lezat di piring besar ini!',
      },
    },
    {
      id: 'sub4_s2',
      title: 'Membagikan ke Teman',
      background: 'market',
      narration: 'Siti membagikan lima donat kepada teman-teman yang sedang belajar kelompok.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 540, y: 320 }, animation: 'walk' },
        { type: 'transfer_object', object: 'cake', from: 'siti', to: 'budi', quantity: 5 },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Terima kasih Siti! 5 donat ini akan kubagikan ke teman-teman sekelas.',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Dari 9 kue donat di piring, sudah dibagikan 5 kue. Berapa kue donat yang tersisa di piring sekarang?',
    options: [
      { id: 'A', value: 3, label: '3 Donat' },
      { id: 'B', value: 4, label: '4 Donat' },
      { id: 'C', value: 5, label: '5 Donat' },
      { id: 'D', value: 6, label: '6 Donat' },
    ],
    correctAnswer: 'B',
    explanation: '9 donat dikurangi 5 donat yang dibagikan sama dengan 4 donat tersisa (9 - 5 = 4)!',
    hint: 'Hitung mundur dari 9 sebanyak 5 langkah: 8, 7, 6, 5, 4!',
    visualHint: { formula: '9 - 5 = 4', initialCount: 9, transferCount: 5, remainingCount: 4, itemType: 'cake' },
  },
  rewardXp: 50,
};

export const subtractionLesson5: StoryLesson = {
  lessonId: 'math-subtraction-005',
  levelId: 3,
  title: 'Soal 5: Koin Bintang Ajaib Komidi Putar',
  subject: 'mathematics',
  topic: 'subtraction',
  difficulty: 2,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1-2',
    theme: 'Taman Hiburan',
    mathFormula: { operandA: 10, operator: '-', operandB: 7, result: 3 },
  },
  learningObjective: ['Menyelesaikan pengurangan 10 - 7 = 3'],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'sub5_s1',
      title: 'Sepuluh Koin Emas',
      background: 'park',
      narration: 'Budi berhasil mengumpulkan sepuluh koin bintang ajaib dari tantangan permainan.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'coin', owner: 'budi', quantity: 10, position: { x: 280, y: 340 } },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Hore! Kantongku berisi 10 koin bintang berkilau!',
      },
    },
    {
      id: 'sub5_s2',
      title: 'Membeli Tiket Komidi Putar',
      background: 'park',
      narration: 'Budi dan Siti menukarkan tujuh koin bintang untuk membeli dua tiket naik komidi putar ajaib.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 520, y: 320 }, animation: 'walk' },
        { type: 'transfer_object', object: 'coin', from: 'budi', to: 'siti', quantity: 7 },
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Wah asyik sekali! 7 koin ini cukup untuk tiket kita berdua naik wahana!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Awalnya Budi memiliki 10 koin bintang. Setelah 7 koin ditukarkan tiket wahana, berapa sisa koin Budi?',
    options: [
      { id: 'A', value: 2, label: '2 Koin' },
      { id: 'B', value: 3, label: '3 Koin' },
      { id: 'C', value: 4, label: '4 Koin' },
      { id: 'D', value: 5, label: '5 Koin' },
    ],
    correctAnswer: 'B',
    explanation: '10 koin dikurangi 7 koin sama dengan 3 koin bintang yang tersisa (10 - 7 = 3)!',
    hint: 'Ingat pasangan 10: 7 ditambah 3 adalah 10, jadi 10 - 7 = 3!',
    visualHint: { formula: '10 - 7 = 3', initialCount: 10, transferCount: 7, remainingCount: 3, itemType: 'coin' },
  },
  rewardXp: 50,
};

// ==========================================
// ⭐ LEVEL 4: PERBANDINGAN (COMPARISON) — SOAL 2-5
// ==========================================

export const comparisonLesson2: StoryLesson = {
  lessonId: 'math-comparison-002',
  levelId: 4,
  title: 'Soal 2: Menghitung Koleksi Buku Cerita',
  subject: 'mathematics',
  topic: 'comparison',
  difficulty: 2,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1-2',
    theme: 'Perpustakaan Mini',
    mathFormula: { operandA: 4, operator: '<', operandB: 7, result: 0 },
  },
  learningObjective: ['Membandingkan dua bilangan (4 lebih sedikit daripada 7)'],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'comp2_s1',
      title: 'Buku Budi dan Siti',
      background: 'classroom',
      narration: 'Di meja perpustakaan, Budi telah membaca 4 buku cerita, sedangkan Siti telah membaca 7 buku cerita.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'idle' },
        { type: 'spawn_object', object: 'book', owner: 'budi', quantity: 4, position: { x: 280, y: 340 } },
        { type: 'spawn_character', characterId: 'siti', position: { x: 520, y: 320 }, animation: 'idle' },
        { type: 'spawn_object', object: 'book', owner: 'siti', quantity: 7, position: { x: 440, y: 340 } },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Aku membaca 4 buku cerita petualangan minggu ini.',
      },
    },
  ],
  question: {
    type: 'comparison',
    question: 'Budi membaca 4 buku dan Siti membaca 7 buku. Siapakah yang membaca buku LEBIH SEDIKIT?',
    options: [
      { id: 'A', value: 'Budi', label: 'Budi (4 Buku)' },
      { id: 'B', value: 'Siti', label: 'Siti (7 Buku)' },
      { id: 'C', value: 'Sama', label: 'Keduanya Sama Banyak' },
    ],
    correctAnswer: 'A',
    explanation: '4 lebih sedikit daripada 7 (4 < 7), sehingga Budi membaca buku lebih sedikit.',
    hint: 'Bandingkan angka 4 dan 7. Angka mana yang nilainya lebih kecil?',
  },
  rewardXp: 60,
};

export const comparisonLesson3: StoryLesson = {
  lessonId: 'math-comparison-003',
  levelId: 4,
  title: 'Soal 3: Balon Pesta di Taman Festival',
  subject: 'mathematics',
  topic: 'comparison',
  difficulty: 2,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1-2',
    theme: 'Taman Festival',
    mathFormula: { operandA: 6, operator: '=', operandB: 6, result: 1 },
  },
  learningObjective: ['Mengenal konsep sama banyak (6 = 6)'],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'comp3_s1',
      title: 'Balon Budi dan Siti',
      background: 'park',
      narration: 'Di festival taman, Budi memegang 6 balon merah. Siti juga memegang 6 balon kuning cerah.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'happy' },
        { type: 'spawn_object', object: 'balloon', owner: 'budi', quantity: 6, position: { x: 280, y: 340 } },
        { type: 'spawn_character', characterId: 'siti', position: { x: 520, y: 320 }, animation: 'happy' },
        { type: 'spawn_object', object: 'balloon', owner: 'siti', quantity: 6, position: { x: 440, y: 340 } },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Lihat balon kita berdua! Apakah jumlahnya sama ya?',
      },
    },
  ],
  question: {
    type: 'comparison',
    question: 'Budi memegang 6 balon dan Siti memegang 6 balon. Bagaimanakah perbandingan jumlah balon mereka?',
    options: [
      { id: 'A', value: 'Budi', label: 'Balon Budi Lebih Banyak' },
      { id: 'B', value: 'Siti', label: 'Balon Siti Lebih Banyak' },
      { id: 'C', value: 'Sama', label: 'Keduanya Sama Banyak (6 = 6)' },
    ],
    correctAnswer: 'C',
    explanation: 'Karena Budi punya 6 dan Siti juga punya 6, maka jumlah balon keduanya SAMA BANYAK (6 = 6)!',
    hint: 'Bandingkan jumlah balonnya: 6 dan 6 memiliki nilai yang sama persis!',
  },
  rewardXp: 60,
};

export const comparisonLesson4: StoryLesson = {
  lessonId: 'math-comparison-004',
  levelId: 4,
  title: 'Soal 4: Keranjang Apel Merah dan Hijau',
  subject: 'mathematics',
  topic: 'comparison',
  difficulty: 2,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1-2',
    theme: 'Pasar Buah',
    mathFormula: { operandA: 9, operator: '>', operandB: 6, result: 1 },
  },
  learningObjective: ['Membandingkan kelompok apel (9 lebih banyak daripada 6)'],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'comp4_s1',
      title: 'Dua Keranjang Apel',
      background: 'market',
      narration: 'Di meja pasar, Keranjang A berisi 9 apel merah, sedangkan Keranjang B berisi 6 apel hijau.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'apple', owner: 'budi', quantity: 9, position: { x: 280, y: 340 } },
        { type: 'spawn_character', characterId: 'siti', position: { x: 520, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'apple', owner: 'siti', quantity: 6, position: { x: 440, y: 340 } },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Keranjang A berisi 9 apel, keranjang B berisi 6 apel.',
      },
    },
  ],
  question: {
    type: 'comparison',
    question: 'Keranjang manakah yang berisi buah apel LEBIH BANYAK?',
    options: [
      { id: 'A', value: 'Keranjang A', label: 'Keranjang A (9 Apel)' },
      { id: 'B', value: 'Keranjang B', label: 'Keranjang B (6 Apel)' },
      { id: 'C', value: 'Sama', label: 'Keduanya Sama Banyak' },
    ],
    correctAnswer: 'A',
    explanation: 'Keranjang A berisi 9 apel yang lebih banyak daripada 6 apel di Keranjang B (9 > 6)!',
    hint: 'Bandingkan angka 9 dan 6. Angka mana yang bernilai lebih besar?',
  },
  rewardXp: 60,
};

export const comparisonLesson5: StoryLesson = {
  lessonId: 'math-comparison-005',
  levelId: 4,
  title: 'Soal 5: Kelereng Berkilau di Arena Bermain',
  subject: 'mathematics',
  topic: 'comparison',
  difficulty: 2,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1-2',
    theme: 'Taman Bermain',
    mathFormula: { operandA: 10, operator: '>', operandB: 7, result: 3 },
  },
  learningObjective: ['Menghitung selisih perbandingan dua kelompok (10 - 7 = 3)'],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'comp5_s1',
      title: 'Kelereng Budi dan Siti',
      background: 'park',
      narration: 'Budi memiliki 10 butir kelereng biru, sedangkan Siti memiliki 7 butir kelereng merah.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'idle' },
        { type: 'spawn_object', object: 'marble', owner: 'budi', quantity: 10, position: { x: 280, y: 340 } },
        { type: 'spawn_character', characterId: 'siti', position: { x: 520, y: 320 }, animation: 'idle' },
        { type: 'spawn_object', object: 'marble', owner: 'siti', quantity: 7, position: { x: 440, y: 340 } },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Aku punya 10 kelereng biru, Siti punya 7 kelereng merah.',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Berapa butir kelereng Budi LEBIH BANYAK daripada kelereng Siti?',
    options: [
      { id: 'A', value: 2, label: 'Lebih Banyak 2 Butir' },
      { id: 'B', value: 3, label: 'Lebih Banyak 3 Butir' },
      { id: 'C', value: 4, label: 'Lebih Banyak 4 Butir' },
      { id: 'D', value: 5, label: 'Lebih Banyak 5 Butir' },
    ],
    correctAnswer: 'B',
    explanation: '10 butir dikurangi 7 butir sama dengan 3 butir (10 - 7 = 3). Kelereng Budi lebih banyak 3 butir!',
    hint: 'Kurangkan jumlah kelereng Budi dengan kelereng Siti: 10 - 7 = ?',
    visualHint: { formula: '10 - 7 = 3', initialCount: 10, transferCount: 7, remainingCount: 3, itemType: 'marble' },
  },
  rewardXp: 60,
};

// ==========================================
// 🧺 LEVEL 5: PERKALIAN DASAR (MULTIPLICATION) — SOAL 2-5
// ==========================================

export const multiplicationLesson2: StoryLesson = {
  lessonId: 'math-multiplication-002',
  levelId: 5,
  title: 'Soal 2: Piring Cupcake Pelangi',
  subject: 'mathematics',
  topic: 'multiplication',
  difficulty: 2,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2',
    theme: 'Toko Roti',
    mathFormula: { operandA: 4, operator: '*', operandB: 2, result: 8 },
  },
  learningObjective: ['Memahami perkalian 4 x 2 = 8 sebagai penjumlahan berulang 2 + 2 + 2 + 2'],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'mult2_s1',
      title: 'Empat Piring Kue',
      background: 'market',
      narration: 'Siti menata empat buah piring pesta di meja. Setiap piring diisi dua buah kue cupcake lezat.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 220, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'cake', owner: 'siti', quantity: 8, position: { x: 380, y: 340 } },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Ada 4 piring di meja, dan setiap piring berisi 2 cupcake!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Jika ada 4 piring dan setiap piring berisi 2 cupcake, berapa jumlah seluruh cupcake?',
    options: [
      { id: 'A', value: 6, label: '6 Cupcake' },
      { id: 'B', value: 8, label: '8 Cupcake' },
      { id: 'C', value: 10, label: '10 Cupcake' },
      { id: 'D', value: 12, label: '12 Cupcake' },
    ],
    correctAnswer: 'B',
    explanation: '4 piring x 2 cupcake = 2 + 2 + 2 + 2 = 8 cupcake lezat!',
    hint: 'Jumlahkan angka 2 sebanyak 4 kali: 2 + 2 = 4, 4 + 2 = 6, 6 + 2 = 8!',
    visualHint: { formula: '4 x 2 = 8', initialCount: 8, itemType: 'cake' },
  },
  rewardXp: 60,
};

export const multiplicationLesson3: StoryLesson = {
  lessonId: 'math-multiplication-003',
  levelId: 5,
  title: 'Soal 3: Ikat Bunga Matahari di Taman Ceria',
  subject: 'mathematics',
  topic: 'multiplication',
  difficulty: 2,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2',
    theme: 'Taman Bunga',
    mathFormula: { operandA: 2, operator: '*', operandB: 5, result: 10 },
  },
  learningObjective: ['Memahami konsep perkalian 2 x 5 = 10 sebagai 5 + 5'],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'mult3_s1',
      title: 'Dua Ikat Bunga Matahari',
      background: 'park',
      narration: 'Budi merangkai bunga matahari menjadi dua ikat besar. Setiap ikat berisi lima tangkai bunga matahari yang cerah.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'flower', owner: 'budi', quantity: 10, position: { x: 380, y: 340 } },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Aku membuat 2 ikat bunga, masing-masing ada 5 tangkai bunga matahari!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Berapakah jumlah seluruh tangkai bunga matahari pada 2 ikatan tersebut?',
    options: [
      { id: 'A', value: 8, label: '8 Tangkai' },
      { id: 'B', value: 9, label: '9 Tangkai' },
      { id: 'C', value: 10, label: '10 Tangkai' },
      { id: 'D', value: 12, label: '12 Tangkai' },
    ],
    correctAnswer: 'C',
    explanation: '2 ikat dikali 5 tangkai = 5 + 5 = 10 tangkai bunga matahari (2 x 5 = 10)!',
    hint: 'Jumlahkan 5 sebanyak 2 kali: 5 + 5 = ?',
    visualHint: { formula: '2 x 5 = 10', initialCount: 10, itemType: 'flower' },
  },
  rewardXp: 60,
};

export const multiplicationLesson4: StoryLesson = {
  lessonId: 'math-multiplication-004',
  levelId: 5,
  title: 'Soal 4: Kotak Krayon Warna-Warni',
  subject: 'mathematics',
  topic: 'multiplication',
  difficulty: 2,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2',
    theme: 'Ruang Seni',
    mathFormula: { operandA: 3, operator: '*', operandB: 4, result: 12 },
  },
  learningObjective: ['Memahami perkalian 3 x 4 = 12'],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'mult4_s1',
      title: 'Tiga Kotak Krayon',
      background: 'classroom',
      narration: 'Di meja gambar ada tiga kotak krayon baru. Setiap kotak berisi empat batang krayon warna-warni.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 220, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'book', owner: 'siti', quantity: 12, position: { x: 380, y: 340 } },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Ada 3 kotak krayon baru! Masing-masing kotak berisi 4 batang krayon.',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Jika ada 3 kotak dan tiap kotak berisi 4 krayon, berapa jumlah seluruh krayon?',
    options: [
      { id: 'A', value: 10, label: '10 Krayon' },
      { id: 'B', value: 11, label: '11 Krayon' },
      { id: 'C', value: 12, label: '12 Krayon' },
      { id: 'D', value: 14, label: '14 Krayon' },
    ],
    correctAnswer: 'C',
    explanation: '3 kotak x 4 krayon = 4 + 4 + 4 = 12 krayon (3 x 4 = 12)!',
    hint: 'Jumlahkan angka 4 sebanyak tiga kali: 4 + 4 = 8, 8 + 4 = 12!',
    visualHint: { formula: '3 x 4 = 12', initialCount: 12, itemType: 'book' },
  },
  rewardXp: 60,
};

export const multiplicationLesson5: StoryLesson = {
  lessonId: 'math-multiplication-005',
  levelId: 5,
  title: 'Soal 5: Barisan Bintang Keberuntungan',
  subject: 'mathematics',
  topic: 'multiplication',
  difficulty: 2,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2',
    theme: 'Langit Malam',
    mathFormula: { operandA: 5, operator: '*', operandB: 2, result: 10 },
  },
  learningObjective: ['Memahami perkalian 5 x 2 = 10 sebagai penjumlahan berulang'],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'mult5_s1',
      title: 'Lima Pasang Bintang',
      background: 'castle',
      narration: 'Di langit kastil bersinar lima pasang bintang keberuntungan. Setiap pasang terdiri dari dua bintang emas berkilau.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'star', owner: 'budi', quantity: 10, position: { x: 380, y: 340 } },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Lihat ke langit! Ada 5 kelompok bintang, dan tiap kelompok ada 2 bintang emas!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Berapakah jumlah seluruh bintang keberuntungan jika ada 5 pasang dan tiap pasang berisi 2 bintang?',
    options: [
      { id: 'A', value: 8, label: '8 Bintang' },
      { id: 'B', value: 10, label: '10 Bintang' },
      { id: 'C', value: 12, label: '12 Bintang' },
      { id: 'D', value: 15, label: '15 Bintang' },
    ],
    correctAnswer: 'B',
    explanation: '5 pasang x 2 bintang = 2 + 2 + 2 + 2 + 2 = 10 bintang emas (5 x 2 = 10)!',
    hint: 'Hitung loncat dua-dua sebanyak 5 kali: 2, 4, 6, 8, 10!',
    visualHint: { formula: '5 x 2 = 10', initialCount: 10, itemType: 'star' },
  },
  rewardXp: 60,
};

// ==========================================
// 🍰 LEVEL 6: PEMBAGIAN DASAR (DIVISION) — SOAL 2-5
// ==========================================

export const divisionLesson2: StoryLesson = {
  lessonId: 'math-division-002',
  levelId: 6,
  title: 'Soal 2: Membagikan Apel Segar ke Tiga Sahabat',
  subject: 'mathematics',
  topic: 'division',
  difficulty: 3,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2-3',
    theme: 'Kebun Ceria',
    mathFormula: { operandA: 6, operator: '/', operandB: 3, result: 2 },
  },
  learningObjective: ['Memahami pembagian 6 ÷ 3 = 2 sebagai membagi sama rata'],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'div2_s1',
      title: 'Enam Apel untuk Tiga Anak',
      background: 'forest',
      narration: 'Budi memetik enam buah apel merah manis. Budi ingin membagikannya sama rata kepada tiga sahabat.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'apple', owner: 'budi', quantity: 6, position: { x: 380, y: 340 } },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Aku punya 6 apel merah. Ayo kita bagi sama rata untuk 3 orang!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Jika 6 buah apel dibagi sama rata untuk 3 anak, berapa buah apel yang didapat masing-masing anak?',
    options: [
      { id: 'A', value: 1, label: '1 Apel' },
      { id: 'B', value: 2, label: '2 Apel' },
      { id: 'C', value: 3, label: '3 Apel' },
      { id: 'D', value: 4, label: '4 Apel' },
    ],
    correctAnswer: 'B',
    explanation: '6 apel dibagi 3 anak: masing-masing anak mendapat 2 apel (6 ÷ 3 = 2)!',
    hint: 'Berapa kali 3 yang hasilnya 6? Ingat 3 x 2 = 6, jadi 6 ÷ 3 = 2!',
    visualHint: { formula: '6 ÷ 3 = 2', initialCount: 6, itemType: 'apple' },
  },
  rewardXp: 70,
};

export const divisionLesson3: StoryLesson = {
  lessonId: 'math-division-003',
  levelId: 6,
  title: 'Soal 3: Membagi Kelereng ke Dua Toples Kaca',
  subject: 'mathematics',
  topic: 'division',
  difficulty: 3,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2-3',
    theme: 'Kamar Mainan',
    mathFormula: { operandA: 10, operator: '/', operandB: 2, result: 5 },
  },
  learningObjective: ['Menghitung pembagian 10 ÷ 2 = 5'],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'div3_s1',
      title: 'Sepuluh Kelereng Berkilau',
      background: 'park',
      narration: 'Siti memiliki sepuluh butir kelereng warna-warni. Siti ingin menyimpannya ke dalam dua toples kaca secara seimbang.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 220, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'marble', owner: 'siti', quantity: 10, position: { x: 380, y: 340 } },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Aku punya 10 kelereng. Aku ingin membaginya sama rata ke dalam 2 toples kaca.',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Jika 10 butir kelereng dibagi sama rata ke dalam 2 toples kaca, berapa butir kelereng di setiap toples?',
    options: [
      { id: 'A', value: 4, label: '4 Butir' },
      { id: 'B', value: 5, label: '5 Butir' },
      { id: 'C', value: 6, label: '6 Butir' },
      { id: 'D', value: 7, label: '7 Butir' },
    ],
    correctAnswer: 'B',
    explanation: '10 kelereng dibagi 2 toples sama dengan 5 butir per toples (10 ÷ 2 = 5)!',
    hint: 'Bagi 10 menjadi dua kelompok yang sama: 5 dan 5!',
    visualHint: { formula: '10 ÷ 2 = 5', initialCount: 10, itemType: 'marble' },
  },
  rewardXp: 70,
};

export const divisionLesson4: StoryLesson = {
  lessonId: 'math-division-004',
  levelId: 6,
  title: 'Soal 4: Permen Pelangi Dibagi Rata Bertiga',
  subject: 'mathematics',
  topic: 'division',
  difficulty: 3,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2-3',
    theme: 'Toko Permen',
    mathFormula: { operandA: 9, operator: '/', operandB: 3, result: 3 },
  },
  learningObjective: ['Memahami pembagian 9 ÷ 3 = 3'],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'div4_s1',
      title: 'Sembilan Permen Buah',
      background: 'market',
      narration: 'Ibu memberi sembilan butir permen rasa buah. Budi, Siti, dan satu temannya ingin membaginya sama rata.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'coin', owner: 'budi', quantity: 9, position: { x: 380, y: 340 } },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Ada 9 permen buah manis! Ayo kita bagi sama banyak bertiga.',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Jika 9 permen dibagi sama rata untuk 3 anak, berapa butir permen yang didapat setiap anak?',
    options: [
      { id: 'A', value: 2, label: '2 Permen' },
      { id: 'B', value: 3, label: '3 Permen' },
      { id: 'C', value: 4, label: '4 Permen' },
      { id: 'D', value: 5, label: '5 Permen' },
    ],
    correctAnswer: 'B',
    explanation: '9 permen dibagi 3 anak = masing-masing mendapat 3 butir permen (9 ÷ 3 = 3)!',
    hint: 'Ingat perkalian 3: 3 x 3 = 9, jadi 9 ÷ 3 = 3!',
    visualHint: { formula: '9 ÷ 3 = 3', initialCount: 9, itemType: 'coin' },
  },
  rewardXp: 70,
};

export const divisionLesson5: StoryLesson = {
  lessonId: 'math-division-005',
  levelId: 6,
  title: 'Soal 5: Merangkai Bunga ke dalam Tiga Vas',
  subject: 'mathematics',
  topic: 'division',
  difficulty: 3,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2-3',
    theme: 'Taman Bunga',
    mathFormula: { operandA: 12, operator: '/', operandB: 3, result: 4 },
  },
  learningObjective: ['Menghitung pembagian 12 ÷ 3 = 4'],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'div5_s1',
      title: 'Dua Belas Kuntum Bunga',
      background: 'park',
      narration: 'Siti memetik dua belas tangkai bunga mawar yang harum. Siti ingin memasukkannya ke dalam tiga vas bunga secara sama rata.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 220, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'flower', owner: 'siti', quantity: 12, position: { x: 380, y: 340 } },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Ada 12 bunga mawar segar! Kita bagi sama rata ke dalam 3 vas meja ya.',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Berapakah tangkai bunga yang ada di setiap vas jika 12 bunga dibagi sama rata ke 3 vas?',
    options: [
      { id: 'A', value: 3, label: '3 Tangkai' },
      { id: 'B', value: 4, label: '4 Tangkai' },
      { id: 'C', value: 5, label: '5 Tangkai' },
      { id: 'D', value: 6, label: '6 Tangkai' },
    ],
    correctAnswer: 'B',
    explanation: '12 tangkai bunga dibagi ke dalam 3 vas: masing-masing berisi 4 tangkai (12 ÷ 3 = 4)!',
    hint: 'Berapa kali 3 yang menghasilkan 12? 3 x 4 = 12!',
    visualHint: { formula: '12 ÷ 3 = 4', initialCount: 12, itemType: 'flower' },
  },
  rewardXp: 70,
};

// ==========================================
// 🏰 LEVEL 7: FINAL ADVENTURE — SOAL 2-5
// ==========================================

export const finalAdventureLesson2: StoryLesson = {
  lessonId: 'math-final-002',
  levelId: 7,
  title: 'Soal 2: Jembatan Pelangi: Menggabungkan Permata Suci',
  subject: 'mathematics',
  topic: 'general',
  difficulty: 3,
  metadata: {
    ageGroup: '7-10',
    grade: 'SD Kelas 2-3',
    theme: 'Jembatan Ajaib',
    mathFormula: { operandA: 6, operator: '+', operandB: 6, result: 12 },
  },
  learningObjective: ['Menyelesaikan tantangan penjumlahan gabungan 6 + 6 = 12'],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'final2_s1',
      title: 'Altar Jembatan Pelangi',
      background: 'castle',
      narration: 'Untuk menyalakan Jembatan Pelangi menuju ruang tahta, Budi membawa 6 permata merah dan Siti membawa 6 permata biru.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'star', owner: 'budi', quantity: 6, position: { x: 280, y: 340 } },
        { type: 'spawn_character', characterId: 'siti', position: { x: 520, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'star', owner: 'siti', quantity: 6, position: { x: 440, y: 340 } },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Jika 6 permataku dan 6 permatamu digabungkan, jembatan pelangi akan bersinar!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Berapakah total permata suci yang terkumpul di altar jembatan pelangi?',
    options: [
      { id: 'A', value: 10, label: '10 Permata' },
      { id: 'B', value: 11, label: '11 Permata' },
      { id: 'C', value: 12, label: '12 Permata' },
      { id: 'D', value: 14, label: '14 Permata' },
    ],
    correctAnswer: 'C',
    explanation: '6 permata ditambah 6 permata sama dengan 12 permata suci (6 + 6 = 12)! Jembatan pelangi berhasil bersinar terang!',
    hint: 'Penjumlahan kembar: 6 + 6 = 12!',
    visualHint: { formula: '6 + 6 = 12', initialCount: 6, transferCount: 6, remainingCount: 12, itemType: 'star' },
  },
  rewardXp: 80,
};

export const finalAdventureLesson3: StoryLesson = {
  lessonId: 'math-final-003',
  levelId: 7,
  title: 'Soal 3: Menara Kastil: Perbandingan Obor Cahaya',
  subject: 'mathematics',
  topic: 'general',
  difficulty: 3,
  metadata: {
    ageGroup: '7-10',
    grade: 'SD Kelas 2-3',
    theme: 'Menara Api Biru',
    mathFormula: { operandA: 12, operator: '>', operandB: 8, result: 4 },
  },
  learningObjective: ['Membandingkan dua kuantitas di kastil (12 obor vs 8 obor)'],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'final3_s1',
      title: 'Menara Barat dan Menara Timur',
      background: 'castle',
      narration: 'Menara Barat diterangi oleh 12 obor api biru mistis, sedangkan Menara Timur diterangi oleh 8 obor api emas.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 300, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'star', quantity: 12, position: { x: 420, y: 300 } },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Menara Barat memiliki 12 obor, Menara Timur memiliki 8 obor. Berapa selisihnya ya?',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Berapa obor lebih banyak yang dimiliki oleh Menara Barat (12 obor) dibanding Menara Timur (8 obor)?',
    options: [
      { id: 'A', value: 3, label: 'Lebih Banyak 3 Obor' },
      { id: 'B', value: 4, label: 'Lebih Banyak 4 Obor' },
      { id: 'C', value: 5, label: 'Lebih Banyak 5 Obor' },
      { id: 'D', value: 6, label: 'Lebih Banyak 6 Obor' },
    ],
    correctAnswer: 'B',
    explanation: '12 obor dikurangi 8 obor menghasilkan selisih 4 obor (12 - 8 = 4)!',
    hint: 'Kurangkan 12 dengan 8: 12 - 8 = ?',
    visualHint: { formula: '12 - 8 = 4', initialCount: 12, transferCount: 8, remainingCount: 4, itemType: 'star' },
  },
  rewardXp: 80,
};

export const finalAdventureLesson4: StoryLesson = {
  lessonId: 'math-final-004',
  levelId: 7,
  title: 'Soal 4: Ruang Ramuan: Menghitung Botol Eliksir Ajaib',
  subject: 'mathematics',
  topic: 'general',
  difficulty: 3,
  metadata: {
    ageGroup: '7-10',
    grade: 'SD Kelas 2-3',
    theme: 'Laboratorium Kastil',
    mathFormula: { operandA: 3, operator: '*', operandB: 5, result: 15 },
  },
  learningObjective: ['Menyelesaikan tantangan perkalian 3 x 5 = 15'],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'final4_s1',
      title: 'Tiga Rak Eliksir Hijau',
      background: 'castle',
      narration: 'Di laboratorium rahasia terdapat 3 rak lemari. Setiap rak menampung 5 botol eliksir ajaib penyembuh.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'coin', owner: 'budi', quantity: 15, position: { x: 380, y: 340 } },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Ada 3 rak eliksir, dan setiap rak berisi 5 botol ramuan ajaib!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Berapakah total seluruh botol ramuan ajaib yang tersusun rapi di 3 rak lemari?',
    options: [
      { id: 'A', value: 12, label: '12 Botol' },
      { id: 'B', value: 14, label: '14 Botol' },
      { id: 'C', value: 15, label: '15 Botol' },
      { id: 'D', value: 18, label: '18 Botol' },
    ],
    correctAnswer: 'C',
    explanation: '3 rak dikali 5 botol = 5 + 5 + 5 = 15 botol ramuan ajaib (3 x 5 = 15)!',
    hint: 'Hitung loncat lima: 5, 10, 15!',
    visualHint: { formula: '3 x 5 = 15', initialCount: 15, itemType: 'coin' },
  },
  rewardXp: 80,
};

export const finalAdventureLesson5: StoryLesson = {
  lessonId: 'math-final-005',
  levelId: 7,
  title: 'Soal 5: Peti Harta Karun Utama: Membagi Koin Bintang Sejati',
  subject: 'mathematics',
  topic: 'general',
  difficulty: 3,
  metadata: {
    ageGroup: '7-10',
    grade: 'SD Kelas 2-3',
    theme: 'Ruang Tahta Kerajaan',
    mathFormula: { operandA: 20, operator: '/', operandB: 2, result: 10 },
  },
  learningObjective: ['Menyelesaikan tantangan pamungkas pembagian adil 20 ÷ 2 = 10'],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'final5_s1',
      title: 'Peti Harta Karun Terbuka!',
      background: 'castle',
      narration: 'Peti emas tahta kerajaan akhirnya terbuka lebar! Di dalamnya tersimpan 20 koin bintang kehormatan pahlawan.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'celebrate' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 520, y: 320 }, animation: 'celebrate' },
        { type: 'spawn_object', object: 'coin', quantity: 20, position: { x: 380, y: 320 } },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Hore! Kita berhasil membuka peti kerajaan! Ada 20 koin bintang untuk kita bagi berdua!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Jika 20 koin bintang dibagi sama rata berdua (Budi dan Siti), berapa koin yang didapat masing-masing pahlawan?',
    options: [
      { id: 'A', value: 8, label: '8 Koin Bintang' },
      { id: 'B', value: 10, label: '10 Koin Bintang' },
      { id: 'C', value: 12, label: '12 Koin Bintang' },
      { id: 'D', value: 15, label: '15 Koin Bintang' },
    ],
    correctAnswer: 'B',
    explanation: '20 koin bintang dibagi 2 pahlawan = masing-masing mendapatkan 10 koin bintang (20 ÷ 2 = 10)! Selamat, kalian resmi menjadi Pahlawan Angka Sejati!',
    hint: 'Bagi 20 menjadi dua bagian yang sama banyak: 10 dan 10!',
    visualHint: { formula: '20 ÷ 2 = 10', initialCount: 20, itemType: 'coin' },
  },
  rewardXp: 100,
};
