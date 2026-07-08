# TinyToy Scout

TinyToy Scout is an MVP for a Reddit-informed baby and toddler toy recommendation site.

It focuses on a safer version of the "AI reads Reddit so parents do not have to" pattern:

- Age-based toy discovery for 0-36 months
- Parent pain-point filters such as mold, noise, tiny parts, and cleaning
- Reddit-style signal summaries with pros, complaints, and repeat mentions
- Safety-first scoring and CPSC/ASTM reminder copy
- Affiliate-ready product action links

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Next build steps

- Replace mock `lib/toys.ts` rows with a real ingestion job.
- Add Reddit API or licensed data provider integration.
- Add CPSC recall checks and age-grade source links.
- Create SEO pages for age groups, use cases, and brand alternatives.
