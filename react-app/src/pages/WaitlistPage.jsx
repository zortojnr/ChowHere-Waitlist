import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

function useTypewriter(text, speed = 62) {
  const [len, setLen] = useState(0);
  useEffect(() => {
    setLen(0);
    if (!text) return;
    let i = 0;
    const iv = setInterval(() => {
      i += 1;
      setLen(i);
      if (i >= text.length) clearInterval(iv);
    }, speed);
    return () => clearInterval(iv);
  }, [text, speed]);
  return text.slice(0, len);
}

const DISHES = [
  "Egusi Soup","Jollof Rice","Pounded Yam","Amala & Ewedu",
  "Pepper Soup","Ofe Akwu","Suya","Nkwobi","Ofada Rice",
  "Afang Soup","Isi Ewu","Grilled Fish","Oha Soup","Abacha",
];

const FAQS = [
  {
    q: "Is Chow Here a delivery app?",
    a: "No. Chow Here is purely discovery. You search a dish, find the restaurant, and go eat. No delivery fees, no middleman. Just you and your food.",
  },
  {
    q: "Which areas of Abuja will be covered?",
    a: "We are starting with Wuse 2, Maitama, Garki, Area 11, Gwarinpa, Utako, Asokoro, Mabushi, Jabi, and Kado. More areas follow after launch.",
  },
  {
    q: "How do you verify a dish is actually available?",
    a: "Every listing on Chow Here is verified before it goes live. We confirm dish availability directly with each restaurant on your behalf, so by the time you search, the work is already done. Accuracy is our core promise, and we stand behind every result.",
  },
  {
    q: "Can I list my restaurant on Chow Here?",
    a: "Yes, and it is completely free for your first year. No commission on any order. We simply send you customers. Join the waitlist and select Restaurant Owner.",
  },
  {
    q: "What if the dish I want is not in your database?",
    a: "Tell us in the form below. Every dish you name goes straight into our research queue. Your craving literally builds the platform.",
  },
  {
    q: "When are you launching?",
    a: "Soon. The moment we go live, you will be the first to know. Waitlist members get a personal message from our team before we open to everyone else.",
  },
];

const HAVE_EVER = [
  { n: "01", q: "Have you ever craved a specific Nigerian dish and spent more time searching for it than actually eating it?" },
  { n: "02", q: "Have you ever arrived at a restaurant in Abuja and the one dish you came for was not available?" },
  { n: "03", q: "Have you ever given up and eaten something you did not want, just because you could not find what you were craving?" },
];

const STEPS = [
  { n: "01", title: "Search your dish", body: "Type exactly what you are craving. Egusi, Nkwobi, Amala and Ewedu, anything. Not a restaurant. The dish." },
  { n: "02", title: "See verified results", body: "Every result is manually confirmed. You see which Abuja restaurants serve it, how far they are, and when they open." },
  { n: "03", title: "Go eat", body: "No delivery fee. No commission. No guessing. Just you and the dish you wanted, exactly where to find it." },
];

function Skeleton({ w = "100%", h = 16, r = 6, style = {} }) {
  return (
    <div style={{
      width: w, height: h, borderRadius: r,
      background: "linear-gradient(90deg, #e8e0d4 25%, #f0e9df 50%, #e8e0d4 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.4s infinite",
      flexShrink: 0,
      ...style,
    }} />
  );
}

