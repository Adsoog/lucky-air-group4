document.addEventListener('DOMContentLoaded', () => {
    const rawData = localStorage.getItem('luckyAir_reserva');
    if (!rawData) {
        window.location.href = '../index.html';
        return;
    }

    const reserva = JSON.parse(rawData);

    console.log('--- CARGANDO PAGINA: RESUMEN DE COMPRA ---');
    console.log('Datos finales de la reserva listos para pagar:', reserva);

    let numPasajeros = 1;
    let claseVuelo = 'Economy';
    if (reserva.pasajerosClase) {
        const parts = reserva.pasajerosClase.split('_');
        numPasajeros = parseInt(parts[0], 10);
        claseVuelo = parts[1] === 'bus' ? 'Business' : 'Economy';
    }

    const flightBox = document.getElementById('flight-summary-box');
    let flightHtml = `
        <p><strong>Ruta Ida:</strong> ${reserva.origen} ➔ ${reserva.destino}</p>
        <p><strong>Fecha Ida:</strong> ${reserva.fechaIda || 'No especificada'}</p>
        <p><strong>Vuelo Ida:</strong> ${reserva.vueloIda?.aerolinea || 'Lucky Air'}</p>
        <p><strong>Salida:</strong> ${reserva.vueloIda?.salida || '--:--'} | <strong>Llegada:</strong> ${reserva.vueloIda?.llegada || '--:--'}</p>
        <p><strong>Duración:</strong> ${reserva.vueloIda?.duracion || '--h --m'}</p>
    `;

    if (reserva.fechaVuelta) {
        flightHtml += `
            <hr style="margin: 15px 0; border: 0; border-top: 1px solid var(--input-border);">
            <p><strong>Ruta Vuelta:</strong> ${reserva.destino} ➔ ${reserva.origen}</p>
            <p><strong>Fecha Vuelta:</strong> ${reserva.fechaVuelta}</p>
            <p><strong>Vuelo Vuelta:</strong> ${reserva.vueloVuelta?.aerolinea || 'Lucky Air'}</p>
            <p><strong>Salida:</strong> ${reserva.vueloVuelta?.salida || '--:--'} | <strong>Llegada:</strong> ${reserva.vueloVuelta?.llegada || '--:--'}</p>
            <p><strong>Duración:</strong> ${reserva.vueloVuelta?.duracion || '--h --m'}</p>
        `;
    }
    flightBox.innerHTML = flightHtml;

    const passBox = document.getElementById('passengers-summary-box');
    passBox.innerHTML = `
        <p><strong>Pasajeros:</strong> ${numPasajeros}</p>
        <p><strong>Clase de Vuelo:</strong> ${claseVuelo}</p>
        <p><strong>Asientos Reservados:</strong> ${reserva.asientosSeleccionados ? reserva.asientosSeleccionados.join(', ') : 'Ninguno'}</p>
    `;

    const basePriceIda = parseFloat(reserva.vueloIda?.precio || "100.00");
    let basePriceVuelta = 0;
    if (reserva.fechaVuelta) {
        basePriceVuelta = parseFloat(reserva.vueloVuelta?.precio || "100.00");
    }

    const totalBase = (basePriceIda + basePriceVuelta) * numPasajeros;
    const taxes = totalBase * 0.18;
    const total = totalBase + taxes;

    document.getElementById('qty-passengers').textContent = numPasajeros;
    document.getElementById('base-price').textContent = `USD $${totalBase.toFixed(2)}`;
    document.getElementById('taxes').textContent = `USD $${taxes.toFixed(2)}`;
    document.getElementById('total-price').textContent = `USD $${total.toFixed(2)}`;

    const btnPay = document.getElementById('btn-pay');
    btnPay.addEventListener('click', () => {
        btnPay.textContent = "Procesando...";
        btnPay.disabled = true;

        setTimeout(() => {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let bookingCode = 'LUK-';
            for (let i = 0; i < 6; i++) {
                bookingCode += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            reserva.codigoReserva = bookingCode;
            reserva.fechaCompra = new Date().toLocaleDateString();

            let historial = [];
            const rawHistorial = localStorage.getItem('luckyAir_historial');
            if (rawHistorial) {
                historial = JSON.parse(rawHistorial);
            }
            historial.push(reserva);
            localStorage.setItem('luckyAir_historial', JSON.stringify(historial));

            console.log('--- PASO 4: COMPRA FINALIZADA ---');
            console.log('Reserva guardada en el historial:', reserva);
            console.log('Historial completo de vuelos:', historial);

            alert('¡Pago completado con éxito! Tu reserva ha sido confirmada.');
            localStorage.removeItem('luckyAir_reserva');
            window.location.href = '../pages/compras.html';
        }, 2000);
    });
});
