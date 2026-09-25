import { CharacterDef, StoryLesson } from '@/types/story';

const budiDef: CharacterDef = {
  id: 'budi',
  name: 'Budi',
  asset: 'character_budi',
  color: '#3b82f6',
  personality: 'Jujur, pemberani, santun, dan suka menolong',
  voiceProfile: { pitch: 1.45, rate: 1.05 },
};

const sitiDef: CharacterDef = {
  id: 'siti',
  name: 'Siti',
  asset: 'character_siti',
  color: '#ec4899',
  personality: 'Lembut, penyayang, ramah, dan penuh empati',
  voiceProfile: { pitch: 1.75, rate: 0.96 },
};

// ==========================================
// 🤝 LEVEL 1: TIGA KATA AJAIB & SOPAN SANTUN (SOAL 2-5)
// ==========================================

export const characterPolitenessLesson2: StoryLesson = {
  lessonId: 'char-polite-002',
  levelId: 301,
  title: 'Soal 2: Meminta Izin Sebelum Meminjam',
  subject: 'character',
  topic: 'character_politeness',
  difficulty: 1,
  metadata: {
    ageGroup: '5-8',
    grade: 'TK-B / SD 1',
    theme: 'Meja Krayon Kelas',
  },
  learningObjective: [
    'Membiasakan meminta izin sebelum meminjam barang milik orang lain',
    'Menghargai kepemilikan teman dengan bersikap amanah',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'char1_s2_1',
      title: 'Krayon Warna Siti',
      background: 'classroom',
      narration: 'Budi ingin mewarnai gambar langit biru, tetapi krayon birunya tertinggal di rumah. Di meja sebelah, Siti memiliki krayon biru yang bagus.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 480, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Siti, bolehkah aku meminjam krayon birumu sebentar? Aku akan memakainya dengan hati-hati.',
      },
    },
    {
      id: 'char1_s2_2',
      title: 'Meminjam dengan Sopan',
      background: 'classroom',
      narration: 'Siti dengan senang hati meminjamkan krayonnya karena Budi meminta izin dengan sopan dan santun.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Tentu saja boleh, Budi! Terima kasih sudah meminta izin terlebih dahulu!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Apa yang harus kita lakukan sebelum menggunakan pensil atau mainan milik teman?',
    options: [
      { id: 'A', value: 'MintaIzin', label: 'Meminta Izin dengan Sopan Terlebih Dahulu' },
      { id: 'B', value: 'AmbilDiamDiam', label: 'Mengambilnya Diam-diam Tanpa Bicara' },
      { id: 'C', value: 'RebutPaksa', label: 'Merebutnya Secara Paksa' },
    ],
    correctAnswer: 'A',
    explanation: 'Meminta izin dengan sopan menunjukkan rasa hormat dan menghargai barang milik teman!',
    hint: 'Ucapkan kata permisi atau bolehkah aku meminjamnya.',
  },
  rewardXp: 50,
};

export const characterPolitenessLesson3: StoryLesson = {
  lessonId: 'char-polite-003',
  levelId: 301,
  title: 'Soal 3: Menyapa Guru dan Sahabat dengan Ramah',
  subject: 'character',
  topic: 'character_politeness',
  difficulty: 1,
  metadata: {
    ageGroup: '5-8',
    grade: 'SD Kelas 1',
    theme: 'Gerbang Sekolah Pagi Hari',
  },
  learningObjective: [
    'Membiasakan mengucap salam dan menyapa orang lain',
    'Menumbuhkan rasa hormat kepada guru dan keakraban dengan teman',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'char1_s3_1',
      title: 'Tiba di Gerbang Sekolah',
      background: 'classroom',
      narration: 'Pagi hari yang cerah di sekolah, Ibu Guru berdiri menyambut murid-murid di depan pintu kelas. Budi berjalan mendekat dengan senyum cerah.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 480, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Selamat pagi Ibu Guru! Selamat pagi juga Siti sahabatku!',
      },
    },
    {
      id: 'char1_s3_2',
      title: 'Salam yang Menghangatkan Hati',
      background: 'classroom',
      narration: 'Siti tersenyum membalas sapaan ramah Budi. Suasana kelas menjadi hangat dan penuh semangat belajar.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Selamat pagi Budi! Senang sekali disapa dengan senyuman ceria!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Sikap sopan manakah yang terpuji saat kita berpapasan dengan guru di sekolah?',
    options: [
      { id: 'A', value: 'MenyapaRamah', label: 'Tersenyum dan Menyapa: "Selamat Pagi Guru"' },
      { id: 'B', value: 'PuraPuraTidakLihat', label: 'Membuang Muka dan Berpura-pura Tidak Melihat' },
      { id: 'C', value: 'LariKencang', label: 'Berlari Menghindar Sambil Berteriak' },
    ],
    correctAnswer: 'A',
    explanation: 'Menyapa guru dan teman dengan ramah adalah bukti anak yang berbudi pekerti luhur dan santun!',
    hint: 'Tunjukkan senyuman manis dan sapaan yang hangat.',
  },
  rewardXp: 50,
};

export const characterPolitenessLesson4: StoryLesson = {
  lessonId: 'char-polite-004',
  levelId: 301,
  title: 'Soal 4: Mengetuk Pintu Sebelum Masuk',
  subject: 'character',
  topic: 'character_politeness',
  difficulty: 1,
  metadata: {
    ageGroup: '5-8',
    grade: 'SD Kelas 1',
    theme: 'Pintu Ruang Guru',
  },
  learningObjective: [
    'Mengenal etika bertamu dan masuk ruangan',
    'Membiasakan mengetuk pintu dan mengucapkan salam',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'char1_s4_1',
      title: 'Di Depan Pintu Tertutup',
      background: 'classroom',
      narration: 'Siti hendak masuk ke perpustakaan untuk mengembalikan buku cerita. Pintu perpustakaan sedang tertutup rapat.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'budi', position: { x: 460, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Tok! Tok! Tok! Permisi, selamat pagi Ibu Pustakawati, bolehkah saya masuk?',
      },
    },
    {
      id: 'char1_s4_2',
      title: 'Adab Masuk Ruangan',
      background: 'classroom',
      narration: 'Budi memuji adab Siti yang tidak langsung mendobrak pintu begitu saja.',
      actions: [
        { type: 'animate_character', characterId: 'budi', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Pintar sekali Siti! Mengetuk pintu dan mengucap salam menjaga kenyamanan orang di dalam!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Apa yang harus kita lakukan saat hendak memasuki ruangan yang pintunya tertutup?',
    options: [
      { id: 'A', value: 'KetukSalam', label: 'Mengetuk Pintu 3 Kali dan Mengucap Salam/Permisi' },
      { id: 'B', value: 'TendangPintu', label: 'Mendobrak dan Menendang Pintu Keras-keras' },
      { id: 'C', value: 'LangsungMasuk', label: 'Langsung Menerobos Masuk Tanpa Suara' },
    ],
    correctAnswer: 'A',
    explanation: 'Mengetuk pintu dan mengucapkan permisi adalah adab terpuji agar tidak mengagetkan orang di dalam ruangan!',
    hint: 'Gunakan tanganmu untuk mengetuk halus dan ucapkan kata permisi.',
  },
  rewardXp: 50,
};

export const characterPolitenessLesson5: StoryLesson = {
  lessonId: 'char-polite-005',
  levelId: 301,
  title: 'Soal 5: Berbicara Lembut Tanpa Membentak',
  subject: 'character',
  topic: 'character_politeness',
  difficulty: 1,
  metadata: {
    ageGroup: '5-8',
    grade: 'SD Kelas 1',
    theme: 'Taman Diskusi Sahabat',
  },
  learningObjective: [
    'Belajar mengendalikan nada bicara kepada orang lain',
    'Mengetahui bahwa tutur kata lembut membuat suasana selalu damai',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'char1_s5_1',
      title: 'Berdiskusi dengan Sabar',
      background: 'park',
      narration: 'Saat bermain bersama di taman, Budi dan Siti memiliki ide permainan yang berbeda. Namun mereka tetap berbicara dengan nada lembut dan tenang.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 460, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Kita tidak perlu berteriak atau membentak, Siti. Berbicara lembut membuat kita saling mengerti.',
      },
    },
    {
      id: 'char1_s5_2',
      title: 'Sahabat yang Sejuk',
      background: 'park',
      narration: 'Siti mengangguk setuju. Perkataan yang sopan dan santun membuat persahabatan mereka selalu rukun dan menyenangkan.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Tutur kata yang manis dan lembut itu seperti air sejuk yang menenangkan hati!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Bagaimanakah cara bicara yang baik saat kita sedang berbicara dengan orang tua atau sahabat?',
    options: [
      { id: 'A', value: 'LembutSopan', label: 'Bicara Lembut, Jelas, dan Penuh Kesopanan' },
      { id: 'B', value: 'BentakMarah', label: 'Membentak dan Berteriak Kencang' },
      { id: 'C', value: 'Kasar', label: 'Menggunakan Kata-kata Kasar' },
    ],
    correctAnswer: 'A',
    explanation: 'Berbicara dengan tutur kata yang lembut dan santun membuat orang lain merasa dihargai dan bahagia!',
    hint: 'Gunakan nada bicara yang tenang, ramah, dan tidak berteriak.',
  },
  rewardXp: 50,
};

