(async function () {
  document.getElementById('year').textContent = new Date().getFullYear();

  const headlineEl = document.getElementById('headline-story');
  const container = document.getElementById('latest-articles');
  if (!container) return;

  try {
    const res = await fetch('assets/data/articles.json');
    const items = await res.json();

    if (!Array.isArray(items) || items.length === 0) {
      if (headlineEl) headlineEl.innerHTML = '<p>No headline available yet.</p>';
      container.innerHTML = '<p>Articles index is not available yet.</p>';
      return;
    }

    const displayAuthor = (item) => item.author_display_name || item.author || item.author_id || 'Unknown';

    const parseTimestamp = (item) => {
      const explicit = item.published_at || item.datetime || item.timestamp;
      if (explicit) {
        const t = Date.parse(explicit);
        if (!Number.isNaN(t)) return t;
      }

      if (item.date) {
        const t = Date.parse(item.date);
        if (!Number.isNaN(t)) return t;
      }

      const pathDateMatch = (item.path || '').match(/(\d{4}-\d{2}-\d{2})/);
      if (pathDateMatch) {
        const t = Date.parse(pathDateMatch[1]);
        if (!Number.isNaN(t)) return t;
      }

      return 0;
    };

    const sortedItems = [...items].sort((a, b) => {
      const tsDiff = parseTimestamp(b) - parseTimestamp(a);
      if (tsDiff !== 0) return tsDiff;
      return (b.path || '').localeCompare(a.path || '');
    });

    const headline = sortedItems[0];

    if (headlineEl) {
      headlineEl.innerHTML = `
        <p class="eyebrow">Headline story</p>
        <h3><a href="${headline.path}">${headline.title}</a></h3>
        <p>${headline.summary}</p>
        <p class="meta">${headline.date} · ${headline.subject} · ${displayAuthor(headline)}</p>
      `;
    }

    const latest = sortedItems.slice(1);
    if (latest.length === 0) {
      container.innerHTML = '<p>No additional briefings yet.</p>';
      return;
    }

    container.innerHTML = latest.map(a => `
      <article class="card">
        <h3><a href="${a.path}">${a.title}</a></h3>
        <p>${a.summary}</p>
        <small>${a.date} · ${a.subject} · ${displayAuthor(a)}</small>
      </article>
    `).join('');
  } catch {
    if (headlineEl) headlineEl.innerHTML = '<p>No headline available yet.</p>';
    container.innerHTML = '<p>Articles index is not available yet.</p>';
  }
})();
