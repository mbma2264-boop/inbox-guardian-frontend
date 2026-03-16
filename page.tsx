import Link from "next/link";
import GmailConnectCard from "../components/GmailConnectCard";

export default function HomePage() {
  return (
    <main className="page">
      <div className="container">
        <section className="hero">
          <h1>Inbox Guardian Starter</h1>
          <p>
            A starter for a self-cleaning inbox app that sorts email, explains why,
            and recommends safe actions like archive, quarantine, unsubscribe, or report.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
            <Link href="/dashboard" className="button">Open dashboard</Link>
            <a href="http://localhost:8000/docs" className="button secondary">Backend docs</a>
          </div>
        </section>

        <section className="grid" style={{ marginBottom: 24 }}>
          <div className="card">
            <h2>Rules first</h2>
            <p>Deterministic rules score scams, promotions, and opportunities before any LLM step.</p>
          </div>
          <div className="card">
            <h2>Explainability</h2>
            <p>Every result includes risk, confidence, reasons, matched rules, and an action recommendation.</p>
          </div>
          <div className="card">
            <h2>Now with Gmail fetch</h2>
            <p>Google OAuth now exchanges the auth code and lets the dashboard pull your latest Gmail messages.</p>
          </div>
        </section>

        <GmailConnectCard />
      </div>
    </main>
  );
}
