import "./../styles/globals.css";
import { Providers } from "../utils/provider";

export const metadata = {
  title: "Login App",
  description: "NextAuth Role-Based Authentication",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
