import { ReactNode } from "react";
import Topbar from "@/widgets/home/Topbar";
import Navbar from "@/widgets/home/Navbar";
import Footer from "@/widgets/home/Footer";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Topbar />
      <Navbar />

      <main>{children}</main>
      <Footer />
    </div>
  );
}
