export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  tags: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "5-serum-terbaik-2026-di-bawah-rp100000",
    title: "5 Serum Terbaik 2026 di Bawah Rp100.000 — Cocok untuk Pemula",
    date: "2026-05-01",
    author: "Lanure Editor",
    category: "Rekomendasi",
    excerpt: "Mencari serum berkualitas tanpa harus merogoh kocek dalam? Cek daftar serum terbaik 2026 harga terjangkau di sini.",
    content: `
      <h2>Serum Berkualitas Tidak Harus Mahal</h2>
      <p>Memulai rutinitas skincare seringkali terasa membingungkan, terutama saat melihat harga produk yang selangit. Namun, di tahun 2026 ini, banyak brand lokal maupun internasional yang meluncurkan serum berkualitas dengan harga di bawah Rp100.000.</p>
      
      <h3>1. Lanure Hydrate Smoothing Serum</h3>
      <p>Serum ini menjadi favorit banyak orang karena kandungannya yang lembut namun efektif menghidrasi kulit seharian. Cocok untuk semua jenis kulit, terutama kulit kering.</p>
      
      <h3>2. Luminous Glow Serum</h3>
      <p>Jika Anda mencari efek mencerahkan tanpa iritasi, serum ini adalah jawabannya. Mengandung Niacinamide dosis aman untuk pemula.</p>
      
      <h3>Mengapa Serum Penting?</h3>
      <p>Serum memiliki konsentrasi bahan aktif yang lebih tinggi dibandingkan pelembab biasa, sehingga mampu menembus lapisan kulit lebih dalam untuk mengatasi masalah kulit spesifik.</p>
    `,
    image: "/images/blog/blog-1.png",
    tags: ["serum", "murah", "pemula"],
  },
  {
    slug: "review-sunscreen-terbaik-2026",
    title: "Review Sunscreen Terbaik 2026 — Perlindungan Maksimal Tanpa Whitecast",
    date: "2026-05-03",
    author: "Skincare Guru",
    category: "Review",
    excerpt: "Jangan biarkan sinar UV merusak kulitmu. Simak review sunscreen paling nyaman di tahun 2026 yang tidak lengket.",
    content: `
      <h2>Pentingnya Sunscreen Setiap Hari</h2>
      <p>Sunscreen adalah langkah paling krusial dalam rutinitas skincare. Tanpa perlindungan UV, semua produk mahal yang Anda gunakan akan sia-sia.</p>
      
      <h3>Teknologi Sunscreen Terbaru</h3>
      <p>Tahun ini kita melihat inovasi luar biasa dalam tekstur sunscreen yang semakin ringan seperti air (watery essence) namun tetap memberikan proteksi SPF 50+ PA++++.</p>
    `,
    image: "/images/blog/blog-2.png",
    tags: ["sunscreen", "uv protection", "review"],
  },
  {
    slug: "skincare-routine-pagi-malam-kulit-berminyak",
    title: "Skincare Routine Pagi & Malam untuk Kulit Berminyak",
    date: "2026-05-05",
    author: "Dr. Beauty",
    category: "Tips",
    excerpt: "Punya masalah dengan minyak berlebih? Ikuti panduan rutinitas skincare pagi dan malam ini untuk kulit bebas kilap.",
    content: `
      <h2>Rutinitas Pagi</h2>
      <ol>
        <li>Cleanser ringan</li>
        <li>Toner penyeimbang pH</li>
        <li>Serum Oil-control</li>
        <li>Sunscreen gel</li>
      </ol>
      
      <h2>Rutinitas Malam</h2>
      <ol>
        <li>Double cleansing</li>
        <li>Exfoliating toner (2-3x seminggu)</li>
        <li>Serum hidrasi</li>
        <li>Moisturizer ringan</li>
      </ol>
    `,
    image: "/images/blog/blog-3.png",
    tags: ["kulit berminyak", "routine", "tips"],
  },
  {
    slug: "moisturizer-murah-tapi-bagus-top-5-shopee",
    title: "Moisturizer Murah Tapi Bagus — Top 5 Pilihan di Shopee",
    date: "2026-05-06",
    author: "Shopee Hunter",
    category: "Belanja",
    excerpt: "Kulit lembap tidak perlu mahal. Berikut adalah 5 pelembab terlaris di Shopee yang harganya sangat bersahabat.",
    content: `
      <h2>Pelembab Adalah Kunci</h2>
      <p>Moisturizer berfungsi mengunci kelembapan dan menjaga skin barrier agar tetap sehat. Di Shopee, ada banyak pilihan pelembab lokal yang sudah BPOM dan berkualitas tinggi.</p>
    `,
    image: "/images/blog/blog-1.png",
    tags: ["moisturizer", "shopee", "hemat"],
  },
  {
    slug: "produk-skincare-korea-terlaris-2026",
    title: "Produk Skincare Korea Terlaris di Shopee 2026",
    date: "2026-05-07",
    author: "K-Beauty Fan",
    category: "K-Beauty",
    excerpt: "Tren Glass Skin masih bertahan. Lihat produk Korea apa saja yang paling banyak dicari di Shopee tahun ini.",
    content: `
      <h2>Fenomena K-Beauty</h2>
      <p>Skincare Korea dikenal dengan formulanya yang inovatif dan fokus pada hidrasi. Dari snail mucin hingga centella asiatica, produk-produk ini tetap menjadi primadona.</p>
    `,
    image: "/images/blog/blog-2.png",
    tags: ["k-beauty", "korea", "shopee"],
  },
];
