"use client";

import { ImageKitProvider } from "imagekitio-next";
import { publicKey, urlEndpoint, authenticator } from "@/lib/imagekit";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      {children}
    </ImageKitProvider>
  );
}
