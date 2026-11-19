# Dokumen Produk — LaundryCalc

Dokumen ini merangkum daftar fitur, prioritas, ketergantungan, dan keputusan atas hal terbuka dari PRD LaundryCalc & Catalog (v1.1).

## Daftar Fitur

| Kode | Nama Fitur | Prioritas | Ketergantungan | Status |
| :--- | :--- | :--- | :--- | :--- |
| FT-01 | Tampilan Katalog & Durasi | Must Have | Tidak ada | Selesai |
| FT-02 | Input Berat & Notifikasi Min. Charge | Must Have | Tidak ada | Selesai |
| FT-03 | Opsi Add-on Terintegrasi | Must Have | FT-02 | Selesai |
| FT-04 | Floating Price Summary | Must Have | FT-01, FT-02, FT-03 | Selesai |
| FT-05 | Form Data Pemesan | Must Have | FT-03 | Selesai |
| FT-06 | WhatsApp Deep Link Button | Must Have | FT-01, FT-02, FT-03, FT-04, FT-05 | Selesai |
| FT-07 | Info Jam Operasional Toko | Should Have | Tidak ada | Ditunda |

## Keputusan atas Hal Terbuka

1. **Nomor WhatsApp toko:** PRD mencantumkan placeholder `628xxxxxxxxxx`. Untuk prototipe, dipakai nomor contoh `6281234567890` di `src/config.ts` agar tautan `wa.me` bisa diuji.
2. **Kondisi awal berat cucian:** Berat awal ditetapkan `3` kg saat halaman pertama kali dibuka agar estimasi harga langsung tampil.
3. **Pemisah desimal dan pembulatan:** Kolom berat menerima titik (`.`) dan koma (`,`), lalu hasil biaya uang dibulatkan ke bilangan bulat terdekat (`Math.round`).
4. **Format mata uang:** Menggunakan format PRD `Rp 6.000` (memakai spasi setelah `Rp` dan titik pemisah ribuan).
5. **Cakupan rilis saat ini:** Fokus menyelesaikan FT-01 sampai FT-06 sesuai permintaan pengguna; FT-07 ditunda sampai diminta berikutnya.
