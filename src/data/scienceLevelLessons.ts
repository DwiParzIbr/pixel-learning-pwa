import { CharacterDef, StoryLesson } from '@/types/story';

const budiDef: CharacterDef = {
  id: 'budi',
  name: 'Budi',
  asset: 'character_budi',
  color: '#3b82f6',
  personality: 'Penasaran, gemar meneliti, dan ramah',
  voiceProfile: { pitch: 1.45, rate: 1.05 },
};

const sitiDef: CharacterDef = {
  id: 'siti',
  name: 'Siti',
  asset: 'character_siti',
  color: '#ec4899',
  personality: 'Cinta alam, lembut, dan suka mengamati',
  voiceProfile: { pitch: 1.75, rate: 0.96 },
};

// ==========================================
// 🐾 LEVEL 1: SAHABAT HEWAN (SOAL 2-5)
// ==========================================

export const scienceAnimalsLesson2: StoryLesson = {
  lessonId: 'science-animals-002',
  levelId: 101,
  title: 'Soal 2: Ikan Berenang & Bernapas di Air',
  subject: 'science',
  topic: 'science_animals',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Kolam Air Jernih',
  },
  learningObjective: [
    'Mengenal ciri hewan yang hidup di dalam air',
    'Memahami fungsi sirip untuk berenang dan insang untuk bernapas',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'sci_anim2_1',
      title: 'Di Tepi Kolam Ikan',
      background: 'park',
      narration: 'Budi dan Siti berdiri di tepi kolam air tawar yang jernih. Ikan mas berwarna oranye keemasan berenang gesit ke sana ke mari.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 340, y: 320 }, animation: 'walk' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Lihat ikan mas itu Siti! Lincah sekali mengibaskan sirip dan ekornya di air!',
      },
    },
    {
      id: 'sci_anim2_2',
      title: 'Bernapas dengan Insang',
      background: 'park',
      narration: 'Siti menjelaskan bahwa ikan memiliki alat pernapasan istimewa bernama insang untuk menyaring udara di dalam air.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
        { type: 'animate_character', characterId: 'budi', animation: 'think' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Ikan tidak memiliki paru-paru seperti kita, melainkan bernapas dengan insang!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Alat pernapasan apakah yang digunakan oleh ikan untuk bernapas di dalam air?',
    options: [
      { id: 'A', value: 'Paru-paru', label: 'Paru-paru' },
      { id: 'B', value: 'Insang', label: 'Insang' },
      { id: 'C', value: 'Hidung', label: 'Hidung Daun' },
    ],
    correctAnswer: 'B',
    explanation: 'Ikan menggunakan insang yang berada di samping kepalanya untuk mengambil oksigen di dalam air!',
    hint: 'Alat ini terletak di sisi kepala ikan yang membuka dan menutup.',
  },
  rewardXp: 50,
};

export const scienceAnimalsLesson3: StoryLesson = {
  lessonId: 'science-animals-003',
  levelId: 101,
  title: 'Soal 3: Sahabat Herbivora Pemakan Rumput',
  subject: 'science',
  topic: 'science_animals',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Padang Rumput Hijau',
  },
  learningObjective: [
    'Mengenal hewan pemakan tumbuhan (herbivora)',
    'Mengetahui makanan utama sapi, kambing, dan kelinci',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'sci_anim3_1',
      title: 'Sapi di Padang Rumput',
      background: 'park',
      narration: 'Di padang rumput yang luas, seekor sapi gemuk dan ramah sedang mengunyah rumput hijau segar dengan lahap.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 200, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 480, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Moo! Sapi itu suka sekali memakan rumput hijau yang segar!',
      },
    },
    {
      id: 'sci_anim3_2',
      title: 'Hewan Pemakan Tumbuhan',
      background: 'park',
      narration: 'Siti memberitahu Budi bahwa hewan pemakan rumput dan dedaunan disebut sebagai hewan herbivora.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Selain sapi, kelinci dan kambing juga sahabat hewan pemakan tumbuhan!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Makanan utama apakah yang paling disukai oleh sapi dan kambing di padang rumput?',
    options: [
      { id: 'A', value: 'Daging', label: 'Daging Segar' },
      { id: 'B', value: 'Rumput', label: 'Rumput & Dedaunan Hijau' },
      { id: 'C', value: 'Ikan', label: 'Ikan Laut' },
    ],
    correctAnswer: 'B',
    explanation: 'Sapi, kambing, dan kelinci adalah hewan pemakan tumbuhan yang sangat menyukai rumput hijau!',
    hint: 'Tumbuhan hijau berdaun halus yang tumbuh melimpah di tanah padang rumput.',
  },
  rewardXp: 50,
};

export const scienceAnimalsLesson4: StoryLesson = {
  lessonId: 'science-animals-004',
  levelId: 101,
  title: 'Soal 4: Keajaiban Metamorfosis Kupu-Kupu',
  subject: 'science',
  topic: 'science_animals',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1-2',
    theme: 'Kebun Bunga Ajaib',
  },
  learningObjective: [
    'Memahami tahapan daur hidup kupu-kupu',
    'Mengetahui perubahan dari ulat, kepompong, hingga bersayap indah',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'sci_anim4_1',
      title: 'Kepompong di Dahan Pohon',
      background: 'forest',
      narration: 'Siti mengajak Budi mengamati dahan pohon rimbun. Ada sebuah kepompong kecil yang menempel dengan kuat.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'budi', position: { x: 420, y: 320 }, animation: 'surprised' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Budi, lihat kepompong ini! Dulu ia adalah seekor ulat kecil yang rajin makan daun!',
      },
    },
    {
      id: 'sci_anim4_2',
      title: 'Menjadi Kupu-kupu Cantik',
      background: 'forest',
      narration: 'Setelah beristirahat di dalam kepompong, keluarlah kupu-kupu dengan sayap warna-warni yang sangat cantik!',
      actions: [
        { type: 'animate_character', characterId: 'budi', animation: 'celebrate' },
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Hebat sekali! Ulat berubah menjadi kupu-kupu indah yang terbang bebas!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Sebelum menjadi kupu-kupu bersayap cantik yang terbang di bunga, hewan ini beristirahat dalam bentuk apa?',
    options: [
      { id: 'A', value: 'Kepompong', label: 'Kepompong (Pupa)' },
      { id: 'B', value: 'Batu', label: 'Batu Kali' },
      { id: 'C', value: 'Ikan', label: 'Ikan Kecil' },
    ],
    correctAnswer: 'A',
    explanation: 'Daur hidup kupu-kupu bermula dari telur, menetas menjadi ulat, lalu tidur di dalam kepompong sebelum menjadi kupu-kupu indah!',
    hint: 'Bentuk rumah perlindungan kecil seperti kantong sutra di dahan pohon.',
  },
  rewardXp: 50,
};

export const scienceAnimalsLesson5: StoryLesson = {
  lessonId: 'science-animals-005',
  levelId: 101,
  title: 'Soal 5: Hewan yang Berkembang Biak dengan Bertelur',
  subject: 'science',
  topic: 'science_animals',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Peternakan Sahabat',
  },
  learningObjective: [
    'Mengenal hewan ovipar yang berkembang biak dengan bertelur',
    'Membedakan hewan bertelur seperti ayam dan burung',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'sci_anim5_1',
      title: 'Kandang Ayam Pagi Hari',
      background: 'park',
      narration: 'Kukuruyuk! Ayam jantan berkokok menyambut fajar. Di dalam sarang jerami, induk ayam sedang mengerami telur-telurnya.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 500, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Lihat Siti, induk ayam sedang menjaga telur-telurnya agar tetap hangat!',
      },
    },
    {
      id: 'sci_anim5_2',
      title: 'Menetas Jadi Anak Ayam',
      background: 'park',
      narration: 'Setelah dierami dengan penuh kasih sayang, cangkang telur mulai retak dan lahirlah anak ayam berbulu kuning yang lucu.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Ciap-ciap! Anak ayam menetas dari telur yang sudah hangat!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Di antara hewan berikut, manakah hewan yang berkembang biak dengan cara BERTELUR?',
    options: [
      { id: 'A', value: 'Kucing', label: 'Kucing Rumahan' },
      { id: 'B', value: 'Ayam', label: 'Ayam & Burung' },
      { id: 'C', value: 'Sapi', label: 'Sapi Perah' },
    ],
    correctAnswer: 'B',
    explanation: 'Ayam, bebek, dan burung berkembang biak dengan bertelur, sedangkan kucing dan sapi melahirkan anak!',
    hint: 'Hewan yang memiliki paruh dan menghasilkan telur berkulit keras di sarang.',
  },
  rewardXp: 50,
};

