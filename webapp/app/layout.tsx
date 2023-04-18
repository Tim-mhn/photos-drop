import "./globals.css";
import Header from "../components/header";
import SideNav from "../components/side-nav";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col w-screen h-screen bg-white">
          <Header />

          <div className="flex flex-grow overflow-hidden">
            <SideNav />
            <div className="p-4 flex flex-grow justify-center items-center overflow-auto">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
