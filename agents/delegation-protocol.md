# Delegation Protocol

Any staff role can spawn any other staff role.

## Natural Language Trigger

```text
hey, can [steph_crypto](cryptocurrency research specialist) do some research on on-chain laundering trends in 2026 Q2?
```

## Slash Trigger

```text
/delegate steph_crypto (cryptocurrency research specialist): research on ...
```

## Rules

1. Universal delegation is allowed (authors, editors, SMEs, researchers, policy reviewers, etc.).
2. Each delegation event adds PR labels for every participant:
   - `staff:<member-id>`
   - `role:<normalized-role>`
3. Recursion/delegation depth is tracked by PR label `delegation-depth-N`.
4. Maximum depth is 5.
5. If depth > 5:
   - label PR `staff-shortage`
   - post a comment tagging `@thestamp` for manual staffing review.
6. Temporary merge gate policy (until Copilot loop is re-enabled):
   - Copilot review is optional/disabled for gating.
   - Required approvals are: webdev + regular approvers (subject-matched SME and `hermes_editor`).
   - SME must match the article subject domain (examples: policy→`policy_sme`, markets/business-economy→`markets_sme`, technology/model releases→`models_sme`, products→`products_sme`, science-health→`research_sme`, security→`security_sme`, infrastructure/chips/cloud→`infra_sme`).
   - webdev approval command: `/webdev-approved` (legacy `/webdev-reviewed-copilot` is accepted).
   - Once required approvals are present, automation enables auto-merge.
7. Duplicate handling policy:
   - If editor determines a PR duplicates existing coverage without material new facts, label/comment as duplicate, tag `@thestamp`, and close the PR.
   - If material new facts exist, continue as an update article (`Update:` title + cross-links old↔new).
8. Discussion quality policy:
   - PR discussion must include meaningful author↔delegate exchange, not one-way status drops.
   - Require at least one explicit feedback loop: delegate critique/request → author revision response → delegate/editor acknowledgment.
   - Include substantive rationale for editorial choices (angle, exclusions, uncertainty treatment), not only approval commands.
