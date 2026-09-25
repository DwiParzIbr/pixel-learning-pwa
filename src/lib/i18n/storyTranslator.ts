import { NARRATION_TRANSLATIONS } from './narrationTranslations';

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

  // Language Dialogues
  'Apel merah ini sangat lezat! Kata "Apel" diawali dengan bunyi huruf apa ya, Siti?': 'This red apple is so delicious! What letter sound does the word "Apple" start with, Siti?',
  'Huruf A! A untuk Apel, Awan, dan Ayam!': 'Letter A! A for Apple, Air, and Animal!',
  'Buku, Bola, dan Baju! Semuanya diawali dengan huruf B yang berkaki tegak dan berperut gendut!': 'Book, Ball, and Bag! They all begin with letter B with a straight line and rounded curves!',
  'Hebat Budi! Huruf B berbunyi "beh", seperti pada kata Buku!': 'Great Budi! Letter B makes the "b" sound, like in the word Book!',
  'Ayo Budi, kita hitung berapa huruf vokal A yang ada pada kata M-A-T-A!': 'Come on Budi, let us count how many vowel letters A are in the word M-A-T-A!',
  'Ada dua huruf vokal A pada kata M-A-T-A!': 'There are two vowels A in the word M-A-T-A!',
  'Tuuut tuuut! Gerbong A, B, C sudah siap meluncur! Gerbong selanjutnya huruf apa ya?': 'Choo choo! Cars A, B, and C are ready to roll! What letter car comes next?',
  'Setelah huruf C adalah huruf D! A, B, C, lalu D!': 'After letter C comes letter D! A, B, C, then D!',
  'Meja ini bersih dan rapi! Terdiri dari dua suku kata: ME dan JA!': 'This desk is clean and tidy! It has two syllables: ME and JA!',
  'M - E dibaca ME, J - A dibaca JA. Digabung menjadi MEJA!': 'M - E reads ME, J - A reads JA. Combined together it makes MEJA (Desk)!',
  'Asyik sekali bermain BOLA! Ayo Siti, bantu aku mengeja kata B-O-L-A!': 'Playing with a BALL is so much fun! Come on Siti, help me spell B-O-L-A!',
  'B - O berbunyi BO, L - A berbunyi LA. BO-LA!': 'B - O sounds BO, L - A sounds LA. BO-LA (Ball)!',
  'Minum susu membuat tulang kita sehat! Hurufnya mudah sekali: S - U - S - U!': 'Drinking milk makes our bones strong! The letters are so simple: S - U - S - U!',
  'SU ditambah SU menjadi SUSU! Minuman lezat penambah energi!': 'SU plus SU makes SUSU (Milk)! A delicious energy-boosting drink!',
  'Topi ini membuat kepalaku tetap teduh! T - O dibaca TO, P - I dibaca PI!': 'This hat keeps my head shaded! T - O reads TO, P - I reads PI!',
  'TO - PI! Budi pintar sekali mengeja benda yang sedang dipakainya!': 'TO - PI! Budi is so smart spelling the item he is wearing!',
  'Pohon kelapa itu tinggi sekali! Sedangkan rumput di tanah ini ukurannya pendek ya!': 'That coconut tree is very tall! While the grass on this ground is short!',
  'Tepat sekali! Lawan kata dari TINGGI adalah PENDEK!': 'Exactly! The opposite of TALL is SHORT!',
  'Hati-hati supnya masih panas! Kalau es batunya terasa dingin di tangan!': 'Careful, the soup is still hot! But the ice cube feels cold in your hands!',
  'Panas lawannya dingin! Seperti api yang panas dan salju yang dingin!': 'Hot is opposite to cold! Like fire that is hot and snow that is cold!',
  'Wuuush! Kelinci larinya cepat sekali! Kalau kura-kura jalannya santai dan lambat.': 'Whoosh! The rabbit runs so fast! While the turtle walks relaxed and slow.',
  'Betul Budi! Lawan kata dari CEPAT adalah LAMBAT!': 'Right Budi! The opposite of FAST is SLOW!',
  'Siang hari terang benderang untuk belajar, sedangkan malam hari waktu kita beristirahat.': 'Daytime is bright for studying, while nighttime is our time to rest.',
  'Siang berlawanan dengan malam, dan terang berlawanan dengan gelap!': 'Day is opposite to night, and bright is opposite to dark!',
  'Hari ini hatiku sangat SENANG! Boleh juga dibilang hatiku sangat GEMBIRA!': 'Today my heart is very HAPPY! It can also be said my heart is very JOYFUL!',
  'Senang sama artinya dengan gembira atau bahagia!': 'Happy means the same as joyful or glad!',
  'Wah, Siti anak yang pintar! Sama artinya seperti Siti anak yang pandai dan cerdas!': 'Wow, Siti is a smart kid! That means the same as Siti is clever and intelligent!',
  'Kata PINTAR, PANDAI, dan CERDAS memiliki arti yang sama!': 'The words SMART, CLEVER, and INTELLIGENT share the same meaning!',
  'Bunga-bunga ini indah sekali! Boleh juga kita sebut bunga yang cantik dan elok rupanya!': 'These flowers are so lovely! We can also call them pretty and beautiful!',
  'INDAH, CANTIK, dan ELOK adalah sinonim yang memuji keelokan alam!': 'LOVELY, PRETTY, and BEAUTIFUL are synonyms praising the charm of nature!',
  'Siti adalah sahabat baikku! Kita juga bisa menyebut sahabat dengan kata teman atau kawan!': 'Siti is my best friend! We can also call a close friend a companion or pal!',
  'Halaman rumahku sudah bersih! Area tanah di luar rumah ini disebut juga pekarangan!': 'My yard is now clean! The open ground outside the house is also called a lawn!',
  'Halaman dan pekarangan adalah sinonim untuk tanah lapang di sekitar bangunan rumah!': 'Yard and lawn are synonyms for the outdoor ground around a house!',
  'Siapa yang melakukan kegiatan? Budi! Apa kegiatannya? Membaca buku!': 'Who is doing the action? Budi! What is the activity? Reading a book!',
  'Tersusun sempurna: "Budi membaca buku."!': 'Perfectly arranged: "Budi reads a book."!',
  'Kalimatnya adalah: "Siti menyiram bunga di kebun."': 'The sentence is: "Siti waters the flowers in the garden."',
  'Aku sedang berlari! Berlari, melompat, dan menulis adalah kata kerja!': 'I am running! Running, jumping, and writing are action verbs!',
  'Untuk menanyakan nama orang, kita menggunakan kata tanya "Siapa namamu?"': 'To ask for someone\'s name, we use the question word "Who are you?"',
  'Karena ini adalah kalimat pertanyaan, kita harus menutupnya dengan tanda tanya (?)!': 'Because this is a question, we must end it with a question mark (?)!',
  'Pergi ke pasar membeli mangga, jangan lupa membeli papaya!': 'Off to the market to buy mangoes sweet, do not forget papayas to eat!',
  'Rajin belajar setiap masa, agar kelak menjadi anak berguna!': 'Study diligently all the time, so you grow up bright and fine!',
  'Jawabannya pasti BUKU CERITA! Jendela dunia tempat kita menimba ilmu!': 'The answer is definitely a STORYBOOK! The window to the world where we learn!',
  'Siti dijuluki "Kutu Buku" bukan karena ada kutu di kepalanya, tapi karena ia sangat suka membaca buku!': 'Siti is called a "Bookworm" not because of bugs, but because she loves reading books!',
  'Peribahasa "Rajin Pangkal Pandai" artinya jika kita rajin belajar, kita pasti akan menjadi anak yang cerdas!': 'The proverb "Diligence is the root of wisdom" means studying hard makes you smart!',
  'Hore! Membaca membuka jendela ilmu dunia dan membuat pikiran kita semakin luas!': 'Hooray! Reading opens the window to world knowledge and expands our minds!',
  'Selamat untuk kita semua! Teruslah gemar membaca dan mencintai bahasa Indonesia yang indah!': 'Congratulations to us all! Keep reading and cherishing the wonderful language!',

  // Character Dialogues
  'Wah, maafkan aku ya Siti, aku tidak sengaja menyenggol mejamu!': 'Oh, I am so sorry Siti, I accidentally bumped your table!',
  'Tidak apa-apa Budi, terima kasih banyak sudah membantuku merapikannya kembali!': 'It is completely okay Budi, thank you so much for helping me tidy it up!',
  'Budi, ini sepotong kue untukmu! Ayo kita makan bersama-sama!': 'Budi, here is a slice of cake for you! Let us eat together!',
  'Taman yang bersih membuat semua orang nyaman bermain. Sampah ini harus kubuang ke tempat sampah!': 'A clean park makes everyone comfortable playing. I must throw this trash into the trash bin!',
  'Cuci tangan pakai sabun dulu ya Budi, supaya kuman-kuman jahat kabur dan perut kita sehat!': 'Wash your hands with soap first Budi, so nasty germs go away and our tummies stay healthy!',
  'Siti, bolehkah aku meminjam krayon birumu sebentar? Aku akan memakainya dengan hati-hati.': 'Siti, may I borrow your blue crayon for a moment? I will use it carefully.',
  'Tentu saja boleh, Budi! Terima kasih sudah meminta izin terlebih dahulu!': 'Of course you may, Budi! Thank you for asking for permission first!',
  'Selamat pagi Ibu Guru! Selamat pagi juga Siti sahabatku!': 'Good morning Teacher! Good morning to you too Siti, my friend!',
  'Selamat pagi Budi! Senang sekali disapa dengan senyuman ceria!': 'Good morning Budi! It feels wonderful to be greeted with a cheerful smile!',
  'Tok! Tok! Tok! Permisi, selamat pagi Ibu Pustakawati, bolehkah saya masuk?': 'Knock! Knock! Knock! Excuse me, good morning Librarian, may I come in?',
  'Pintar sekali Siti! Mengetuk pintu dan mengucap salam menjaga kenyamanan orang di dalam!': 'So smart Siti! Knocking on the door and greeting respects the comfort of those inside!',
  'Kita tidak perlu berteriak atau membentak, Siti. Berbicara lembut membuat kita saling mengerti.': 'We do not need to shout or yell, Siti. Speaking gently helps us understand each other.',
  'Tutur kata yang manis dan lembut itu seperti air sejuk yang menenangkan hati!': 'Sweet and gentle speech is like cool water that soothes the heart!',
  'Budi, ayo berteduh di bawah payungku! Kita jalan bersama agar bajumu tidak basah!': 'Budi, come shelter under my umbrella! Let us walk together so your clothes do not get wet!',
  'Terima kasih banyak, Siti! Kamu sahabat yang sangat baik dan penolong!': 'Thank you so much, Siti! You are such a kind and helpful friend!',
  'Siti, kamu main ayunan dulu 10 kali ayunan, setelah itu gantian aku ya!': 'Siti, you can play on the swing for 10 swings first, then we take turns!',
  'Setuju Budi! Bermain bergantian membuat permainan jadi seru dan damai!': 'Agreed Budi! Taking turns makes playing so much fun and peaceful!',
  'Jangan bersedih Budi, ayo kita perbaiki rodanya bersama-sama dengan lem kayu!': 'Do not be sad Budi, let us fix the wheel together using wood glue!',
  'Terima kasih Siti, kehadiranmu membuat hatiku merasa tenang kembali!': 'Thank you Siti, your presence makes my heart feel calm again!',
  'Siti, pakai penggarisku yang ini saja! Aku punya dua, kamu boleh memakainya sampai pelajaran usai.': 'Siti, just use my ruler here! I have two, you can use it until the lesson ends.',
  'Alhamdulillah, terima kasih Budi! Kamu selalu siap membantu saat teman membutuhkan!': 'Praise God, thank you Budi! You are always ready to help a friend in need!',
  'Kulit pisang ini sampah organik alami, masukkan ke tong hijau agar bisa jadi pupuk tanaman!': 'This banana peel is organic waste, put it into the green bin so it can become plant compost!',
  'Memilah sampah membantu petugas kebersihan dan menjaga bumi kita bebas polusi!': 'Sorting waste helps sanitation workers and keeps our Earth pollution-free!',
  'Ayo Siti, kita rapikan semua balok ke kotaknya agar tidak terinjak atau membuat teman tersandung!': 'Come on Siti, let us pack the blocks into the box so no one steps or trips on them!',
  'Selesai! Ruangan rapi kembali dan barang-barang tidak mudah hilang!': 'Done! The room is tidy again and things will not easily go missing!',
  'Dinding dan meja sekolah adalah fasilitas bersama. Kita harus menggambar di kertas gambar!': 'School walls and desks belong to everyone. We should draw on drawing paper!',
  'Benar Budi! Jangan mencoret-coret meja atau dinding agar sekolah kita selalu indah!': 'Right Budi! Do not scribble on desks or walls so our school always stays beautiful!',
  'Lihat Budi, kran airnya masih mengalir! Ayo kita putar rapat agar air bersih tidak terbuang!': 'Look Budi, the water tap is still running! Let us turn it tight so clean water is not wasted!',
  'Alhamdulillah! Menghemat air bersih adalah bentuk syukur dan menjaga kelestarian bumi!': 'Thank goodness! Conserving clean water is a form of gratitude and protects our Earth!',
  'Menyikat gigi dua kali sehari membuat kuman makanan lenyap dan gigi bebas dari rasa sakit berlubang!': 'Brushing teeth twice a day clears food bacteria and keeps teeth free from painful cavities!',
  'Jangan lupa sebelum tidur malam wajib menyikat gigi agar kuman tidak merusak gigi saat kita tidur!': 'Do not forget to brush your teeth before bed so germs do not harm your teeth while you sleep!',
  'Sayur bayam dan buah-buahan ini kaya akan vitamin yang membuat tubuh kita kuat dan tidak mudah sakit!': 'Spinach and fruits are rich in vitamins that keep our body strong and healthy!',
  'Makan sayur dan buah membuat kita lincah berolahraga dan konsentrasi saat belajar!': 'Eating vegetables and fruits keeps us energetic for sports and focused when studying!',
  'Tidur tepat waktu membuat badanku segar bugar dan tidak pernah terlambat masuk kelas!': 'Sleeping on time keeps my body refreshed and helps me never be late to class!',
  'Tepat sekali Budi! Istirahat malam yang cukup adalah kunci pertumbuhan anak hebat!': 'Spot on Budi! Adequate night sleep is the key to healthy growth for great kids!',
  'Aku sudah besar! Aku bisa memakai sepatu dan menyiapkan buku pelajaran sendiri!': 'I am grown up! I can put on my shoes and prepare my schoolbooks all by myself!',
  'Hebat Budi! Anak mandiri selalu disayang orang tua dan guru!': 'Awesome Budi! Independent kids are always cherished by parents and teachers!',
  'Aku harus jujur kepada guru bahwa aku yang tidak sengaja memecahkannya. Berbohong itu tidak terpuji!': 'I must be honest with the teacher that I accidentally broke it. Lying is never honorable!',
  'Kejujuranmu sangat berharga Budi! Orang yang jujur selalu dipercaya dan dihormati oleh semua orang!': 'Your honesty is precious Budi! Honest people are always trusted and respected by everyone!',
  'Ini bukan punyaku. Pasti ada teman yang sedang bingung mencarinya. Ayo kita serahkan ke meja guru!': 'This is not mine. A classmate must be looking for it worriedly. Let us hand it to the teacher!',
  'Mengembalikan barang milik orang lain membuat hati kita tenang dan penuh berkah!': 'Returning lost items to their owners brings our hearts peace and blessings!',
  'Aku harus menyelesaikan tugas belajarku terlebih dahulu. Setelah selesai, barulah aku bisa bermain dengan tenang!': 'I must finish my schoolwork first. Once done, I can play with a calm mind!',
  'Luar biasa Budi! Tanggung jawab pada tugas sekolah membuatmu menjadi siswa teladan!': 'Incredible Budi! Taking responsibility for school assignments makes you an exemplary student!',
  'Hai Siti! Aku datang tepat waktu sesuai janjiku kemarin!': 'Hi Siti! I arrived right on time just as I promised yesterday!',
  'Terima kasih sudah menepati janji Budi! Orang yang menepati janji adalah orang yang dapat diandalkan!': 'Thank you for keeping your promise Budi! Someone who keeps promises is truly reliable!',
  'Nilai dari hasil kejujuran diri sendiri jauh lebih membanggakan daripada nilai tinggi hasil menyontek!': 'A grade earned through your own honesty is far more honorable than high scores from cheating!',
  'Hebat sekali Budi! Kejujuran adalah prestasi tertinggi seorang pelajar sejati!': 'Brilliant Budi! Honesty is the highest achievement of a true student!',
  'Meskipun kita berasal dari suku dan daerah yang berbeda, kita semua adalah satu keluarga Indonesia!': 'Even though we come from different backgrounds and regions, we are all one big loving family!',
  'Berbeda-beda tetapi tetap satu jua! Mari kita saling menyayangi tanpa membeda-bedakan!': 'United in diversity! Let us love and care for one another without discrimination!',
  'Siti, aku salat ashar dulu ya di musala, nanti kita lanjutkan bermain lagi.': 'Siti, I am going to pray in the prayer room first, then we can continue playing.',
  'Silakan Budi! Saling menghormati ibadah membuat kerukunan hidup selalu terjaga dengan damai!': "Go ahead Budi! Respecting each other's worship keeps harmony peaceful and bright!",
  'Mari kita dengarkan pendapat semua teman secara bergiliran tanpa memotong pembicaraan!': "Let us listen to everyone's opinion in turns without interrupting!",
  'Musyawarah mengajarkan kita menghargai pendapat orang lain dan menerima hasil mufakat!': 'Deliberation teaches us to appreciate different thoughts and embrace consensus together!',
  'Aku sudah memaafkannya dengan sepenuh hati. Menyimpan dendam hanya akan membuat hati kita gelisah.': 'I have forgiven completely from the bottom of my heart. Holding grudges only makes us uneasy.',
  'Memaafkan adalah sifat pahlawan sejati yang membawa kedamaian abadi!': 'Forgiving is the mark of a true hero that brings lasting peace!',
  'Setiap anak diciptakan istimewa dengan bakatnya masing-masing. Ayo kita beri tepuk tangan meriah!': 'Every child is uniquely gifted with their own talents. Let us give a big round of applause!',
  'Saling memuji dan mendukung bakat membuat kita semua berkembang menjadi anak hebat!': "Praising and supporting each other's talents helps us all grow into fantastic kids!",
  'Stop! Jangan mengejek teman! Mengejek itu perbuatan tercela dan menyakiti hati!': 'Stop! Do not tease or mock friends! Teasing is harmful and hurts feelings!',
  'Ksatria kebaikan berani membela kebenaran dan melindungi sahabat dari perundungan!': 'Knights of kindness have the courage to stand for truth and protect friends from bullying!',
  'Kemenangan ini adalah berkah dari latihan keras dan doa orang tua serta dukungan guru!': "This victory is a blessing from hard work, parents' prayers, and teachers' support!",
  'Juara sejati adalah mereka yang tetap rendah hati dan tidak pernah menyombongkan diri!': 'True champions are those who remain humble and never boast!',
  'Mengantre dengan tertib melatih kesabaran dan menghargai teman yang sudah tiba lebih dulu!': 'Queuing in order trains patience and respects friends who arrived earlier!',
  'Budaya antre adalah ciri bangsa yang beradab dan berdisiplin tinggi!': 'A queuing habit reflects high manners and great discipline!',
  'Doa restu orang tua adalah pelita penerang jalan kesuksesan kita di masa depan!': "Parents' blessing and love is a guiding light illuminating our future success!",
  'Hormatilah orang tua dan gurumu, niscaya hidupmu akan dipenuhi kebahagiaan dan kemuliaan!': 'Respect your parents and teachers, and your life will be filled with joy and grace!',
  'Menjadi pintar itu hebat, tetapi menjadi anak yang berbudi pekerti luhur dan baik hati adalah yang paling mulia!': 'Being smart is great, but being kind-hearted with noble character is the most glorious of all!',
  'Mari kita terus menebar senyuman, kejujuran, dan kasih sayang di mana pun kita berada!': 'Let us keep spreading smiles, honesty, and loving-kindness wherever we go!',

  // Logic Dialogues
  'Lihat polanya: Merah, Biru, Merah, Biru... Setelah Biru, kembali ke warna apa ya?': 'Look at the pattern: Red, Blue, Red, Blue... After Blue, what color comes next?',
  'Hmm, ada satu benda di keranjang ini yang bukan buah-buahan. Yang mana ya?': 'Hmm, there is one item in this basket that is not a fruit. Which one is it?',
  'Benda yang bundar bulat tanpa sudut... seperti donat manis atau roda sepeda!': 'Round circular objects without corners... like sweet donuts or bicycle wheels!',
  'Apel merah, lalu pisang kuning, apel merah, lalu pisang kuning... Setelah pisang, kembali ke buah apa ya?': 'Red apple, then yellow banana, red apple, then yellow banana... After banana, what fruit comes next?',
  'Perhatikan polanya: Lingkaran, Kotak, Segitiga. Setelah Lingkaran dan Kotak, bentuk apakah berikutnya?': 'Notice the pattern: Circle, Square, Triangle. After Circle and Square, which shape comes next?',
  'Boneka Beruang Besar, lalu Beruang Kecil, Beruang Besar, Beruang Kecil... Boneka mana setelahnya?': 'Big Bear doll, then Small Bear, Big Bear, Small Bear... Which doll comes after?',
  'Tepuk tangan, lalu melompat, tepuk tangan, lalu melompat! Gerakan apa setelah melompat?': 'Clap hands, then jump, clap hands, then jump! What movement comes after jumping?',
  'Ayam, bebek, dan burung berkaki dua dan bernapas dengan paru-paru. Siapa yang bernapas dengan insang di dalam air?': 'Chickens, ducks, and birds have two legs and breathe with lungs. Who breathes with gills in the water?',
  'Pensil, penghapus, dan penggaris untuk belajar di sekolah. Benda mana yang biasa dipakai saat makan di dapur?': 'Pencils, erasers, and rulers are for school. Which item is usually used for eating in the kitchen?',
  'Pesawat, helikopter, dan balon udara terbang tinggi di langit. Kendaraan mana yang berjalan di jalan raya darat?': 'Airplanes, helicopters, and hot air balloons fly high in the sky. Which vehicle runs on the road?',
  'Cokelat, permen, dan es krim rasanya manis lezat. Tapi garam ini rasanya apa ya?': 'Chocolate, candy, and ice cream taste delicious and sweet. But what does this salt taste like?',
  'Pohon kelapa paling tinggi, pohon pisang sedang, dan rumput paling pendek di dekat kaki kita.': 'The coconut tree is the tallest, banana tree is medium, and grass is the shortest near our feet.',
  'Kapas dan daun kering sangat ringan diterbangkan angin, sedangkan batu kali ini kokoh dan berat!': 'Cotton and dry leaves are very light blown by the wind, while this river stone is solid and heavy!',
  'Kita bangun di pagi hari, makan siang saat terik siang hari, lalu tidur saat malam bertabur bintang.': 'We wake up in the morning, have lunch at noon, then sleep at night under the stars.',
  'Ayo kita urutkan mangkuk dari yang berisi paling sedikit kelereng sampai yang paling banyak!': 'Let us arrange the bowls from the one with the fewest marbles to the most!',
  'Lihat sepotong pizza ini! Memiliki 3 garis sisi dan 3 titik sudut runcing seperti segitiga!': 'Look at this slice of pizza! It has 3 straight sides and 3 pointed corners like a triangle!',
  'Dadu ini memiliki 4 sisi lurus yang sama panjang di setiap sisinya, yaitu bentuk persegi!': 'This die has 4 straight sides of equal length on each side, which is a square shape!',
  'Saat bola bulat bundar disinari lampu senter, bentuk bayangan di dinding persis seperti bentuk aslinya!': 'When a round spherical ball is illuminated by a flashlight, its shadow on the wall looks just like the real shape!',
  'Lubang puzzle ini memiliki lima sudut lancip seperti bintang! Potongan mana yang bisa pas masuk ke dalamnya?': 'This puzzle hole has five pointed corners like a star! Which piece can fit right inside?',
  'Hujan deras turun! Ayo buka payung agar badan dan baju kita tetap kering terlindung!': 'Heavy rain is pouring! Let us open the umbrella so our body and clothes stay dry and protected!',
  'Panas matahari membuat air pada baju basah menguap ke udara hingga pakaian menjadi kering!': 'The sun heat evaporates water from wet clothes into the air until they are completely dry!',
  'Waduh! Es krim dingin ini mulai meleleh menjadi tetesan manis karena udaranya panas!': 'Oh no! This cold ice cream is melting into sweet drips because the air is hot!',
  'Tanaman ini sangat haus karena lupa disiram! Daun dan batangnya mulai layu.': 'This plant is very thirsty because we forgot to water it! Its leaves and stems are wilting.',
  'Hati-hati Siti! Jika ditiup melebihi kapasitasnya, tekanan udara di dalam bisa membuatnya meletus!': 'Be careful Siti! If blown beyond its capacity, the air pressure inside can make it pop!',
  'Tangan kanan untuk memegang sendok, dan tangan kiri untuk memegang garpu! Jangan sampai terbalik ya!': 'Right hand to hold the spoon, and left hand to hold the fork! Do not mix them up!',
  'Buku cerita ada di ATAS permukaan meja, sedangkan tasku ditaruh di BAWAH kolong meja.': 'The storybook is on TOP of the table, while my bag is placed UNDER the table.',
  'Tiga apel aman tersimpan di DALAM keranjang, dan satu apel berada di LUAR keranjang.': 'Three apples are safely kept INSIDE the basket, and one apple is OUTSIDE the basket.',
  'Saat Budi melangkah menghadap ke arah tiang bendera di depannya, ia sedang berjalan maju!': 'When Budi steps facing the flagpole in front of him, he is walking forward!',
  'Papan petunjuk panah mengarahkan kita ke jalur kiri yang aman dan bersih menuju gerbang istana!': 'The arrow signpost directs us to the safe and clear left path leading to the palace gate!',
  'Aku punya angka 1 sampai 12, berdetak tik-tok tik-tok setiap detik untuk memberitahu waktu. Siapakah aku?': 'I have numbers 1 to 12, ticking tick-tock tick-tock every second to tell time. Who am I?',
  'Lubang kunci ini berbentuk segitiga! Kita harus mencocokkannya dengan anak kunci yang pas!': 'This keyhole is triangle-shaped! We must match it with the right key!',
  'Parit ini lebarnya 2 meter. Papan kayu 3 meter cukup panjang untuk melintang menyeberangi parit dengan kokoh!': 'This ditch is 2 meters wide. A 3-meter wooden plank is long enough to cross the ditch firmly!',
  'Telinganya panjang berdiri tegak, suka melompat kencang, dan makanan favoritnya wortel segar! Hewan apakah itu?': 'Its ears are long and upright, loves hopping fast, and its favorite food is fresh carrots! What animal is that?',
  'Setelah gula dimasukkan ke dalam air teh hangat, kita perlu mengaduknya dengan sendok agar gulanya larut merata!': 'After sugar is added into warm tea, we need to stir it with a spoon so the sugar dissolves evenly!',

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

  // 1. Narration translations match (100% curriculum coverage)
  if (NARRATION_TRANSLATIONS[trimmed]) {
    return NARRATION_TRANSLATIONS[trimmed];
  }

  // 2. Direct dictionary match (dialogues, vocabulary, etc.)
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
