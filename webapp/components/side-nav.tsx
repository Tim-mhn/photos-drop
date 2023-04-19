import Link from "next/link";

export default function SideNav() {
  return (
    <div className="w-64">
      <div className="flex flex-col h-full gap-4 py-6 px-8 bg-pink-300 text-white text-2xl font-bold">
        <Link href={"/"}>Photos</Link>
        <Link href={"/albums"}>Albums</Link>
      </div>
    </div>
  );
}