// ==========================================
// 🌸 LEVEL 2: TANAMAN, BUNGA & POHON (SOAL 2-5)
// ==========================================

export const sciencePlantsLesson2: StoryLesson = {
  lessonId: 'science-plants-002',
  levelId: 102,
  title: 'Soal 2: Daun Hijau & Klorofil Penyerap Sinar',
  subject: 'science',
  topic: 'science_plants',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1-2',
    theme: 'Kebun Daun Asri',
  },
  learningObjective: [
    'Mengenal fungsi daun hijau sebagai pembuat makanan',
    'Memahami zat hijau daun (klorofil) yang menyerap sinar mentari',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'sci_plant2_1',
      title: 'Dedaunan Hijau Rimbun',
      background: 'park',
      narration: 'Siti memetik sehelai daun hijau yang segar. Daun-daun di pohon menangkap hangatnya sinar matahari pagi.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'budi', position: { x: 480, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Budi, daun hijau ini seperti dapur kecil bagi tanaman untuk memasak makanan!',
      },
    },
    {
      id: 'sci_plant2_2',
      title: 'Zat Hijau Daun yang Ajaib',
      background: 'park',
      narration: 'Warna hijau pada daun berasal dari zat istimewa bernama klorofil yang menyerap cahaya matahari.',
      actions: [
        { type: 'animate_character', characterId: 'budi', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Wah, luar biasa! Daun memasak makanan dengan bantuan sinar matahari!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Bagian tumbuhan manakah yang berwarna hijau dan bertugas menangkap sinar matahari untuk membuat makanan?',
    options: [
      { id: 'A', value: 'Akar', label: 'Akar di Tanah' },
      { id: 'B', value: 'Daun', label: 'Daun Hijau' },
      { id: 'C', value: 'Duri', label: 'Duri Batang' },
    ],
    correctAnswer: 'B',
    explanation: 'Daun hijau memiliki zat klorofil yang menyerap sinar matahari untuk fotosintesis (membuat makanan)!',
    hint: 'Bagian tumbuhan yang bertangkai, tipis melebar, dan berwarna hijau segar.',
  },
  rewardXp: 50,
};

export const sciencePlantsLesson3: StoryLesson = {
  lessonId: 'science-plants-003',
  levelId: 102,
  title: 'Soal 3: Buah Manis Pelindung Biji',
  subject: 'science',
  topic: 'science_plants',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Kebun Buah Mangga & Apel',
  },
  learningObjective: [
    'Mengenal buah sebagai bagian tanaman yang melindungi biji',
    'Mengetahui bahwa buah menyimpan cadangan makanan bergizi',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'sci_plant3_1',
      title: 'Pohon Buah Ranum',
      background: 'forest',
      narration: 'Di kebun paman, pohon apel berbuah lebat. Buah apel merah menggantung manis dan harum di antara ranting.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 500, y: 320 }, animation: 'walk' },
        { type: 'spawn_object', object: 'apple', quantity: 4, position: { x: 360, y: 280 } },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Nyam! Buah apel ini berdaging tebal, manis, dan segar sekali!',
      },
    },
    {
      id: 'sci_plant3_2',
      title: 'Biji di Dalam Buah',
      background: 'forest',
      narration: 'Saat Budi membelah apel, terlihat biji-biji kecil tersimpan aman di bagian tengah daging buah.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Daging buah yang manis itu melindungi biji di dalamnya agar kelak bisa tumbuh menjadi pohon baru!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Benda apakah yang tersimpan dan terlindungi dengan aman di dalam daging buah?',
    options: [
      { id: 'A', value: 'Batu', label: 'Batu Kerikil' },
      { id: 'B', value: 'Biji', label: 'Biji Calon Tanaman Baru' },
      { id: 'C', value: 'Pasir', label: 'Pasir Pantai' },
    ],
    correctAnswer: 'B',
    explanation: 'Buah bertugas membungkus dan melindungi biji. Jika biji ditanam ke tanah, ia akan tumbuh jadi pohon baru!',
    hint: 'Benda kecil di dalam buah yang bisa ditanam ke tanah menjadi tunas.',
  },
  rewardXp: 50,
};

export const sciencePlantsLesson4: StoryLesson = {
  lessonId: 'science-plants-004',
  levelId: 102,
  title: 'Soal 4: Tunas Kecambah dari Biji Kecil',
  subject: 'science',
  topic: 'science_plants',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1-2',
    theme: 'Pot Percobaan Sains',
  },
  learningObjective: [
    'Mengenal perkecambahan biji kacang hijau',
    'Mengetahui kebutuhan tanaman: air, tanah gembur, dan sinar matahari',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'sci_plant4_1',
      title: 'Menanam Biji di Dalam Pot',
      background: 'classroom',
      narration: 'Budi dan Siti meletakkan beberapa butir biji kacang hijau ke dalam pot tanah subur, lalu menyiramnya dengan air secukupnya.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 460, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Aku siram air sedikit setiap pagi dan letakkan pot di dekat jendela yang terkena matahari.',
      },
    },
    {
      id: 'sci_plant4_2',
      title: 'Tunas Hijau Muncul',
      background: 'classroom',
      narration: 'Tiga hari kemudian, kulit biji terbelah dan muncul tunas kecil berwarna hijau muda yang tumbuh ke atas!',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Hore! Biji kita sudah bertunas dan mulai memiliki daun kecil!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Dua hal penting apakah yang sangat dibutuhkan biji agar dapat berkecambah dan tumbuh subur?',
    options: [
      { id: 'A', value: 'Air-Mentari', label: 'Air Bersih & Cahaya Matahari' },
      { id: 'B', value: 'Es-Batu', label: 'Es Batu & Kegelapan' },
      { id: 'C', value: 'Minyak-Garam', label: 'Minyak Goreng & Garam' },
    ],
    correctAnswer: 'A',
    explanation: 'Biji membutuhkan air untuk membasahi tanah serta kehangatan sinar matahari untuk tumbuh menjadi tunas yang kokoh!',
    hint: 'Benda cair untuk menyiram tanah dan sinar hangat di pagi hari.',
  },
  rewardXp: 50,
};

export const sciencePlantsLesson5: StoryLesson = {
  lessonId: 'science-plants-005',
  levelId: 102,
  title: 'Soal 5: Batang Pohon yang Kokoh Menjulang',
  subject: 'science',
  topic: 'science_plants',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Hutan Pohon Rindang',
  },
  learningObjective: [
    'Mengenal fungsi batang tanaman',
    'Memahami batang sebagai penopang daun dan pengalir air ke seluruh bagian tanaman',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'sci_plant5_1',
      title: 'Berdiri di Dekat Batang Pohon Besar',
      background: 'forest',
      narration: 'Budi dan Siti berdiri di samping pohon beringin yang kokoh. Batang pohonnya besar berkayu dan menjulang tinggi ke langit.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 440, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Batang pohon ini sangat kokoh! Angin kencang pun tidak bisa merobohkannya!',
      },
    },
    {
      id: 'sci_plant5_2',
      title: 'Pipa Air Alami di Dalam Batang',
      background: 'forest',
      narration: 'Siti menerangkan bahwa di dalam batang ada saluran pipa alami untuk membawa air dari akar ke pucuk daun.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Batang berfungsi menopang ranting dan mengalirkan air dari akar ke seluruh daun!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Bagian tumbuhan manakah yang bertugas menopang daun-daun agar tegak serta menyalurkan air dari akar?',
    options: [
      { id: 'A', value: 'Batang', label: 'Batang' },
      { id: 'B', value: 'Bunga', label: 'Bunga' },
      { id: 'C', value: 'Akar', label: 'Akar Bawah' },
    ],
    correctAnswer: 'A',
    explanation: 'Batang berdiri tegak menopang cabang, ranting, dan daun serta menjadi jalan mengalirnya air dan sari makanan!',
    hint: 'Bagian tegak di atas tanah antara akar dan cabang dedaunan.',
  },
  rewardXp: 50,
};

