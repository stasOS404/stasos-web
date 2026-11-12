// Живой фон с частицами
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
    if (document.body.classList.contains('matrix-mode')) {
        ctx.fillStyle = 'rgba(198, 244, 50, 0.8)'; 
        particles.forEach(p => {
            p.x += (Math.random() - 0.5) * 5;
            p.y += (Math.random() - 0.5) * 5;
        });
    } else {
        ctx.fillStyle = 'rgba(198, 244, 50, 0.2)'; 
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

// Плавное появление при скролле
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

// --- ПАСХАЛКИ ---

// 1. Konami Code (Матрица)
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex] || e.key.toLowerCase() === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            document.body.classList.toggle('matrix-mode');
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// 2. Пасхалка в консоли
console.log("%cТы че тут забыл? Иди покупай ключ 😎", "color: #c6f432; font-size: 20px; font-weight: bold; background: #0b0b0e; padding: 10px;");

// 3. Клик по логотипу 10 раз (и ввод слова 'stas')
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

// 4. Секретный экран
function showSecretScreen() {
    if (document.getElementById('secret-screen')) return;

    const screen = document.createElement('div');
    screen.id = 'secret-screen';
    
    // Русский текст и смайлик теперь в нормальной кодировке
    screen.innerHTML = `
        <div class="secret-content">
            <h1 class="secret-logo"><span>stas</span>OS</h1>
            <p class="secret-motto">Играй по своим правилам <span class="wink">;)</span></p>
        </div>
    `;
    document.body.appendChild(screen);

    setTimeout(() => {
        screen.classList.add('show');
    }, 100);

    // АВТОЗАКРЫТИЕ через 2.5 секунды
    setTimeout(() => {
        screen.classList.remove('show');
        setTimeout(() => screen.remove(), 800);
    }, 2500);

    // Клик для ручного закрытия
    screen.addEventListener('click', () => {
        screen.classList.remove('show');
        setTimeout(() => screen.remove(), 800);
    });
}
// ������ ������
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
