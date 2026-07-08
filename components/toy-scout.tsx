"use client";

import Image from "next/image";
import {
  ArrowUpDown,
  Baby,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  ExternalLink,
  Filter,
  Info,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Waves
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ageBands, issueTags, type AgeBand, type IssueTag, type ToyItem } from "@/lib/toys";

type SortMode = "score" | "safety" | "mentions" | "cleanup";

const issueLabels: Record<IssueTag, string> = {
  "easy-clean": "Easy clean",
  quiet: "Quiet",
  travel: "Travel",
  "no-batteries": "No batteries",
  "less-plastic": "Less plastic",
  "tummy-time": "Tummy time",
  giftable: "Giftable"
};

const sortLabels: Record<SortMode, string> = {
  score: "Overall",
  safety: "Safety",
  mentions: "Mentions",
  cleanup: "Cleanup"
};

function pct(value: number) {
  return `${Math.max(0, Math.min(100, value))}%`;
}

function joinAgeBands(bands: AgeBand[]) {
  return bands.join(", ");
}

export function ToyScout({ toys }: { toys: ToyItem[] }) {
  const [query, setQuery] = useState("");
  const [activeAge, setActiveAge] = useState<AgeBand | "all">("all");
  const [activeIssue, setActiveIssue] = useState<IssueTag | "all">("all");
  const [sortMode, setSortMode] = useState<SortMode>("score");
  const [safetyFirst, setSafetyFirst] = useState(true);
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem("tinytoy-scout-saved");
    if (stored) {
      setSaved(JSON.parse(stored) as string[]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("tinytoy-scout-saved", JSON.stringify(saved));
  }, [saved]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return toys
      .filter((toy) => {
        const matchesSearch =
          !normalized ||
          toy.name.toLowerCase().includes(normalized) ||
          toy.category.toLowerCase().includes(normalized) ||
          toy.commonPraise.join(" ").toLowerCase().includes(normalized) ||
          toy.commonComplaints.join(" ").toLowerCase().includes(normalized);
        const matchesAge = activeAge === "all" || toy.ageBands.includes(activeAge);
        const matchesIssue = activeIssue === "all" || toy.bestFor.includes(activeIssue);
        const matchesSafety = !safetyFirst || toy.safetyScore >= 82;
        return matchesSearch && matchesAge && matchesIssue && matchesSafety;
      })
      .sort((a, b) => {
        if (sortMode === "mentions") return b.redditMentions - a.redditMentions;
        if (sortMode === "safety") return b.safetyScore - a.safetyScore;
        if (sortMode === "cleanup") return b.cleanupScore - a.cleanupScore;
        return b.score - a.score;
      });
  }, [activeAge, activeIssue, query, safetyFirst, sortMode, toys]);

  const savedToys = toys.filter((toy) => saved.includes(toy.id));
  const compareToys = savedToys.length > 0 ? savedToys : filtered.slice(0, 4);
  const avgSafety = Math.round(
    filtered.reduce((sum, toy) => sum + toy.safetyScore, 0) / Math.max(filtered.length, 1)
  );

  const toggleSaved = (id: string) => {
    setSaved((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  return (
    <main className="app-shell">
      <header className="topbar" aria-label="Site header">
        <div className="brand">
          <div className="brand-mark">
            <Baby size={22} aria-hidden />
          </div>
          <div>
            <p className="eyebrow">Reddit-informed toy research</p>
            <h1>TinyToy Scout</h1>
          </div>
        </div>
        <div className="topbar-actions">
          <a className="plain-link" href="#compare">
            Compare shortlist
          </a>
          <a className="primary-link" href="https://www.cpsc.gov/Recalls" target="_blank" rel="noreferrer">
            <ShieldCheck size={17} aria-hidden />
            Recall checks
          </a>
        </div>
      </header>

      <section className="workspace">
        <aside className="control-panel" aria-label="Toy filters">
          <div className="hero-media">
            <Image
              src="/images/nursery-toy-shelf.png"
              alt="Nursery shelf with baby toys"
              width={900}
              height={600}
              priority
            />
          </div>

          <div className="search-box">
            <Search size={18} aria-hidden />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search toys, complaints, use cases"
              aria-label="Search toys"
            />
          </div>

          <div className="filter-block">
            <div className="filter-title">
              <Filter size={16} aria-hidden />
              Age
            </div>
            <div className="segmented">
              <button className={activeAge === "all" ? "active" : ""} onClick={() => setActiveAge("all")}>
                All
              </button>
              {ageBands.map((age) => (
                <button key={age} className={activeAge === age ? "active" : ""} onClick={() => setActiveAge(age)}>
                  {age}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-block">
            <div className="filter-title">
              <Sparkles size={16} aria-hidden />
              Parent need
            </div>
            <div className="tag-cloud">
              <button className={activeIssue === "all" ? "active" : ""} onClick={() => setActiveIssue("all")}>
                Any need
              </button>
              {issueTags.map((tag) => (
                <button
                  key={tag}
                  className={activeIssue === tag ? "active" : ""}
                  onClick={() => setActiveIssue(tag)}
                >
                  {issueLabels[tag]}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-block">
            <div className="filter-title">
              <ArrowUpDown size={16} aria-hidden />
              Sort
            </div>
            <div className="sort-row">
              {(Object.keys(sortLabels) as SortMode[]).map((mode) => (
                <button key={mode} className={sortMode === mode ? "active" : ""} onClick={() => setSortMode(mode)}>
                  {sortLabels[mode]}
                </button>
              ))}
            </div>
          </div>

          <label className="switch-row">
            <input type="checkbox" checked={safetyFirst} onChange={(event) => setSafetyFirst(event.target.checked)} />
            <span>Hide lower safety-confidence items</span>
          </label>
        </aside>

        <section className="results-panel" aria-label="Toy research results">
          <div className="insight-strip">
            <Metric icon={<Star size={18} />} label="Matching toys" value={String(filtered.length)} />
            <Metric icon={<ShieldCheck size={18} />} label="Avg safety" value={`${avgSafety}/100`} />
            <Metric icon={<BookmarkCheck size={18} />} label="Shortlisted" value={String(saved.length)} />
          </div>

          <div className="briefing">
            <div>
              <p className="eyebrow">MVP thesis</p>
              <h2>Compress parent threads into safer buying decisions.</h2>
            </div>
            <p>
              Each card separates repeat praise, repeat complaints, age fit, cleanup burden, and safety watchouts.
              The mock data shape is ready for a Reddit ingestion job plus CPSC recall verification.
            </p>
          </div>

          <div className="card-grid">
            {filtered.map((toy) => (
              <article className="toy-card" key={toy.id}>
                <div className="card-head">
                  <div>
                    <p className="category">{toy.category}</p>
                    <h3>{toy.name}</h3>
                  </div>
                  <button
                    className="icon-button"
                    onClick={() => toggleSaved(toy.id)}
                    aria-label={saved.includes(toy.id) ? `Remove ${toy.name}` : `Save ${toy.name}`}
                    title={saved.includes(toy.id) ? "Remove from shortlist" : "Save to shortlist"}
                  >
                    {saved.includes(toy.id) ? <BookmarkCheck size={19} /> : <Bookmark size={19} />}
                  </button>
                </div>

                <div className="score-row">
                  <Score label="Overall" value={toy.score} />
                  <Score label="Safety" value={toy.safetyScore} />
                  <Score label="Clean" value={toy.cleanupScore} />
                </div>

                <div className="quick-facts">
                  <span>{toy.price}</span>
                  <span>{joinAgeBands(toy.ageBands)}</span>
                  <span>{toy.redditMentions} mentions</span>
                </div>

                <p className="fit-line">{toy.parentFit}</p>
                <p className="evidence">{toy.evidence}</p>

                <div className="signal-columns">
                  <SignalList title="Repeated praise" items={toy.commonPraise} tone="good" />
                  <SignalList title="Watchouts" items={toy.watchouts} tone="warn" />
                </div>

                <div className="complaints">
                  <Waves size={16} aria-hidden />
                  <span>{toy.commonComplaints.join("; ")}</span>
                </div>

                <div className="card-footer">
                  <div className="mini-tags">
                    {toy.bestFor.slice(0, 3).map((tag) => (
                      <span key={tag}>{issueLabels[tag as IssueTag]}</span>
                    ))}
                  </div>
                  <a href={toy.affiliateUrl} target="_blank" rel="noreferrer">
                    Shop search
                    <ExternalLink size={15} aria-hidden />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <section className="compare-panel" id="compare">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Shortlist compare</p>
                <h2>{savedToys.length > 0 ? "Saved toys" : "Top matches"}</h2>
              </div>
              <p>Use this section for affiliate-page comparison blocks and parent-friendly summary snippets.</p>
            </div>

            <div className="comparison-table" role="table" aria-label="Toy comparison">
              <div className="table-row table-head" role="row">
                <span role="columnheader">Toy</span>
                <span role="columnheader">Age</span>
                <span role="columnheader">Safety</span>
                <span role="columnheader">Parent signal</span>
              </div>
              {compareToys.map((toy) => (
                <div className="table-row" role="row" key={toy.id}>
                  <span role="cell">{toy.name}</span>
                  <span role="cell">{joinAgeBands(toy.ageBands)}</span>
                  <span role="cell">{toy.safetyScore}/100</span>
                  <span role="cell">{toy.parentFit}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="ops-panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Build path</p>
                <h2>From MVP to real data</h2>
              </div>
            </div>
            <div className="ops-grid">
              <OpsStep title="Collect" text="Pull licensed Reddit threads by age, use case, and product query." />
              <OpsStep title="Extract" text="Cluster toy mentions, complaint types, age fit, and brand alternatives." />
              <OpsStep title="Verify" text="Run CPSC recall, small-parts, age-grade, and material checks before ranking." />
              <OpsStep title="Publish" text="Generate comparison pages with affiliate links and transparent source notes." />
            </div>
          </section>

          <p className="disclaimer">
            TinyToy Scout is a research aid, not a safety certification. Parents should verify current recalls, age
            labels, small-parts warnings, and manufacturer instructions before purchase or use.
          </p>
        </section>
      </section>
    </main>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="metric">
      <div className="metric-icon">{icon}</div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function Score({ label, value }: { label: string; value: number }) {
  return (
    <div className="score">
      <div className="score-top">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div className="bar" aria-hidden>
        <span style={{ width: pct(value) }} />
      </div>
    </div>
  );
}

function SignalList({ title, items, tone }: { title: string; items: string[]; tone: "good" | "warn" }) {
  return (
    <div className={`signal-list ${tone}`}>
      <h4>{title}</h4>
      <ul>
        {items.map((item) => (
          <li key={item}>
            {tone === "good" ? <CheckCircle2 size={15} aria-hidden /> : <Info size={15} aria-hidden />}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function OpsStep({ title, text }: { title: string; text: string }) {
  return (
    <div className="ops-step">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
