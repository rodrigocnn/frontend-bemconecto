import Image from "next/image";
import Link from "next/link";
import Logo from "./../assets/img/logo.png";
import NavMenu from "../NavMenu";

const Navbar = () => {
  return (
    <div
      className="sticky shadow-lg top-0 bg-white py-8 px-20"
      style={{ zIndex: 21 }}
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link href="/">
            <Image
              src={Logo}
              alt="Loading..."
              className="mx-auto"
              priority={true}
            />
          </Link>
        </div>

        {/* Menu */}
        <div className="hidden md:block">
          <NavMenu />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