// ==========================================
// 🌧️ LEVEL 3: RAHASIA CUACA & AIR (SOAL 2-5)
// ==========================================

export const scienceWeatherLesson2: StoryLesson = {
  lessonId: 'science-weather-002',
  levelId: 103,
  title: 'Soal 2: Lengkungan 7 Warna Pelangi Indah',
  subject: 'science',
  topic: 'science_weather',
  difficulty: 2,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1-2',
    theme: 'Taman Usai Hujan',
  },
  learningObjective: [
    'Memahami proses terbentuknya pelangi dari pembiasan sinar matahari oleh tetes air hujan',
    'Mengenal 7 warna pelangi (Me-Ji-Ku-Hi-Bi-Ni-U)',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'sci_weath2_1',
      title: 'Hujan Reda dan Matahari Tersenyum',
      background: 'park',
      narration: 'Gerimis hujan perlahan berhenti. Sinar matahari keemasan mulai menembus sisa butiran air di angkasa.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 480, y: 320 }, animation: 'surprised' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Budi, lihat ke arah langit timur! Ada lengkungan warna-warni yang sangat indah!',
      },
    },
    {
      id: 'sci_weath2_2',
      title: 'Tujuh Warna Pelangi',
      background: 'park',
      narration: 'Merah, Jingga, Kuning, Hijau, Biru, Nila, dan Ungu berpadu harmonis menghiasi cakrawala.',
      actions: [
        { type: 'animate_character', characterId: 'budi', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Pelangi muncul karena sinar matahari menyinari butir-butir air hujan yang halus!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Kapankah lengkungan indah pelangi biasanya muncul di langit?',
    options: [
      { id: 'A', value: 'TengahMalam', label: 'Saat Tengah Malam Buta' },
      { id: 'B', value: 'SetelahHujan', label: 'Setelah Hujan Reda & Ada Sinar Matahari' },
      { id: 'C', value: 'MendungGelap', label: 'Saat Langit Gelap Gulita' },
    ],
    correctAnswer: 'B',
    explanation: 'Pelangi terjadi ketika cahaya matahari dibiaskan dan diuraikan oleh butiran-butiran sisa air hujan di udara!',
    hint: 'Terjadi tepat setelah hujan selesai dan matahari mulai bersinar kembali.',
  },
  rewardXp: 60,
};

export const scienceWeatherLesson3: StoryLesson = {
  lessonId: 'science-weather-003',
  levelId: 103,
  title: 'Soal 3: Angin Sejuk Menggerakkan Benda',
  subject: 'science',
  topic: 'science_weather',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Bukit Layang-layang',
  },
  learningObjective: [
    'Memahami bahwa angin adalah udara yang bergerak',
    'Mengetahui manfaat hembusan angin untuk menerbangkan layang-layang dan memutar kincir',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'sci_weath3_1',
      title: 'Layang-layang Terbang Tinggi',
      background: 'park',
      narration: 'Di bukit berangin sejuk, Budi memegang benang layang-layang. Layang-layang ekor panjang meliuk-liuk tinggi di udara.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 500, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Hembusan anginnya terasa sejuk di kulit dan membuat layang-layangku terbang tinggi!',
      },
    },
    {
      id: 'sci_weath3_2',
      title: 'Udara yang Bergerak',
      background: 'park',
      narration: 'Siti memegang kincir angin warna-warni yang berputar kencang karena dorongan angin.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Angin tidak bisa kita lihat, tapi bisa kita rasakan gerakannya saat menerpa daun dan kincir!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Apakah sebenarnya yang dimaksud dengan "Angin" yang kita rasakan berhembus sejuk?',
    options: [
      { id: 'A', value: 'AirMengalir', label: 'Air yang Mengalir' },
      { id: 'B', value: 'UdaraBergerak', label: 'Udara yang Bergerak' },
      { id: 'C', value: 'BatuMelayang', label: 'Batu yang Melayang' },
    ],
    correctAnswer: 'B',
    explanation: 'Angin adalah udara yang bergerak dari tempat bertekanan tinggi ke tempat bertekanan lebih rendah!',
    hint: 'Sesuatu yang kita hirup setiap saat, tetapi sedang berhembus dan bergerak.',
  },
  rewardXp: 60,
};

export const scienceWeatherLesson4: StoryLesson = {
  lessonId: 'science-weather-004',
  levelId: 103,
  title: 'Soal 4: Dua Musim di Negeri Kita Tercinta',
  subject: 'science',
  topic: 'science_weather',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1-2',
    theme: 'Peta Cuaca Nusantara',
  },
  learningObjective: [
    'Mengenal dua musim di Indonesia: Musim Kemarau dan Musim Hujan',
    'Mengetahui ciri cuaca pada kedua musim tersebut',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'sci_weath4_1',
      title: 'Musim Kemarau yang Hangat',
      background: 'park',
      narration: 'Budi mengenakan topi santai. Di musim kemarau, matahari bersinar terang, langit bersih dari awan gelap, dan cuaca terasa hangat.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 460, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Musim kemarau sangat cocok untuk menjemur pakaian dan bermain di luar ruangan!',
      },
    },
    {
      id: 'sci_weath4_2',
      title: 'Musim Hujan yang Membasahi Bumi',
      background: 'park',
      narration: 'Siti membawa payung berwarna kuning cerah. Saat musim hujan tiba, air hujan menyirami bumi dan mengairi sawah para petani.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Indonesia negara tropis yang indah dengan dua musim: musim kemarau dan musim hujan!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Indonesia memiliki 2 musim utama sepanjang tahun. Musim apakah keduanya?',
    options: [
      { id: 'A', value: 'SaljuGugur', label: 'Musim Salju & Musim Gugur' },
      { id: 'B', value: 'HujanKemarau', label: 'Musim Hujan & Musim Kemarau' },
      { id: 'C', value: 'BekuPanas', label: 'Musim Es Beku & Musim Badai' },
    ],
    correctAnswer: 'B',
    explanation: 'Sebagai negara kepulauan beriklim tropis, Indonesia memiliki dua musim yaitu Musim Hujan dan Musim Kemarau!',
    hint: 'Satu musim basah banyak hujan, dan satu musim kering banyak terik matahari.',
  },
  rewardXp: 60,
};

export const scienceWeatherLesson5: StoryLesson = {
  lessonId: 'science-weather-005',
  levelId: 103,
  title: 'Soal 5: Siklus Perjalanan Air Bersih di Bumi',
  subject: 'science',
  topic: 'science_weather',
  difficulty: 2,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 2',
    theme: 'Danau & Aliran Sungai',
  },
  learningObjective: [
    'Memahami siklus hidrologi sederhana (penguapan, kondensasi, presipitasi)',
    'Menghargai pentingnya menjaga kebersihan sumber air di alam',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'sci_weath5_1',
      title: 'Air Danau yang Menguap',
      background: 'forest',
      narration: 'Sinar matahari menghangatkan permukaan air danau. Air berubah menjadi uap air yang tak terlihat lalu naik ke angkasa.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 440, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Air danau menguap ke langit karena panas mentari, lalu berkumpul menjadi awan!',
      },
    },
    {
      id: 'sci_weath5_2',
      title: 'Kembali Mengalir ke Sungai',
      background: 'forest',
      narration: 'Awan yang sarat air menurunkan hujan ke pegunungan. Air mengalir ke sungai dan kembali lagi ke danau serta laut.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Ini disebut siklus air yang berputar terus-menerus memberikan kehidupan bagi bumi!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Peristiwa air di permukaan bumi menguap ke udara karena panas matahari disebut apa?',
    options: [
      { id: 'A', value: 'Penguapan', label: 'Penguapan (Evaporasi)' },
      { id: 'B', value: 'Pembekuan', label: 'Pembekuan Menjadi Es' },
      { id: 'C', value: 'Peleburan', label: 'Peleburan Logam' },
    ],
    correctAnswer: 'A',
    explanation: 'Panas matahari menyebabkan air di danau, sungai, dan laut menguap naik ke atmosfer membentuk awan!',
    hint: 'Proses air berubah menjadi uap air yang membubung ke atas langit.',
  },
  rewardXp: 60,
};

