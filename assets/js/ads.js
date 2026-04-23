(function () {
  const ADSENSE_CLIENT = 'ca-pub-3629246939430785';

  // Fill in your real AdSense slot IDs when ready for manual placement control.
  // Example: homeBelowFold: '1234567890'
  const slotConfig = window.AI_DISPATCH_AD_SLOTS || {
    homeBelowFold: '',
    sectionBelowFold: '',
    articleMid: '',
    articleEnd: ''
  };

  function resolveSlot(el) {
    const explicit = (el.dataset.adSlot || '').trim();
    if (explicit) return explicit;

    const key = (el.dataset.adKey || '').trim();
    if (!key) return '';

    const configured = slotConfig[key];
    return (configured || '').toString().trim();
  }

  function initAdSlot(el) {
    const slot = resolveSlot(el);
    if (!slot) {
      el.style.display = 'none';
      return;
    }

    const label = document.createElement('p');
    label.className = 'ad-label';
    label.textContent = el.dataset.adLabel || 'Advertisement';

    const ins = document.createElement('ins');
    ins.className = 'adsbygoogle';
    ins.style.display = 'block';
    ins.setAttribute('data-ad-client', ADSENSE_CLIENT);
    ins.setAttribute('data-ad-slot', slot);
    ins.setAttribute('data-ad-format', 'auto');
    ins.setAttribute('data-full-width-responsive', 'true');

    el.appendChild(label);
    el.appendChild(ins);

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.warn('AdSense push failed for slot', slot, e);
    }
  }

  function mountAllAds() {
    document.querySelectorAll('.ad-slot').forEach(initAdSlot);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountAllAds);
  } else {
    mountAllAds();
  }
})();
