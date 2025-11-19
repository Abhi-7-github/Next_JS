import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DashboardPage from "@/components/pages/dashboard-page";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "admin") {
    redirect("/signin");
  }

  // Submission requirement: log session to server console
  console.log(session.user);

  return <DashboardPage />;
}
