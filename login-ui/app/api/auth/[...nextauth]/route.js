import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "@/utils/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          await connectToDatabase();
        } catch (err) {
          console.error("MongoDB connection error:", err);
          throw new Error("Database connection failed");
        }

        const user = await User.findOne({ email: credentials.email.toLowerCase() }).lean();
        if (!user) {
          console.log("Login failed for email:", credentials.email, "- Invalid credentials");
          return null;
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          console.log("Login failed for email:", credentials.email, "- Invalid password");
          return null;
        }

        console.log("Login successful for user:", {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          timestamp: new Date().toISOString(),
        });

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name;
        session.user.role = token.role;
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
