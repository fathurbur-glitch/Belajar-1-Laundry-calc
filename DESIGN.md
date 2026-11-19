# Keputusan Desain — LaundryCalc

Dokumen ini mencatat seluruh pilihan desain pengguna serta token tampilan yang dipakai di aplikasi.

## Pilihan Pengguna

| Keputusan | Pilihan Dipakai |
| :--- | :--- |
| Kesan visual | Ramah dan hangat (`Plus Jakarta Sans`) |
| Warna aksen | Biru (`blue`) |
| Sapaan pengguna | Kamu |
| Susunan halaman | Satu halaman bergulir |
| Posisi aksi utama | Bilah ringkasan menempel di bawah layar (mobile) dan panel kanan menempel (desktop) |
| Gambar | Tanpa gambar (ikon fungsional `lucide-react`) |
| Bentuk pilihan layanan | Kartu radio interaktif |

## Token Visual

- **Latar halaman:** `bg-neutral-50`
- **Permukaan kartu/panel:** `bg-white`, radius `rounded-2xl`, tanpa kartu di dalam kartu
- **Input & tombol:** radius `rounded-xl`, garis tepi input `border-neutral-200`, tinggi sentuh minimal `44px`
- **Teks:** utama `text-neutral-900`, pendukung `text-neutral-600`, petunjuk `text-neutral-500`, angka `tabular-nums`
- **Aksen biru:** tombol utama `bg-blue-700` hover `bg-blue-800` teks putih; item terpilih garis tepi `border-blue-700` dan latar `bg-blue-50`; cincin fokus `focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2`
- **Status:** peringatan *minimum charge* `bg-amber-50` + `text-amber-800` + ikon; error `bg-red-50` + `text-red-800` + ikon
- **Bayangan melayang:** hanya pada bilah bawah mobile (`shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)]`)
- **Tipografi:** `@fontsource/plus-jakarta-sans` bobot `400`, `500`, `600`; isi input minimal `16px`, teks pendukung minimal `14px`
