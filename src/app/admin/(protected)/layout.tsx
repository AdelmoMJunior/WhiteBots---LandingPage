import {AdminFrame} from "@/components/admin/AdminFrame";
import {getAdminSession} from "@/lib/admin";

export default async function ProtectedAdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const {user} = await getAdminSession();

  return <AdminFrame userEmail={user?.email ?? "admin"}>{children}</AdminFrame>;
}
