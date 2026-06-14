document.addEventListener('DOMContentLoaded', () => {
    const rawData = localStorage.getItem('luckyAir_reserva');
    if (!rawData) {
        window.location.href = '../index.html';
        return;
    }

    const reserva = JSON.parse(rawData);

    console.log('--- CARGANDO PAGINA: SELECCIÓN DE VUELOS ---');
    console.log('Datos actuales de la reserva:', reserva);

    let passengersText = 'Pendiente';
    if (reserva.pasajerosClase) {
        passengersText = reserva.pasajerosClase.split('_')[0];
    }

    const headerInfo = document.getElementById('search-summary');
    const pageTitle = document.querySelector('.flights-title');
    const flightList = document.getElementById('flight-list');

    const aerolineas = ["Lucky Air Perú", "Lucky Express"];
    const etiquetas = ["tag-recomendado", "tag-más-económico", "tag-más-rápido", ""];
    const nombresEtiquetas = ["Recomendado", "Más económico", "Más rápido", ""];

    function renderFlights(tipo) {
        flightList.innerHTML = '';

        let origenText, destinoText, originCode, destCode, fechaMostrada;

        const regex = /\(([^)]+)\)/;

        if (tipo === 'Ida') {
            origenText = reserva.origen;
            destinoText = reserva.destino;
            fechaMostrada = reserva.fechaIda || 'Pendiente';
            pageTitle.textContent = 'Elige un vuelo de ida';
        } else {
            origenText = reserva.destino;
            destinoText = reserva.origen;
            fechaMostrada = reserva.fechaVuelta;
            pageTitle.textContent = 'Elige un vuelo de vuelta';
        }

        const matchOrigen = origenText.match(regex);
        const matchDestino = destinoText.match(regex);
        originCode = matchOrigen ? matchOrigen[1] : origenText.substring(0, 3).toUpperCase();
        destCode = matchDestino ? matchDestino[1] : destinoText.substring(0, 3).toUpperCase();

        headerInfo.innerHTML = `
            <span>${origenText} ✈️ ${destinoText}</span> |
            <span>Fecha: ${fechaMostrada}</span> |
            <span>Pasajeros: ${passengersText}</span>
        `;

        for (let i = 0; i < 5; i++) {
            const horaSalida = Math.floor(Math.random() * (22 - 5 + 1)) + 5;
            const minSalida = Math.floor(Math.random() * 4) * 15;
            const duracionHoras = Math.floor(Math.random() * 2) + 1;
            const duracionMin = Math.floor(Math.random() * 6) * 10;

            let salidaDate = new Date();
            salidaDate.setHours(horaSalida, minSalida, 0);

            let llegadaDate = new Date(salidaDate);
            llegadaDate.setHours(salidaDate.getHours() + duracionHoras);
            llegadaDate.setMinutes(salidaDate.getMinutes() + duracionMin);

            const formatTime = (date) => date.toTimeString().substring(0, 5);

            const precioBase = Math.floor(Math.random() * (150 - 50 + 1)) + 50;
            const centavos = Math.floor(Math.random() * 99);
            const precioFinal = `${precioBase}.${centavos.toString().padStart(2, '0')}`;

            const tagIndex = Math.floor(Math.random() * etiquetas.length);
            const claseEtiqueta = etiquetas[tagIndex];
            const textoEtiqueta = nombresEtiquetas[tagIndex];

            const op = aerolineas[Math.floor(Math.random() * aerolineas.length)];

            const card = document.createElement('div');
            card.className = 'flight-card';
            card.style.cursor = 'pointer';

            let tagHtml = '';
            if (claseEtiqueta) {
                tagHtml = `<div class="flight-tag ${claseEtiqueta}">${textoEtiqueta}</div>`;
            }

            card.innerHTML = `
                ${tagHtml}
                <div class="flight-content">
                    <div class="flight-times">
                        <div class="time-block">
                            <span class="time">${formatTime(salidaDate)}</span>
                            <span class="airport">${originCode}</span>
                        </div>
                        <div class="duration-block">
                            <span class="duration-label">Duración</span>
                            <span class="duration-time">${duracionHoras} h ${duracionMin} min</span>
                            <div class="line"></div>
                            <span class="operated">Operado por ${op}</span>
                        </div>
                        <div class="time-block">
                            <span class="time">${formatTime(llegadaDate)}</span>
                            <span class="airport">${destCode}</span>
                        </div>
                    </div>
                    <div class="flight-price">
                        <span class="price-label">Por persona desde</span>
                        <span class="price-amount">USD ${precioFinal}</span>
                        <span class="price-tax">Incluye tasas e impuestos</span>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => {
                const flightInfo = {
                    salida: formatTime(salidaDate),
                    llegada: formatTime(llegadaDate),
                    duracion: `${duracionHoras}h ${duracionMin}m`,
                    precio: precioFinal,
                    aerolinea: op
                };

                if (tipo === 'Ida') {
                    reserva.vueloIda = flightInfo;

                    console.log('--- PASO 2: VUELO DE IDA SELECCIONADO ---');
                    console.log(reserva);

                    if (reserva.fechaVuelta) {
                        window.scrollTo(0, 0);
                        renderFlights('Vuelta');
                    } else {
                        localStorage.setItem('luckyAir_reserva', JSON.stringify(reserva));
                        window.location.href = '../pages/seleccion-asientos.html';
                    }
                } else {
                    reserva.vueloVuelta = flightInfo;
                    console.log('--- PASO 2b: VUELO DE VUELTA SELECCIONADO ---');
                    console.log(reserva);
                    localStorage.setItem('luckyAir_reserva', JSON.stringify(reserva));
                    window.location.href = '../pages/seleccion-asientos.html';
                }
            });

            flightList.appendChild(card);
        }
    }

    renderFlights('Ida');
});
