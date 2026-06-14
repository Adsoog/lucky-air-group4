class NavbarComponent extends HTMLElement {
    connectedCallback() {
        const rootPath = this.getAttribute('root-path') || '.';
        this.innerHTML = `
            <header id="main-header" class="header">
                <h1 class="header-title">Lucky Air</h1>
                <nav id="main-nav" class="nav-menu">
                    <a href="${rootPath}/index.html" class="nav-link">Inicio</a>
                    <a href="${rootPath}/pages/reserva.html" class="nav-link">Reservas</a>
                    <a href="${rootPath}/pages/atencion.html" class="nav-link">Atención</a>
                    <a href="${rootPath}/pages/trabajo.html" class="nav-link">Trabajo</a>
                    <a href="${rootPath}/pages/compras.html" class="nav-link" style="font-weight: 700; color: var(--accent-red);">Mis Vuelos 🛒</a>
                    <button id="theme-toggle" class="btn-theme" aria-label="Cambiar tema" onclick="window.toggleTheme()" title="Modo Claro/Oscuro">🌙</button>
                </nav>
            </header>
        `;

        setTimeout(() => {
            const btn = this.querySelector('#theme-toggle');
            if (btn) {
                const updateIcon = () => {
                    const theme = document.body.getAttribute('data-theme');
                    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
                };
                updateIcon();
                document.addEventListener('themeChanged', updateIcon);
            }
        }, 50);
    }
}

customElements.define('app-navbar', NavbarComponent);
