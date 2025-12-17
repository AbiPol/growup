# GrowUp – Frontend (Angular + Tailwind CSS + PrimeNG)

Plataforma digital para aprendizaje, proyectos y progreso personal/profesional. Este repositorio contiene el **frontend** del MVP de GrowUp.

---

## 🧱 Stack
- **Angular 19** (standalone components, routing, signals)
- **TypeScript** estricto
- **Tailwind CSS v4** (utilidades + tema personalizado)
- **PrimeNG** + **PrimeIcons** (componentes de UI ricos)
- **ESLint** / Prettier
- **Git Flow simple** (main, develop, feature/*) y **Conventional Commits**

## 📋 Requisitos
- Node.js ≥ 18 LTS
- npm ≥ 9
- Angular CLI (recomendado): `npm i -g @angular/cli`

## 🚀 Puesta en marcha
```bash
npm install
ng serve -o
```

## 📦 Scripts
```bash
# Desarrollo
ng serve -o

# Produccion
ng build --configuration production

# Lint
ng lint

# Tests (si estan configurados)
ng test
```

## 🧭 Arquitectura Frontend
El frontend se organiza por **capas** y **features**:

```
src/
├─ app/
│  ├─ core/                # Servicios globales, guards, interceptores, config
│  ├─ layout/              # Shell: header, sidebar, main
│  ├─ shared/              # Reutilizables (componentes, pipes, directivas)
│  ├─ features/            # Dominios: landing, auth, dashboard, courses, profile
│  ├─ theme/               # Tokens CSS, helpers de Tailwind, dark mode
│  ├─ app.routes.ts        # Arbol de rutas
│  └─ app.component.ts     # Bootstrap (router-outlet)
├─ assets/                 # Imagenes, iconos, fuentes
├─ styles.scss             # Tailwind + estilos globales
└─ main.ts                 # bootstrapApplication()
```

- **core/**: `AuthService` (mock -> JWT despues), `authGuard`, `http.service`, interceptores.
- **shared/**: UI reutilizable (cards, avatar, loaders), pipes comunes, utilidades.
- **features/**: paginas autocontenidas (standalone) con sus servicios y modelos.
- **theme/**: variables CSS (tokens), integracion paleta + Tailwind, modo oscuro.

## 🗺️ Rutas (MVP)
- Publico: `/landing`, `/auth/login`
- Privado (con `authGuard`): `/dashboard`, `/courses`, `/profile`

## 🔐 Autenticacion (mock -> real)
- **MVP**: estado simulado con `signals` y guard de rutas.
- **Evolucion**: JWT + refresh tokens; interceptor para `Authorization: Bearer`.

## 🎨 Tema
- Paleta y tipografias definidas en `theme/tokens.css` y `tailwind.config.js`.
- Helpers (`.bg-surface`, `.text-on-surface`, etc.) en `styles.scss`.
- **Dark Mode** con clase `.dark` en `<html>` o `<body>`.

## 🧩 UI (PrimeNG + Tailwind)
- PrimeNG para componentes complejos (tabla, dialogo, datepicker, file upload).
- Tailwind para layout, spacing, tipografia y color utilitario.
- Importar **solo** los modulos de PrimeNG usados por pagina para cuidar el bundle.

## 🗃️ Estado y datos
- Servicios por feature; datos **mock** en el MVP.
- Posteriormente: integracion REST con backend (`/api/v1/...`).

## ✅ Calidad
- Convenciones: **Conventional Commits** (`feat:`, `fix:`, `docs:`, `chore:`...)
- Lint obligatorio en PRs.
- Tests unitarios en features criticas (auth guard, servicios).

## 🌿 Flujo Git recomendado
- `main` -> estable.
- `develop` -> integracion.
- `feature/*` -> cada historia/tarea.
- Releases: `release/x.y.z` + tag `vX.Y.Z`.

## 🤖 CI (GitHub Actions)
Workflow minimo: `npm ci` -> `ng lint` -> `ng build --configuration production` en cada PR a `develop`/`main`.

## 🗺️ Roadmap (resumen)
- **Sprint 1**: Layout + Routing + Auth mock.
- **Sprint 2**: Cursos (tabla + dialogo CRUD mock) y Perfil.
- **Sprint 3**: Tema (tokens/dark) y Accesibilidad base.

## 📄 Licencia
MIT