// ==========================================
// ☀️ LEVEL 4: TATA SURYA & ANGKASA (SOAL 2-5)
// ==========================================

export const scienceSpaceLesson2: StoryLesson = {
  lessonId: 'science-space-002',
  levelId: 104,
  title: 'Soal 2: Bulan Purnama yang Bersinar Lembut',
  subject: 'science',
  topic: 'science_space',
  difficulty: 2,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1-2',
    theme: 'Menara Langit Malam',
  },
  learningObjective: [
    'Mengenal bulan sebagai satelit alami bumi',
    'Memahami bahwa cahaya bulan berasal dari pantulan sinar matahari',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'sci_space2_1',
      title: 'Bulan Purnama Bulat Bersinar',
      background: 'castle',
      narration: 'Malam ini bulan purnama berbentuk bulat sempurna dan bersinar putih keperakan menerangi pekarangan kastil.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'budi', position: { x: 480, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Bulan purnama malam ini bundar terang sekali seperti lampu raksasa di langit!',
      },
    },
    {
      id: 'sci_space2_2',
      title: 'Pantulan Sinar Matahari',
      background: 'castle',
      narration: 'Budi memberitahu Siti bahwa bulan tidak memancarkan cahaya sendiri, melainkan memantulkan cahaya dari matahari.',
      actions: [
        { type: 'animate_character', characterId: 'budi', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Bulan seperti cermin raksasa yang memantulkan sinar mentari ke bumi kita!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Dari manakah asal kilauan cahaya terang bulan yang menyinari malam hari?',
    options: [
      { id: 'A', value: 'LampuBulan', label: 'Lampu di Dalam Bulan' },
      { id: 'B', value: 'PantulanMatahari', label: 'Pantulan Cahaya Matahari' },
      { id: 'C', value: 'ApiBatu', label: 'Batu Bulan yang Terbakar' },
    ],
    correctAnswer: 'B',
    explanation: 'Bulan tidak menghasilkan cahaya sendiri; permukaannya memantulkan cahaya terang dari matahari ke arah bumi!',
    hint: 'Cahaya itu dipantulkan seperti bayangan di cermin dari sumber matahari.',
  },
  rewardXp: 70,
};

export const scienceSpaceLesson3: StoryLesson = {
  lessonId: 'science-space-003',
  levelId: 104,
  title: 'Soal 3: Rahasia Pergantian Siang dan Malam',
  subject: 'science',
  topic: 'science_space',
  difficulty: 2,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 2',
    theme: 'Laboratorium Astronomi',
  },
  learningObjective: [
    'Memahami rotasi bumi pada porosnya',
    'Mengetahui bahwa bagian bumi yang menghadap matahari mengalami siang hari',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'sci_space3_1',
      title: 'Bola Dunia Berputar',
      background: 'classroom',
      narration: 'Di dalam kelas pintar, Budi dan Siti mengamati globe (bola dunia). Budi memutar bola dunia di hadapan lampu senter.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 420, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Lihat, sisi bola dunia yang terkena lampu menjadi terang benderang!',
      },
    },
    {
      id: 'sci_space3_2',
      title: 'Sisi Terang dan Gelap',
      background: 'classroom',
      narration: 'Bagian yang terkena cahaya matahari mengalami siang, sedangkan bagian di belakangnya yang gelap mengalami malam hari.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Bumi berputar terus sepanjang hari, itulah sebabnya ada pergantian siang dan malam!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Apakah yang menyebabkan terjadinya pergantian siang dan malam di bumi kita?',
    options: [
      { id: 'A', value: 'BumiBerputar', label: 'Bumi Berputar pada Porosnya (Rotasi)' },
      { id: 'B', value: 'AwanTutup', label: 'Awan Menutupi Langit' },
      { id: 'C', value: 'MatahariTidur', label: 'Matahari Pergi Beristirahat' },
    ],
    correctAnswer: 'A',
    explanation: 'Bumi kita berputar pada porosnya setiap 24 jam. Bagian yang menghadap matahari menjadi siang, dan bagian yang membelakangi menjadi malam!',
    hint: 'Bumi berputar seperti gasing di luar angkasa.',
  },
  rewardXp: 70,
};

export const scienceSpaceLesson4: StoryLesson = {
  lessonId: 'science-space-004',
  levelId: 104,
  title: 'Soal 4: Planet Bumi: Rumah Biru Kehidupan',
  subject: 'science',
  topic: 'science_space',
  difficulty: 2,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1-2',
    theme: 'Teleskop Bintang Antariksa',
  },
  learningObjective: [
    'Mengenal planet Bumi sebagai planet ketiga dari matahari',
    'Mengetahui bahwa lautan dan atmosfer menjadikan bumi tempat hidup yang nyaman',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'sci_space4_1',
      title: 'Memandang Planet Bumi dari Angkasa',
      background: 'castle',
      narration: 'Dari gambar teleskop antariksa, planet Bumi tampak seperti kelereng biru berkilauan yang diselimuti awan putih halus.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 500, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Planet Bumi sangat indah! Warna birunya berasal dari lautan luas yang melimpah!',
      },
    },
    {
      id: 'sci_space4_2',
      title: 'Rumah Bagi Makhluk Hidup',
      background: 'castle',
      narration: 'Bumi memiliki udara bersih untuk bernapas serta suhu yang pas bagi manusia, hewan, dan tanaman untuk tumbuh bersama.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Bumi adalah rumah kita yang paling istimewa. Mari kita jaga selalu kebersihannya!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Mengapa planet Bumi kita tampak berwarna dominan BIRU jika dilihat dari luar angkasa?',
    options: [
      { id: 'A', value: 'LautanLuas', label: 'Karena Sebagian Besar Permukaannya Air Laut' },
      { id: 'B', value: 'CatBiru', label: 'Karena Dilapisi Kaca Biru' },
      { id: 'C', value: 'BatuBiru', label: 'Batuannya Berwarna Biru Safir' },
    ],
    correctAnswer: 'A',
    explanation: 'Sekitar 70% permukaan bumi ditutupi oleh air lautan yang luas, sehingga bumi dijuluki sebagai Planet Biru!',
    hint: 'Permukaan bumi kita dipenuhi oleh hamparan samudra dan air laut.',
  },
  rewardXp: 70,
};

export const scienceSpaceLesson5: StoryLesson = {
  lessonId: 'science-space-005',
  levelId: 104,
  title: 'Soal 5: Roket Antariksa & Misi Astronot Cilik',
  subject: 'science',
  topic: 'science_space',
  difficulty: 2,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 2',
    theme: 'Pangkalan Peluncuran Roket',
  },
  learningObjective: [
    'Mengenal kendaraan penjelajah angkasa luar (roket antariksa)',
    'Mengetahui peran astronot yang memakai pakaian khusus antariksa',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'sci_space5_1',
      title: 'Hitung Mundur Peluncuran',
      background: 'castle',
      narration: 'Tiga, dua, satu, meluncur! Roket antariksa menyemburkan api pendorong yang kuat dan melesat menembus atmosfer menuju ruang hampa udara.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 240, y: 320 }, animation: 'celebrate' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 440, y: 320 }, animation: 'walk' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Wuuush! Roket melesat kencang membawa penjelajah antariksa menuju stasiun luar angkasa!',
      },
    },
    {
      id: 'sci_space5_2',
      title: 'Baju Astronot Penjelajah',
      background: 'castle',
      narration: 'Para astronot mengenakan helm dan baju khusus yang menyediakan oksigen dan menjaga tubuh dari suhu ekstrem ruang angkasa.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Di luar angkasa tidak ada udara untuk bernapas, jadi baju astronot sangat berjasa melindungi mereka!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Siapakah sebutan bagi para penjelajah pemberani yang terbang dan bertugas meneliti di luar angkasa?',
    options: [
      { id: 'A', value: 'Pelaut', label: 'Pelaut Samudra' },
      { id: 'B', value: 'Astronot', label: 'Astronot (Kosmonot)' },
      { id: 'C', value: 'Petani', label: 'Petani Kebun' },
    ],
    correctAnswer: 'B',
    explanation: 'Astronot adalah orang yang terlatih khusus untuk bepergian dan melakukan penelitian ilmiah di stasiun luar angkasa!',
    hint: 'Penjelajah yang memakai baju putih dengan helm tabung kaca di angkasa.',
  },
  rewardXp: 70,
};

