document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      if (!name || !email || !message) {
        showMessage('Por favor, preencha todos os campos.', 'error');
        return;
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
        setTimeout(() => clearMessage(), 5000);
      }
    });
  }
  
  function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
  }
  
  function clearMessage() {
    formMessage.textContent = '';
    formMessage.className = 'form-message';
  }
  
  function updateButtonState(button, disabled, text) {
    button.disabled = disabled;
    button.textContent = text;
  }
});