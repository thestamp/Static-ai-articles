(async function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const isSubjectsPage = window.location.pathname.includes('/subjects/');
  const basePrefix = isSubjectsPage ? '..' : '.';
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const firstSegment = pathParts[0] || '';
  const githubProjectBase = /github\.io$/i.test(window.location.hostname)
    && firstSegment
    && !firstSegment.includes('.')
    ? `/${firstSegment}`
    : '';

  const withBase = (path) => {
    if (!path) return path;
    if (/^(https?:)?\/\//.test(path)) return path;
    if (path.startsWith('/')) {
      if (!githubProjectBase || path.startsWith(`${githubProjectBase}/`) || path === githubProjectBase) return path;
      return `${githubProjectBase}${path}`;
    }
    return `${basePrefix}/${path}`.replace('././', './').replace('.././', '../');
  };

  const articlePath = (item) => item.path || item.url || item.href || item.link || item.permalink || '';
  const articleHref = (item) => withBase(articlePath(item) || 'articles/');
  const articleImage = (item) => withBase(item.image || item.image_url || 'images/news-banner.png');
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

    const datedPath = articlePath(item);
    const pathDateMatch = (datedPath || '').match(/(\d{4}-\d{2}-\d{2})/);
    if (pathDateMatch) {
      const t = Date.parse(pathDateMatch[1]);
      if (!Number.isNaN(t)) return t;
    }

    return 0;
  };

  const sortNewestFirst = (items) => [...items].sort((a, b) => {
    const tsDiff = parseTimestamp(b) - parseTimestamp(a);
    if (tsDiff !== 0) return tsDiff;

    // If timestamps are identical/missing, prefer original feed order with newer entries first.
    // We treat higher source index as newer so array order bugs don't show oldest-first.
    const sourceIndexDiff = (b.__sourceIndex ?? -1) - (a.__sourceIndex ?? -1);
    if (sourceIndexDiff !== 0) return sourceIndexDiff;

    return articlePath(b).localeCompare(articlePath(a));
  });

  const subjectLabel = (slug) => ({
    'news-politics': 'News & Politics',
    world: 'World',
    'business-economy': 'Business & Economy',
    technology: 'Technology',
    'science-health': 'Science & Health',
    environment: 'Environment',
    'arts-entertainment': 'Arts & Entertainment',
    lifestyle: 'Lifestyle',
    sports: 'Sports',
    'opinion-editorials': 'Opinion & Editorials',
    'site-news': 'Site News',
    editorial: 'Editorial'
  }[slug] || slug);

  const renderHome = (items) => {
    const headlineEl = document.getElementById('headline-story');
    const categoryTilesEl = document.getElementById('category-tiles');

    if (!headlineEl || !categoryTilesEl) return;

    if (!items.length) {
      headlineEl.innerHTML = '<p>No headline available yet.</p>';
      categoryTilesEl.innerHTML = '<p>No category briefings available yet.</p>';
      return;
    }

    const headline = items[0];
    headlineEl.innerHTML = `
      <a class="headline-media" href="${articleHref(headline)}">
        <img src="${articleImage(headline)}" alt="Headline image for ${headline.title}" loading="lazy" />
      </a>
      <div class="headline-copy">
        <p class="eyebrow">Latest headline</p>
        <h3><a href="${articleHref(headline)}">${headline.title}</a></h3>
        <p>${headline.summary || ''}</p>
        <p class="meta">${headline.date || ''} · ${subjectLabel(headline.subject)} · ${displayAuthor(headline)}</p>
      </div>
    `;

    const grouped = new Map();
    for (const item of items) {
      const key = item.subject || 'general';
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key).push(item);
    }

    const tiles = [];
    for (const [subject, stories] of grouped.entries()) {
      const newest = stories[0];
      const older = stories.slice(1, 4);
      const subjectLink = withBase(`subjects/index.html#${subject}`);

      tiles.push(`
        <article class="card category-tile">
          <a class="category-tile__hero" href="${articleHref(newest)}">
            <img src="${articleImage(newest)}" alt="${subjectLabel(subject)} coverage image" loading="lazy" />
            <div>
              <p class="eyebrow">${subjectLabel(subject)}</p>
              <h3>${newest.title}</h3>
              <p class="meta">${newest.date || ''} · ${displayAuthor(newest)}</p>
            </div>
          </a>
          <p class="category-tile__subject-link"><a href="${subjectLink}">More from ${subjectLabel(subject)} →</a></p>
          ${older.length ? `
            <ul class="category-tile__list">
              ${older.map(s => `
                <li>
                  <a href="${articleHref(s)}">${s.title}</a>
                  <small>${s.date || ''}</small>
                </li>
              `).join('')}
            </ul>
          ` : '<p class="muted">No older stories in this category yet.</p>'}
        </article>
      `);
    }

    categoryTilesEl.innerHTML = tiles.join('');
  };

  const renderSubjects = (items) => {
    const feedTitleEl = document.getElementById('subject-feed-title');
    const feedEl = document.getElementById('subject-feed');
    const buttonEls = Array.from(document.querySelectorAll('[data-subject]'));
    if (!feedTitleEl || !feedEl || !buttonEls.length) return;

    const subjectsInData = new Set(items.map((i) => i.subject).filter(Boolean));

    const getSelectedSubject = () => {
      const fromHash = decodeURIComponent((window.location.hash || '').replace('#', '').trim());
      if (fromHash && subjectsInData.has(fromHash)) return fromHash;
      return buttonEls.find((b) => subjectsInData.has(b.dataset.subject))?.dataset.subject || buttonEls[0].dataset.subject;
    };

    const renderSubjectFeed = (subject) => {
      const filtered = items.filter((i) => i.subject === subject);
      feedTitleEl.textContent = `${subjectLabel(subject)} — Latest stories`;

      buttonEls.forEach((btn) => {
        btn.classList.toggle('is-active', btn.dataset.subject === subject);
      });

      if (!filtered.length) {
        feedEl.innerHTML = '<p>No stories in this category yet.</p>';
        return;
      }

      feedEl.innerHTML = filtered.map((a) => `
        <article class="card feed-card">
          <a class="feed-card__media" href="${articleHref(a)}">
            <img src="${articleImage(a)}" alt="${a.title}" loading="lazy" />
          </a>
          <div>
            <h3><a href="${articleHref(a)}">${a.title}</a></h3>
            <p>${a.summary || ''}</p>
            <small>${a.date || ''} · ${subjectLabel(a.subject)} · ${displayAuthor(a)}</small>
          </div>
        </article>
      `).join('');
    };

    const applySubject = (subject) => {
      if (!subject) return;
      history.replaceState(null, '', `#${subject}`);
      renderSubjectFeed(subject);
    };

    buttonEls.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        applySubject(btn.dataset.subject);
      });
    });

    window.addEventListener('hashchange', () => {
      renderSubjectFeed(getSelectedSubject());
    });

    renderSubjectFeed(getSelectedSubject());
  };

  try {
    const res = await fetch(withBase('assets/data/articles.json'));
    const rawItems = await res.json();
    const normalized = Array.isArray(rawItems)
      ? rawItems.map((item, idx) => ({ ...item, __sourceIndex: idx }))
      : [];
    const items = sortNewestFirst(normalized);

    renderHome(items);
    renderSubjects(items);
  } catch (err) {
    const headlineEl = document.getElementById('headline-story');
    const categoryTilesEl = document.getElementById('category-tiles');
    const feedEl = document.getElementById('subject-feed');

    if (headlineEl) headlineEl.innerHTML = '<p>No headline available yet.</p>';
    if (categoryTilesEl) categoryTilesEl.innerHTML = '<p>Category briefings are not available yet.</p>';
    if (feedEl) feedEl.innerHTML = '<p>Subject feed is not available yet.</p>';
  }
})();
