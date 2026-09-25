// Bilingual Indonesian -> English translation engine for kids story narration, dialogues, and questions

export const DICTIONARY_MAP: Record<string, string> = {
  // Common Characters & Words
  'Budi': 'Budi',
  'Siti': 'Siti',
  'apel': 'apple',
  'apel-apel': 'apples',
  'balon': 'balloon',
  'balon-balon': 'balloons',
  'kelereng': 'marble',
  'kue': 'cake',
  'cupcake': 'cupcake',
  'buku': 'book',
  'bunga': 'flower',
  'bintang': 'star',
  'koin': 'coin',
  'permen': 'candy',
  'krayon': 'crayon',
  'kristal': 'crystal',

  // Common Dialogues
  'Wah, senangnya bermain kelereng di taman hari ini!': "Wow, it's so fun playing marbles in the park today!",
  'Halo Budi! Wah, kelerengmu banyak sekali dan berkilauan!': 'Hello Budi! Wow, your marbles are so many and shiny!',
  'Ini untukmu Siti, empat kelereng. Sekarang kita bisa main bersama!': 'Here is for you Siti, four marbles. Now we can play together!',
  'Hmm, dari 10 kelerengku, sudah kuberikan 4 pada Siti. Berapa kelerengku sekarang ya?': "Hmm, out of my 10 marbles, I gave 4 to Siti. How many do I have left now?",
  'Nyam! Apel-apel merah ini kelihatan manis sekali. Ada berapa ya semuanya?': 'Yum! These red apples look so sweet. How many are there in total?',
  'Lihat balon-balon pesta ini, melayang indah di udara!': 'Look at these party balloons, floating beautifully in the air!',
  'Cupcake manis ini harum sekali! Ayo kita hitung jumlahnya!': 'These sweet cupcakes smell wonderful! Let us count how many there are!',
  'Bunga-bunga matahari ini mekar cerah menghadap matahari!': 'These sunflowers are blooming brightly towards the sun!',
  'Wah, langit malam ini penuh dengan bintang emas yang berkilau!': 'Wow, the night sky is filled with glittering golden stars!',
  'Aku punya 3 buah stroberi merah yang manis dan segar!': 'I have 3 sweet and fresh red strawberries!',
  'Aku tambahkan 4 buah jeruk segar ya Budi, sekarang buah kita terkumpul!': 'I am adding 4 fresh oranges Budi, now our fruits are gathered!',
  'Aku sudah tiup 5 balon merah! Cantik sekali ya!': 'I have blown up 5 red balloons! They look so pretty!',
  'Ini aku tambahkan 3 balon biru agar hiasan kita makin ramai!': 'I add 3 blue balloons to make our decoration even more festive!',
  'Aku baru saja meminjam 4 buku dongeng yang sangat seru!': 'I just borrowed 4 exciting fairy tale books!',
  'Aku juga pinjam 2 buku tentang hewan dan tumbuhan, Budi!': 'I also borrowed 2 books about animals and plants, Budi!',
  'Mawar merah ini wangi sekali! Ada 6 tangkai di tanganku.': 'These red roses smell delightful! There are 6 stems in my hands.',
  'Ayo kita tambahkan 4 bunga melati ini agar vas bunga terlihat sempurna!': 'Let us add these 4 jasmine flowers so the vase looks perfect!',
  'Nyam! 5 cupcake cokelat ini sudah matang dan siap disajikan!': 'Yum! 5 chocolate cupcakes are freshly baked and ready to serve!',
  'Aku juga bawa 5 cupcake stroberi! Wah, meja kita penuh kue lezat!': 'I also brought 5 strawberry cupcakes! Wow, our table is full of delicious treats!',
  'Keranjangku penuh dengan 8 apel merah yang ranum!': 'My basket is full of 8 ripe red apples!',
  'Terima kasih banyak Budi! 3 apel ini akan aku cuci untuk kita makan.': 'Thank you so much Budi! I will wash these 3 apples for us to eat.',
  'Lihat balon-balonku, ada 7 balon warna-warni terbang tinggi!': 'Look at my balloons, there are 7 colorful balloons floating high!',
  'Wah Siti, 2 balonmu terlepas dan melayang ke awan!': 'Oh Siti, 2 of your balloons broke loose and drifted into the clouds!',
  'Ada 9 kue donat lezat di piring besar ini!': 'There are 9 delicious donuts on this big plate!',
  'Terima kasih Siti! 5 donat ini akan kubagikan ke teman-teman sekelas.': 'Thank you Siti! I will share these 5 donuts with our classmates.',
  'Hore! Kantongku berisi 10 koin bintang berkilau!': 'Hooray! My pouch has 10 sparkling star coins!',
  'Wah asyik sekali! 7 koin ini cukup untuk tiket kita berdua naik wahana!': 'Awesome! 7 coins are enough for both our ride tickets!',
  'Aku membaca 4 buku cerita petualangan minggu ini.': 'I read 4 adventure story books this week.',
  'Lihat balon kita berdua! Apakah jumlahnya sama ya?': 'Look at our balloons! Are they equal in number?',
  'Keranjang A berisi 9 apel, keranjang B berisi 6 apel.': 'Basket A has 9 apples, basket B has 6 apples.',
  'Aku punya 10 kelereng biru, Siti punya 7 kelereng merah.': 'I have 10 blue marbles, Siti has 7 red marbles.',
  'Ada 4 piring di meja, dan setiap piring berisi 2 cupcake!': 'There are 4 plates on the table, and each plate holds 2 cupcakes!',
  'Aku membuat 2 ikat bunga, masing-masing ada 5 tangkai bunga matahari!': 'I made 2 flower bunches, each with 5 bright sunflowers!',
  'Ada 3 kotak krayon baru! Masing-masing kotak berisi 4 batang krayon.': 'There are 3 new crayon boxes! Each box contains 4 colored crayons.',
  'Lihat ke langit! Ada 5 kelompok bintang, dan tiap kelompok ada 2 bintang emas!': 'Look at the sky! There are 5 star clusters, each having 2 golden stars!',
  'Aku punya 6 apel merah. Ayo kita bagi sama rata untuk 3 orang!': 'I have 6 red apples. Let us share them equally among 3 friends!',
  'Aku punya 10 kelereng. Aku ingin membaginya sama rata ke dalam 2 toples kaca.': 'I have 10 marbles. I want to divide them equally into 2 glass jars.',
  'Ada 9 permen buah manis! Ayo kita bagi sama banyak bertiga.': 'There are 9 sweet fruit candies! Let us share them equally among the three of us.',
  'Ada 12 bunga mawar segar! Kita bagi sama rata ke dalam 3 vas meja ya.': 'There are 12 fresh roses! Let us arrange them equally into 3 table vases.',
  'Lihat gerbang megah itu! Kita butuh menghitung kristal untuk membukanya!': 'Look at that grand gate! We need to count the crystals to open it!',
  'Jika 6 permataku dan 6 permatamu digabungkan, jembatan pelangi akan bersinar!': 'If my 6 gems and your 6 gems unite, the rainbow bridge will shine!',
  'Menara Barat memiliki 12 obor, Menara Timur memiliki 8 obor. Berapa selisihnya ya?': 'West Tower has 12 torches, East Tower has 8 torches. What is the difference?',
  'Ada 3 rak eliksir, dan setiap rak berisi 5 botol ramuan ajaib!': 'There are 3 elixir shelves, and each shelf holds 5 magic potion bottles!',
  'Hore! Kita berhasil membuka peti kerajaan! Ada 20 koin bintang untuk kita bagi berdua!': 'Hooray! We opened the royal chest! There are 20 star coins to share between us!',

  // Science Dialogues
  'Lihat ikan mas itu Siti! Lincah sekali mengibaskan sirip dan ekornya di air!': "Look at that goldfish Siti! It's so nimble wagging its fins and tail in the water!",
  'Ikan tidak memiliki paru-paru seperti kita, melainkan bernapas dengan insang!': 'Fish do not have lungs like us, instead they breathe with gills!',
  'Moo! Sapi itu suka sekali memakan rumput hijau yang segar!': 'Moo! That cow really loves eating fresh green grass!',
  'Selain sapi, kelinci dan kambing juga sahabat hewan pemakan tumbuhan!': 'Besides cows, rabbits and goats are also plant-eating animal friends!',
  'Budi, lihat kepompong ini! Dulu ia adalah seekor ulat kecil yang rajin makan daun!': 'Budi, look at this cocoon! It used to be a little caterpillar eating leaves!',
  'Hebat sekali! Ulat berubah menjadi kupu-kupu indah yang terbang bebas!': 'Amazing! A caterpillar transforms into a beautiful butterfly that flies freely!',
  'Lihat Siti, induk ayam sedang menjaga telur-telurnya agar tetap hangat!': 'Look Siti, the mother hen is keeping her eggs warm!',
  'Ciap-ciap! Anak ayam menetas dari telur yang sudah hangat!': 'Cheep cheep! The chick hatches from the warmed egg!',
  'Budi, daun hijau ini seperti dapur kecil bagi tanaman untuk memasak makanan!': 'Budi, this green leaf is like a little kitchen for the plant to make food!',
  'Wah, luar biasa! Daun memasak makanan dengan bantuan sinar matahari!': 'Wow, incredible! Leaves make food with the help of sunlight!',
  'Nyam! Buah apel ini berdaging tebal, manis, dan segar sekali!': 'Yum! This apple is juicy, sweet, and so fresh!',
  'Daging buah yang manis itu melindungi biji di dalamnya agar kelak bisa tumbuh menjadi pohon baru!': 'The sweet fruit pulp protects the seeds inside so they can grow into new trees!',
  'Aku siram air sedikit setiap pagi dan letakkan pot di dekat jendela yang terkena matahari.': 'I water it a little each morning and place the pot by the sunny window.',
  'Hore! Biji kita sudah bertunas dan mulai memiliki daun kecil!': 'Hooray! Our seed has sprouted and grown little leaves!',
  'Batang pohon ini sangat kokoh! Angin kencang pun tidak bisa merobohkannya!': 'This tree trunk is so strong! Even strong winds cannot knock it down!',
  'Batang berfungsi menopang ranting dan mengalirkan air dari akar ke seluruh daun!': 'The trunk supports branches and transports water from the roots to all leaves!',
  'Budi, lihat ke arah langit timur! Ada lengkungan warna-warni yang sangat indah!': 'Budi, look towards the eastern sky! There is a stunning colorful rainbow!',
  'Pelangi muncul karena sinar matahari menyinari butir-butir air hujan yang halus!': 'A rainbow appears because sunlight shines through fine raindrops!',
  'Hembusan anginnya terasa sejuk di kulit dan membuat layang-layangku terbang tinggi!': 'The cool breeze feels refreshing on our skin and makes my kite fly high!',
  'Angin tidak bisa kita lihat, tapi bisa kita rasakan gerakannya saat menerpa daun dan kincir!': 'We cannot see the wind, but we can feel it move leaves and pinwheels!',
  'Bulan purnama malam ini bundar terang sekali seperti lampu raksasa di langit!': "Tonight's full moon is so bright and round like a giant lamp in the sky!",
  'Bulan seperti cermin raksasa yang memantulkan sinar mentari ke bumi kita!': 'The moon is like a giant mirror reflecting sunlight to our Earth!',
  'Lihat, sisi bola dunia yang terkena lampu menjadi terang benderang!': 'Look, the side of the globe facing the light turns bright!',
  'Bumi berputar terus sepanjang hari, itulah sebabnya ada pergantian siang dan malam!': 'The Earth spins continuously, which is why we have day and night!',
  'Planet Bumi sangat indah! Warna birunya berasal dari lautan luas yang melimpah!': 'Planet Earth is so gorgeous! Its blue color comes from vast oceans!',
  'Wuuush! Roket melesat kencang membawa penjelajah antariksa menuju stasiun luar angkasa!': 'Whoosh! The rocket blasts off carrying space explorers to the space station!',
  'Dengan kedua mataku, aku bisa melihat indahnya bunga dan membaca buku-buku pelajaran yang seru!': 'With my two eyes, I can see colorful flowers and read exciting books!',
  'Ssst, dengarkan! Telingaku menangkap suara kicauan burung yang sangat merdu!': 'Shh, listen! My ears catch the lovely chirping of birds!',
  'Hmmm harum sekali! Hidungku mencium aroma roti cokelat manis yang baru matang!': 'Mmm smells wonderful! My nose smells freshly baked chocolate bread!',
  'Madu rasanya manis sekali! Tapi kalau jeruk nipis terasa asam segar di lidah!': 'Honey tastes so sweet! But lime tastes pleasantly sour on the tongue!',
  'Bulu anak kucing ini sangat lembut! Telapak tanganku bisa merasakannya dengan jelas.': "This kitten's fur is so soft! My palms can feel it clearly.",
  'Batu, pensil, dan buku ini bentuknya tetap sama di mana pun diletakkan!': 'Stones, pencils, and books keep their shape wherever they are placed!',
  'Lihat Budi, saat kutuang ke mangkuk, air ini berubah bentuk menjadi seperti mangkuk!': "Look Budi, when poured into a bowl, this water takes the bowl's shape!",
  'Fuuuh! Balon ini mengembang besar karena terisi oleh udara gas di dalamnya!': 'Phew! This balloon expands big because it is filled with gas air inside!',
  'Lihat es batuku, Siti! Lama-lama mengecil dan berubah menjadi genangan air!': 'Look at my ice cube, Siti! It gradually melts into a puddle of water!',
  'Hebat! Daun mengapung di permukaan air, sedangkan batu tenggelam ke dasar!': 'Great! The leaf floats on the water surface, while the rock sinks to the bottom!',
  'Klip! Penjepit kertas besi ini langsung tertarik kuat menempel pada magnetku!': 'Click! This iron paperclip snaps right onto my magnet!',
  'Klik! Lampu senter ini menjadi sumber cahaya sehingga lorong gelap jadi terlihat jelas!': 'Click! This flashlight provides light so the dark hallway becomes clear!',
  'Lihat Budi, saat tanganku membentuk sayap burung, bayanganku di dinding juga seperti burung terbang!': 'Look Budi, when my hand forms a bird shape, its shadow on the wall also looks like a flying bird!',
  'Panas matahari sangat bermanfaat untuk membantu mengeringkan pakaian basah kita!': 'Solar heat is so useful for drying our wet laundry!',
  'Hore! Kita telah menyelesaikan semua misi sains! Mari kita jaga bumi kita dengan penuh cinta!': "Hooray! We finished all science missions! Let's protect our Earth with love!",

  // Feedback Messages
  'Belum tepat. Tidak apa-apa, yuk coba hitung lagi ya!': "Not quite right yet. That's okay, let's count again together!",
  'Masih belum tepat. Buka Petunjuk di bawah untuk membantu kamu!': "Still not quite right. Open the hint below to guide you!",
  'Yuk coba kita lihat Cerita Remedial singkat bersama Budi!': "Let's review the quick remedial story with Budi!",
};

