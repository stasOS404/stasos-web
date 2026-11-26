const canvas = document.getElementById('bg-particles');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (canvas) {
  const ctx = canvas.getContext('2d');
  let width = 0, height = 0, particles = [], frame = 0;
  function resizeCanvas() {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    width = window.innerWidth; height = window.innerHeight;
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.max(20, Math.min(54, Math.floor(width * height / 24000)));
    particles = Array.from({ length: count }, () => ({ x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - .5) * .14, vy: (Math.random() - .5) * .14, r: Math.random() * 1.2 + .35, a: Math.random() * .32 + .1 }));
  }
  function drawParticles() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (!reduceMotion) { p.x += p.vx; p.y += p.vy; if (p.x < -4) p.x = width + 4; if (p.x > width + 4) p.x = -4; if (p.y < -4) p.y = height + 4; if (p.y > height + 4) p.y = -4; }
      ctx.beginPath(); ctx.fillStyle = `rgba(198,244,50,${p.a})`; ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      for (let j = i + 1; j < particles.length; j++) { const q = particles[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.hypot(dx, dy); if (d < 100) { ctx.beginPath(); ctx.strokeStyle = `rgba(198,244,50,${(1 - d / 100) * .04})`; ctx.lineWidth = .6; ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); } }
    }
    if (!reduceMotion && !document.hidden) frame = requestAnimationFrame(drawParticles);
  }
  resizeCanvas(); drawParticles();
  window.addEventListener('resize', resizeCanvas, { passive: true });
  document.addEventListener('visibilitychange', () => { if (document.hidden) cancelAnimationFrame(frame); else drawParticles(); });
}

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); obs.unobserve(entry.target); } }), { threshold: .12, rootMargin: '0px 0px -28px 0px' });
  reveals.forEach((item) => observer.observe(item));
} else reveals.forEach((item) => item.classList.add('is-visible'));

const menuButton = document.getElementById('menu-toggle');
const nav = document.getElementById('nav-links');
if (menuButton && nav) {
  const closeMenu = () => { menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Открыть меню'); nav.classList.remove('open'); };
  menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') === 'true'; menuButton.setAttribute('aria-expanded', String(!open)); menuButton.setAttribute('aria-label', open ? 'Открыть меню' : 'Закрыть меню'); nav.classList.toggle('open', !open); });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 800) closeMenu(); }, { passive: true });
}

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();

const keyInput = document.getElementById('key-input');
const keyButton = document.getElementById('key-check-btn');
const keyStatus = document.getElementById('key-status');
function setStatus(message, state = '') { if (!keyStatus) return; keyStatus.textContent = message; keyStatus.className = `key-status${state ? ` ${state}` : ''}`; }
if (keyInput && keyButton && keyStatus) {
  keyInput.addEventListener('input', () => { keyInput.value = keyInput.value.toUpperCase().replace(/[^A-Z0-9-]/g, '').slice(0, 19); keyInput.classList.remove('success', 'error'); setStatus(''); });
  keyButton.addEventListener('click', async () => {
    const key = keyInput.value.trim().toUpperCase();
    if (!key) { keyInput.classList.add('error'); setStatus('Введи ключ, чтобы проверить его статус.', 'error'); keyInput.focus(); return; }
    keyButton.classList.add('loading'); keyButton.disabled = true; keyInput.classList.remove('success', 'error'); setStatus('Проверяю ключ…');
    try {
      const response = await fetch(`http://127.0.0.1:8000/check_key?key=${encodeURIComponent(key)}`, { signal: AbortSignal.timeout(7000) });
      if (!response.ok) throw new Error('Server error');
      const data = await response.json();
      if (data.status === 'valid') { keyInput.classList.add('success'); setStatus('Ключ активен. Можно запускать клиент.', 'success'); }
      else if (data.status === 'unactivated') { keyInput.classList.add('success'); setStatus('Ключ найден, но ещё не активирован.', 'warn'); }
      else if (data.status === 'burned') { keyInput.classList.add('error'); setStatus('Срок действия ключа завершён.', 'error'); }
      else { keyInput.classList.add('error'); setStatus('Такой ключ не найден.', 'error'); }
    } catch { keyInput.classList.add('error'); setStatus('Сервис проверки сейчас недоступен. Попробуй позже.', 'warn'); }
    finally { keyButton.classList.remove('loading'); keyButton.disabled = false; }
  });
}

const toast = document.getElementById('toast');
let toastTimer;
function showToast(message) { if (!toast) return; toast.textContent = message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 2600); }
window.copyCode = async function copyCode(id) {
  const code = document.getElementById(id); if (!code) return;
  try { await navigator.clipboard.writeText(code.innerText.trim()); showToast('Код скопирован в буфер обмена'); }
  catch { showToast('Не удалось скопировать. Выдели код и скопируй вручную.'); }
};
document.querySelectorAll('[data-copy-code]').forEach((button) => button.addEventListener('click', () => window.copyCode(button.dataset.copyCode)));

const topLink = document.getElementById('scrollTopBtn');
if (topLink) { const update = () => topLink.classList.toggle('visible', window.scrollY > 650); window.addEventListener('scroll', update, { passive: true }); update(); }

const code = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let codeIndex = 0;
document.addEventListener('keydown', (event) => { const next = code[codeIndex]; if (event.key === next || event.key.toLowerCase() === next) { codeIndex++; if (codeIndex === code.length) { document.body.classList.toggle('matrix-mode'); codeIndex = 0; showToast(document.body.classList.contains('matrix-mode') ? 'SIGNAL // ENABLED' : 'SIGNAL // DISABLED'); } } else codeIndex = 0; });
/* Homepage interactions; first-visit intro is loaded separately from intro.js. */
/* The first-visit guided film is loaded from intro.js by index.html. */
