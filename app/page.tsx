"use client";
export const dynamic = "force-dynamic";
export const runtime = "edge";
import { useState } from "react";

type RedFlag = { clause: string; reason: string; severity: string };
type Suggestion = { clause: string; suggestion: string };
type KeyTerm = { term: string; value: string };
type Analysis = { riskScore: number; summary: string; redFlags: RedFlag[]; suggestions: Suggestion[]; keyTerms: KeyTerm[]; error?: string };

const SAMPLES: Record<string, string> = {
  NDA: "NON-DISCLOSURE AGREEMENT\n\nBetween TechCorp Inc. and the undersigned, January 2025.\n\n1. CONFIDENTIAL INFORMATION. Keep all TechCorp info confidential for 10 years.\n2. NON-COMPETE. No competing business for 5 years globally.\n3. PENALTIES. Breach results in $500,000 damages per incident.\n4. ASSIGNMENT. TechCorp may assign without consent.\n5. GOVERNING LAW. Delaware courts only.",
  Freelance: "FREELANCE AGREEMENT\n\nClientCo and Contractor, January 2025.\n\n1. PAYMENT. $50/hour, net-90. Final payment withheld at Client discretion.\n2. IP. All work belongs to Client even if unpaid.\n3. REVISIONS. Unlimited revisions for 2 years.\n4. TERMINATION. Client terminates anytime, no kill fee.\n5. INDEMNIFICATION. Contractor covers all Client claims.",
  SaaS: "SAAS AGREEMENT\n\nDataSoft LLC and Customer.\n\n1. SERVICE. Provider may discontinue with 7 days notice.\n2. DATA. Perpetual license to use customer data for marketing.\n3. PRICING. Price changes anytime; continued use means acceptance.\n4. LIABILITY. Total liability capped at $100 including data loss.\n5. RENEWAL. Auto-renews 2 years; cancel 120 days prior by mail only.",
};

