import { StoryLesson, SubjectType, MathTopicType } from '@/types/story';

export interface GeneratorParams {
  subject: SubjectType;
  topic: MathTopicType;
  ageGroup: string;
  grade: string;
  difficulty: number;
  theme: string;
  learningObjective: string;
  mathOpA?: number;
  mathOperator?: '+' | '-' | '*' | '/';
  mathOpB?: number;
  conceptPrompt?: string;
}

export interface PresetTemplate {
  id: string;
  subject: SubjectType;
  topic: MathTopicType;
  title: string;
  badge: string;
  theme: string;
  learningObjective: string;
  mathOpA?: number;
  mathOperator?: '+' | '-' | '*' | '/';
  mathOpB?: number;
  description: string;
}

export const PRESET_TEMPLATES: PresetTemplate[] = [
  // Matematika
  {
    id: 'math_subtraction_marbles',
    subject: 'mathematics',
    topic: 'subtraction',
    title: 'Pengurangan Kelereng Budi',
    badge: '10 - 4 = 6',
    theme: 'Taman Kelereng Ceria',
    learningObjective: 'Anak memahami konsep pengurangan dengan cara berbagi kelereng dengan sahabat.',
    mathOpA: 10,
    mathOperator: '-',
    mathOpB: 4,
    description: 'Budi membagikan 4 dari 10 butir kelereng kepada Siti dengan gembira.',
  },
  {
    id: 'math_addition_apples',
    subject: 'mathematics',
    topic: 'addition',
    title: 'Penjumlahan Apel Kebun',
    badge: '5 + 3 = 8',
    theme: 'Kebun Apel Manis',
    learningObjective: 'Anak memahami konsep penjumlahan dengan mengumpulkan apel dari pohon bersama Siti.',
    mathOpA: 5,
    mathOperator: '+',
    mathOpB: 3,
    description: 'Budi memetik 5 apel dan Siti memetik 3 apel lalu menyatukannya di keranjang.',
  },
  {
    id: 'math_multiplication_stars',
    subject: 'mathematics',
    topic: 'multiplication',
    title: 'Perkalian Bintang Ajaib',
    badge: '3 × 4 = 12',
    theme: 'Langit Malam Bintang Berkelip',
    learningObjective: 'Anak memahami perkalian dasar sebagai penjumlahan berulang dalam kelompok.',
    mathOpA: 3,
    mathOperator: '*',
    mathOpB: 4,
    description: 'Ada 3 kelompok bintang di langit, setiap kelompok memiliki 4 bintang berkilau.',
  },
  {
    id: 'math_division_cookies',
    subject: 'mathematics',
    topic: 'division',
    title: 'Pembagian Kue Cokelat',
    badge: '8 ÷ 2 = 4',
    theme: 'Dapur Kue Manis',
    learningObjective: 'Anak memahami konsep pembagian sama rata kepada sahabat.',
    mathOpA: 8,
    mathOperator: '/',
    mathOpB: 2,
    description: 'Budi dan Siti membagi 8 keping kue cokelat secara adil dan sama banyak.',
  },

  // Sains
  {
    id: 'science_plants_sunlight',
    subject: 'science',
    topic: 'science_plants',
    title: 'Fotosintesis Daun Hijau',
    badge: 'Sains Tumbuhan',
    theme: 'Kebun Raya Botani Cilik',
    learningObjective: 'Anak memahami bahwa tumbuhan membutuhkan sinar matahari dan air untuk tumbuh subur (fotosintesis).',
    description: 'Budi dan Siti merawat bunga matahari dan mengamati daun hijau yang menyerap sinar mentari.',
  },
  {
    id: 'science_rain_cycle',
    subject: 'science',
    topic: 'science_weather',
    title: 'Rahasia Hujan & Pelangi',
    badge: 'Sains Cuaca',
    theme: 'Lembah Pelangi Indah',
    learningObjective: 'Anak memahami bagaimana awan membawa air hujan dan membiaskan cahaya menjadi pelangi.',
    description: 'Setelah rintik hujan reda, Budi dan Siti melihat tujuh warna pelangi di langit yang cerah.',
  },
  {
    id: 'science_animals_habitat',
    subject: 'science',
    topic: 'science_animals',
    title: 'Habitat Hewan di Hutan',
    badge: 'Sains Hewan',
    theme: 'Hutan Sahabat Rimba',
    learningObjective: 'Anak mengenal perbedaan hewan herbivora dan tempat hidup berbagai satwa.',
    description: 'Budi dan Siti menjelajahi hutan dan menemukan kelinci makan wortel serta burung bernyanyi.',
  },
  {
    id: 'science_space_planets',
    subject: 'science',
    topic: 'science_space',
    title: 'Petualangan Tata Surya Bersama Bibo',
    badge: 'Sains Antariksa',
    theme: 'Stasiun Luar Angkasa Bintang',
    learningObjective: 'Anak mengenal planet Bumi kita yang berputar mengelilingi Matahari.',
    description: 'Robot Bibo memperlihatkan miniatur tata surya dengan planet Bumi berwarna biru yang indah.',
  },

  // Bahasa
  {
    id: 'language_vowels_adventure',
    subject: 'language',
    topic: 'language_letters',
    title: 'Lima Huruf Vokal Ajaib',
    badge: 'Huruf A-I-U-E-O',
    theme: 'Taman Bacaan Ceria',
    learningObjective: 'Anak dapat mengenali dan membunyikan lima huruf vokal (A, I, U, E, O) dengan tepat.',
    description: 'Budi dan Siti menemukan balok huruf warna-warni yang dapat bernyanyi di taman buku.',
  },
  {
    id: 'language_spelling_words',
    subject: 'language',
    topic: 'language_spelling',
    title: 'Mengeja Kata Bersama Sahabat',
    badge: 'Mengeja Suku Kata',
    theme: 'Perpustakaan Dongeng Ajaib',
    learningObjective: 'Anak dapat menggabungkan huruf konsonan dan vokal menjadi kata bermakna (B-U-K-U).',
    description: 'Siti menunjukkan cara membaca kata "BUKU" dengan mengeja bu-ku secara ceria.',
  },
  {
    id: 'language_antonyms_opposites',
    subject: 'language',
    topic: 'language_antonyms',
    title: 'Dunia Lawan Kata (Antonim)',
    badge: 'Besar vs Kecil',
    theme: 'Taman Bermain Kata',
    learningObjective: 'Anak dapat membedakan konsep lawan kata seperti Besar vs Kecil, Terang vs Gelap.',
    description: 'Budi memegang bola besar sementara Siti memegang bola kecil, membandingkan keduanya.',
  },

  // Budi Pekerti
  {
    id: 'character_three_magic_words',
    subject: 'character',
    topic: 'character_politeness',
    title: 'Tiga Kata Ajaib Sopan Santun',
    badge: 'Tolong • Maaf • Terima Kasih',
    theme: 'Desa Budi Pekerti Mulia',
    learningObjective: 'Anak terbiasa mengucapkan kata Tolong, Maaf, dan Terima Kasih dalam pergaulan sehari-hari.',
    description: 'Budi lupa membawa pensil warna lalu dengan sopan meminta bantuan Siti menggunakan kata Tolong.',
  },
  {
    id: 'character_sharing_friends',
    subject: 'character',
    topic: 'character_sharing',
    title: 'Indahnya Berbagi Mainan',
    badge: 'Empati & Berbagi',
    theme: 'Ruang Kelas Sahabat Sejati',
    learningObjective: 'Anak mengerti nilai kebaikan dari berbagi mainan dan bekal dengan teman yang membutuhkan.',
    description: 'Budi melihat temannya belum memiliki mainan balok, lalu mengajaknya bermain bersama.',
  },
  {
    id: 'character_clean_environment',
    subject: 'character',
    topic: 'character_cleanliness',
    title: 'Pahlawan Cilik Jaga Kebersihan',
    badge: 'Peduli Lingkungan',
    theme: 'Taman Kota Bersih & Rindang',
    learningObjective: 'Anak memiliki kepedulian untuk selalu membuang sampah pada tempatnya demi lingkungan sehat.',
    description: 'Budi dan Siti menemukan sampah kertas di taman lalu segera membuangnya ke tempat sampah.',
  },

  // Logika
  {
    id: 'logic_color_patterns',
    subject: 'logic',
    topic: 'logic_patterns',
    title: 'Menyusun Pola Warna Berulang',
    badge: 'Pola Merah-Biru',
    theme: 'Labirin Teka-Teki Cerdik',
    learningObjective: 'Anak mampu menganalisis keteraturan urutan pola warna berulang dan melengkapinya.',
    description: 'Budi dan Siti menyusun manik-manik gelang dengan pola Merah - Biru - Merah - Biru.',
  },
  {
    id: 'logic_geometric_shapes',
    subject: 'logic',
    topic: 'logic_shapes',
    title: 'Detektif Bentuk Geometri',
    badge: 'Segitiga • Lingkaran • Persegi',
    theme: 'Rumah Balok Warna-Warni',
    learningObjective: 'Anak mengenali ciri-ciri bangun datar seperti segitiga dengan 3 sisi dan lingkaran yang bulat.',
    description: 'Budi memegang balok segitiga dan Siti mencari benda di sekitar yang memiliki bentuk serupa.',
  },
  {
    id: 'logic_clever_riddles',
    subject: 'logic',
    topic: 'logic_riddles',
    title: 'Teka-Teki Cerdik Hewan Misterius',
    badge: 'Asah Otak Cilik',
    theme: 'Hutan Teka-Teki Misteri',
    learningObjective: 'Anak mengasah penalaran deduktif dengan mendengarkan petunjuk ciri-ciri hewan.',
    description: 'Budi dan Siti memecahkan teka-teki tentang hewan yang suka makan wortel dan bertelinga panjang.',
  },
];

