import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navibar from "./components/Navibar";
import { AuthProvider } from "./context/auth";

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
