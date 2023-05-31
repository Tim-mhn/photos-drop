import "./globals.css";
import { AppQueryClientProvider } from "../components/providers/query-client.provider";
import { ReduxProvider } from "../components/providers";
import { SideNav, Header } from "../components/layout";

export const metadata = {
  title: "PhotosDrop",
  description: "My own photos web app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <AppQueryClientProvider>
            <div className="flex flex-col w-screen h-screen bg-white">
              <Header />

              <div className="flex flex-grow overflow-hidden">
                <SideNav />
                <div className="flex h-full flex-grow items-center overflow-hidden">
                  <div className="p-4 h-full flex flex-grow justify-center items-center overflow-auto">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </AppQueryClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
