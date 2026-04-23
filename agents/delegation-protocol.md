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
   - Required approvals are: webdev + regular approvers (SME and `hermes_editor`).
   - webdev approval command: `/webdev-approved` (legacy `/webdev-reviewed-copilot` is accepted).
   - Once required approvals are present, automation enables auto-merge.
