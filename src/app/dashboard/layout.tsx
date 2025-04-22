import DefaultLayout from "@/components/Layouts/DefaultLaout";
import ProtectedLayout from "@/hoc/withAuth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ProtectedLayout>
        <DefaultLayout>{children}</DefaultLayout>
      </ProtectedLayout>
    </>
  );
}