/**
 * Translates Indonesian educational story text, narration, dialogue, or questions into natural English.
 */
export function translateStoryToEnglish(text: string): string {
  if (!text) return '';
  const trimmed = text.trim();

  // 1. Direct dictionary match
  if (DICTIONARY_MAP[trimmed]) {
    return DICTIONARY_MAP[trimmed];
  }

  // 2. Feedback pattern matches
  if (trimmed.startsWith('Hebat sekali! Jawabanmu benar!')) {
    const explanation = trimmed.replace(/^Hebat sekali! Jawabanmu benar!\s*/, '');
    return `Awesome job! Your answer is correct! ${translateStoryToEnglish(explanation)}`;
  }

  // 3. Question pattern matches
  if (/^Berapa banyak buah apel merah yang ada/i.test(trimmed)) {
    return 'How many red apples are in front of Budi?';
  }
  if (/^Berapa banyak balon pesta warna-warni/i.test(trimmed)) {
    return 'How many colorful party balloons are floating in the park?';
  }
  if (/^Berapakah jumlah kue cupcake lezat/i.test(trimmed)) {
    return 'What is the total number of delicious cupcakes on the tray?';
  }
  if (/^Berapa tangkai bunga matahari yang mekar/i.test(trimmed)) {
    return 'How many sunflowers are blooming in the garden?';
  }
  if (/^Berapa banyak bintang berkilau yang bersinar/i.test(trimmed)) {
    return 'How many sparkling stars are shining in the night sky?';
  }
  if (/^Berapakah total buah segar Budi dan Siti jika digabungkan/i.test(trimmed)) {
    return 'What is the total number of fresh fruits if Budi and Siti combine them?';
  }
  if (/^Ada 5 balon merah dan 3 balon biru\. Berapakah jumlah seluruh balon/i.test(trimmed)) {
    return 'There are 5 red balloons and 3 blue balloons. How many balloons in total?';
  }
  if (/^Berapa banyak seluruh buku cerita yang ada di atas meja/i.test(trimmed)) {
    return 'How many story books are there on the table in total?';
  }
  if (/^Jika 6 mawar digabung dengan 4 melati/i.test(trimmed)) {
    return 'If 6 roses are combined with 4 jasmines, how many flowers are in the vase?';
  }
  if (/^Berapakah jumlah seluruh cupcake di atas meja/i.test(trimmed)) {
    return 'How many cupcakes are on the table if 5 chocolate cupcakes are added to 5 strawberry cupcakes?';
  }
  if (/^Berapa butir sisa kelereng Budi sekarang/i.test(trimmed)) {
    return 'How many marbles does Budi have left now?';
  }
  if (/^Awalnya ada 8 apel di keranjang/i.test(trimmed)) {
    return 'There were 8 apples in the basket. After 3 apples were given to Siti, how many apples remain?';
  }
  if (/^Dari 7 balon gas yang dipegang Siti/i.test(trimmed)) {
    return 'Out of 7 gas balloons Siti held, 2 drifted away. How many balloons does Siti still hold?';
  }
  if (/^Dari 9 kue donat di piring/i.test(trimmed)) {
    return 'Out of 9 donuts on the plate, 5 were shared. How many donuts are left?';
  }
  if (/^Awalnya Budi memiliki 10 koin bintang/i.test(trimmed)) {
    return 'Budi had 10 star coins. After spending 7 coins on ride tickets, how many coins does Budi have left?';
  }
  if (/^Siapakah yang memiliki bintang emas lebih banyak/i.test(trimmed)) {
    return 'Who has more golden stars?';
  }
  if (/^Budi membaca 4 buku dan Siti membaca 7 buku/i.test(trimmed)) {
    return 'Budi read 4 books and Siti read 7 books. Who read FEWER books?';
  }
  if (/^Budi memegang 6 balon dan Siti memegang 6 balon/i.test(trimmed)) {
    return 'Budi holds 6 balloons and Siti holds 6 balloons. How does the number of balloons compare?';
  }
  if (/^Keranjang manakah yang berisi buah apel LEBIH BANYAK/i.test(trimmed)) {
    return 'Which basket contains MORE apples?';
  }
  if (/^Berapa butir kelereng Budi LEBIH BANYAK daripada kelereng Siti/i.test(trimmed)) {
    return 'How many more marbles does Budi have compared to Siti?';
  }
  if (/^Jika ada 3 keranjang dan tiap keranjang berisi 3 apel/i.test(trimmed)) {
    return 'If there are 3 baskets and each holds 3 apples, what is the total number of apples?';
  }
  if (/^Jika ada 4 piring dan setiap piring berisi 2 cupcake/i.test(trimmed)) {
    return 'If there are 4 plates and each holds 2 cupcakes, what is the total number of cupcakes?';
  }
  if (/^Berapakah jumlah seluruh tangkai bunga matahari pada 2 ikatan/i.test(trimmed)) {
    return 'What is the total number of sunflowers in the 2 bunches?';
  }
  if (/^Jika ada 3 kotak dan tiap kotak berisi 4 krayon/i.test(trimmed)) {
    return 'If there are 3 boxes and each box has 4 crayons, how many crayons in total?';
  }
  if (/^Berapakah jumlah seluruh bintang keberuntungan/i.test(trimmed)) {
    return 'How many lucky stars are there if there are 5 pairs and each pair has 2 stars?';
  }
  if (/^Jika 8 kue dibagi sama rata untuk Budi dan Siti/i.test(trimmed)) {
    return 'If 8 cakes are shared equally between Budi and Siti (2 people), how many cakes does each get?';
  }
  if (/^Jika 6 buah apel dibagi sama rata untuk 3 anak/i.test(trimmed)) {
    return 'If 6 apples are shared equally among 3 children, how many apples does each child receive?';
  }
  if (/^Jika 10 butir kelereng dibagi sama rata ke dalam 2 toples/i.test(trimmed)) {
    return 'If 10 marbles are divided equally into 2 glass jars, how many marbles are in each jar?';
  }
  if (/^Jika 9 permen dibagi sama rata untuk 3 anak/i.test(trimmed)) {
    return 'If 9 candies are shared equally among 3 children, how many candies does each child get?';
  }
  if (/^Berapakah tangkai bunga yang ada di setiap vas jika 12 bunga dibagi sama rata/i.test(trimmed)) {
    return 'How many flowers are in each vase if 12 flowers are divided equally into 3 vases?';
  }
  if (/^Ada 15 kristal bintang bercahaya/i.test(trimmed)) {
    return 'There are 15 glowing star crystals. If 7 crystals are used to unlock the gate, how many remain?';
  }
  if (/^Berapakah total permata suci yang terkumpul/i.test(trimmed)) {
    return 'What is the total number of sacred gems gathered on the rainbow bridge altar?';
  }
  if (/^Berapa obor lebih banyak yang dimiliki oleh Menara Barat/i.test(trimmed)) {
    return 'How many more torches does the West Tower (12 torches) have than the East Tower (8 torches)?';
  }
  if (/^Berapakah total seluruh botol ramuan ajaib/i.test(trimmed)) {
    return 'What is the total number of magic potion bottles arranged on the 3 shelves?';
  }
  if (/^Jika 20 koin bintang dibagi sama rata berdua/i.test(trimmed)) {
    return 'If 20 star coins are divided equally between Budi and Siti, how many coins does each hero receive?';
  }

  // 4. Default clean fallback (returns translated English or trimmed text)
  return trimmed;
}
