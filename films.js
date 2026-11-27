(() => {
  const items = [
    {id:'walking-dead',title:'Ходячие мертвецы',type:'series',year:2010,genres:['Драма','Постапокалипсис'],desc:'Долгий путь через мир, который изменился навсегда. В центре — люди, которым приходится заново решать, что значит оставаться людьми.',glyph:'TWD',code:'SIGNAL / 01',a:'#b8c1ad',b:'#151916',c:'#090a09',mark:'NO SIGNAL'},
    {id:'rick-morty',title:'Рик и Морти',type:'series',year:2013,genres:['Анимация','Фантастика'],desc:'Прыжки между реальностями, безумные изобретения и семейные отношения, которые переживут даже очередную вселенную.',glyph:'R&M',code:'PORTAL / 02',a:'#9aff43',b:'#071916',c:'#030c0a',mark:'DIMENSION C-137'},
    {id:'invincible',title:'Неуязвимый',type:'series',year:2021,genres:['Анимация','Супергерои'],desc:'Взросление супергероя, которому приходится разбираться не только с новыми силами, но и с последствиями чужих решений.',glyph:'INV',code:'IMPACT / 03',a:'#f35362',b:'#10162a',c:'#080c18',mark:'STAY HUMAN'},
    {id:'stranger-things',title:'Очень странные дела',type:'series',year:2016,genres:['Фантастика','Мистика'],desc:'Тихий город, исчезновение друга и дверь в место, которому не должно существовать.',glyph:'ST',code:'UPSIDE DOWN / 04',a:'#ed342e',b:'#17090d',c:'#0a0507',mark:'THE OTHER SIDE'},
    {id:'arcane',title:'Аркейн',type:'series',year:2021,genres:['Анимация','Фэнтези'],desc:'Два города по разные стороны пропасти. Две сестры. История о верности, силе и цене прогресса.',glyph:'ARC',code:'HEXTECH / 05',a:'#61c5ff',b:'#0b1220',c:'#070a11',mark:'TWO CITIES'},
    {id:'the-boys',title:'Пацаны',type:'series',year:2019,genres:['Сатира','Боевик'],desc:'Мир, где супергерои — знаменитости, а за красивым образом скрывается совсем другая история.',glyph:'BOYS',code:'HERO / 06',a:'#fa5363',b:'#1b1012',c:'#0a0809',mark:'NO SAINTS'},
    {id:'last-of-us',title:'Одни из нас',type:'series',year:2023,genres:['Драма','Постапокалипсис'],desc:'Путешествие через опасный мир и тихая, человечная история о доверии, потере и надежде.',glyph:'TLOU',code:'AFTER / 07',a:'#a5d373',b:'#101811',c:'#080c09',mark:'KEEP GOING'},
    {id:'wednesday',title:'Уэнсдэй',type:'series',year:2022,genres:['Мистика','Комедия'],desc:'Новая школа, старые тайны и расследование, которое быстро становится личным.',glyph:'W',code:'NEVERMORE / 08',a:'#b4a7d9',b:'#14111c',c:'#09080e',mark:'DARK ACADEMIA'},
    {id:'game-of-thrones',title:'Игра престолов',type:'series',year:2011,genres:['Фэнтези','Драма'],desc:'Семьи, союзы и борьба за власть на континенте, где зима может оказаться страшнее любой войны.',glyph:'GOT',code:'IRON / 09',a:'#ff9b4a',b:'#1b100d',c:'#0b0807',mark:'WINTER IS NEAR'},
    {id:'breaking-bad',title:'Во все тяжкие',type:'series',year:2008,genres:['Драма','Криминал'],desc:'Решение, принятое в отчаянии, постепенно меняет жизнь учителя химии и всех вокруг него.',glyph:'BB',code:'CHEMISTRY / 10',a:'#d7e353',b:'#171a0b',c:'#090a06',mark:'NO HALF MEASURES'},
    {id:'black-mirror',title:'Чёрное зеркало',type:'series',year:2011,genres:['Антология','Фантастика'],desc:'Отдельные истории о технологиях, привычках и будущем, которое часто оказывается ближе, чем кажется.',glyph:'BM',code:'REFLECTION / 11',a:'#b5c6ff',b:'#080a13',c:'#05060b',mark:'LOOK CLOSER'},
    {id:'sherlock',title:'Шерлок',type:'series',year:2010,genres:['Детектив','Драма'],desc:'Лондонские расследования, быстрые выводы и необычная дружба двух людей с совершенно разным взглядом на мир.',glyph:'221B',code:'CASE / 12',a:'#d5b888',b:'#17130e',c:'#090807',mark:'THE GAME IS ON'},
    {id:'mandalorian',title:'Мандалорец',type:'series',year:2019,genres:['Фантастика','Приключения'],desc:'Одинокий охотник за головами принимает задачу, которая меняет его маршрут и правила.',glyph:'M',code:'OUTER RIM / 13',a:'#a4b7bd',b:'#14191a',c:'#080a0b',mark:'THIS IS THE WAY'},
    {id:'loki',title:'Локи',type:'series',year:2021,genres:['Фантастика','Приключения'],desc:'Неожиданный союз, временные линии и вопрос, можно ли выбрать собственную судьбу.',glyph:'L',code:'TIME / 14',a:'#8acb60',b:'#10170f',c:'#070b08',mark:'VARIANT DETECTED'},
    {id:'peaky-blinders',title:'Острые козырьки',type:'series',year:2013,genres:['Криминал','Драма'],desc:'Семейное дело, амбиции и улицы Бирмингема в истории о власти и её цене.',glyph:'PB',code:'BIRMINGHAM / 15',a:'#c1b197',b:'#151310',c:'#090807',mark:'BY ORDER'},
    {id:'house-of-dragon',title:'Дом дракона',type:'series',year:2022,genres:['Фэнтези','Драма'],desc:'Династия, разделённая борьбой за наследие, и напряжение, которое разгорается задолго до открытого конфликта.',glyph:'HOTD',code:'DRAGON / 16',a:'#ff9c57',b:'#1b0f0d',c:'#0a0707',mark:'FIRE & BLOOD'},
    {id:'dark',title:'Тьма',type:'series',year:2017,genres:['Фантастика','Детектив'],desc:'Исчезновения в небольшом городе становятся началом запутанной истории о времени и нескольких семьях.',glyph:'DARK',code:'CYCLE / 17',a:'#72a9b7',b:'#081015',c:'#05090c',mark:'EVERYTHING IS CONNECTED'},
    {id:'squid-game',title:'Игра в кальмара',type:'series',year:2021,genres:['Триллер','Драма'],desc:'Большая ставка, простые правила и участники, которым приходится делать тяжёлый выбор.',glyph:'456',code:'ROUND / 18',a:'#fa7691',b:'#181017',c:'#0a070c',mark:'ONE LAST GAME'},
    {id:'one-piece',title:'Ван-Пис',type:'series',year:2023,genres:['Приключения','Фэнтези'],desc:'Команда отправляется в большое морское приключение в поисках свободы, друзей и легендарного сокровища.',glyph:'OP',code:'GRAND LINE / 19',a:'#62ccdc',b:'#09161d',c:'#050a0d',mark:'SET SAIL'},
    {id:'chernobyl',title:'Чернобыль',type:'series',year:2019,genres:['История','Драма'],desc:'Мини-сериал о катастрофе, её последствиях и людях, которые пытались установить правду.',glyph:'86',code:'ARCHIVE / 20',a:'#c3cf69',b:'#15180e',c:'#090a07',mark:'WHAT IS THE COST OF LIES'},
    {id:'daredevil',title:'Сорвиголова',type:'series',year:2015,genres:['Боевик','Драма'],desc:'Ночной защитник города пытается удержать равновесие между своей работой, законом и личным кодексом.',glyph:'DD',code:'HELL’S KITCHEN / 21',a:'#f34c3d',b:'#160b0b',c:'#080505',mark:'IN THE DARK'},
    {id:'love-death-robots',title:'Любовь. Смерть. Роботы.',type:'series',year:2019,genres:['Антология','Анимация'],desc:'Короткие самостоятельные истории, каждая со своим миром, стилем анимации и неожиданным поворотом.',glyph:'LDR',code:'SHORT FORM / 22',a:'#ff765e',b:'#170f12',c:'#090709',mark:'MANY WORLDS'},
    {id:'yellowstone',title:'Йеллоустоун',type:'series',year:2018,genres:['Драма','Вестерн'],desc:'Большое ранчо, земля и семья, которой приходится защищать свой образ жизни.',glyph:'Y',code:'RANCH / 23',a:'#d9a45b',b:'#17130d',c:'#090806',mark:'THE LAND REMEMBERS'},
    {id:'the-office',title:'Офис',type:'series',year:2005,genres:['Комедия','Мокьюментари'],desc:'Повседневная жизнь офиса, неловкие встречи и люди, с которыми любой рабочий день превращается в историю.',glyph:'DMI',code:'PAPER / 24',a:'#f0d77c',b:'#16150d',c:'#090906',mark:'THREAT LEVEL MIDNIGHT'},
    {id:'big-hero-6',title:'Город героев',type:'movie',year:2014,genres:['Анимация','Приключения'],desc:'Юный изобретатель и заботливый робот объединяются с друзьями, чтобы защитить свой город.',glyph:'BH6',code:'HEALTHCARE / 25',a:'#f45a6d',b:'#10151c',c:'#070a0d',mark:'ON YOUR SIDE'},
    {id:'interstellar',title:'Интерстеллар',type:'movie',year:2014,genres:['Фантастика','Драма'],desc:'Космическая экспедиция становится историей о времени, семье и поиске нового дома.',glyph:'∞',code:'DEEP SPACE / 26',a:'#a9b9d5',b:'#080d17',c:'#04070c',mark:'STAY'},
    {id:'inception',title:'Начало',type:'movie',year:2010,genres:['Фантастика','Триллер'],desc:'Команда специалистов работает с идеями и снами, где каждый уровень меняет правила происходящего.',glyph:'IN',code:'DREAM LAYER / 27',a:'#e6b584',b:'#17100d',c:'#090705',mark:'ONE MORE LEVEL'},
    {id:'dune-2',title:'Дюна: Часть вторая',type:'movie',year:2024,genres:['Фантастика','Приключения'],desc:'Путь на пустынной планете приводит к союзам, выбору и масштабному конфликту.',glyph:'DUNE',code:'ARRAKIS / 28',a:'#e6ad62',b:'#1a120c',c:'#0a0705',mark:'DESERT POWER'},
    {id:'oppenheimer',title:'Оппенгеймер',type:'movie',year:2023,genres:['Драма','История'],desc:'Биографическая драма о научной работе, ответственности и решениях, последствия которых невозможно отменить.',glyph:'O',code:'REACTION / 29',a:'#ff713d',b:'#190b08',c:'#090403',mark:'A WORLD CHANGED'},
    {id:'spiderverse',title:'Человек-паук: Через вселенные',type:'movie',year:2023,genres:['Анимация','Приключения'],desc:'Новый прыжок между мирами и яркое приключение о выборе собственного пути.',glyph:'∞',code:'VERSE / 30',a:'#f266b2',b:'#0d1025',c:'#070815',mark:'GO BEYOND'},
    {id:'the-batman',title:'Бэтмен',type:'movie',year:2022,genres:['Детектив','Боевик'],desc:'Ночной Готэм, цепочка загадок и расследование, которое затрагивает весь город.',glyph:'BAT',code:'GOTHAM / 31',a:'#ff5448',b:'#100c0c',c:'#070505',mark:'I AM THE SHADOW'},
    {id:'john-wick',title:'Джон Уик 4',type:'movie',year:2023,genres:['Боевик','Триллер'],desc:'Путь к свободе ведёт через новые правила, дальние города и непрерывное движение.',glyph:'JW',code:'CONSEQUENCE / 32',a:'#50d8cd',b:'#071312',c:'#030908',mark:'NO WAY BACK'},
    {id:'the-matrix',title:'Матрица',type:'movie',year:1999,genres:['Фантастика','Боевик'],desc:'Вопрос о природе реальности становится началом большого выбора.',glyph:'01',code:'SYSTEM / 33',a:'#9de85b',b:'#08120a',c:'#030805',mark:'FOLLOW THE SIGNAL'},
    {id:'avatar',title:'Аватар: Путь воды',type:'movie',year:2022,genres:['Фантастика','Приключения'],desc:'Возвращение на Пандору — история о семье, новом доме и мире, тесно связанном с океаном.',glyph:'A',code:'PANDORA / 34',a:'#52b9e7',b:'#081420',c:'#03090f',mark:'THE WAY OF WATER'},
    {id:'harry-potter',title:'Гарри Поттер и узник Азкабана',type:'movie',year:2004,genres:['Фэнтези','Приключения'],desc:'Новый учебный год в Хогвартсе приносит тайны, опасность и знакомство с прошлым.',glyph:'HP',code:'HOGWARTS / 35',a:'#d9b66f',b:'#15110c',c:'#080705',mark:'MARAUDER’S MAP'},
    {id:'lord-of-the-rings',title:'Властелин колец: Братство кольца',type:'movie',year:2001,genres:['Фэнтези','Приключения'],desc:'Большое путешествие начинается с маленького шага — и поручения, от которого зависит судьба Средиземья.',glyph:'LOTR',code:'MIDDLE-EARTH / 36',a:'#edcc70',b:'#171408',c:'#090802',mark:'ONE JOURNEY'},
    {id:'everything-everywhere',title:'Всё везде и сразу',type:'movie',year:2022,genres:['Фантастика','Комедия'],desc:'Обычный день разрастается до бесконечности миров, неожиданных версий себя и одного важного выбора.',glyph:'∞',code:'MULTIVERSE / 37',a:'#f29dde',b:'#130e18',c:'#08060c',mark:'BE KIND'},
    {id:'coco',title:'Тайна Коко',type:'movie',year:2017,genres:['Анимация','Музыка'],desc:'Музыка, семейная память и яркое путешествие между двумя мирами.',glyph:'C',code:'REMEMBER / 38',a:'#ff9f48',b:'#1a0e16',c:'#09060c',mark:'REMEMBER ME'},
    {id:'inside-out',title:'Головоломка 2',type:'movie',year:2024,genres:['Анимация','Комедия'],desc:'Новые чувства, перемены и знакомая команда, которой предстоит научиться работать вместе.',glyph:'☺',code:'EMOTIONS / 39',a:'#70c9fc',b:'#0b1320',c:'#060a12',mark:'ALL FEELINGS WELCOME'},
    {id:'shrek',title:'Шрек',type:'movie',year:2001,genres:['Анимация','Комедия'],desc:'Сказочное путешествие с неожиданным героем, шумным спутником и собственной логикой.',glyph:'S',code:'SWAMP / 40',a:'#8dd054',b:'#11170a',c:'#070a05',mark:'BETTER OUT THAN IN'},
    {id:'puss-in-boots',title:'Кот в сапогах: Последнее желание',type:'movie',year:2022,genres:['Анимация','Приключения'],desc:'Стильное приключение о смелости, дружбе и ценности каждого нового дня.',glyph:'P!',code:'LAST WISH / 41',a:'#ffe6a1',b:'#17100c',c:'#090604',mark:'ONE LIFE LEFT'},
    {id:'top-gun',title:'Топ Ган: Мэверик',type:'movie',year:2022,genres:['Боевик','Драма'],desc:'Возвращение в небо, сложная подготовка и команда, которой предстоит довериться друг другу.',glyph:'TG',code:'AFTERBURN / 42',a:'#f57d59',b:'#0d141c',c:'#06090e',mark:'FEEL THE NEED'},
    {id:'mad-max',title:'Безумный Макс: Дорога ярости',type:'movie',year:2015,genres:['Боевик','Приключения'],desc:'Погоня через пустошь превращается в самостоятельную историю о выживании и свободе.',glyph:'MAX',code:'WASTELAND / 43',a:'#ffab58',b:'#1a100a',c:'#090604',mark:'WITNESS'},
    {id:'pirates',title:'Пираты Карибского моря: Проклятие Чёрной жемчужины',type:'movie',year:2003,genres:['Приключения','Фэнтези'],desc:'Капитан с собственными правилами, корабль-призрак и приключение с юмором и морской романтикой.',glyph:'☠',code:'BLACK PEARL / 44',a:'#77c9d0',b:'#081417',c:'#03090b',mark:'SAIL AT DUSK'},
    {id:'whiplash',title:'Одержимость',type:'movie',year:2014,genres:['Драма','Музыка'],desc:'Музыкант стремится к мастерству, а репетиции постепенно превращаются в испытание характера.',glyph:'W',code:'TEMPO / 45',a:'#f6c64d',b:'#18140a',c:'#090702',mark:'KEEP THE TEMPO'},
    {id:'social-network',title:'Социальная сеть',type:'movie',year:2010,genres:['Драма','Биография'],desc:'История создания цифрового проекта и отношений, которые меняются вместе с его ростом.',glyph:'F',code:'NETWORK / 46',a:'#9ab7ff',b:'#0b0e18',c:'#05070d',mark:'MOVE FAST'},
    {id:'la-la-land',title:'Ла-Ла Ленд',type:'movie',year:2016,genres:['Мюзикл','Драма'],desc:'Лос-Анджелес, музыка, мечты и отношения, которые оставляют след даже после финальной ноты.',glyph:'L·L',code:'BLUE HOUR / 47',a:'#f39bbd',b:'#15101a',c:'#08060d',mark:'A LOVELY NIGHT'},
    {id:'grand-budapest',title:'Отель «Гранд Будапешт»',type:'movie',year:2014,genres:['Комедия','Приключения'],desc:'Курьёзные события в элегантном отеле, рассказанные с точностью, теплом и безупречной композицией.',glyph:'GB',code:'ROOM / 48',a:'#ff9fbc',b:'#1a1018',c:'#09060c',mark:'GRAND TOUR'}
  ];

  const featuredIds = ['walking-dead', 'rick-morty', 'invincible', 'big-hero-6'];
  const heroCopy = {
    'walking-dead': {title:'Ходячие<br><span>мёртвецы</span>',tag:'FEATURED SERIES / 2010',desc:'Мир после катастрофы. Сигнал из пустоты. И истории людей, которые продолжают идти вперёд.',kind:'СЕРИАЛ',genres:'ДРАМА · ПОСТАПОКАЛИПСИС'},
    'rick-morty': {title:'Рик и<br><span>Морти</span>',tag:'FEATURED SERIES / 2013',desc:'Безумные изобретения, прыжки между реальностями и семья, которой не страшна даже очередная вселенная.',kind:'СЕРИАЛ',genres:'АНИМАЦИЯ · ФАНТАСТИКА'},
    'invincible': {title:'Неуязвимый.<br><span>Без оговорок.</span>',tag:'FEATURED SERIES / 2021',desc:'История взросления супергероя, где каждый выбор имеет вес, а сила не отменяет последствий.',kind:'СЕРИАЛ',genres:'АНИМАЦИЯ · СУПЕРГЕРОИ'},
    'big-hero-6': {title:'Город<br><span>героев.</span>',tag:'FEATURED FILM / 2014',desc:'Большой город, умный юный изобретатель и робот, который всегда готов помочь.',kind:'ФИЛЬМ',genres:'АНИМАЦИЯ · ПРИКЛЮЧЕНИЯ'}
  };
  const $ = (selector, root = document) => root.querySelector(selector);
  const grid = $('#cinema-grid');
  const search = $('#cinema-search');
  const modal = $('#cinema-modal');
  const hero = $('#cinema-hero');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const favoriteKey = 'stasos-cinema-favorites-v1';
  let activeFilter = 'all';
  let query = '';
  let alphabetical = false;
  let featuredIndex = 0;
  let featureTimer = 0;
  let featurePaused = false;
  let lastFocus = null;
  let activeDetail = null;
  let favoriteIds = new Set();
  try { favoriteIds = new Set(JSON.parse(localStorage.getItem(favoriteKey) || '[]')); } catch { favoriteIds = new Set(); }

  const htmlEscape = (value) => String(value).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const artScene = (item) => `<div class="cinema-art-scene" data-world="${item.id}" style="--art-a:${item.a};--art-b:${item.b}"><i class="cinema-scene-halo"></i><i class="cinema-scene-object"></i><span class="cinema-scene-code">${htmlEscape(item.code)}</span><span class="cinema-scene-glyph">${htmlEscape(item.glyph)}</span><span class="cinema-scene-signal">${htmlEscape(item.mark)}</span></div>`;
  const poster = (item, num) => `<div class="poster-art" data-world="${item.id}" aria-hidden="true" style="--poster-a:${item.a};--poster-b:${item.b};--poster-c:${item.c};--art-angle:${(num * 17) % 60 - 30}deg;--poster-motion:motion-${item.id};--poster-duration:${5 + num % 6}s"><span class="poster-mark">${htmlEscape(item.code)}</span><i class="poster-orbit"></i><i class="poster-special"></i><span class="poster-glyph">${htmlEscape(item.glyph)}</span><span class="poster-bottom"><span>${htmlEscape(item.mark)}</span><i></i></span></div>`;
  const motionCss = items.map((item, index) => {
    const x = ((index * 7) % 19) - 9;
    const y = ((index * 11) % 17) - 8;
    const turn = ((index * 13) % 15) - 7;
    const scale = (1.035 + (index % 7) * .008).toFixed(3);
    const x2 = (x * -.58).toFixed(1), y2 = (y * -.72).toFixed(1);
    return `@keyframes motion-${item.id}{0%,100%{transform:translate3d(0,0,0) rotate(0) scale(1)}36%{transform:translate3d(${x}px,${y}px,0) rotate(${turn}deg) scale(${scale})}68%{transform:translate3d(${x2}px,${y2}px,0) rotate(${-turn * .65}deg) scale(.99)}}`;
  }).join('');
  const motionStyle = document.createElement('style');
  motionStyle.textContent = motionCss;
  document.head.append(motionStyle);

  function render() {
    const normalized = query.trim().toLocaleLowerCase('ru');
    let result = items.filter((item) => {
      const matchesType = activeFilter === 'all' || (activeFilter === 'favorites' ? favoriteIds.has(item.id) : item.type === activeFilter);
      const searchable = `${item.title} ${item.type} ${item.genres.join(' ')} ${item.desc} ${item.mark}`.toLocaleLowerCase('ru');
      return matchesType && (!normalized || searchable.includes(normalized));
    });
    if (alphabetical) result = result.sort((a,b) => a.title.localeCompare(b.title,'ru'));
    $('#cinema-results-label').textContent = activeFilter === 'series' ? 'СЕРИАЛЫ' : activeFilter === 'movie' ? 'ФИЛЬМЫ' : activeFilter === 'favorites' ? 'ИЗБРАННОЕ' : 'ВСЯ КОЛЛЕКЦИЯ';
    $('#cinema-total').textContent = String(items.length);
    const counts = {all:items.length,series:items.filter((x)=>x.type==='series').length,movie:items.filter((x)=>x.type==='movie').length,favorites:favoriteIds.size};
    document.querySelectorAll('.cinema-filter-tabs [data-filter]').forEach((button) => {
      button.classList.toggle('active', button.dataset.filter === activeFilter);
      if (button.dataset.filter !== 'all') {
        const label = button.dataset.filter === 'series' ? 'Сериалы' : button.dataset.filter === 'movie' ? 'Фильмы' : 'Избранное';
        button.innerHTML = `${label} <b>${counts[button.dataset.filter] || 0}</b>`;
      } else button.innerHTML = `Все <b>${items.length}</b>`;
      button.setAttribute('aria-pressed', String(button.dataset.filter === activeFilter));
    });
    grid.innerHTML = result.map((item, index) => {
      const number = String(items.indexOf(item) + 1).padStart(2,'0');
      const kind = item.type === 'series' ? 'СЕРИАЛ' : 'ФИЛЬМ';
      const favorite = favoriteIds.has(item.id);
      return `<article class="cinema-card" data-id="${item.id}" style="--card-accent:${item.a};--arrival:${Math.min(index % 10,8) * 35}ms"><div class="cinema-poster">${poster(item,items.indexOf(item))}<span class="cinema-card-topline"><span>${kind}</span><span>${number} / ${String(items.length).padStart(2,'0')}</span></span><button class="cinema-card-fav${favorite?' is-favorite':''}" type="button" data-favorite="${item.id}" aria-label="${favorite?'Убрать из':'Добавить в'} избранное: ${htmlEscape(item.title)}" aria-pressed="${favorite}">${favorite?'♥':'♡'}</button><button class="cinema-card-open" type="button" data-open="${item.id}" aria-label="Открыть: ${htmlEscape(item.title)}"></button></div><div class="cinema-card-info"><div class="cinema-card-topline"><span class="cinema-type">${kind} · ${item.year}</span><span>${item.genres[0].toUpperCase()}</span></div><b class="cinema-card-title">${htmlEscape(item.title)}</b><span class="cinema-card-genres">${htmlEscape(item.genres.join(' · '))}</span></div></article>`;
    }).join('');
    $('#cinema-empty').hidden = result.length !== 0;
    grid.hidden = result.length === 0;
    $('#cinema-sort').innerHTML = `ПОРЯДОК <b>${alphabetical?'ПО НАЗВАНИЮ':'ПО РЕКОМЕНДАЦИИ'} ↕</b>`;
    $('#cinema-sort').setAttribute('aria-pressed', String(alphabetical));
  }

  function setFavorite(id) {
    if (favoriteIds.has(id)) favoriteIds.delete(id); else favoriteIds.add(id);
    try { localStorage.setItem(favoriteKey, JSON.stringify([...favoriteIds])); } catch { /* Favorites still work until this tab closes. */ }
    render();
    if (activeDetail?.id === id) updateDetailFavorite();
  }
  function updateDetailFavorite() {
    const active = activeDetail && favoriteIds.has(activeDetail.id);
    $('#detail-favorite').innerHTML = `${active?'Убрать из избранного':'Добавить в избранное'} <span>${active?'♥':'♡'}</span>`;
    $('#detail-favorite').setAttribute('aria-pressed', String(Boolean(active)));
  }
  function openDetail(item, opener = document.activeElement) {
    if (!item) return;
    activeDetail = item; lastFocus = opener;
    $('#detail-art').innerHTML = poster(item, items.indexOf(item));
    $('#detail-art').dataset.art = item.id;
    $('#detail-code').textContent = `STASOS CINEMA / ${item.code}`;
    $('#detail-meta').textContent = `${item.type === 'series'?'СЕРИАЛ':'ФИЛЬМ'}  ·  ${item.year}  ·  ${item.genres.join(' / ').toUpperCase()}`;
    $('#detail-title').textContent = item.title;
    $('#detail-description').textContent = item.desc;
    $('#detail-tags').innerHTML = item.genres.map((genre) => `<span>${htmlEscape(genre.toUpperCase())}</span>`).join('');
    updateDetailFavorite();
    modal.classList.add('open'); modal.setAttribute('aria-hidden','false');
    document.body.classList.add('cinema-modal-open');
    requestAnimationFrame(() => $('.cinema-detail-close').focus({preventScroll:true}));
  }
  function closeDetail() {
    if (!modal.classList.contains('open')) return;
    modal.classList.remove('open'); modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('cinema-modal-open');
    const focusTarget = lastFocus?.isConnected ? lastFocus : activeDetail ? grid.querySelector(`[data-open="${activeDetail.id}"]`) : null;
    activeDetail = null;
    focusTarget?.focus?.({preventScroll:true});
  }

  function setFeature(index, restart = true) {
    featuredIndex = (index + featuredIds.length) % featuredIds.length;
    const item = items.find((entry) => entry.id === featuredIds[featuredIndex]);
    const copy = heroCopy[item.id];
    const title = $('#cinema-feature-title');
    const art = $('#cinema-feature-art');
    title.classList.add('changing'); art.classList.add('changing');
    window.setTimeout(() => {
      hero.dataset.featured = item.id;
      title.innerHTML = copy.title;
      $('#cinema-feature-tag').textContent = copy.tag;
      $('#cinema-feature-desc').textContent = copy.desc;
      $('#cinema-feature-meta').innerHTML = `<span>${copy.kind}</span><i></i><span>${copy.genres}</span>`;
      art.innerHTML = `${artScene(item)}<div class="cinema-title-stamp">${String(featuredIndex+1).padStart(2,'0')}<span> / 04</span></div>`;
      art.classList.remove('changing'); title.classList.remove('changing');
      $('#featured-counter').textContent = `${String(featuredIndex+1).padStart(2,'0')} / 04`;
      if (restart) scheduleFeature();
    }, 260);
  }
  function scheduleFeature() {
    clearTimeout(featureTimer);
    const fill = $('#featured-progress-fill');
    fill.classList.remove('running');
    if (reducedMotion.matches || featurePaused) return;
    void fill.offsetWidth;
    fill.classList.add('running');
    featureTimer = window.setTimeout(() => setFeature(featuredIndex+1), 10000);
  }

  grid.addEventListener('click', (event) => {
    const favorite = event.target.closest('[data-favorite]');
    if (favorite) { event.stopPropagation(); setFavorite(favorite.dataset.favorite); return; }
    const open = event.target.closest('[data-open]');
    if (open) openDetail(items.find((item) => item.id === open.dataset.open), open);
  });
  document.querySelectorAll('.cinema-filter-tabs [data-filter]').forEach((button) => button.addEventListener('click', () => { activeFilter = button.dataset.filter; render(); }));
  search.addEventListener('input', () => { query = search.value; render(); });
  $('#cinema-sort').addEventListener('click', () => { alphabetical = !alphabetical; render(); });
  $('#cinema-reset').addEventListener('click', () => { activeFilter='all';query='';search.value='';render();search.focus(); });
  $('#detail-favorite').addEventListener('click', () => { if (activeDetail) setFavorite(activeDetail.id); });
  modal.addEventListener('click', (event) => { if (event.target.closest('[data-modal-close]')) closeDetail(); });
  window.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault();event.stopImmediatePropagation();if(!modal.classList.contains('open'))search.focus();return; }
    if (event.key === 'Escape') closeDetail();
    if (event.key === 'Tab' && modal.classList.contains('open')) {
      const focusables = [...modal.querySelectorAll('button:not([disabled])')];
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault();last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault();first.focus(); }
    }
  }, true);
  hero.addEventListener('pointerenter', () => { featurePaused=true;clearTimeout(featureTimer);$('#featured-progress-fill').classList.remove('running'); });
  hero.addEventListener('pointerleave', () => { featurePaused=false;scheduleFeature(); });
  hero.addEventListener('focusin', () => { featurePaused=true;clearTimeout(featureTimer);$('#featured-progress-fill').classList.remove('running'); });
  hero.addEventListener('focusout', (event) => { if (!hero.contains(event.relatedTarget)) { featurePaused=false;scheduleFeature(); } });
  $('#featured-prev').addEventListener('click', () => setFeature(featuredIndex-1));
  $('#featured-next').addEventListener('click', () => setFeature(featuredIndex+1));
  const chooseRandom = () => { const item=items[Math.floor(Math.random()*items.length)];openDetail(item,document.activeElement); };
  $('#featured-random').addEventListener('click', chooseRandom);
  $('#cinema-random-bottom').addEventListener('click', chooseRandom);

  render();
  setFeature(0);
})();
