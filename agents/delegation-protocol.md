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
6. Merge gate for all code/content PRs includes Copilot + webdev loop:
   - Copilot reviews first.
   - webdev applies/addresses Copilot feedback and comments `/webdev-reviewed-copilot`.
   - If Copilot requests another round, repeat.
   - After 3 Copilot↔webdev rounds, stop automation and tag `@thestamp` for manual review.
