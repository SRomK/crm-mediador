# CRM Mediador

Aplicación CRM para la gestión integral de mediadores: planificación de agenda, seguimiento de clientes, tareas en modo kanban y recordatorios.

## Tech Stack

- **Vue 3** — Composition API con `<script setup>`
- **TypeScript** — tipado estático en todo el proyecto
- **Vite** — bundler y servidor de desarrollo
- **Pinia** — gestión de estado global
- **Vue Router 4** — navegación con rutas protegidas y lazy loading
- **Vue i18n** — internacionalización (ES / EN)
- **Axios** — capa de servicios REST con interceptores JWT
- **SASS** — estilos con metodología BEM y variables CSS
- **Storybook** — documentación y testing visual de componentes

## Funcionalidades

- **Autenticación** — login con JWT, persistencia de sesión y guards de navegación
- **Dashboard** — resumen de clientes, próximas citas y tareas pendientes
- **Gestión de clientes** — listado con filtros, alta, edición y baja de clientes
- **Agenda** — citas y recordatorios con vista cronológica
- **Kanban** — tablero de tareas con drag & drop entre columnas (Por hacer / En progreso / En revisión / Hecho)
- **Diseño responsive** — mobile first, adaptado a todos los breakpoints

## Estructura del proyecto

```
src/
├── assets/styles/       # SASS global: variables, mixins BEM, base
├── components/
│   ├── base/            # Librería de componentes genéricos (Button, Input, Modal, Card…)
│   └── layout/          # AppLayout, AppHeader, AppSidebar
├── composables/         # useAuth, useApi, useBreakpoint
├── i18n/                # Traducciones ES/EN
├── router/              # Rutas y navigation guards
├── services/            # Capa Axios: api.ts + servicios por dominio
├── stores/              # Pinia: auth, clients, agenda, kanban
├── types/               # Interfaces y tipos TypeScript globales
└── views/               # Vistas: Login, Dashboard, Clients, Agenda, Kanban
```

## Instalación

```bash
npm install
```

## Scripts

```bash
npm run dev            # Servidor de desarrollo → localhost:5173
npm run build          # Build de producción
npm run preview        # Preview del build
npm run storybook      # Storybook → localhost:6006
npm run test           # Tests con Vitest
```

## Variables de entorno

Copia `.env.example` a `.env` y ajusta los valores:

```bash
cp .env.example .env
```

| Variable | Descripción |
|---|---|
| `VITE_API_BASE_URL` | URL base de la API REST |

## Credenciales de demo

```
Email:    demo@crm.com
Password: demo1234
```

> En modo desarrollo (`import.meta.env.DEV`) los servicios usan datos mock locales, sin necesidad de API real.
