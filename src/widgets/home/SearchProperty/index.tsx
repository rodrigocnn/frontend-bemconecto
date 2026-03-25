import { Button, Select } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Flowbite } from "flowbite-react";

const customTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      primary: "bg-green-500 text-white ",
    },
  },
};

export function SearchProperty() {
  return (
    <div className="p-4 mb-8">
      <div className="left-0 bottom-12  width-90 right-0 mx-auto absolute bg-white p-10 rounded-lg search-property-box shadow-2xl shadow-slate-300 grid grid-cols-12 gap-4 items-start">
        <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-3">
          <Select defaultValue={"Tipo de Negociação"} id="countries" required>
            <option>Tipo de Negociação</option>
            <option>Canada</option>
            <option>France</option>
            <option>Germany</option>
          </Select>
        </div>
        <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-3">
          <Select defaultValue={"Tipo do Imóvel"} required>
            <option>Tipo do Imóvel</option>
            <option>Canada</option>
            <option>France</option>
            <option>Germany</option>
          </Select>
        </div>
        <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-3">
          <Select defaultValue={"Bairro"} required>
            <option>Bairro</option>
            <option>Canada</option>
            <option>France</option>
            <option>Germany</option>
          </Select>
        </div>

        <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-3 flex">
          <Flowbite theme={{ theme: customTheme }}>
            <Button className="w-full  " color="primary">
              Pesquisar
            </Button>
          </Flowbite>
        </div>
      </div>
    </div>
  );
}
