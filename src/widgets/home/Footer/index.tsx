import React from "react";

const Footer = () => {
  return (
    <footer
      className="bg-slate-800 border-t-2 border-green-500 text-white p-8"
      id="footer"
    >
      <div
        className="container mx-auto flex flex-col md:flex-row 
      justify-between  text-center md:text-left gap-6"
      >
        {/* Endereço */}
        <div>
          <div className="text-xl font-bold mb-4">MinhaLogo</div>
          <p>
            Rua São Francisco, 344 - Sandra Regina <br />
            CEP: 47802-090 - Barreiras - BA <br />
            (77) 3612-5707 - corretor.nunessantos@hotmail.com
          </p>
        </div>

        {/* Logo + Menu */}
        <div>
          <nav>
            <ul className="flex flex-col md:flex-row md:space-x-6">
              <li>
                <a href="#" className="hover:text-gray-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Localização
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Contato
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
