document.addEventListener('DOMContentLoaded', () => {
    const rawHistorial = localStorage.getItem('luckyAir_historial');
    const historial = rawHistorial ? JSON.parse(rawHistorial) : [];

    console.log('--- CARGANDO PAGINA: MIS VUELOS (HISTORIAL) ---');
    console.log('Historial completo actual:', historial);

    const listContainer = document.getElementById('compras-list');
    const noComprasBox = document.getElementById('no-compras');

    if (historial.length === 0) {
        noComprasBox.style.display = 'block';
        return;
    }

    historial.reverse().forEach(reserva => {
        const regex = /\(([^)]+)\)/;
        const matchOrigen = reserva.origen ? reserva.origen.match(regex) : null;
        const matchDestino = reserva.destino ? reserva.destino.match(regex) : null;

        const originCode = matchOrigen ? matchOrigen[1] : (reserva.origen ? reserva.origen.substring(0, 3).toUpperCase() : 'ORG');
        const destCode = matchDestino ? matchDestino[1] : (reserva.destino ? reserva.destino.substring(0, 3).toUpperCase() : 'DST');

        const numPasajeros = reserva.pasajerosClase ? reserva.pasajerosClase.split('_')[0] : '1';

        const card = document.createElement('div');
        card.className = 'boarding-pass';

        card.innerHTML = `
            <div class="pass-left">
                <div class="route-header">
                    <span class="city">${originCode}</span>
                    <span class="plane-icon">${reserva.fechaVuelta ? '🔁' : '✈️'}</span>
                    <span class="city">${destCode}</span>
                </div>
                <div class="pass-details">
                    <div class="detail-block" style="flex: 1 1 100%;">
                        <span class="detail-label">Ida: ${reserva.fechaIda || 'Pendiente'}</span>
                        <span class="detail-value">${reserva.vueloIda?.aerolinea || 'Lucky Air'} | Salida: ${reserva.vueloIda?.salida || '--:--'}</span>
                    </div>
                    ${reserva.fechaVuelta ? `
                    <div class="detail-block" style="flex: 1 1 100%;">
                        <span class="detail-label">Vuelta: ${reserva.fechaVuelta}</span>
                        <span class="detail-value">${reserva.vueloVuelta?.aerolinea || 'Lucky Air'} | Salida: ${reserva.vueloVuelta?.salida || '--:--'}</span>
                    </div>
                    ` : ''}
                    <div class="detail-block">
                        <span class="detail-label">Pasajeros</span>
                        <span class="detail-value">${numPasajeros}</span>
                    </div>
                    <div class="detail-block">
                        <span class="detail-label">Asientos (Aplicados a ambos trayectos)</span>
                        <span class="detail-value">${reserva.asientosSeleccionados ? reserva.asientosSeleccionados.join(', ') : 'Ninguno'}</span>
                    </div>
                </div>
            </div>
            <div class="pass-right">
                <div class="qr-placeholder"></div>
                <span class="detail-label">Reserva</span>
                <span class="booking-code">${reserva.codigoReserva || 'LUK-0000'}</span>
            </div>
        `;

        listContainer.appendChild(card);
    });
});
