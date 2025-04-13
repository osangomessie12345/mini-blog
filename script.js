    let mode = 'login';
    const API_URL = 'https://jinwoo-api-2.onrender.com';

    function toggleMode() {
      mode = mode === 'login' ? 'register' : 'login';
      document.getElementById('form-title').textContent = mode === 'login' ? 'Connexion' : 'Inscription';
      document.querySelector('.btn-login').style.display = mode === 'login' ? 'block' : 'none';
      document.querySelector('.btn-register').style.display = mode === 'register' ? 'block' : 'none';
      document.querySelector('.toggle').innerHTML =
        mode === 'login'
          ? `Pas encore inscrit ? <a onclick="toggleMode()">Créer un compte</a>`
          : `Déjà inscrit ? <a onclick="toggleMode()">Se connecter</a>`;
      document.getElementById('message').textContent = '';
      document.getElementById('fullname').style.display = mode === 'register' ? 'block' : 'none';
      document.getElementById('email').style.display = mode === 'register' ? 'block' : 'none';
    }

    function togglePassword() {
      const passwordInput = document.getElementById('password');
      passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    }

    async function handleSubmit() {
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();
      const email = document.getElementById('email').value.trim();
      const fullname = document.getElementById('fullname').value.trim();
      const message = document.getElementById('message');

      if (!username || !password || (mode === 'register' && (!email || !fullname))) {
        message.textContent = 'Veuillez remplir tous les champs.';
        message.style.color = 'var(--error-color)';
        return;
      }

      const payload = { username, password };
      if (mode === 'register') {
        payload.email = email;
        payload.fullname = fullname;
      }

      try {
        const res = await fetch(`${API_URL}/${mode}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (res.ok) {
          message.style.color = 'var(--success-color)';
          if (mode === 'login') {
            message.textContent = data.message || 'Connexion réussie !';
            setTimeout(() => {
              window.location.href = 'page-communaute.html';
            }, 1000);
          } else {
            message.textContent = data.message || 'Inscription réussie ! Veuillez vous connecter.';
            setTimeout(() => {
              toggleMode(); // Revenir à la page de connexion
            }, 1500);
          }
        } else {
          message.style.color = 'var(--error-color)';
          message.textContent = data.error || 'Une erreur est survenue.';
        }
      } catch (error) {
        message.style.color = 'var(--error-color)';
        message.textContent = 'Impossible de contacter l\'API.';
      }
          }
