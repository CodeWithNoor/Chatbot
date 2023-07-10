import Sidebar from "../components/Sidebar";
import NextAuthProvider from "../components/SessionProvider";
import "./globals.css";
import { getServerSession } from "next-auth";
import Login from "../components/Login";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import ClientProvider from "@/components/ClientProvider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

    const session = await getServerSession(authOptions);

  return (
    <html>
      <head />
      <body>
        <NextAuthProvider session={session}>
          {!session ? ( // user login
            <Login/>
          ):(
              // sidebar
            <div className="flex"> 
              <div className="max-w-xs h-screen overflow-y-auto overflow-x-hidden bg-[#000] border-r border-blue-500 md:min-w-[15rem]">
                <Sidebar />
              </div>

              {/* client provider */}
              <ClientProvider/>
              <div className="bg-[url('../image/background-vector.jpg')] bg-no-repeat bg-cover flex-1">{children}</div>
            </div>   
          )}
        </NextAuthProvider>
      </body>
    </html>
  );
}