export function generateSubjectLesson(params: GeneratorParams): StoryLesson {
  const {
    subject,
    topic,
    ageGroup,
    grade,
    difficulty,
    theme,
    learningObjective,
    mathOpA = 10,
    mathOperator = '-',
    mathOpB = 4,
  } = params;

  const generatedLessonId = `lesson-${subject}-${topic}-${Date.now().toString().slice(-4)}`;

  // Default characters
  const defaultCharacters = [
    {
      id: 'budi',
      name: 'Budi',
      asset: 'character_budi',
      color: '#3b82f6',
      personality: 'Ceria, bersemangat, dan suka belajar hal baru',
      voiceProfile: { pitch: 1.25, rate: 0.95 },
    },
    {
      id: 'siti',
      name: 'Siti',
      asset: 'character_siti',
      color: '#ec4899',
      personality: 'Ramah, lembut, teliti, dan senang berbagi',
      voiceProfile: { pitch: 1.35, rate: 0.92 },
    },
  ];

  // If robot Bibo is helpful for science/space
  if (topic === 'science_space' || topic === 'logic_patterns') {
    defaultCharacters.push({
      id: 'bibo',
      name: 'Bibo',
      asset: 'character_bibo',
      color: '#10b981',
      personality: 'Robot cerdas yang suka memandu petualangan ilmu pengetahuan',
      voiceProfile: { pitch: 1.5, rate: 1.1 },
    });
  }

  // 1. MATHEMATICS GENERATOR
  if (subject === 'mathematics') {
    let calculatedResult = 0;
    switch (mathOperator) {
      case '+': calculatedResult = mathOpA + mathOpB; break;
      case '-': calculatedResult = Math.max(0, mathOpA - mathOpB); break;
      case '*': calculatedResult = mathOpA * mathOpB; break;
      case '/': calculatedResult = mathOpB !== 0 ? Math.floor(mathOpA / mathOpB) : 1; break;
    }

    const objectItem = topic === 'addition' ? 'apple' : topic === 'multiplication' ? 'star' : 'marble';
    const objectLabel = objectItem === 'apple' ? 'apel' : objectItem === 'star' ? 'bintang' : 'kelereng';

    const isSubtraction = mathOperator === '-';
    const isAddition = mathOperator === '+';
    const isMultiplication = mathOperator === '*';

    const scenes = [
      {
        id: 'scene_01',
        title: 'Awal Petualangan',
        background: 'park' as const,
        narration: `Di ${theme.toLowerCase()}, Budi sedang berkumpul dengan riang membawa ${mathOpA} ${objectLabel}.`,
        actions: [
          { type: 'spawn_character' as const, characterId: 'budi', position: { x: 220, y: 320 }, animation: 'idle' as const },
          { type: 'spawn_object' as const, object: objectItem as any, owner: 'budi', quantity: mathOpA, position: { x: 270, y: 340 } },
        ],
        dialogue: {
          speaker: 'budi',
          text: `Wah, lihat kawan! Aku punya ${mathOpA} ${objectLabel} di sini!`,
        },
      },
      {
        id: 'scene_02',
        title: 'Kedatangan Siti',
        background: 'park' as const,
        narration: `Tak lama kemudian, Siti menghampiri Budi dengan senyuman ceria.`,
        actions: [
          { type: 'spawn_character' as const, characterId: 'siti', position: { x: 540, y: 320 }, animation: 'walk' as const },
          { type: 'animate_character' as const, characterId: 'budi', animation: 'happy' as const },
        ],
        dialogue: {
          speaker: 'siti',
          text: `Halo Budi! Seru sekali melihat koleksi ${objectLabel} milikmu!`,
        },
      },
      {
        id: 'scene_03',
        title: isSubtraction ? 'Aksi Berbagi' : isAddition ? 'Menggabungkan Benda' : 'Menghitung Kelompok',
        background: 'park' as const,
        narration: isSubtraction
          ? `Budi dengan ikhlas memberikan ${mathOpB} butir ${objectLabel} kepada Siti.`
          : isAddition
          ? `Siti menambahkan ${mathOpB} ${objectLabel} lagi ke dalam koleksi mereka.`
          : `Mereka menyusun ${objectLabel} ke dalam pola perkalian yang rapi.`,
        actions: isSubtraction
          ? [
              { type: 'transfer_object' as const, object: objectItem as any, from: 'budi', to: 'siti', quantity: mathOpB },
              { type: 'animate_character' as const, characterId: 'siti', animation: 'celebrate' as const },
            ]
          : [
              { type: 'spawn_object' as const, object: objectItem as any, owner: 'siti', quantity: mathOpB, position: { x: 500, y: 340 } },
              { type: 'animate_character' as const, characterId: 'budi', animation: 'celebrate' as const },
            ],
        dialogue: {
          speaker: 'budi',
          text: isSubtraction
            ? `Ini ${mathOpB} ${objectLabel} untukmu Siti, mari bermain bersama!`
            : `Hore, sekarang jumlah ${objectLabel} kita semakin banyak!`,
        },
      },
      {
        id: 'scene_04',
        title: 'Menemukan Jawaban',
        background: 'park' as const,
        narration: isSubtraction
          ? `Awalnya ada ${mathOpA} ${objectLabel}, lalu diberikan ${mathOpB} butir. Berapakah sisa ${objectLabel} Budi sekarang?`
          : `Awalnya ada ${mathOpA}, lalu ditambah ${mathOpB}. Berapakah jumlah total ${objectLabel} sekarang?`,
        actions: [
          { type: 'animate_character' as const, characterId: 'budi', animation: 'think' as const },
          { type: 'highlight_object' as const, object: objectItem as any, owner: 'budi' },
        ],
      },
    ];

    const optA = Math.max(1, calculatedResult - 2);
    const optB = Math.max(1, calculatedResult - 1);
    const optC = calculatedResult;
    const optD = calculatedResult + 2;

    return {
      lessonId: generatedLessonId,
      levelId: difficulty,
      title: `Petualangan Matematika: ${theme}`,
      subject: 'mathematics',
      topic,
      difficulty: difficulty as any,
      metadata: {
        ageGroup,
        grade,
        theme,
        mathFormula: {
          operandA: mathOpA,
          operator: mathOperator,
          operandB: mathOpB,
          result: calculatedResult,
        },
      },
      learningObjective: [learningObjective],
      characters: defaultCharacters,
      scenes,
      question: {
        type: 'multiple_choice',
        question: isSubtraction
          ? `Berapakah sisa ${objectLabel} yang dipegang Budi sekarang?`
          : `Berapakah total seluruh ${objectLabel} sekarang?`,
        options: [
          { id: 'A', value: optA, label: `${optA} ${objectLabel}` },
          { id: 'B', value: optB, label: `${optB} ${objectLabel}` },
          { id: 'C', value: optC, label: `${optC} ${objectLabel}` },
          { id: 'D', value: optD, label: `${optD} ${objectLabel}` },
        ],
        correctAnswer: 'C',
        explanation: `${mathOpA} ${mathOperator} ${mathOpB} = ${calculatedResult}! Kerja hebat adik pintar!`,
        hint: isSubtraction
          ? `Hitung mundur ${mathOpB} langkah dari ${mathOpA}.`
          : `Hitung maju ${mathOpB} langkah dari ${mathOpA}.`,
        visualHint: {
          formula: `${mathOpA} ${mathOperator} ${mathOpB} = ${calculatedResult}`,
          initialCount: mathOpA,
          transferCount: mathOpB,
          remainingCount: calculatedResult,
          itemType: objectItem as any,
        },
      },
      remedialStory: {
        title: `Panduan Tambahan: Menghitung ${objectLabel}`,
        narration: `Ayo kita gunakan petunjuk visual untuk membantumu menghitung dengan mudah.`,
        scenes: [
          {
            id: 'rem_1',
            background: 'forest',
            narration: `Perhatikan baik-baik: mula-mula ada ${mathOpA} ${objectLabel}.`,
            actions: [
              { type: 'spawn_character', characterId: 'budi', position: { x: 260, y: 320 }, animation: 'idle' },
              { type: 'spawn_object', object: objectItem as any, owner: 'budi', quantity: mathOpA },
            ],
          },
        ],
        question: {
          type: 'multiple_choice',
          question: `Hasil dari ${mathOpA} ${mathOperator} ${mathOpB} adalah...`,
          options: [
            { id: 'A', value: calculatedResult, label: `${calculatedResult} ${objectLabel}` },
            { id: 'B', value: calculatedResult + 1, label: `${calculatedResult + 1} ${objectLabel}` },
          ],
          correctAnswer: 'A',
          explanation: `${mathOpA} ${mathOperator} ${mathOpB} = ${calculatedResult}`,
          hint: 'Hitung perlahan satu per satu objek di layar.',
        },
      },
      rewardXp: 50 * difficulty,
    };
  }

  // 2. SCIENCE GENERATOR
  if (subject === 'science') {
    let qText = '';
    let optA = '';
    let optB = '';
    let optC = '';
    let optD = '';
    let correct = 'A';
    let explanation = '';
    let hint = '';
    let s1Narration = '';
    let s2Narration = '';
    let s3Narration = '';
    let s4Narration = '';
    let budiDialogue = '';
    let sitiDialogue = '';

    if (topic === 'science_plants') {
      s1Narration = `Di kebun hijau yang indah, Budi dan Siti mengamati tanaman bunga yang sedang bermekaran.`;
      s2Narration = `Sinar matahari pagi yang hangat menyinari daun-daun hijau yang segar.`;
      s3Narration = `Siti menyiram tanah di sekitar akar tanaman dengan air bersih.`;
      s4Narration = `Daun hijau menggunakan sinar matahari dan air untuk membuat makanannya sendiri (fotosintesis).`;
      budiDialogue = `Wah Siti, lihat bagaimana daun-daun ini menyambut cahaya mentari!`;
      sitiDialogue = `Betul Budi! Tumbuhan sangat membutuhkan sinar matahari dan air agar bisa tumbuh subur!`;
      qText = `Apa yang dibutuhkan oleh tumbuhan agar dapat membuat makanannya sendiri melalui proses fotosintesis?`;
      optA = `Sinar matahari dan air`;
      optB = `Es batu dan kegelapan`;
      optC = `Minyak goreng dan susu`;
      optD = `Kipas angin kencang`;
      correct = 'A';
      explanation = `Hebat! Daun hijau membutuhkan cahaya matahari dan air dari tanah untuk berfotosintesis.`;
      hint = `Ingat apa yang disiram Siti dan apa yang menyinari daun dari langit di pagi hari!`;
    } else if (topic === 'science_weather') {
      s1Narration = `Langit di atas taman mulai dinaungi awan putih yang perlahan bergulung menjadi abu-abu.`;
      s2Narration = `Rintik air hujan turun membasahi bumi, membuat udara menjadi sejuk dan segar.`;
      s3Narration = `Saat hujan mereda dan mentari kembali bersinar, lengkungan cahaya warna-warni muncul di langit.`;
      s4Narration = `Budi dan Siti terpesona memandang tujuh warna pelangi yang membentang indah.`;
      budiDialogue = `Lihat ke atas Siti! Ada pelangi dengan warna merah, kuning, hijau, dan biru!`;
      sitiDialogue = `Indah sekali! Pelangi terbentuk saat sinar matahari menembus butiran tetesan air hujan di udara!`;
      qText = `Kapankah pelangi biasanya dapat terlihat di langit?`;
      optA = `Di malam hari saat gelap gulita`;
      optB = `Saat sinar matahari bersinar setelah hujan turun`;
      optC = `Hanya saat ada badai petir lebat`;
      optD = `Di dalam ruangan tertutup`;
      correct = 'B';
      explanation = `Tepat sekali! Pelangi muncul saat cahaya matahari menyinari butir-butir air setelah hujan turun.`;
      hint = `Pikirkan perpaduan antara cahaya matahari dan butiran air hujan di langit.`;
    } else if (topic === 'science_animals') {
      s1Narration = `Budi dan Siti berkunjung ke taman suaka satwa untuk mengenal berbagai sahabat hewan.`;
      s2Narration = `Mereka melihat kelinci lucu yang sedang asyik memakan rumput dan wortel segar di padang rumput.`;
      s3Narration = `Siti mencatat bahwa kelinci adalah hewan herbivora karena menyukai makanan berupa tumbuhan.`;
      s4Narration = `Semua hewan memiliki makanan dan tempat hidup kesukaannya masing-masing.`;
      budiDialogue = `Lucu sekali kelinci itu melompat-lompat mencari sayuran hijau!`;
      sitiDialogue = `Hewan pemakan tumbuhan seperti kelinci ini disebut hewan herbivora, Budi!`;
      qText = `Hewan pemakan tumbuhan seperti kelinci, sapi, dan kambing disebut sebagai kelompok hewan...`;
      optA = `Karnivora`;
      optB = `Herbivora`;
      optC = `Insektivora`;
      optD = `Piscivora`;
      correct = 'B';
      explanation = `Bagus sekali! Herbivora adalah sebutan untuk hewan yang memakan tumbuhan dan biji-bijian.`;
      hint = `Kata depannya berawalan dari suku kata "Herbi-".`;
    } else if (topic === 'science_space') {
      s1Narration = `Di ruang observasi bintang, Robot Bibo menyalakan proyektor planet tata surya.`;
      s2Narration = `Budi dan Siti melihat planet Bumi yang berwarna biru dan hijau berputar pelan.`;
      s3Narration = `Bumi kita terus berputar pada porosnya sambil mengelilingi matahari yang sangat besar.`;
      s4Narration = `Perputaran bumi itulah yang menyebabkan terjadinya siang dan malam hari.`;
      budiDialogue = `Bibo, kenapa Bumi kita terlihat berwarna biru dari luar angkasa?`;
      sitiDialogue = `Karena sebagian besar permukaan Bumi kita diselimuti oleh lautan air yang luas!`;
      qText = `Mengapa planet Bumi kita tampak berwarna biru jika dilihat dari luar angkasa?`;
      optA = `Karena langit bumi terbuat dari kaca`;
      optB = `Karena sebagian besar permukaan bumi diselimuti lautan air`;
      optC = `Karena semua tanah bumi dicat warna biru`;
      optD = `Karena lampu planet menyala`;
      correct = 'B';
      explanation = `Pintar! Sekitar 70% permukaan bumi tertutup air lautan, sehingga tampak biru dari luar angkasa.`;
      hint = `Pikirkan apa yang menutupi sebagian besar wilayah di peta dunia kita!`;
    } else {
      // science_nature / general senses
      s1Narration = `Budi dan Siti belajar tentang lima panca indera karunia yang luar biasa pada tubuh kita.`;
      s2Narration = `Mata untuk melihat indahnya warna, dan telinga untuk mendengarkan kicauan burung.`;
      s3Narration = `Hidung untuk mencium wangi bunga melati, dan lidah untuk merasakan manisnya madu.`;
      s4Narration = `Dengan panca indera, kita dapat mengenal dan mensyukuri seluruh alam semesta.`;
      budiDialogue = `Hidungku bisa mencium aroma kue yang harum sekali Siti!`;
      sitiDialogue = `Betul, dan telinga kita bisa mendengarkan lagu chiptune yang riang ini!`;
      qText = `Panca indera yang kita gunakan untuk mendengarkan suara di sekitar kita adalah...`;
      optA = `Telinga`;
      optB = `Hidung`;
      optC = `Mata`;
      optD = `Kulit`;
      correct = 'A';
      explanation = `Tepat sekali! Telinga adalah indera pendengaran kita yang mampu menangkap gelombang suara.`;
      hint = `Organ tubuh yang terletak di sebelah kiri dan kanan kepala kita.`;
    }

    return {
      lessonId: generatedLessonId,
      levelId: difficulty,
      title: `Petualangan Sains: ${theme}`,
      subject: 'science',
      topic,
      difficulty: difficulty as any,
      metadata: {
        ageGroup,
        grade,
        theme,
      },
      learningObjective: [learningObjective],
      characters: defaultCharacters,
      scenes: [
        {
          id: 'scene_01',
          title: 'Awal Eksplorasi',
          background: 'park',
          narration: s1Narration,
          actions: [
            { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'idle' },
          ],
          dialogue: { speaker: 'budi', text: budiDialogue },
        },
        {
          id: 'scene_02',
          title: 'Pengamatan Cermat',
          background: 'park',
          narration: s2Narration,
          actions: [
            { type: 'spawn_character', characterId: 'siti', position: { x: 520, y: 320 }, animation: 'walk' },
            { type: 'animate_character', characterId: 'budi', animation: 'happy' },
          ],
          dialogue: { speaker: 'siti', text: sitiDialogue },
        },
        {
          id: 'scene_03',
          title: 'Fakta Sains Menakjubkan',
          background: 'park',
          narration: s3Narration,
          actions: [
            { type: 'animate_character', characterId: 'budi', animation: 'celebrate' },
          ],
        },
        {
          id: 'scene_04',
          title: 'Uji Pengetahuan',
          background: 'park',
          narration: s4Narration,
          actions: [
            { type: 'animate_character', characterId: 'budi', animation: 'think' },
          ],
        },
      ],
      question: {
        type: 'multiple_choice',
        question: qText,
        options: [
          { id: 'A', value: optA, label: optA },
          { id: 'B', value: optB, label: optB },
          { id: 'C', value: optC, label: optC },
          { id: 'D', value: optD, label: optD },
        ],
        correctAnswer: correct,
        explanation,
        hint,
      },
      remedialStory: {
        title: `Eksplorasi Pendalaman Sains Cilik`,
        narration: `Mari simak kembali petunjuk penting tentang konsep sains ini bersama Siti.`,
        scenes: [
          {
            id: 'rem_1',
            background: 'classroom',
            narration: s3Narration,
            actions: [
              { type: 'spawn_character', characterId: 'siti', position: { x: 280, y: 320 }, animation: 'happy' },
            ],
          },
        ],
        question: {
          type: 'multiple_choice',
          question: qText,
          options: [
            { id: 'A', value: optA, label: optA },
            { id: 'B', value: optB, label: optB },
          ],
          correctAnswer: 'A',
          explanation,
          hint,
        },
      },
      rewardXp: 50 * difficulty,
    };
  }

  // 3. LANGUAGE GENERATOR
  if (subject === 'language') {
    let qText = '';
    let optA = '';
    let optB = '';
    let optC = '';
    let optD = '';
    let correct = 'A';
    let explanation = '';
    let hint = '';

    if (topic === 'language_letters') {
      qText = `Manakah kelompok huruf di bawah ini yang semuanya merupakan huruf vokal?`;
      optA = `A, I, U, E, O`;
      optB = `B, C, D, F, G`;
      optC = `J, K, L, M, N`;
      optD = `P, Q, R, S, T`;
      correct = 'A';
      explanation = `Hebat sekali! Huruf vokal dalam bahasa Indonesia terdiri dari 5 huruf: A, I, U, E, dan O.`;
      hint = `Cari pilihan yang berisi huruf A, I, U, E, dan O!`;
    } else if (topic === 'language_antonyms') {
      qText = `Budi memegang gajah yang 'Besar'. Apakah lawan kata (antonim) dari kata 'Besar'?`;
      optA = `Kecil`;
      optB = `Tinggi`;
      optC = `Panjang`;
      optD = `Luas`;
      correct = 'A';
      explanation = `Tepat! Lawan kata dari 'Besar' adalah 'Kecil', seperti gajah besar dan semut kecil.`;
      hint = `Lawan dari ukuran yang sangat raksasa adalah...`;
    } else {
      qText = `Bagaimanakah susunan huruf yang benar untuk mengeja kata 'BUKU'?`;
      optA = `B - U - K - U`;
      optB = `B - A - T - U`;
      optC = `B - O - L - A`;
      optD = `B - U - M - I`;
      correct = 'A';
      explanation = `Pintar! B-U dibaca BU, K-U dibaca KU, jika digabung menjadi kata BUKU.`;
      hint = `Dengarkan bunyi suku katanya: BU - KU.`;
    }

    return {
      lessonId: generatedLessonId,
      levelId: difficulty,
      title: `Petualangan Bahasa & Membaca: ${theme}`,
      subject: 'language',
      topic,
      difficulty: difficulty as any,
      metadata: {
        ageGroup,
        grade,
        theme,
      },
      learningObjective: [learningObjective],
      characters: defaultCharacters,
      scenes: [
        {
          id: 'scene_01',
          title: 'Membuka Buku Ajaib',
          background: 'classroom',
          narration: `Di ${theme.toLowerCase()}, Budi dan Siti sedang membuka buku cerita bergambar yang sangat menarik.`,
          actions: [
            { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'idle' },
          ],
          dialogue: {
            speaker: 'budi',
            text: `Siti, ayo kita baca buku dongeng ini bersama-sama!`,
          },
        },
        {
          id: 'scene_02',
          title: 'Menemukan Huruf & Kata',
          background: 'classroom',
          narration: `Siti menunjuk deretan huruf yang tertata rapi di papan tulis ajaib.`,
          actions: [
            { type: 'spawn_character', characterId: 'siti', position: { x: 520, y: 320 }, animation: 'walk' },
            { type: 'animate_character', characterId: 'budi', animation: 'happy' },
          ],
          dialogue: {
            speaker: 'siti',
            text: `Membaca itu sangat menyenangkan, Budi! Huruf-huruf ini membentuk kata yang indah.`,
          },
        },
        {
          id: 'scene_03',
          title: 'Mengeja Bersama',
          background: 'classroom',
          narration: `Mereka melafalkan setiap bunyi huruf dengan suara yang lantang dan jelas.`,
          actions: [
            { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
            { type: 'animate_character', characterId: 'budi', animation: 'celebrate' },
          ],
        },
        {
          id: 'scene_04',
          title: 'Tantangan Literasi Cilik',
          background: 'classroom',
          narration: `Sekarang, mari uji ketelitian membaca dan bahasamu pada pertanyaan berikut!`,
          actions: [
            { type: 'animate_character', characterId: 'budi', animation: 'think' },
          ],
        },
      ],
      question: {
        type: 'multiple_choice',
        question: qText,
        options: [
          { id: 'A', value: optA, label: optA },
          { id: 'B', value: optB, label: optB },
          { id: 'C', value: optC, label: optC },
          { id: 'D', value: optD, label: optD },
        ],
        correctAnswer: correct,
        explanation,
        hint,
      },
      remedialStory: {
        title: `Panduan Membaca Bersama Siti`,
        narration: `Dengarkan kembali pelafalan huruf dan suku kata secara perlahan.`,
        scenes: [
          {
            id: 'rem_1',
            background: 'classroom',
            narration: `Perhatikan baik-baik bentuk dan bunyi huruf yang ditunjukkan Siti.`,
            actions: [
              { type: 'spawn_character', characterId: 'siti', position: { x: 280, y: 320 }, animation: 'idle' },
            ],
          },
        ],
        question: {
          type: 'multiple_choice',
          question: qText,
          options: [
            { id: 'A', value: optA, label: optA },
            { id: 'B', value: optB, label: optB },
          ],
          correctAnswer: 'A',
          explanation,
          hint,
        },
      },
      rewardXp: 50 * difficulty,
    };
  }

  // 4. CHARACTER (BUDI PEKERTI) GENERATOR
  if (subject === 'character') {
    let qText = '';
    let optA = '';
    let optB = '';
    let optC = '';
    let optD = '';
    let correct = 'A';
    let explanation = '';
    let hint = '';

    if (topic === 'character_cleanliness') {
      qText = `Ketika Budi selesai makan biskuit di taman, apa yang seharusnya ia lakukan pada bungkusnya?`;
      optA = `Membuangnya ke dalam tempat sampah`;
      optB = `Membiarkannya tergeletak di rumput`;
      optC = `Menyelipkannya di bawah bangku taman`;
      optD = `Melemparkannya ke selokan air`;
      correct = 'A';
      explanation = `Hebat! Anak hebat selalu membuang sampah pada tempat sampah agar lingkungan tetap bersih dan asri.`;
      hint = `Ingat semboyan: buanglah sampah pada...`;
    } else if (topic === 'character_sharing') {
      qText = `Siti melihat temannya sedih karena tidak membawa pensil gambar. Sikap terpuji Siti adalah...`;
      optA = `Meminjamkan pensil cadangannya dengan ramah`;
      optB = `Mengejek temannya yang lupa`;
      optC = `Menyembunyikan semua pensil miliknya`;
      optD = `Pura-pura tidak melihat`;
      correct = 'A';
      explanation = `Luar biasa! Berbagi dan saling tolong-menolong adalah ciri anak berhati mulia dan teladan.`;
      hint = `Pilihlah sikap yang penuh kebaikan dan kepedulian kepada sahabat.`;
    } else {
      // character_politeness
      qText = `Kata ajaib apakah yang harus kita ucapkan dengan santun saat kita membutuhkan bantuan orang lain?`;
      optA = `Tolong`;
      optB = `Cepat`;
      optC = `Beri aku`;
      optD = `Hei kamu`;
      correct = 'A';
      explanation = `Tepat sekali! Kata 'Tolong' adalah kata ajaib yang menunjukkan rasa hormat dan sopan santun kita.`;
      hint = `Tiga kata ajaib utama: Tolong, Maaf, dan Terima Kasih.`;
    }

    return {
      lessonId: generatedLessonId,
      levelId: difficulty,
      title: `Budi Pekerti Teladan: ${theme}`,
      subject: 'character',
      topic,
      difficulty: difficulty as any,
      metadata: {
        ageGroup,
        grade,
        theme,
      },
      learningObjective: [learningObjective],
      characters: defaultCharacters,
      scenes: [
        {
          id: 'scene_01',
          title: 'Situasi Sehari-Hari',
          background: 'park',
          narration: `Di ${theme.toLowerCase()}, Budi dan Siti sedang berkegiatan bersama teman-teman sebaya.`,
          actions: [
            { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'idle' },
          ],
          dialogue: {
            speaker: 'budi',
            text: `Senang sekali bisa berkumpul dan belajar bersama di hari yang cerah ini!`,
          },
        },
        {
          id: 'scene_02',
          title: 'Kesempatan Berbuat Baik',
          background: 'park',
          narration: `Muncul sebuah situasi di mana kebaikan dan kepedulian diuji di antara para sahabat.`,
          actions: [
            { type: 'spawn_character', characterId: 'siti', position: { x: 520, y: 320 }, animation: 'walk' },
            { type: 'animate_character', characterId: 'budi', animation: 'happy' },
          ],
          dialogue: {
            speaker: 'siti',
            text: `Ingat ya kawan-kawan, selalu gunakan kata-kata santun dan saling menyayangi!`,
          },
        },
        {
          id: 'scene_03',
          title: 'Tindakan Penuh Teladan',
          background: 'park',
          narration: `Dengan hati yang tulus, mereka menerapkan nilai kebaikan yang membuat semua orang merasa bahagia.`,
          actions: [
            { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
            { type: 'animate_character', characterId: 'budi', animation: 'celebrate' },
          ],
        },
        {
          id: 'scene_04',
          title: 'Refleksi Akhlak Mulia',
          background: 'park',
          narration: `Bagaimanakah sikap seorang anak hebat yang berbudi luhur? Jawablah pertanyaan berikut!`,
          actions: [
            { type: 'animate_character', characterId: 'budi', animation: 'think' },
          ],
        },
      ],
      question: {
        type: 'multiple_choice',
        question: qText,
        options: [
          { id: 'A', value: optA, label: optA },
          { id: 'B', value: optB, label: optB },
          { id: 'C', value: optC, label: optC },
          { id: 'D', value: optD, label: optD },
        ],
        correctAnswer: correct,
        explanation,
        hint,
      },
      remedialStory: {
        title: `Panduan Akhlak Terpuji Bersama Siti`,
        narration: `Ingatlah selalu bahwa kebaikan kecil membawa senyuman besar bagi semua orang.`,
        scenes: [
          {
            id: 'rem_1',
            background: 'park',
            narration: `Siti selalu membiasakan diri bersikap ramah, sopan, dan suka menolong.`,
            actions: [
              { type: 'spawn_character', characterId: 'siti', position: { x: 280, y: 320 }, animation: 'idle' },
            ],
          },
        ],
        question: {
          type: 'multiple_choice',
          question: qText,
          options: [
            { id: 'A', value: optA, label: optA },
            { id: 'B', value: optB, label: optB },
          ],
          correctAnswer: 'A',
          explanation,
          hint,
        },
      },
      rewardXp: 50 * difficulty,
    };
  }

  // 5. LOGIC & BRAIN TEASERS GENERATOR
  let qText = '';
  let optA = '';
  let optB = '';
  let optC = '';
  let optD = '';
  let correct = 'A';
  let explanation = '';
  let hint = '';

  if (topic === 'logic_shapes') {
    qText = `Bentuk geometri apakah yang memiliki 3 buah sisi lurus dan 3 buah sudut lancip?`;
    optA = `Segitiga`;
    optB = `Persegi`;
    optC = `Lingkaran`;
    optD = `Bintang`;
    correct = 'A';
    explanation = `Tepat sekali! Segitiga dinamakan segi-tiga karena memiliki 3 sisi dan 3 sudut.`;
    hint = `Perhatikan kata depannya: 'Segi-tiga'.`;
  } else if (topic === 'logic_riddles') {
    qText = `Teka-teki: Aku bertelinga panjang, suka melompat kencang, dan gemar memakan wortel segar. Siapakah aku?`;
    optA = `Kelinci`;
    optB = `Kucing`;
    optC = `Gajah`;
    optD = `Kura-kura`;
    correct = 'A';
    explanation = `Cerdas sekali! Ciri-ciri telinga panjang dan suka makan wortel adalah kelinci!`;
    hint = `Hewan ini bergerak dengan cara melompat-lompat riang.`;
  } else {
    // logic_patterns
    qText = `Perhatikan pola warna berikut: [Merah] - [Biru] - [Merah] - [Biru] - [ ... ? ]. Warna apakah berikutnya?`;
    optA = `Merah`;
    optB = `Hijau`;
    optC = `Kuning`;
    optD = `Ungu`;
    correct = 'A';
    explanation = `Luar biasa! Polanya berulang secara bergantian: Merah lalu Biru, sehingga setelah Biru kembali lagi ke Merah.`;
    hint = `Lihat urutan warna pertama setelah warna Biru muncul.`;
  }

  return {
    lessonId: generatedLessonId,
    levelId: difficulty,
    title: `Petualangan Logika Cerdik: ${theme}`,
    subject: 'logic',
    topic,
    difficulty: difficulty as any,
    metadata: {
      ageGroup,
      grade,
      theme,
    },
    learningObjective: [learningObjective],
    characters: defaultCharacters,
    scenes: [
      {
        id: 'scene_01',
        title: 'Misteri Labirin Logika',
        background: 'classroom',
        narration: `Di ${theme.toLowerCase()}, Budi dan Siti menghadapi teka-teki logika yang mengasah daya pikir cerdas.`,
        actions: [
          { type: 'spawn_character', characterId: 'budi', position: { x: 220, y: 320 }, animation: 'idle' },
        ],
        dialogue: {
          speaker: 'budi',
          text: `Ayo kita amati petunjuknya dengan teliti, Siti!`,
        },
      },
      {
        id: 'scene_02',
        title: 'Menganalisis Pola',
        background: 'classroom',
        narration: `Siti memperhatikan setiap keteraturan bentuk dan warna dengan seksama.`,
        actions: [
          { type: 'spawn_character', characterId: 'siti', position: { x: 520, y: 320 }, animation: 'walk' },
          { type: 'animate_character', characterId: 'budi', animation: 'happy' },
        ],
        dialogue: {
          speaker: 'siti',
          text: `Jika kita melihat polanya berulang, kita pasti bisa menemukan jawabannya!`,
        },
      },
      {
        id: 'scene_03',
        title: 'Menemukan Kunci Teka-Teki',
        background: 'classroom',
        narration: `Semua petunjuk telah tersusun dengan rapi di hadapan mereka.`,
        actions: [
          { type: 'animate_character', characterId: 'siti', animation: 'celebrate' },
          { type: 'animate_character', characterId: 'budi', animation: 'celebrate' },
        ],
      },
      {
        id: 'scene_04',
        title: 'Memecahkan Soal',
        background: 'classroom',
        narration: `Sekarang saatnya kamu yang memecahkan teka-teki logika ini!`,
        actions: [
          { type: 'animate_character', characterId: 'budi', animation: 'think' },
        ],
      },
    ],
    question: {
      type: 'multiple_choice',
      question: qText,
      options: [
        { id: 'A', value: optA, label: optA },
        { id: 'B', value: optB, label: optB },
        { id: 'C', value: optC, label: optC },
        { id: 'D', value: optD, label: optD },
      ],
      correctAnswer: correct,
      explanation,
      hint,
    },
    remedialStory: {
      title: `Panduan Teka-Teki Cerdik`,
      narration: `Simak kembali susunan pola langkah demi langkah bersama Budi.`,
      scenes: [
        {
          id: 'rem_1',
          background: 'classroom',
          narration: `Budi menunjukkan urutan awal teka-teki dengan jelas.`,
          actions: [
            { type: 'spawn_character', characterId: 'budi', position: { x: 280, y: 320 }, animation: 'idle' },
          ],
        },
      ],
      question: {
        type: 'multiple_choice',
        question: qText,
        options: [
          { id: 'A', value: optA, label: optA },
          { id: 'B', value: optB, label: optB },
        ],
        correctAnswer: 'A',
        explanation,
        hint,
      },
    },
    rewardXp: 50 * difficulty,
  };
}
