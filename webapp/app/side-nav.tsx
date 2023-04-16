import Link from "next/link";

export default function SideNav() {
  return (
    <div className="flex flex-col w-64 py-6 px-8 bg-pink-300 text-white text-2xl font-bold">
      <Link href={"/"}>Photos</Link>
    </div>
  );
}