// ==========================================
// 🎁 LEVEL 2: INDAHNYA BERBAGI & EMPATI (SOAL 2-5)
// ==========================================

export const characterSharingLesson2: StoryLesson = {
  lessonId: 'char-share-002',
  levelId: 302,
  title: 'Soal 2: Meminjamkan Payung saat Hujan',
  subject: 'character',
  topic: 'character_sharing',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Jalan Sepulang Sekolah',
  },
  learningObjective: [
    'Menumbuhkan kepedulian menolong teman yang kesulitan',
    'Berbagi payung saat hujan turun',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'char2_s2_1',
      title: 'Gerimis Turun Mendadak',
      background: 'park',
      narration: 'Hujan rintik-rintik mulai turun saat pulang sekolah. Budi tidak membawa payung, sementara Siti membawa payung kuning yang lebar.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'budi', position: { x: 480, y: 320 }, animation: 'surprised' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Budi, ayo berteduh di bawah payungku! Kita jalan bersama agar bajumu tidak basah!',
      },
    },
    {
      id: 'char2_s2_2',
      title: 'Berbagi Payung Hangat',
      background: 'park',
      narration: 'Budi sangat bersyukur memiliki sahabat yang berhati mulia dan peduli terhadap sesama.',
      actions: [
        { type: 'animate_character', characterId: 'budi', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Terima kasih banyak, Siti! Kamu sahabat yang sangat baik dan penolong!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Apa yang sebaiknya kita lakukan jika melihat teman kehujanan dan kita membawa payung besar?',
    options: [
      { id: 'A', value: 'AjakBerteduh', label: 'Mengajaknya Berteduh di Bawah Payung Bersama' },
      { id: 'B', value: 'TinggalkanLari', label: 'Meninggalkannya Sendirian Sambil Berlari' },
      { id: 'C', value: 'Ejek', label: 'Mengejeknya Karena Tidak Bawa Payung' },
    ],
    correctAnswer: 'A',
    explanation: 'Mengajak teman berteduh payung bersama adalah bentuk nyata sikap empati dan tolong-menolong!',
    hint: 'Berbagi payung agar teman tidak basah kuyup terkena air hujan.',
  },
  rewardXp: 50,
};

export const characterSharingLesson3: StoryLesson = {
  lessonId: 'char-share-003',
  levelId: 302,
  title: 'Soal 3: Bermain Bergantian Tanpa Berebut',
  subject: 'character',
  topic: 'character_sharing',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Taman Ayunan Ceria',
  },
  learningObjective: [
    'Mengenal sikap adil bermain bergantian',
    'Menghindari sifat serakah dan ingin menang sendiri',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'char2_s3_1',
      title: 'Satu Ayunan di Taman',
      background: 'park',
      narration: 'Di taman ada satu ayunan kayu yang sangat asyik. Budi dan Siti sama-sama ingin bermain ayunan tersebut.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 440, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Siti, kamu main ayunan dulu 10 kali ayunan, setelah itu gantian aku ya!',
      },
    },
    {
      id: 'char2_s3_2',
      title: 'Bermain dengan Rukun',
      background: 'park',
      narration: 'Siti tersenyum setuju. Dengan bergiliran, tidak ada yang menangis dan semua anak bisa merasakan senangnya berayun.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Setuju Budi! Bermain bergantian membuat permainan jadi seru dan damai!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Jika hanya ada satu mainan ayunan dan banyak teman yang ingin bermain, sikap terbaik kita adalah?',
    options: [
      { id: 'A', value: 'BergantianRukun', label: 'Bermain Bergantian Secara Tertib dan Adil' },
      { id: 'B', value: 'KuasaiSendiri', label: 'Menguasai Ayunan Seharian Sendiri' },
      { id: 'C', value: 'DorongTeman', label: 'Mendorong Teman Agar Menjauh' },
    ],
    correctAnswer: 'A',
    explanation: 'Bermain bergantian secara tertib dan adil mencerminkan sikap lapang dada dan menyayangi teman!',
    hint: 'Berbagi waktu bermain agar semua teman merasakan giliran.',
  },
  rewardXp: 50,
};

export const characterSharingLesson4: StoryLesson = {
  lessonId: 'char-share-004',
  levelId: 302,
  title: 'Soal 4: Menghibur Teman yang Sedang Sedih',
  subject: 'character',
  topic: 'character_sharing',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Bangku Taman yang Tenang',
  },
  learningObjective: [
    'Menumbuhkan rasa empati saat melihat sahabat bersedih',
    'Memberikan kata-kata penghiburan dan semangat',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'char2_s4_1',
      title: 'Budi Sedih Mainannya Rusak',
      background: 'park',
      narration: 'Budi duduk termenung di bangku taman. Roda mobil-mobilan kesayangannya patah saat dimainkan.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 460, y: 320 }, animation: 'walk' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Jangan bersedih Budi, ayo kita perbaiki rodanya bersama-sama dengan lem kayu!',
      },
    },
    {
      id: 'char2_s4_2',
      title: 'Senyuman yang Kembali Mekar',
      background: 'park',
      narration: 'Mendengar ajakan hangat Siti, rasa sedih di hati Budi langsung sirna dan ia kembali bersemangat.',
      actions: [
        { type: 'animate_character', characterId: 'budi', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Terima kasih Siti, kehadiranmu membuat hatiku merasa tenang kembali!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Apa yang sebaiknya kita lakukan saat melihat teman sekelas sedang sedih atau menangis?',
    options: [
      { id: 'A', value: 'HiburSemangat', label: 'Menghampiri, Menghibur, dan Memberinya Semangat' },
      { id: 'B', value: 'Tertawakan', label: 'Menertawakannya di Depan Teman Lain' },
      { id: 'C', value: 'TinggalSendiri', label: 'Mendiamkannya Tanpa Rasa Peduli' },
    ],
    correctAnswer: 'A',
    explanation: 'Menghibur sahabat yang bersedih adalah cerminan hati yang penuh kasih sayang dan empati!',
    hint: 'Berikan perhatian, dengarkan ceritanya, dan beri semangat hangat.',
  },
  rewardXp: 50,
};

export const characterSharingLesson5: StoryLesson = {
  lessonId: 'char-share-005',
  levelId: 302,
  title: 'Soal 5: Meminjamkan Alat Tulis Tanpa Pamrih',
  subject: 'character',
  topic: 'character_sharing',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Jam Pelajaran Menggambar',
  },
  learningObjective: [
    'Membantu teman yang kekurangan alat tulis',
    'Menumbuhkan keikhlasan berbuat kebaikan',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'char2_s5_1',
      title: 'Penggaris Siti Tertinggal',
      background: 'classroom',
      narration: 'Saat pelajaran membuat garis bangun datar, Siti lupa membawa penggaris panjang. Budi kebetulan memiliki dua penggaris di dalam tasnya.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 460, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Siti, pakai penggarisku yang ini saja! Aku punya dua, kamu boleh memakainya sampai pelajaran usai.',
      },
    },
    {
      id: 'char2_s5_2',
      title: 'Tolong-Menolong di Kelas',
      background: 'classroom',
      narration: 'Siti berterima kasih dengan tulus. Kelas yang penuh tolong-menolong membuat belajar terasa sangat menyenangkan.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Alhamdulillah, terima kasih Budi! Kamu selalu siap membantu saat teman membutuhkan!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Jika kita memiliki dua pensil dan teman kita pensilnya patah, sikap apakah yang paling mulia?',
    options: [
      { id: 'A', value: 'PinjamkanIkhlas', label: 'Meminjamkan Satu Pensil dengan Ikhlas' },
      { id: 'B', value: 'Sembunyikan', label: 'Menyembunyikannya di Dalam Laci' },
      { id: 'C', value: 'MintaUang', label: 'Meminta Bayaran Uang Sewa Pensil' },
    ],
    correctAnswer: 'A',
    explanation: 'Meminjamkan barang yang berlebih kepada teman yang membutuhkan adalah perbuatan mulia tanpa pamrih!',
    hint: 'Bantu teman dengan meminjamkan pensil cadanganmu.',
  },
  rewardXp: 50,
};

