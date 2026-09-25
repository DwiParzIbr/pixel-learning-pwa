# 🎮 AI Interactive Pixel Learning PWA

Aplikasi pembelajaran anak berbasis **interactive pixel story** yang menggabungkan visual pixel art 2D, animasi prosedural, narasi suara AI (Text-to-Speech Bahasa Indonesia), sound effect retro 8-bit, validasi matematika deterministik, adaptive remedial, sistem gamifikasi (XP, level, lencana), dashboard orang tua, dan Admin Content Studio.

---

## 🌟 Fitur Utama Sesuai Implementation Plan

### 1. 📖 Story First Learning Engine (`src/components/story-engine/`)
- **Pixel Art Canvas Renderer**: Menggunakan canvas HTML5 2D dengan scaling `image-rendering: pixelated` yang tajam dan responsif.
- **Karakter Pixel 2D Prosedural**:
  - Karakter **Budi** (kaos biru, celana pendek, rambut hitam) dan **Siti** (gaun merah muda, pita rambut).
  - Status emosi karakter: `idle` (napas membal), `walk` (ayunan langkah), `talk` (mulut bergerak sesuai dialog), `happy` / `celebrate` (melompat gembira dengan tangan terangkat), `think` (tangan di dagu dengan tanda tanya).
- **5 Lingkungan Pixel Interaktif**:
  - `park` (Taman Bunga: rumput, awan, matahari, pagar kayu, bunga mekar)
  - `forest` (Hutan Ajaib: pepohonan rindang, jamur, lantai hutan teduh)
  - `classroom` (Ruang Kelas: papan tulis kapur "10 - 4 = ?", meja kayu)
  - `market` (Pasar Ceria: kanopi garis-garis merah-putih, kedai kayu)
  - `castle` (Kastil Pixel: dinding bata batu, obor api menyala beranimasi, gerbang kristal)
- **Tween & Arc Physics**:
  - Animasi transfer kelereng/benda dengan kurva parabola dari Budi ke Siti lengkap dengan SFX transfer.
  - Interactive Counting Mode: Anak dapat mengetuk objek di layar untuk menghitung secara langsung.

### 2. 🔊 Audio & AI Voice Engine (`src/lib/audio/`)
- **Procedural 8-bit Sound Generator (Web Audio API)**:
  - SFX bebas dependensi aset eksternal (100% offline ready): `click`, `jump`, `pickup`, `transfer`, `ding`, `correct` (arpeggio melodis), `wrong_gentle` (nada lembut bersahabat), `celebrate` (fanfare kemenangan), `star`, dan `count`.
  - Musik Latar (BGM): Chiptune petualangan pentatonik ceria dengan tombol toggle on/off.
- **AI Voice Engine (TTS Bahasa Indonesia)**:
  - Menggunakan Web Speech API `id-ID` dengan parameter pitch dan rate yang disesuaikan untuk narator dan suara karakter anak yang ceria.
  - Sistem **Audio Hash Caching** (`hash(text + voiceId + pitch + rate)`) sesuai Bab 11.4.

### 3. 🗺️ World Map & Child Experience (`src/components/world-map/`)
- **World 1 — Petualangan Matematika**:
  - **Level 1**: Mengenal Angka & Menghitung Buah di Hutan Ajaib (Counting)
  - **Level 2**: Penjumlahan Koin Emas Persahabatan (Addition)
  - **Level 3**: Pengurangan Kelereng Budi dan Siti (Canonical Lesson: 10 - 4 = 6)
  - **Level 4**: Perbandingan Bintang Emas di Ruang Kelas (Comparison)
  - **Level 5**: Perkalian Dasar Keranjang Apel Ceria (Multiplication)
  - **Level 6**: Pembagian Kue Pesta Sama Rata (Division)
  - **Level 7**: Final Adventure: Gerbang Kastil Pixel (Boss Adventure)