// ==========================================
// 👁️ LEVEL 5: PANCA INDRA & TUBUH SEHAT (SOAL 1-5)
// ==========================================

export const scienceSensoryLesson1: StoryLesson = {
  lessonId: 'science-sensory-001',
  levelId: 105,
  title: 'Soal 1: Mata Cemerlang untuk Melihat Dunia',
  subject: 'science',
  topic: 'science_nature',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Taman Bunga Warna-Warni',
  },
  learningObjective: [
    'Mengenal mata sebagai indra penglihatan',
    'Mengetahui cara merawat kesehatan mata dengan membaca di tempat terang',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'sci_sens1_1',
      title: 'Melihat Warna-warni Bunga',
      background: 'park',
      narration: 'Budi dan Siti berjalan di taman bunga. Mata mereka yang jeli dapat melihat aneka warna kelopak: merah, kuning, ungu, dan jingga.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 480, y: 320 }, animation: 'happy' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Dengan kedua mataku, aku bisa melihat indahnya bunga dan membaca buku-buku pelajaran yang seru!',
      },
    },
    {
      id: 'sci_sens1_2',
      title: 'Menjaga Kesehatan Mata',
      background: 'park',
      narration: 'Siti mengingatkan Budi agar tidak membaca di tempat remang-remang atau melihat layar gawai terlalu dekat.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Mata adalah karunia berharga, mari kita rawat dengan makan sayur wortel yang bergizi!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Anggota tubuh manakah yang berfungsi sebagai INDRA PENGLIHATAN untuk membaca dan melihat pemandangan?',
    options: [
      { id: 'A', value: 'Mata', label: 'Kedua Mata' },
      { id: 'B', value: 'Hidung', label: 'Hidung' },
      { id: 'C', value: 'Lidah', label: 'Lidah' },
    ],
    correctAnswer: 'A',
    explanation: 'Kedua mata adalah indra penglihatan yang membantu kita menangkap cahaya dan melihat benda di sekitar kita!',
    hint: 'Bagian wajah yang bisa berkedip dan memiliki bola mata.',
  },
  rewardXp: 50,
};

export const scienceSensoryLesson2: StoryLesson = {
  lessonId: 'science-sensory-002',
  levelId: 105,
  title: 'Soal 2: Telinga Tajam Mendengar Suara',
  subject: 'science',
  topic: 'science_nature',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Pohon Kicau Burung',
  },
  learningObjective: [
    'Mengenal telinga sebagai indra pendengaran',
    'Mengetahui bahwa telinga menangkap getaran gelombang bunyi',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'sci_sens2_1',
      title: 'Kicauan Burung Merdu',
      background: 'forest',
      narration: 'Kicau burung pipit terdengar riang dari pucuk pohon. Budi menoleh ke arah sumber suara dengan tersenyum.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 440, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Ssst, dengarkan! Telingaku menangkap suara kicauan burung yang sangat merdu!',
      },
    },
    {
      id: 'sci_sens2_2',
      title: 'Indra Pendengaran yang Menjaga Kita',
      background: 'forest',
      narration: 'Telinga juga memberi tahu kita bila ada suara klakson sepeda atau panggilan dari orang tua dan sahabat.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Telinga menangkap getaran suara agar kita bisa mengerti ucapan orang lain dan menikmati alunan musik!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Organ apakah yang bertugas sebagai INDRA PENDENGARAN untuk mendengar musik dan nasehat guru?',
    options: [
      { id: 'A', value: 'Telinga', label: 'Telinga' },
      { id: 'B', value: 'Kaki', label: 'Kaki' },
      { id: 'C', value: 'Gigi', label: 'Gigi' },
    ],
    correctAnswer: 'A',
    explanation: 'Telinga adalah indra pendengaran yang mendeteksi gelombang bunyi di udara sehingga kita bisa mendengar!',
    hint: 'Terletak di sisi kiri dan kanan kepala kita dengan daun telinga.',
  },
  rewardXp: 50,
};

export const scienceSensoryLesson3: StoryLesson = {
  lessonId: 'science-sensory-003',
  levelId: 105,
  title: 'Soal 3: Hidung Pintar Pencium Aroma',
  subject: 'science',
  topic: 'science_nature',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Toko Roti & Kebun Melati',
  },
  learningObjective: [
    'Mengenal hidung sebagai indra penciuman (pembau)',
    'Memahami fungsi hidung untuk bernapas dan membedakan aroma wangi serta busuk',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'sci_sens3_1',
      title: 'Wangi Kue Panggang Hangat',
      background: 'market',
      narration: 'Saat melewati toko roti, aroma roti manis mentega yang baru dipanggang semerbak di udara. Budi menghirup napas dalam-dalam.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 460, y: 320 }, animation: 'happy' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Hmmm harum sekali! Hidungku mencium aroma roti cokelat manis yang baru matang!',
      },
    },
    {
      id: 'sci_sens3_2',
      title: 'Pencium Aroma & Saluran Udara',
      background: 'market',
      narration: 'Siti menjelaskan bahwa di dalam rongga hidung terdapat serabut saraf khusus yang mengenali ribuan jenis bau.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Hidung juga menyaring debu agar udara yang masuk ke paru-paru tetap bersih dan segar!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Indra apakah yang kita gunakan untuk mencium wangi bunga melati dan aroma harum kue?',
    options: [
      { id: 'A', value: 'Hidung', label: 'Hidung' },
      { id: 'B', value: 'Lutut', label: 'Lutut Kaki' },
      { id: 'C', value: 'Siku', label: 'Siku Tangan' },
    ],
    correctAnswer: 'A',
    explanation: 'Hidung bertindak sebagai indra penciuman (pembau) sekaligus pintu masuk udara pernapasan!',
    hint: 'Terletak di tengah-tengah wajah kita dengan dua lubang udara.',
  },
  rewardXp: 50,
};

