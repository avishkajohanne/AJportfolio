/* ==========================================================================
   AVISHKA JOHANNE HEWA - PORTFOLIO INTERACTIVE LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initCanvasGrid();
    initTypewriter();
    initNavbarScroll();
    initProjectFilters();
    initContactForm();
    initThemeToggle();
});

/* --------------------------------------------------------------------------
   1. Dynamic Cyber Node Canvas Background
   -------------------------------------------------------------------------- */
function initCanvasGrid() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 20), 60);

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            radius: Math.random() * 2 + 1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Draw nodes
        particles.forEach((p, index) => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#00f2fe';
            ctx.fill();

            // Connect nearby nodes
            for (let j = index + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 140) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(0, 242, 254, ${1 - dist / 140 * 0.8})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        });

        requestAnimationFrame(animate);
    }

    animate();
}

/* --------------------------------------------------------------------------
   2. Dynamic Typewriter Effect
   -------------------------------------------------------------------------- */
function initTypewriter() {
    const target = document.getElementById('typing-text');
    if (!target) return;

    const phrases = [
        "Information Systems Security Specialist",
        "pfSense Firewall & Ubuntu VMware Engineer",
        "Creator of MyPay Final Capstone App",
        "Ex-Union Bank Systems UAT Tester"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 70;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            target.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 35;
        } else {
            target.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 70;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

/* --------------------------------------------------------------------------
   3. Navbar Scroll & Mobile Navigation
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link update
        let current = '';
        const sections = document.querySelectorAll('section, header');
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            mobileToggle.innerHTML = navLinks.classList.contains('open') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
}

/* --------------------------------------------------------------------------
   4. Project Filter & Modal Window
   -------------------------------------------------------------------------- */
const projectData = {
    'mypay': {
        title: '🏆 MyPay - Online Payment App with AI Threat Detection (Final University Capstone Project)',
        category: 'Final Capstone Project • Fintech & Cyber Security',
        img: 'images/mypay_final_project.png',
        desc: 'Developed MyPay as the main Final University Capstone Project located in the online payment directory. It is a full online payment web application combining digital wallet features, real-time AI threat detection, and comprehensive payment processing:',
        details: [
            'Integrated AI Fraud & Cyber Threat Detector powered by Python (ai_model.py, detector.py) and PHP backend (threat_detector.php).',
            'Built an interactive Cyber Attack Simulator Suite (simulate_attacks.html) to test real-time threat scores and anomaly detection.',
            'Implemented QR Code Payments using phpqrcode library and automated PDF Digital Receipt Generation using TCPDF.',
            'Configured Two-Factor Authentication (2FA) with OTP email verification via PHPMailer and card addition OTP validation.',
            'Admin Dashboard for live user management, suspicious activity monitoring, transaction logs, and security policy control.'
        ],
        techs: ['Python AI Threat Engine', 'PHP 8.2', 'MySQL Database', 'QR Code Generator', 'TCPDF Receipts', 'PHPMailer OTP', 'Attack Simulator']
    },
    'pfsense-ubuntu': {
        title: 'pfSense Firewall & 2 Ubuntu VMware PCs Security Lab',
        category: 'Network Security & Firewall Engineering',
        img: 'images/pfsense_ubuntu_firewall.png',
        desc: 'Built a practical virtual network defense lab using pfSense Firewall appliance and 2 Ubuntu Linux virtual machines on VMware Workstation:',
        details: [
            'Installed and configured pfSense Firewall as the virtual router and perimeter gateway on VMware Workstation.',
            'Connected 2 Ubuntu Linux Virtual Machines to test inter-VM traffic flow and client network policies.',
            'Created custom firewall pass and block rules, port aliases, and IP filtering rules.',
            'Configured domain and website blocking rules to prevent access to unauthorized, malicious, and distracting websites from the Ubuntu client VMs.',
            'Verified firewall log outputs and blocked traffic behavior across both Ubuntu Linux virtual machines.'
        ],
        techs: ['pfSense Firewall', 'VMware Workstation', '2 Ubuntu Linux VMs', 'Website & Domain Blocking', 'Firewall Rule Aliases', 'Traffic Filtering']
    },
    'pentest': {
        title: 'Web Application Vulnerability Assessment & Defense',
        category: 'Cyber Security Auditing',
        img: 'images/cyber_security_pentest.png',
        desc: 'Executed a practical web security auditing project focusing on discovering, analyzing, and patching critical web application vulnerabilities.',
        details: [
            'Identified and remediated OWASP Top 10 vulnerabilities including SQL Injection, Cross-Site Scripting (XSS), and Broken Authentication.',
            'Implemented Security HTTP Response Headers (Content-Security-Policy, X-Frame-Options, Strict-Transport-Security).',
            'Configured password hashing using BCRYPT algorithms and parameterized SQL queries to eradicate SQLi risks.',
            'Generated structured penetration testing reports with severity scoring and mitigation blueprints.'
        ],
        techs: ['OWASP Security Standard', 'Burp Suite', 'SQLi Defense', 'XSS Prevention', 'Security Headers', 'BCRYPT Hashing']
    },
    'topology': {
        title: 'Enterprise Secure Network Topology & Router Policy Lab',
        category: 'Networking & Infrastructure',
        img: 'images/network_topology.png',
        desc: 'Constructed an enterprise-grade virtual network infrastructure featuring multi-branch connectivity and perimeter security policies.',
        details: [
            'Implemented IPv4 VLSM Subnetting scheme across Finance, IT, Operations, and DMZ subnets.',
            'Configured Access Control Lists (ACLs) on virtual routers to filter ICMP, RDP, and SSH management traffic.',
            'Set up Site-to-Site IPsec VPN tunnel simulation between headquarters and branch offices.',
            'Configured DHCP Snooping and Port Security to mitigate unauthorized rogue device attachments.'
        ],
        techs: ['Cisco Virtual Routers', 'Subnetting VLSM', 'Extended ACL Policies', 'IPsec VPN', 'VLAN Tagging', 'Port Security']
    }
};

function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

function openProjectModal(key) {
    const data = projectData[key];
    if (!data) return;

    const modal = document.getElementById('project-modal');
    const titleEl = document.getElementById('modal-title');
    const catEl = document.getElementById('modal-category');
    const imgEl = document.getElementById('modal-img');
    const descEl = document.getElementById('modal-desc');
    const listEl = document.getElementById('modal-list');
    const techEl = document.getElementById('modal-techs');

    titleEl.textContent = data.title;
    catEl.textContent = data.category;
    imgEl.src = data.img;
    descEl.textContent = data.desc;

    listEl.innerHTML = data.details.map(d => `<li><i class="fas fa-shield-alt"></i> ${d}</li>`).join('');
    techEl.innerHTML = data.techs.map(t => `<span class="tech-badge">${t}</span>`).join('');

    modal.classList.add('open');
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (modal) modal.classList.remove('open');
}

/* --------------------------------------------------------------------------
   5. Contact Form Validation & Toast Notification
   -------------------------------------------------------------------------- */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const msg = document.getElementById('contact-message').value.trim();

        if (!name || !email || !msg) {
            showToast('⚠️ Please fill in all required fields.', 'warning');
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const origText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = origText;
            submitBtn.disabled = false;
            form.reset();

            showToast('✅ Message sent successfully! Avishka will contact you shortly.', 'success');
        }, 1200);
    });
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast-notification');
    const msgEl = document.getElementById('toast-message');

    msgEl.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

/* --------------------------------------------------------------------------
   6. Light / Dark Theme Toggle
   -------------------------------------------------------------------------- */
function initThemeToggle() {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
        const current = document.body.getAttribute('data-theme');
        if (current === 'light') {
            document.body.removeAttribute('data-theme');
            toggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.body.setAttribute('data-theme', 'light');
            toggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}
