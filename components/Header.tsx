import Image from "next/image";

interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  return (
    <header
      className="flex items-center w-full px-4 h-14 mb-8"
      style={{ boxShadow: "0px 3px 7px -1px #2222221A" }}
    >
      <div className="bg-yellow p-2 rounded-[5px]">
        <Image
          aria-hidden
          src="/car.svg"
          alt="car icon"
          width={16}
          height={16}
        />
      </div>
      <p className="ml-auto mr-1 font-bold">{title}</p>
    </header>
  );
}

export default Header;
