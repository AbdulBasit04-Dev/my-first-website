// ============ NAVBAR: shadow on scroll, progress bar, back-to-top, active link ============
const navbar = document.getElementById('navbar');
const progressBar = document.getElementById('progressBar');
const toTop = document.getElementById('toTop');
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (scrollTop / height) * 100 + '%';

    navbar.classList.toggle('scrolled', scrollTop > 50);
    toTop.classList.toggle('show', scrollTop > 500);

    let current = '';
    sections.forEach(sec => {
        if (scrollTop >= sec.offsetTop - 120) current = sec.id;
    });
    navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
});

toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ============ MOBILE MENU ============
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
});
navAnchors.forEach(a => a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
}));

// ============ TYPING EFFECT ============
const words = ['Software Engineer', 'Web Developer', 'Flutter Developer', 'Problem Solver'];
const typingEl = document.getElementById('typing');
let wordIndex = 0, charIndex = 0, deleting = false;

function type() {
    const word = words[wordIndex];
    typingEl.textContent = deleting ? word.substring(0, charIndex--) : word.substring(0, charIndex++);

    let delay = deleting ? 50 : 110;
    if (!deleting && charIndex > word.length) { deleting = true; delay = 1400; }
    else if (deleting && charIndex < 0) { deleting = false; wordIndex = (wordIndex + 1) % words.length; charIndex = 0; delay = 400; }
    setTimeout(type, delay);
}
type();

// ============ SCROLL REVEAL + SKILL BARS + COUNTERS ============
function runCounter(el) {
    const target = +el.dataset.target;
    let count = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const timer = setInterval(() => {
        count += step;
        if (count >= target) { count = target; clearInterval(timer); }
        el.textContent = count;
    }, 25);
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');

        entry.target.querySelectorAll('.bar-fill').forEach(bar => {
            bar.style.width = bar.dataset.width + '%';
        });
        entry.target.querySelectorAll('.counter').forEach(runCounter);

        observer.unobserve(entry.target);
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ============ PROJECT FILTERS ============
const filterButtons = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        projects.forEach(p => {
            p.classList.toggle('hide', filter !== 'all' && p.dataset.category !== filter);
        });
    });
});

// ============ CONTACT FORM (opens the visitor's email app) ============
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const subject = encodeURIComponent('Portfolio message from ' + name);
    const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
    window.location.href = 'mailto:basitsatti534@gmail.com?subject=' + subject + '&body=' + body;
});

// ============ FOOTER YEAR ============
document.getElementById('year').textContent = new Date().getFullYear();

// ============ HERO PARTICLE BACKGROUND ============
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

for (let i = 0; i < 70; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 1
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(96, 165, 250, 0.8)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
            const q = particles[j];
            const dist = Math.hypot(p.x - q.x, p.y - q.y);
            if (dist < 120) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(q.x, q.y);
                ctx.strokeStyle = 'rgba(59, 130, 246,' + (1 - dist / 120) * 0.35 + ')';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    });
    requestAnimationFrame(animate);
}
animate();
