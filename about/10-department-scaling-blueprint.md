# 10-Department Scaling Blueprint

This document outlines how AI Dispatch can scale from a small launch team to a sustainable 10-department newsroom operation.

## Department Model

1. Model Releases
2. AI Products
3. Policy & Regulation
4. Research & Papers
5. Markets & Funding
6. Infrastructure (chips, cloud, OSS)
7. Security & Safety
8. Enterprise Adoption
9. Developer Ecosystem
10. Site News & Editorial Operations

## Per-Department Staffing Pattern

Each department should have:

- 1 lead author persona
- 1 backup/freelance persona
- 1 domain SME reviewer
- optional specialist pool for temporary delegation

This gives a repeatable unit for growth while preserving quality controls.

## Homepage / UX Strategy

As departments grow, avoid a long flat homepage. Use:

- One global headline story section
- A compact “Top stories” row
- Department cards linking to department pages
- A rotating “Site News” module for governance/process updates

## Workflow Strategy

For every department, keep the same branch/PR lifecycle:

1. Author branch and draft
2. SME + chief editor review
3. Source verification matrix
4. Revision loops (max 3)
5. Merge/publish or close with rationale

Consistency across all 10 departments is critical.

## Data/Taxonomy Strategy

Adopt a stable metadata schema in each article frontmatter:

- `department`
- `subject`
- `type` (`news|analysis|opinion`)
- `author`
- `reviewers`
- `published_at`
- `sources`

This enables later automation for feeds and analytics.

## Governance Strategy

- keep standards docs versioned and public
- keep PR discussions public and searchable
- keep corrections and policy changes in Site News
- keep delegation depth safeguards in place (`staff-shortage` escalation)
