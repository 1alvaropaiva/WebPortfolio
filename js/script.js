document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Toggle menu (☰ ↔ ✕)
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Fecha menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // ===== Formulário de contato =====
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                return showMessage('Por favor, preencha todos os campos.', 'error');
            }

            const submitButton = contactForm.querySelector('button[type="submit"]');
            updateButtonState(submitButton, true, 'Enviando...');

            try {
                const success = await sendContactMessage(name, email, message);
                if (success) {
                    showMessage('Mensagem enviada com sucesso!', 'success');
                    contactForm.reset();
                } else {
                    throw new Error('Falha no envio');
                }
            } catch (error) {
                console.error('Erro:', error);
                showMessage('Erro ao enviar mensagem. Tente novamente.', 'error');
            } finally {
                updateButtonState(submitButton, false, 'Enviar');
                setTimeout(clearMessage, 5000);
            }
        });
    }

    // Funções auxiliares
    function showMessage(text, type) {
        if (formMessage) {
            formMessage.textContent = text;
            formMessage.className = `form-message ${type}`;
        }
    }

    function clearMessage() {
        if (formMessage) {
            formMessage.textContent = '';
            formMessage.className = 'form-message';
        }
    }

    function updateButtonState(button, disabled, text) {
        button.disabled = disabled;
        button.textContent = text;
    }
});
