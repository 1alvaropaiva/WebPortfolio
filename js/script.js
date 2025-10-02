document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const modal = document.getElementById("projectModal");
    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-desc");
    const closeBtn = document.querySelector(".close");

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

    // ===== Projetos =====
    const projects = {
        1: {
            title: "Ana Júlia - 1 Ano",
            desc: "Uma landing page moderna e responsiva desenvolvida para celebrar o primeiro aniversário da Ana Júlia, implementando funcionalidades frontend e BaaS (Firebase).",
            repo: {
                url: "https://github.com/1alvaropaiva/AnaJulia-Niver",
                label: "Ver Repositório"
            },
            link: {
                url: "https://anajulia-niver.vercel.app/",
                label: "Ver Site"
            }
        },
        2: {
            title: "Sistema de Pedidos",
            desc: "Sistema de gerenciamento de pedidos para lojas, com cadastro de usuários, produtos e categorias e processo completo de pedidos.",
            link: {
                url: "https://github.com/1alvaropaiva/SistemaDePedidos",
                label: "Ver Repositório"
            }
        },
        3: {
            title: "AvBank Frontend",
            desc: "Front-end do sistema bancário AvBank. Processa pagamentos, resgates e depósitos.",
            link: {
                url: "https://github.com/1alvaropaiva/avbank_frontend",
                label: "Ver Repositório"
            }
        },
        4: {
            title: "AvBank Backend",
            desc: "API do sistema de controle bancário do AvBank, com funções básicas (saque, transferência, depósito).",
            link: {
                url: "https://github.com/1alvaropaiva/avbank-backend",
                label: "Ver Repositório"
            }
        }
    };

    // Função para abrir modal
    function openModal(project) {
        modalTitle.textContent = project.title;
        modalDesc.textContent = project.desc;

        const repoLink = document.getElementById("modal-repo");
        const demoLink = document.getElementById("modal-demo");

        // Link principal (deploy ou site)
        if (project.link) {
            demoLink.href = project.link.url;
            demoLink.textContent = project.link.label;
            demoLink.style.display = "inline-block";
        } else {
            demoLink.style.display = "none";
        }

        // Repositório (opcional)
        if (project.repo) {
            repoLink.href = project.repo.url;
            repoLink.textContent = project.repo.label;
            repoLink.style.display = "inline-block";
        } else {
            repoLink.style.display = "none";
        }

        modal.style.display = "flex";
    }

    // Associa os cards ao modal
    document.querySelectorAll(".projects-container .project-card").forEach((card, index) => {
        card.removeAttribute("href"); // impede redirecionar direto
        card.addEventListener("click", () => {
            const project = projects[index + 1];
            openModal(project);
        });
    });

    // Fechar modal
    closeBtn.addEventListener("click", () => modal.style.display = "none");
    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });
});
