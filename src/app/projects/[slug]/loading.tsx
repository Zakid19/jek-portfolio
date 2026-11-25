export default function ProjectDetailLoading() {
  return (
    <main
      className="min-h-screen bg-bg"
      aria-label="Loading project details"
      aria-busy="true"
    >
      <article className="container animate-pulse pb-24 pt-28 sm:pt-32">
        {/* Back Navigation */}
        <div className="mb-10 h-5 w-36 rounded bg-bg-elev" />

        {/* Project Header */}
        <header className="mb-10 max-w-4xl">
          <div className="mb-6 flex gap-3">
            <div className="h-7 w-28 rounded bg-bg-elev" />
            <div className="h-7 w-20 rounded bg-bg-elev" />
          </div>

          <div className="h-12 w-3/4 rounded bg-bg-elev sm:h-16" />

          <div className="mt-6 h-5 w-full max-w-2xl rounded bg-bg-elev" />
          <div className="mt-3 h-5 w-2/3 rounded bg-bg-elev" />

          <div className="mt-7 flex gap-3">
            <div className="h-11 w-36 rounded-md bg-bg-elev" />
            <div className="h-11 w-32 rounded-md bg-bg-elev" />
          </div>
        </header>

        {/* Hero Image */}
        <div className="aspect-[16/9] w-full rounded-xl border border-border bg-bg-elev sm:aspect-[2/1]" />

        {/* Content */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="space-y-16 lg:col-span-2">
            {[1, 2, 3].map((section) => (
              <section key={section} className="space-y-5">
                <div className="h-4 w-40 rounded bg-bg-elev" />
                <div className="h-8 w-2/3 rounded bg-bg-elev" />
                <div className="h-4 w-full rounded bg-bg-elev" />
                <div className="h-4 w-5/6 rounded bg-bg-elev" />
                <div className="h-4 w-4/6 rounded bg-bg-elev" />
              </section>
            ))}
          </div>

          {/* Project Information */}
          <aside className="h-64 rounded-xl border border-border bg-bg-elev" />
        </div>
      </article>
    </main>
  );
}
