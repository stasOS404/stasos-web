(() => {
  const api = window.stasCinema;
  if (!api) return;
  const items = api.items;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const storage = {
    get(key, fallback) { try { return JSON.parse(localStorage.getItem(`stasos-cinema-${key}`)) ?? fallback; } catch { return fallback; } },
    set(key, value) { try { localStorage.setItem(`stasos-cinema-${key}`, JSON.stringify(value)); } catch {} }
  };
  let profiles = storage.get('profiles-v1', [{id:'main', name:'Мой профиль'}]);
  let profileId = storage.get('active-profile-v1', profiles[0]?.id || 'main');
  let current = null;
  let room = null;
  let channel = null;
  let videoUrl = '';
  let audioUrls = [];
  let audioEl = null;
  const tabId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  let installPrompt = null;
  const byId = (id) => items.find(x => x.id === id);
  const profileDataKey = () => `profile-${profileId}-v1`;
  const blank = () => ({watched:[], progress:{}, notes:{}, moments:{}, credits:{}, collections:[], worlds:[], places:[], studio:{}, opens:{}, queue:[], chat:[], badges:[]});
  let data = storage.get(profileDataKey(), blank());
  $('#spoiler-safe').checked = data.spoilerSafe !== false;
  let lastAutoSave = 0;
  const save = () => storage.set(profileDataKey(), data);
  const toast = (message) => { const el=$('#toast'); el.textContent=message; el.classList.add('show'); clearTimeout(toast.timer); toast.timer=setTimeout(()=>el.classList.remove('show'),2600); };
  const titleName = (id) => byId(id)?.title || id;
  const fileName = (f) => f.name.replace(/\.[^.]+$/, '');
  const titleOptions = (select) => { $(select).innerHTML=items.map(i=>`<option value="${i.id}">${esc(i.title)}</option>`).join(''); };
  ['#queue-title','#world-title','#studio-title','#poster-title','#place-title'].forEach(titleOptions);

  function refreshProfiles() {
    $('#cinema-profile').innerHTML=profiles.map(p=>`<option value="${esc(p.id)}">${esc(p.name)}</option>`).join('');
    $('#cinema-profile').value=profileId;
    $('#profile-list').innerHTML=profiles.map(p=>`<button class="cinema-chip" data-profile="${esc(p.id)}">${esc(p.name)}${p.id==='main'?'':' ×'}</button>`).join('');
  }
  function refreshStats() {
    const fave=api.favoriteIds;
    const watched=data.watched.length;
    const mins=Object.values(data.progress).reduce((s,p)=>s+Number(p.minutes||0),0);
    $('#stat-watched').textContent=watched; $('#stat-favs').textContent=fave.size; $('#stat-minutes').textContent=mins;
    $('#profile-greeting').textContent=`${profiles.find(p=>p.id===profileId)?.name || 'Твоя'} киноистория`;
    $('#profile-summary').textContent=watched ? `В этом профиле отмечено ${watched} историй. Последняя активность — ${new Date().toLocaleDateString('ru-RU')}.` : 'Начни отмечать просмотренное — здесь появится личная статистика.';
    const genres={}; data.watched.forEach(id=>byId(id)?.genres.forEach(g=>genres[g]=(genres[g]||0)+1));
    const sorted=Object.entries(genres).sort((a,b)=>b[1]-a[1]);
    $('#taste-map').innerHTML=sorted.length?sorted.slice(0,6).map(([g,n])=>`<span class="taste-chip" style="--taste:${Math.min(100,28+n*18)}%">${esc(g)} <b>${n}</b></span>`).join(''):'Тут проявятся жанры, которые ты чаще выбираешь.';
    const badges=[];
    if(watched>=1)badges.push('Первый титр'); if(watched>=5)badges.push('Киномарафонец'); if(watched>=15)badges.push('Исследователь'); if(fave.size>=5)badges.push('Коллекционер');
    if(sorted.some(([g])=>g==='Анимация'&&genres[g]>=3))badges.push('Миры анимации');
    $('#badge-shelf').innerHTML=badges.length?badges.map(b=>`<span class="cinema-chip is-earned">✦ ${esc(b)}</span>`).join(''):'Значки откроются по мере заполнения медиатеки.';
    refreshProfiles(); refreshCollections(); refreshMoments(); refreshNotes(); refreshCredits(); refreshWorlds(); refreshPlaces(); refreshStudio(); refreshQueue(); refreshPulse();
  }
  function refreshCollections(){ $('#collection-list').innerHTML=data.collections.map(c=>`<button class="cinema-chip" data-collection="${esc(c.id)}">${esc(c.name)} · ${c.ids.length} <span data-share-collection="${esc(c.id)}">↗</span></button>`).join('')||'Подборок пока нет'; }
  function refreshMoments(){ $('#watch-moments').innerHTML=(data.moments[current?.id]||[]).map(m=>`<div class="cinema-note">⏱ ${fmtTime(m.time)} · ${esc(m.text||'Момент')} <button data-seek="${m.time}">Перейти</button></div>`).join('')||''; }
  function refreshNotes(){ const arr=data.notes[current?.id]||[]; $('#discussion-list').innerHTML=arr.map((n,i)=>`<div class="cinema-note ${n.spoiler?'is-spoiler':''}">${n.spoiler&&$('#spoiler-safe').checked?`<button data-reveal-note="${i}">Показать спойлер</button>`:esc(n.text)}</div>`).join('')||'<p class="cinema-muted">Заметок пока нет.</p>'; }
  function refreshCredits(){ const c=data.credits[current?.id]; $('#credits-list').innerHTML=c?`<div class="cinema-note">${esc(c)}</div>`:''; }
  function refreshWorlds(){ $('#world-map').innerHTML=data.worlds.map((w,i)=>{const hidden=w.spoiler&&$('#spoiler-safe').checked&&!w.revealed;return `<div class="cinema-note">${esc(titleName(w.id))} <span>↔</span> ${hidden?`<button data-reveal-world="${i}">Показать спойлерную связь</button>`:esc(w.label)}</div>`;}).join('')||'<p class="cinema-muted">Добавь связи между проектами или героями.</p>'; }
  function refreshPlaces(){ $('#place-atlas').innerHTML=data.places.map(p=>`<span class="cinema-chip">⌖ ${esc(p.place)} · ${esc(titleName(p.id))}</span>`).join('')||'Атлас пока пуст'; }
  function refreshStudio(){ const s=data.studio[$('#studio-title')?.value]||{}; $('#soundtrack-link').value=s.link||'';$('#production-notes').value=s.notes||'';$('#studio-list').innerHTML=Object.entries(data.studio).map(([id,entry])=>{let link='';try{const u=new URL(entry.link);if(['http:','https:'].includes(u.protocol))link=`<a href="${esc(u.href)}" target="_blank" rel="noopener noreferrer">Открыть официальный источник ↗</a>`;}catch{}return `<div class="cinema-note"><b>${esc(titleName(id))}</b><br>${link}${entry.notes?`<p>${esc(entry.notes)}</p>`:''}</div>`;}).join(''); }
  function refreshQueue(){ $('#room-queue').innerHTML=data.queue.map((q,i)=>`<div class="cinema-note">${i+1}. ${esc(titleName(q.id))} <button data-vote="${i}">▲ ${q.votes||0}</button></div>`).join('')||'<p class="cinema-muted">Очередь пока пустая</p>'; $('#room-chat').innerHTML=data.chat.slice(-10).map(m=>`<div class="cinema-note"><b>${esc(m.name)}:</b> ${esc(m.text)}</div>`).join(''); }
  function refreshPulse(){ const top=Object.entries(data.opens).sort((a,b)=>b[1]-a[1]).slice(0,5); $('#pulse-list').innerHTML=top.map(([id,n])=>`<span class="cinema-chip">${esc(titleName(id))} · ${n}</span>`).join('')||'Открывай карточки — появится локальный рейтинг'; }
  const fmtTime = (seconds) => { const s=Math.floor(seconds||0); return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`; };
  const markOpen = (id) => { data.opens[id]=(data.opens[id]||0)+1; save(); refreshPulse(); };
  function setCurrent(item){ current=item; lastAutoSave=0; $('#player-title').textContent=item.title; markOpen(item.id); refreshStats(); }
  document.addEventListener('stas-cinema-open-title', e=>setCurrent(e.detail.item));
  $('#detail-play-local').addEventListener('click',()=>{ const item=current || api.items.find(i=>i.title===$('#detail-title').textContent); if(item)setCurrent(item); $('.cinema-detail-close').click(); $('[data-tool-tab="watch"]').click(); $('#my-cinema').scrollIntoView({behavior:'smooth'}); $('#video-file').click(); });

  $$('.cinema-tool-tabs [data-tool-tab]').forEach(btn=>btn.addEventListener('click',()=>{ $$('.cinema-tool-tabs button').forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-selected',String(b===btn));}); $$('.cinema-tool-panel').forEach(p=>{p.hidden=p.dataset.toolPanel!==btn.dataset.toolTab;p.classList.toggle('active',!p.hidden);}); }));
  $('#cinema-profile').addEventListener('change',e=>{profileId=e.target.value;storage.set('active-profile-v1',profileId);data=storage.get(profileDataKey(),blank());refreshStats();});
  $('#profile-list').addEventListener('click',e=>{const b=e.target.closest('[data-profile]');if(!b)return;if(b.textContent.endsWith('×')){profiles=profiles.filter(p=>p.id!==b.dataset.profile);storage.set('profiles-v1',profiles);refreshProfiles();return;} $('#cinema-profile').value=b.dataset.profile;$('#cinema-profile').dispatchEvent(new Event('change'));});
  $$('[data-action="add-profile"]').forEach(b=>b.addEventListener('click',()=>{const name=$('#new-profile').value.trim();if(!name)return;const id=`p-${Date.now().toString(36)}`;profiles.push({id,name});storage.set('profiles-v1',profiles);$('#new-profile').value='';profileId=id;storage.set('active-profile-v1',id);data=storage.get(profileDataKey(),blank());refreshStats();}));
  $$('[data-action="add-collection"]').forEach(b=>b.addEventListener('click',()=>{const name=$('#collection-name').value.trim();if(!name)return;data.collections.push({id:`c-${Date.now()}`,name,ids:current?[current.id]:[]});save();$('#collection-name').value='';refreshCollections();toast('Подборка создана');}));
  $('#collection-list').addEventListener('click',async e=>{const share=e.target.closest('[data-share-collection]');if(!share)return;const c=data.collections.find(x=>x.id===share.dataset.shareCollection);const payload=btoa(unescape(encodeURIComponent(JSON.stringify({name:c.name,ids:c.ids}))));const url=`${location.origin}${location.pathname}#collection=${payload}`;try{await navigator.clipboard.writeText(url);toast('Ссылка на коллекцию скопирована');}catch{toast(url);}});
  $$('[data-action="watched"]').forEach(b=>b.addEventListener('click',()=>{if(!current){toast('Сначала открой историю из каталога');return;}if(!data.watched.includes(current.id))data.watched.push(current.id);data.progress[current.id]={...(data.progress[current.id]||{}),minutes:Math.max(1,data.progress[current.id]?.minutes||0),at:Date.now()};save();refreshStats();toast('Отмечено как просмотренное');}));
  $$('[data-action="recap"]').forEach(b=>b.addEventListener('click',()=>{const year=new Date().getFullYear();const count=data.watched.filter(id=>data.progress[id]?.at && new Date(data.progress[id].at).getFullYear()===year).length;toast(`Итоги ${year}: ${count} историй в профиле`);}));
  $$('[data-action="export"]').forEach(b=>b.addEventListener('click',()=>{const snapshot={profile:profiles.find(p=>p.id===profileId)?.name,favorites:[...api.favoriteIds],watched:data.watched,collections:data.collections,year:new Date().getFullYear()};const url=`${location.origin}${location.pathname}#profile=${btoa(unescape(encodeURIComponent(JSON.stringify(snapshot))))}`;navigator.clipboard?.writeText(url).then(()=>toast('Ссылка-профиль скопирована')).catch(()=>toast('Не удалось скопировать ссылку'));}));
  $$('[data-action="badges"]').forEach(b=>b.addEventListener('click',()=>toast(`Значков открыто: ${$('#badge-shelf').querySelectorAll('.is-earned').length}`)));

  const video=$('#local-video');
  $('#video-file').addEventListener('change',e=>{const f=e.target.files[0];if(!f)return;if(videoUrl)URL.revokeObjectURL(videoUrl);videoUrl=URL.createObjectURL(f);video.src=videoUrl;video.play().catch(()=>{});if(current){const p=data.progress[current.id];if(p?.time)video.currentTime=p.time;} });
  $('#audio-file').addEventListener('change',e=>{audioUrls.forEach(x=>URL.revokeObjectURL(x.url));audioUrls=[...e.target.files].map(f=>({name:fileName(f),url:URL.createObjectURL(f)}));$('#dub-track').innerHTML='<option value="">Оригинальная дорожка</option>'+audioUrls.map((a,i)=>`<option value="${i}">${esc(a.name)}</option>`).join('');});
  $('#dub-track').addEventListener('change',e=>{if(audioEl){audioEl.pause();audioEl=null;}const ix=e.target.value;if(ix===''){video.muted=false;return;}audioEl=new Audio(audioUrls[ix].url);audioEl.currentTime=video.currentTime;audioEl.volume=video.volume;video.muted=true;if(!video.paused)audioEl.play().catch(()=>{});});
  function savePlaybackProgress(){if(!current)return;const prev=data.progress[current.id]||{};const now=video.currentTime||0;const delta=Math.max(0,now-Number(prev.lastPosition||0));data.progress[current.id]={time:Math.floor(now),lastPosition:now,minutes:(prev.minutes||0)+Math.floor(delta/60),at:Date.now()};if(video.duration&&now/video.duration>.9&&!data.watched.includes(current.id))data.watched.push(current.id);save();refreshStats();}
  video.addEventListener('play',()=>{audioEl?.play().catch(()=>{});if(room)sendRoom({type:'play',time:video.currentTime});});video.addEventListener('pause',()=>{audioEl?.pause();if(room)sendRoom({type:'pause',time:video.currentTime});});video.addEventListener('seeking',()=>{if(audioEl)audioEl.currentTime=video.currentTime;});video.addEventListener('timeupdate',()=>{if(audioEl&&!audioEl.paused&&Math.abs(audioEl.currentTime-video.currentTime)>.4)audioEl.currentTime=video.currentTime;if(room)sendRoom({type:'time',time:video.currentTime});if(current&&video.currentTime-lastAutoSave>=15){lastAutoSave=video.currentTime;savePlaybackProgress();}});
  $('#playback-speed').addEventListener('change',e=>video.playbackRate=Number(e.target.value));
  $('#subtitle-file').addEventListener('change',e=>{const f=e.target.files[0];if(!f)return;const old=video.querySelector('track[data-local]');old?.remove();const track=document.createElement('track');track.kind='subtitles';track.label=f.name;track.srclang='ru';track.src=URL.createObjectURL(f);track.default=true;track.dataset.local='true';video.append(track);});
  $$('[data-action="save-progress"]').forEach(b=>b.addEventListener('click',()=>{if(!current)return toast('Выбери историю в каталоге');savePlaybackProgress();toast(`Прогресс ${fmtTime(video.currentTime)} сохранён`);}));
  $$('[data-action="mark-moment"]').forEach(b=>b.addEventListener('click',()=>{if(!current)return toast('Выбери историю в каталоге');const text=prompt('Короткая заметка к моменту?','Любимая сцена');if(text===null)return;(data.moments[current.id] ||= []).push({time:video.currentTime||0,text});save();refreshMoments();}));
  $('#watch-moments').addEventListener('click',e=>{const b=e.target.closest('[data-seek]');if(b)video.currentTime=Number(b.dataset.seek);});
  $$('[data-action="ab-dub"]').forEach(b=>b.addEventListener('click',()=>{if(audioUrls.length<2)return toast('Добавь минимум две локальные озвучки');const sel=$('#dub-track');sel.value=sel.value===''?'0':String((Number(sel.value)+1)%audioUrls.length);sel.dispatchEvent(new Event('change'));toast(`Дорожка: ${sel.options[sel.selectedIndex].text}`);}));
  $('#spoiler-safe').addEventListener('change',()=>{data.spoilerSafe=$('#spoiler-safe').checked;save();refreshNotes();refreshWorlds();});
  $$('[data-action="add-note"]').forEach(b=>b.addEventListener('click',()=>{if(!current)return toast('Сначала выбери историю');const text=$('#episode-note').value.trim();if(!text)return;(data.notes[current.id] ||= []).push({text,s:Date.now(),spoiler:$('#note-spoiler').checked});save();$('#episode-note').value='';$('#note-spoiler').checked=false;refreshNotes();}));
  $('#discussion-list').addEventListener('click',e=>{if(e.target.matches('[data-reveal-note]')){const n=data.notes[current?.id]?.[Number(e.target.dataset.revealNote)];if(n){n.revealed=true;const safe=$('#spoiler-safe').checked;$('#spoiler-safe').checked=false;refreshNotes();$('#spoiler-safe').checked=safe;}}});
  $$('[data-action="save-credits"]').forEach(b=>b.addEventListener('click',()=>{if(!current)return toast('Выбери историю');data.credits[current.id]=$('#credits-input').value.trim();save();refreshCredits();toast('Локальный паспорт озвучки сохранён');}));

  function sendRoom(message){if(channel)channel.postMessage({...message,from:tabId});}
  $$('[data-action="join-room"]').forEach(b=>b.addEventListener('click',()=>{const code=$('#room-code').value.trim().toLowerCase();if(!code)return;channel?.close();room=code;channel=new BroadcastChannel(`stasos-cinema-room-${code}`);channel.onmessage=e=>{const m=e.data;if(m.from===tabId)return;if(m.type==='chat'){data.chat.push(m.message);save();refreshQueue();}if(m.type==='queue'){data.queue=m.queue;save();refreshQueue();}if(m.type==='time'&&Math.abs(video.currentTime-m.time)>2)video.currentTime=m.time;if(m.type==='play'){if(Math.abs(video.currentTime-m.time)>2)video.currentTime=m.time;if(video.paused)video.play().catch(()=>{});}if(m.type==='pause'){if(Math.abs(video.currentTime-m.time)>2)video.currentTime=m.time;if(!video.paused)video.pause();}};$('#room-state').textContent=`Подключено · ${code} · эта вкладка и другие вкладки этого браузера`;toast('Локальная комната подключена');}));
  $$('[data-action="send-chat"]').forEach(b=>b.addEventListener('click',()=>{const text=$('#room-message').value.trim();if(!room||!text)return toast('Сначала подключись к комнате');const message={name:profiles.find(p=>p.id===profileId)?.name||'Гость',text};data.chat.push(message);data.chat=data.chat.slice(-30);save();refreshQueue();sendRoom({type:'chat',message});$('#room-message').value='';}));
  $$('[data-action="queue-add"]').forEach(b=>b.addEventListener('click',()=>{const id=$('#queue-title').value;if(data.queue.some(q=>q.id===id))return toast('Уже есть в очереди');data.queue.push({id,votes:0});save();refreshQueue();sendRoom({type:'queue',queue:data.queue});}));
  $('#room-queue').addEventListener('click',e=>{const b=e.target.closest('[data-vote]');if(!b)return;data.queue[Number(b.dataset.vote)].votes++;data.queue.sort((a,b)=>b.votes-a.votes);save();refreshQueue();sendRoom({type:'queue',queue:data.queue});});
  $$('[data-action="marathon"]').forEach(b=>b.addEventListener('click',()=>{const ids=data.queue.length?data.queue.map(q=>q.id):items.filter(i=>current?.genres.some(g=>i.genres.includes(g))&&i.id!==current?.id).slice(0,4).map(i=>i.id);$('#marathon-plan').innerHTML=ids.map((id,n)=>`<span class="cinema-chip">${String(n+1).padStart(2,'0')} · ${esc(titleName(id))}</span>`).join('')||'Добавь истории в очередь';}));

  $$('[data-action="double-feature"]').forEach(b=>b.addEventListener('click',()=>{if(!current)return toast('Открой историю в каталоге, чтобы подобрать пару');const picks=items.filter(i=>i.id!==current.id&&i.genres.some(g=>current.genres.includes(g))).slice(0,1);$('#double-plan').innerHTML=picks.length?`<span class="cinema-chip">${esc(current.title)}</span><span class="cinema-pair-mark">＋</span><span class="cinema-chip">${esc(picks[0].title)}</span>`:'Не нашлось пары по жанру';}));
  $$('[data-action="short-evening"]').forEach(b=>b.addEventListener('click',()=>{const m=Math.max(10,Number($('#evening-time').value)||45);const picks=items.filter(i=>i.genres.includes('Антология')||i.id==='love-death-robots').slice(0,3);$('#evening-plan').innerHTML=picks.map(i=>`<span class="cinema-chip">${esc(i.title)} · формат для короткого вечера (лимит ${m} мин)</span>`).join('');}));
  const drawEra=()=>{const year=Number($('#era-range').value);$('#era-year').textContent=year;$('#era-results').innerHTML=items.filter(i=>i.year<=year&&i.year>year-5).sort((a,b)=>b.year-a.year).slice(0,8).map(i=>`<button class="cinema-chip" data-era-id="${i.id}">${i.year} · ${esc(i.title)}</button>`).join('')||'Нет историй в этом диапазоне';};
  $('#era-range').addEventListener('input',drawEra);$('#era-results').addEventListener('click',e=>{const b=e.target.closest('[data-era-id]');if(b)api.openDetail(byId(b.dataset.eraId));});

  $$('[data-action="save-world"]').forEach(b=>b.addEventListener('click',()=>{const id=$('#world-title').value,label=$('#world-franchise').value.trim();if(!label)return;data.worlds.push({id,label,spoiler:confirm('Это связь персонажей или сюжета со спойлером?')});save();$('#world-franchise').value='';refreshWorlds();}));
  $('#world-map').addEventListener('click',e=>{const b=e.target.closest('[data-reveal-world]');if(!b)return;const w=data.worlds[Number(b.dataset.revealWorld)];if(w){w.revealed=true;save();refreshWorlds();}});
  $$('[data-action="save-place"]').forEach(b=>b.addEventListener('click',()=>{const id=$('#place-title').value,place=$('#place-name').value.trim();if(!place)return;data.places.push({id,place});save();$('#place-name').value='';refreshPlaces();}));
  $$('[data-mood]').forEach(b=>b.addEventListener('click',()=>{const mood=b.dataset.mood;document.body.dataset.cinemaMood=mood==='reset'?'':mood;storage.set('mood-v1',mood==='reset'?'':mood);toast(mood==='reset'?'Оформление сброшено':'Атмосфера включена: '+b.textContent);}));
  $$('[data-action="save-studio"]').forEach(b=>b.addEventListener('click',()=>{data.studio[$('#studio-title').value]={link:$('#soundtrack-link').value.trim(),notes:$('#production-notes').value.trim()};save();refreshStudio();toast('Ссылки и заметки сохранены');}));
  $('#studio-title').addEventListener('change',refreshStudio);
  $$('[data-action="make-poster"]').forEach(b=>b.addEventListener('click',()=>{const item=byId($('#poster-title').value),caption=$('#poster-caption').value.trim()||item.title;const preview=$('#poster-preview');preview.innerHTML=`<div class="poster-mini" style="--poster-a:${item.a};--poster-b:${item.b}"><small>STASOS CINEMA · ${item.year}</small><b>${esc(caption)}</b><i>${esc(item.genres.join(' · '))}</i></div><button data-download-poster>Скачать SVG</button>`;}));
  $('#poster-preview').addEventListener('click',e=>{if(!e.target.matches('[data-download-poster]'))return;const item=byId($('#poster-title').value),caption=$('#poster-caption').value.trim()||item.title;const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900" viewBox="0 0 600 900"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="${item.a}"/><stop offset="1" stop-color="${item.c}"/></linearGradient></defs><rect width="600" height="900" fill="#08090b"/><circle cx="420" cy="320" r="250" fill="url(#g)" opacity=".7"/><text x="48" y="90" fill="#c5f52d" font-family="Arial" font-size="20">STASOS CINEMA · ${item.year}</text><text x="48" y="710" fill="white" font-family="Arial" font-weight="700" font-size="48">${esc(caption)}</text><text x="48" y="760" fill="#aaa" font-family="Arial" font-size="17">${esc(item.genres.join(' · '))}</text></svg>`;download(`${item.id}-poster.svg`,svg,'image/svg+xml');});
  $$('[data-action="copy-correction"]').forEach(b=>b.addEventListener('click',async()=>{const text=$('#correction-text').value.trim();if(!text)return;try{await navigator.clipboard.writeText(`Предложение для stasOS Cinema:\n${current?`${current.title}: `:''}${text}`);toast('Предложение скопировано');}catch{toast('Браузер не разрешил доступ к буферу обмена');}}));
  $$('[data-action="cinema-mode"]').forEach(b=>b.addEventListener('click',()=>{document.body.classList.toggle('cinema-theater');if(document.fullscreenElement)document.exitFullscreen?.();else document.documentElement.requestFullscreen?.().catch(()=>{});}));
  $$('[data-action="install-app"]').forEach(b=>b.addEventListener('click',async()=>{if(!installPrompt)return toast('Открой сайт по HTTPS и нажми «Подготовить офлайн» для доступности установки');installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;}));
  $$('[data-action="offline-mode"]').forEach(b=>b.addEventListener('click',async()=>{if(!('serviceWorker'in navigator))return toast('Офлайн-режим требует HTTPS или localhost');try{await navigator.serviceWorker.register('./sw.js');await navigator.serviceWorker.ready;toast('Каталог подготовлен для офлайна');}catch{toast('Не получилось включить офлайн-режим');}}));
  window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;});
  function download(name,content,type){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([content],{type}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1500);}

  const mood=storage.get('mood-v1',''); if(mood)document.body.dataset.cinemaMood=mood;
  drawEra();refreshStats();
})();
