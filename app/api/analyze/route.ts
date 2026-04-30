import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { contract } = await req.json();
    if (!contract || contract.length < 50) return NextResponse.json({ error: "Contract too short" }, { status: 400 });

    const prompt = `You are an expert contract attorney. Analyze this contract and return ONLY valid JSON, no markdown, no extra text.

Contract:
${contract.slice(0, 6000)}

Return exactly this JSON:
{"riskScore":<0-100>,"summary":"<2-3 sentences>","redFlags":[{"clause":"<name>","reason":"<why risky>","severity":"high|medium|low"}],"suggestions":[{"clause":"<name>","suggestion":"<tip>"}],"keyTerms":[{"term":"<label>","value":"<value>"}]}`;

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://contractiqg.vercel.app",
        "X-Title": "ContractIQ",
      },
      body: JSON.stringify({
        model: "openrouter/free",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
      }),
    });

    const data = await res.json();
    if (!res.ok) return NextResponse.json({ error: JSON.stringify(data) }, { status: 500 });

    const text = data.choices?.[0]?.message?.content || "{}";
    const clean = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return NextResponse.json(JSON.parse(clean));
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Unknown error" }, { status: 500 });
  }
}
