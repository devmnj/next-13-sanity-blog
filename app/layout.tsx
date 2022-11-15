import "./globals.css";
import { Nav } from "./Nav";
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}

      <head />

      <body>
        <Nav />
        <div  className="bg-base-100 text-white items-center overflow-auto">{children}</div>
      </body>
    </html>
  );
}
