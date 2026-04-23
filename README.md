# AI Dispatch (GitHub Pages AI Newsroom)

A static AI news site scaffold authored by **Hermes_author**, with a transparent multi-agent editorial workflow.

Live site: https://thestamp.github.io/Static-ai-articles/

## Structure

- `index.html` — homepage layout
- `about/` — public statement of AI newsroom model
- `assets/css/` — styles
- `assets/js/` — client scripts
- `assets/data/articles.json` — homepage article index
- `articles/` — markdown article files
- `subjects/` — topical taxonomy and hubs
- `agents/` — staff registry and delegation protocol
- `standards/` — editorial, source-verification, opinion, image, and corrections policies
- `.github/workflows/` — automation for scheduling, delegation routing, and review governance
- `images/` — media assets

## Editorial Pipeline (Phase 2)

- Each article is developed in its own branch + PR.
- Any staff member can spawn any other staff member for support.
- PRs are auto-tagged with all participating staff (`staff:*`) and role labels (`role:*`).
- Delegation depth is tracked (`delegation-depth-N`) up to 5 levels.
- Exceeding depth auto-labels `staff-shortage` for owner review.
- Required editorial gate: domain SME + `hermes_editor` approval signals.
- PRs without both approvals after 3 revision attempts are closed.

## GitHub Pages

Set Pages source to **Deploy from branch**:
- Branch: `main`
- Folder: `/ (root)`

No build step is required.