// ==========================================
// 🗑️ LEVEL 3: PEDULI LINGKUNGAN & KEBERSIHAN (SOAL 2-5)
// ==========================================

export const characterCleanlinessLesson2: StoryLesson = {
  lessonId: 'char-clean-002',
  levelId: 303,
  title: 'Soal 2: Memilah Sampah Organik dan Anorganik',
  subject: 'character',
  topic: 'character_cleanliness',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1-2',
    theme: 'Dua Tong Sampah Sekolah',
  },
  learningObjective: [
    'Mengenal pemilahan sampah organik (kulit buah, daun) dan anorganik (botol plastik)',
    'Menjaga kelestarian lingkungan dengan daur ulang',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'char3_s2_1',
      title: 'Tong Hijau dan Tong Kuning',
      background: 'park',
      narration: 'Di taman ada dua tong sampah: tong hijau untuk sampah organik (daun & sisa makanan) dan tong kuning untuk anorganik (plastik).',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'budi', position: { x: 480, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Kulit pisang ini sampah organik alami, masukkan ke tong hijau agar bisa jadi pupuk tanaman!',
      },
    },
    {
      id: 'char3_s2_2',
      title: 'Pilah Sampah dengan Benar',
      background: 'park',
      narration: 'Budi memasukkan botol minum plastik ke tong kuning agar bisa didaur ulang menjadi barang bermanfaat.',
      actions: [
        { type: 'animate_character', characterId: 'budi', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Memilah sampah membantu petugas kebersihan dan menjaga bumi kita bebas polusi!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Kulit buah jeruk dan sisa dedaunan kering termasuk ke dalam kelompok sampah jenis apa?',
    options: [
      { id: 'A', value: 'Organik', label: 'Sampah Organik (Bisa Membusuk Jadi Pupuk)' },
      { id: 'B', value: 'BesiLogam', label: 'Limbah Logam Keras' },
      { id: 'C', value: 'KacaPlastik', label: 'Sampah Botol Plastik Kaca' },
    ],
    correctAnswer: 'A',
    explanation: 'Sampah organik berasal dari makhluk hidup (daun, sisa buah) yang dapat terurai alami menjadi pupuk kompos!',
    hint: 'Berasal dari sisa tanaman yang bisa diurai oleh tanah.',
  },
  rewardXp: 60,
};

export const characterCleanlinessLesson3: StoryLesson = {
  lessonId: 'char-clean-003',
  levelId: 303,
  title: 'Soal 3: Merapikan Mainan Setelah Selesai Bermain',
  subject: 'character',
  topic: 'character_cleanliness',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Kamar Mainan Mandiri',
  },
  learningObjective: [
    'Membiasakan tanggung jawab merapikan mainan sendiri',
    'Menjaga kamar tetap rapi, bersih, dan aman dari tersandung',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'char3_s3_1',
      title: 'Selesai Bermain Balok Susun',
      background: 'classroom',
      narration: 'Setelah selesai bermain balok susun di karpet kelas, Budi dan Siti langsung memasukkan balok-balok ke dalam kotak mainan.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 460, y: 320 }, animation: 'walk' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Ayo Siti, kita rapikan semua balok ke kotaknya agar tidak terinjak atau membuat teman tersandung!',
      },
    },
    {
      id: 'char3_s3_2',
      title: 'Ruangan Rapi Kembali',
      background: 'classroom',
      narration: 'Ibu guru tersenyum bangga melihat anak-anak yang mandiri dan bertanggung jawab.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Selesai! Ruangan rapi kembali dan barang-barang tidak mudah hilang!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Kapan waktu yang paling tepat untuk merapikan mainan kita kembali ke kotaknya?',
    options: [
      { id: 'A', value: 'SelesaiMain', label: 'Tepat Setelah Selesai Bermain' },
      { id: 'B', value: 'MingguDepan', label: 'Dibiarkan Berserakan Sampai Minggu Depan' },
      { id: 'C', value: 'SuruhOrangLain', label: 'Menyuruh Orang Lain yang Merapikannya' },
    ],
    correctAnswer: 'A',
    explanation: 'Merapikan mainan tepat setelah bermain adalah bukti anak mandiri dan bertanggung jawab!',
    hint: 'Segera setelah kamu selesai memakainya.',
  },
  rewardXp: 60,
};

export const characterCleanlinessLesson4: StoryLesson = {
  lessonId: 'char-clean-004',
  levelId: 303,
  title: 'Soal 4: Menjaga Dinding dan Meja Tetap Bersih',
  subject: 'character',
  topic: 'character_cleanliness',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Dinding Sekolah Asri',
  },
  learningObjective: [
    'Menghargai fasilitas umum dan milik bersama',
    'Menolak perilaku mencoret-coret meja dan dinding sembarangan',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'char3_s4_1',
      title: 'Buku Gambar Khusus Mewarnai',
      background: 'classroom',
      narration: 'Budi memegang spidol warna-warni. Budi menggambar di atas buku gambar miliknya, bukan di atas meja sekolah.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 460, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Dinding dan meja sekolah adalah fasilitas bersama. Kita harus menggambar di kertas gambar!',
      },
    },
    {
      id: 'char3_s4_2',
      title: 'Menjaga Keindahan Sekolah',
      background: 'classroom',
      narration: 'Siti setuju. Meja dan dinding yang bersih membuat suasana belajar terasa nyaman bagi seluruh siswa.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Benar Budi! Jangan mencoret-coret meja atau dinding agar sekolah kita selalu indah!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Di manakah tempat yang tepat dan benar untuk menyalurkan bakat menggambar dan mewarnai?',
    options: [
      { id: 'A', value: 'BukuGambar', label: 'Di Buku Gambar atau Kertas Kosong' },
      { id: 'B', value: 'DindingKelas', label: 'Di Dinding Tembok Kelas' },
      { id: 'C', value: 'MejaBelajar', label: 'Di Permukaan Meja Kayu Belajar' },
    ],
    correctAnswer: 'A',
    explanation: 'Menggambar pada buku gambar atau kanvas adalah cara tepat mengekspresikan karya seni tanpa merusak fasilitas umum!',
    hint: 'Gunakan lembaran kertas buku yang disediakan untuk menggambar.',
  },
  rewardXp: 60,
};