export default function Home() {
  const [contract, setContract] = useState("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const riskColor = (s: number) => s >= 70 ? "#f87171" : s >= 40 ? "#fbbf24" : "#34d399";

  const analyze = async () => {
    if (contract.length < 50) return;
    setLoading(true); setError(""); setAnalysis(null);
    try {
      const res = await fetch("/api/analyze", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contract }) });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setAnalysis(data);
    } catch { setError("Failed. Check GEMINI_API_KEY in .env.local"); }
    setLoading(false);
  };

  return (
    <div style={{ minHeight:"100vh", background:"#0a0a0f", color:"white", fontFamily:"monospace", margin:0 }}>
      <style>{`*{box-sizing:border-box;margin:0;padding:0} ::placeholder{color:rgba(255,255,255,0.2)!important}`}</style>
      <header style={{ borderBottom:"1px solid rgba(255,255,255,0.07)", padding:"0 32px", height:60, display:"flex", alignItems:"center", justifyContent:"space-between", background:"rgba(10,10,15,0.9)" }}>
        <span style={{ fontWeight:800, fontSize:14, letterSpacing:4 }}>CONTRACT<span style={{ color:"#818cf8" }}>IQ</span></span>
        <span style={{ fontSize:11, color:"#a5b4fc", border:"1px solid rgba(99,102,241,0.3)", padding:"4px 12px", borderRadius:999, background:"rgba(99,102,241,0.08)" }}>Built by Krishay</span>
      </header>

      <main style={{ maxWidth:1100, margin:"0 auto", padding:"48px 24px" }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <h1 style={{ fontSize:"clamp(32px,5vw,58px)", fontWeight:900, lineHeight:1.1, marginBottom:16 }}>
            Never Sign a <span style={{ color:"#818cf8" }}>Risky Contract</span> Again
          </h1>
          <p style={{ color:"rgba(255,255,255,0.38)", fontSize:14 }}>Paste any contract · Instant risk score · Red flags · Negotiation tips</p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, alignItems:"start" }}>
          <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:20, padding:24 }}>
            <textarea value={contract} onChange={e => setContract(e.target.value)} placeholder="Paste your contract here..." rows={16}
              style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:10, padding:"12px 16px", color:"white", fontSize:13, fontFamily:"monospace", outline:"none", resize:"none", lineHeight:1.6, display:"block", marginBottom:12 }} />
            <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:16, flexWrap:"wrap" }}>
              <span style={{ fontSize:11, color:"rgba(255,255,255,0.22)" }}>Sample:</span>
              {["NDA","Freelance","SaaS"].map(t => <button key={t} onClick={() => setContract(SAMPLES[t])} style={{ fontSize:11, color:"#818cf8", background:"none", border:"none", cursor:"pointer", textDecoration:"underline", fontFamily:"monospace" }}>{t}</button>)}
              <span style={{ marginLeft:"auto", fontSize:11, color:"rgba(255,255,255,0.18)" }}>{contract.length} chars</span>
            </div>
            {error && <div style={{ fontSize:12, color:"#fca5a5", background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", padding:"10px 14px", borderRadius:10, marginBottom:12 }}>{error}</div>}
            <button onClick={analyze} disabled={loading || contract.length < 50}
              style={{ width:"100%", background:loading||contract.length<50?"rgba(99,102,241,0.25)":"#6366f1", color:loading||contract.length<50?"rgba(255,255,255,0.4)":"white", border:"none", borderRadius:12, padding:"14px", fontWeight:700, fontSize:14, cursor:contract.length<50?"not-allowed":"pointer", fontFamily:"monospace" }}>
              {loading ? "⏳ Analyzing..." : "Analyze Contract →"}
            </button>
          </div>

          <div>
            {!analysis && !loading && (
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:320, border:"1px dashed rgba(255,255,255,0.07)", borderRadius:20, gap:12 }}>
                <span style={{ fontSize:44 }}>⚖️</span>
                <p style={{ color:"rgba(255,255,255,0.2)", fontSize:13 }}>Results appear here</p>
              </div>
            )}
            {loading && [1,2,3].map(i => <div key={i} style={{ background:"rgba(255,255,255,0.03)", borderRadius:20, height:100, marginBottom:14, opacity:0.5 }} />)}
            {analysis && <>
              <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:20, padding:24, marginBottom:14 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                  <span style={{ fontSize:10, color:"rgba(255,255,255,0.35)", letterSpacing:3 }}>RISK SCORE</span>
                  <span style={{ fontSize:42, fontWeight:900, color:riskColor(analysis.riskScore), lineHeight:1 }}>{analysis.riskScore}<span style={{ fontSize:16, color:"rgba(255,255,255,0.2)", fontWeight:400 }}>/100</span></span>
                </div>
                <div style={{ height:6, background:"rgba(255,255,255,0.06)", borderRadius:999, overflow:"hidden", marginBottom:16 }}>
                  <div style={{ height:"100%", width:`${analysis.riskScore}%`, background:`linear-gradient(90deg,#00cc88,${riskColor(analysis.riskScore)})`, borderRadius:999 }} />
                </div>
                <p style={{ fontSize:13, color:"rgba(255,255,255,0.58)", lineHeight:1.65 }}>{analysis.summary}</p>
              </div>

              {analysis.keyTerms?.length > 0 && (
                <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:20, padding:24, marginBottom:14 }}>
                  <span style={{ fontSize:10, color:"rgba(255,255,255,0.35)", letterSpacing:3, display:"block", marginBottom:14 }}>KEY TERMS</span>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                    {analysis.keyTerms.map((t,i) => <div key={i} style={{ background:"rgba(255,255,255,0.03)", borderRadius:9, padding:"9px 13px" }}><div style={{ fontSize:10, color:"rgba(255,255,255,0.3)", marginBottom:3 }}>{t.term}</div><div style={{ fontSize:12, fontWeight:600, color:"rgba(255,255,255,0.82)" }}>{t.value}</div></div>)}
                  </div>
                </div>
              )}

              {analysis.redFlags?.length > 0 && (
                <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:20, padding:24, marginBottom:14 }}>
                  <span style={{ fontSize:10, color:"rgba(255,255,255,0.35)", letterSpacing:3, display:"block", marginBottom:14 }}>RED FLAGS ({analysis.redFlags.length})</span>
                  {analysis.redFlags.map((f,i) => (
                    <div key={i} style={{ border:"1px solid rgba(255,255,255,0.06)", borderRadius:12, padding:16, marginBottom:10 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", gap:8, marginBottom:6 }}>
                        <span style={{ fontSize:12, fontWeight:600, color:"rgba(255,255,255,0.85)" }}>{f.clause}</span>
                        <span style={{ fontSize:10, padding:"3px 9px", borderRadius:999, border:"1px solid", flexShrink:0, ...(f.severity==="high"?{color:"#fca5a5",borderColor:"rgba(239,68,68,0.3)",background:"rgba(239,68,68,0.08)"}:f.severity==="medium"?{color:"#fcd34d",borderColor:"rgba(245,158,11,0.3)",background:"rgba(245,158,11,0.08)"}:{color:"#6ee7b7",borderColor:"rgba(16,185,129,0.3)",background:"rgba(16,185,129,0.08)"}) }}>{f.severity}</span>
                      </div>
                      <p style={{ fontSize:12, color:"rgba(255,255,255,0.4)", lineHeight:1.55, margin:0 }}>{f.reason}</p>
                    </div>
                  ))}
                </div>
              )}

              {analysis.suggestions?.length > 0 && (
                <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:20, padding:24, marginBottom:14 }}>
                  <span style={{ fontSize:10, color:"rgba(255,255,255,0.35)", letterSpacing:3, display:"block", marginBottom:14 }}>NEGOTIATION TIPS</span>
                  {analysis.suggestions.map((s,i) => (
                    <div key={i} style={{ border:"1px solid rgba(99,102,241,0.22)", background:"rgba(99,102,241,0.05)", borderRadius:12, padding:16, marginBottom:10 }}>
                      <div style={{ fontSize:12, fontWeight:600, color:"#a5b4fc", marginBottom:5 }}>{s.clause}</div>
                      <p style={{ fontSize:12, color:"rgba(255,255,255,0.48)", lineHeight:1.55, margin:0 }}>{s.suggestion}</p>
                    </div>
                  ))}
                </div>
              )}

              <button onClick={() => { setAnalysis(null); setContract(""); setError(""); }} style={{ width:"100%", fontSize:12, color:"rgba(255,255,255,0.28)", background:"none", border:"none", cursor:"pointer", padding:"10px", fontFamily:"monospace" }}>
                ↩ Clear & Analyze Another
              </button>
            </>}
          </div>
        </div>
      </main>
      <footer style={{ borderTop:"1px solid rgba(255,255,255,0.05)", padding:"28px 24px", textAlign:"center", marginTop:60 }}>
        <p style={{ fontSize:11, color:"rgba(255,255,255,0.18)", margin:0 }}>ContractIQ · Built by Krishay · Not legal advice</p>
      </footer>
    </div>
  );
}
