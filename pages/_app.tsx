import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/auth";
import Navibar from "@/components/Navibar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <div>
        <Navibar />
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}
