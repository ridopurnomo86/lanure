import Link from "next/link";

const Footer = () => (
  <footer className="bg-[#0A2328] text-white pt-16 pb-8 px-4 md:px-8">
    <div className="max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Newsletter Section */}
        <div>
          <h2 className="text-4xl md:text-5xl font-serif mb-4">
            Bergabung dengan Newsletter Kami
          </h2>
          <p className="text-white/80 text-medium">
            Daftar newsletter kami & dapatkan diskon 10% untuk pesanan pertama Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mt-20 mb-4">
            <div className="flex-1 relative ">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="w-full bg-white/10 border border-white/20 rounded-full px-6 py-4 outline-none focus:border-white/40 transition-colors"
              />
            </div>
            <button className="bg-white text-[#0A2328] font-bold px-10 py-2 rounded-full hover:bg-white/90 transition-all">
              Berlangganan
            </button>
          </div>
          <p className="text-white/60 text-sm">
            Dengan berlangganan, Anda menyetujui{" "}
            <Link
              href="#"
              className="underline hover:text-white transition-colors"
            >
              Ketentuan Penggunaan
            </Link>{" "}
            &{" "}
            <Link
              href="#"
              className="underline hover:text-white transition-colors"
            >
              Kebijakan Privasi
            </Link>
            .
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Perusahaan</h3>
            <ul className="space-y-2 text-white/70">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Cerita Kami
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Kontak
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Tanya Jawab
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Cari Toko
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Koleksi</h3>
            <ul className="space-y-2 text-white/70">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Pengiriman
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Pengembalian & Refund
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Garansi
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Lacak Pesanan
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Pembayaran Aman
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Belanja</h3>
            <ul className="space-y-2 text-white/70">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Perawatan Kulit
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Makeup
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Perawatan Tubuh
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Perawatan Rambut
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Pelembab
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Aksesoris
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="pt-8 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-6">
            <p className="text-white/60 text-sm">
              © 2026 Hyper Ceramide. Didukung oleh Shopify
            </p>
          </div>

          <div className="flex flex-col items-end gap-6 w-full md:w-auto">
            <div className="flex gap-6 text-sm font-bold">
              <Link href="#" className="hover:text-white transition-colors">
                Ketentuan Layanan
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Kebijakan Privasi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
