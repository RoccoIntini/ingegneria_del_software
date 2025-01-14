import Admin_navbar from "@/components/Admin_navbar";

export default function AdminLayout({ children }) {
  return (
    <div>
      <Admin_navbar />
      <main>{children}</main>
    </div>
  );
}