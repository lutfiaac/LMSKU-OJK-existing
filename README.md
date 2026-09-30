# LMSKU — clone frontend

Prototipe React + Vite berdasarkan empat screenshot LMSKU OJK. **Frontend saja**, tanpa backend, database, autentikasi asli, atau API OJK.

## Preview

Cara mudah di Windows: klik dua kali **Buka-LMSKU.cmd** di folder utama. Launcher menyalakan server frontend lokal dan membuka browser. Jangan membuka `app/index.html` langsung; kode React perlu dijalankan melalui Vite.

```powershell
cd app
npm install
npm run dev -- --host 127.0.0.1 --port 4173
```

Buka http://127.0.0.1:4173/Dashboard.

## Halaman dan alur

- `/Dashboard`: banner, statistik, peringkat, 16 modul, pencarian/pengurutan, Academy, dan tautan sumber belajar.
- `/Course/show/16/acs`: kategori Keuangan Syariah Basic / Intermediate.
- `/Activity/show/47`: video, pre-test, 10 materi, dan post-test.
- `/Activity/detail`: keadaan materi terkunci sebelum pre-test selesai.
- Simulasi lokal: selesaikan pre-test → buka dan tandai materi selesai → buka post-test.
- Profil, pilihan foto, notifikasi, dan pesan forum dapat dicoba di browser.

Progres, profil, serta pesan menggunakan state React dan tereset saat reload. Tidak ada data yang dikirim ke OJK. Pertanyaan tes, isi materi yang terbuka, dan aturan poin merupakan **data demo**, bukan materi resmi. Kategori lain memakai template navigasi yang sama; hanya kategori Keuangan Syariah Basic yang memiliki screenshot alur lengkap. Kelas Academy mengikuti kondisi sesi berakhir.

## Sumber dan batas cakupan

Situs publik https://lmsku.ojk.go.id/ dan `/Login` telah ditelusuri dengan Playwright. `/Dashboard` mengarah ke login tanpa sesi terautentikasi. UI internal menggunakan screenshot yang diberikan pengguna. Landing page, login, registrasi, dan pemulihan akun bukan bagian implementasi empat halaman ini.

Font Poppins dan beberapa aset diunduh dari sumber publik. Banner, thumbnail, ilustrasi, dan ikon aktivitas diekstrak dari screenshot pengguna; ikon kontrol memakai Font Awesome. Semua aset UI disimpan lokal. Tampilan mobile adalah adaptasi responsif karena referensi mobile tidak diberikan.

## Verifikasi

```powershell
cd app
npm run build
node scripts/check-ui.mjs
```

Skrip Playwright memerlukan preview di port 4173 dan Chromium (`npx playwright install chromium`). Pengujian mencakup urutan aktivitas, prasyarat, filter, sort, profil/foto, forum, notifikasi, browser back, error JavaScript, gambar, dan overflow pada enam ukuran layar.

Build frontend statis berada di `app/dist/client`. Berkas `worker/` bawaan starter hanya merupakan adapter opsional untuk menyajikan aset statis pada Sites; tidak digunakan oleh preview dan tidak menyediakan backend aplikasi. Tidak ada deployment yang dilakukan.

Lihat `app/design-qa.md` dan `app/evidence/` untuk catatan serta screenshot pengujian lokal.
