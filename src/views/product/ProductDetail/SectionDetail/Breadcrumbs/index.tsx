import Link from "next/link";

const Breadcrumbs = () => (
  <nav className="flex items-center gap-2 text-xs md:text-sm text-ceramide-text-muted mb-8 md:mb-12">
    <Link href="/" className="hover:text-ceramide-text-dark transition-colors">
      Home
    </Link>
    <span className="text-gray-300">•</span>
    <a
      href="/shop"
      className="hover:text-ceramide-text-dark transition-colors capitalize"
    >
      Shop
    </a>
    <span className="text-gray-300">•</span>
    <span className="text-ceramide-text-dark font-medium capitalize">
      Face Masks
    </span>
  </nav>
);

export default Breadcrumbs;
