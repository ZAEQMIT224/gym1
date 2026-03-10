// --- Initialize Scroll Animations (AOS) ---
AOS.init({ once: true, offset: 100, duration: 800, easing: 'ease-out-cubic' });

// --- Initialize 3D Tilt Cards ---
VanillaTilt.init(document.querySelectorAll(".tilt-card"), { max: 15, speed: 400, glare: true, "max-glare": 0.2 });

// --- Initialize Swiper Carousels ---
// Gallery Carousel
const gallerySwiper = new Swiper('.gallery-swiper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: { rotate: 0, stretch: 0, depth: 100, modifier: 2, slideShadows: true },
    loop: true,
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    pagination: { el: '.swiper-pagination', clickable: true }
});

// Testimonial Carousel
const reviewSwiper = new Swiper('.review-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: { el: '.swiper-pagination', clickable: true },
    breakpoints: { 768: { slidesPerView: 2 } }
});

// --- Custom Cursor Logic ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorGlow = document.querySelector('.cursor-glow');

window.addEventListener('mousemove', (e) => {
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;
    cursorGlow.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 500, fill: "forwards" });
});

document.querySelectorAll('a, button, input, select, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => cursorGlow.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursorGlow.classList.remove('cursor-hover'));
});

// --- Navbar Scroll Effect ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// --- Mobile Menu Toggle ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));

// --- Magnetic Button Effect ---
const magneticBtns = document.querySelectorAll('.magnetic-btn');
magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const position = btn.getBoundingClientRect();
        // Fixed: using clientX/Y instead of pageX/Y prevents the scroll-bounce bug
        const x = e.clientX - position.left - position.width / 2;
        const y = e.clientY - position.top - position.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
    });
    btn.addEventListener('mouseout', () => {
        btn.style.transform = 'translate(0px, 0px)';
    });
});

// --- Fitness Calculators Logic ---
function calculateBMI() {
    const w = parseFloat(document.getElementById('bmi-weight').value);
    const h = parseFloat(document.getElementById('bmi-height').value) / 100; 
    const res = document.getElementById('bmi-result');
    if(w > 0 && h > 0) {
        const bmi = (w / (h * h)).toFixed(1);
        let cat = bmi < 18.5 ? "Underweight" : bmi < 24.9 ? "Normal weight" : bmi < 29.9 ? "Overweight" : "Obese";
        res.innerHTML = `BMI: ${bmi} (${cat})`;
    } else res.innerHTML = "Please enter valid values.";
}

function calculateCalories() {
    const age = parseFloat(document.getElementById('cal-age').value);
    const gender = document.getElementById('cal-gender').value;
    const w = parseFloat(document.getElementById('cal-weight').value);
    const h = parseFloat(document.getElementById('cal-height').value);
    const act = parseFloat(document.getElementById('cal-activity').value);
    const res = document.getElementById('cal-result');

    if(age > 0 && w > 0 && h > 0) {
        let bmr = (10 * w) + (6.25 * h) - (5 * age);
        bmr += (gender === 'male') ? 5 : -161;
        res.innerHTML = `Maintenance: ~${Math.round(bmr * act)} kcal/day`;
    } else res.innerHTML = "Please enter all fields.";
}

function calculateIdealWeight() {
    const gender = document.getElementById('iw-gender').value;
    const h = parseFloat(document.getElementById('iw-height').value);
    const res = document.getElementById('iw-result');

    if(h > 0) {
        let ideal = Math.max((gender === 'male') ? h - 100 : h - 105, 30);
        res.innerHTML = `Ideal Weight: ~${ideal.toFixed(1)} kg`;
    } else res.innerHTML = "Please enter valid height.";
}

// --- Form Submission (Request a Call) ---
document.getElementById('callForm').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('form-success').style.display = 'block';
    setTimeout(() => {
        this.reset();
        document.getElementById('form-success').style.display = 'none';
    }, 4000);
});

// --- Hero Particle Animation ---
const canvas = document.getElementById('hero-particles');
const ctx = canvas.getContext('2d');
let particlesArray;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor(x, y, dx, dy, size, color) {
        this.x = x; this.y = y; this.dx = dx; this.dy = dy; this.size = size; this.color = color;
    }
    draw() {
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color; ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
        if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;
        this.x += this.dx; this.y += this.dy;
        this.draw();
    }
}

function initParticles() {
    particlesArray = [];
    let num = (canvas.height * canvas.width) / 15000;
    for (let i = 0; i < num; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let dx = (Math.random() * 1) - 0.5;
        let dy = (Math.random() * 1) - 0.5;
        particlesArray.push(new Particle(x, y, dx, dy, size, 'rgba(255, 59, 59, 0.3)'));
    }
}

function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) particlesArray[i].update();
}

window.addEventListener('resize', () => { canvas.width = innerWidth; canvas.height = innerHeight; initParticles(); });
initParticles(); animateParticles();
// --- Expanding Accordion Gallery Logic ---
const panels = document.querySelectorAll('.expand-panel');

// Function to remove the active class from all panels
function removeActiveClasses() {
    panels.forEach(panel => {
        panel.classList.remove('active');
    });
}

panels.forEach(panel => {
    // 1. Expands when you hover over it (Desktop)
    panel.addEventListener('mouseenter', () => {
        removeActiveClasses();
        panel.classList.add('active');
    });
5
    // 2. Expands when you tap it (Mobile)
    panel.addEventListener('click', () => {
        removeActiveClasses();
        panel.classList.add('active');
    });
});