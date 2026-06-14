class FooterComponent extends HTMLElement {
    connectedCallback() {
        const rootPath = this.getAttribute('root-path') || '.';
        this.innerHTML = `
            <footer id="main-footer" class="footer">
                <div class="footer-left">
                    <a href="${rootPath}/pages/informe.html" class="footer-nav-link">Informe Técnico W3C</a>
                </div>
                <div class="footer-center">
                    <p class="footer-copy">&copy; 2026 Adso Martin Obregon.<br>Todos los derechos reservados.</p>
                </div>
                <div class="footer-right"></div>
            </footer>
        `;
    }
}

customElements.define('app-footer', FooterComponent);