export const characterCleanlinessLesson5: StoryLesson = {
  lessonId: 'char-clean-005',
  levelId: 303,
  title: 'Soal 5: Menghemat Pemakaian Air Bersih',
  subject: 'character',
  topic: 'character_cleanliness',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Wastafel Sekolah Sejuk',
  },
  learningObjective: [
    'Membiasakan mematikan kran air saat tidak digunakan',
    'Menumbuhkan rasa syukur dan kepedulian menghemat air bersih',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'char3_s5_1',
      title: 'Melihat Kran Air Menetes',
      background: 'park',
      narration: 'Di dekat wastafel taman, ada kran air yang lupa ditutup rapat sehingga air bersih menetes terus-menerus terbuang sia-sia.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'budi', position: { x: 460, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Lihat Budi, kran airnya masih mengalir! Ayo kita putar rapat agar air bersih tidak terbuang!',
      },
    },
    {
      id: 'char3_s5_2',
      title: 'Kran Ditutup Rapat',
      background: 'park',
      narration: 'Budi langsung memutar kran hingga tertutup rapat. Tetesan air berhenti dan sumber air bumi terselamatkan.',
      actions: [
        { type: 'animate_character', characterId: 'budi', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Alhamdulillah! Menghemat air bersih adalah bentuk syukur dan menjaga kelestarian bumi!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Apa yang harus kita lakukan pada kran air setelah selesai mencuci tangan atau sikat gigi?',
    options: [
      { id: 'A', value: 'TutupRapat', label: 'Mematikan dan Menutup Kran Air dengan Rapat' },
      { id: 'B', value: 'BiarkanMengalir', label: 'Membiarkan Air Mengalir Terus Sampai Meluap' },
      { id: 'C', value: 'PatahkanKran', label: 'Merusak Gagang Kran Air' },
    ],
    correctAnswer: 'A',
    explanation: 'Mematikan kran air setelah selesai digunakan mencegah pemborosan air bersih bagi generasi mendatang!',
    hint: 'Putar putaran kran sampai aliran air berhenti.',
  },
  rewardXp: 60,
};

// ==========================================
// 🧼 LEVEL 4: KEBIASAAN HIDUP SEHAT & MANDIRI (SOAL 2-5)
// ==========================================

export const characterHealthyLesson2: StoryLesson = {
  lessonId: 'char-hlth-002',
  levelId: 304,
  title: 'Soal 2: Menyikat Gigi Pagi dan Malam Hari',
  subject: 'character',
  topic: 'character_healthy',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Kamar Mandi Bersih Bersinar',
  },
  learningObjective: [
    'Membiasakan sikat gigi teratur 2 kali sehari',
    'Mencegah kuman dan gigi berlubang',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'char4_s2_1',
      title: 'Gigi Putih dan Bersih',
      background: 'classroom',
      narration: 'Budi tersenyum lebar memperlihatkan giginya yang putih dan bersih. Budi selalu menyikat gigi setelah sarapan dan sebelum tidur malam.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 460, y: 320 }, animation: 'happy' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Menyikat gigi dua kali sehari membuat kuman makanan lenyap dan gigi bebas dari rasa sakit berlubang!',
      },
    },
    {
      id: 'char4_s2_2',
      title: 'Senyuman Sehat Berseri',
      background: 'classroom',
      narration: 'Siti mengangguk setuju bahwa napas segar dan gigi kuat membuat kita semakin percaya diri.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Jangan lupa sebelum tidur malam wajib menyikat gigi agar kuman tidak merusak gigi saat kita tidur!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Berapa kali sebaiknya kita menyikat gigi setiap hari agar gigi tetap putih sehat dan bebas kuman?',
    options: [
      { id: 'A', value: '2Kali', label: 'Minimal 2 Kali Sehari (Pagi & Sebelum Tidur Malam)' },
      { id: 'B', value: '1BulanSekali', label: 'Hanya 1 Kali Sebulan' },
      { id: 'C', value: 'TidakPernah', label: 'Tidak Perlu Menyikat Gigi Sama Sekali' },
    ],
    correctAnswer: 'A',
    explanation: 'Menyikat gigi minimal 2 kali sehari membersihkan sisa makanan dan melindungi gigi dari asam kuman berlubang!',
    hint: 'Dilakukan di pagi hari setelah makan dan malam hari sebelum terlelap.',
  },
  rewardXp: 60,
};

export const characterHealthyLesson3: StoryLesson = {
  lessonId: 'char-hlth-003',
  levelId: 304,
  title: 'Soal 3: Gemar Makan Sayur dan Buah Segar',
  subject: 'character',
  topic: 'character_healthy',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Meja Bekal Sehat',
  },
  learningObjective: [
    'Mengenal manfaat vitamin dari sayuran hijau dan buah segar',
    'Menghindari kebiasaan jajan sembarangan',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'char4_s3_1',
      title: 'Kotak Bekal Bergizi Seimbang',
      background: 'classroom',
      narration: 'Siti membuka bekal makan siangnya: ada nasi, sayur bayam hijau segar, telur dadar, dan buah pisang manis.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'budi', position: { x: 460, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Sayur bayam dan buah-buahan ini kaya akan vitamin yang membuat tubuh kita kuat dan tidak mudah sakit!',
      },
    },
    {
      id: 'char4_s3_2',
      title: 'Tubuh Bugar Penuh Energi',
      background: 'classroom',
      narration: 'Budi juga menikmati buah apelnya. Makanan bergizi seimbang membuat otak cerdas dan tubuh tumbuh optimal.',
      actions: [
        { type: 'animate_character', characterId: 'budi', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Makan sayur dan buah membuat kita lincah berolahraga dan konsentrasi saat belajar!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Makanan apakah yang mengandung banyak serat dan vitamin alami untuk menjaga daya tahan tubuh kita?',
    options: [
      { id: 'A', value: 'SayurBuah', label: 'Sayuran Hijau & Buah-buahan Segar' },
      { id: 'B', value: 'PermenManis', label: 'Permen Manis Berpewarna Terlalu Banyak' },
      { id: 'C', value: 'MakananBasi', label: 'Makanan Basi Terbuka di Pinggir Jalan' },
    ],
    correctAnswer: 'A',
    explanation: 'Sayur dan buah kaya akan vitamin, mineral, dan serat yang menjaga sistem imun tubuh kita tetap tangguh!',
    hint: 'Bayam, wortel, apel, dan pisang adalah contohnya.',
  },
  rewardXp: 60,
};

export const characterHealthyLesson4: StoryLesson = {
  lessonId: 'char-hlth-004',
  levelId: 304,
  title: 'Soal 4: Tidur Tepat Waktu dan Bangun Pagi',
  subject: 'character',
  topic: 'character_healthy',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Matahari Terbit Pagi Hari',
  },
  learningObjective: [
    'Membiasakan tidur malam tepat waktu (tidak bergadang)',
    'Merasakan kesegaran tubuh saat bangun pagi untuk berangkat sekolah',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'char4_s4_1',
      title: 'Budi Datang Pagi ke Sekolah',
      background: 'classroom',
      narration: 'Budi tiba di sekolah dengan wajah ceria dan bugar. Budi tidur pukul delapan malam sehingga bisa bangun pagi saat fajar menyingsing.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 460, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Tidur tepat waktu membuat badanku segar bugar dan tidak pernah terlambat masuk kelas!',
      },
    },
    {
      id: 'char4_s4_2',
      title: 'Disiplin Waktu Istirahat',
      background: 'classroom',
      narration: 'Siti mengacungkan jempol. Anak yang tidak bergadang memiliki konsentrasi belajar yang sangat tajam.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Tepat sekali Budi! Istirahat malam yang cukup adalah kunci pertumbuhan anak hebat!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Apa manfaat bagi tubuh jika kita tidur malam tepat waktu dan tidak bergadang main gawai?',
    options: [
      { id: 'A', value: 'BangunSegar', label: 'Bangun Pagi dengan Tubuh Segar dan Semangat Belajar' },
      { id: 'B', value: 'MengantukKelas', label: 'Mengantuk dan Lemas Seharian di Dalam Kelas' },
      { id: 'C', value: 'TerlambatSekolah', label: 'Kesiangan dan Ketinggalan Pelajaran Sekolah' },
    ],
    correctAnswer: 'A',
    explanation: 'Tidur cukup 8-9 jam setiap malam memulihkan energi tubuh sehingga kita bangun bugar dan bersemangat!',
    hint: 'Pilihan yang membuat tubuh terasa sehat, segar, dan tidak lelah.',
  },
  rewardXp: 60,
};

export const characterHealthyLesson5: StoryLesson = {
  lessonId: 'char-hlth-005',
  levelId: 304,
  title: 'Soal 5: Anak Mandiri Memakai Sepatu Sendiri',
  subject: 'character',
  topic: 'character_healthy',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Teras Rumah Sebelum Berangkat',
  },
  learningObjective: [
    'Membiasakan sikap mandiri mengurus keperluan pribadi',
    'Menumbuhkan rasa bangga dapat memakai sepatu dan menyiapkan tas sendiri',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'char4_s5_1',
      title: 'Mengikat Tali Sepatu dengan Rapi',
      background: 'park',
      narration: 'Sebelum melangkah ke sekolah, Budi duduk di bangku teras memakai kaos kaki dan mengikat tali sepatunya sendiri tanpa merepotkan ibu.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 460, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Aku sudah besar! Aku bisa memakai sepatu dan menyiapkan buku pelajaran sendiri!',
      },
    },
    {
      id: 'char4_s5_2',
      title: 'Pujian Sahabat Mandiri',
      background: 'park',
      narration: 'Siti tersenyum bangga. Sikap mandiri sejak dini melatih kita menjadi pribadi yang tangguh dan bertanggung jawab.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Hebat Budi! Anak mandiri selalu disayang orang tua dan guru!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Tindakan manakah yang mencerminkan sikap ANAK MANDIRI sebelum berangkat ke sekolah?',
    options: [
      { id: 'A', value: 'PakaiSepatuSendiri', label: 'Memakai Sepatu dan Menyiapkan Buku Pelajaran Sendiri' },
      { id: 'B', value: 'MenangisManja', label: 'Menangis Manja Menuntut Disuapi dan Dipakaikan Kaos Kaki' },
      { id: 'C', value: 'TinggalkanTas', label: 'Membiarkan Tas Berantakan di Lantai Kamar' },
    ],
    correctAnswer: 'A',
    explanation: 'Menyiapkan keperluan sendiri seperti memakai sepatu dan merapikan tas adalah wujud sikap mandiri yang terpuji!',
    hint: 'Melakukan hal-hal yang mampu kamu kerjakan sendiri tanpa merepotkan orang lain.',
  },
  rewardXp: 60,
};

