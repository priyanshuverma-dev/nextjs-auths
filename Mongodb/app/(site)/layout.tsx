import Home from "./page";

export const metadata = {
  title: "Proompt",
  description: "",
};

export default function RootLayout({}) {
  return (
    <html lang="en">
      <body>
        <Home />
      </body>
    </html>
  );
}
