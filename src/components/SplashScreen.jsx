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

const overlayStyle = {
  position: "fixed",
  inset: 0,
  width: "100vw",
  minHeight: "100vh",
  background: "#122e1f",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
  overflow: "hidden",
  padding: "0 20px",
  textAlign: "center",
  pointerEvents: "none"
};

const contentStyle = {
  position: "relative",
  maxWidth: 520,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 28
};

const phraseStyle = {
  fontSize: "clamp(1.25rem, 4vw, 2rem)",
  lineHeight: 1.1,
  fontWeight: 700,
  letterSpacing: "-0.03em",
  color: "#fff",
  minHeight: 64,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 10px"
};

const logoShellStyle = {
  position: "relative",
  width: 110,
  height: 110,
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const logoStyle = {
  width: 92,
  height: 92,
  borderRadius: "50%",
  background: "radial-gradient(circle at 30% 30%, rgba(224,123,48,0.16), transparent 45%), linear-gradient(180deg, #1A5C3A 0%, #0f412d 100%)",
  boxShadow: "0 24px 80px rgba(0, 0, 0, 0.22)",
  display: "grid",
  placeItems: "center",
  position: "relative",
  overflow: "hidden"
};

const logoMarkStyle = {
  width: 42,
  height: 42,
  borderRadius: "50%",
  background: "radial-gradient(circle at 35% 35%, #fff 0%, rgba(255,255,255,0.32) 35%, transparent 60%), linear-gradient(135deg, #E07B30 0%, #F8D9B7 100%)",
  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.18)",
  display: "grid",
  placeItems: "center",
  fontWeight: 700,
  color: "#163d2b",
  fontSize: "1rem",
  letterSpacing: "0.08em"
};

const titleStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 6,
  color: "#fff"
};

const headingStyle = {
  margin: 0,
  fontSize: "clamp(1.9rem, 5vw, 2.6rem)",
  fontWeight: 800,
  letterSpacing: "-0.04em"
};

const subtitleStyle = {
  margin: 0,
  fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)",
  fontWeight: 500,
  color: "rgba(255, 255, 255, 0.78)",
  lineHeight: 1.4
};

const badgeStyle = {
  position: "absolute",
  inset: 0,
  background: "radial-gradient(circle at top, rgba(224,123,48,0.14), transparent 28%), radial-gradient(circle at bottom, rgba(255,255,255,0.05), transparent 20%)",
  pointerEvents: "none"
};

const motionSettings = {
  phrase: {
    initial: { opacity: 0, y: 18, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -18, scale: 0.98 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  },
  logo: {
    initial: { opacity: 0, scale: 0.8, rotate: -18 },
    animate: { opacity: 1, scale: 1, rotate: 360, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } }
  },
  title: {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] } }
  }
};

function getTimers(prefersReducedMotion) {
  const phraseDuration = prefersReducedMotion ? 520 : 580;
  const phraseGap = prefersReducedMotion ? 120 : 100;
  const base = phraseDuration + phraseGap;
  const logoStart = PHRASES.length * base;
  const titleStart = logoStart + (prefersReducedMotion ? 520 : 620);
  const finish = titleStart + (prefersReducedMotion ? 380 : 420);
  return { base, logoStart, titleStart, finish };
}

export default function SplashScreen({ onComplete = () => {} }) {
  const prefersReducedMotion = useReducedMotion();
  const [activePhrase, setActivePhrase] = useState(0);
  const [phase, setPhase] = useState("phrases");

  const hasSeenSplash = useMemo(() => {
    if (typeof window === "undefined") return false;
    try {
      return sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch (error) {
      return false;
    }
  }, []);

  useEffect(() => {
    if (hasSeenSplash) {
      onComplete();
      return undefined;
    }

    const timers = [];
    const { base, logoStart, titleStart, finish } = getTimers(prefersReducedMotion);

    PHRASES.forEach((_, index) => {
      timers.push(
        window.setTimeout(() => {
          setActivePhrase(index);
        }, index * base)
      );
    });

    timers.push(
      window.setTimeout(() => {
        setPhase("logo");
      }, logoStart)
    );

    timers.push(
      window.setTimeout(() => {
        setPhase("title");
      }, titleStart)
    );

    timers.push(
      window.setTimeout(() => {
        try {
          sessionStorage.setItem(STORAGE_KEY, "1");
        } catch (error) {
          // Ignore storage errors.
        }
        setPhase("done");
        onComplete();
      }, finish)
    );

    return () => timers.forEach((timerId) => window.clearTimeout(timerId));
  }, [hasSeenSplash, onComplete, prefersReducedMotion]);

  if (phase === "done") {
    return null;
  }

  return (
    <div style={overlayStyle} aria-hidden="true">
      <div style={badgeStyle} />
      <div style={contentStyle}>
        <AnimatePresence mode="wait">
          {phase === "phrases" ? (
            <motion.div
              key={activePhrase}
              style={phraseStyle}
              initial={motionSettings.phrase.initial}
              animate={motionSettings.phrase.animate}
              exit={motionSettings.phrase.exit}
              transition={motionSettings.phrase.transition}
            >
              {PHRASES[activePhrase]}
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div style={logoShellStyle}>
          <motion.div
            style={logoStyle}
            initial={motionSettings.logo.initial}
            animate={phase !== "phrases" ? motionSettings.logo.animate : { opacity: 0, scale: 0.8, rotate: -18 }}
            transition={motionSettings.logo.animate.transition}
          >
            <span style={logoMarkStyle}>C</span>
          </motion.div>

          <motion.div
            style={{
              position: "absolute",
              width: 160,
              height: 160,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(224,123,48,0.22) 0%, rgba(224,123,48,0.02) 42%, transparent 58%)"
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={phase === "logo" ? { opacity: [0, 0.32, 0], scale: [0.8, 1.08, 1.2], transition: { duration: 1.02, ease: [0.22, 1, 0.36, 1] } } : { opacity: 0 }}
          />
        </div>

        <AnimatePresence>
          {phase === "title" ? (
            <motion.div
              key="titles"
              style={titleStyle}
              initial={motionSettings.title.initial}
              animate={motionSettings.title.animate}
              exit={{ opacity: 0, y: -12, transition: { duration: 0.3 } }}
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