// ==========================================
// 💎 LEVEL 5: KEJUJURAN & TANGGUNG JAWAB (SOAL 1-5)
// ==========================================

export const characterHonestyLesson1: StoryLesson = {
  lessonId: 'char-honest-001',
  levelId: 305,
  title: 'Soal 1: Berkata Jujur Mengakui Kesalahan',
  subject: 'character',
  topic: 'character_honesty',
  difficulty: 2,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2',
    theme: 'Ruang Seni Sekolah',
  },
  learningObjective: [
    'Mengenal nilai kejujuran sebagai mahkota budi pekerti',
    'Berani mengakui kesalahan tanpa rasa takut dan berjanji memperbaiki diri',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'char5_s1_1',
      title: 'Pot Tanaman yang Pecah',
      background: 'classroom',
      narration: 'Saat bermain menangkap bola, bola Budi memantul dan menyenggol pot bunga kecil hingga terjatuh pecah. Tidak ada orang lain di ruangan itu.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 480, y: 320 }, animation: 'surprised' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Aku harus jujur kepada guru bahwa aku yang tidak sengaja memecahkannya. Berbohong itu tidak terpuji!',
      },
    },
    {
      id: 'char5_s1_2',
      title: 'Keberanian Ksatria Jujur',
      background: 'classroom',
      narration: 'Siti kagum atas keberanian Budi. Ibu guru tidak marah, melainkan memuji kejujuran Budi dan membantunya membersihkan pecahan pot.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Kejujuranmu sangat berharga Budi! Orang yang jujur selalu dipercaya dan dihormati oleh semua orang!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Apa yang harus kita lakukan jika tidak sengaja merusak atau memecahkan barang milik sekolah?',
    options: [
      { id: 'A', value: 'JujurMintaMaaf', label: 'Mengaku Jujur, Meminta Maaf, dan Membantu Merapikannya' },
      { id: 'B', value: 'TuduhTeman', label: 'Menuduh Teman Lain yang Tidak Tahu Apa-apa' },
      { id: 'C', value: 'LariBohong', label: 'Lari Bersembunyi dan Berbohong Pura-pura Tidak Tahu' },
    ],
    correctAnswer: 'A',
    explanation: 'Kejujuran adalah sifat mulia. Berani berkata jujur saat berbuat salah jauh lebih terpuji daripada berbohong!',
    hint: 'Ksatria sejati selalu berani mengatakan hal yang sebenarnya.',
  },
  rewardXp: 70,
};

export const characterHonestyLesson2: StoryLesson = {
  lessonId: 'char-honest-002',
  levelId: 305,
  title: 'Soal 2: Mengembalikan Barang Temuan Kepada Pemiliknya',
  subject: 'character',
  topic: 'character_honesty',
  difficulty: 2,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2',
    theme: 'Koridor Kelas Pintar',
  },
  learningObjective: [
    'Membiasakan mengembalikan barang yang bukan hak milik kita',
    'Menyerahkan barang temuan kepada guru atau pemiliknya',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'char5_s2_1',
      title: 'Kotak Pensil Tercecer di Lantai',
      background: 'classroom',
      narration: 'Saat berjalan di lorong kelas, Siti menemukan kotak pensil bergambar dinosaurus yang penuh alat tulis lengkap tercecer di lantai.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'budi', position: { x: 480, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Ini bukan punyaku. Pasti ada teman yang sedang bingung mencarinya. Ayo kita serahkan ke meja guru!',
      },
    },
    {
      id: 'char5_s2_2',
      title: 'Pemiliknya Sangat Gembira',
      background: 'classroom',
      narration: 'Ternyata itu milik Doni yang tertinggal. Doni mengucapkan terima kasih dengan mata berbinar-binar gembira.',
      actions: [
        { type: 'animate_character', characterId: 'budi', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Mengembalikan barang milik orang lain membuat hati kita tenang dan penuh berkah!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Jika kamu menemukan dompet atau kotak pensil teman terjatuh di halaman sekolah, apa tindakan yang benar?',
    options: [
      { id: 'A', value: 'SerahkanGuru', label: 'Mengembalikan ke Pemiliknya atau Menyerahkan ke Meja Guru' },
      { id: 'B', value: 'AmbilSimpan', label: 'Mengambil dan Menyimpannya Diam-diam di Kantong Sendiri' },
      { id: 'C', value: 'BuangTong', label: 'Membuangnya ke Dalam Tong Sampah' },
    ],
    correctAnswer: 'A',
    explanation: 'Barang yang bukan milik kita harus dikembalikan kepada pemiliknya dengan amanah dan jujur!',
    hint: 'Berikan kepada guru agar diumumkan kepada yang kehilangan.',
  },
  rewardXp: 70,
};

export const characterHonestyLesson3: StoryLesson = {
  lessonId: 'char-honest-003',
  levelId: 305,
  title: 'Soal 3: Tanggung Jawab Menyelesaikan Tugas',
  subject: 'character',
  topic: 'character_honesty',
  difficulty: 2,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2',
    theme: 'Meja Belajar Malam Hari',
  },
  learningObjective: [
    'Mengenal sikap tanggung jawab sebagai seorang siswa',
    'Menyelesaikan tugas rumah (PR) sebelum bermain gawai atau tidur',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'char5_s3_1',
      title: 'Menyelesaikan Pekerjaan Rumah',
      background: 'classroom',
      narration: 'Sore hari sepulang sekolah, teman-teman mengajak Budi bermain layang-layang. Namun Budi memiliki tugas matematika yang harus diselesaikan.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 460, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Aku harus menyelesaikan tugas belajarku terlebih dahulu. Setelah selesai, barulah aku bisa bermain dengan tenang!',
      },
    },
    {
      id: 'char5_s3_2',
      title: 'Tanggung Jawab yang Membanggakan',
      background: 'classroom',
      narration: 'Siti mendukung komitmen Budi. Menyelesaikan kewajiban sebelum bermain membuat hidup kita tertib dan disiplin.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Luar biasa Budi! Tanggung jawab pada tugas sekolah membuatmu menjadi siswa teladan!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Sikap tanggung jawab apakah yang wajib kita utamakan setelah pulang dari sekolah?',
    options: [
      { id: 'A', value: 'SelesaikanTugas', label: 'Menyelesaikan Tugas Pelajaran Sebelum Bermain' },
      { id: 'B', value: 'MainLupaPR', label: 'Bermain Game Sampai Lupa Mengerjakan Tugas' },
      { id: 'C', value: 'TidurLupakanBuku', label: 'Membiarkan Buku Pelajaran Berantakan Tanpa Dibuka' },
    ],
    correctAnswer: 'A',
    explanation: 'Mendahulukan kewajiban belajar sebelum bermain adalah bukti sikap tanggung jawab anak yang cerdas!',
    hint: 'Selesaikan dulu tugasmu, baru kemudian bermain dengan bebas gembira.',
  },
  rewardXp: 70,
};

export const characterHonestyLesson4: StoryLesson = {
  lessonId: 'char-honest-004',
  levelId: 305,
  title: 'Soal 4: Menepati Janji Kepada Sahabat',
  subject: 'character',
  topic: 'character_honesty',
  difficulty: 2,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2',
    theme: 'Taman Janji Sahabat',
  },
  learningObjective: [
    'Memahami bahwa janji adalah amanah yang wajib ditepati',
    'Menjaga kepercayaan orang lain dengan konsisten',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'char5_s4_1',
      title: 'Tiba Tepat Waktu Sesuai Janji',
      background: 'park',
      narration: 'Budi dan Siti berjanji belajar kelompok bersama di perpustakaan taman pukul empat sore. Jarum jam menunjukkan tepat pukul empat saat Budi tiba.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 460, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Hai Siti! Aku datang tepat waktu sesuai janjiku kemarin!',
      },
    },
    {
      id: 'char5_s4_2',
      title: 'Sahabat yang Amanah',
      background: 'park',
      narration: 'Siti menyambut dengan gembira. Menepati janji membuat hubungan pertemanan dilandasi rasa saling percaya yang kuat.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Terima kasih sudah menepati janji Budi! Orang yang menepati janji adalah orang yang dapat diandalkan!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Jika kita sudah berjanji kepada teman untuk belajar bersama pada jam tertentu, apa yang harus kita lakukan?',
    options: [
      { id: 'A', value: 'TepatiJanji', label: 'Datang Tepat Waktu dan Menepati Janji Tersebut' },
      { id: 'B', value: 'IngkariPergiLain', label: 'Mengingkari Janji dan Pergi ke Tempat Lain Tanpa Kabar' },
      { id: 'C', value: 'TidurSaja', label: 'Tidur Saja dan Mematikan Ponsel' },
    ],
    correctAnswer: 'A',
    explanation: 'Menepati janji adalah tanda pribadi yang amanah, berintegritas, dan setia kawan!',
    hint: 'Lakukan apa yang sudah kamu ucapkan dan janjikan.',
  },
  rewardXp: 70,
};

