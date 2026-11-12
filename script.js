// –ñ–∏–≤–æ–π —Ñ–æ–Ω —Å —á–∞—Å—Ç–∏—Ü–∞–º–∏
const canvas = document.getElementById('bg-particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resize); resize();

for (let i = 0; i < 60; i++) {
    particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 1
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // –ú–µ–Ω—è–µ–º —Ü–≤–µ—Ç –Ω–∞ –º–∞—Ç—Ä–∏—á–Ω—ã–π, –µ—Å–ª–∏ –≤–∫–ª—é—á–µ–Ω–∞ –ø–∞—Å—Ö–∞–ª–∫–∞
    if (document.body.classList.contains('matrix-mode')) {
        ctx.fillStyle = 'rgba(198, 244, 50, 0.8)'; // –Ø—Ä–∫–æ-—Å–∞–ª–∞—Ç–æ–≤—ã–π –¥–ª—è –º–∞—Ç—Ä–∏—Ü—ã
        particles.forEach(p => {
            p.x += (Math.random() - 0.5) * 5;
            p.y += (Math.random() - 0.5) * 5;
        });
    } else {
        ctx.fillStyle = 'rgba(198, 244, 50, 0.2)'; // –û–±—ã—á–Ω—ã–π —Ñ–æ–Ω
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        });
    }

    particles.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
    });
    requestAnimationFrame(animate);
}
animate();

// –ü–ª–∞–≤–Ω–æ–µ –ø–æ—è–≤–ª–µ–Ω–∏–µ –ø—Ä–∏ —Å–∫—Ä–æ–ª–ª–µ
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .price-card, .roadmap-item, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// --- –ü–ê–°–•–ê–õ–ö–ò ---

// 1. Konami Code (–ú–∞—Ç—Ä–∏—Ü–∞)
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex] || e.key.toLowerCase() === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            document.body.classList.toggle('matrix-mode');
            konamiIndex = 0;
            alert("–ú–∞—Ç—Ä–∏—Ü–∞ –∞–∫—Ç–∏–≤–∏—Ä–æ–≤–∞–Ω–∞! –ù–∞–ø–∏—à–∏ 'stas' –¥–ª—è —Å–µ–∫—Ä–µ—Ç–∞.");
        }
    } else {
        konamiIndex = 0;
    }
});

// 2. –ü–∞—Å—Ö–∞–ª–∫–∞ –≤ –∫–æ–Ω—Å–æ–ª–∏
console.log("%c–¢—ã —á–µ —Ç—É—Ç –∑–∞–±—ã–ª? –ò–¥–∏ –ø–æ–∫—É–ø–∞–π –∫–ª—é—á üòé", "color: #c6f432; font-size: 20px; font-weight: bold; background: #0b0b0e; padding: 10px;");

// 3. –ö–ª–∏–∫ –ø–æ –ª–æ–≥–æ—Ç–∏–ø—É 10 —Ä–∞–∑ (–∏ –≤–≤–æ–¥ —Å–ª–æ–≤–∞ 'stas')
let logoClicks = 0;
let typedWord = "";
const logo = document.querySelector('.logo');

if (logo) {
    logo.addEventListener('click', () => {
        logoClicks++;
        if (logoClicks >= 10) {
            showSecretScreen();
            logoClicks = 0;
        }
    });
}

document.addEventListener('keypress', (e) => {
    typedWord += e.key.toLowerCase();
    if (typedWord.length > 4) typedWord = typedWord.slice(-4);
    if (typedWord === 'stas') {
        showSecretScreen();
    }
});

// 4. –°–µ–∫—Ä–µ—Ç–Ω—ã–π —ç–∫—Ä–∞–Ω
function showSecretScreen() {
    if (document.getElementById('secret-screen')) return;

    const screen = document.createElement('div');
    screen.id = 'secret-screen';
    screen.innerHTML = `
        <div class="secret-content">
            <h1 class="secret-logo"><span>stas</span>OS</h1>
            <p class="secret-motto">»„‡È ÔÓ Ò‚ÓËÏ Ô‡‚ËÎ‡Ï <span class="wink">;)</span></p>
        </div>
    `;
    document.body.appendChild(screen);

    // ¿ÌËÏ‡ˆËˇ ÔÓˇ‚ÎÂÌËˇ
    setTimeout(() => {
        screen.classList.add('show');
    }, 100);

    // --- ¿¬“Œ«¿ –€“»≈ ---
    // ◊ÂÂÁ 2.5 ÒÂÍÛÌ‰˚ ˝Í‡Ì ÔÎ‡‚ÌÓ ËÒ˜ÂÁ‡ÂÚ
    setTimeout(() => {
        screen.classList.remove('show');
        setTimeout(() => screen.remove(), 800); // ∆‰ÂÏ ÓÍÓÌ˜‡ÌËˇ ‡ÌËÏ‡ˆËË Ë Û‰‡ÎˇÂÏ
    }, 2500);

    //  ÎËÍ ‰Îˇ Û˜ÌÓ„Ó Á‡Í˚ÚËˇ (Ì‡ ‚ÒˇÍËÈ ÒÎÛ˜‡È)
    screen.addEventListener('click', () => {
        screen.classList.remove('show');
        setTimeout(() => screen.remove(), 800);
    });
}