- **Sistem Gamifikasi**:
  - XP (+50 per cerita selesai, +10 jawaban benar, +15 tanpa petunjuk, +25 first-attempt).
  - Level anak & Bintang prestasi.
  - Koleksi Lencana: *Petualang Pertama*, *Penjelajah Angka*, *Pakar Pengurangan*, *Juara Penjumlahan*, *Pemecah Masalah Cilik*, dan *Pahlawan Kastil Ajaib*.
  - Switcher Profil Anak (bisa membuat profil baru dengan avatar lucu).

### 4. 🧩 Question Engine & Adaptive Remedial (`src/components/story-engine/QuestionModal.tsx`)
- Soal pilihan ganda & hitung objek yang menyatu dalam alur cerita.
- **Tingkat Respon Adaptif (Bab 16)**:
  - *Percobaan 1 (Salah)*: Feedback suportif ("Belum tepat. Yuk coba hitung lagi pelan-pelan!") dengan suara lembut.
  - *Percobaan 2 (Salah)*: Membuka **Petunjuk Visual** (Visual Hint rumus dan visualisasi jumlah).
  - *Percobaan 3+ (Salah)*: Menawarkan **Cerita Remedial** (konsep yang sama dengan konteks berbeda, misal cerita apel).
  - *Jawaban Benar*: Ledakan konfeti partikel, suara fanfare, animasi selebrasi karakter, dan penambahan XP & lencana.

### 5. 🛡️ Deterministic Math & Consistency Validator (`src/lib/validation/mathValidator.ts`)
- Memvalidasi formula matematika (`10 - 4 = 6`, dsb.) secara deterministik, tidak semata mengandalkan LLM.
- Memeriksa konsistensi inventori scene (jumlah benda yang ditransfer tidak boleh melebihi stok yang ada).
- Memastikan opsi pilihan ganda mencakup kunci jawaban dan tidak ada opsi duplikat.
- Menghasilkan skor validasi (0 - 100) dan daftar error/warning sebelum konten dipublish.

### 6. 👨‍👩‍👧 Parent Dashboard (`src/components/parent/ParentDashboard.tsx`)
- **Parental Gate**: Dilindungi teka-teki perkalian acak agar anak tidak sengaja mengubah data.
- Ringkasan Waktu Belajar, Cerita Terselesaikan, dan Persentase Akurasi.
- **Topic Mastery**: Tingkat penguasaan materi (Mengenal Angka, Penjumlahan, Pengurangan, Perbandingan, Perkalian, Pembagian) dengan kategori *Needs Practice*, *Developing*, *Good*, dan *Mastered*.
- Deteksi topik yang dikuasai vs topik yang membutuhkan latihan, disertai tips pendampingan konkret bagi orang tua.
- Pengaturan Batas Waktu Belajar Harian (Screen Time Limit).
- Log riwayat aktivitas belajar real-time.

### 7. 🛠️ Admin Content Studio (`src/components/admin/AdminContentStudio.tsx`)
- **AI Content Generator**: Wizard pembuatan materi berdasarkan Mata Pelajaran, Topik, Usia, Tingkat Kesulitan, Tema, dan Formula Matematika.
- **Story JSON Editor**: Editor schema langsung dengan syntax validation.
- **Live Scene Preview**: Preview animasi pixel art canvas langsung di dalam studio sebelum publish.
- Endpoint API: `/api/ai/generate-lesson` dan `/api/ai/validate-lesson`.

### 8. 📱 Progressive Web App (PWA)
- `manifest.json` lengkap dengan konfigurasi standalone dan ikon.
- `sw.js` (Service Worker) untuk caching shell dan pengalaman offline.
- Tampilan responsif optimal untuk mobile (360×800, 390×844) hingga desktop.

---

## 🚀 Cara Menjalankan Aplikasi

1. **Jalankan Development Server**:
```bash
npm run dev
```

2. Buka browser di [http://localhost:3000](http://localhost:3000).

3. **Build untuk Production**:
```bash
npm run build
npm start
```
