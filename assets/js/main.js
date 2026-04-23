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

    const headline = items[0];
    const displayAuthor = (item) => item.author_display_name || item.author || item.author_id || 'Unknown';

    if (headlineEl) {
      headlineEl.innerHTML = `
        <p class="eyebrow">Headline story</p>
        <h3><a href="${headline.path}">${headline.title}</a></h3>
        <p>${headline.summary}</p>
        <p class="meta">${headline.date} · ${headline.subject} · ${displayAuthor(headline)}</p>
      `;
    }

    const latest = items.slice(1);
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
