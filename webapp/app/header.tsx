import Image from "next/image";

export default function Header() {
  return (
    <div className="flex h-16 px-8 border border-b border-gray-100 items-center shadow-sm">
      <Image
        src={"/logo.jpg"}
        alt="Logo"
        className="h-14 w-auto"
        width={80}
        height={56}
      />
      <div className="flex flex-grow justify-end gap-8 ">
        <button className="h-8  bg-fuchsia-600 hover:bg-fuchsia-700 hover:shadow-sm text-white p-3 flex justify-center font-semibold items-center text-center ">
          Upload
        </button>
        <div className="h-8 w-8 rounded-full bg-pink-400 text-white flex items-center justify-center text-base font-semibold">
          T
        </div>
      </div>
    </div>
  );
}
