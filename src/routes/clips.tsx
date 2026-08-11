import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { ClipCard } from "@/components/cards";
import { clips } from "@/lib/data";

const TITLE = "Laughter Shots — Viral Comedy Clips | Laughreel";
const DESC =
  "Bite-sized clips and sketches from India's best stand-ups. Instant previews, no algorithm rabbit hole — just the punchlines.";

export const Route = createFileRoute("/clips")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: ClipsPage,
});

function ClipsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="60 seconds or less"
        title={
          <>
            LAUGHTER <span className="text-secondary">SHOTS</span>
          </>
        }
        subtitle="The viral cuts, sketch fragments and crowd-work moments — each one links straight back to the full set."
      />
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {clips.map((c, i) => (
            <Reveal key={c.id} delay={i * 50}>
              <ClipCard clip={c} />
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
