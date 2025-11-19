import "./../styles/globals.css";
import { Providers } from "../utils/provider";
import { Roboto } from "next/font/google";
import connectToDatabase from "@/utils/mongodb";
import User from "@/models/User";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata = {
  title: "Login App",
  description: "NextAuth Role-Based Authentication",
};

export default function RootLayout({ children }) {
  // Dev-only: verify DB connection on layout render
  connectToDatabase()
    .then(() => {
      console.log("MongoDB connection established");
      console.log("mongodb connected");
      console.log("User model loaded successfully:", !!User);
    })
    .catch((err) => console.error("MongoDB connection failed:", err?.message || err));
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