export const scienceSensoryLesson4: StoryLesson = {
  lessonId: 'science-sensory-004',
  levelId: 105,
  title: 'Soal 4: Lidah Pengecap Aneka Rasa',
  subject: 'science',
  topic: 'science_nature',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1-2',
    theme: 'Meja Cicip Rasa',
  },
  learningObjective: [
    'Mengenal lidah sebagai indra pengecap',
    'Membedakan 4 rasa dasar: manis, asin, asam, dan pahit',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'sci_sens4_1',
      title: 'Mencicipi Buah Jeruk dan Madu',
      background: 'market',
      narration: 'Siti mencicipi sesendok madu lebah yang manis, lalu mencicipi setetes air jeruk nipis yang terasa segar asam.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'budi', position: { x: 480, y: 320 }, animation: 'surprised' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Madu rasanya manis sekali! Tapi kalau jeruk nipis terasa asam segar di lidah!',
      },
    },
    {
      id: 'sci_sens4_2',
      title: 'Bintil Pengecap pada Lidah',
      background: 'market',
      narration: 'Budi memberitahu bahwa di permukaan lidah ada bintil-bintil papila yang bertugas membedakan aneka rasa makanan.',
      actions: [
        { type: 'animate_character', characterId: 'budi', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Lidah membantu kita menikmati makanan lezat dan membedakan rasa manis, asin, asam, serta pahit!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Bagian tubuh manakah di dalam mulut yang berfungsi sebagai INDRA PENGECAP rasa makanan?',
    options: [
      { id: 'A', value: 'Lidah', label: 'Lidah' },
      { id: 'B', value: 'Rambut', label: 'Rambut' },
      { id: 'C', value: 'Kuku', label: 'Kuku Jari' },
    ],
    correctAnswer: 'A',
    explanation: 'Lidah memiliki papila perasa yang dapat mengenali rasa manis, asin, asam, dan pahit pada setiap makanan!',
    hint: 'Organ lentur di dalam mulut yang juga membantu kita berbicara.',
  },
  rewardXp: 50,
};

export const scienceSensoryLesson5: StoryLesson = {
  lessonId: 'science-sensory-005',
  levelId: 105,
  title: 'Soal 5: Kulit Halus sebagai Indra Peraba',
  subject: 'science',
  topic: 'science_nature',
  difficulty: 1,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 1',
    theme: 'Taman Kucing Lucu',
  },
  learningObjective: [
    'Mengenal kulit sebagai indra peraba',
    'Membedakan tekstur halus, kasar, panas, dan dingin',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'sci_sens5_1',
      title: 'Mengelus Bulu Kucing Halus',
      background: 'park',
      narration: 'Seekor anak kucing berbulu putih mendekat. Siti dengan lembut mengelus bulu kucing yang terasa sangat lembut dan halus di telapak tangannya.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'budi', position: { x: 480, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Bulu anak kucing ini sangat lembut! Telapak tanganku bisa merasakannya dengan jelas.',
      },
    },
    {
      id: 'sci_sens5_2',
      title: 'Meraba Batu Kasar',
      background: 'park',
      narration: 'Budi menyentuh permukaan batu sungai yang bergerigi dan kasar. Kulit tangan langsung mengirim sinyal tekstur benda tersebut ke otak.',
      actions: [
        { type: 'animate_character', characterId: 'budi', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Kulit kita hebat ya! Bisa membedakan benda halus, kasar, hangat, dan dingin saat disentuh!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Indra apakah yang membungkus seluruh tubuh kita dan bertugas sebagai INDRA PERABA?',
    options: [
      { id: 'A', value: 'Kulit', label: 'Kulit' },
      { id: 'B', value: 'Tulang', label: 'Tulang Belakang' },
      { id: 'C', value: 'Kuku', label: 'Kuku Tangan' },
    ],
    correctAnswer: 'A',
    explanation: 'Kulit adalah indra peraba terluas di tubuh kita yang mampu merasakan sentuhan, tekstur halus atau kasar, serta suhu panas dan dingin!',
    hint: 'Lapisan luar tubuh yang melindungi daging dan otot kita.',
  },
  rewardXp: 50,
};

// ==========================================
// 🧊 LEVEL 6: BENDA & WUJUD ZAT (SOAL 1-5)
// ==========================================

export const scienceMatterLesson1: StoryLesson = {
  lessonId: 'science-matter-001',
  levelId: 106,
  title: 'Soal 1: Benda Padat Bentuknya Tetap Kokoh',
  subject: 'science',
  topic: 'science_nature',
  difficulty: 2,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 2',
    theme: 'Meja Belajar Kayu',
  },
  learningObjective: [
    'Mengenal sifat-sifat benda padat',
    'Mengetahui bahwa bentuk dan ukuran benda padat tidak berubah saat dipindahkan',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'sci_matt1_1',
      title: 'Memindahkan Pensil dan Buku',
      background: 'classroom',
      narration: 'Budi meletakkan pensil kayunya ke dalam kotak pensil, lalu memindahkannya ke atas meja. Bentuk pensil tetap lurus dan tidak berubah.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 460, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Batu, pensil, dan buku ini bentuknya tetap sama di mana pun diletakkan!',
      },
    },
    {
      id: 'sci_matt1_2',
      title: 'Ciri Khas Benda Padat',
      background: 'classroom',
      narration: 'Siti tersenyum dan menjelaskan bahwa itulah sifat utama benda padat: bentuk dan ukurannya tetap tidak berubah.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Benda padat partikelnya rapat dan terikat kuat, sehingga bentuknya kokoh dan tetap!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Di antara pilihan benda berikut, manakah yang merupakan contoh BENDA PADAT?',
    options: [
      { id: 'A', value: 'BatuBuku', label: 'Batu Kerikil & Buku Tulis' },
      { id: 'B', value: 'AirKran', label: 'Air Kran Mengalir' },
      { id: 'C', value: 'AsapApi', label: 'Asap Kebakaran' },
    ],
    correctAnswer: 'A',
    explanation: 'Batu, meja, dan buku adalah benda padat yang bentuk dan ukurannya selalu tetap saat dipindahkan!',
    hint: 'Benda yang bisa dipegang kokoh dan tidak tumpah seperti air.',
  },
  rewardXp: 60,
};

export const scienceMatterLesson2: StoryLesson = {
  lessonId: 'science-matter-002',
  levelId: 106,
  title: 'Soal 2: Benda Cair Mengalir & Mengikuti Wadah',
  subject: 'science',
  topic: 'science_nature',
  difficulty: 2,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 2',
    theme: 'Dapur Jus Buah Segar',
  },
  learningObjective: [
    'Mengenal sifat-sifat benda cair',
    'Mengetahui bahwa benda cair mengalir dari tempat tinggi ke rendah dan bentuknya berubah sesuai wadah',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'sci_matt2_1',
      title: 'Menuang Air ke Dalam Gelas',
      background: 'classroom',
      narration: 'Siti menuang air minum dari teko ke dalam gelas bundar. Bentuk air yang tadinya seperti teko berubah menjadi bundar mengikuti bentuk gelas.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'budi', position: { x: 480, y: 320 }, animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Lihat Budi, saat kutuang ke mangkuk, air ini berubah bentuk menjadi seperti mangkuk!',
      },
    },
    {
      id: 'sci_matt2_2',
      title: 'Sifat Air yang Mengalir',
      background: 'classroom',
      narration: 'Air dan sirup adalah benda cair. Permukaannya selalu tenang mendatar dan mengalir ke tempat yang lebih rendah.',
      actions: [
        { type: 'animate_character', characterId: 'budi', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Benda cair sangat fleksibel, bentuknya selalu menyesuaikan wadah tempatnya berada!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Bagaimanakah bentuk air jika dituangkan dari botol ke dalam sebuah mangkuk lebar?',
    options: [
      { id: 'A', value: 'TetapBotol', label: 'Bentuknya Tetap Seperti Botol Tinggi' },
      { id: 'B', value: 'IkutiMangkuk', label: 'Berubah Mengikuti Bentuk Mangkuk' },
      { id: 'C', value: 'JadiKotak', label: 'Otomatis Berubah Jadi Kotak Dadu' },
    ],
    correctAnswer: 'B',
    explanation: 'Benda cair memiliki sifat berubah bentuk mengikuti bentuk wadah yang ditempatinya!',
    hint: 'Benda cair akan mengisi dan menyesuaikan diri dengan bentuk mangkuk.',
  },
  rewardXp: 60,
};

export const scienceMatterLesson3: StoryLesson = {
  lessonId: 'science-matter-003',
  levelId: 106,
  title: 'Soal 3: Udara Gas yang Mengisi Balon',
  subject: 'science',
  topic: 'science_nature',
  difficulty: 2,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 2',
    theme: 'Taman Festival Balon',
  },
  learningObjective: [
    'Mengenal sifat benda gas',
    'Mengetahui bahwa gas mengisi seluruh ruangan wadah dan tidak dapat dilihat langsung',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'sci_matt3_1',
      title: 'Meniup Balon Karet',
      background: 'park',
      narration: 'Budi meniup sebutir balon karet merah. Udara dari paru-paru Budi masuk ke dalam balon sehingga balon mengembang bulat besar.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 440, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Fuuuh! Balon ini mengembang besar karena terisi oleh udara gas di dalamnya!',
      },
    },
    {
      id: 'sci_matt3_2',
      title: 'Gas Mengisi Seluruh Ruangan',
      background: 'park',
      narration: 'Siti menambahkan bahwa gas tidak memiliki bentuk dan volume tetap; gas akan menyebar mengisi seluruh ruang yang ada.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Udara yang kita hirup adalah benda gas yang sangat penting untuk pernapasan kita!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Wujud zat apakah yang mengisi balon saat ditiup hingga mengembang besar?',
    options: [
      { id: 'A', value: 'Gas', label: 'Benda Gas (Udara)' },
      { id: 'B', value: 'Padat', label: 'Batu Padat' },
      { id: 'C', value: 'Besi', label: 'Serpihan Besi' },
    ],
    correctAnswer: 'A',
    explanation: 'Udara adalah benda gas yang mengisi seluruh ruang di dalam balon sehingga balon mengembang menggelembung!',
    hint: 'Zat tak kasat mata yang kita hirup untuk bernapas.',
  },
  rewardXp: 60,
};

