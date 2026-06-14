document.addEventListener('DOMContentLoaded', () => {
    const rawData = localStorage.getItem('luckyAir_reserva');
    if (!rawData) {
        window.location.href = '../index.html';
        return;
    }

    const reserva = JSON.parse(rawData);

    console.log('--- CARGANDO PAGINA: SELECCIÓN DE ASIENTOS ---');
    console.log('Datos actuales de la reserva:', reserva);

    let numPasajeros = 1;
    if (reserva.pasajerosClase) {
        numPasajeros = parseInt(reserva.pasajerosClase.split('_')[0], 10);
    }

    let asientosSeleccionados = [];

    document.getElementById('seats-needed').textContent = numPasajeros;
    const btnConfirm = document.getElementById('btn-confirm-seats');

    const seatMap = document.getElementById('seat-map');
    const filas = 8;
    const letras = ['A', 'B', 'pasillo', 'C', 'D'];

    for (let i = 1; i <= filas; i++) {
        letras.forEach(letra => {
            if (letra === 'pasillo') {
                const aisle = document.createElement('div');
                aisle.className = 'aisle';
                seatMap.appendChild(aisle);
                return;
            }

            const idAsiento = `${i}${letra}`;
            const isOccupied = Math.random() < 0.3;

            const seatDiv = document.createElement('div');
            seatDiv.className = `seat ${isOccupied ? 'occupied' : 'available'}`;
            seatDiv.textContent = idAsiento;

            if (!isOccupied) {
                seatDiv.addEventListener('click', () => {
                    const isSelected = seatDiv.classList.contains('selected');

                    if (isSelected) {
                        seatDiv.classList.remove('selected');
                        asientosSeleccionados = asientosSeleccionados.filter(s => s !== idAsiento);
                    } else {
                        if (asientosSeleccionados.length < numPasajeros) {
                            seatDiv.classList.add('selected');
                            asientosSeleccionados.push(idAsiento);
                        }
                    }

                    if (asientosSeleccionados.length === numPasajeros) {
                        btnConfirm.removeAttribute('disabled');
                    } else {
                        btnConfirm.setAttribute('disabled', 'true');
                    }
                });
            }

            seatMap.appendChild(seatDiv);
        });
    }

    btnConfirm.addEventListener('click', () => {
        reserva.asientosSeleccionados = asientosSeleccionados;
        localStorage.setItem('luckyAir_reserva', JSON.stringify(reserva));
        console.log('--- PASO 3: ASIENTOS CONFIRMADOS ---');
        console.log('Reserva actualizada:', reserva);
        window.location.href = '../pages/checkout.html';
    });
});
