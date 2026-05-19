import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const PHRASES = [
  "Craving Nigerian food?",
  "Find Egusi near you",
  "Discover hidden bukas",
  "Real Nigerian dishes",
  "Anywhere in Nigeria"
];
const STORAGE_KEY = "chowHereSplashShown";
const phraseDuration = 900;
const phraseDelay = 200;
const phraseCycle = phraseDuration + phraseDelay;
const logoDelay = PHRASES.length * phraseCycle;
const titleDelay = logoDelay + 800;
const finishDelay = titleDelay + 900;

const overlayStyle = {
  position: "fixed",
  inset: 0,
  width: "100vw",
  minHeight: "100vh",
  background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(232,98,26,0.1), transparent 55%), linear-gradient(170deg, #143d22 0%, #09180f 100%)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
  overflow: "hidden",
  padding: "1.5rem",
  textAlign: "center",
  fontFamily: '"DM Sans", system-ui, sans-serif',
  WebkitFontSmoothing: "antialiased",
};

const contentStyle = {
  width: "100%",
  maxWidth: "32rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "1.75rem",
};

const phraseRowStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  minHeight: "6rem",
};

const phraseStyle = {
  fontSize: "clamp(1.4rem, 4.5vw, 2.25rem)",
  fontWeight: 700,
  letterSpacing: "-0.035em",
  lineHeight: 1.1,
  minHeight: "4rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 0.75rem",
  color: "#fff",
};

const logoShellStyle = {
  position: "relative",
  width: "7rem",
  height: "7rem",
  display: "grid",
  placeItems: "center",
};

const logoStyle = {
  width: "6.25rem",
  height: "6.25rem",
  borderRadius: "1.5rem",
  background: "linear-gradient(135deg, #0F4C2A 55%, #E8621A 45%)",
  boxShadow: "0 1.5rem 4rem rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08)",
  position: "relative",
};

const logoMarkStyle = {};

const titleStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.5rem",
  width: "100%",
};

const headingStyle = {
  margin: 0,
  fontFamily: '"Playfair Display", Georgia, serif',
  fontSize: "clamp(2.1rem, 5vw, 3.1rem)",
  fontWeight: 900,
  letterSpacing: "-0.04em",
  lineHeight: 1.06,
  color: "#fff",
};

const subtitleStyle = {
  margin: 0,
  fontSize: "clamp(0.9rem, 2.5vw, 1.05rem)",
  fontWeight: 500,
  color: "rgba(255,255,255,0.65)",
  lineHeight: 1.55,
  letterSpacing: "0.01em",
  fontFamily: '"Space Grotesk", "Space Mono", monospace',
};

export default function SplashScreen({ onComplete = () => {} }) {
  const prefersReducedMotion = useReducedMotion();
  const [activePhrase, setActivePhrase] = useState(0);
  const [phase, setPhase] = useState("phrases");

  useEffect(() => {
    const timers = [];

    PHRASES.forEach((_, index) => {
      timers.push(
        window.setTimeout(() => {
          setActivePhrase(index);
        }, index * phraseCycle)
      );
    });

    timers.push(window.setTimeout(() => setPhase("logo"), prefersReducedMotion ? 700 : logoDelay));
    timers.push(window.setTimeout(() => setPhase("title"), prefersReducedMotion ? 1100 : titleDelay));
    timers.push(
      window.setTimeout(() => {
        setPhase("done");
        onComplete();
      }, prefersReducedMotion ? 1500 : finishDelay)
    );

    return () => timers.forEach((timerId) => window.clearTimeout(timerId));
  }, [onComplete, prefersReducedMotion]);

  if (phase === "done") {
    return null;
  }

  return (
    <div style={overlayStyle}>
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at center, rgba(255,255,255,0.03), transparent 30%)"
        }}
        aria-hidden="true"
      />

      <div style={contentStyle}>
        <div style={phraseRowStyle}>
          <motion.div
            style={logoShellStyle}
            initial={{ opacity: 0, scale: 0.7, rotate: -12 }}
            animate={
              phase === "phrases"
                ? { opacity: 1, scale: 0.94, rotate: 0 }
                : { opacity: 1, scale: 1.06, rotate: 360 }
            }
            transition={{ duration: prefersReducedMotion ? 0.4 : 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              style={logoStyle}
              animate={phase === "phrases" ? { scale: 1 } : { scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
            </motion.div>
          </motion.div>

          <AnimatePresence mode="wait">
            {phase === "phrases" ? (
              <motion.div
                key={activePhrase}
                style={phraseStyle}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: prefersReducedMotion ? 0.32 : 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {PHRASES[activePhrase]}
              </motion.div>
            ) : (
              <motion.div
                style={phraseStyle}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 0, x: 24 }}
              />
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {phase === "title" ? (
            <motion.div
              key="brand-title"
              style={titleStyle}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: prefersReducedMotion ? 0.34 : 0.44, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 style={headingStyle}>Chow Here</h1>
              <p style={subtitleStyle}>The Nigerian Food Finder</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