export const characterHonestyLesson5: StoryLesson = {
  lessonId: 'char-honest-005',
  levelId: 305,
  title: 'Soal 5: Menolak Berbuat Curang saat Ujian',
  subject: 'character',
  topic: 'character_honesty',
  difficulty: 2,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2',
    theme: 'Ruang Ujian Sekolah',
  },
  learningObjective: [
    'Menjunjung tinggi nilai kejujuran saat ulangan sekolah',
    'Percaya pada kemampuan diri sendiri dan menolak menyontek',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'char5_s5_1',
      title: 'Mengerjakan Soal dengan Usaha Sendiri',
      background: 'classroom',
      narration: 'Saat ulangan berlangsung, Budi fokus mengerjakan lembar soalnya sendiri. Budi tidak melihat lembar jawaban orang lain dan tidak menyontek.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 480, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Nilai dari hasil kejujuran diri sendiri jauh lebih membanggakan daripada nilai tinggi hasil menyontek!',
      },
    },
    {
      id: 'char5_s5_2',
      title: 'Prestasi yang Bersih dan Berkah',
      background: 'classroom',
      narration: 'Siti tersenyum bangga. Kejujuran saat belajar adalah fondasi untuk menjadi pemimpin masa depan yang adil.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Hebat sekali Budi! Kejujuran adalah prestasi tertinggi seorang pelajar sejati!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Sikap manakah yang PALING BENAR saat sedang mengerjakan ujian di sekolah?',
    options: [
      { id: 'A', value: 'KerjakanJujur', label: 'Percaya Diri Mengerjakan Sendiri dengan Jujur Tanpa Menyontek' },
      { id: 'B', value: 'ContekTeman', label: 'Melirik dan Menyontek Jawaban Teman Sebelah' },
      { id: 'C', value: 'BawaCatatanKecil', label: 'Menyelipkan Catatan Kecil di Kolong Meja' },
    ],
    correctAnswer: 'A',
    explanation: 'Kejujuran saat ujian melatih integritas dan membuktikan kemampuan belajar kita yang sesungguhnya!',
    hint: 'Kerjakan dengan kemampuanmu sendiri secara jujur.',
  },
  rewardXp: 70,
};

// ==========================================
// 🌈 LEVEL 6: TOLERANSI & MENGHARGAI PERBEDAAN (SOAL 1-5)
// ==========================================

export const characterToleranceLesson1: StoryLesson = {
  lessonId: 'char-tol-001',
  levelId: 306,
  title: 'Soal 1: Berteman Baik Tanpa Membeda-Bedakan',
  subject: 'character',
  topic: 'character_tolerance',
  difficulty: 2,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2-3',
    theme: 'Lingkaran Sahabat Nusantara',
  },
  learningObjective: [
    'Menerapkan semboyan Bhinneka Tunggal Ika dalam pertemanan',
    'Menghargai perbedaan suku, warna kulit, dan asal daerah',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'char6_s1_1',
      title: 'Sahabat dari Berbagai Daerah',
      background: 'park',
      narration: 'Di sekolah Budi dan Siti, ada teman dari Jawa, Sunda, Papua, Batak, Minang, dan Bali. Semua anak bergandengan tangan bermain bersama dengan ceria.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 460, y: 320 }, animation: 'happy' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Meskipun kita berasal dari suku dan daerah yang berbeda, kita semua adalah satu keluarga Indonesia!',
      },
    },
    {
      id: 'char6_s1_2',
      title: 'Bhinneka Tunggal Ika',
      background: 'park',
      narration: 'Siti menambahkan bahwa perbedaan adalah warna-warni indah yang membuat negeri kita semakin kaya dan hebat.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Berbeda-beda tetapi tetap satu jua! Mari kita saling menyayangi tanpa membeda-bedakan!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Bagaimanakah sikap kita kepada teman baru yang berasal dari daerah atau suku yang berbeda dengan kita?',
    options: [
      { id: 'A', value: 'SambutRamah', label: 'Menyambutnya Ramah dan Mengajaknya Bermain Bersama' },
      { id: 'B', value: 'JauhiEjek', label: 'Menjauhinya dan Mengejek Logat Bicaranya' },
      { id: 'C', value: 'TidakMauTeman', label: 'Hanya Mau Berteman dengan yang Satu Suku Saja' },
    ],
    correctAnswer: 'A',
    explanation: 'Semua anak Indonesia adalah saudara. Sikap toleran dan ramah mencerminkan nilai luhur Pancasila!',
    hint: 'Buka tanganmu untuk berteman baik dengan siapa saja.',
  },
  rewardXp: 80,
};

export const characterToleranceLesson2: StoryLesson = {
  lessonId: 'char-tol-002',
  levelId: 306,
  title: 'Soal 2: Menghormati Waktu Beribadah Teman',
  subject: 'character',
  topic: 'character_tolerance',
  difficulty: 2,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2-3',
    theme: 'Taman Sore Hari',
  },
  learningObjective: [
    'Mengenal toleransi antar umat beragama',
    'Memberikan kesempatan dan menjaga ketenangan saat teman beribadah',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'char6_s2_1',
      title: 'Waktu Salat dan Beribadah Tiba',
      background: 'park',
      narration: 'Saat bermain bersama, waktu salat ashar tiba. Budi meminta izin sejenak untuk menunaikan salat di musala terdekat.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 460, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Siti, aku salat ashar dulu ya di musala, nanti kita lanjutkan bermain lagi.',
      },
    },
    {
      id: 'char6_s2_2',
      title: 'Toleransi Beragama yang Indah',
      background: 'park',
      narration: 'Siti dengan tulus menjaga barang-barang Budi dan menunggu dengan sabar tanpa mengganggu.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Silakan Budi! Saling menghormati ibadah membuat kerukunan hidup selalu terjaga dengan damai!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Apa sikap kita saat teman kita hendak melaksanakan ibadah sesuai agamanya?',
    options: [
      { id: 'A', value: 'HormatiBeriWaktu', label: 'Menghormatinya, Menjaga Ketenangan, dan Memberi Waktu' },
      { id: 'B', value: 'PaksaMain', label: 'Memaksanya Terus Bermain dan Melarangnya Beribadah' },
      { id: 'C', value: 'BuatGaduh', label: 'Membuat Suara Gaduh di Depan Tempat Ibadah' },
    ],
    correctAnswer: 'A',
    explanation: 'Menghormati kebebasan beribadah adalah wujud kerukunan beragama yang menjunjung tinggi toleransi!',
    hint: 'Beri kesempatan teman beribadah dan jaga ketenangan.',
  },
  rewardXp: 80,
};

