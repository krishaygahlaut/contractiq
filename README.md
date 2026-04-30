# ⚖️ ContractIQ — AI Contract Risk Analyzer

> Never sign a risky contract again. Paste any legal document and get an instant risk score, red flags, and negotiation tips powered by LLaMA 3.3 70B.

**🔗 Live Demo → [contractiqai.vercel.app](https://contractiqai.vercel.app)**

![ContractIQ](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel)
![AI](https://img.shields.io/badge/AI-LLaMA%203.3%2070B-purple?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 🚀 What It Does

Most freelancers and founders sign contracts without fully understanding the risk. Net-90 payment terms. Unlimited revision clauses. IP ownership on unpaid work. These cost people thousands.

**ContractIQ solves this:**

| Feature | Description |
|---|---|
| ⚖️ **Risk Score** | 0–100 score with visual indicator (green → red) |
| 🚩 **Red Flags** | Every risky clause identified with severity (high / medium / low) |
| 💡 **Negotiation Tips** | Specific, actionable suggestions per clause |
| 📋 **Key Term Extraction** | Payment terms, IP ownership, jurisdiction, termination — all extracted instantly |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| AI | LLaMA 3.3 70B via OpenRouter |
| Runtime | Vercel Edge Runtime |
| Deployment | Vercel (CI/CD on every push) |
| Styling | Inline CSS (zero dependencies) |

**Zero database. Zero backend server. Zero monthly cost.**
The entire AI pipeline runs in a single Edge Runtime API route.

---

## 📁 Project Structure

```
contractiq/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts      # AI analysis endpoint
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main UI
├── next.config.js
├── package.json
└── tsconfig.json
```

---

## ⚡ Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/krishaygahlaut/contractiq.git
cd contractiq
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env.local` file in the root:
```env
OPENROUTER_API_KEY=your_openrouter_key_here
```
Get a free key at → [openrouter.ai](https://openrouter.ai) (no credit card required)

### 4. Run locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## 🌐 Deploy to Vercel

```bash
# 1. Push to GitHub
git add .
git commit -m "initial commit"
git push

# 2. Import on vercel.com
# 3. Add OPENROUTER_API_KEY in Environment Variables
# 4. Deploy ✓
```

---

## 💡 How It Works

```
User pastes contract
        ↓
Next.js API Route (Edge Runtime)
        ↓
Prompt sent to LLaMA 3.3 70B via OpenRouter
        ↓
AI returns structured JSON analysis
        ↓
UI renders risk score, red flags, suggestions
```

1. User pastes any legal document into the textarea
2. The frontend sends a `POST` request to `/api/analyze`
3. The API route constructs a legal analysis prompt and calls OpenRouter
4. OpenRouter routes to the best available free LLM (LLaMA 3.3 70B)
5. The AI returns structured JSON — risk score, red flags, key terms, suggestions
6. The UI renders everything with color-coded severity badges

---

## 🎯 Use Cases

- **Freelancers** — Check client contracts before signing
- **Founders** — Review SaaS agreements and vendor terms
- **Job seekers** — Analyze employment contracts and NDAs
- **Small businesses** — Quick first-pass legal review without a lawyer
- **Developers** — Fork and build your own legal tech product

---

## 📊 Sample Analysis

**Input:** Freelance Agreement with net-90 payment, unlimited revisions, IP on unpaid work

**Output:**
```json
{
  "riskScore": 78,
  "summary": "This contract heavily favors the client. Payment terms are unusually long, IP assignment is overly broad, and the revision clause creates unlimited unpaid work exposure.",
  "redFlags": [
    { "clause": "Payment Terms", "reason": "Net-90 means you wait 3 months to get paid", "severity": "high" },
    { "clause": "IP Ownership", "reason": "Client owns work even if they never pay", "severity": "high" },
    { "clause": "Unlimited Revisions", "reason": "No cap on revision requests for 2 years", "severity": "medium" }
  ],
  "suggestions": [
    { "clause": "Payment Terms", "suggestion": "Negotiate to net-14 or net-30 with 50% upfront deposit" },
    { "clause": "IP Ownership", "suggestion": "IP should transfer only upon full payment received" }
  ],
  "keyTerms": [
    { "term": "Payment", "value": "Net-90" },
    { "term": "IP Transfer", "value": "On creation (not payment)" },
    { "term": "Revisions", "value": "Unlimited / 2 years" },
    { "term": "Termination", "value": "Client anytime, no notice" }
  ]
}
```

---

## 🔒 Disclaimer

ContractIQ is an AI tool designed to assist with contract review. It is **not a substitute for professional legal advice**. Always consult a qualified attorney for important legal decisions.

---

## 👨‍💻 Built By

**Krishay Gahlaut**
Full Stack Developer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat&logo=linkedin)](https://linkedin.com/in/krishaygahlaut)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=flat&logo=github)](https://github.com/krishaygahlaut)
[![Live Demo](https://img.shields.io/badge/Live-Demo-green?style=flat)](https://contractiqai.vercel.app)

---

## 📄 License

MIT — free to use, fork, and build on.
