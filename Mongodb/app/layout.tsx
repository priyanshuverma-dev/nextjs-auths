import ToasterContext from "@/context/ToasterContext";
import "./globals.css";
import { Inter } from "next/font/google";
import AuthContext from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Try Mongodb",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterContext />
        <AuthContext>{children}</AuthContext>
      </body>
    </html>
  );
}
