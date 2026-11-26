/* First-visit guided film for the stasOS homepage. Visual and navigation only. */
(() => {
  const main = document.querySelector('main#main');
  const home = document.querySelector('.hero#top');
  if (!main || !home || document.querySelector('.stas-intro')) return;

  const SEEN_KEY = 'stasos-intro-seen-v1';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const scenes = [
    {
      id: 'welcome', chapter: '01 / ВХОД В СИСТЕМУ', kicker: 'PERSONAL PROJECT  /  BUILD 02.1',
      title: 'Добро пожаловать<br><span>в stasOS.</span>', description: 'Игровой клиент и целая система вокруг него. Сейчас покажу, что здесь есть и где это найти.',
      proof: ['MINECRAFT 1.20.1', 'NATIVE CORE', 'ОТКРЫТЬ ПРОЕКТ'], duration: 6100,
      visual: `<div class="intro-hero-logo"><span>stas</span>OS</div><div class="intro-welcome-caption">ONE CONTROL SURFACE · ONE CONTINUOUS PROJECT</div>`
    },
    {
      id: 'creator', chapter: '02 / ИСТОРИЯ ПРОЕКТА', kicker: 'BUILT BY ONE CREATOR',
      title: 'Один автор.<br><span>Один проект.</span>', description: 'stasOS — личный проект stas. Интерфейс, сайт и новые идеи развиваются одним человеком — шаг за шагом, от замысла до готовых деталей.',
      proof: ['ИСТОРИЯ ПРОЕКТА', 'ПОДХОД К РАЗРАБОТКЕ', 'СВЯЗЬ С АВТОРОМ'], duration: 7200,
      visual: `<div class="intro-creator-mark"><div class="intro-creator-quote">Мой проект.<br><span>Моё имя.</span></div><div class="intro-creator-index">s.</div><p class="intro-creator-note">Не безликая студия. Личный проект, который растёт вместе со своим автором.</p></div>`
    },
    {
      id: 'system', chapter: '03 / ИНТЕРФЕЙС КЛИЕНТА', kicker: 'ONE PLACE  /  CLEAR CONTROL',
      title: 'Клиент,<br><span>собранный целиком.</span>', description: 'Настройки, игровой профиль, состояние сессии и ClickGUI собраны в одном рабочем пространстве. На сайте можно рассмотреть интерфейс и понять, как устроен клиент.',
      proof: ['CLICKGUI', 'HUD', 'ПРОФИЛИ'], duration: 8200,
      visual: `<div class="intro-mini-client"><aside class="intro-mini-sidebar"><div class="intro-mini-brand"><span>s</span> stasOS</div><div class="intro-mini-nav active"><i></i> Combat</div><div class="intro-mini-nav"><i></i> Movement</div><div class="intro-mini-nav"><i></i> Visuals</div><div class="intro-mini-nav"><i></i> Player</div><div class="intro-mini-profile"><i class="intro-avatar">S</i> STAS · PROFILE</div></aside><div class="intro-mini-content"><div class="intro-mini-content-head"><div><small>WORKSPACE / MODULES</small><b>Combat</b></div><span class="intro-live-badge">SESSION READY</span></div><div class="intro-metrics"><div class="intro-metric"><small>ACTIVE MODULES</small><b>03 / 12</b></div><div class="intro-metric"><small>SESSION</small><b>04:28</b></div><div class="intro-metric"><small>BUILD</small><b>2.1.0</b></div></div><div class="intro-mini-row"><i class="intro-module-icon">✳</i><span><b>Hit Assist</b><small>Module overview</small></span><em class="intro-module-state on">ON</em><i class="intro-mini-switch"></i></div><div class="intro-mini-row"><i class="intro-module-icon">⌖</i><span><b>Velocity</b><small>Movement settings</small></span><em class="intro-module-state">OFF</em><i class="intro-mini-switch"></i></div></div></div>`
    },
    {
      id: 'features', chapter: '04 / ВОЗМОЖНОСТИ', kicker: 'DESIGNED AS ONE SYSTEM',
      title: 'Каждая деталь<br><span>на своём месте.</span>', description: 'Нативная основа, понятная структура, визуальная система и профили. Отдельно — библиотека Roblox, где собраны бесплатные материалы.',
      proof: ['НАТИВНАЯ ОСНОВА', 'ЕДИНЫЙ ИНТЕРФЕЙС', 'ROBLOX FREE'], duration: 8100,
      visual: `<div class="intro-feature-cards"><article class="intro-feature-card" style="--d:80ms"><small>01 / PERFORMANCE</small><div class="intro-feature-art intro-rings"><i></i><i></i><i></i><b>R</b></div><div><h3>Нативная скорость</h3><p>Rust-ядро и быстрый запуск клиента.</p></div></article><article class="intro-feature-card" style="--d:180ms"><small>02 / INTERFACE</small><div class="intro-feature-art intro-lines"><i></i><i></i></div><div><h3>Всё под рукой</h3><p>Настройки и статус в одном окне.</p></div></article><article class="intro-feature-card" style="--d:280ms"><small>03 / PERSONAL</small><div class="intro-feature-art intro-profile-orb"><i></i></div><div><h3>Твой профиль</h3><p>Собственный стиль и параметры.</p></div></article><article class="intro-feature-card" style="--d:380ms"><small>04 / COMMUNITY</small><div class="intro-feature-art intro-lines"><i></i><i></i></div><div><h3>Roblox Free</h3><p>Отдельная библиотека проекта.</p></div></article></div>`
    },
    {
      id: 'updates', chapter: '05 / РАЗВИТИЕ И СБОРКИ', kicker: 'A PROJECT IN MOTION',
      title: 'Смотри,<br><span>как всё растёт.</span>', description: 'В разделе обновлений — заметки о последних сборках и развитии клиента: от обновлённого ClickGUI до перехода на нативную основу.',
      proof: ['ИСТОРИЯ СБОРOК', 'BUILD 2.1.0', 'BUILD 2.0.0'], duration: 7200,
      visual: `<div class="intro-release-stack"><article class="intro-release" style="--d:100ms"><div class="intro-release-date">12 NOV 2026<span>BUILD 2.1.0</span></div><div class="intro-release-copy"><h3>Новый уровень интерфейса</h3><p>Обновлённый ClickGUI, HUD и система профилей.</p><div class="intro-release-tags"><i>CLICKGUI</i><i>HUD</i><i>PROFILES</i></div></div><b class="intro-release-arrow">↗</b></article><article class="intro-release" style="--d:260ms"><div class="intro-release-date">01 NOV 2026<span>BUILD 2.0.0</span></div><div class="intro-release-copy"><h3>Переход на нативное ядро</h3><p>Новая основа клиента на Rust и Tauri.</p><div class="intro-release-tags"><i>RUST</i><i>TAURI</i><i>FABRIC 1.20.1</i></div></div><b class="intro-release-arrow">↗</b></article></div>`
    },
    {
      id: 'access', chapter: '06 / ДОСТУП И ПОМОЩЬ', kicker: 'CLEAR ROUTE  /  NO GUESSWORK',
      title: 'Всё нужное —<br><span>без поисков.</span>', description: 'На странице тарифов можно сравнить варианты доступа. Если ключ уже есть — проверить его статус. Ответы на частые вопросы и связь с автором тоже рядом.',
      proof: ['ТАРИФЫ', 'ПРОВЕРКА КЛЮЧА', 'FAQ / TELEGRAM'], duration: 7700,
      visual: `<div class="intro-plan-grid"><article class="intro-plan"><small>01 / STARTER</small><b>Попробовать</b><strong>10 дней</strong><span>Для первого знакомства с клиентом.</span></article><article class="intro-plan featured"><small>02 / ACCESS</small><b>Выбрать формат</b><strong>Доступ</strong><span>Варианты и оплата — через Telegram.</span></article><article class="intro-plan"><small>03 / ACCOUNT</small><b>Ключ уже у тебя?</b><strong>Проверить</strong><span>Проверка статуса на сайте.</span></article><article class="intro-plan"><small>04 / SUPPORT</small><b>Остались вопросы?</b><strong>Помощь</strong><span>FAQ и связь с автором проекта.</span></article></div><div class="intro-key-bar"><i></i><b>KEY CHECK ↗</b></div>`
    },
    {
      id: 'map', chapter: '07 / КАРТА САЙТА', kicker: 'YOUR WAY AROUND STASOS',
      title: 'Теперь знаешь,<br><span>куда идти.</span>', description: 'Нужны возможности — открой раздел клиента. Хочешь увидеть, что изменилось, — смотри сборки. Библиотека Roblox, история автора, тарифы и ответы тоже в одном клике.',
      proof: ['ПЕРЕЙТИ К РАЗДЕЛАМ', 'ПОВТОРИТЬ ТУР', 'ГОТОВО'], duration: 7800,
      visual: `<div class="intro-map"><a class="intro-map-link" href="#features" data-intro-destination><small>01 / PRODUCT</small><b>Возможности</b><span>Что умеет клиент</span></a><a class="intro-map-link" href="#showcase" data-intro-destination><small>02 / INTERFACE</small><b>Интерфейс</b><span>Посмотреть ClickGUI</span></a><a class="intro-map-link" href="#changelog" data-intro-destination><small>03 / RELEASES</small><b>Сборки</b><span>Что нового</span></a><a class="intro-map-link" href="#pricing" data-intro-destination><small>04 / ACCESS</small><b>Тарифы</b><span>Форматы доступа</span></a><a class="intro-map-link" href="#key-check" data-intro-destination><small>05 / ACCOUNT</small><b>Мой ключ</b><span>Проверить статус</span></a><a class="intro-map-link" href="#faq" data-intro-destination><small>06 / HELP</small><b>Вопросы</b><span>FAQ и поддержка</span></a><a class="intro-map-link" href="roblox.html" data-intro-destination><small>07 / LIBRARY</small><b>Roblox Free</b><span>Бесплатная библиотека</span></a><a class="intro-map-link" href="about.html" data-intro-destination><small>08 / CREATOR</small><b>Об авторе</b><span>История stasOS</span></a><a class="intro-map-link" href="https://t.me/stasOS_Cheat_bot" data-intro-destination><small>09 / CONTACT</small><b>Telegram</b><span>Связаться с автором ↗</span></a></div>`
    }
  ];

  const film = document.createElement('section');
  film.className = 'stas-intro is-intro-start';
  film.setAttribute('role', 'dialog');
  film.setAttribute('aria-modal', 'true');
  film.setAttribute('aria-label', 'Первое знакомство со stasOS');
  film.setAttribute('aria-describedby', 'intro-description');
  film.innerHTML = `
    <div class="intro-atmosphere" aria-hidden="true"><i class="intro-orb"></i></div><div class="intro-grid" aria-hidden="true"></div><div class="intro-vignette" aria-hidden="true"></div><div class="intro-grain" aria-hidden="true"></div>
    <header class="intro-topline"><a class="intro-brand" href="#top" tabindex="-1" aria-label="stasOS"><i class="intro-brand-mark">s</i><span>stas<span>OS</span></span></a><div class="intro-topmeta"><i class="intro-live"></i><span>FIRST SESSION / STASOS</span></div></header>
    <main class="intro-main"><section class="intro-copy" aria-live="polite" aria-atomic="true"><div class="intro-step-meta"><span class="intro-step-index" id="intro-scene-index">01</span><i class="intro-step-line"></i><span id="intro-chapter">ПЕРВОЕ ЗНАКОМСТВО</span></div><p class="intro-kicker" id="intro-kicker"></p><h1 class="intro-title" id="intro-title"></h1><p class="intro-description" id="intro-description"></p><div class="intro-proof" id="intro-proof"></div></section><div class="intro-stage" id="intro-stage" aria-hidden="true"></div></main>
    <footer class="intro-foot"><div class="intro-chapter-label">A PERSONAL PROJECT / MADE WITH CARE</div><div class="intro-progress"><div class="intro-progress-track" id="intro-progress-track" role="progressbar" aria-label="Прогресс вступления" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i class="intro-progress-fill" id="intro-progress-fill"></i></div><span class="intro-step-count" id="intro-step-count">01 / 07</span></div><div class="intro-skip-wrap"><span class="intro-skip-hint">Удерживай <strong>ПРОБЕЛ</strong> 2 сек., чтобы пропустить</span><button class="intro-skip" id="intro-skip" type="button" aria-label="Удерживай, чтобы пропустить вступление"><span class="intro-skip-symbol">Ⅱ</span><span>УДЕРЖИВАТЬ, ЧТОБЫ ПРОПУСТИТЬ</span><i class="intro-skip-hold-ring"></i></button></div></footer>`;

  document.body.append(film);
  const particleCanvas = document.createElement('canvas');
  particleCanvas.className = 'intro-particles';
  particleCanvas.setAttribute('aria-hidden', 'true');
  film.prepend(particleCanvas);
  const cutSweep = document.createElement('div');
  cutSweep.className = 'intro-cut-sweep';
  cutSweep.setAttribute('aria-hidden', 'true');
  film.append(cutSweep);
  const lensFlare = document.createElement('div');
  lensFlare.className = 'intro-lens-flare';
  lensFlare.setAttribute('aria-hidden', 'true');
  film.append(lensFlare);
  document.body.classList.add('intro-locked');
  const introMain = film.querySelector('.intro-main');
  if (introMain?.tagName === 'MAIN') {
    const shell = document.createElement('div');
    shell.className = 'intro-main';
    shell.innerHTML = introMain.innerHTML;
    introMain.replaceWith(shell);
  }
  const $ = (selector) => film.querySelector(selector);
  const title = $('#intro-title');
  const description = $('#intro-description');
  const stage = $('#intro-stage');
  const kicker = $('#intro-kicker');
  const proof = $('#intro-proof');
  const stepCount = $('#intro-step-count');
  const chapter = $('#intro-chapter');
  const sceneIndex = $('#intro-scene-index');
  const progressFill = $('#intro-progress-fill');
  const progressTrack = $('#intro-progress-track');
  const skipButton = $('#intro-skip');
  if (window.matchMedia('(pointer: coarse)').matches) $('.intro-skip-hint').textContent = 'Удерживай кнопку 2 сек., чтобы пропустить';
  const focusTargets = [...document.querySelectorAll('.navbar, #main, .site-footer')];
  const priorInert = focusTargets.map((node) => node.inert);
  focusTargets.forEach((node) => { node.inert = true; });
  let current = 0;
  let sceneTimer = 0;
  let progressTimer = 0;
  let holdTimer = 0;
  let holdFrame = 0;
  let holding = false;
  let isClosed = false;
  let startAt = 0;
  let previousFocus = document.activeElement;
  let reduceForThisRun = reduceMotion.matches;
  let sceneDuration = 0;
  let sceneElapsed = 0;
  let cutTimer = 0;
  let particleFrame = 0;
  let particles = [];
  let particleWidth = 0;
  let particleHeight = 0;
  let particleScale = 1;
  const initialHash = window.location.hash;

  const marker = (scene, index) => {
    const visualHeader = `<div class="intro-screen-head"><span>STASOS / ${String(index + 1).padStart(2, '0')} — ${scene.id.toUpperCase()}</span><span class="intro-window-dots"><i></i><i></i><i></i></span></div>`;
    if (scene.id === 'welcome') return `<div class="intro-scene-inner">${scene.visual}</div>`;
    return `<div class="intro-scene-inner"><div class="intro-screen-glass">${visualHeader}<div class="intro-surface">${scene.visual}</div></div></div>`;
  };

  function sizeParticles() {
    const ctx = particleCanvas.getContext('2d');
    if (!ctx) return;
    particleScale = Math.min(window.devicePixelRatio || 1, 1.5);
    particleWidth = window.innerWidth; particleHeight = window.innerHeight;
    particleCanvas.width = Math.round(particleWidth * particleScale);
    particleCanvas.height = Math.round(particleHeight * particleScale);
    ctx.setTransform(particleScale, 0, 0, particleScale, 0, 0);
    const count = reduceForThisRun ? 24 : Math.min(82, Math.max(38, Math.round(particleWidth * particleHeight / 14500)));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * particleWidth, y: Math.random() * particleHeight,
      vx: (Math.random() - .5) * .19, vy: (Math.random() - .5) * .16,
      radius: Math.random() * 1.45 + .35, alpha: Math.random() * .35 + .12,
      phase: Math.random() * Math.PI * 2, drift: Math.random() * .35 + .12
    }));
  }

  function drawParticles(time = 0) {
    const ctx = particleCanvas.getContext('2d');
    if (!ctx || isClosed || document.hidden) return;
    ctx.clearRect(0, 0, particleWidth, particleHeight);
    const px = parseFloat(film.style.getPropertyValue('--pointer-x')) || particleWidth * .5;
    const py = parseFloat(film.style.getPropertyValue('--pointer-y')) || particleHeight * .5;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (!reduceForThisRun) {
        p.x += p.vx + Math.sin(time * .00022 + p.phase) * .06;
        p.y += p.vy - p.drift * .08;
        if (p.x < -10) p.x = particleWidth + 10;
        if (p.x > particleWidth + 10) p.x = -10;
        if (p.y < -10) p.y = particleHeight + 10;
        if (p.y > particleHeight + 10) p.y = -10;
      }
      const dxp = p.x - px, dyp = p.y - py;
      const focus = Math.max(0, 1 - Math.hypot(dxp, dyp) / 230);
      const twinkle = .72 + Math.sin(time * .0013 + p.phase) * .28;
      ctx.beginPath();
      ctx.fillStyle = `rgba(198,244,50,${(p.alpha + focus * .5) * twinkle})`;
      ctx.arc(p.x, p.y, p.radius + focus * 1.4, 0, Math.PI * 2);
      ctx.fill();
      if (!reduceForThisRun && i % 2 === 0) {
        for (let j = i + 1; j < particles.length; j += 2) {
          const q = particles[j];
          const distance = Math.hypot(p.x - q.x, p.y - q.y);
          if (distance < 94) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(198,244,50,${(1 - distance / 94) * .075})`;
            ctx.lineWidth = .55;
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
      }
    }
    if (!reduceForThisRun) particleFrame = requestAnimationFrame(drawParticles);
  }
  sizeParticles();
  drawParticles();
  const updatePointerParallax = (event) => {
    film.style.setProperty('--pointer-x', `${event.clientX}px`);
    film.style.setProperty('--pointer-y', `${event.clientY}px`);
    film.style.setProperty('--pointer-tilt-x', `${(event.clientX / Math.max(1, innerWidth) - .5) * 1.6}deg`);
    film.style.setProperty('--pointer-tilt-y', `${(.5 - event.clientY / Math.max(1, innerHeight)) * 1.3}deg`);
  };
  const manageParticleVisibility = () => {
    cancelAnimationFrame(particleFrame);
    if (!document.hidden && !reduceForThisRun && !isClosed) drawParticles();
  };
  window.addEventListener('resize', sizeParticles, { passive: true });
  window.addEventListener('pointermove', updatePointerParallax, { passive: true });
  document.addEventListener('visibilitychange', manageParticleVisibility);

  function setScene(index) {
    if (isClosed) return;
    if (index >= scenes.length) { closeIntro(); return; }
    current = index;
    if (index > 0) {
      clearTimeout(cutTimer);
      film.classList.remove('is-cutting');
      void film.offsetWidth;
      film.classList.add('is-cutting');
      cutTimer = window.setTimeout(() => film.classList.remove('is-cutting'), 1120);
    }
    const scene = scenes[index];
    film.querySelectorAll('.intro-scene').forEach((node) => node.classList.remove('is-active'));
    let sceneElement = film.querySelector(`.intro-scene[data-scene="${scene.id}"]`);
    if (!sceneElement) {
      sceneElement = document.createElement('section');
      sceneElement.className = 'intro-scene';
      sceneElement.dataset.scene = scene.id;
      sceneElement.innerHTML = marker(scene, index);
      if (scene.id === 'system') {
        const demoCursor = document.createElement('i');
        demoCursor.className = 'intro-demo-cursor';
        demoCursor.setAttribute('aria-hidden', 'true');
        sceneElement.querySelector('.intro-mini-client')?.append(demoCursor);
      }
      if (scene.id === 'map') {
        const route = document.createElement('div');
        route.className = 'intro-map-route';
        route.setAttribute('aria-hidden', 'true');
        route.innerHTML = `<svg viewBox="0 0 300 300" preserveAspectRatio="none"><path d="M50 48 C90 48 100 48 150 48 S210 48 250 48 L250 150 C250 202 210 252 150 252 S90 252 50 252 L50 150 C50 104 100 48 150 48"/></svg>`;
        sceneElement.querySelector('.intro-map')?.prepend(route);
      }
      stage.append(sceneElement);
    }
    title.innerHTML = scene.title;
    description.textContent = scene.description;
    kicker.textContent = scene.kicker;
    chapter.textContent = scene.chapter;
    sceneIndex.textContent = String(index + 1).padStart(2, '0');
    stepCount.textContent = `${String(index + 1).padStart(2, '0')} / ${String(scenes.length).padStart(2, '0')}`;
    proof.replaceChildren(...scene.proof.map((label) => { const item = document.createElement('span'); item.textContent = label; return item; }));
    requestAnimationFrame(() => sceneElement.classList.add('is-active'));
    film.dataset.scene = scene.id;
    film.style.setProperty('--scene-number', String(index));
    stage.setAttribute('aria-hidden', scene.id === 'map' ? 'false' : 'true');
    film.classList.remove('copy-arrive');
    void film.offsetWidth;
    film.classList.add('copy-arrive');
    const duration = reduceForThisRun ? 2400 : scene.duration;
    sceneDuration = duration;
    sceneElapsed = 0;
    startAt = performance.now();
    progressTrack.setAttribute('aria-valuenow', String(Math.round((index / scenes.length) * 100)));
    clearInterval(progressTimer);
    progressTimer = window.setInterval(() => {
      if (isClosed || holding) return;
      const part = Math.min(1, (sceneElapsed + performance.now() - startAt) / duration);
      const total = (index + part) / scenes.length * 100;
      progressFill.style.width = `${total}%`;
      progressTrack.setAttribute('aria-valuenow', String(Math.round(total)));
    }, 50);
    clearTimeout(sceneTimer);
    sceneTimer = window.setTimeout(() => setScene(index + 1), duration);
  }

  function closeIntro(destination = '') {
    if (isClosed) return;
    isClosed = true;
    holding = false;
    clearTimeout(sceneTimer); clearInterval(progressTimer); clearTimeout(holdTimer); cancelAnimationFrame(holdFrame);
    skipButton.classList.remove('is-holding');
    skipButton.style.setProperty('--hold-progress', '0%');
    film.classList.add('is-closing');
    document.body.classList.remove('intro-locked');
    cancelAnimationFrame(particleFrame);
    clearTimeout(cutTimer);
    window.removeEventListener('resize', sizeParticles);
    window.removeEventListener('pointermove', updatePointerParallax);
    document.removeEventListener('visibilitychange', manageParticleVisibility);
    try { localStorage.setItem(SEEN_KEY, '1'); } catch { /* Private browsing may disable storage. */ }
    focusTargets.forEach((node, i) => { node.inert = priorInert[i]; });
    window.setTimeout(() => {
      film.remove();
      if (destination) {
        if (destination.startsWith('#')) {
          history.replaceState(null, '', destination);
          document.querySelector(destination)?.scrollIntoView({ behavior: reduceForThisRun ? 'auto' : 'smooth', block: 'start' });
        } else window.location.assign(destination);
      } else {
        const requestedSection = initialHash ? document.getElementById(initialHash.slice(1)) : null;
        if (requestedSection) requestedSection.scrollIntoView({ behavior: reduceForThisRun ? 'auto' : 'smooth', block: 'start' });
        else window.scrollTo({ top: 0, behavior: reduceForThisRun ? 'auto' : 'smooth' });
        previousFocus?.focus?.({ preventScroll: true });
      }
    }, 1050);
  }

  function beginHold(event) {
    if (isClosed || holding || (event?.type === 'pointerdown' && event.button !== 0)) return;
    event?.preventDefault?.();
    holding = true;
    sceneElapsed = Math.min(sceneDuration, sceneElapsed + performance.now() - startAt);
    const holdStart = performance.now();
    skipButton.classList.add('is-holding');
    clearTimeout(sceneTimer);
    const paint = () => {
      if (!holding || isClosed) return;
      const amount = Math.min(1, (performance.now() - holdStart) / 2000);
      skipButton.style.setProperty('--hold-progress', `${amount * 100}%`);
      skipButton.style.setProperty('--hold-progress-unit', String(amount));
      if (amount >= 1) { closeIntro(); return; }
      holdFrame = requestAnimationFrame(paint);
    };
    holdFrame = requestAnimationFrame(paint);
    holdTimer = window.setTimeout(() => closeIntro(), 2050);
  }

  function endHold() {
    if (!holding || isClosed) return;
    holding = false;
    cancelAnimationFrame(holdFrame); clearTimeout(holdTimer);
    skipButton.classList.remove('is-holding');
    skipButton.style.setProperty('--hold-progress', '0%');
    skipButton.style.setProperty('--hold-progress-unit', '0');
    startAt = performance.now();
    sceneTimer = window.setTimeout(() => setScene(current + 1), Math.max(80, sceneDuration - sceneElapsed));
  }

  skipButton.addEventListener('pointerdown', beginHold);
  window.addEventListener('pointerup', endHold);
  window.addEventListener('pointercancel', endHold);
  window.addEventListener('blur', endHold);
  window.addEventListener('keydown', (event) => {
    if (isClosed || event.code !== 'Space' || event.repeat) return;
    event.preventDefault();
    beginHold(event);
  });
  window.addEventListener('keyup', (event) => { if (event.code === 'Space') { event.preventDefault(); endHold(); } });
  skipButton.addEventListener('contextmenu', (event) => event.preventDefault());
  film.addEventListener('click', (event) => {
    const link = event.target.closest('[data-intro-destination]');
    if (!link) return;
    event.preventDefault();
    closeIntro(link.getAttribute('href'));
  });
  film.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') { event.preventDefault(); }
  });

  const replay = document.createElement('a');
  replay.href = '#top'; replay.id = 'replayIntroBtn'; replay.textContent = 'Вступление ↗';
  replay.addEventListener('click', (event) => {
    event.preventDefault();
    if (isClosed) { try { localStorage.removeItem(SEEN_KEY); } catch {} window.location.reload(); }
  });
  document.querySelector('.site-footer .footer-links')?.append(replay);

  try {
    if (localStorage.getItem(SEEN_KEY) === '1') {
      isClosed = true;
      cancelAnimationFrame(particleFrame);
      window.removeEventListener('resize', sizeParticles);
      window.removeEventListener('pointermove', updatePointerParallax);
      document.removeEventListener('visibilitychange', manageParticleVisibility);
      document.body.classList.remove('intro-locked');
      focusTargets.forEach((node, i) => { node.inert = priorInert[i]; });
      film.remove();
      return;
    }
  } catch { /* Play on first view if storage is unavailable. */ }
  document.documentElement.style.scrollBehavior = reduceForThisRun ? 'auto' : 'smooth';
  window.setTimeout(() => setScene(0), 360);
  window.setTimeout(() => skipButton.focus({ preventScroll: true }), 420);
})();
