import { ReactNode } from "react";
import Topbar from "../Topbar";
import { Footer, Navbar } from "flowbite-react";

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