export const scienceMatterLesson4: StoryLesson = {
  lessonId: 'science-matter-004',
  levelId: 106,
  title: 'Soal 4: Es Batu Mencair Terkena Panas Mentari',
  subject: 'science',
  topic: 'science_nature',
  difficulty: 2,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 2',
    theme: 'Meja Sains di Kebun',
  },
  learningObjective: [
    'Memahami perubahan wujud zat dari padat ke cair (mencair / meleleh)',
    'Mengetahui pengaruh suhu panas terhadap es batu',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'sci_matt4_1',
      title: 'Es Batu di Bawah Terik Mentari',
      background: 'park',
      narration: 'Budi meletakkan potongan es batu dingin di atas piring di bawah sinar matahari. Beberapa menit kemudian, es mulai mengeluarkan tetesan air.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 480, y: 320 }, animation: 'surprised' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Lihat es batuku, Siti! Lama-lama mengecil dan berubah menjadi genangan air!',
      },
    },
    {
      id: 'sci_matt4_2',
      title: 'Peristiwa Mencair yang Ajaib',
      background: 'park',
      narration: 'Siti tersenyum menjelaskan bahwa es batu padat mencair menjadi air cair karena menyerap energi panas dari udara sekitar.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Perubahan dari benda padat menjadi cair ini disebut peristiwa mencair atau meleleh!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Perubahan wujud es batu padat menjadi air cair akibat terkena panas disebut peristiwa apa?',
    options: [
      { id: 'A', value: 'Mencair', label: 'Mencair (Meleleh)' },
      { id: 'B', value: 'Membeku', label: 'Membeku' },
      { id: 'C', value: 'Menguap', label: 'Menyublim Batu' },
    ],
    correctAnswer: 'A',
    explanation: 'Peristiwa perubahan wujud zat dari padat menjadi cair karena menerima panas disebut mencair atau meleleh!',
    hint: 'Seperti es krim yang lumer saat dibiarkan di tempat panas.',
  },
  rewardXp: 60,
};

export const scienceMatterLesson5: StoryLesson = {
  lessonId: 'science-matter-005',
  levelId: 106,
  title: 'Soal 5: Benda Terapung dan Benda Tenggelam',
  subject: 'science',
  topic: 'science_nature',
  difficulty: 2,
  metadata: {
    ageGroup: '6-8',
    grade: 'SD Kelas 2',
    theme: 'Kolam Eksperimen Air',
  },
  learningObjective: [
    'Membedakan benda yang mengapung dan yang tenggelam di air',
    'Memahami pengaruh massa jenis benda terhadap air',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'sci_matt5_1',
      title: 'Percobaan di Baskom Air',
      background: 'classroom',
      narration: 'Siti memasukkan sebutir batu kerikil dan sehelai daun kering ke dalam baskom berisi air jernih.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'budi', position: { x: 440, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Batu kerikil langsung meluncur ke dasar baskom, tapi daun kering tetap mengambang di atas!',
      },
    },
    {
      id: 'sci_matt5_2',
      title: 'Terapung dan Tenggelam',
      background: 'classroom',
      narration: 'Budi mencatat bahwa benda ringan seperti daun dan gabus terapung, sedangkan benda padat berat seperti batu tenggelam.',
      actions: [
        { type: 'animate_character', characterId: 'budi', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Hebat! Daun mengapung di permukaan air, sedangkan batu tenggelam ke dasar!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Di antara benda berikut, manakah benda yang akan TERAPUNG di atas permukaan air?',
    options: [
      { id: 'A', value: 'Batu', label: 'Batu Kali Berat' },
      { id: 'B', value: 'Daun', label: 'Daun Kering Ringan' },
      { id: 'C', value: 'Paku', label: 'Paku Besi Logam' },
    ],
    correctAnswer: 'B',
    explanation: 'Daun kering memiliki massa jenis lebih kecil daripada air sehingga ia mengapung tenang di atas permukaan air!',
    hint: 'Benda yang tipis, ringan, dan tidak tenggelam saat jatuh ke sungai.',
  },
  rewardXp: 60,
};

// ==========================================
// 🧲 LEVEL 7: ENERGI, CAHAYA & MAGNET (SOAL 1-5)
// ==========================================

export const scienceEnergyLesson1: StoryLesson = {
  lessonId: 'science-energy-001',
  levelId: 107,
  title: 'Soal 1: Tarikan Ajaib Batang Magnet',
  subject: 'science',
  topic: 'science_nature',
  difficulty: 3,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2-3',
    theme: 'Laboratorium Magnet Ajaib',
  },
  learningObjective: [
    'Mengenal gaya tarik magnet terhadap benda logam besi',
    'Membedakan benda magnetis (penjepit kertas, paku) dan non-magnetis (plastik, kayu)',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'sci_ener1_1',
      title: 'Mendekatkan Magnet ke Penjepit Kertas',
      background: 'classroom',
      narration: 'Budi memegang magnet batang berwarna merah dan biru. Saat didekatkan ke penjepit kertas dari logam besi, penjepit kertas langsung melompat menempel!',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 480, y: 320 }, animation: 'surprised' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Klip! Penjepit kertas besi ini langsung tertarik kuat menempel pada magnetku!',
      },
    },
    {
      id: 'sci_ener1_2',
      title: 'Benda yang Tidak Menempel',
      background: 'classroom',
      narration: 'Siti mencoba mendekatkan magnet ke penghapus karet dan penggaris plastik, namun tidak ada tarikan sama sekali.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Magnet hanya menarik benda yang terbuat dari bahan logam tertentu seperti besi dan baja!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Benda manakah yang DAPAT DITARIK menempel dengan kuat oleh magnet batang?',
    options: [
      { id: 'A', value: 'PakuBesi', label: 'Paku & Penjepit Kertas Besi' },
      { id: 'B', value: 'Penghapus', label: 'Penghapus Karet' },
      { id: 'C', value: 'Kayu', label: 'Ranting Kayu Kering' },
    ],
    correctAnswer: 'A',
    explanation: 'Magnet memiliki gaya tarik terhadap benda-benda feromagnetik seperti paku besi dan penjepit kertas logam!',
    hint: 'Benda logam berwarna perak yang keras dan terbuat dari besi.',
  },
  rewardXp: 70,
};

export const scienceEnergyLesson2: StoryLesson = {
  lessonId: 'science-energy-002',
  levelId: 107,
  title: 'Soal 2: Sumber Cahaya Penerang Kegelapan',
  subject: 'science',
  topic: 'science_nature',
  difficulty: 3,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2-3',
    theme: 'Lorong Kastil Remang',
  },
  learningObjective: [
    'Mengenal aneka sumber cahaya di alam dan buatan manusia',
    'Mengetahui bahwa cahaya merambat lurus menerangi ruangan',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'sci_ener2_1',
      title: 'Menyalakan Senter di Lorong Gelap',
      background: 'castle',
      narration: 'Saat melintasi lorong kastil yang gelap, Budi menyalakan senter sakunya. Berkas cahaya terang lurus memancar ke depan membuka jalan.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 460, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Klik! Lampu senter ini menjadi sumber cahaya sehingga lorong gelap jadi terlihat jelas!',
      },
    },
    {
      id: 'sci_ener2_2',
      title: 'Sumber Cahaya Terbesar di Alam',
      background: 'castle',
      narration: 'Siti menambahkan bahwa matahari adalah sumber energi cahaya terbesar dan utama bagi seluruh kehidupan di bumi.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Tanpa cahaya, dunia kita akan gelap gulita dan mata kita tidak bisa melihat benda apa pun!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Benda apakah yang menjadi SUMBER CAHAYA TERBESAR dan alami bagi bumi di siang hari?',
    options: [
      { id: 'A', value: 'Lilin', label: 'Lilin Kecil' },
      { id: 'B', value: 'Matahari', label: 'Matahari' },
      { id: 'C', value: 'Senter', label: 'Lampu Senter' },
    ],
    correctAnswer: 'B',
    explanation: 'Matahari adalah sumber cahaya dan panas alami terbesar yang menerangi seluruh permukaan bumi!',
    hint: 'Bintang raksasa di langit yang menyinari kita setiap pagi hingga sore.',
  },
  rewardXp: 70,
};