export const characterToleranceLesson3: StoryLesson = {
  lessonId: 'char-tol-003',
  levelId: 306,
  title: 'Soal 3: Musyawarah dan Menghargai Pendapat',
  subject: 'character',
  topic: 'character_tolerance',
  difficulty: 2,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2-3',
    theme: 'Meja Rapat Kelas',
  },
  learningObjective: [
    'Mengenal musyawarah untuk mencapai mufakat',
    'Menghargai usulan teman dan tidak memaksakan kehendak',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'char6_s3_1',
      title: 'Memilih Ketua Piket Kelas',
      background: 'classroom',
      narration: 'Siswa kelas sedang berdiskusi menentukan jadwal piket dan kegiatan menghias kelas menyambut hari kemerdekaan.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'budi', position: { x: 480, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Mari kita dengarkan pendapat semua teman secara bergiliran tanpa memotong pembicaraan!',
      },
    },
    {
      id: 'char6_s3_2',
      title: 'Keputusan Bersama yang Adil',
      background: 'classroom',
      narration: 'Budi setuju. Dengan musyawarah mufakat, keputusan yang diambil disepakati bersama dengan senang hati.',
      actions: [
        { type: 'animate_character', characterId: 'budi', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Musyawarah mengajarkan kita menghargai pendapat orang lain dan menerima hasil mufakat!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Bagaimanakah sikap yang baik saat teman sekelas sedang menyampaikan usul atau pendapatnya dalam diskusi?',
    options: [
      { id: 'A', value: 'DengarkanHargai', label: 'Mendengarkan dengan Baik dan Menghargai Pendapatnya' },
      { id: 'B', value: 'PotongEjek', label: 'Memotong Pembicaraannya dan Mengejek Usulnya' },
      { id: 'C', value: 'PaksaKemauan', label: 'Memaksakan Pendapat Diri Sendiri Harus Dipilih' },
    ],
    correctAnswer: 'A',
    explanation: 'Mendengarkan dan menghargai pendapat orang lain dalam musyawarah adalah cerminan sila keempat Pancasila!',
    hint: 'Dengarkan dulu sampai teman selesai berbicara dengan sopan.',
  },
  rewardXp: 80,
};

export const characterToleranceLesson4: StoryLesson = {
  lessonId: 'char-tol-004',
  levelId: 306,
  title: 'Soal 4: Saling Memaafkan Tanpa Menyimpan Dendam',
  subject: 'character',
  topic: 'character_tolerance',
  difficulty: 2,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2-3',
    theme: 'Pohon Persahabatan Sejati',
  },
  learningObjective: [
    'Memaafkan kesalahan teman dengan tulus',
    'Menjaga persahabatan bebas dari rasa benci atau dendam',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'char6_s4_1',
      title: 'Salah Paham yang Terselesaikan',
      background: 'park',
      narration: 'Kemarin sempat terjadi salah paham saat bermain bola. Hari ini, teman yang salah paham datang meminta maaf dengan tulus.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 460, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Aku sudah memaafkannya dengan sepenuh hati. Menyimpan dendam hanya akan membuat hati kita gelisah.',
      },
    },
    {
      id: 'char6_s4_2',
      title: 'Hati yang Lapang dan Bersih',
      background: 'park',
      narration: 'Siti tersenyum kagum. Orang yang pemaaf memiliki hati yang mulia dan selalu dikelilingi sahabat setia.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Memaafkan adalah sifat pahlawan sejati yang membawa kedamaian abadi!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Jika ada teman yang meminta maaf dengan tulus atas kesalahannya, bagaimana seharusnya sikap kita?',
    options: [
      { id: 'A', value: 'MaafkanIkhlas', label: 'Memaafkannya dengan Ikhlas dan Melupakan Kesalahannya' },
      { id: 'B', value: 'DendamBalas', label: 'Menyimpan Dendam dan Berencana Membalasnya' },
      { id: 'C', value: 'MusuhiSelamanya', label: 'Memusuhinya Selamanya' },
    ],
    correctAnswer: 'A',
    explanation: 'Memaafkan dengan ikhlas melegakan hati dan menjaga kerukunan persaudaraan sepanjang masa!',
    hint: 'Lapangkan dada dan berikan maaf dengan senyuman tulus.',
  },
  rewardXp: 80,
};

export const characterToleranceLesson5: StoryLesson = {
  lessonId: 'char-tol-005',
  levelId: 306,
  title: 'Soal 5: Menghargai Bakat Unik Setiap Teman',
  subject: 'character',
  topic: 'character_tolerance',
  difficulty: 2,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2-3',
    theme: 'Pentas Seni Sekolah',
  },
  learningObjective: [
    'Menyadari bahwa setiap anak memiliki kelebihan dan bakat unik masing-masing',
    'Memberikan apresiasi dan tepuk tangan bagi karya teman',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'char6_s5_1',
      title: 'Bakat yang Beraneka Ragam',
      background: 'classroom',
      narration: 'Di pentas seni kelas, Budi pandai bercerita, Siti merdu bernyanyi, dan Edo jago menggambar pemandangan indah.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 460, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Setiap anak diciptakan istimewa dengan bakatnya masing-masing. Ayo kita beri tepuk tangan meriah!',
      },
    },
    {
      id: 'char6_s5_2',
      title: 'Saling Mendukung Prestasi',
      background: 'classroom',
      narration: 'Semua anak saling memberi semangat. Tidak ada yang merasa paling hebat atau merendahkan orang lain.',
      actions: [
        { type: 'animate_character', characterId: 'budi', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Saling memuji dan mendukung bakat membuat kita semua berkembang menjadi anak hebat!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Bagaimanakah sikap kita saat melihat teman tampil menunjukkan bakat uniknya di depan kelas?',
    options: [
      { id: 'A', value: 'BeriTepukTangan', label: 'Menghargai, Mendukung, dan Memberikan Tepuk Tangan Meriah' },
      { id: 'B', value: 'EjekKurang', label: 'Menertawakan dan Mencari-cari Kekurangannya' },
      { id: 'C', value: 'CuekMainSendiri', label: 'Bersikap Acuh Tak Acuh Sambil Mengobrol Sendiri' },
    ],
    correctAnswer: 'A',
    explanation: 'Menghargai dan mengapresiasi bakat teman menumbuhkan rasa percaya diri dan persahabatan yang suportif!',
    hint: 'Beri semangat dan apresiasi atas keberanian teman tampil.',
  },
  rewardXp: 80,
};

// ==========================================
// 👑 LEVEL 7: KSATRIA KEBAIKAN & PEMIMPIN TELADAN (SOAL 1-5)
// ==========================================

export const characterLeadershipLesson1: StoryLesson = {
  lessonId: 'char-lead-001',
  levelId: 307,
  title: 'Soal 1: Berani Membela Teman (Anti-Bullying)',
  subject: 'character',
  topic: 'character_leadership',
  difficulty: 3,
  metadata: {
    ageGroup: '7-10',
    grade: 'SD Kelas 2-3',
    theme: 'Benteng Ksatria Pelindung',
  },
  learningObjective: [
    'Menolak segala bentuk perundungan (bullying) dan ejekan',
    'Menjadi ksatria pelindung yang membela teman yang lemah',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'char7_s1_1',
      title: 'Melihat Teman Diejek',
      background: 'park',
      narration: 'Di sudut taman, ada anak yang diejek karena memakai kacamata tebal. Anak itu tampak sedih dan menunduk.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 460, y: 320 }, animation: 'walk' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Stop! Jangan mengejek teman! Mengejek itu perbuatan tercela dan menyakiti hati!',
      },
    },
    {
      id: 'char7_s1_2',
      title: 'Sahabat Pembawa Kedamaian',
      background: 'park',
      narration: 'Siti merangkul anak tersebut dan mengajaknya bergabung bermain bersama Budi. Anak yang mengejek pun menyadari kesalahannya dan meminta maaf.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Ksatria kebaikan berani membela kebenaran dan melindungi sahabat dari perundungan!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Jika melihat teman sedang diejek atau diganggu oleh anak lain, tindakan ksatria apakah yang harus kita lakukan?',
    options: [
      { id: 'A', value: 'BelaLaporGuru', label: 'Berani Menegur Baik-baik, Membela Teman, dan Melaporkan ke Guru' },
      { id: 'B', value: 'IkutMengejek', label: 'Ikut-ikutan Mengejek dan Menertawakannya' },
      { id: 'C', value: 'RekamTonton', label: 'Menonton Saja Sambil Bersorak Senang' },
    ],
    correctAnswer: 'A',
    explanation: 'Menjadi pembela kebaikan dan melindungi teman dari ejekan adalah tanda keberanian moral yang mulia!',
    hint: 'Bela teman yang disakiti dan minta bantuan guru bila perlu.',
  },
  rewardXp: 90,
};

