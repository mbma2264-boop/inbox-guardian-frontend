type HomePageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = searchParams ? await searchParams : {};
  const gmailStatus = firstParam(params.gmail);
  const error = firstParam(params.error);

  return (
    <main className="page">
      <div className="container">
        <section className="hero">
          <h1>Inbox Guardian</h1>
          <p>
            Frontend deployment is working. Gmail OAuth is now wired through this
            deployed Next.js app instead of the broken backend redirect.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
            <a className="button" href="/api/gmail/oauth/start">
              Connect Gmail
            </a>
          </div>
          {gmailStatus === 'connected' && (
            <p className="status success">Gmail connected successfully.</p>
          )}
          {error && (
            <p className="status error">Gmail connection error: {decodeURIComponent(error)}</p>
          )}
        </section>

        <section className="grid">
          <div className="card">
            <h2>Step 1</h2>
            <p>Click Connect Gmail.</p>
          </div>
          <div className="card">
            <h2>Step 2</h2>
            <p>Approve the Google permission screen.</p>
          </div>
          <div className="card">
            <h2>Step 3</h2>
            <p>The app will return here with a connected confirmation or a readable error.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
