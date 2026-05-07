import { Button } from "@/components/core/Button";
import Link from "next/link";

const MobileMenu = () => (
  <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-zinc-950 border-b p-4 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
    <Link href="/" className="text-sm font-medium">
      Beranda
    </Link>
    <Link href="/" className="text-sm font-medium">
      Fitur
    </Link>
    <Link href="/" className="text-sm font-medium">
      Tentang
    </Link>
    <Link href="/" className="text-sm font-medium">
      Harga
    </Link>
    <Link href="/" className="text-sm font-medium">
      Kontak
    </Link>
    <hr />
    <Link href="/login" className="text-sm font-medium">
      Masuk
    </Link>
    <Button size="sm" asChild>
      <Link href="/signup">Mulai Gratis</Link>
    </Button>
  </div>
);

export default MobileMenu;
