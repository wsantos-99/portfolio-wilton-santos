/**
 * ============================================================
 * SCRIPT - Portfólio Wilton Santos
 * Funcionalidades:
 * 1. Menu Hambúrguer (responsivo)
 * 2. Troca de Tema (Claro/Escuro)
 * 3. Validação do Formulário de Contato
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', function() {

    // ============================================================
    // 1. MENU HAMBÚRGUER
    // ============================================================
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });

        // Fecha o menu ao clicar em um link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
            });
        });

        // Fecha o menu ao clicar fora
        document.addEventListener('click', function(event) {
            const isClickInsideNav = mainNav.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
            }
        });
    }

    // ============================================================
    // 2. TROCA DE TEMA (CLARO/ESCURO)
    // ============================================================
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
        if (themeToggle) themeToggle.textContent = '☀️';
    } else {
        document.body.classList.remove('light-theme');
        if (themeToggle) themeToggle.textContent = '🌙';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            themeToggle.textContent = isLight ? '☀️' : '🌙';
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }

    // ============================================================
    // 3. VALIDAÇÃO DO FORMULÁRIO DE CONTATO
    // ============================================================
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const feedbackDiv = document.getElementById('form-feedback');

    function showError(inputId, message) {
        const errorSpan = document.getElementById(inputId + '-error');
        if (errorSpan) {
            errorSpan.textContent = message;
        }
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        if (feedbackDiv) {
            feedbackDiv.textContent = '';
            feedbackDiv.className = 'form-feedback';
        }
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            clearErrors();

            let isValid = true;

            // Valida Nome
            if (nameInput.value.trim() === '') {
                showError('name', 'Nome é obrigatório.');
                isValid = false;
            }

            // Valida Email
            if (emailInput.value.trim() === '') {
                showError('email', 'E-mail é obrigatório.');
                isValid = false;
            } else if (!validateEmail(emailInput.value.trim())) {
                showError('email', 'Digite um e-mail válido (ex: usuario@dominio.com).');
                isValid = false;
            }

            // Valida Mensagem
            if (messageInput.value.trim() === '') {
                showError('message', 'Mensagem é obrigatória.');
                isValid = false;
            }

            if (isValid) {
                form.reset();

                if (feedbackDiv) {
                    feedbackDiv.textContent = '✅ Mensagem enviada com sucesso!';
                    feedbackDiv.className = 'form-feedback success';
                }

                alert('✅ Mensagem enviada com sucesso!');

                setTimeout(() => {
                    if (feedbackDiv) {
                        feedbackDiv.textContent = '';
                        feedbackDiv.className = 'form-feedback';
                    }
                }, 5000);
            } else {
                alert('⚠️ Por favor, corrija os erros no formulário.');
            }
        });
    }

    // ============================================================
    // 4. SCROLL SUAVE
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});