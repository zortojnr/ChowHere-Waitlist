import { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import LandingPage from "./components/LandingPage";

export default function App() {
  const [splashDone, setSplashDone] = useState(false);

  return splashDone
    ? <LandingPage />
    : <SplashScreen onComplete={() => setSplashDone(true)} />;
}
