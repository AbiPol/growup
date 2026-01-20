# GrowUp – Monorepo Experience (Nx + Angular + React)

Plataforma digital integral para aprendizaje, gestión de cursos y administración centralizada. Este repositorio ha evolucionado hacia una arquitectura de **Microfrontends (MFE)** gestionada con **Nx Monorepo**.

---

## 🏗️ Arquitectura de Microfrontends
GrowUp utiliza **Module Federation** para orquestar diferentes ecosistemas de frontend bajo un mismo contenedor (**Shell**).

- **Shell (Angular)**: El "Core" que orquesta la autenticación, el menú principal y la capacidad **PWA**.
- **Student (Angular)**: El área de aprendizaje que hemos construido (Dashboard, Catálogo, Mis Cursos).
- **Trainer (React)**: Herramientas avanzadas para que los formadores gestionen y creen contenidos.
- **Admin (React/Angular)**: Panel de control total de la plataforma.

---

## 🧱 Stack Tecnológico
- **Herramientas**: [Nx](https://nx.dev/) (Monorepo & Build System)
- **Frameworks**: Angular 20 (Student/Shell) + React 19 (Trainer/Admin)
- **Estilos**: **Tailwind CSS v4** (Sistema de diseño compartido)
- **UI Components**: PrimeNG (Angular) + PrimeReact (React)
- **Conceptos**: Signals, Module Federation, PWA Service Workers.

---

## 🧭 Estructura del Proyecto (NX)
```text
growup/
├── apps/               # Aplicaciones desplegables
│   ├── shell/          # Host: Landing, Auth y PWA
│   ├── student/        # MFE: Experiencia del alumno
│   └── trainer/        # MFE: Experiencia del formador (React)
├── libs/               # Código compartido (Reutilización al 100%)
│   ├── shared/
│   │   ├── ui/         # Componentes Tailwind reutilizables
│   │   ├── data-access/# Servicios, Modelos e Interceptores
│   │   └── util/       # Guards, Helpers y Pipes
├── backend/            # Lógica de servidor y API
└── docker/             # Configuración de despliegue y contenedores
```

---

## 🚀 Puesta en marcha (Workspace Nx)
```bash
# Instalar dependencias
npm install

# Servir el ecosistema completo (Shell + Remotos)
npx nx serve shell

# Servir una app específica
npx nx serve student
```

## 🔐 Roles y Seguridad
- **Roles**: RBAC (Role Based Access Control) gestionado desde el Shell.
- **Backend Interop**: Comunicación vía API REST con intercambio de tokens JWT compartido entre microfrontends.

## ✅ Calidad y Estándares
- **Nx Graph**: Visualización automática de dependencias para evitar acoplamientos.
- **Atomic Design**: Componentes compartidos en librerías UI para garantizar consistencia visual en toda la plataforma.

---

## 🌿 Estrategia de Ramas
- `main`: Código estable y productivo.
- `feature/nx-migration`: Rama actual de transición a monorepo.

## 📄 Licencia
MIT
