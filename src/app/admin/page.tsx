import MainAdmin from "@/views/admin/MainAdmin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lanure Admin",
};

export default function AdminPage() {
  return <MainAdmin />;
}