function PageSkeleton() {
  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#FAF6EF", minHeight: "100vh", overflow: "hidden" }}>
      <style>{`@keyframes shimmer { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }`}</style>
      {/* nav */}
      <div style={{ padding: "12px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(26,92,58,.08)" }}>
        <Skeleton w={110} h={24} r={6} />
        <Skeleton w={100} h={34} r={6} />
      </div>
      {/* hero */}
      <div style={{ padding: "88px 24px 72px", background: "#0F1F15", minHeight: "100svh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ maxWidth: 620, width: "100%", display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
          <Skeleton w={140} h={12} r={4} style={{ background: "rgba(224,123,48,.3)" }} />
          <Skeleton w="80%" h={52} r={6} style={{ background: "rgba(255,255,255,.1)" }} />
          <Skeleton w="60%" h={36} r={6} style={{ background: "rgba(255,255,255,.08)" }} />
          <Skeleton w="50%" h={36} r={6} style={{ background: "rgba(255,255,255,.08)" }} />
          <Skeleton w="100%" h={52} r={8} style={{ marginTop: 8, background: "rgba(255,255,255,.07)" }} />
          {[0,1,2].map(i => <Skeleton key={i} w="100%" h={54} r={8} style={{ background: "rgba(255,255,255,.06)" }} />)}
          <Skeleton w="90%" h={20} r={4} style={{ marginTop: 12, background: "rgba(255,255,255,.07)" }} />
          <div style={{ display: "flex", gap: 12, width: "100%", justifyContent: "center" }}>
            <Skeleton w={160} h={48} r={6} style={{ background: "rgba(224,123,48,.35)" }} />
            <Skeleton w={140} h={48} r={6} style={{ background: "rgba(255,255,255,.1)" }} />
          </div>
        </div>
      </div>
      {/* how it works */}
      <div style={{ background: "#1A5C3A", padding: "80px 24px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <Skeleton w={120} h={12} r={4} style={{ background: "rgba(224,123,48,.3)" }} />
          <Skeleton w="50%" h={40} r={6} style={{ marginTop: 12, background: "rgba(255,255,255,.1)" }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 40, marginTop: 40 }}>
            {[0,1,2].map(i => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Skeleton w={48} h={44} r={4} style={{ background: "rgba(255,255,255,.1)" }} />
                <Skeleton w="70%" h={22} r={4} style={{ background: "rgba(255,255,255,.1)" }} />
                <Skeleton w="100%" h={14} r={4} style={{ background: "rgba(255,255,255,.07)" }} />
                <Skeleton w="80%" h={14} r={4} style={{ background: "rgba(255,255,255,.07)" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* stats */}
      <div style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 24 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Skeleton w={80} h={52} r={4} />
              <Skeleton w={120} h={14} r={4} />
            </div>
          ))}
        </div>
      </div>
      {/* faq */}
      <div style={{ background: "white", padding: "80px 24px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
          <Skeleton w={100} h={12} r={4} />
          <Skeleton w="60%" h={38} r={6} />
          {[0,1,2,3,4,5].map(i => (
            <div key={i} style={{ paddingBottom: 20, borderBottom: "1px solid rgba(26,92,58,.08)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
              <Skeleton w="80%" h={18} r={4} />
              <Skeleton w={24} h={24} r={4} />
            </div>
          ))}
        </div>
      </div>
      {/* waitlist form */}
      <div style={{ background: "#0F1F15", padding: "80px 24px 88px" }}>
        <div style={{ maxWidth: 480, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
          <Skeleton w="60%" h={44} r={6} style={{ background: "rgba(255,255,255,.1)" }} />
          <Skeleton w="90%" h={18} r={4} style={{ background: "rgba(255,255,255,.07)" }} />
          {[0,1,2,3,4].map(i => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Skeleton w={100} h={12} r={4} style={{ background: "rgba(255,255,255,.08)" }} />
              <Skeleton w="100%" h={48} r={6} style={{ background: "rgba(255,255,255,.07)" }} />
            </div>
          ))}
          <Skeleton w="100%" h={52} r={6} style={{ background: "rgba(224,123,48,.3)", marginTop: 8 }} />
        </div>
      </div>
    </div>
  );
}

export default function WaitlistPage() {
  const [pageReady, setPageReady] = useState(false);
  const [dishIndex, setDishIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", type: "diner", dish: "" });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const typedDish = useTypewriter(DISHES[dishIndex], 62);

  useEffect(() => {
    const t = setTimeout(() => setPageReady(true), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setDishIndex(i => (i + 1) % DISHES.length), 2600);
    return () => clearInterval(t);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) { setErrorMsg("Please enter your name and email."); return; }
    setStatus("loading");
    setErrorMsg("");
    try {
      const sbRes = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/waitlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": import.meta.env.VITE_SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          "Prefer": "return=minimal",
        },
        body: JSON.stringify({
          name: form.name, email: form.email,
          whatsapp: form.whatsapp || null,
          user_type: form.type,
          hardest_dish: form.dish || null,
          joined_at: new Date().toISOString(),
        }),
      });
      if (!sbRes.ok) throw new Error("Database error");

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_name: form.name,
          to_email: form.email,
          hardest_dish: form.dish || "not specified",
          user_type: form.type,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  if (!pageReady) return <PageSkeleton />;

  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#FAF6EF", color: "#0F1F15", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
        @keyframes blink { 0%,100% { opacity:1 } 50% { opacity:0 } }
        @keyframes mapPulse { 0%,100% { r:5 } 50% { r:9 } }
        @keyframes subtleIn { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }
        @keyframes shimmer { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }

        * { box-sizing: border-box; }
        .fade { animation: fadeUp .7s cubic-bezier(.22,1,.36,1) both }

        a { color: #1A5C3A; }

        .tw-cursor {
          display: inline-block;
          width: 2px;
          background: #E07B30;
          margin-left: 2px;
          vertical-align: text-bottom;
          height: 1.1em;
          animation: blink .75s step-end infinite;
          border-radius: 1px;
        }

        input, select {
          width: 100%;
          padding: 14px 16px;
          border: 1.5px solid rgba(26,92,58,.18);
          border-radius: 6px;
          font-size: 15px;
          font-family: Georgia, serif;
          background: rgba(255,255,255,.06);
          color: white;
          outline: none;
          transition: border-color .2s, background .2s;
          -webkit-appearance: none;
        }
        input::placeholder { color: rgba(255,255,255,.3); }
        input:focus, select:focus {
          border-color: rgba(224,123,48,.6);
          background: rgba(255,255,255,.09);
        }
        select option { background: #0F1F15; color: white; }

        .btn-primary {
          background: #E07B30;
          color: white;
          border: none;
          padding: 16px 36px;
          font-size: 16px;
          font-family: Georgia, serif;
          letter-spacing: .01em;
          cursor: pointer;
          border-radius: 6px;
          width: 100%;
          transition: background .2s, transform .15s, box-shadow .2s;
          box-shadow: 0 4px 18px rgba(224,123,48,.28);
        }
        .btn-primary:hover {
          background: #c96a20;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(224,123,48,.36);
        }
        .btn-primary:active { transform: translateY(0); }
        .btn-primary:disabled { background: rgba(255,255,255,.12); box-shadow: none; cursor: not-allowed; transform: none; }

        .faq-item {
          border-bottom: 1px solid rgba(26,92,58,.1);
          cursor: pointer;
          padding: 22px 0;
          width: 100%;
          overflow: hidden;
        }
        .faq-item:first-of-type { border-top: 1px solid rgba(26,92,58,.1); }
        .faq-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          width: 100%;
        }
        .faq-q {
          font-size: 16px;
          font-weight: 400;
          line-height: 1.55;
          margin: 0;
          transition: color .2s;
          font-family: Georgia, serif;
          flex: 1;
          min-width: 0;
          word-break: break-word;
        }
        .faq-item:hover .faq-q { color: #E07B30; }
        .faq-a {
          font-size: 14.5px;
          line-height: 1.82;
          color: #555;
          font-family: sans-serif;
          margin: 14px 0 0;
          animation: subtleIn .22s ease both;
          padding-right: 8px;
          word-break: break-word;
        }
        .faq-icon {
          font-size: 22px;
          color: #E07B30;
          flex-shrink: 0;
          line-height: 1;
          margin-top: 2px;
          transition: transform .22s cubic-bezier(.22,1,.36,1);
          font-family: sans-serif;
          font-weight: 300;
          user-select: none;
        }

        .have-card {
          position: relative;
          padding: 20px 22px 20px 58px;
          margin-bottom: 12px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(15,31,21,.06), 0 4px 14px rgba(15,31,21,.05);
          font-size: 15px;
          line-height: 1.72;
          font-family: sans-serif;
          color: #333;
          transition: box-shadow .2s, transform .2s;
        }
        .have-card:hover {
          box-shadow: 0 2px 6px rgba(15,31,21,.08), 0 8px 22px rgba(15,31,21,.08);
          transform: translateY(-1px);
        }
        .have-num {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          font-family: Georgia, serif;
          font-style: italic;
          font-size: 22px;
          color: #E07B30;
          opacity: .55;
          line-height: 1;
        }

        .pill {
          display: inline-block;
          padding: 5px 13px;
          border: 1px solid rgba(26,92,58,.2);
          border-radius: 20px;
          font-size: 11px;
          font-family: sans-serif;
          margin: 3px;
          color: #1A5C3A;
          transition: background .15s, color .15s;
        }
        .pill:hover { background: #1A5C3A; color: white; }

        .hero-pill {
          display: inline-block;
          padding: 5px 13px;
          border: 1px solid rgba(255,255,255,.25);
          border-radius: 20px;
          font-size: 11px;
          font-family: sans-serif;
          margin: 3px;
          color: rgba(255,255,255,.7);
          backdrop-filter: blur(4px);
          transition: background .15s, color .15s, border-color .15s;
        }
        .hero-pill:hover { background: rgba(255,255,255,.15); color: white; border-color: rgba(255,255,255,.5); }

        .tag {
          font-family: sans-serif;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #E07B30;
          margin-bottom: 14px;
        }

        .step-card {
          border-top: 2px solid rgba(255,255,255,.15);
          padding-top: 24px;
          transition: border-color .2s;
        }
        .step-card:hover { border-top-color: #E07B30; }

        .stat-block {
          padding: 28px 0 24px;
          border-top: 2px solid #E07B30;
          position: relative;
        }
        .stat-block::after {
          content: '';
          position: absolute;
          top: -2px; left: 0;
          width: 40%;
          height: 2px;
          background: #1A5C3A;
        }

        .form-field { display: flex; flex-direction: column; gap: 8px; }
        .form-label {
          color: rgba(255,255,255,.45);
          font-size: 10px;
          font-family: sans-serif;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }
        .form-hint {
          color: rgba(255,255,255,.22);
          font-size: 11px;
          font-family: sans-serif;
          margin-top: 5px;
        }

        @media (max-width: 600px) {
          :root { --map-display: none; }
          .have-card { padding: 18px 18px 18px 50px; }
          .have-num { font-size: 18px; left: 14px; }
          .faq-q { font-size: 14.5px; }
          .faq-a { font-size: 13.5px; padding-right: 0; }
          .faq-icon { font-size: 20px; }
          nav { padding: 10px 16px !important; }
          .tw-box { flex-direction: column !important; height: auto !important; padding: 12px 16px !important; gap: 6px !important; }
          .tw-box .tw-sep { display: none !important; }
          .tw-dish { min-width: unset !important; text-align: center !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        background: "rgba(250,246,239,.96)",
        borderBottom: "1px solid rgba(26,92,58,.08)",
        padding: "12px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 30, height: 30,
            background: "linear-gradient(135deg, #1A5C3A 55%, #E07B30 45%)",
            borderRadius: 6,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 700, fontSize: 13, color: "white",
            fontFamily: "sans-serif",
            boxShadow: "0 2px 8px rgba(26,92,58,.25)",
          }}>C</div>
          <span style={{ fontWeight: 700, fontSize: 16, color: "#1A5C3A", fontFamily: "sans-serif", letterSpacing: "-.01em" }}>Chow Here</span>
        </div>
        <a href="#waitlist" style={{
          background: "#1A5C3A",
          color: "white",
          textDecoration: "none",
          padding: "9px 22px",
          borderRadius: 6,
          fontSize: 13,
          fontFamily: "sans-serif",
          fontWeight: 600,
          letterSpacing: ".01em",
          transition: "background .18s, transform .12s",
          boxShadow: "0 2px 10px rgba(26,92,58,.2)",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "#14472d"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#1A5C3A"; e.currentTarget.style.transform = "translateY(0)"; }}
        >Join waitlist</a>
      </nav>

      {/* HERO */}
      <section style={{
        padding: "88px 24px 72px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>

        {/* Video background */}
        <video
          autoPlay muted loop playsInline
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center",
            zIndex: 0,
          }}
          src="https://res.cloudinary.com/dzr18sd58/video/upload/v1779547842/watermarked_preview_2_oo48fo.mp4"
        />

        {/* Dim overlay — gradient so bottom edge fades cleanly into next section */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "linear-gradient(to bottom, rgba(8,20,13,.80) 0%, rgba(8,20,13,.70) 55%, rgba(8,20,13,.92) 100%)",
        }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 620, width: "100%" }} className="fade">
          <p className="tag" style={{ color: "#E07B30" }}>Abuja · Nigeria · Launching Soon</p>

          <h1 style={{ fontSize: "clamp(34px,6.5vw,64px)", fontWeight: 400, lineHeight: 1.08, marginBottom: 28, letterSpacing: "-.02em", color: "white" }}>
            Find the exact dish<br/>
            <em style={{ color: "#E07B30", fontStyle: "italic" }}>you're craving</em><br/>
            right now.
          </h1>

          {/* Typewriter dish ticker */}
          <div className="tw-box" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 44, background: "rgba(0,0,0,.35)", borderRadius: 8, padding: "0 22px", height: 52, backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", maxWidth: "100%" }}>
            <span style={{ fontSize: 15, color: "rgba(255,255,255,.8)", fontFamily: "sans-serif", fontWeight: 700, flexShrink: 0, letterSpacing: "-.01em" }}>Searching for</span>
            <span className="tw-sep" style={{ width: 1, height: 20, background: "rgba(255,255,255,.2)", flexShrink: 0 }} />
            <span className="tw-dish" style={{ fontSize: 18, color: "#E07B30", fontWeight: 600, fontFamily: "Georgia, serif", fontStyle: "italic", minWidth: 180, textAlign: "left" }}>
              {typedDish}<span className="tw-cursor" />
            </span>
          </div>

          {/* Have you ever */}
          <div style={{ maxWidth: 510, margin: "0 auto 44px", textAlign: "left" }}>
            {HAVE_EVER.map((item, i) => (
              <div
                key={i}
                className="have-card fade"
                style={{ animationDelay: `${i * 0.1 + 0.2}s`, background: "rgba(255,255,255,.93)" }}
              >
                <span className="have-num">{item.n}</span>
                {item.q}
              </div>
            ))}
          </div>

          <p style={{ fontSize: 17, lineHeight: 1.78, maxWidth: 480, margin: "0 auto 38px", color: "rgba(255,255,255,.75)", fontFamily: "sans-serif" }}>
            Chow Here is Abuja's first dish-first food discovery platform. Type the dish. Find where to eat it. Go.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
            <a href="#waitlist" style={{
              background: "#E07B30",
              color: "white",
              padding: "15px 36px",
              textDecoration: "none",
              fontSize: 15,
              borderRadius: 6,
              fontFamily: "sans-serif",
              fontWeight: 600,
              letterSpacing: ".01em",
              boxShadow: "0 4px 18px rgba(224,123,48,.4)",
              transition: "transform .15s, box-shadow .2s, background .15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 26px rgba(224,123,48,.5)"; e.currentTarget.style.background = "#c96a20"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 18px rgba(224,123,48,.4)"; e.currentTarget.style.background = "#E07B30"; }}
            >Join the waitlist</a>
            <a href="#how-it-works" style={{
              background: "transparent",
              color: "white",
              padding: "15px 36px",
              textDecoration: "none",
              fontSize: 15,
              border: "1.5px solid rgba(255,255,255,.4)",
              borderRadius: 6,
              fontFamily: "sans-serif",
              fontWeight: 600,
              transition: "border-color .15s, background .15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.8)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,.4)"; }}
            >How it works</a>
          </div>

          <div>
            <p style={{ fontFamily: "sans-serif", fontSize: 10, color: "rgba(255,255,255,.4)", marginBottom: 10, letterSpacing: 1.5, textTransform: "uppercase" }}>Starting in these Abuja areas</p>
            {["Wuse 2","Maitama","Garki","Gwarinpa","Asokoro","Utako","Jabi","Kado","Area 11"].map(a => (
              <span key={a} className="hero-pill">{a}</span>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{
        background: "#1A5C3A",
        padding: "80px 24px",
        backgroundImage: "repeating-linear-gradient(-48deg, rgba(255,255,255,.012) 0px, rgba(255,255,255,.012) 1px, transparent 1px, transparent 9px)",
      }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <p className="tag" style={{ color: "#E07B30" }}>How it works</p>
          <h2 style={{ fontSize: "clamp(28px,4.5vw,46px)", fontWeight: 400, color: "white", marginBottom: 56, letterSpacing: "-.02em", lineHeight: 1.12 }}>Three steps to your next plate.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 40 }}>
            {STEPS.map((s, i) => (
              <div key={i} className="step-card">
                <div style={{ fontSize: 44, color: "rgba(255,255,255,.18)", fontStyle: "italic", marginBottom: 18, lineHeight: 1, fontFamily: "Georgia, serif" }}>{s.n}</div>
                <h3 style={{ fontSize: 19, fontWeight: 400, color: "white", marginBottom: 12, letterSpacing: "-.01em" }}>{s.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.78, color: "rgba(255,255,255,.6)", fontFamily: "sans-serif", margin: 0 }}>{s.body}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 60, padding: "32px 36px", borderLeft: "3px solid #E07B30", background: "rgba(255,255,255,.05)", borderRadius: "0 8px 8px 0" }}>
            <p style={{ fontSize: 16, fontStyle: "italic", lineHeight: 1.85, color: "rgba(255,255,255,.78)", margin: 0, fontFamily: "sans-serif" }}>
              "Right now your best option is sending a WhatsApp to one friend who knows Abuja food. Chow Here is what happens when that friend knows every restaurant in the city and is always available."
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{
        background: "#FAF6EF",
        padding: "64px 24px",
        borderBottom: "1px solid rgba(26,92,58,.08)",
      }}>
        <div style={{ maxWidth: 780, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 0 }}>
          {[
            { n: "10+", l: "Restaurants verified" },
            { n: "20+", l: "Nigerian dishes mapped" },
            { n: "5+",  l: "Abuja areas covered" },
          ].map((s, i) => (
            <div key={s.l} className="stat-block" style={{ padding: "28px 24px 24px", borderRight: i < 3 ? "1px solid rgba(26,92,58,.08)" : "none" }}>
              <div style={{ fontSize: "clamp(44px,5vw,58px)", color: "#1A5C3A", fontStyle: "italic", lineHeight: 1, marginBottom: 8, letterSpacing: "-.03em" }}>{s.n}</div>
              <div style={{ fontSize: 12, color: "#999", fontFamily: "sans-serif", letterSpacing: .5, lineHeight: 1.5 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "80px 24px", background: "white", overflow: "hidden" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}>
          <p className="tag">Questions</p>
          <h2 style={{ fontSize: "clamp(26px,4vw,44px)", fontWeight: 400, marginBottom: 48, letterSpacing: "-.02em", lineHeight: 1.14 }}>Everything you want to know.</h2>
          {FAQS.map((f, i) => (
            <div key={i} className="faq-item" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div className="faq-header">
                <h4 className="faq-q" style={{ color: openFaq === i ? "#E07B30" : "#0F1F15" }}>{f.q}</h4>
                <span className="faq-icon" style={{ transform: openFaq === i ? "rotate(45deg)" : "none" }}>+</span>
              </div>
              {openFaq === i && <p className="faq-a">{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* WAITLIST FORM */}
      <section id="waitlist" style={{
        background: "#0F1F15",
        padding: "80px 24px 88px",
        backgroundImage: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(26,92,58,.3) 0%, transparent 70%)",
      }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>

          {/* decorative divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.08)" }} />
            <span style={{ fontFamily: "sans-serif", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#E07B30", flexShrink: 0 }}>Join the waitlist</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.08)" }} />
          </div>

          <h2 style={{ fontSize: "clamp(28px,4.5vw,48px)", fontWeight: 400, color: "white", marginBottom: 14, lineHeight: 1.16, letterSpacing: "-.025em" }}>
            Be first to find<br/><em style={{ color: "#E07B30" }}>any dish</em> in Abuja.
          </h2>
          <p style={{ color: "rgba(255,255,255,.5)", fontFamily: "sans-serif", fontSize: 15, marginBottom: 44, lineHeight: 1.75 }}>
            Waitlist members get early access and a personal message from our team before anyone else. No spam. Ever.
          </p>

          {status === "success" ? (
            <div style={{
              textAlign: "center",
              padding: "52px 36px",
              border: "1px solid rgba(224,123,48,.2)",
              borderRadius: 12,
              background: "rgba(255,255,255,.03)",
              animation: "fadeUp .5s ease both",
            }}>
              <div style={{ fontSize: 54, marginBottom: 20 }}>🍲</div>
              <h3 style={{ color: "white", fontSize: 26, fontWeight: 400, marginBottom: 14, letterSpacing: "-.02em" }}>You're in.</h3>
              <p style={{ color: "rgba(255,255,255,.55)", fontFamily: "sans-serif", fontSize: 15, lineHeight: 1.85 }}>
                Check your email. We just sent you a confirmation. The moment we go live, you will hear from us personally. In the meantime, tell one person in Abuja about Chow Here.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div className="form-field">
                <label className="form-label">Your name *</label>
                <input type="text" placeholder="What should we call you?" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="form-field">
                <label className="form-label">Email address *</label>
                <input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div className="form-field">
                <label className="form-label">WhatsApp number <span style={{ opacity: .35, textTransform: "none", letterSpacing: 0 }}>(optional)</span></label>
                <input type="tel" placeholder="+234 800 000 0000" value={form.whatsapp} onChange={e => setForm({ ...form, whatsapp: e.target.value })} />
              </div>
              <div className="form-field">
                <label className="form-label">I am a</label>
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                  <option value="diner">Food lover / Diner</option>
                  <option value="corper">NYSC Corper in Abuja</option>
                  <option value="new">New to Abuja</option>
                  <option value="owner">Restaurant / Buka Owner</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-field">
                <label className="form-label">The dish I always struggle to find</label>
                <input type="text" placeholder="e.g. Ofe Akwu, Nkwobi, Amala and Ewedu..." value={form.dish} onChange={e => setForm({ ...form, dish: e.target.value })} />
                <p className="form-hint">Every dish you name goes straight into our research queue.</p>
              </div>

              {errorMsg && <p style={{ color: "#E07B30", fontSize: 13, fontFamily: "sans-serif", margin: 0 }}>{errorMsg}</p>}

              <div style={{ marginTop: 6 }}>
                <button type="submit" className="btn-primary" disabled={status === "loading"}>
                  {status === "loading" ? "Joining..." : "Join the waitlist →"}
                </button>
              </div>
              <p style={{ color: "rgba(255,255,255,.2)", fontSize: 11, fontFamily: "sans-serif", textAlign: "center", marginTop: 2 }}>
                No spam. No marketing fluff. Just a message when we are ready for you.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0A1810", borderTop: "1px solid rgba(255,255,255,.05)", padding: "22px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <span style={{ color: "rgba(255,255,255,.18)", fontFamily: "sans-serif", fontSize: 12 }}>
          2026 Chow Here · Abuja, Nigeria
        </span>
        <span style={{ color: "rgba(255,255,255,.18)", fontFamily: "sans-serif", fontSize: 12 }}>chowhere.com</span>
      </footer>
    </div>
  );
}