export const scienceEnergyLesson3: StoryLesson = {
  lessonId: 'science-energy-003',
  levelId: 107,
  title: 'Soal 3: Rahasia Bayangan Gelap Terbentuk',
  subject: 'science',
  topic: 'science_nature',
  difficulty: 3,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2-3',
    theme: 'Panggung Wayang Bayangan',
  },
  learningObjective: [
    'Memahami bagaimana bayangan terbentuk',
    'Mengetahui bahwa bayangan terjadi saat cahaya terhalang benda gelap',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'sci_ener3_1',
      title: 'Bayangan Tubuh di Lantai Kastil',
      background: 'castle',
      narration: 'Sinar obor di dinding kastil menyinari punggung Siti. Di depan Siti di lantai, tampak bayangan hitam yang mengikuti gerakannya.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'budi', position: { x: 460, y: 320 }, animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Lihat Budi, saat tanganku membentuk sayap burung, bayanganku di dinding juga seperti burung terbang!',
      },
    },
    {
      id: 'sci_ener3_2',
      title: 'Cahaya yang Terhalang Benda',
      background: 'castle',
      narration: 'Budi menerangkan bahwa cahaya merambat lurus. Ketika terhalang tubuh kita yang tidak tembus cahaya, maka terbentuklah bayangan di belakangnya.',
      actions: [
        { type: 'animate_character', characterId: 'budi', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Bayangan muncul karena cahaya terhalang oleh benda yang tidak tembus cahaya!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Mengapa bayangan hitam dapat terbentuk di lantai saat tubuh kita disinari lampu?',
    options: [
      { id: 'A', value: 'CahayaTerhalang', label: 'Karena Rambatan Cahaya Terhalang oleh Tubuh Kita' },
      { id: 'B', value: 'CatHitam', label: 'Karena Lantainya Sengaja Dicat Hitam' },
      { id: 'C', value: 'LampuMati', label: 'Karena Lampunya Tiba-tiba Padam' },
    ],
    correctAnswer: 'A',
    explanation: 'Cahaya yang merambat lurus tidak bisa menembus benda gelap, sehingga area di belakang benda menjadi gelap dan membentuk bayangan!',
    hint: 'Berkas cahaya yang lurus dihadang dan ditutup oleh badan kita.',
  },
  rewardXp: 70,
};

export const scienceEnergyLesson4: StoryLesson = {
  lessonId: 'science-energy-004',
  levelId: 107,
  title: 'Soal 4: Energi Panas Pengering Baju Basah',
  subject: 'science',
  topic: 'science_nature',
  difficulty: 3,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2-3',
    theme: 'Pekarangan Menjemur Pakaian',
  },
  learningObjective: [
    'Mengenal energi panas matahari dalam kehidupan sehari-hari',
    'Mengetahui proses pengeringan pakaian basah oleh panas matahari',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'sci_ener4_1',
      title: 'Menjemur Pakaian di Bawah Terik Mentari',
      background: 'park',
      narration: 'Ibu dan Siti menjemur handuk serta seragam yang basah setelah dicuci. Sinar matahari pagi memancarkan panas yang hangat.',
      actions: [
        { type: 'spawn_character', characterId: 'siti', position: { x: 260, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'budi', position: { x: 480, y: 320 }, animation: 'idle' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Panas matahari sangat bermanfaat untuk membantu mengeringkan pakaian basah kita!',
      },
    },
    {
      id: 'sci_ener4_2',
      title: 'Air yang Menguap Cepat',
      background: 'park',
      narration: 'Menjelang siang, pakaian sudah kering dan harum segar. Air di serat kain menguap ke udara berkat energi panas matahari.',
      actions: [
        { type: 'animate_character', characterId: 'budi', animation: 'celebrate' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Energi panas matahari membuat air di pakaian menguap sehingga baju jadi kering sempurna!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Bentuk energi apakah dari matahari yang sangat membantu pakaian basah jemuran menjadi kering?',
    options: [
      { id: 'A', value: 'EnergiPanas', label: 'Energi Panas (Kalor)' },
      { id: 'B', value: 'EnergiBunyi', label: 'Energi Bunyi Suara' },
      { id: 'C', value: 'EnergiListrik', label: 'Energi Baterai Listrik' },
    ],
    correctAnswer: 'A',
    explanation: 'Energi panas dari pancaran sinar matahari menguapkan kandungan air pada pakaian basah hingga kering sempurna!',
    hint: 'Rasa hangat yang kita rasakan saat berdiri di bawah terik sinar mentari.',
  },
  rewardXp: 70,
};

export const scienceEnergyLesson5: StoryLesson = {
  lessonId: 'science-energy-005',
  levelId: 107,
  title: 'Soal 5: Peneliti Cilik Pelindung Bumi Lestari',
  subject: 'science',
  topic: 'science_nature',
  difficulty: 3,
  metadata: {
    ageGroup: '7-9',
    grade: 'SD Kelas 2-3',
    theme: 'Taman Konservasi Hijau',
  },
  learningObjective: [
    'Menumbuhkan kepedulian menjaga kelestarian alam dan lingkungan hidup',
    'Mengetahui aksi nyata: menanam pohon, menghemat air, dan membuang sampah pada tempatnya',
  ],
  characters: [budiDef, sitiDef],
  scenes: [
    {
      id: 'sci_ener5_1',
      title: 'Menanam Bibit Pohon Bersama',
      background: 'park',
      narration: 'Sebagai penutup petualangan sains, Budi dan Siti menanam bibit pohon peneduh di taman sekolah.',
      actions: [
        { type: 'spawn_character', characterId: 'budi', position: { x: 240, y: 320 }, animation: 'walk' },
        { type: 'spawn_character', characterId: 'siti', position: { x: 440, y: 320 }, animation: 'walk' },
      ],
      dialogue: {
        speaker: 'budi',
        text: 'Pohon menghasilkan oksigen segar dan membuat bumi kita tetap sejuk dan asri!',
      },
    },
    {
      id: 'sci_ener5_2',
      title: 'Janji Sahabat Peneliti Cilik',
      background: 'park',
      narration: 'Siti mengajak semua teman untuk selalu mematikan kran air saat tidak digunakan dan menjaga kebersihan lingkungan.',
      actions: [
        { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
        { type: 'animate_character', characterId: 'budi', animation: 'happy' },
      ],
      dialogue: {
        speaker: 'siti',
        text: 'Hore! Kita telah menyelesaikan semua misi sains! Mari kita jaga bumi kita dengan penuh cinta!',
      },
    },
  ],
  question: {
    type: 'multiple_choice',
    question: 'Tindakan terpuji manakah yang dapat kita lakukan setiap hari untuk menjaga bumi tetap hijau dan asri?',
    options: [
      { id: 'A', value: 'TanamPohonHematAir', label: 'Menanam Pohon, Membuang Sampah di Tempatnya, & Hemat Air' },
      { id: 'B', value: 'BuangSampahSembarangan', label: 'Membuang Bungkus Plastik ke Sungai' },
      { id: 'C', value: 'MerusakTanaman', label: 'Mematahkan Ranting Pohon Tanpa Alasan' },
    ],
    correctAnswer: 'A',
    explanation: 'Menanam pohon, membuang sampah pada tempatnya, dan menghemat pemakaian air adalah perbuatan mulia untuk menjaga kelestarian bumi!',
    hint: 'Pilihan yang menunjukkan sikap peduli, menyayangi tanaman, dan menjaga kebersihan air.',
  },
  rewardXp: 80,
};
