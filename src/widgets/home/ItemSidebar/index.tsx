import Link from "next/link";

interface ItemSidebarProps {
  href: string;
  label: string;
  Icon: React.ReactNode;
}

const ItemSidebar = ({ href, label, Icon }: ItemSidebarProps) => {
  return (
    <li className="">
      <Link
        prefetch={false}
        href={href}
        className="py-4 p-4 text-white flex items-center gap-2 hover:bg-gray-700 border-b border-b-gray-700 w-full"
      >
        {Icon}
        {label}
      </Link>
    </li>
  );
};

export default ItemSidebar;
