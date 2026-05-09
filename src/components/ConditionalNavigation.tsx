"use client";

import { usePathname } from "next/navigation";
import NavBar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";

export default function ConditionalNavigation({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <NavBar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
