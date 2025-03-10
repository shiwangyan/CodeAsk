import React from "react";
import DragWindowRegion from "@/components/DragWindowRegion";
import { Toaster } from "@/components/ui/sonner";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <DragWindowRegion/>
      {/* <NavigationMenu /> */}
      <div className="border-t border-gray-300"></div>
      <main className="flex-1 overflow-hidden">{children}</main>
      <Toaster position="top-center" richColors closeButton />
    </div>
  );
}
