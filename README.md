# REST COUNTRIES — SPA con React + TypeScript

Una aplicación web que permite explorar información sobre todos los países del mundo, con búsqueda, filtrado por región y vista de detalle para cada país.

---

## API y backend elegidos

### REST Countries API v5
Elegí REST Countries porque su documentación es clara y bien estructurada, los datos están muy bien organizados por país (nombre, bandera, población, idiomas, monedas, capital...), lo que facilita tipar los datos con TypeScript. Además, al incluir paginación nativa con `limit` y `offset`, me permitió aprender a manejar fetch en bucle para obtener todos los registros de forma incremental.

### Backend propio — Node.js + Express
Como bonus, añadí un backend ligero con Node y Express que expone un endpoint para gestionar países favoritos (`GET`, `POST` y `DELETE` sobre `/api/favoritos`). Elegí este stack por coherencia con el resto del proyecto.

---

## Decisiones técnicas principales

- **Paginación en cliente:** la API tiene un límite de resultados por página, así que al arrancar la app hago varias peticiones en bucle hasta tener todos los países en memoria. A partir de ahí, la paginación y el filtrado ocurren en el cliente.

- **Vista de detalle con React Router:** al hacer clic en una tarjeta, navego a `/country/:nombre` y paso el objeto del país a través del `state` de React Router. Si el usuario accede directamente por URL, hay un fetch con `?q=nombre`.

- **Manejo de estados de UI:** cada vista gestiona explícitamente los estados `cargando`, `error` y `sin resultados`, tanto en el listado principal como en la vista de detalle.

- **Separación:** los componentes que obtienen datos (`Home`, `Detail`) están separados de los que solo los muestran (`CountryCard`, `CountryList`, `Pagination`).

- **TypeScript:** todos los datos de la API están tipados con una interfaz `Country`.

---

## Herramientas utilizadas

- **React + TypeScript + Vite** — stack principal del frontend
- **React Router DOM** — navegación entre vistas
- **Node.js + Express** — backend ligero para el endpoint de favoritos
- **Concurrently** — para arrancar frontend y backend en paralelo con un solo comando
- **CSS plano con variables** — sin frameworks de estilos, para tener control total del diseño
- **Claude (Anthropic) y Copilot** — utilicé IA a lo largo del proyecto principalmente para:
  - Aprender TypeScript, ya que era mi primera vez usándolo, y entender los errores que me iban surgiendo
  - Corregir bugs concretos (paginación al filtrar, estructura de las respuestas de la API, rutas de React Router)
  - Estructurar el proyecto
  - Ajustar partes del CSS
  - Agregar comentarios
  - Estructurar el README para que se viera bonito
 

---

## Qué dejé fuera y por qué

- **Base de datos:** los favoritos se guardan en memoria en el backend, así que se pierden al reiniciar el servidor. Con más tiempo habría añadido una base de datos sencilla para persistirlos.
- **Sistema de autenticación:** habría tenido sentido añadir login para que cada usuario pueda tener sus propios favoritos guardados en un perfil. Lo descarté para mantenerme dentro del tiempo disponible.
- **Despliegue:** no llegué a desplegar la app en Vercel o Railway, aunque la estructura del proyecto está preparada para ello.

---

## Qué haría diferente con más tiempo

- Persistir los favoritos en una base de datos
- Añadir autenticación para perfiles de usuario
- Mejorar el responsive en móvil, especialmente la vista de detalle
- Separar mejor los estilos con CSS Modules en lugar de clases globales
- Desplegar el frontend en Vercel y el backend en Railway

---

## Cómo arrancar el proyecto

# Instalar dependencias del frontend
npm install

# Instalar dependencias del backend
cd backend && npm install && cd ..

# Arrancar frontend y backend juntos
npm run dev:full


El frontend corre en `http://localhost:5173` y el backend en `http://localhost:3001`.
