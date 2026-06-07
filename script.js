// FUNÇÃO PARA SCROLL SUAVE
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ANIMAÇÃO DE ENTRADA PARA CARDS
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Observer para pilares, cards, etc
    document.querySelectorAll('.pilar-card, .step, .tecnica-card, .erro-card, .finishing-card').forEach(el => {
        observer.observe(el);
    });
});

// ADICIONAR ANIMAÇÃO CSS DINAMICAMENTE
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInFromLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideInFromRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// ATIVAR ANIMAÇÕES AOS ELEMENTOS
window.addEventListener('load', function() {
    // Animação da hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'slideInFromLeft 0.8s ease-out';
    }

    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.animation = 'slideInFromRight 0.8s ease-out';
    }
});

// HIGHLIGHT DO LINK ATIVO NA NAVBAR
const navLinks = document.querySelectorAll('.nav-menu a');
window.addEventListener('scroll', function() {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--accent-color)';
            link.style.borderBottom = '2px solid var(--accent-color)';
        } else {
            link.style.color = 'var(--text-color)';
            link.style.borderBottom = 'none';
        }
    });
});

// SMOOTH SCROLL PARA BOTÃO CTA
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function() {
        const target = this.getAttribute('onclick').match(/'([^']+)'/);  
        if (target) {
            scrollToSection(target[1]);
        }
    });
});

// CONTADOR DE SCROLL EFFECT (Opcional - efeito visual)
let scrollProgress = 0;
window.addEventListener('scroll', function() {
    const scrollTop = document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    scrollProgress = scrollTop / docHeight;
    
    // Adicionar barra de progresso (opcional)
    if (scrollProgress > 0.1) {
        document.body.style.setProperty('--scroll-progress', `${scrollProgress * 100}%`);
    }
});

// LOG DE INICIALIZAÇÃO
console.log('🥋 Sistema Dalpra - Passagem de Guarda loaded successfully!');
console.log('📚 Aprenda o sistema de pressure passing do campeão Tainan Dalpra');

// EVENTO DE CLIQUE NOS CARDS PARA FEEDBACK
document.querySelectorAll('.pilar-card, .erro-card, .finishing-card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.boxShadow = '0 15px 35px rgba(212, 165, 116, 0.3)';
        setTimeout(() => {
            this.style.transition = 'all 0.3s ease';
            this.style.boxShadow = '0 5px 15px rgba(212, 165, 116, 0.2)';
        }, 200);
    });
});