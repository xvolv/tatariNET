export default function ConsultingPage() {
  return (
    <main className="min-h-screen bg-white py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-bold mb-4">Consulting — Coming Soon</h1>
        <p className="text-lg text-slate-700 mb-6">
          We're preparing a consulting program that will provide practical,
          actionable advice for client services: finding clients, winning work
          on platforms like Upwork, pricing projects, presenting proposals, and
          running a small client-facing engineering team.
        </p>

        <p className="text-sm text-slate-600 mb-4">
          This feature will launch on <strong>Dec 21, 2025</strong>. We are not
          offering consulting yet — this page is a placeholder to announce the
          upcoming program.
        </p>

        <div className="mt-6">
          <a
            href="/"
            className="inline-block bg-primary text-white px-4 py-2 rounded-md hover:opacity-90"
          >
            Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}
