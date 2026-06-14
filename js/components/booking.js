import { aeropuertos } from '../utils/destinations.js';

function setupAutocomplete(inputId, dropdownId) {
    const input = document.getElementById(inputId);
    const dropdown = document.getElementById(dropdownId);

    input.addEventListener('input', function() {
        const val = this.value;
        dropdown.innerHTML = '';

        if (!val) {
            dropdown.style.display = 'none';
            return;
        }

        const matches = aeropuertos.filter(aero => aero.toLowerCase().includes(val.toLowerCase()));

        if (matches.length > 0) {
            matches.forEach(match => {
                const div = document.createElement('div');
                div.className = 'autocomplete-item';
                div.textContent = match;
                div.addEventListener('click', function() {
                    input.value = this.textContent;
                    dropdown.style.display = 'none';
                });
                dropdown.appendChild(div);
            });
            dropdown.style.display = 'block';
        } else {
            dropdown.style.display = 'none';
        }
    });

    document.addEventListener('click', function(e) {
        if (e.target !== input && e.target !== dropdown) {
            dropdown.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupAutocomplete('origen', 'origen-dropdown');
    setupAutocomplete('destino', 'destino-dropdown');

    const swapBtn = document.querySelector('.swap-btn');
    if (swapBtn) {
        swapBtn.addEventListener('click', () => {
            const origen = document.getElementById('origen');
            const destino = document.getElementById('destino');
            const temp = origen.value;
            origen.value = destino.value;
            destino.value = temp;
        });
    }

    const form = document.querySelector('.widget-form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const origen = document.getElementById('origen').value;
            const destino = document.getElementById('destino').value;
            const fechaIda = document.getElementById('fecha-ida').value;
            const fechaVuelta = document.getElementById('fecha-vuelta').value;
            const pasajerosClase = document.getElementById('pasajeros-clase').value;
            const codigoPromo = document.getElementById('codigo-promo').value;

            if (!origen || !destino) {
                alert('Por favor, selecciona un origen y un destino.');
                return;
            }

            const reservaData = {
                origen,
                destino,    
                fechaIda,
                fechaVuelta,
                pasajerosClase,
                codigoPromo
            };

            localStorage.setItem('luckyAir_reserva', JSON.stringify(reservaData));
            console.log('--- PASO 1: BÚSQUEDA INICIAL ---');
            console.log('Datos guardados en LocalStorage:', reservaData);
            window.location.href = '../pages/seleccion-vuelos.html';
        });
    }
});
