import {
  MdOutlineDashboard,
  MdOutlineLocationCity,
  MdOutlineRealEstateAgent,
  MdOutlineHouseSiding,
  MdHomeWork,
} from "react-icons/md";

import {
  FaUserFriends,
  FaMapMarkedAlt,
  FaUsers,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

import Image from "next/image";
import { HiOutlineDocumentText } from "react-icons/hi";
import { BsCashStack } from "react-icons/bs";
import { useState } from "react";

import Logo from "./../assets/img/logo.png";
import ItemSidebar from "../ItemSidebar";

export function Sidebar() {
  const [configOpen, setConfigOpen] = useState(false);

  return (
    <div className="w-64 bg-gray-800 text-white">
      <div className="mt-6 h-16 pl-4">
        <Image src={Logo} alt="Loading..." priority />
      </div>

      <nav className="mt-2">
        <ul>
          <ItemSidebar
            href="/admin/home"
            Icon={<MdOutlineDashboard className="text-xl" />}
            label="Home"
          />

          <ItemSidebar
            href="/admin/pacientes"
            Icon={<FaUserFriends className="text-xl" />}
            label="Pacientes"
          />

          <ItemSidebar
            href="/admin/agenda"
            Icon={<MdOutlineHouseSiding className="text-xl" />}
            label="Agenda"
          />

          <ItemSidebar
            href="/admin/sessoes"
            Icon={<MdOutlineRealEstateAgent className="text-xl" />}
            label="Sessões"
          />

          <ItemSidebar
            href="/admin/contratos"
            Icon={<HiOutlineDocumentText className="text-xl" />}
            label="Contratos"
          />
          <ItemSidebar
            href="/admin/pagamentos"
            Icon={<BsCashStack className="text-xl" />}
            label="Pagamentos"
          />

          {/* Menu de Configurações */}
          <li
            className="cursor-pointer px-4 py-2 hover:bg-gray-700 flex items-center justify-between"
            onClick={() => setConfigOpen(!configOpen)}
          >
            <div className="flex items-center gap-2">
              <MdOutlineLocationCity className="text-xl" />
              <span>Configurações</span>
            </div>
            {configOpen ? (
              <FaChevronUp className="text-sm" />
            ) : (
              <FaChevronDown className="text-sm" />
            )}
          </li>
          {configOpen && (
            <ul className="ml-6">
              <ItemSidebar
                href="/admin/tipos-de-imoveis"
                Icon={<MdHomeWork className="text-sm" />}
                label="Tipos de Imóveis"
              />

              <ItemSidebar
                href="/admin/cidades"
                Icon={<MdOutlineLocationCity className="text-sm" />}
                label="Cidades"
              />
              <ItemSidebar
                href="/admin/bairros"
                Icon={<FaMapMarkedAlt className="text-sm" />}
                label="Bairros"
              />
              <ItemSidebar
                href="/admin/usuarios"
                Icon={<FaUsers className="text-xl" />}
                label="Usuários"
              />
            </ul>
          )}
        </ul>
      </nav>
    </div>
  );
}
