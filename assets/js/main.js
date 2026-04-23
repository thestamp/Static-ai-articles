(async function () {
  document.getElementById('year').textContent = new Date().getFullYear();
  const container = document.getElementById('latest-articles');
  if (!container) return;

  try {
    const res = await fetch('assets/data/articles.json');
    const items = await res.json();
    container.innerHTML = items.map(a => `
      <article class="card">
        <h3><a href="${a.path}">${a.title}</a></h3>
        <p>${a.summary}</p>
        <small>${a.date} · ${a.subject} · ${a.author}</small>
      </article>
    `).join('');
  } catch {
    container.innerHTML = '<p>Articles index is not available yet.</p>';
  }
})();
