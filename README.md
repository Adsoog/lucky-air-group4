# ✈️ Lucky Air - Prototipo Frontend (Grupo 4)

Proyecto académico basado en la resolución del caso **"E-commerce at Yunnan Lucky Air"**. Este repositorio contiene el desarrollo del prototipo web funcional de la aerolínea, abarcando desde la maquetación estructural hasta la simulación completa del flujo de reservas.

## 🎯 Objetivo del Proyecto

Desarrollar una plataforma web escalable, responsiva e interactiva para Lucky Air. El proyecto evolucionó de una base estrictamente semántica (HTML5 puro) hacia una aplicación dinámica en el lado del cliente, demostrando el dominio de **CSS3 moderno** (efectos premium como glassmorphism) y **Vanilla JavaScript** para la gestión del estado y la lógica de negocio sin depender de frameworks externos.

## 🏗️ Arquitectura y Estructura del Proyecto

El proyecto ha sido rediseñado con una arquitectura modular, separando los recursos, estilos y la lógica de componentes:

```text
/lucky-air-group4
 ├── 📁 assets/
 │    ├── banner-reserva.jpg
 │    └── ... (imágenes y recursos)
 ├── 📁 css/
 │    ├── globales.css
 │    ├── header.css
 │    ├── footer.css
 │    ├── widget.css
 │    ├── flights.css
 │    └── seats.css
 ├── 📁 js/
 │    ├── 📁 components/
 │    │    ├── navbar.js
 │    │    ├── footer.js
 │    │    ├── booking.js
 │    │    ├── flight-list.js
 │    │    └── seats.js
 │    └── 📁 utils/
 │         └── destinations.js
 ├── 📁 pages/
 │    ├── reserva.html
 │    ├── seleccion-vuelos.html
 │    ├── seleccion-asientos.html
 │    ├── compras.html
 │    ├── informe.html
 │    └── ...
 ├── 📄 index.html
 └── 📄 README.md
```

## 🛠️ Tecnologías, Estándares y Funcionalidades

* **HTML5 Semántico y Web Components:** Uso de etiquetas estructurales y creación de etiquetas personalizadas (`<app-navbar>`, `<app-footer>`) para reutilizar código en múltiples páginas.
* **CSS3 Avanzado (Modern UI):** Implementación de diseño responsivo (Flexbox/Grid), variables CSS globales (`:root`), y efectos visuales de alta fidelidad como desenfoque de fondo (`backdrop-filter`) y tarjetas flotantes.
* **Vanilla JavaScript (ES6+):** Sistema de módulos (`import`/`export`), manipulación dinámica del DOM, validaciones de formularios y control de eventos.
* **Persistencia de Datos (JSON & LocalStorage):** Simulación de una base de datos y gestión de estado mediante `localStorage`. El sistema serializa objetos de reserva en JSON, permitiendo que la información (origen, destino, pasajeros, precios) viaje consistentemente a lo largo de las distintas páginas del embudo de conversión.

## 🚀 Flujo de Usuario Implementado (Booking Engine)

* **Búsqueda (Widget):** Autocompletado de aeropuertos, intercambio de origen/destino (Swap) y captura de fechas/pasajeros.
* **Generación Dinámica de Vuelos:** Renderizado de tarjetas de vuelo (Ida y Vuelta) con precios, horas y etiquetas promocionales generadas algorítmicamente.
* **Selección de Asientos:** Mapa interactivo de la cabina (Grid) con validación estricta basada en el número de pasajeros y simulación de asientos previamente ocupados.
* **Checkout:** Resumen de compra, cálculo automático de base e impuestos (18%), simulación de pasarela de pago con delay asíncrono, y generación de código de reserva único.

## 📋 Reglas del Desarrollo

* ✅ **Cero uso de frameworks CSS/JS:** Todo el diseño y la interactividad fueron construidos desde cero sin Bootstrap, Tailwind, React, ni Angular. Todo es código nativo.
* ✅ **Validaciones estrictas de la W3C:** (0 errores, 0 advertencias) en la fase estructural.
* ✅ **Separación de responsabilidades:** HTML (Estructura), CSS (Presentación) y JS (Comportamiento) en archivos independientes.

## 👥 Integrantes - Grupo 4

* Adso Martin Obregon Gutierrez