export const characterLeadershipLesson2: StoryLesson = {
  lessonId: 'char-lead-002',
  levelId: 307,
  title: 'Soal 2: Sikap Rendah Hati Saat Menjadi Juara',
  subject: 'character',
  topic: 'character_leadership',
  difficulty: 3,
  metadata: {
    ageGroup: '7-10',
    grade: 'SD Kelas 2-3',
    theme: 'Panggung Juara Istana',
  },
  learningObjective: [
    'Mengenal sikap rendah hati (tawaduk) saat meraih kemenangan',
    'Menghargai lawan lomba dan menyemangati mereka',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'char7_s2_1',
      title: 'Menerima Piala Kejuaraan',
      background: 'castle',
      narration: 'Siti berhasil memenangkan lomba membaca puisi tingkat sekolah. Siti menerima piala emas dengan senyum santun dan bersyukur.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 260, y: 320 }, animation: 'celebrate' },
        { type: 'spawn_character', characterId: 'budi', position: { x: 480, y: 320 }, animation: 'walk' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Kemenangan ini adalah berkah dari latihan keras dan doa orang tua serta dukungan guru!',
      },
    },
    {
      id: 'char7_s2_2',
      title: 'Menyalami Lawan Lomba',
      background: 'castle',
      narration: 'Siti turun dari panggung dan menyalami peserta lomba lainnya sambil memuji penampilan mereka.',
      actions: [
        { type: 'animate_character', characterId: 'budi', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Juara sejati adalah mereka yang tetap rendah hati dan tidak pernah menyombongkan diri!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Bagaimanakah sikap seorang anak yang berakhlak mulia saat berhasil memenangkan perlombaan?',
    options: [
      { id: 'A', value: 'RendahHati', label: 'Bersyukur, Tetap Rendah Hati, dan Menghormati Peserta Lain' },
      { id: 'B', value: 'SombongPamer', label: 'Menyombongkan Diri dan Memamerkan Piala di Depan yang Kalah' },
      { id: 'C', value: 'EjekPesertaLain', label: 'Mengejek Lawan Lomba yang Belum Berhasil' },
    ],
    correctAnswer: 'A',
    explanation: 'Rendah hati adalah mahkota sang juara. Kemenangan dirayakan dengan bersyukur dan merangkul sesama!',
    hint: 'Sikap tidak sombong dan tetap santun kepada siapa saja.',
  },
  rewardXp: 90,
};

export const characterLeadershipLesson3: StoryLesson = {
  lessonId: 'char-lead-003',
  levelId: 307,
  title: 'Soal 3: Tertib Mengantre dengan Sabar',
  subject: 'character',
  topic: 'character_leadership',
  difficulty: 3,
  metadata: {
    ageGroup: '7-10',
    grade: 'SD Kelas 2-3',
    theme: 'Kantin Sekolah Tertib',
  },
  learningObjective: [
    'Membiasakan budaya antre di tempat umum',
    'Menghormati hak orang lain yang datang lebih dulu',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'char7_s3_1',
      title: 'Barisan Antrean di Kantin',
      background: 'market',
      narration: 'Saat jam istirahat tiba, kantin sekolah dipadati siswa yang ingin membeli susu dan roti. Budi dan Siti berdiri tertib di barisan belakang.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 440, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Mengantre dengan tertib melatih kesabaran dan menghargai teman yang sudah tiba lebih dulu!',
      },
    },
    {
      id: 'char7_s3_2',
      title: 'Budaya Bangsa yang Maju',
      background: 'market',
      narration: 'Siti tersenyum bangga. Dengan budaya mengantre, suasana kantin menjadi teratur, aman, dan tidak berdesakan.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Budaya antre adalah ciri bangsa yang beradab dan berdisiplin tinggi!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Apa yang harus kita lakukan saat hendak membeli tiket atau makanan di tempat yang ramai?',
    options: [
      { id: 'A', value: 'AntreSabar', label: 'Mengantre di Barisan Belakang dengan Tertib dan Sabar' },
      { id: 'B', value: 'SerobotDepan', label: 'Menyerobot Masuk Langsung ke Depan Barisan' },
      { id: 'C', value: 'DorongAntrean', label: 'Mendorong-dorong Orang Lain Agar Cepat Maju' },
    ],
    correctAnswer: 'A',
    explanation: 'Budaya mengantre mencerminkan keadilan, kesabaran, dan penghargaan terhadap hak sesama!',
    hint: 'Tunggu giliranmu dengan tertib di barisan.',
  },
  rewardXp: 90,
};

export const characterLeadershipLesson4: StoryLesson = {
  lessonId: 'char-lead-004',
  levelId: 307,
  title: 'Soal 4: Menghormati Orang Tua dan Guru',
  subject: 'character',
  topic: 'character_leadership',
  difficulty: 3,
  metadata: {
    ageGroup: '7-10',
    grade: 'SD Kelas 2-3',
    theme: 'Ruang Kasih Sayang Keluarga',
  },
  learningObjective: [
    'Memahami bakti dan rasa hormat kepada orang tua dan guru',
    'Menjalankan nasihat kebaikan dengan patuh dan tulus',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'char7_s4_1',
      title: 'Mencium Tangan dan Meminta Doa',
      background: 'castle',
      narration: 'Setiap pagi sebelum melangkah keluar rumah, Budi dan Siti mencium tangan ayah dan ibu meminta doa restu agar ilmu yang dipelajari berkah.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 460, y: 320 }, animation: 'walk' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Doa restu orang tua adalah pelita penerang jalan kesuksesan kita di masa depan!',
      },
    },
    {
      id: 'char7_s4_2',
      title: 'Bakti Anak Shalih',
      background: 'castle',
      narration: 'Siti mengangguk dengan mata bersinar. Guru di sekolah adalah orang tua kedua kita yang membimbing kita dengan penuh kesabaran.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Hormatilah orang tua dan gurumu, niscaya hidupmu akan dipenuhi kebahagiaan dan kemuliaan!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Bagaimanakah sikap seorang anak berbakti saat dinasihati untuk kebaikan oleh orang tua dan guru?',
    options: [
      { id: 'A', value: 'DengarPatuhi', label: 'Mendengarkan dengan Takzim, Berterima Kasih, dan Mematuhinya' },
      { id: 'B', value: 'BantahMarah', label: 'Membantah dan Menjawab dengan Nada Kasar' },
      { id: 'C', value: 'PuraPuraTuli', label: 'Berpura-pura Tuli dan Pergi Begitu Saja' },
    ],
    correctAnswer: 'A',
    explanation: 'Mendengarkan dan mematuhi nasihat orang tua serta guru adalah wujud utama anak berbakti dan berbudi luhur!',
    hint: 'Dengarkan nasihat dengan rasa hormat dan patuhi kebaikannya.',
  },
  rewardXp: 90,
};

export const characterLeadershipLesson5: StoryLesson = {
  lessonId: 'char-lead-005',
  levelId: 307,
  title: 'Soal 5: Mahkota Sahabat Teladan Berakhlak Mulia',
  subject: 'character',
  topic: 'character_leadership',
  difficulty: 3,
  metadata: {
    ageGroup: '7-10',
    grade: 'SD Kelas 2-3',
    theme: 'Ruang Mahkota Budi Pekerti',
  },
  learningObjective: [
    'Menyimpulkan seluruh nilai budi pekerti luhur (sopan santun, berbagi, bersih, sehat, jujur, toleran, dan berani)',
    'Menjadi teladan kebaikan di mana pun berada',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'char7_s5_1',
      title: 'Gerbang Istana Teladan Terbuka',
      background: 'castle',
      narration: 'Selamat! Budi dan Siti telah menyelesaikan seluruh misi petualangan budi pekerti. Cahaya kebaikan terpancar terang dari hati mereka.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 440, y: 320 }, animation: 'walk' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Menjadi pintar itu hebat, tetapi menjadi anak yang berbudi pekerti luhur dan baik hati adalah yang paling mulia!',
      },
    },
    {
      id: 'char7_s5_2',
      title: 'Janji Sahabat Kebaikan',
      background: 'castle',
      narration: 'Siti menyematkan Bintang Sahabat Teladan. Kebaikan yang kita tebarkan hari ini akan tumbuh menjadi pohon kedamaian bagi dunia.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
        { type: 'animate_character', characterId: 'budi', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Mari kita terus menebar senyuman, kejujuran, dan kasih sayang di mana pun kita berada!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Apakah bekal terpenting yang membuat seseorang dicintai oleh keluarga, sahabat, dan dihormati masyarakat?',
    options: [
      { id: 'A', value: 'AkhlakMulia', label: 'Akhlak yang Mulia, Kejujuran, dan Hati yang Penuh Kebaikan' },
      { id: 'B', value: 'SombongHarta', label: 'Sikap Sombong dan Memamerkan Harta Kekayaan' },
      { id: 'C', value: 'PaksaKekuasaan', label: 'Memaksa Orang Lain Tunduk dengan Kekerasan' },
    ],
    correctAnswer: 'A',
    explanation: 'Akhlak mulia, kejujuran, sopan santun, dan welas asih adalah bekal hidup terindah yang paling abadi dan membanggakan!',
    hint: 'Budi pekerti luhur dan hati yang menyayangi sesama.',
  },
  rewardXp: 100,
};
